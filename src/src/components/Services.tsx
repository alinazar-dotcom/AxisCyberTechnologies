'use client';

import { Brain, Blocks, Code2, Cloud, Smartphone, Layers, Shield, Database, Sparkles, Zap, Cpu, Network, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { GradientText } from './ui/GradientText';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    tagline: 'Intelligent automation at scale',
    description: 'Transform your business with production-ready AI solutions that deliver measurable results.',
    features: [
      'Custom ML Model Development & Training',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Recognition',
      'Predictive Analytics & Forecasting',
      'Generative AI & LLM Integration',
      'AI-Powered Automation Workflows'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'scikit-learn', 'LangChain'],
    color: 'violet',
    gradient: 'from-[var(--neon-purple)] to-purple-600',
    link: '/services/ai-ml'
  },
  {
    icon: Blocks,
    title: 'Blockchain & Web3',
    tagline: 'Decentralized solutions for the future',
    description: 'Build secure, transparent, and scalable blockchain applications that redefine trust.',
    features: [
      'Smart Contract Development & Auditing',
      'DeFi Protocol Architecture',
      'NFT Marketplace & Minting Platforms',
      'DAO Governance & Tokenomics',
      'Web3 Wallet Integration',
      'Layer 2 Scaling Solutions'
    ],
    technologies: ['Solidity', 'Ethereum', 'Solana', 'Polygon', 'Hardhat', 'Web3.js'],
    color: 'cyan',
    gradient: 'from-[var(--neon-cyan)] to-blue-600',
    link: '/services/blockchain'
  },
  {
    icon: Code2,
    title: 'Enterprise Software Engineering',
    tagline: 'Scalable systems, flawless execution',
    description: 'Enterprise-grade applications built with modern frameworks and best practices.',
    features: [
      'Full-Stack Web Applications',
      'Microservices Architecture',
      'RESTful & GraphQL API Development',
      'Real-time Data Processing',
      'Database Design & Optimization',
      'Legacy System Modernization'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL'],
    color: 'emerald',
    gradient: 'from-[var(--neon-green)] to-teal-600',
    link: '/services/enterprise-software'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & DevOps',
    tagline: 'Deploy faster, scale infinitely',
    description: 'Robust cloud architecture with automated CI/CD pipelines for continuous delivery.',
    features: [
      'Multi-Cloud Architecture (AWS, Azure, GCP)',
      'Kubernetes & Container Orchestration',
      'CI/CD Pipeline Automation',
      'Infrastructure as Code (IaC)',
      'Serverless Architecture',
      'Performance Monitoring & Optimization'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    link: '/services/cloud-devops'
  },
  {
    icon: Smartphone,
    title: 'Mobile & Cross-Platform',
    tagline: 'Native performance, everywhere',
    description: 'Beautiful, high-performance mobile apps for iOS, Android, and beyond.',
    features: [
      'Native iOS/Android Development',
      'Cross-Platform (React Native, Flutter)',
      'Progressive Web Apps (PWA)',
      'Mobile Backend as a Service',
      'Offline-First Architecture',
      'App Store Optimization & Launch'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    color: 'pink',
    gradient: 'from-[var(--neon-pink)] to-rose-600',
    link: '/services/mobile-apps'
  },
  {
    icon: Layers,
    title: '3D, WebGL & Interactive',
    tagline: 'Immersive digital experiences',
    description: 'Stunning 3D visualizations and interactive experiences that captivate users.',
    features: [
      'WebGL & Three.js Development',
      'Unity & Unreal Engine Integration',
      'AR/VR Application Development',
      'Real-time 3D Data Visualization',
      'Interactive Product Configurators',
      'Metaverse & Virtual Environments'
    ],
    technologies: ['Three.js', 'WebGL', 'Unity', 'Unreal', 'Blender', 'R3F'],
    color: 'purple',
    gradient: 'from-purple-500 to-fuchsia-600',
    link: '/services/gaming-webgl'
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Compliance',
    tagline: 'Enterprise-grade protection',
    description: 'Comprehensive security solutions to protect your business and build trust.',
    features: [
      'Security Audits & Penetration Testing',
      'Compliance (SOC 2, ISO 27001, GDPR)',
      'Vulnerability Assessment & Remediation',
      'Security Architecture Design',
      'Identity & Access Management (IAM)',
      'Incident Response & Monitoring'
    ],
    technologies: ['OWASP', 'Snyk', 'Auth0', 'Okta', 'AWS Security', 'HashiCorp Vault'],
    color: 'red',
    gradient: 'from-red-500 to-orange-600',
    link: '/services/cybersecurity'
  },
  {
    icon: Database,
    title: 'Data Engineering & Analytics',
    tagline: 'Turn data into insights',
    description: 'Build scalable data pipelines and analytics platforms for data-driven decisions.',
    features: [
      'Data Warehouse & Lake Architecture',
      'ETL/ELT Pipeline Development',
      'Real-time Data Streaming',
      'Business Intelligence & Dashboards',
      'Big Data Processing',
      'Data Governance & Quality'
    ],
    technologies: ['Snowflake', 'Apache Spark', 'Airflow', 'dbt', 'Tableau', 'Kafka'],
    color: 'amber',
    gradient: 'from-[var(--neon-orange)] to-yellow-600',
    link: '/services/data-engineering'
  },
  {
    icon: Network,
    title: 'API & Integration Services',
    tagline: 'Connect everything, seamlessly',
    description: 'Robust API development and third-party integrations for connected ecosystems.',
    features: [
      'RESTful & GraphQL API Design',
      'API Gateway & Rate Limiting',
      'Third-Party Integration (Stripe, Twilio, etc.)',
      'Webhook & Event-Driven Architecture',
      'API Documentation & Developer Portal',
      'Legacy System Integration'
    ],
    technologies: ['GraphQL', 'REST', 'gRPC', 'Kong', 'Postman', 'Swagger'],
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    link: '/services/api-integration'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    tagline: 'Speed is a feature',
    description: 'Make your applications blazing fast with advanced optimization techniques.',
    features: [
      'Frontend Performance Tuning',
      'Backend Optimization & Caching',
      'Database Query Optimization',
      'CDN & Edge Computing',
      'Load Testing & Stress Analysis',
      'Core Web Vitals Improvement'
    ],
    technologies: ['Redis', 'Varnish', 'CloudFlare', 'New Relic', 'Lighthouse', 'WebPageTest'],
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-600',
    link: '/services/performance'
  },
  {
    icon: Cpu,
    title: 'IoT & Edge Computing',
    tagline: 'Connected devices, intelligent edge',
    description: 'Build IoT ecosystems and edge computing solutions for real-time intelligence.',
    features: [
      'IoT Device Integration & Management',
      'Edge Computing Architecture',
      'Sensor Data Processing',
      'Real-time Monitoring Dashboards',
      'Predictive Maintenance Systems',
      'Industrial IoT Solutions'
    ],
    technologies: ['MQTT', 'AWS IoT', 'Azure IoT', 'InfluxDB', 'Grafana', 'Node-RED'],
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    link: '/services/iot-edge'
  },
  {
    icon: Sparkles,
    title: 'Product Strategy & UX',
    tagline: 'Design that drives results',
    description: 'Strategic product development with user-centered design for maximum impact.',
    features: [
      'Product Discovery & Research',
      'UX/UI Design & Prototyping',
      'User Testing & Validation',
      'Design System Development',
      'Conversion Rate Optimization',
      'Product Analytics & Insights'
    ],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Hotjar', 'Mixpanel'],
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    link: '/services/product-ux'
  }
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const colorMap: any = {
    violet: { border: 'border-[var(--border-purple)]', text: 'text-[var(--neon-purple)]', bg: 'bg-[var(--neon-purple)]/10', shadow: 'var(--glow-purple)' },
    cyan: { border: 'border-[var(--border-cyan)]', text: 'text-[var(--neon-cyan)]', bg: 'bg-[var(--neon-cyan)]/10', shadow: 'var(--glow-cyan)' },
    emerald: { border: 'border-[var(--border-green)]', text: 'text-[var(--neon-green)]', bg: 'bg-[var(--neon-green)]/10', shadow: 'var(--glow-green)' },
    blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', shadow: 'rgba(59,130,246,0.4)' },
    pink: { border: 'border-[var(--border-pink)]', text: 'text-[var(--neon-pink)]', bg: 'bg-[var(--neon-pink)]/10', shadow: 'var(--glow-pink)' },
    purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', shadow: 'rgba(168,85,247,0.4)' },
    red: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/10', shadow: 'rgba(239,68,68,0.4)' },
    amber: { border: 'border-[var(--border-orange)]', text: 'text-[var(--neon-orange)]', bg: 'bg-[var(--neon-orange)]/10', shadow: 'var(--glow-orange)' },
    teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', shadow: 'rgba(20,184,166,0.4)' },
    yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', shadow: 'rgba(234,179,8,0.4)' },
    indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', shadow: 'rgba(99,102,241,0.4)' },
    rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', shadow: 'rgba(244,63,94,0.4)' }
  };

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-cyan)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-purple)]/10 via-[var(--neon-cyan)]/10 to-[var(--neon-green)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Full-Spectrum Expertise</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Enterprise Solutions{' '}
            <GradientText variant="cyan-purple">
              Across Every Domain
            </GradientText>
          </h2>
          
          <p className="text-body text-white/75 max-w-3xl mx-auto leading-relaxed mb-6">
            From AI to blockchain, cloud to mobile—we deliver cutting-edge technology solutions 
            that transform businesses and drive measurable results.
          </p>
          
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--neon-purple)] hover:text-[var(--neon-cyan)] font-black transition-colors duration-200 group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const colors = colorMap[service.color];
            
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 animate-fade-in-up ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${(index % 6) * 0.1}s`,
                }}
              >
                {/* Hover glow */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl`}></div>
                
                <div 
                  className={`relative h-full p-6 md:p-8 bg-white/[0.02] border-2 ${colors.border} rounded-2xl backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.04] hover:border-white/[0.15] cursor-pointer`}
                  style={{
                    boxShadow: isHovered ? `0 20px 60px ${colors.shadow}` : '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className={`${isExpanded ? 'md:flex md:gap-10' : 'space-y-5'}`}>
                    {/* Left Column - Main Info */}
                    <div className={`${isExpanded ? 'md:w-1/3' : ''} space-y-5`}>
                      {/* Icon */}
                      <div className="relative inline-block">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Title & Tagline */}
                      <div>
                        <h3 className={`text-xl md:text-2xl font-black ${colors.text} group-hover:text-white transition-colors duration-500 mb-2`}>
                          {service.title}
                        </h3>
                        <p className="text-body-small text-white/60 font-black uppercase tracking-wide">
                          {service.tagline}
                        </p>
                      </div>
                      
                      {/* Description */}
                      <p className="text-body-small text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                        {service.description}
                      </p>

                      {/* Expand/Collapse button */}
                      <button 
                        className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg text-body-small ${colors.text} font-black hover:bg-white/[0.08] transition-colors duration-300`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(isExpanded ? null : index);
                        }}
                      >
                        {isExpanded ? 'Show Less' : 'View Details'}
                      </button>
                    </div>

                    {/* Right Column - Expanded Details */}
                    {isExpanded && (
                      <div className="md:w-2/3 space-y-6 mt-6 md:mt-0">
                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-black text-white/90 mb-4 uppercase tracking-wide">Key Capabilities</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-start gap-3 text-body-small text-white/70">
                                <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`}></div>
                                <span className="leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-black text-white/90 mb-4 uppercase tracking-wide">Technologies & Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, tIndex) => (
                              <span 
                                key={tIndex} 
                                className={`px-3 py-1.5 ${colors.bg} border ${colors.border} rounded-lg text-body-small font-black ${colors.text} backdrop-blur-sm`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Learn More Link */}
                        {service.link && (
                          <div className="pt-4">
                            <Link
                              href={service.link}
                              className={`group/link inline-flex items-center gap-2 px-5 py-3 ${colors.bg} border ${colors.border} rounded-lg text-body-small ${colors.text} font-black hover:bg-white/[0.08] transition-all duration-300`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l ${service.gradient}`}></div>
                    <div className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b ${service.gradient}`}></div>
                  </div>

                  {/* Status indicator */}
                  <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${colors.bg} ${isHovered ? 'animate-pulse' : ''}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-white/60 mb-6 text-body-small font-black">
            Don't see what you're looking for? We love custom challenges.
          </p>
          <a 
            href="#contact" 
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_var(--glow-cyan)] hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Content */}
            <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-black">Discuss Your Custom Project</span>
            <Zap className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
}
