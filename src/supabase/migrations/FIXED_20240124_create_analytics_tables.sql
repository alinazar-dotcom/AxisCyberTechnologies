-- FIXED: Create analytics tables for tracking user behavior and content performance
-- Run this if you got "column page_url does not exist" error

-- First, drop existing tables if they have issues (OPTIONAL - only if migration failed)
-- DROP TABLE IF EXISTS search_analytics CASCADE;
-- DROP TABLE IF EXISTS page_views CASCADE;
-- DROP TABLE IF EXISTS form_analytics CASCADE;
-- DROP TABLE IF EXISTS content_performance CASCADE;
-- DROP TABLE IF EXISTS engagement_events CASCADE;

-- 1. Search Analytics Table
CREATE TABLE IF NOT EXISTS search_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_result_id TEXT,
  clicked_result_type TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_analytics_query ON search_analytics(query);
CREATE INDEX IF NOT EXISTS idx_search_analytics_created ON search_analytics(created_at DESC);

-- 2. Page Views Table (FIXED - ensure page_url exists)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url TEXT NOT NULL,
  page_title TEXT,
  page_type TEXT, -- 'service', 'blog', 'home', 'about', etc.
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_type ON page_views(page_type);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);

-- 3. Form Submissions Analytics Table
CREATE TABLE IF NOT EXISTS form_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL, -- 'contact', 'newsletter', 'consultation', 'comment'
  form_data JSONB,
  status TEXT DEFAULT 'submitted', -- 'submitted', 'converted', 'spam'
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_analytics_type ON form_analytics(form_type);
CREATE INDEX IF NOT EXISTS idx_form_analytics_status ON form_analytics(status);
CREATE INDEX IF NOT EXISTS idx_form_analytics_created ON form_analytics(created_at DESC);

-- 4. Content Performance Table (aggregate stats)
CREATE TABLE IF NOT EXISTS content_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL, -- 'service', 'blog', 'case-study'
  views INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  avg_time_on_page INTEGER DEFAULT 0, -- seconds
  bounce_rate DECIMAL(5,2) DEFAULT 0, -- percentage
  conversions INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_performance_content ON content_performance(content_id, content_type);
CREATE INDEX IF NOT EXISTS idx_content_performance_date ON content_performance(date DESC);

-- 5. User Engagement Events Table
CREATE TABLE IF NOT EXISTS engagement_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'click', 'scroll', 'share', 'download', etc.
  event_data JSONB,
  page_url TEXT,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_engagement_events_type ON engagement_events(event_type);
CREATE INDEX IF NOT EXISTS idx_engagement_events_session ON engagement_events(session_id);
CREATE INDEX IF NOT EXISTS idx_engagement_events_created ON engagement_events(created_at DESC);

-- RLS Policies (public can insert, only authenticated can read)
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can track search analytics" ON search_analytics;
DROP POLICY IF EXISTS "Anyone can track page views" ON page_views;
DROP POLICY IF EXISTS "Anyone can track form analytics" ON form_analytics;
DROP POLICY IF EXISTS "Anyone can track engagement events" ON engagement_events;
DROP POLICY IF EXISTS "Authenticated users can read search analytics" ON search_analytics;
DROP POLICY IF EXISTS "Authenticated users can read page views" ON page_views;
DROP POLICY IF EXISTS "Authenticated users can read form analytics" ON form_analytics;
DROP POLICY IF EXISTS "Authenticated users can read content performance" ON content_performance;
DROP POLICY IF EXISTS "Authenticated users can read engagement events" ON engagement_events;
DROP POLICY IF EXISTS "Authenticated users can update content performance" ON content_performance;
DROP POLICY IF EXISTS "Authenticated users can insert content performance" ON content_performance;

-- Allow public to insert (track events)
CREATE POLICY "Anyone can track search analytics"
  ON search_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can track page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can track form analytics"
  ON form_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can track engagement events"
  ON engagement_events FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read analytics
CREATE POLICY "Authenticated users can read search analytics"
  ON search_analytics FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read page views"
  ON page_views FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read form analytics"
  ON form_analytics FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read content performance"
  ON content_performance FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read engagement events"
  ON engagement_events FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated can update content performance
CREATE POLICY "Authenticated users can update content performance"
  ON content_performance FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert content performance"
  ON content_performance FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Trigger to update content_performance.updated_at
CREATE OR REPLACE FUNCTION update_content_performance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS content_performance_updated_at ON content_performance;

CREATE TRIGGER content_performance_updated_at
  BEFORE UPDATE ON content_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_content_performance_updated_at();

-- Verify tables were created
DO $$
BEGIN
  RAISE NOTICE 'Analytics tables created successfully!';
  RAISE NOTICE 'Tables: search_analytics, page_views, form_analytics, content_performance, engagement_events';
END $$;
