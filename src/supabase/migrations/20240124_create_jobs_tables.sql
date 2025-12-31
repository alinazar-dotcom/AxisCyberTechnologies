-- Create jobs and job applications tables

-- 1. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(100) NOT NULL, -- 'Engineering', 'Design', 'Sales', 'Marketing', etc.
  location VARCHAR(255) NOT NULL, -- 'Lahore, Pakistan', 'Remote', 'Dubai, UAE', etc.
  employment_type VARCHAR(50) NOT NULL, -- 'Full-time', 'Part-time', 'Contract', 'Internship'
  experience_level VARCHAR(50) NOT NULL, -- 'Entry', 'Mid', 'Senior', 'Lead'
  salary_range VARCHAR(100), -- e.g., '$80k - $120k', 'Competitive'
  description TEXT NOT NULL,
  responsibilities TEXT[], -- Array of responsibilities
  requirements TEXT[], -- Array of requirements
  nice_to_have TEXT[], -- Array of nice-to-have skills
  benefits TEXT[], -- Array of benefits
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  apply_url TEXT, -- External application URL (optional)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_is_featured ON jobs(is_featured);

-- 2. Job Applications Table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  portfolio_url VARCHAR(500),
  resume_url VARCHAR(1000), -- URL to uploaded resume
  cover_letter TEXT,
  years_of_experience INTEGER,
  current_location VARCHAR(255),
  available_from DATE,
  expected_salary VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'reviewed', 'interview', 'rejected', 'hired'
  notes TEXT, -- Admin notes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_created ON job_applications(created_at DESC);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_jobs_updated_at();

CREATE OR REPLACE FUNCTION update_job_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_applications_updated_at();

-- RLS Policies
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Public can read active jobs
CREATE POLICY "Active jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (is_active = true);

-- Anyone can apply (insert application)
CREATE POLICY "Anyone can submit job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can manage jobs and applications
CREATE POLICY "Authenticated users can manage jobs"
  ON jobs FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read all applications"
  ON job_applications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update applications"
  ON job_applications FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete applications"
  ON job_applications FOR DELETE
  USING (auth.role() = 'authenticated');

-- Add application count to jobs (for performance)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS application_count INTEGER DEFAULT 0;

-- Function to update application count
CREATE OR REPLACE FUNCTION update_job_application_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE jobs 
    SET application_count = application_count + 1 
    WHERE id = NEW.job_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE jobs 
    SET application_count = application_count - 1 
    WHERE id = OLD.job_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_application_count
  AFTER INSERT OR DELETE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_application_count();

-- Insert sample jobs
INSERT INTO jobs (title, slug, department, location, employment_type, experience_level, salary_range, description, responsibilities, requirements, nice_to_have, benefits, is_active, is_featured) VALUES
(
  'Senior Full Stack Engineer',
  'senior-full-stack-engineer',
  'Engineering',
  'Remote (Global)',
  'Full-time',
  'Senior',
  '$120k - $180k',
  'Join our elite engineering team to build next-generation AI-powered applications. Work with cutting-edge technologies and solve complex problems at scale.',
  ARRAY[
    'Design and implement scalable web applications using React, Node.js, and modern cloud infrastructure',
    'Lead technical discussions and mentor junior engineers',
    'Collaborate with product and design teams to deliver exceptional user experiences',
    'Write clean, maintainable, and well-tested code',
    'Participate in code reviews and contribute to engineering best practices'
  ],
  ARRAY[
    '5+ years of professional software development experience',
    'Expert-level knowledge of JavaScript/TypeScript, React, and Node.js',
    'Strong understanding of database design (PostgreSQL, MongoDB)',
    'Experience with cloud platforms (AWS, GCP, or Azure)',
    'Excellent problem-solving and communication skills'
  ],
  ARRAY[
    'Experience with AI/ML integration',
    'Blockchain development background',
    'Open source contributions',
    'Experience leading engineering teams'
  ],
  ARRAY[
    'Competitive salary + equity',
    'Fully remote work environment',
    'Health insurance',
    'Annual learning budget ($2,000)',
    '4 weeks PTO',
    'Latest equipment (MacBook Pro, etc.)'
  ],
  true,
  true
),
(
  'Product Designer (UI/UX)',
  'product-designer-ui-ux',
  'Design',
  'Lahore, Pakistan / Remote',
  'Full-time',
  'Mid',
  'Competitive',
  'Shape the future of our products through exceptional design. Create beautiful, intuitive interfaces that delight users and drive business results.',
  ARRAY[
    'Design user-centric interfaces for web and mobile applications',
    'Create wireframes, prototypes, and high-fidelity mockups',
    'Conduct user research and usability testing',
    'Collaborate with engineers to implement designs',
    'Maintain and evolve our design system'
  ],
  ARRAY[
    '3+ years of product design experience',
    'Expert-level Figma skills',
    'Strong portfolio showcasing UI/UX work',
    'Understanding of responsive and accessible design',
    'Excellent visual design skills'
  ],
  ARRAY[
    'Motion design skills',
    'Front-end development knowledge (HTML/CSS)',
    'Experience with design tokens and component libraries',
    'Illustration skills'
  ],
  ARRAY[
    'Competitive salary',
    'Hybrid/remote work options',
    'Health insurance',
    'Professional development opportunities',
    'Creative workspace'
  ],
  true,
  false
),
(
  'DevOps Engineer',
  'devops-engineer',
  'Engineering',
  'Dubai, UAE',
  'Full-time',
  'Mid',
  '$90k - $130k',
  'Build and maintain our cloud infrastructure. Automate everything and ensure 99.99% uptime for our global customers.',
  ARRAY[
    'Design and implement CI/CD pipelines',
    'Manage cloud infrastructure (AWS/GCP)',
    'Monitor system performance and optimize for scale',
    'Implement security best practices',
    'Automate deployment and operations tasks'
  ],
  ARRAY[
    '3+ years of DevOps/SRE experience',
    'Strong knowledge of Docker, Kubernetes, and container orchestration',
    'Experience with infrastructure as code (Terraform, CloudFormation)',
    'Proficiency in scripting (Bash, Python)',
    'Understanding of networking and security'
  ],
  ARRAY[
    'AWS/GCP certifications',
    'Experience with service mesh (Istio, Linkerd)',
    'GitOps experience (ArgoCD, Flux)',
    'Database administration skills'
  ],
  ARRAY[
    'Competitive salary',
    'Relocation assistance to Dubai',
    'Health insurance',
    'Annual bonus',
    'Visa sponsorship'
  ],
  true,
  false
);
