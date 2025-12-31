-- =====================================================================
-- AXIS CYBER TECHNOLOGIES - PHASE 2: COMPREHENSIVE DATABASE SCHEMA
-- =====================================================================
-- This extends Phase 1 with full CMS tables for content management
-- Run this AFTER running the Phase 1 schema (supabase-schema.sql)
-- =====================================================================

-- =====================================================================
-- 1. BLOG SYSTEM
-- =====================================================================

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7), -- Hex color for UI (e.g., #00E5FF)
  icon VARCHAR(50), -- Lucide icon name
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Tags Table
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500), -- URL or path
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name VARCHAR(100) NOT NULL,
  author_avatar VARCHAR(500),
  author_role VARCHAR(100),
  read_time INTEGER, -- Minutes
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Post Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- =====================================================================
-- 2. CASE STUDIES / PROJECTS
-- =====================================================================

-- Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  client_name VARCHAR(255) NOT NULL,
  client_logo VARCHAR(500),
  client_industry VARCHAR(100),
  project_type VARCHAR(100), -- 'Web Development', 'AI/ML', etc.
  summary TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  technologies TEXT[], -- Array of tech used
  services TEXT[], -- Array of services provided
  featured_image VARCHAR(500),
  gallery_images TEXT[], -- Array of image URLs
  testimonial TEXT,
  testimonial_author VARCHAR(100),
  testimonial_role VARCHAR(100),
  project_duration VARCHAR(50), -- '3 months', '6-12 months'
  team_size VARCHAR(50), -- '5-10 developers'
  completion_date DATE,
  project_url VARCHAR(500),
  github_url VARCHAR(500),
  success_metrics JSONB, -- {revenue_increase: '200%', users: '10000+'}
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
  display_order INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 3. SERVICES (12 Services from your website)
-- =====================================================================

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  short_description TEXT NOT NULL,
  full_description TEXT,
  icon VARCHAR(50), -- Lucide icon name
  color VARCHAR(7), -- Hex color
  features TEXT[], -- Array of key features
  technologies TEXT[], -- Tech stack used
  use_cases TEXT[], -- Common use cases
  pricing_model VARCHAR(100), -- 'Project-based', 'Monthly retainer', etc.
  starting_price VARCHAR(50), -- 'From $5,000'
  process_steps JSONB, -- [{step: 1, title: '...', description: '...'}]
  case_study_ids TEXT[], -- Array of related case study IDs
  success_rate INTEGER DEFAULT 100, -- 100% by default as per brand
  projects_completed INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 4. TESTIMONIALS / REVIEWS
-- =====================================================================

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_role VARCHAR(255),
  client_company VARCHAR(255),
  client_avatar VARCHAR(500),
  client_location VARCHAR(100), -- 'Los Angeles, USA'
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service_provided VARCHAR(255), -- Which service they used
  project_id UUID REFERENCES case_studies(id) ON DELETE SET NULL,
  video_url VARCHAR(500), -- Optional video testimonial
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published', -- 'draft', 'published', 'archived'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 5. TEAM MEMBERS
-- =====================================================================

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL, -- 'CEO', 'Lead Developer', etc.
  department VARCHAR(100), -- 'Engineering', 'Design', 'Management'
  bio TEXT,
  avatar VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(100), -- 'Lahore, Pakistan'
  office_location VARCHAR(100), -- 'Lahore', 'Dubai', 'Los Angeles', 'London'
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  twitter_url VARCHAR(500),
  skills TEXT[], -- Array of skills
  specializations TEXT[], -- Areas of expertise
  years_experience INTEGER,
  projects_completed INTEGER DEFAULT 0,
  is_leadership BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  joined_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 6. CAREERS / JOB LISTINGS
-- =====================================================================

-- Career Listings Table
CREATE TABLE IF NOT EXISTS career_listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  department VARCHAR(100) NOT NULL, -- 'Engineering', 'Design', 'Marketing'
  location VARCHAR(100) NOT NULL, -- 'Lahore, Pakistan' or 'Remote'
  office_locations TEXT[], -- ['Lahore', 'Dubai', 'Remote']
  employment_type VARCHAR(50) NOT NULL, -- 'Full-time', 'Part-time', 'Contract'
  experience_level VARCHAR(50), -- 'Entry', 'Mid', 'Senior', 'Lead'
  salary_range VARCHAR(100), -- '$60,000 - $80,000' or 'Competitive'
  summary TEXT NOT NULL,
  responsibilities TEXT[],
  requirements TEXT[],
  preferred_qualifications TEXT[],
  benefits TEXT[],
  technologies TEXT[], -- Required tech skills
  application_deadline DATE,
  positions_available INTEGER DEFAULT 1,
  applications_count INTEGER DEFAULT 0,
  is_remote BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'closed', 'filled'
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES career_listings(id) ON DELETE CASCADE,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50),
  applicant_location VARCHAR(100),
  resume_url VARCHAR(500), -- URL to uploaded resume
  cover_letter TEXT,
  portfolio_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  years_experience INTEGER,
  applicant_current_role VARCHAR(255),
  applicant_current_company VARCHAR(255),
  expected_salary VARCHAR(100),
  availability VARCHAR(100), -- 'Immediate', '2 weeks', '1 month'
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 7. FAQs
-- =====================================================================

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100), -- 'General', 'Pricing', 'Services', 'Technical'
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 8. MEDIA LIBRARY
-- =====================================================================

-- Media Library Table
CREATE TABLE IF NOT EXISTS media_library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50), -- 'image', 'video', 'document', 'audio'
  mime_type VARCHAR(100),
  file_size INTEGER, -- Bytes
  width INTEGER, -- For images/videos
  height INTEGER, -- For images/videos
  alt_text TEXT,
  caption TEXT,
  tags TEXT[],
  uploaded_by VARCHAR(255),
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 9. SETTINGS / CONFIGURATION
-- =====================================================================

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  category VARCHAR(100), -- 'general', 'seo', 'email', 'social'
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- 10. OFFICE LOCATIONS
-- =====================================================================

-- Office Locations Table
CREATE TABLE IF NOT EXISTS office_locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- 'Lahore Office'
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  postal_code VARCHAR(20),
  phone VARCHAR(50),
  email VARCHAR(255),
  timezone VARCHAR(50), -- 'Asia/Karachi'
  operating_hours JSONB, -- {monday: '9AM-6PM', ...}
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  map_url VARCHAR(500),
  is_headquarters BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  team_size INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================================

-- Blog indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Case studies indexes
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured);
CREATE INDEX IF NOT EXISTS idx_case_studies_client ON case_studies(client_name);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

-- Team indexes
CREATE INDEX IF NOT EXISTS idx_team_slug ON team_members(slug);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_office ON team_members(office_location);

-- Career indexes
CREATE INDEX IF NOT EXISTS idx_careers_slug ON career_listings(slug);
CREATE INDEX IF NOT EXISTS idx_careers_status ON career_listings(status);
CREATE INDEX IF NOT EXISTS idx_careers_location ON career_listings(location);
CREATE INDEX IF NOT EXISTS idx_careers_department ON career_listings(department);
CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- Media indexes
CREATE INDEX IF NOT EXISTS idx_media_file_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_created ON media_library(created_at DESC);

-- =====================================================================
-- UPDATED_AT TRIGGERS
-- =====================================================================

CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_listings_updated_at
  BEFORE UPDATE ON career_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_library_updated_at
  BEFORE UPDATE ON media_library
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_office_locations_updated_at
  BEFORE UPDATE ON office_locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================================

-- Enable RLS on all new tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_locations ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Enable read for published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Enable read for all blog categories"
  ON blog_categories FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Enable read for all blog tags"
  ON blog_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable read for blog post tags"
  ON blog_post_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable read for published case studies"
  ON case_studies FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Enable read for active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Enable read for published testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Enable read for active team members"
  ON team_members FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Enable read for open career listings"
  ON career_listings FOR SELECT
  TO public
  USING (status = 'open');

CREATE POLICY "Enable insert for job applications"
  ON job_applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read for all FAQs"
  ON faqs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable read for public settings"
  ON site_settings FOR SELECT
  TO public
  USING (is_public = true);

CREATE POLICY "Enable read for active offices"
  ON office_locations FOR SELECT
  TO public
  USING (is_active = true);

-- Admin-only full access (authenticated users)
CREATE POLICY "Enable all for authenticated users on blog_posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on blog_categories"
  ON blog_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on case_studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on team"
  ON team_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on careers"
  ON career_listings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on job applications"
  ON job_applications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all for authenticated users on media"
  ON media_library FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================================
-- ANALYTICS VIEWS
-- =====================================================================

-- Blog analytics view
CREATE OR REPLACE VIEW blog_analytics AS
SELECT
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE status = 'published') as published_posts,
  COUNT(*) FILTER (WHERE status = 'draft') as draft_posts,
  COUNT(*) FILTER (WHERE is_featured = true) as featured_posts,
  SUM(views) as total_views,
  SUM(likes) as total_likes,
  COUNT(*) FILTER (WHERE published_at > NOW() - INTERVAL '30 days') as posts_this_month
FROM blog_posts;

-- Case studies analytics view
CREATE OR REPLACE VIEW case_studies_analytics AS
SELECT
  COUNT(*) as total_case_studies,
  COUNT(*) FILTER (WHERE status = 'published') as published,
  COUNT(*) FILTER (WHERE is_featured = true) as featured,
  SUM(views) as total_views,
  COUNT(DISTINCT client_industry) as industries_served
FROM case_studies;

-- Career analytics view
CREATE OR REPLACE VIEW career_analytics AS
SELECT
  COUNT(*) as total_listings,
  COUNT(*) FILTER (WHERE status = 'open') as open_positions,
  SUM(positions_available) FILTER (WHERE status = 'open') as total_openings,
  COUNT(DISTINCT department) as departments_hiring,
  (SELECT COUNT(*) FROM job_applications WHERE status = 'new') as pending_applications
FROM career_listings;

-- =====================================================================
-- TABLE COMMENTS FOR DOCUMENTATION
-- =====================================================================

COMMENT ON TABLE blog_categories IS 'Blog post categories for content organization';
COMMENT ON TABLE blog_tags IS 'Tags for blog posts (many-to-many)';
COMMENT ON TABLE blog_posts IS 'Main blog content with rich metadata';
COMMENT ON TABLE case_studies IS 'Project showcases and client success stories';
COMMENT ON TABLE services IS 'The 12 core services offered by Axis Cyber';
COMMENT ON TABLE testimonials IS 'Client reviews and testimonials';
COMMENT ON TABLE team_members IS 'Company team members across global offices';
COMMENT ON TABLE career_listings IS 'Job openings and career opportunities';
COMMENT ON TABLE job_applications IS 'Applications submitted for job listings';
COMMENT ON TABLE faqs IS 'Frequently asked questions';
COMMENT ON TABLE media_library IS 'Centralized media/file storage';
COMMENT ON TABLE site_settings IS 'Global site configuration';
COMMENT ON TABLE office_locations IS 'Physical office locations (Lahore, Dubai, LA, London)';

-- =====================================================================
-- PHASE 2 COMPLETE
-- =====================================================================
-- Total Tables Created: 14 new tables (18 total with Phase 1)
-- Total Views: 3 new analytics views (6 total)
-- Total Indexes: 26 new indexes
-- Total Triggers: 12 new triggers
-- =====================================================================