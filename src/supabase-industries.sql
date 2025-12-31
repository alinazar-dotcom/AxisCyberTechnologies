-- Axis Cyber Technologies - Industries Table Schema & Seed
-- Run this in your Supabase SQL Editor

-- Create Industries Table
CREATE TABLE IF NOT EXISTS industries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50), -- Lucide icon name
  color VARCHAR(50), -- Tailwind color name
  gradient VARCHAR(255), -- Tailwind gradient classes
  projects VARCHAR(50), -- e.g., '85+'
  growth VARCHAR(50), -- e.g., '+156%'
  highlight VARCHAR(100), -- e.g., 'HFT & Trading'
  clients VARCHAR(100), -- e.g., '12 Fortune 500'
  metric VARCHAR(100), -- e.g., '< 1ms Latency'
  tags TEXT[], -- Array of tags
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;

-- Create public read policy
DROP POLICY IF EXISTS "Enable read for active industries" ON industries;
CREATE POLICY "Enable read for active industries"
  ON industries FOR SELECT
  TO public
  USING (is_active = true);

-- Seed Data
INSERT INTO industries (title, slug, description, icon, color, gradient, projects, growth, highlight, clients, metric, tags, display_order)
VALUES 
('Financial Services & Capital Markets', 'financial-services', 'High-frequency trading systems, algorithmic execution engines, risk analytics platforms, regulatory compliance automation, and real-time payment infrastructure.', 'TrendingUp', 'emerald', 'from-emerald-500 to-teal-500', '85+', '+156%', 'HFT & Trading', '12 Fortune 500', '< 1ms Latency', ARRAY['Trading', 'Risk Analytics', 'Compliance', 'Payments'], 1),
('Blockchain & Distributed Ledger', 'blockchain', 'Enterprise blockchain networks, tokenization platforms, digital asset custody solutions, smart contract security auditing, and DeFi infrastructure.', 'Blocks', 'violet', 'from-violet-500 to-purple-500', '62+', '+240%', 'DeFi & Web3', '40+ Protocols', '99.99% Uptime', ARRAY['Smart Contracts', 'DeFi', 'NFTs', 'Tokenization'], 2),
('Healthcare & Life Sciences', 'healthcare', 'Clinical trials management systems, genomics data processing, medical device integration, pharmaceutical supply chain, and diagnostic AI models.', 'Activity', 'rose', 'from-rose-500 to-pink-500', '48+', '+128%', 'Medical AI', '25 Hospitals', 'HIPAA Compliant', ARRAY['Clinical AI', 'Genomics', 'Telemedicine', 'Diagnostics'], 3),
('Defense & Aerospace', 'defense-aerospace', 'Encrypted communication systems, mission-critical infrastructure, satellite data processing, cybersecurity defense platforms, and tactical simulation.', 'Shield', 'slate', 'from-slate-500 to-gray-500', '31+', '+94%', 'Secure Systems', '8 Gov Agencies', 'Mil-Grade Security', ARRAY['Encryption', 'Satellite', 'Cyber Defense', 'Simulation'], 4),
('Energy & Utilities', 'energy-utilities', 'Smart grid orchestration, renewable energy optimization, power distribution networks, energy trading platforms, and predictive maintenance AI.', 'Zap', 'amber', 'from-amber-500 to-yellow-500', '42+', '+167%', 'Smart Grid', '15 Utilities', '40% Energy Saved', ARRAY['Smart Grid', 'Renewables', 'Trading', 'Maintenance'], 5),
('Telecommunications & 5G', 'telecommunications', 'Network orchestration platforms, carrier-grade infrastructure, edge computing systems, spectrum management, and SDN/NFV solutions.', 'Radio', 'blue', 'from-blue-500 to-indigo-500', '56+', '+189%', '5G & Edge', '18 Carriers', '5G Ready', ARRAY['5G Networks', 'Edge Computing', 'SDN', 'NFV'], 6),
('Supply Chain & Logistics', 'supply-chain', 'Multi-modal logistics optimization, warehouse automation systems, demand forecasting AI, fleet management platforms, and customs compliance.', 'Package', 'orange', 'from-orange-500 to-red-500', '67+', '+145%', 'AI Optimization', '30+ Logistics', '35% Cost Reduced', ARRAY['Logistics AI', 'Automation', 'Forecasting', 'Fleet'], 7),
('Manufacturing & Industry 4.0', 'manufacturing', 'Digital twin technology, predictive maintenance systems, robotics integration platforms, quality control AI, and production optimization.', 'Factory', 'cyan', 'from-cyan-500 to-blue-500', '53+', '+178%', 'Digital Twin', '22 Manufacturers', '60% Efficiency', ARRAY['Digital Twin', 'Robotics', 'Quality AI', 'IoT'], 8),
('Insurance & Risk Management', 'insurance', 'Underwriting automation, claims processing AI, fraud detection systems, catastrophe modeling, and actuarial analytics platforms.', 'FileText', 'teal', 'from-teal-500 to-emerald-500', '39+', '+112%', 'AI Underwriting', '14 Insurers', '80% Faster Claims', ARRAY['Underwriting', 'Fraud Detection', 'Analytics', 'Modeling'], 9)
ON CONFLICT (title) DO NOTHING;
