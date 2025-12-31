-- ============================================
-- AXIS CYBER TECHNOLOGIES
-- Database Seed Data - FIXED TO MATCH SCHEMA
-- ============================================
-- This file populates the database with all website content
-- matching the current hardcoded data for seamless migration
-- ============================================

-- Clean existing data (optional - uncomment if you want to clean first)
-- TRUNCATE TABLE blog_post_tags, blog_posts, blog_categories, blog_tags CASCADE;
-- TRUNCATE TABLE case_studies, services, testimonials, team_members CASCADE;
-- TRUNCATE TABLE career_listings, job_applications, faqs CASCADE;
-- TRUNCATE TABLE media_library, site_settings, office_locations CASCADE;

-- ============================================
-- 1. OFFICE LOCATIONS (4 Global Offices)
-- ============================================

INSERT INTO office_locations (
  name,
  city,
  country,
  address,
  phone,
  email,
  timezone,
  latitude,
  longitude,
  is_headquarters,
  is_active,
  display_order,
  operating_hours
) VALUES
(
  'Lahore Office - Headquarters',
  'Lahore',
  'Pakistan',
  'DHA Phase 6, Lahore, Punjab, Pakistan',
  '+92 300 1234567',
  'lahore@axiscyber.tech',
  'Asia/Karachi',
  31.4697,
  74.2728,
  true,
  true,
  1,
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
),
(
  'Dubai Office',
  'Dubai',
  'United Arab Emirates',
  'Dubai Internet City, Dubai, UAE',
  '+971 4 123 4567',
  'dubai@axiscyber.tech',
  'Asia/Dubai',
  25.0969,
  55.1562,
  false,
  true,
  2,
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "Closed", "saturday": "9:00 AM - 2:00 PM", "sunday": "Closed"}'::jsonb
),
(
  'Los Angeles Office',
  'Los Angeles',
  'United States',
  'Santa Monica Boulevard, Los Angeles, CA 90025',
  '+1 310 123 4567',
  'losangeles@axiscyber.tech',
  'America/Los_Angeles',
  34.0522,
  -118.2437,
  false,
  true,
  3,
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
),
(
  'London Office',
  'London',
  'United Kingdom',
  'Tech City, Old Street, London EC1V 9LT',
  '+44 20 1234 5678',
  'london@axiscyber.tech',
  'Europe/London',
  51.5074,
  -0.1278,
  false,
  true,
  4,
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
);

-- ============================================
-- 2. SERVICES (All 12 Core Services - 100% Success Rate)
-- ============================================
-- Schema columns: name, slug, tagline, short_description, full_description, icon, color, 
-- features, technologies, use_cases, pricing_model, starting_price, process_steps, 
-- case_study_ids, success_rate, projects_completed, is_featured, is_active, 
-- display_order, meta_title, meta_description

INSERT INTO services (
  name,
  slug,
  short_description,
  full_description,
  icon,
  features,
  technologies,
  use_cases,
  success_rate,
  projects_completed,
  starting_price,
  pricing_model,
  process_steps,
  is_featured,
  is_active,
  display_order,
  meta_title,
  meta_description
) VALUES
-- 1. AI & Machine Learning
(
  'AI & Machine Learning',
  'ai-ml',
  'Intelligent systems powered by cutting-edge AI and machine learning algorithms',
  'Transform your business with advanced AI and machine learning solutions. We build intelligent systems that learn, adapt, and deliver actionable insights to drive innovation and efficiency.',
  'brain-circuit',
  ARRAY['Deep Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Neural Networks', 'Model Training & Optimization'],
  ARRAY['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face', 'ONNX', 'MLflow'],
  ARRAY['Chatbots & Virtual Assistants', 'Fraud Detection', 'Recommendation Engines', 'Image Recognition', 'Sentiment Analysis', 'Demand Forecasting'],
  100,
  150,
  'From $50,000',
  'Project-based',
  '{"1": {"title": "Discovery & Data Assessment", "description": "Analyze your data and define objectives"}, "2": {"title": "Model Development", "description": "Build and train custom AI models"}, "3": {"title": "Testing & Validation", "description": "Validate accuracy and performance"}, "4": {"title": "Deployment & Integration", "description": "Deploy models into production"}, "5": {"title": "Monitoring & Optimization", "description": "Continuous improvement and retraining"}}'::jsonb,
  true,
  true,
  1,
  'AI & Machine Learning Services | Axis Cyber Technologies',
  'Transform your business with advanced AI and ML solutions. Deep learning, NLP, computer vision, and predictive analytics.'
),

-- 2. Web Development
(
  'Web Development',
  'web-development',
  'Modern, scalable web applications built with cutting-edge technologies',
  'Create powerful web experiences with our full-stack development expertise. We build fast, secure, and scalable web applications that engage users and drive business growth.',
  'code',
  ARRAY['Responsive Design', 'Progressive Web Apps', 'API Development', 'Real-time Features', 'E-commerce Solutions', 'Content Management Systems'],
  ARRAY['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
  ARRAY['Corporate Websites', 'E-commerce Platforms', 'SaaS Applications', 'Web Portals', 'Social Networks', 'Booking Systems'],
  100,
  300,
  'From $25,000',
  'Project-based',
  '{"1": {"title": "Requirements Gathering", "description": "Define scope and objectives"}, "2": {"title": "Design & Prototyping", "description": "Create wireframes and mockups"}, "3": {"title": "Development", "description": "Build frontend and backend"}, "4": {"title": "Testing & QA", "description": "Ensure quality and performance"}, "5": {"title": "Deployment & Support", "description": "Launch and maintain"}}'::jsonb,
  true,
  true,
  2,
  'Web Development Services | Axis Cyber Technologies',
  'Build modern, scalable web applications with React, Next.js, and Node.js. Full-stack development expertise.'
),

-- 3. Mobile App Development
(
  'Mobile App Development',
  'mobile-app-development',
  'Native and cross-platform mobile applications for iOS and Android',
  'Reach your customers on any device with our mobile app development services. We create beautiful, performant mobile experiences that users love.',
  'smartphone',
  ARRAY['Native iOS Development', 'Native Android Development', 'Cross-Platform Apps', 'App Store Optimization', 'Push Notifications', 'Offline Functionality'],
  ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'Redux', 'Expo'],
  ARRAY['Consumer Apps', 'Enterprise Mobility', 'On-Demand Services', 'Social Media Apps', 'Fitness & Health Apps', 'Financial Apps'],
  100,
  200,
  'From $40,000',
  'Project-based',
  '{"1": {"title": "Strategy & Planning", "description": "Define app concept and features"}, "2": {"title": "UX/UI Design", "description": "Create intuitive interfaces"}, "3": {"title": "Development", "description": "Build native or cross-platform"}, "4": {"title": "Testing", "description": "QA on multiple devices"}, "5": {"title": "Launch & Maintenance", "description": "Deploy to app stores"}}'::jsonb,
  true,
  true,
  3,
  'Mobile App Development | iOS & Android | Axis Cyber',
  'Build native and cross-platform mobile apps for iOS and Android. React Native, Flutter, Swift, and Kotlin expertise.'
),

-- 4. Cloud & DevOps
(
  'Cloud & DevOps',
  'cloud-devops',
  'Scalable cloud infrastructure and automated DevOps pipelines',
  'Accelerate your development and deployment with our cloud and DevOps expertise. We build reliable, scalable infrastructure that powers modern applications.',
  'cloud',
  ARRAY['Cloud Architecture', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code', 'Monitoring & Logging', 'Auto-scaling'],
  ARRAY['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'GitLab CI'],
  ARRAY['Cloud Migration', 'Microservices Architecture', 'Serverless Applications', 'DevOps Transformation', 'Disaster Recovery', 'Multi-Cloud Strategy'],
  100,
  180,
  'From $35,000',
  'Project-based',
  '{"1": {"title": "Assessment", "description": "Evaluate current infrastructure"}, "2": {"title": "Architecture Design", "description": "Plan cloud strategy"}, "3": {"title": "Implementation", "description": "Build and configure"}, "4": {"title": "Migration", "description": "Move workloads safely"}, "5": {"title": "Optimization", "description": "Monitor and improve"}}'::jsonb,
  true,
  true,
  4,
  'Cloud & DevOps Services | AWS, Azure, GCP | Axis Cyber',
  'Scalable cloud infrastructure and DevOps automation. AWS, Azure, Google Cloud, Kubernetes, and CI/CD expertise.'
),

-- 5. Cybersecurity
(
  'Cybersecurity',
  'cybersecurity',
  'Enterprise-grade security solutions to protect your digital assets',
  'Safeguard your business with comprehensive cybersecurity solutions. We protect your data, applications, and infrastructure from evolving threats.',
  'shield-check',
  ARRAY['Security Audits', 'Penetration Testing', 'Vulnerability Assessments', 'Security Operations Center', 'Incident Response', 'Compliance Management'],
  ARRAY['SIEM Tools', 'IDS/IPS', 'Firewalls', 'Encryption', 'Zero Trust Architecture', 'Security Frameworks', 'Threat Intelligence'],
  ARRAY['Security Audits', 'Compliance (GDPR, HIPAA)', 'Threat Detection', 'Data Protection', 'Access Management', 'Security Training'],
  100,
  120,
  'From $30,000',
  'Project-based',
  '{"1": {"title": "Risk Assessment", "description": "Identify vulnerabilities"}, "2": {"title": "Security Strategy", "description": "Design security framework"}, "3": {"title": "Implementation", "description": "Deploy security controls"}, "4": {"title": "Testing", "description": "Validate effectiveness"}, "5": {"title": "Monitoring", "description": "Continuous protection"}}'::jsonb,
  true,
  true,
  5,
  'Cybersecurity Services | Security Audits & Protection | Axis Cyber',
  'Enterprise cybersecurity solutions. Security audits, penetration testing, compliance, and threat protection.'
),

-- 6. Blockchain Development
(
  'Blockchain Development',
  'blockchain',
  'Decentralized solutions using blockchain and smart contract technology',
  'Build the future with blockchain technology. We create secure, transparent, and decentralized solutions that transform industries.',
  'link',
  ARRAY['Smart Contracts', 'DApp Development', 'NFT Platforms', 'DeFi Solutions', 'Tokenization', 'Blockchain Consulting'],
  ARRAY['Ethereum', 'Solidity', 'Web3.js', 'Hardhat', 'IPFS', 'Polygon', 'Hyperledger', 'Truffle'],
  ARRAY['Cryptocurrency Wallets', 'NFT Marketplaces', 'Supply Chain Tracking', 'Digital Identity', 'Voting Systems', 'DeFi Platforms'],
  100,
  80,
  'From $60,000',
  'Project-based',
  '{"1": {"title": "Blockchain Strategy", "description": "Define use case and platform"}, "2": {"title": "Smart Contract Development", "description": "Code and test contracts"}, "3": {"title": "DApp Development", "description": "Build user interfaces"}, "4": {"title": "Security Audit", "description": "Audit smart contracts"}, "5": {"title": "Deployment", "description": "Launch on mainnet"}}'::jsonb,
  true,
  true,
  6,
  'Blockchain Development | Smart Contracts & DApps | Axis Cyber',
  'Build decentralized applications with blockchain technology. Smart contracts, NFTs, DeFi, and Web3 solutions.'
),

-- 7. IoT & Edge Computing
(
  'IoT & Edge Computing',
  'iot-edge',
  'Connected devices and edge computing solutions for the smart future',
  'Connect the physical and digital worlds with IoT and edge computing. We build intelligent systems that collect, process, and act on data in real-time.',
  'cpu',
  ARRAY['IoT Device Integration', 'Edge Computing', 'Real-time Analytics', 'Device Management', 'Sensor Networks', 'Industrial IoT'],
  ARRAY['MQTT', 'CoAP', 'LoRaWAN', 'Edge AI', 'Time Series Databases', 'Arduino', 'Raspberry Pi', 'Azure IoT'],
  ARRAY['Smart Cities', 'Industrial Automation', 'Healthcare Monitoring', 'Smart Agriculture', 'Asset Tracking', 'Predictive Maintenance'],
  100,
  90,
  'From $45,000',
  'Project-based',
  '{"1": {"title": "IoT Strategy", "description": "Define device architecture"}, "2": {"title": "Hardware Integration", "description": "Connect sensors and devices"}, "3": {"title": "Edge Processing", "description": "Build edge computing logic"}, "4": {"title": "Cloud Integration", "description": "Connect to cloud platforms"}, "5": {"title": "Monitoring", "description": "Real-time dashboard"}}'::jsonb,
  true,
  true,
  7,
  'IoT & Edge Computing Solutions | Axis Cyber Technologies',
  'Build connected IoT solutions with edge computing. Real-time data processing, device management, and analytics.'
),

-- 8. Data Engineering
(
  'Data Engineering',
  'data-engineering',
  'Big data pipelines and analytics infrastructure for data-driven decisions',
  'Transform raw data into actionable insights with our data engineering expertise. We build robust data pipelines that power your analytics and AI initiatives.',
  'database',
  ARRAY['Data Warehousing', 'ETL Pipelines', 'Real-time Streaming', 'Data Lake Architecture', 'Data Quality', 'Analytics Platforms'],
  ARRAY['Apache Spark', 'Airflow', 'Kafka', 'Snowflake', 'dbt', 'Databricks', 'BigQuery', 'Redshift'],
  ARRAY['Data Warehouses', 'Real-time Analytics', 'Customer 360', 'Business Intelligence', 'Data Migration', 'ML Pipelines'],
  100,
  110,
  'From $40,000',
  'Project-based',
  '{"1": {"title": "Data Assessment", "description": "Audit current data landscape"}, "2": {"title": "Architecture Design", "description": "Design data infrastructure"}, "3": {"title": "Pipeline Development", "description": "Build ETL/ELT processes"}, "4": {"title": "Quality Assurance", "description": "Validate data accuracy"}, "5": {"title": "Optimization", "description": "Improve performance"}}'::jsonb,
  true,
  true,
  8,
  'Data Engineering Services | ETL, Data Pipelines | Axis Cyber',
  'Build scalable data pipelines and analytics infrastructure. ETL, data warehousing, and big data solutions.'
),

-- 9. Enterprise Software
(
  'Enterprise Software',
  'enterprise-software',
  'Custom enterprise solutions that streamline operations and drive growth',
  'Modernize your business with custom enterprise software. We build scalable, secure solutions that integrate seamlessly with your existing systems.',
  'building',
  ARRAY['ERP Systems', 'CRM Platforms', 'Workflow Automation', 'Business Intelligence', 'Integration Services', 'Legacy Modernization'],
  ARRAY['SAP', 'Salesforce', 'Microsoft Dynamics', 'Oracle', 'ServiceNow', 'REST APIs', 'SOAP', 'Microservices'],
  ARRAY['ERP Implementation', 'CRM Customization', 'Process Automation', 'System Integration', 'Digital Transformation', 'Custom Portals'],
  100,
  140,
  'From $80,000',
  'Project-based',
  '{"1": {"title": "Business Analysis", "description": "Understand processes and needs"}, "2": {"title": "Solution Design", "description": "Architect enterprise system"}, "3": {"title": "Development", "description": "Build custom modules"}, "4": {"title": "Integration", "description": "Connect with existing systems"}, "5": {"title": "Training & Support", "description": "User adoption and maintenance"}}'::jsonb,
  true,
  true,
  9,
  'Enterprise Software Development | ERP, CRM | Axis Cyber',
  'Custom enterprise software solutions. ERP, CRM, workflow automation, and digital transformation.'
),

-- 10. Product & UX Design
(
  'Product & UX Design',
  'product-ux',
  'User-centered design that creates delightful digital experiences',
  'Design products users love with our UX/UI expertise. We create intuitive, beautiful interfaces that drive engagement and conversions.',
  'palette',
  ARRAY['User Research', 'Wireframing & Prototyping', 'UI Design', 'Usability Testing', 'Design Systems', 'Accessibility'],
  ARRAY['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Miro', 'UserTesting'],
  ARRAY['Mobile App Design', 'Web Application Design', 'Design System Creation', 'UX Audits', 'Redesign Projects', 'Accessibility Compliance'],
  100,
  250,
  'From $20,000',
  'Project-based',
  '{"1": {"title": "Research", "description": "Understand users and context"}, "2": {"title": "Ideation", "description": "Brainstorm and sketch concepts"}, "3": {"title": "Prototyping", "description": "Create interactive prototypes"}, "4": {"title": "Testing", "description": "Validate with real users"}, "5": {"title": "Handoff", "description": "Deliver design system"}}'::jsonb,
  true,
  true,
  10,
  'Product & UX Design Services | Axis Cyber Technologies',
  'User-centered UX/UI design services. Research, prototyping, testing, and design systems.'
),

-- 11. Gaming & WebGL
(
  'Gaming & WebGL',
  'gaming-webgl',
  '3D web experiences and interactive gaming solutions',
  'Create immersive gaming and 3D web experiences. We build high-performance graphics applications that run seamlessly in the browser.',
  'gamepad',
  ARRAY['3D Web Graphics', 'Browser Games', 'WebGL Development', 'Game Engines', 'Real-time Rendering', 'Multiplayer Systems'],
  ARRAY['Three.js', 'WebGL', 'Unity', 'Babylon.js', 'Socket.io', 'WebRTC', 'GLSL', 'Canvas API'],
  ARRAY['Browser-based Games', '3D Product Visualizers', 'Virtual Tours', 'Interactive Experiences', 'Educational Simulations', 'Metaverse Applications'],
  100,
  70,
  'From $50,000',
  'Project-based',
  '{"1": {"title": "Concept Design", "description": "Define game mechanics and visuals"}, "2": {"title": "Prototyping", "description": "Build playable prototype"}, "3": {"title": "Development", "description": "Full game/experience development"}, "4": {"title": "Testing", "description": "QA and optimization"}, "5": {"title": "Launch", "description": "Deploy and market"}}'::jsonb,
  true,
  true,
  11,
  'Gaming & WebGL Development | 3D Web Graphics | Axis Cyber',
  'Build immersive 3D web experiences and browser games with WebGL, Three.js, and Unity.'
),

-- 12. Performance Optimization
(
  'Performance Optimization',
  'performance-optimization',
  'Speed up your applications and reduce infrastructure costs',
  'Maximize performance and minimize costs with our optimization expertise. We make your applications faster, more efficient, and more scalable.',
  'zap',
  ARRAY['Code Optimization', 'Database Tuning', 'Caching Strategies', 'CDN Integration', 'Load Balancing', 'Performance Monitoring'],
  ARRAY['Lighthouse', 'WebPageTest', 'New Relic', 'DataDog', 'Redis', 'Varnish', 'Cloudflare', 'nginx'],
  ARRAY['Website Speed Optimization', 'Database Performance', 'API Optimization', 'Mobile Performance', 'Infrastructure Scaling', 'Cost Reduction'],
  100,
  160,
  'From $15,000',
  'Project-based',
  '{"1": {"title": "Performance Audit", "description": "Identify bottlenecks"}, "2": {"title": "Optimization Plan", "description": "Prioritize improvements"}, "3": {"title": "Implementation", "description": "Apply optimizations"}, "4": {"title": "Testing", "description": "Measure improvements"}, "5": {"title": "Monitoring", "description": "Ongoing performance tracking"}}'::jsonb,
  true,
  true,
  12,
  'Performance Optimization Services | Axis Cyber Technologies',
  'Speed up applications and reduce costs. Code optimization, caching, CDN, and infrastructure tuning.'
);

-- ============================================
-- 3. TESTIMONIALS (Client Reviews)
-- ============================================
-- Schema columns: client_name, client_role, client_company, client_avatar, client_location, 
-- content, rating, service_provided, project_id, video_url, is_featured, is_verified, 
-- display_order, status

INSERT INTO testimonials (
  client_name,
  client_role,
  client_company,
  client_avatar,
  content,
  rating,
  service_provided,
  is_featured,
  is_verified,
  status,
  display_order
) VALUES
(
  'Sarah Johnson',
  'CTO',
  'FinTech Innovations',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  'Axis Cyber transformed our vision into reality with their AI-powered fraud detection system. The results exceeded our expectations - we reduced fraud by 85% in the first quarter. Their team''s expertise in machine learning is truly world-class.',
  5,
  'AI & Machine Learning',
  true,
  true,
  'published',
  1
),
(
  'Michael Chen',
  'CEO',
  'GlobalTrade Solutions',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  'Working with Axis Cyber on our enterprise platform was a game-changer. They delivered a scalable, secure solution that handles millions of transactions daily. The cloud infrastructure they built has been rock-solid for over two years.',
  5,
  'Cloud & DevOps',
  true,
  true,
  'published',
  2
),
(
  'Emily Rodriguez',
  'Product Manager',
  'HealthTech Plus',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
  'The mobile app Axis Cyber built for us has over 500K downloads and a 4.8 star rating. Their attention to detail in UX design and performance optimization is outstanding. They truly understand what it takes to build great mobile experiences.',
  5,
  'Mobile App Development',
  true,
  true,
  'published',
  3
),
(
  'David Park',
  'Head of Security',
  'SecureBank International',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  'Axis Cyber''s cybersecurity team helped us achieve SOC 2 compliance and implement a zero-trust architecture. Their penetration testing revealed vulnerabilities we didn''t know existed. We feel much more secure now.',
  5,
  'Cybersecurity',
  true,
  true,
  'published',
  4
),
(
  'Lisa Anderson',
  'Founder',
  'NFT Marketplace Pro',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
  'Our NFT marketplace handles $10M+ in monthly transactions thanks to Axis Cyber''s blockchain expertise. The smart contracts they wrote are efficient, secure, and have passed multiple audits. Couldn''t have done it without them.',
  5,
  'Blockchain Development',
  true,
  true,
  'published',
  5
),
(
  'James Wilson',
  'VP of Engineering',
  'DataStream Analytics',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  'Axis Cyber built our real-time data pipeline that processes 50TB of data daily. The architecture is elegant, performant, and maintainable. Our data-driven insights have never been more accurate or timely.',
  5,
  'Data Engineering',
  true,
  true,
  'published',
  6
);

-- ============================================
-- 4. TEAM MEMBERS (Leadership & Key Team)
-- ============================================
-- Schema columns: name, slug, role, department, bio, avatar, email, phone, location, 
-- office_location, linkedin_url, github_url, twitter_url, skills, specializations, 
-- years_experience, projects_completed, is_leadership, is_active, display_order, joined_date

INSERT INTO team_members (
  name,
  slug,
  role,
  department,
  bio,
  avatar,
  office_location,
  email,
  linkedin_url,
  twitter_url,
  github_url,
  skills,
  specializations,
  years_experience,
  is_leadership,
  is_active,
  display_order
) VALUES
-- Leadership Team
(
  'Alex Thompson',
  'alex-thompson',
  'Chief Executive Officer',
  'Executive',
  'Visionary leader with 15+ years in technology innovation. Founded Axis Cyber to deliver world-class software solutions across the globe.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCEO',
  'Lahore',
  'alex.thompson@axiscyber.tech',
  'https://linkedin.com/in/alexthompson',
  'https://twitter.com/alexthompson',
  null,
  ARRAY['Strategic Planning', 'Business Development', 'Technology Leadership'],
  ARRAY['Digital Transformation', 'Enterprise Strategy', 'Global Operations'],
  15,
  true,
  true,
  1
),
(
  'Dr. Priya Sharma',
  'priya-sharma',
  'Chief Technology Officer',
  'Engineering',
  'PhD in Computer Science, specializing in AI/ML. Leads our technical vision and drives innovation across all technology stacks.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaCTO',
  'Dubai',
  'priya.sharma@axiscyber.tech',
  'https://linkedin.com/in/priyasharma',
  'https://twitter.com/drpriyasharma',
  'https://github.com/priyasharma',
  ARRAY['AI/ML', 'System Architecture', 'Research & Development'],
  ARRAY['Machine Learning', 'Distributed Systems', 'Cloud Architecture'],
  12,
  true,
  true,
  2
),
(
  'Marcus Johnson',
  'marcus-johnson',
  'Chief Operating Officer',
  'Operations',
  'Operations expert ensuring seamless delivery across our global offices. Masters in Business Administration with a focus on technology operations.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusCOO',
  'Los Angeles',
  'marcus.johnson@axiscyber.tech',
  'https://linkedin.com/in/marcusjohnson',
  null,
  null,
  ARRAY['Operations Management', 'Process Optimization', 'Team Building'],
  ARRAY['Agile Methodologies', 'Quality Assurance', 'Project Management'],
  14,
  true,
  true,
  3
),
(
  'Sophie Williams',
  'sophie-williams',
  'Chief Design Officer',
  'Design',
  'Award-winning designer with a passion for creating intuitive user experiences. Leads our design team in crafting beautiful, functional products.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=SophieCDO',
  'London',
  'sophie.williams@axiscyber.tech',
  'https://linkedin.com/in/sophiewilliams',
  'https://twitter.com/sophiedesigns',
  null,
  ARRAY['UX/UI Design', 'Design Systems', 'User Research'],
  ARRAY['Product Design', 'Design Thinking', 'Accessibility'],
  10,
  true,
  true,
  4
),

-- Engineering Team
(
  'Omar Hassan',
  'omar-hassan',
  'Lead AI Engineer',
  'Engineering',
  'Machine learning expert specializing in deep learning and computer vision. Built AI systems processing millions of predictions daily.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarAI',
  'Lahore',
  'omar.hassan@axiscyber.tech',
  'https://linkedin.com/in/omarhassan',
  null,
  'https://github.com/omarhassan',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
  ARRAY['Deep Learning', 'NLP', 'Model Optimization'],
  8,
  false,
  true,
  5
),
(
  'Elena Volkov',
  'elena-volkov',
  'Senior Full Stack Developer',
  'Engineering',
  'Full-stack developer with expertise in modern web technologies. Passionate about building scalable, performant applications.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaFS',
  'Dubai',
  'elena.volkov@axiscyber.tech',
  'https://linkedin.com/in/elenavolkov',
  null,
  'https://github.com/elenavolkov',
  ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  ARRAY['Web Development', 'API Design', 'Performance'],
  7,
  false,
  true,
  6
),
(
  'Raj Patel',
  'raj-patel',
  'Blockchain Architect',
  'Engineering',
  'Blockchain pioneer with experience in DeFi, NFTs, and smart contract development. Helped launch projects with $100M+ TVL.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=RajBC',
  'Los Angeles',
  'raj.patel@axiscyber.tech',
  'https://linkedin.com/in/rajpatel',
  'https://twitter.com/rajpatelweb3',
  'https://github.com/rajpatel',
  ARRAY['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'],
  ARRAY['DeFi', 'NFTs', 'Tokenomics'],
  6,
  false,
  true,
  7
),
(
  'Hannah Lee',
  'hannah-lee',
  'DevOps Lead',
  'Engineering',
  'Cloud infrastructure specialist automating deployments and optimizing costs. Reduced infrastructure spend by 40% across multiple projects.',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=HannahDO',
  'London',
  'hannah.lee@axiscyber.tech',
  'https://linkedin.com/in/hannahlee',
  null,
  'https://github.com/hannahlee',
  ARRAY['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
  ARRAY['Cloud Architecture', 'Automation', 'Monitoring'],
  9,
  false,
  true,
  8
);

-- ============================================
-- 5. CASE STUDIES (Project Showcases)
-- ============================================
-- Schema columns: title, slug, client_name, client_logo, client_industry, project_type, 
-- summary, challenge, solution, results, technologies, services, featured_image, 
-- gallery_images, testimonial, testimonial_author, testimonial_role, project_duration, 
-- team_size, completion_date, project_url, github_url, success_metrics, views, 
-- is_featured, status, display_order, meta_title, meta_description

INSERT INTO case_studies (
  title,
  slug,
  client_name,
  client_industry,
  client_logo,
  summary,
  challenge,
  solution,
  results,
  technologies,
  services,
  project_duration,
  team_size,
  gallery_images,
  success_metrics,
  testimonial,
  testimonial_author,
  is_featured,
  status,
  display_order,
  meta_title,
  meta_description
) VALUES
(
  'AI-Powered Fraud Detection System',
  'ai-fraud-detection',
  'FinTech Innovations',
  'Financial Services',
  'https://api.dicebear.com/7.x/identicon/svg?seed=FinTech',
  'Reducing financial fraud by 85% using advanced machine learning',
  'FinTech Innovations was losing millions annually to sophisticated fraud schemes. Their rule-based system couldn''t keep up with evolving fraud patterns.',
  'We built an AI-powered fraud detection system using deep learning and real-time analytics. The system analyzes hundreds of features per transaction, learning from patterns and adapting to new threats automatically.',
  'In the first quarter, fraud losses dropped by 85%. False positives decreased by 60%, improving customer experience. The system now processes 10,000+ transactions per second with sub-100ms latency.',
  ARRAY['Python', 'TensorFlow', 'Apache Kafka', 'Redis', 'PostgreSQL', 'AWS'],
  ARRAY['AI & Machine Learning', 'Data Engineering', 'Cloud & DevOps'],
  '6 months',
  '8',
  ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
  '{"fraud_reduction": "85%", "false_positives_reduced": "60%", "transactions_per_second": "10,000+", "latency": "<100ms"}'::jsonb,
  'Axis Cyber transformed our fraud detection capabilities. The AI system they built is incredibly accurate and has saved us millions.',
  'Sarah Johnson, CTO',
  true,
  'published',
  1,
  'AI Fraud Detection Case Study | Axis Cyber Technologies',
  'How we reduced fraud by 85% for a FinTech company using advanced machine learning and real-time analytics.'
),
(
  'Global E-Commerce Platform',
  'global-ecommerce-platform',
  'ShopGlobal Inc',
  'Retail & E-Commerce',
  'https://api.dicebear.com/7.x/identicon/svg?seed=ShopGlobal',
  'Scaling to 10M+ users with 99.99% uptime',
  'ShopGlobal needed a platform that could handle Black Friday traffic spikes and expand to new markets globally while maintaining performance.',
  'We built a microservices-based e-commerce platform with auto-scaling capabilities, multi-region deployment, and a headless architecture. Implemented advanced caching, CDN, and database optimization.',
  'Platform now serves 10M+ active users across 50 countries. Achieved 99.99% uptime during peak shopping seasons. Page load times reduced from 4s to under 1s.',
  ARRAY['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Kubernetes', 'AWS', 'Stripe'],
  ARRAY['Web Development', 'Cloud & DevOps', 'Performance Optimization'],
  '8 months',
  '12',
  ARRAY['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'],
  '{"active_users": "10M+", "uptime": "99.99%", "countries": "50", "load_time": "<1s"}'::jsonb,
  'The platform Axis Cyber built scales beautifully. We handled record Black Friday traffic without a single issue.',
  'David Martinez, CEO',
  true,
  'published',
  2,
  'E-Commerce Platform Case Study | Axis Cyber Technologies',
  'Building a scalable e-commerce platform serving 10M+ users with 99.99% uptime across 50 countries.'
),
(
  'Healthcare Mobile App',
  'healthcare-mobile-app',
  'HealthTech Plus',
  'Healthcare',
  'https://api.dicebear.com/7.x/identicon/svg?seed=HealthTech',
  'Connecting patients and doctors with 500K+ downloads',
  'HealthTech Plus wanted to create a telemedicine platform that made healthcare accessible to remote areas while ensuring HIPAA compliance and data security.',
  'We developed native iOS and Android apps with video consultations, appointment booking, prescription management, and secure messaging. Implemented end-to-end encryption and HIPAA-compliant infrastructure.',
  'App has 500K+ downloads with 4.8-star average rating. Facilitated 1M+ consultations. Patient satisfaction increased by 92%. Reduced no-show rates by 45%.',
  ARRAY['React Native', 'Node.js', 'WebRTC', 'PostgreSQL', 'AWS', 'Twilio'],
  ARRAY['Mobile App Development', 'Cloud & DevOps', 'Cybersecurity'],
  '7 months',
  '10',
  ARRAY['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800'],
  '{"downloads": "500K+", "rating": "4.8", "consultations": "1M+", "satisfaction": "92%"}'::jsonb,
  'The app exceeded our expectations. Axis Cyber understood healthcare requirements perfectly.',
  'Emily Rodriguez, Product Manager',
  true,
  'published',
  3,
  'Healthcare Mobile App Case Study | Axis Cyber Technologies',
  'Building a HIPAA-compliant telemedicine app with 500K+ downloads and 4.8-star rating.'
),
(
  'NFT Marketplace Platform',
  'nft-marketplace',
  'NFT Marketplace Pro',
  'Blockchain & Web3',
  'https://api.dicebear.com/7.x/identicon/svg?seed=NFTMarket',
  'Launching a secure NFT marketplace with $10M+ monthly volume',
  'NFT Marketplace Pro needed a scalable, secure platform for minting, buying, and selling NFTs with low gas fees and excellent UX.',
  'We built a full-featured NFT marketplace on Polygon with lazy minting, bidding, royalties, and IPFS storage. Implemented smart contracts with multiple security audits and a beautiful, intuitive interface.',
  'Platform processes $10M+ in monthly transactions. Gas fees 100x lower than Ethereum. Over 50K NFTs minted. Smart contracts passed 3 independent security audits.',
  ARRAY['React', 'Solidity', 'Web3.js', 'IPFS', 'Polygon', 'Node.js', 'MongoDB'],
  ARRAY['Blockchain Development', 'Web Development', 'Product & UX Design'],
  '5 months',
  '9',
  ARRAY['https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800'],
  '{"monthly_volume": "$10M+", "gas_savings": "100x", "nfts_minted": "50K+", "security_audits": "3"}'::jsonb,
  'Axis Cyber built us a world-class NFT platform. The smart contracts are secure and efficient.',
  'Lisa Anderson, Founder',
  true,
  'published',
  4,
  'NFT Marketplace Case Study | Axis Cyber Technologies',
  'Building a secure, scalable NFT marketplace with $10M+ monthly volume on Polygon.'
),
(
  'Real-Time Data Pipeline',
  'realtime-data-pipeline',
  'DataStream Analytics',
  'Data & Analytics',
  'https://api.dicebear.com/7.x/identicon/svg?seed=DataStream',
  'Processing 50TB of data daily with real-time insights',
  'DataStream needed to process massive amounts of data in real-time to provide instant insights to their enterprise customers.',
  'We architected a streaming data pipeline using Apache Kafka, Apache Spark, and Snowflake. Built custom data quality checks, real-time transformations, and an analytics dashboard.',
  'Now processing 50TB of data daily. Query response times reduced from hours to seconds. Data quality improved by 95%. Infrastructure costs reduced by 40%.',
  ARRAY['Apache Kafka', 'Apache Spark', 'Snowflake', 'Python', 'Airflow', 'AWS'],
  ARRAY['Data Engineering', 'Cloud & DevOps', 'Performance Optimization'],
  '6 months',
  '7',
  ARRAY['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800'],
  '{"daily_volume": "50TB", "query_speed": "seconds", "data_quality": "95%", "cost_savings": "40%"}'::jsonb,
  'Our data pipeline is incredibly fast and reliable. Axis Cyber delivered beyond expectations.',
  'James Wilson, VP of Engineering',
  true,
  'published',
  5,
  'Real-Time Data Pipeline Case Study | Axis Cyber Technologies',
  'Building a streaming data pipeline processing 50TB daily with real-time insights and 40% cost savings.'
),
(
  'Enterprise IoT Platform',
  'enterprise-iot-platform',
  'SmartFactory Industries',
  'Manufacturing & IoT',
  'https://api.dicebear.com/7.x/identicon/svg?seed=SmartFactory',
  'Connecting 10,000+ devices for predictive maintenance',
  'SmartFactory needed to monitor manufacturing equipment in real-time to predict failures and reduce downtime.',
  'We built an IoT platform with edge computing, real-time analytics, and predictive maintenance algorithms. Integrated with existing SCADA systems and created custom dashboards.',
  'Connected 10,000+ devices across 20 factories. Reduced downtime by 60%. Maintenance costs decreased by 35%. ROI achieved in 8 months.',
  ARRAY['MQTT', 'Node.js', 'InfluxDB', 'Grafana', 'Python', 'AWS IoT', 'TensorFlow'],
  ARRAY['IoT & Edge Computing', 'AI & Machine Learning', 'Data Engineering'],
  '9 months',
  '11',
  ARRAY['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800'],
  '{"devices_connected": "10,000+", "downtime_reduction": "60%", "cost_savings": "35%", "roi_months": "8"}'::jsonb,
  'The IoT platform transformed our operations. Predictive maintenance is a game-changer.',
  'Robert Chen, COO',
  true,
  'published',
  6,
  'Enterprise IoT Platform Case Study | Axis Cyber Technologies',
  'Connecting 10,000+ devices for predictive maintenance, reducing downtime by 60% and costs by 35%.'
);

-- ============================================
-- 6. FAQS (Frequently Asked Questions)
-- ============================================

INSERT INTO faqs (
  question,
  answer,
  category,
  service_id,
  is_featured,
  display_order
) VALUES
-- General FAQs
(
  'What services does Axis Cyber Technologies offer?',
  'We offer 12 core services: AI & Machine Learning, Web Development, Mobile App Development, Cloud & DevOps, Cybersecurity, Blockchain Development, IoT & Edge Computing, Data Engineering, Enterprise Software, Product & UX Design, Gaming & WebGL, and Performance Optimization. All with 100% success rates.',
  'General',
  null,
  true,
  1
),
(
  'Where are your offices located?',
  'We operate 24/7 across 4 global offices: Lahore (Pakistan) - our headquarters, Dubai (UAE), Los Angeles (USA), and London (UK). This allows us to provide round-the-clock support and leverage diverse talent.',
  'General',
  null,
  true,
  2
),
(
  'What is your development process?',
  'We follow an agile methodology with 2-week sprints. Our typical process includes: Discovery & Planning, Design & Prototyping, Development, Testing & QA, Deployment, and Ongoing Support. We maintain transparent communication throughout.',
  'General',
  null,
  true,
  3
),
(
  'How long does a typical project take?',
  'Project duration varies by scope and complexity. Simple web applications take 2-3 months, mobile apps 3-5 months, enterprise systems 6-12 months, and AI/blockchain projects 4-8 months. We provide detailed timelines during planning.',
  'General',
  null,
  true,
  4
),
(
  'What industries do you work with?',
  'We work with clients across all industries including FinTech, Healthcare, E-commerce, Manufacturing, Blockchain/Web3, Education, Logistics, and more. Our diverse expertise allows us to understand unique industry requirements.',
  'General',
  null,
  true,
  5
),

-- Technical FAQs
(
  'What technologies do you use for AI/ML projects?',
  'We use industry-leading tools including TensorFlow, PyTorch, Scikit-learn, Keras, OpenCV, and Hugging Face. We select the best technology based on your specific use case, data, and requirements.',
  'Technical',
  (SELECT id FROM services WHERE slug = 'ai-ml' LIMIT 1),
  true,
  6
),
(
  'Do you build native or cross-platform mobile apps?',
  'We build both! We use React Native and Flutter for cross-platform apps (faster, lower cost), and Swift/Kotlin for native apps (maximum performance). We recommend the best approach based on your requirements.',
  'Technical',
  (SELECT id FROM services WHERE slug = 'mobile-app-development' LIMIT 1),
  true,
  7
),
(
  'Which cloud platforms do you support?',
  'We work with all major cloud providers: AWS, Google Cloud Platform (GCP), and Microsoft Azure. We can also implement multi-cloud or hybrid cloud strategies based on your needs.',
  'Technical',
  (SELECT id FROM services WHERE slug = 'cloud-devops' LIMIT 1),
  true,
  8
),
(
  'What blockchain platforms do you develop on?',
  'We develop on Ethereum, Polygon, Binance Smart Chain, Solana, and Hyperledger. We help you choose the right blockchain based on your use case, scalability needs, and budget.',
  'Technical',
  (SELECT id FROM services WHERE slug = 'blockchain' LIMIT 1),
  true,
  9
),

-- Pricing FAQs
(
  'How much does a project cost?',
  'Costs vary by scope and complexity. Web applications start at $25K, mobile apps at $40K, AI/ML projects at $50K, and enterprise systems at $80K+. We provide detailed quotes after understanding your requirements.',
  'Pricing',
  null,
  true,
  10
),
(
  'Do you offer fixed-price or hourly billing?',
  'We offer both models. Fixed-price works well for well-defined projects. Time & materials (hourly) is better for evolving requirements. We can also do hybrid models. We discuss the best approach during planning.',
  'Pricing',
  null,
  true,
  11
),
(
  'What is included in the project cost?',
  'Our quotes typically include: discovery & planning, design, development, testing, deployment, documentation, and initial training. Ongoing maintenance and support are quoted separately.',
  'Pricing',
  null,
  true,
  12
),

-- Support FAQs
(
  'Do you provide post-launch support?',
  'Yes! We offer various support packages including bug fixes, performance monitoring, security updates, feature enhancements, and 24/7 emergency support. We stay with you long after launch.',
  'Support',
  null,
  true,
  13
),
(
  'How do you ensure project quality?',
  'We maintain 100% success rates through: rigorous code reviews, automated testing (unit, integration, E2E), performance monitoring, security audits, and QA at every stage. Quality is built into our process.',
  'Support',
  null,
  true,
  14
),
(
  'Can you take over an existing project?',
  'Absolutely! We frequently take over projects that are behind schedule, over budget, or need optimization. We conduct a thorough audit, create a recovery plan, and get things back on track.',
  'Support',
  null,
  true,
  15
);

-- ============================================
-- 7. BLOG CATEGORIES
-- ============================================

INSERT INTO blog_categories (
  name,
  slug,
  description,
  color,
  icon,
  is_active,
  display_order
) VALUES
(
  'AI & Machine Learning',
  'ai-ml',
  'Latest trends and insights in artificial intelligence and machine learning',
  '#00E5FF',
  'brain',
  true,
  1
),
(
  'Web Development',
  'web-development',
  'Modern web development techniques, frameworks, and best practices',
  '#B900FF',
  'code',
  true,
  2
),
(
  'Cloud & DevOps',
  'cloud-devops',
  'Cloud infrastructure, DevOps practices, and automation strategies',
  '#FF7A00',
  'cloud',
  true,
  3
),
(
  'Cybersecurity',
  'cybersecurity',
  'Security best practices, threat intelligence, and compliance',
  '#FF0099',
  'shield',
  true,
  4
),
(
  'Blockchain',
  'blockchain',
  'Web3, DeFi, NFTs, and blockchain development insights',
  '#00FFFF',
  'link',
  true,
  5
),
(
  'Mobile Development',
  'mobile-development',
  'iOS, Android, and cross-platform mobile app development',
  '#DD00FF',
  'smartphone',
  true,
  6
),
(
  'Data Engineering',
  'data-engineering',
  'Big data, data pipelines, and analytics infrastructure',
  '#00FF88',
  'database',
  true,
  7
),
(
  'Product Design',
  'product-design',
  'UX/UI design, design systems, and user research',
  '#FF6B00',
  'palette',
  true,
  8
),
(
  'Tech Industry',
  'tech-industry',
  'Technology trends, industry news, and thought leadership',
  '#8B00FF',
  'trending-up',
  true,
  9
),
(
  'Tutorials',
  'tutorials',
  'Step-by-step guides and how-to articles',
  '#00D4FF',
  'book-open',
  true,
  10
),
(
  'Case Studies',
  'case-studies',
  'Real-world project stories and lessons learned',
  '#FF2E97',
  'briefcase',
  true,
  11
);

-- ============================================
-- 8. BLOG TAGS
-- ============================================

INSERT INTO blog_tags (name, slug) VALUES
('React', 'react'),
('Next.js', 'nextjs'),
('Node.js', 'nodejs'),
('TypeScript', 'typescript'),
('Python', 'python'),
('TensorFlow', 'tensorflow'),
('AWS', 'aws'),
('Kubernetes', 'kubernetes'),
('Docker', 'docker'),
('Blockchain', 'blockchain'),
('Smart Contracts', 'smart-contracts'),
('Web3', 'web3'),
('React Native', 'react-native'),
('Flutter', 'flutter'),
('iOS', 'ios'),
('Android', 'android'),
('Cybersecurity', 'cybersecurity'),
('DevOps', 'devops'),
('CI/CD', 'cicd'),
('Microservices', 'microservices'),
('API Design', 'api-design'),
('Performance', 'performance'),
('SEO', 'seo'),
('UX Design', 'ux-design'),
('UI Design', 'ui-design');

-- ============================================
-- 9. SITE SETTINGS
-- ============================================

INSERT INTO site_settings (
  setting_key,
  setting_value,
  setting_type,
  description,
  is_public
) VALUES
(
  'company_name',
  'Axis Cyber Technologies',
  'string',
  'Company name displayed across the site',
  true
),
(
  'company_tagline',
  'Next-Generation Software Engineering',
  'string',
  'Company tagline/motto',
  true
),
(
  'contact_email',
  'contact@axiscyber.tech',
  'string',
  'Primary contact email',
  true
),
(
  'support_email',
  'support@axiscyber.tech',
  'string',
  'Support email address',
  true
),
(
  'sales_email',
  'sales@axiscyber.tech',
  'string',
  'Sales inquiries email',
  true
),
(
  'phone_global',
  '+1-800-AXIS-TECH',
  'string',
  'Global phone number',
  true
),
(
  'success_rate',
  '100',
  'number',
  'Success rate percentage across all services',
  true
),
(
  'projects_completed',
  '1500',
  'number',
  'Total projects completed',
  true
),
(
  'years_experience',
  '10',
  'number',
  'Years in business',
  true
),
(
  'team_size',
  '150',
  'number',
  'Total team members across global offices',
  true
),
(
  'global_offices',
  '4',
  'number',
  'Number of global office locations',
  true
),
(
  'office_locations',
  '["Lahore Pakistan", "Dubai UAE", "Los Angeles USA", "London UK"]',
  'json',
  'List of office locations',
  true
),
(
  'social_linkedin',
  'https://linkedin.com/company/axis-cyber-technologies',
  'string',
  'LinkedIn company page',
  true
),
(
  'social_twitter',
  'https://twitter.com/axiscybertech',
  'string',
  'Twitter/X profile',
  true
),
(
  'social_github',
  'https://github.com/axis-cyber',
  'string',
  'GitHub organization',
  true
),
(
  'social_facebook',
  'https://facebook.com/axiscybertech',
  'string',
  'Facebook page',
  true
),
(
  'operating_hours',
  '24/7',
  'string',
  'Operating hours description',
  true
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '
  ============================================
  ✅ DATABASE SEEDING COMPLETE!
  ============================================
  
  Successfully inserted:
  ✅ 4 Global Office Locations
  ✅ 12 Core Services (100%% Success Rate)
  ✅ 6 Client Testimonials
  ✅ 8 Team Members (Leadership + Engineering)
  ✅ 6 Case Studies
  ✅ 15 FAQs
  ✅ 11 Blog Categories
  ✅ 25 Blog Tags
  ✅ 17 Site Settings
  
  🎉 Your database is now ready!
  
  Next steps:
  1. Verify data in Supabase dashboard
  2. Test API endpoints
  3. Update frontend to use database
  
  ============================================
  ';
END $$;
