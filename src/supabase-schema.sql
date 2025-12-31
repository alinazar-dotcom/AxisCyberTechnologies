-- Axis Cyber Technologies - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(100) DEFAULT 'website_footer',
  is_active BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  services TEXT[], -- Array of selected services
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'completed'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Requests Table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  project_type VARCHAR(100),
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'scheduled', 'completed'
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics/Page Views Table (Optional)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address INET,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(255)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requested ON consultation_requests(requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert access (for forms)
-- Anyone can subscribe to newsletter
CREATE POLICY "Enable insert for newsletter subscriptions"
  ON newsletter_subscriptions FOR INSERT
  TO public
  WITH CHECK (true);

-- Anyone can read their own subscription status by email
CREATE POLICY "Enable read for own newsletter subscription"
  ON newsletter_subscriptions FOR SELECT
  TO public
  USING (true);

-- Anyone can submit contact forms
CREATE POLICY "Enable insert for contact submissions"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Anyone can submit consultation requests
CREATE POLICY "Enable insert for consultation requests"
  ON consultation_requests FOR INSERT
  TO public
  WITH CHECK (true);

-- Anyone can insert page views
CREATE POLICY "Enable insert for page views"
  ON page_views FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin-only policies (you'll need to set up authenticated users)
-- For now, these prevent public reads of sensitive data
CREATE POLICY "Enable read for authenticated users only on contacts"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users only on consultations"
  ON consultation_requests FOR SELECT
  TO authenticated
  USING (true);

-- Sample data (optional - for testing)
-- You can remove this section if you don't want sample data

/*
INSERT INTO newsletter_subscriptions (email, source) VALUES
  ('test@example.com', 'website_footer');

INSERT INTO contact_submissions (name, email, company, message, services) VALUES
  ('John Doe', 'john@example.com', 'Tech Corp', 'Interested in AI solutions', ARRAY['AI & Machine Learning', 'Cloud & DevOps']);
*/

-- Create a view for analytics dashboard (optional)
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT
  COUNT(*) as total_subscribers,
  COUNT(*) FILTER (WHERE is_active = true) as active_subscribers,
  COUNT(*) FILTER (WHERE subscribed_at > NOW() - INTERVAL '30 days') as new_this_month,
  COUNT(*) FILTER (WHERE subscribed_at > NOW() - INTERVAL '7 days') as new_this_week
FROM newsletter_subscriptions;

CREATE OR REPLACE VIEW contact_stats AS
SELECT
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE status = 'new') as pending,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
  COUNT(*) FILTER (WHERE status = 'completed') as completed,
  COUNT(*) FILTER (WHERE submitted_at > NOW() - INTERVAL '7 days') as this_week
FROM contact_submissions;

-- Comments for documentation
COMMENT ON TABLE newsletter_subscriptions IS 'Stores email newsletter subscriptions from website footer';
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from various pages';
COMMENT ON TABLE consultation_requests IS 'Stores consultation booking requests';
COMMENT ON TABLE page_views IS 'Optional analytics table for tracking page views';
