-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- General
    site_name TEXT NOT NULL DEFAULT 'Axis Cyber Technologies',
    site_tagline TEXT DEFAULT 'Next-Generation Software Engineering',
    site_description TEXT DEFAULT 'We architect next-generation software ecosystems for forward-thinking enterprises.',
    site_url TEXT NOT NULL DEFAULT 'https://axiscyber.tech',
    site_logo_url TEXT,
    favicon_url TEXT,

    -- Contact Information
    contact_email TEXT NOT NULL DEFAULT 'info@axiscyber.tech',
    support_email TEXT,
    sales_email TEXT,
    phone_primary TEXT,
    phone_secondary TEXT,

    -- Social Media
    facebook_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    github_url TEXT,
    youtube_url TEXT,

    -- Business Information
    company_name TEXT NOT NULL DEFAULT 'Axis Cyber Technologies',
    company_address TEXT,
    company_city TEXT,
    company_state TEXT,
    company_zip TEXT,
    company_country TEXT,
    tax_id TEXT,

    -- Office Locations
    office_lahore TEXT,
    office_dubai TEXT,
    office_los_angeles TEXT,
    office_london TEXT,

    -- Analytics & Tracking
    google_analytics_id TEXT,
    facebook_pixel_id TEXT,
    google_tag_manager_id TEXT,

    -- Features
    maintenance_mode BOOLEAN DEFAULT false,
    allow_registration BOOLEAN DEFAULT false,
    enable_blog BOOLEAN DEFAULT true,
    enable_portfolio BOOLEAN DEFAULT true,
    enable_comments BOOLEAN DEFAULT true,

    -- SEO Defaults
    default_og_image TEXT,
    default_twitter_card TEXT DEFAULT 'summary_large_image',

    -- Newsletter
    mailchimp_api_key TEXT,
    mailchimp_list_id TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public to read site settings
CREATE POLICY "Allow public read access" ON site_settings
    FOR SELECT USING (true);

-- Allow authenticated users (admins) to update site settings
CREATE POLICY "Allow authenticated update access" ON site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default settings if not exists
INSERT INTO site_settings (
    site_name, 
    site_url, 
    contact_email, 
    company_name
) 
SELECT 
    'Axis Cyber Technologies', 
    'https://axiscyber.tech', 
    'info@axiscyber.tech', 
    'Axis Cyber Technologies'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);
