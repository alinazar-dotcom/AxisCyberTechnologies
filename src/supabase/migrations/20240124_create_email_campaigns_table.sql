-- Create email campaigns and automation tables

-- 1. Email Campaigns Table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  preview_text VARCHAR(500),
  from_name VARCHAR(255) DEFAULT 'Axis Cyber Technologies',
  from_email VARCHAR(255) DEFAULT 'hello@axiscybertech.com',
  reply_to VARCHAR(255),
  html_content TEXT NOT NULL,
  plain_text_content TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'paused'
  campaign_type VARCHAR(50) DEFAULT 'newsletter', -- 'newsletter', 'promotional', 'transactional', 'announcement'
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  total_recipients INTEGER DEFAULT 0,
  total_sent INTEGER DEFAULT 0,
  total_opens INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_bounces INTEGER DEFAULT 0,
  total_unsubscribes INTEGER DEFAULT 0,
  created_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_type ON email_campaigns(campaign_type);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_scheduled ON email_campaigns(scheduled_at);

-- 2. Email Templates Table
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(500) NOT NULL,
  html_content TEXT NOT NULL,
  plain_text_content TEXT,
  template_type VARCHAR(50) DEFAULT 'custom', -- 'welcome', 'newsletter', 'promotional', 'custom'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(is_active);

-- 3. Email Automation Sequences Table
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger_type VARCHAR(50) NOT NULL, -- 'newsletter_signup', 'contact_form', 'new_user', 'custom'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_sequences_trigger ON email_sequences(trigger_type);
CREATE INDEX IF NOT EXISTS idx_email_sequences_active ON email_sequences(is_active);

-- 4. Email Sequence Steps Table
CREATE TABLE IF NOT EXISTS email_sequence_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sequence_id UUID NOT NULL REFERENCES email_sequences(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  delay_days INTEGER DEFAULT 0, -- Days to wait before sending
  delay_hours INTEGER DEFAULT 0, -- Additional hours to wait
  template_id UUID REFERENCES email_templates(id),
  subject VARCHAR(500) NOT NULL,
  html_content TEXT NOT NULL,
  plain_text_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_sequence_steps_sequence ON email_sequence_steps(sequence_id);
CREATE INDEX IF NOT EXISTS idx_email_sequence_steps_template ON email_sequence_steps(template_id);

-- 5. Email Subscriber Segments Table
CREATE TABLE IF NOT EXISTS email_segments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filter_criteria JSONB, -- Store complex filter rules as JSON
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_email_campaigns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_campaigns_updated_at
  BEFORE UPDATE ON email_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_email_campaigns_updated_at();

CREATE TRIGGER email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_email_campaigns_updated_at();

CREATE TRIGGER email_sequences_updated_at
  BEFORE UPDATE ON email_sequences
  FOR EACH ROW
  EXECUTE FUNCTION update_email_campaigns_updated_at();

CREATE TRIGGER email_sequence_steps_updated_at
  BEFORE UPDATE ON email_sequence_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_email_campaigns_updated_at();

CREATE TRIGGER email_segments_updated_at
  BEFORE UPDATE ON email_segments
  FOR EACH ROW
  EXECUTE FUNCTION update_email_campaigns_updated_at();

-- RLS Policies
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_segments ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can manage email marketing
CREATE POLICY "Authenticated users can manage campaigns"
  ON email_campaigns FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage templates"
  ON email_templates FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage sequences"
  ON email_sequences FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage sequence steps"
  ON email_sequence_steps FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage segments"
  ON email_segments FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default templates
INSERT INTO email_templates (name, description, subject, template_type, html_content, plain_text_content) VALUES
(
  'Welcome Email',
  'Sent to new newsletter subscribers',
  'Welcome to Axis Cyber Technologies! 🚀',
  'welcome',
  '<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #DD00FF;">Welcome Aboard! 🎉</h1><p>Thanks for subscribing to Axis Cyber Technologies newsletter!</p><p>You''ll now receive:</p><ul><li>Latest insights on AI, blockchain, and cloud</li><li>Exclusive tips from our engineering team</li><li>Early access to new services</li></ul><p>Looking forward to sharing amazing content with you!</p><p style="margin-top: 40px;">Best regards,<br><strong>Axis Cyber Technologies Team</strong></p></body></html>',
  'Welcome Aboard! Thanks for subscribing to Axis Cyber Technologies newsletter! You will now receive latest insights on AI, blockchain, and cloud, exclusive tips from our engineering team, and early access to new services. Looking forward to sharing amazing content with you! Best regards, Axis Cyber Technologies Team'
),
(
  'Monthly Newsletter',
  'Monthly digest of blog posts and updates',
  '📰 This Month at Axis Cyber Technologies',
  'newsletter',
  '<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #00FFFF;">This Month''s Highlights 🌟</h1><p>Here''s what we''ve been up to this month...</p><h2>Latest Blog Posts</h2><p>[Blog posts will be inserted here]</p><h2>New Services</h2><p>[Services will be inserted here]</p><p style="margin-top: 40px;">Keep building amazing things!<br><strong>Axis Cyber Technologies</strong></p></body></html>',
  'This Month at Axis Cyber Technologies - Latest blog posts and new services. Keep building amazing things!'
);

-- Insert default sequence (Welcome Series)
INSERT INTO email_sequences (name, description, trigger_type, is_active) VALUES
(
  'Welcome Series',
  'Automated welcome emails for new subscribers',
  'newsletter_signup',
  true
);

-- Get the sequence ID for inserting steps
DO $$
DECLARE
  seq_id UUID;
BEGIN
  SELECT id INTO seq_id FROM email_sequences WHERE name = 'Welcome Series';
  
  INSERT INTO email_sequence_steps (sequence_id, step_number, delay_days, delay_hours, subject, html_content, plain_text_content) VALUES
  (
    seq_id,
    1,
    0,
    0,
    'Welcome to Axis Cyber Technologies! 🚀',
    '<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #DD00FF;">Welcome! 🎉</h1><p>Thanks for joining us! Get ready for amazing content.</p></body></html>',
    'Welcome! Thanks for joining us! Get ready for amazing content.'
  ),
  (
    seq_id,
    2,
    2,
    0,
    'Here''s what we can do for you 💼',
    '<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #00FFFF;">Our Services 💼</h1><p>Discover how we can help transform your business with cutting-edge technology.</p></body></html>',
    'Discover our services and how we can help transform your business.'
  ),
  (
    seq_id,
    3,
    5,
    0,
    'Meet the team behind the magic ✨',
    '<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #FF0099;">Meet Our Team ✨</h1><p>Learn about the talented engineers, designers, and strategists making it all happen.</p></body></html>',
    'Meet our talented team of engineers, designers, and strategists.'
  );
END $$;
