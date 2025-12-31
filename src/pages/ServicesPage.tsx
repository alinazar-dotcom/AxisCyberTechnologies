import { Brain, Blocks, Code2, Cloud, Smartphone, Gamepad2, Shield, Database, Sparkles, Zap, Cpu, Network, CheckCircle2, ArrowRight, Users, Clock, Award, TrendingUp, Lightbulb, Target, Building2, Rocket, Star, Loader2, X, Globe, Heart, Mail, Send, MapPin, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const iconMap: { [key: string]: any } = {
  Brain, Blocks, Code2, Cloud, Smartphone, Gamepad2, Shield, Database, Sparkles, Zap, Cpu, Network, CheckCircle2, ArrowRight, Users, Clock, Award, TrendingUp, Lightbulb, Target, Building2, Rocket, Star, Layers
};

const colorMap: { [key: string]: string } = {
  violet: '#DD00FF',
  cyan: '#00FFFF',
  emerald: '#00FF9D',
  blue: '#3b82f6',
  pink: '#FF0099',
  purple: '#a855f7',
  red: '#ef4444',
  amber: '#FF7A00',
  teal: '#14b8a6',
  yellow: '#eab308',
  indigo: '#6366f1',
  rose: '#f43f5e',
};

export function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Newsletter State
  const [email, setEmail] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Live time for offices
  const [times, setTimes] = useState({
    lahore: '',
    dubai: '',
    losAngeles: '',
    london: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        lahore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true }),
        dubai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: true }),
        losAngeles: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true }),
        london: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: true })
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');

      try {
        const { error } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email, source: 'services_page' }]);

        if (error) {
          if (error.code === '23505') {
            setSubmitStatus('error');
            setErrorMessage('This email is already subscribed!');
          } else {
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to subscribe.');
          }
        } else {
          setSubmitStatus('success');
          setEmail('');
          setShowValidation(false);
          setTimeout(() => setSubmitStatus('idle'), 5000);
        }
      } catch (error) {
        setSubmitStatus('error');
        setErrorMessage('An unexpected error occurred.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setShowValidation(true);
      setTimeout(() => setShowValidation(false), 5000);
    }
  };

  const offices = [
    {
      city: 'Lahore',
      country: 'Pakistan',
      flag: '🇵🇰',
      role: 'Global Headquarters',
      time: times.lahore,
      color: '#00FF9D',
      gradient: 'from-[#00FF9D]/20 to-transparent'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      role: 'Middle East Hub',
      time: times.dubai,
      color: '#00FFFF',
      gradient: 'from-[#00FFFF]/20 to-transparent'
    },
    {
      city: 'Los Angeles',
      country: 'USA',
      flag: '🇺🇸',
      role: 'Americas Hub',
      time: times.losAngeles,
      color: '#DD00FF',
      gradient: 'from-[#DD00FF]/20 to-transparent'
    },
    {
      city: 'London',
      country: 'UK',
      flag: '🇬🇧',
      role: 'Europe Hub',
      time: times.london,
      color: '#FF0099',
      gradient: 'from-[#FF0099]/20 to-transparent'
    }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const serviceOrder = [
    'AI & Machine Learning',
    'Web Development',
    'Mobile App Development',
    'Cloud & DevOps',
    'Cybersecurity',
    'Blockchain Development',
    'IoT & Edge Computing',
    'Data Engineering',
    'Enterprise Software',
    'Product & UX Design',
    'Gaming & WebGL',
    'Performance Optimization'
  ];

  const serviceConfig: { [key: string]: any } = {
    'AI & Machine Learning': {
      icon: Brain,
      color: '#DD00FF',
      gradient: 'from-[#DD00FF] via-[#B900FF] to-[#FF0099]',
      glowColor: 'rgba(221, 0, 255, 0.4)'
    },
    'Blockchain & Web3': {
      icon: Blocks,
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] via-[#00E5FF] to-[#00B8D4]',
      glowColor: 'rgba(0, 255, 255, 0.4)'
    },
    'Enterprise Software Engineering': {
      icon: Code2,
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] via-[#00E58C] to-[#00CC7A]',
      glowColor: 'rgba(0, 255, 157, 0.4)'
    },
    'Cloud & DevOps': {
      icon: Cloud,
      color: '#FF7A00',
      gradient: 'from-[#FF7A00] via-[#FF6A00] to-[#FF5500]',
      glowColor: 'rgba(255, 122, 0, 0.4)'
    },
    'Mobile App Development': {
      icon: Smartphone,
      color: '#FF0099',
      gradient: 'from-[#FF0099] via-[#E6008A] to-[#CC007A]',
      glowColor: 'rgba(255, 0, 153, 0.4)'
    },
    'Gaming & WebGL': {
      icon: Gamepad2,
      color: '#B900FF',
      gradient: 'from-[#B900FF] via-[#9D00E5] to-[#8000CC]',
      glowColor: 'rgba(185, 0, 255, 0.4)'
    },
    'Cybersecurity & Compliance': {
      icon: Shield,
      color: '#FF0055',
      gradient: 'from-[#FF0055] via-[#E60050] to-[#CC0045]',
      glowColor: 'rgba(255, 0, 85, 0.4)'
    },
    'Data Engineering & Analytics': {
      icon: Database,
      color: '#FFD700',
      gradient: 'from-[#FFD700] via-[#FFC700] to-[#FFB700]',
      glowColor: 'rgba(255, 215, 0, 0.4)'
    },
    'API & Integration Services': {
      icon: Network,
      color: '#00E5E5',
      gradient: 'from-[#00E5E5] via-[#00D5D5] to-[#00C5C5]',
      glowColor: 'rgba(0, 229, 229, 0.4)'
    },
    'Performance Optimization': {
      icon: Zap,
      color: '#FFE500',
      gradient: 'from-[#FFE500] via-[#FFD500] to-[#FFC500]',
      glowColor: 'rgba(255, 229, 0, 0.4)'
    },
    'IoT & Edge Computing': {
      icon: Cpu,
      color: '#00CCFF',
      gradient: 'from-[#00CCFF] via-[#00BBEE] to-[#00AADD]',
      glowColor: 'rgba(0, 204, 255, 0.4)'
    },
    'Product Strategy & UX': {
      icon: Sparkles,
      color: '#FF66FF',
      gradient: 'from-[#FF66FF] via-[#EE55EE] to-[#DD44DD]',
      glowColor: 'rgba(255, 102, 255, 0.4)'
    },
    // Database Aliases
    'Web Development': {
      icon: Code2,
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] via-[#00E58C] to-[#00CC7A]',
      glowColor: 'rgba(0, 255, 157, 0.4)'
    },
    'Blockchain Development': {
      icon: Blocks,
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] via-[#00E5FF] to-[#00B8D4]',
      glowColor: 'rgba(0, 255, 255, 0.4)'
    },
    'Cybersecurity': {
      icon: Shield,
      color: '#FF0055',
      gradient: 'from-[#FF0055] via-[#E60050] to-[#CC0045]',
      glowColor: 'rgba(255, 0, 85, 0.4)'
    },
    'Data Engineering': {
      icon: Database,
      color: '#FFD700',
      gradient: 'from-[#FFD700] via-[#FFC700] to-[#FFB700]',
      glowColor: 'rgba(255, 215, 0, 0.4)'
    },
    'Enterprise Software': {
      icon: Network,
      color: '#00E5E5',
      gradient: 'from-[#00E5E5] via-[#00D5D5] to-[#00C5C5]',
      glowColor: 'rgba(0, 229, 229, 0.4)'
    },
    'Product & UX Design': {
      icon: Sparkles,
      color: '#FF66FF',
      gradient: 'from-[#FF66FF] via-[#EE55EE] to-[#DD44DD]',
      glowColor: 'rgba(255, 102, 255, 0.4)'
    }
  };

  const fallbackServices = [
    {
      name: "Web Development",
      slug: "web-development",
      tagline: "Modern, scalable web applications",
      short_description: "Modern, scalable web applications built with cutting-edge technologies",
      full_description: "Create powerful web experiences with our full-stack development expertise. We build fast, secure, and scalable web applications that engage users and drive business growth.",
      icon: "code",
      features: [
        "Responsive Design",
        "Progressive Web Apps",
        "API Development",
        "Real-time Features",
        "E-commerce Solutions",
        "Content Management Systems"
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
        "Tailwind CSS"
      ],
      use_cases: [
        "Corporate Websites",
        "E-commerce Platforms",
        "SaaS Applications",
        "Web Portals",
        "Social Networks",
        "Booking Systems"
      ],
      success_rate: 100,
      projects_completed: 300,
      process_steps: {
        "1": { "title": "Requirements Gathering", "description": "Define scope and objectives" },
        "2": { "title": "Design & Prototyping", "description": "Create wireframes and mockups" },
        "3": { "title": "Development", "description": "Build frontend and backend" },
        "4": { "title": "Testing & QA", "description": "Ensure quality and performance" },
        "5": { "title": "Deployment & Support", "description": "Launch and maintain" }
      }
    },
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
      tagline: "Native and cross-platform mobile apps",
      short_description: "Native and cross-platform mobile applications for iOS and Android",
      full_description: "Reach your customers on any device with our mobile app development services. We create beautiful, performant mobile experiences that users love.",
      icon: "smartphone",
      features: [
        "Native iOS Development",
        "Native Android Development",
        "Cross-Platform Apps",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality"
      ],
      technologies: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Firebase",
        "GraphQL",
        "Redux",
        "Expo"
      ],
      use_cases: [
        "Consumer Apps",
        "Enterprise Mobility",
        "On-Demand Services",
        "Social Media Apps",
        "Fitness & Health Apps",
        "Financial Apps"
      ],
      success_rate: 100,
      projects_completed: 200,
      process_steps: {
        "1": { "title": "Strategy & Planning", "description": "Define app concept and features" },
        "2": { "title": "UX/UI Design", "description": "Create intuitive interfaces" },
        "3": { "title": "Development", "description": "Build native or cross-platform" },
        "4": { "title": "Testing", "description": "QA on multiple devices" },
        "5": { "title": "Launch & Maintenance", "description": "Deploy to app stores" }
      }
    },
    {
      name: "Cloud & DevOps",
      slug: "cloud-devops",
      tagline: "Scalable infrastructure and automation",
      short_description: "Scalable cloud infrastructure and automated DevOps pipelines",
      full_description: "Accelerate your development and deployment with our cloud and DevOps expertise. We build reliable, scalable infrastructure that powers modern applications.",
      icon: "cloud",
      features: [
        "Cloud Architecture",
        "CI/CD Pipelines",
        "Container Orchestration",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Auto-scaling"
      ],
      technologies: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Kubernetes",
        "Docker",
        "Terraform",
        "Jenkins",
        "GitLab CI"
      ],
      use_cases: [
        "Cloud Migration",
        "Microservices Architecture",
        "Serverless Applications",
        "DevOps Transformation",
        "Disaster Recovery",
        "Multi-Cloud Strategy"
      ],
      success_rate: 100,
      projects_completed: 180,
      process_steps: {
        "1": { "title": "Assessment", "description": "Evaluate current infrastructure" },
        "2": { "title": "Architecture Design", "description": "Plan cloud strategy" },
        "3": { "title": "Implementation", "description": "Build and configure" },
        "4": { "title": "Migration", "description": "Move workloads safely" },
        "5": { "title": "Optimization", "description": "Monitor and improve" }
      }
    },
    {
      name: "Cybersecurity",
      slug: "cybersecurity",
      tagline: "Enterprise-grade security protection",
      short_description: "Enterprise-grade security solutions to protect your digital assets",
      full_description: "Safeguard your business with comprehensive cybersecurity solutions. We protect your data, applications, and infrastructure from evolving threats.",
      icon: "shield-check",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Vulnerability Assessments",
        "Security Operations Center",
        "Incident Response",
        "Compliance Management"
      ],
      technologies: [
        "SIEM Tools",
        "IDS/IPS",
        "Firewalls",
        "Encryption",
        "Zero Trust Architecture",
        "Security Frameworks",
        "Threat Intelligence"
      ],
      use_cases: [
        "Security Audits",
        "Compliance (GDPR, HIPAA)",
        "Threat Detection",
        "Data Protection",
        "Access Management",
        "Security Training"
      ],
      success_rate: 100,
      projects_completed: 120,
      process_steps: {
        "1": { "title": "Risk Assessment", "description": "Identify vulnerabilities" },
        "2": { "title": "Security Strategy", "description": "Design security framework" },
        "3": { "title": "Implementation", "description": "Deploy security controls" },
        "4": { "title": "Testing", "description": "Validate effectiveness" },
        "5": { "title": "Monitoring", "description": "Continuous protection" }
      }
    },
    {
      name: "Blockchain Development",
      slug: "blockchain",
      tagline: "Decentralized solutions for the future",
      short_description: "Decentralized solutions using blockchain and smart contract technology",
      full_description: "Build the future with blockchain technology. We create secure, transparent, and decentralized solutions that transform industries.",
      icon: "link",
      features: [
        "Smart Contracts",
        "DApp Development",
        "NFT Platforms",
        "DeFi Solutions",
        "Tokenization",
        "Blockchain Consulting"
      ],
      technologies: [
        "Ethereum",
        "Solidity",
        "Web3.js",
        "Hardhat",
        "IPFS",
        "Polygon",
        "Hyperledger",
        "Truffle"
      ],
      use_cases: [
        "Cryptocurrency Wallets",
        "NFT Marketplaces",
        "Supply Chain Tracking",
        "Digital Identity",
        "Voting Systems",
        "DeFi Platforms"
      ],
      success_rate: 100,
      projects_completed: 80,
      process_steps: {
        "1": { "title": "Blockchain Strategy", "description": "Define use case and platform" },
        "2": { "title": "Smart Contract Development", "description": "Code and test contracts" },
        "3": { "title": "DApp Development", "description": "Build user interfaces" },
        "4": { "title": "Security Audit", "description": "Audit smart contracts" },
        "5": { "title": "Deployment", "description": "Launch on mainnet" }
      }
    },
    {
      name: "IoT & Edge Computing",
      slug: "iot-edge",
      tagline: "Connected devices and edge computing",
      short_description: "Connected devices and edge computing solutions for the smart future",
      full_description: "Connect the physical and digital worlds with IoT and edge computing. We build intelligent systems that collect, process, and act on data in real-time.",
      icon: "cpu",
      features: [
        "IoT Device Integration",
        "Edge Computing",
        "Real-time Analytics",
        "Device Management",
        "Sensor Networks",
        "Industrial IoT"
      ],
      technologies: [
        "MQTT",
        "CoAP",
        "LoRaWAN",
        "Edge AI",
        "Time Series Databases",
        "Arduino",
        "Raspberry Pi",
        "Azure IoT"
      ],
      use_cases: [
        "Smart Cities",
        "Industrial Automation",
        "Healthcare Monitoring",
        "Smart Agriculture",
        "Asset Tracking",
        "Predictive Maintenance"
      ],
      success_rate: 100,
      projects_completed: 90,
      process_steps: {
        "1": { "title": "IoT Strategy", "description": "Define device architecture" },
        "2": { "title": "Hardware Integration", "description": "Connect sensors and devices" },
        "3": { "title": "Edge Processing", "description": "Build edge computing logic" },
        "4": { "title": "Cloud Integration", "description": "Connect to cloud platforms" },
        "5": { "title": "Monitoring", "description": "Real-time dashboard" }
      }
    },
    {
      name: "Data Engineering",
      slug: "data-engineering",
      tagline: "Big data pipelines and analytics",
      short_description: "Big data pipelines and analytics infrastructure for data-driven decisions",
      full_description: "Transform raw data into actionable insights with our data engineering expertise. We build robust data pipelines that power your analytics and AI initiatives.",
      icon: "database",
      features: [
        "Data Warehousing",
        "ETL Pipelines",
        "Real-time Streaming",
        "Data Lake Architecture",
        "Data Quality",
        "Analytics Platforms"
      ],
      technologies: [
        "Apache Spark",
        "Airflow",
        "Kafka",
        "Snowflake",
        "dbt",
        "Databricks",
        "BigQuery",
        "Redshift"
      ],
      use_cases: [
        "Data Warehouses",
        "Real-time Analytics",
        "Customer 360",
        "Business Intelligence",
        "Data Migration",
        "ML Pipelines"
      ],
      success_rate: 100,
      projects_completed: 110,
      process_steps: {
        "1": { "title": "Data Assessment", "description": "Audit current data landscape" },
        "2": { "title": "Architecture Design", "description": "Design data infrastructure" },
        "3": { "title": "Pipeline Development", "description": "Build ETL/ELT processes" },
        "4": { "title": "Quality Assurance", "description": "Validate data accuracy" },
        "5": { "title": "Optimization", "description": "Improve performance" }
      }
    },
    {
      name: "Enterprise Software",
      slug: "enterprise-software",
      tagline: "Scalable solutions for complex businesses",
      short_description: "Custom enterprise solutions that streamline operations and drive growth",
      full_description: "Modernize your business with custom enterprise software. We build scalable, secure solutions that integrate seamlessly with your existing systems.",
      icon: "building",
      features: [
        "ERP Systems",
        "CRM Platforms",
        "Workflow Automation",
        "Business Intelligence",
        "Integration Services",
        "Legacy Modernization"
      ],
      technologies: [
        "SAP",
        "Salesforce",
        "Microsoft Dynamics",
        "Oracle",
        "ServiceNow",
        "REST APIs",
        "SOAP",
        "Microservices"
      ],
      use_cases: [
        "ERP Implementation",
        "CRM Customization",
        "Process Automation",
        "System Integration",
        "Digital Transformation",
        "Custom Portals"
      ],
      success_rate: 100,
      projects_completed: 140,
      process_steps: {
        "1": { "title": "Business Analysis", "description": "Understand processes and needs" },
        "2": { "title": "Solution Design", "description": "Architect enterprise system" },
        "3": { "title": "Development", "description": "Build custom modules" },
        "4": { "title": "Integration", "description": "Connect with existing systems" },
        "5": { "title": "Training & Support", "description": "User adoption and maintenance" }
      }
    },
    {
      name: "Product & UX Design",
      slug: "product-ux",
      tagline: "User-centered design experiences",
      short_description: "User-centered design that creates delightful digital experiences",
      full_description: "Design products users love with our UX/UI expertise. We create intuitive, beautiful interfaces that drive engagement and conversions.",
      icon: "palette",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "UI Design",
        "Usability Testing",
        "Design Systems",
        "Accessibility"
      ],
      technologies: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "Principle",
        "Framer",
        "Miro",
        "UserTesting"
      ],
      use_cases: [
        "Mobile App Design",
        "Web Application Design",
        "Design System Creation",
        "UX Audits",
        "Redesign Projects",
        "Accessibility Compliance"
      ],
      success_rate: 100,
      projects_completed: 250,
      process_steps: {
        "1": { "title": "Research", "description": "Understand users and context" },
        "2": { "title": "Ideation", "description": "Brainstorm and sketch concepts" },
        "3": { "title": "Prototyping", "description": "Create interactive prototypes" },
        "4": { "title": "Testing", "description": "Validate with real users" },
        "5": { "title": "Handoff", "description": "Deliver design system" }
      }
    },
    {
      name: "Gaming & WebGL",
      slug: "gaming-webgl",
      tagline: "Immersive 3D web experiences",
      short_description: "3D web experiences and interactive gaming solutions",
      full_description: "Create immersive gaming and 3D web experiences. We build high-performance graphics applications that run seamlessly in the browser.",
      icon: "gamepad",
      features: [
        "3D Web Graphics",
        "Browser Games",
        "WebGL Development",
        "Game Engines",
        "Real-time Rendering",
        "Multiplayer Systems"
      ],
      technologies: [
        "Three.js",
        "WebGL",
        "Unity",
        "Babylon.js",
        "Socket.io",
        "WebRTC",
        "GLSL",
        "Canvas API"
      ],
      use_cases: [
        "Browser-based Games",
        "3D Product Visualizers",
        "Virtual Tours",
        "Interactive Experiences",
        "Educational Simulations",
        "Metaverse Applications"
      ],
      success_rate: 100,
      projects_completed: 70,
      process_steps: {
        "1": { "title": "Concept Design", "description": "Define game mechanics and visuals" },
        "2": { "title": "Prototyping", "description": "Build playable prototype" },
        "3": { "title": "Development", "description": "Full game/experience development" },
        "4": { "title": "Testing", "description": "QA and optimization" },
        "5": { "title": "Launch", "description": "Deploy and market" }
      }
    },
    {
      name: "Performance Optimization",
      slug: "performance-optimization",
      tagline: "Speed up your applications",
      short_description: "Speed up your applications and reduce infrastructure costs",
      full_description: "Maximize performance and minimize costs with our optimization expertise. We make your applications faster, more efficient, and more scalable.",
      icon: "zap",
      features: [
        "Code Optimization",
        "Database Tuning",
        "Caching Strategies",
        "CDN Integration",
        "Load Balancing",
        "Performance Monitoring"
      ],
      technologies: [
        "Lighthouse",
        "WebPageTest",
        "New Relic",
        "DataDog",
        "Redis",
        "Varnish",
        "Cloudflare",
        "nginx"
      ],
      use_cases: [
        "Website Speed Optimization",
        "Database Performance",
        "API Optimization",
        "Mobile Performance",
        "Infrastructure Scaling",
        "Cost Reduction"
      ],
      success_rate: 100,
      projects_completed: 160,
      process_steps: {
        "1": { "title": "Performance Audit", "description": "Identify bottlenecks" },
        "2": { "title": "Optimization Plan", "description": "Prioritize improvements" },
        "3": { "title": "Implementation", "description": "Apply optimizations" },
        "4": { "title": "Testing", "description": "Measure improvements" },
        "5": { "title": "Monitoring", "description": "Ongoing performance tracking" }
      }
    },
    {
      name: "AI & Machine Learning",
      slug: "ai-ml",
      tagline: "Intelligent systems powered by cutting-edge AI",
      short_description: "Intelligent systems powered by cutting-edge AI and machine learning algorithms",
      full_description: "Transform your business with advanced AI and machine learning solutions. We build intelligent systems that learn, adapt, and deliver actionable insights to drive innovation and efficiency.",
      icon: "brain-circuit",
      features: [
        "Deep Learning Models",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics",
        "Neural Networks",
        "Model Training & Optimization"
      ],
      technologies: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Keras",
        "OpenCV",
        "Hugging Face",
        "ONNX",
        "MLflow"
      ],
      use_cases: [
        "Chatbots & Virtual Assistants",
        "Fraud Detection",
        "Recommendation Engines",
        "Image Recognition",
        "Sentiment Analysis",
        "Demand Forecasting"
      ],
      success_rate: 100,
      projects_completed: 150,
      process_steps: {
        "1": { "title": "Discovery & Data Assessment", "description": "Analyze your data and define objectives" },
        "2": { "title": "Model Development", "description": "Build and train custom AI models" },
        "3": { "title": "Testing & Validation", "description": "Validate accuracy and performance" },
        "4": { "title": "Deployment & Integration", "description": "Deploy models into production" },
        "5": { "title": "Monitoring & Optimization", "description": "Continuous improvement and retraining" }
      }
    }
  ];

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);

      if (fetchError) throw fetchError;

      let servicesToTransform = data;

      if (!data || data.length === 0) {
        servicesToTransform = fallbackServices;
      }

      const transformedData = servicesToTransform.map((service) => {
        const config = serviceConfig[service.name] || {};
        const Icon = config.icon || iconMap[service.icon] || Sparkles;
        const serviceColor = config.color || colorMap[service.color] || service.color || '#DD00FF';
        const style = {
          color: serviceColor,
          gradient: config.gradient || `from-[${serviceColor}] via-[${serviceColor}dd] to-[${serviceColor}aa]`,
          glowColor: config.glowColor || `${serviceColor}66`
        };

        return {
          id: service.id,
          icon: Icon,
          title: service.name,
          tagline: service.tagline || 'Expert technology solutions',
          description: service.full_description || service.short_description,
          link: `/services/${service.slug}`,
          features: service.features || [],
          technologies: service.technologies || [],
          process: (Array.isArray(service.process_steps)
            ? service.process_steps
            : typeof service.process_steps === 'object' && service.process_steps !== null
              ? Object.entries(service.process_steps)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([key, val]: [string, any]) => ({
                  step: val.title || `Step ${key}`,
                  description: val.description
                }))
              : []
          ).map((p: any) => ({
            step: p.step || p.title || 'Step',
            desc: p.description || p.desc || ''
          })),
          color: style.color,
          gradient: style.gradient,
          glowColor: style.glowColor,
          benefits: service.use_cases || [
            'Scale your operations efficiently',
            'Reduce technical debt and costs',
            'Accelerate time to market',
            'Future-proof your technology stack'
          ],
          stats: {
            success: `${service.success_rate || 100}%`,
            projects: `${service.projects_completed || '100'}+`,
            clients: service.happy_clients || '50+'
          }
        };
      });

      // Sort services based on the predefined order
      const sortedData = transformedData.sort((a, b) => {
        const indexA = serviceOrder.indexOf(a.title);
        const indexB = serviceOrder.indexOf(b.title);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });

      setServices(sortedData);
    } catch (err: any) {
      console.error('Error fetching services, using fallback:', err);

      const transformedFallback = fallbackServices.map((service) => {
        const config = serviceConfig[service.name] || {};
        const Icon = config.icon || iconMap[service.icon] || Sparkles;
        const style = {
          color: config.color || '#DD00FF',
          gradient: config.gradient || 'from-[#DD00FF] via-[#B900FF] to-[#FF0099]',
          glowColor: config.glowColor || 'rgba(221, 0, 255, 0.4)'
        };

        return {
          id: service.name,
          icon: Icon,
          title: service.name,
          tagline: service.tagline,
          description: service.full_description,
          link: `/services/${service.slug}`,
          features: service.features,
          technologies: service.technologies,
          process: Object.entries(service.process_steps).map(([key, val]: [string, any]) => ({
            step: val.title,
            desc: val.description
          })),
          color: style.color,
          gradient: style.gradient,
          glowColor: style.glowColor,
          benefits: service.use_cases,
          stats: {
            success: `${service.success_rate}%`,
            projects: `${service.projects_completed}+`,
            clients: '50+'
          }
        };
      });

      setServices(transformedFallback);
      // Don't set error state to keep UI functional
    } finally {
      setIsLoading(false);
    }
  };

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Proven Expertise',
      description: '10+ years delivering complex software projects across industries',
      color: '#DD00FF',
      gradient: 'from-[#DD00FF] to-[#B900FF]'
    },
    {
      icon: Users,
      title: 'Dedicated Teams',
      description: 'Senior engineers and architects committed to your success',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00E5FF]'
    },
    {
      icon: Clock,
      title: '100% On-Time Delivery',
      description: 'All projects delivered on schedule and within budget',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00E58C]'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance built into every solution',
      color: '#FF7A00',
      gradient: 'from-[#FF7A00] to-[#FF6A00]'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF0099] blur-3xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-[#FF0099] animate-spin relative z-10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center px-4">
        <div className="text-center p-12 bg-white/[0.02] border-2 border-red-500/30 rounded-[2rem] backdrop-blur-xl max-w-lg">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Connection Error</h2>
          <p className="text-white/70 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-red-500 text-white font-black rounded-xl hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Background effects - Ultra-Premium Neon */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#DD00FF]/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-[#FF0099]/8 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#FF0099]/10 to-[#00FFFF]/10 border-2 border-white/[0.15] rounded-full mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,153,0.2)]">
            <Sparkles className="w-4 h-4 text-[#FF0099] animate-pulse" />
            <span className="text-white text-sm font-bold tracking-wide uppercase">Our Services</span>
            <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight">
            Transform Your Business with{' '}
            <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent animate-gradient">
              Expert Solutions
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            From AI and blockchain to cloud infrastructure and mobile apps, we deliver cutting-edge technology solutions that drive growth and innovation with <span className="text-[#00FFFF] font-bold">100% success rate</span> across all services.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] bg-clip-text text-transparent mb-1">5000+</div>
              <div className="text-xs md:text-sm text-white/60 font-semibold uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-white/[0.1]"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent mb-1">1900+</div>
              <div className="text-xs md:text-sm text-white/60 font-semibold uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-white/[0.1]"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00FF9D] to-[#00E58C] bg-clip-text text-transparent mb-1">100%</div>
              <div className="text-xs md:text-sm text-white/60 font-semibold uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Services Grid - All 12 Services */}
        <div className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`group cursor-pointer relative p-6 sm:p-7 lg:p-8 bg-white/[0.02] border-2 rounded-2xl transition-all duration-500 overflow-hidden flex flex-col min-h-[520px] sm:min-h-[540px] ${activeService === index
                    ? 'border-white/[0.3] bg-white/[0.05] scale-[1.02] shadow-[0_0_40px_rgba(255,0,153,0.3)]'
                    : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04]'
                    }`}
                  style={{
                    boxShadow: activeService === index ? `0 0 60px ${service.glowColor}` : 'none'
                  }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${service.glowColor}, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0`}
                      style={{ boxShadow: `0 10px 40px ${service.glowColor}` }}
                    >
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-[22px] font-black text-white mb-2 sm:mb-2.5 leading-tight min-h-[56px] sm:min-h-[60px] flex items-start">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-sm sm:text-[15px] font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-3 sm:mb-3.5 leading-snug min-h-[20px]`}>
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed mb-5 sm:mb-6 line-clamp-2 min-h-[44px] flex-grow">
                      {service.description.split('.')[0]}.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-start gap-4 sm:gap-5 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/[0.08]">
                      <div className="text-left">
                        <div className="text-base sm:text-lg font-black text-[#00FFFF] mb-0.5">{service.stats.success}</div>
                        <div className="text-[10px] sm:text-[11px] text-white/50 font-semibold uppercase tracking-wide">Success</div>
                      </div>
                      <div className="w-px h-10 bg-white/[0.12]"></div>
                      <div className="text-left">
                        <div className="text-base sm:text-lg font-black text-[#FF0099] mb-0.5">{service.stats.projects}</div>
                        <div className="text-[10px] sm:text-[11px] text-white/50 font-semibold uppercase tracking-wide">Projects</div>
                      </div>
                    </div>

                    {/* Buttons - pushed to bottom */}
                    <div className="flex flex-col gap-3 mt-auto">
                      <button className={`w-full inline-flex items-center justify-center gap-2 py-2 text-[15px] font-bold transition-all duration-300 ${activeService === index
                        ? 'text-white'
                        : 'text-white/60 group-hover:text-white'
                        }`}>
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                      {service.link && (
                        <Link
                          to={service.link}
                          onClick={(e) => e.stopPropagation()}
                          className={`w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r ${service.gradient} rounded-xl text-[15px] font-black text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/[0.25] shadow-lg`}
                          style={{ boxShadow: `0 10px 30px ${service.glowColor}` }}
                        >
                          <span>Learn More</span>
                          <Rocket className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Service Details - Ultra-Premium */}
        <div className="mb-24 md:mb-32">
          {services.map((service, index) => {
            if (index !== activeService) return null;
            const Icon = service.icon;

            return (
              <div key={index} className="space-y-10 md:space-y-16">

                {/* Service Header */}
                <div className="text-center relative">
                  {/* Background glow */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-[100px]"
                    style={{ background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)` }}
                  ></div>

                  <div className={`relative inline-flex w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-8 shadow-2xl`}
                    style={{ boxShadow: `0 20px 60px ${service.glowColor}` }}
                  >
                    <Icon className="w-12 h-12 md:w-14 md:h-14 text-white" />
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
                    {service.title}
                  </h2>

                  <p className={`text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-6`}>
                    {service.tagline}
                  </p>

                  <p className="text-base md:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                    {service.description}
                  </p>

                  {/* Service Stats */}
                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8">
                    <div className="text-center px-6 py-4 bg-white/[0.03] border-2 border-white/[0.1] rounded-2xl">
                      <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-1`}>
                        {service.stats.success}
                      </div>
                      <div className="text-xs text-white/60 font-bold uppercase tracking-wider">Success Rate</div>
                    </div>
                    <div className="text-center px-6 py-4 bg-white/[0.03] border-2 border-white/[0.1] rounded-2xl">
                      <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-1`}>
                        {service.stats.projects}
                      </div>
                      <div className="text-xs text-white/60 font-bold uppercase tracking-wider">Projects</div>
                    </div>
                    <div className="text-center px-6 py-4 bg-white/[0.03] border-2 border-white/[0.1] rounded-2xl">
                      <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-1`}>
                        {service.stats.clients}
                      </div>
                      <div className="text-xs text-white/60 font-bold uppercase tracking-wider">Clients</div>
                    </div>
                  </div>
                </div>

                {/* Features & Technologies */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                  {/* Features */}
                  <div className="relative group p-8 md:p-10 bg-white/[0.02] border-2 border-white/[0.12] rounded-3xl overflow-hidden hover:border-white/[0.2] transition-all duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        Key Features
                      </h3>
                      <ul className="space-y-4">
                        {service.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-white/80 group/item hover:text-white transition-colors duration-200">
                            <div className="relative mt-1.5">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                              <div className={`absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} blur-sm opacity-70`}></div>
                            </div>
                            <span className="text-sm md:text-base font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="relative group p-8 md:p-10 bg-white/[0.02] border-2 border-white/[0.12] rounded-3xl overflow-hidden hover:border-white/[0.2] transition-all duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                          <Cpu className="w-6 h-6 text-white" />
                        </div>
                        Technologies We Use
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {service.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="group/tech relative px-4 py-2.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-sm font-bold text-white/80 hover:text-white hover:border-white/[0.25] transition-all duration-300 hover:scale-105 cursor-default"
                          >
                            <span className="relative z-10">{tech}</span>
                            <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover/tech:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">
                    Our <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Process</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {service.process.map((item: any, idx: number) => (
                      <div key={idx} className="relative group p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl hover:border-white/[0.2] transition-all duration-500 overflow-visible">
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>

                        {/* Number Badge - Fixed positioning to be fully visible */}
                        <div className="absolute -top-3 -left-3 z-20">
                          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg border-2 border-white/[0.3] group-hover:scale-110 transition-all duration-300`}
                            style={{ boxShadow: `0 10px 40px ${service.glowColor}` }}
                          >
                            {/* Glow effect for number */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-md opacity-60`}></div>

                            {/* Number */}
                            <span className="relative z-10 text-white font-black text-xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </div>

                        <div className="relative z-10 mt-4">
                          <h4 className="text-lg md:text-xl font-black text-white mb-3">{item.step}</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="relative group p-8 md:p-12 lg:p-16 bg-white/[0.03] border-2 border-white/[0.15] rounded-3xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  <div
                    className="absolute inset-0 opacity-30 blur-3xl"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${service.glowColor}, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-10 text-center flex items-center justify-center gap-3">
                      <div className="relative">
                        <Star className="w-8 h-8 md:w-10 md:h-10" style={{ color: service.color, filter: `drop-shadow(0 0 12px ${service.color})` }} />
                      </div>
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      {service.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-4 group/benefit">
                          <div className="relative flex-shrink-0 mt-1">
                            {/* Glow background layers */}
                            <div
                              className="absolute inset-0 w-6 h-6 md:w-7 md:h-7 rounded-full blur-lg opacity-60 group-hover/benefit:opacity-100 transition-opacity duration-300"
                              style={{ backgroundColor: service.color }}
                            ></div>
                            <div
                              className="absolute inset-0 w-6 h-6 md:w-7 md:h-7 rounded-full blur-md opacity-40 group-hover/benefit:opacity-70 transition-opacity duration-300"
                              style={{ backgroundColor: service.color }}
                            ></div>

                            {/* Icon with drop shadow */}
                            <CheckCircle2
                              className="relative w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover/benefit:scale-110 group-hover/benefit:rotate-12"
                              style={{
                                color: service.color,
                                filter: `drop-shadow(0 0 8px ${service.color})`
                              }}
                            />
                          </div>
                          <span className="text-base md:text-lg text-white/90 font-medium leading-relaxed group-hover/benefit:text-white transition-colors duration-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA for specific service */}
                {service.link && (
                  <div className="text-center">
                    <Link
                      to={service.link}
                      className={`group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r ${service.gradient} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,153,0.4)] hover:-translate-y-1 active:translate-y-0 border-2 border-white/[0.2]`}
                      style={{ boxShadow: `0 20px 50px ${service.glowColor}` }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <Rocket className="relative w-6 h-6 text-white" />
                      <span className="relative text-white text-lg font-black tracking-wide">Explore {service.title}</span>
                      <ArrowRight className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}

              </div>
            );
          })}
        </div>


        <div className="mb-24 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Axis Cyber</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              We bring experience, expertise, and dedication to every project with a proven <span className="text-[#00FF9D] font-bold">100% success rate</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-white/[0.02] border-2 border-white/[0.12] rounded-3xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-500 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <div className={`inline-flex w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3">{item.title}</h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section - Ultra-Premium */}
        <div className="relative group text-center p-10 md:p-14 lg:p-20 bg-white/[0.02] border-2 border-white/[0.15] rounded-[2rem] overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/5 via-[#DD00FF]/5 to-[#00FFFF]/5"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,0,153,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,255,255,0.3), transparent 50%)' }}
          ></div>

          <div className="relative z-10">
            <div className="inline-flex w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-[#FF0099] via-[#DD00FF] to-[#00FFFF] items-center justify-center mb-8 shadow-2xl animate-pulse"
              style={{ boxShadow: '0 20px 60px rgba(255,0,153,0.4)' }}
            >
              <Lightbulb className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Next Project?</span>
            </h2>

            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's discuss your requirements and create a custom solution tailored to your business needs. Join 1900+ satisfied clients worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                to="/contact"
                className="group relative rounded-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,153,0.4)] hover:-translate-y-1 active:translate-y-0"
              >
                {/* Gradient border wrapper - Pink to Cyan */}
                <div className="bg-gradient-to-r from-[#FF0099] via-[#B900FF] to-[#00FFFF] rounded-2xl p-[2px]">
                  <div className="px-10 py-5 bg-gradient-to-r from-[#FF0099] via-[#B900FF] to-[#00FFFF] rounded-2xl relative overflow-hidden inline-flex items-center gap-3">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <Sparkles className="relative w-6 h-6 text-white" />
                    <span className="relative text-white text-lg font-black tracking-wide">Get Started</span>
                    <ArrowRight className="relative w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>

              <Link
                to="/#case-studies"
                className="px-10 py-5 bg-white/[0.04] border-2 border-white/[0.15] text-white rounded-2xl text-lg font-bold hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300 inline-flex items-center gap-3"
              >
                <Target className="w-6 h-6" />
                <span>View Our Work</span>
              </Link>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}