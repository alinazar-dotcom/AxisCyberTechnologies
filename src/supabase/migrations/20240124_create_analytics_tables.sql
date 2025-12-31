-- Create analytics tables for tracking user behavior and content performance

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

-- 2. Page Views Table
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

CREATE TRIGGER content_performance_updated_at
  BEFORE UPDATE ON content_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_content_performance_updated_at();

-- Function to get popular searches (last 30 days)
CREATE OR REPLACE FUNCTION get_popular_searches(days INTEGER DEFAULT 30, result_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  query TEXT,
  search_count BIGINT,
  avg_results_count NUMERIC,
  click_through_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sa.query,
    COUNT(*) as search_count,
    AVG(sa.results_count)::NUMERIC as avg_results_count,
    (COUNT(sa.clicked_result_id)::NUMERIC / COUNT(*)::NUMERIC * 100) as click_through_rate
  FROM search_analytics sa
  WHERE sa.created_at >= NOW() - (days || ' days')::INTERVAL
  GROUP BY sa.query
  ORDER BY search_count DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get top content by views
CREATE OR REPLACE FUNCTION get_top_content(
  content_type_param TEXT DEFAULT NULL,
  days INTEGER DEFAULT 30,
  result_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  content_id UUID,
  content_type TEXT,
  total_views BIGINT,
  unique_views_sum BIGINT,
  avg_time NUMERIC,
  total_conversions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cp.content_id,
    cp.content_type,
    SUM(cp.views) as total_views,
    SUM(cp.unique_views) as unique_views_sum,
    AVG(cp.avg_time_on_page)::NUMERIC as avg_time,
    SUM(cp.conversions) as total_conversions
  FROM content_performance cp
  WHERE 
    cp.date >= CURRENT_DATE - days
    AND (content_type_param IS NULL OR cp.content_type = content_type_param)
  GROUP BY cp.content_id, cp.content_type
  ORDER BY total_views DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;
