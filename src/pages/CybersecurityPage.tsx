import { Shield, Lock, Eye, Fingerprint, Key, AlertTriangle, Sparkles, ArrowRight, CheckCircle2, Trophy, Rocket, Globe, TrendingUp, Code2, Cpu, Zap, Users, FileCheck, ShieldCheck, Network, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CybersecurityPage() {
  const capabilities = [
    {
      icon: Shield,
      title: 'Security Architecture',
      description: 'Design and implement comprehensive security frameworks for enterprise applications.',
      features: ['Zero Trust Architecture', 'Defense in Depth', 'Security by Design', 'Threat Modeling']
    },
    {
      icon: Lock,
      title: 'Penetration Testing',
      description: 'Identify vulnerabilities before attackers do with thorough security assessments.',
      features: ['Web App Testing', 'Network Scanning', 'API Security', 'Social Engineering']
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 threat detection and incident response with advanced SIEM solutions.',
      features: ['Real-Time Alerts', 'Log Analysis', 'Anomaly Detection', 'SOC Operations']
    },
    {
      icon: Fingerprint,
      title: 'Identity & Access Management',
      description: 'Secure authentication and authorization systems with multi-factor protection.',
      features: ['SSO & SAML', 'OAuth 2.0', 'Biometric Auth', 'Role-Based Access']
    },
    {
      icon: Key,
      title: 'Encryption & Data Protection',
      description: 'End-to-end encryption for data at rest and in transit.',
      features: ['AES-256 Encryption', 'PKI Management', 'Secure Key Storage', 'Data Masking']
    },
    {
      icon: FileCheck,
      title: 'Compliance & Auditing',
      description: 'Meet regulatory requirements with comprehensive compliance frameworks.',
      features: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA']
    }
  ];

  const threats = [
    { name: 'DDoS Attacks', icon: AlertTriangle, protection: '100% Uptime' },
    { name: 'SQL Injection', icon: Code2, protection: 'Zero Vulnerabilities' },
    { name: 'XSS Attacks', icon: Globe, protection: 'Complete Prevention' },
    { name: 'Data Breaches', icon: Lock, protection: 'End-to-End Encryption' }
  ];

  const services = [
    {
      title: 'Vulnerability Assessment',
      description: 'Comprehensive scanning and analysis of your infrastructure',
      deliverables: ['Security Scan Reports', 'Risk Assessment', 'Remediation Plan', 'Priority Matrix']
    },
    {
      title: 'Security Audits',
      description: 'In-depth review of security policies and implementations',
      deliverables: ['Audit Reports', 'Compliance Gap Analysis', 'Security Roadmap', 'Best Practices']
    },
    {
      title: 'Incident Response',
      description: 'Rapid response and recovery from security incidents',
      deliverables: ['Incident Handling', 'Forensic Analysis', 'Recovery Plan', 'Post-Mortem']
    },
    {
      title: 'Security Training',
      description: 'Educate your team on security best practices',
      deliverables: ['Awareness Programs', 'Phishing Simulations', 'Secure Coding', 'Workshops']
    }
  ];

  const caseStudies = [
    {
      title: 'Financial Institution Security',
      client: 'Global Bank',
      metric: 'Zero Breaches',
      description: 'Implemented comprehensive security framework protecting $50B+ in assets with multi-layer defense and real-time threat detection.',
      tech: ['AWS Security Hub', 'Okta', 'Splunk', 'CrowdStrike']
    },
    {
      title: 'Healthcare Data Protection',
      client: 'Hospital Network',
      metric: 'HIPAA Compliant',
      description: 'Secured patient data for 500K+ records with end-to-end encryption, access controls, and audit logging.',
      tech: ['Azure Security', 'HashiCorp Vault', 'Azure AD', 'Qualys']
    },
    {
      title: 'E-commerce Platform Security',
      client: 'Retail Giant',
      metric: '100M+ Users Protected',
      description: 'Prevented fraud and secured payment processing for high-traffic e-commerce platform with advanced threat detection.',
      tech: ['Cloudflare', 'Auth0', 'Stripe Radar', 'Datadog']
    }
  ];

  const techStack = {
    tools: [
      { name: 'Burp Suite', category: 'Pen Testing' },
      { name: 'Metasploit', category: 'Exploitation' },
      { name: 'Nmap', category: 'Network Scanning' },
      { name: 'Wireshark', category: 'Traffic Analysis' }
    ],
    platforms: [
      { name: 'AWS Security', category: 'Cloud Security' },
      { name: 'Azure Security Center', category: 'Cloud Security' },
      { name: 'Cloudflare', category: 'DDoS Protection' },
      { name: 'Akamai', category: 'WAF' }
    ],
    authentication: [
      { name: 'Auth0', category: 'IAM' },
      { name: 'Okta', category: 'SSO' },
      { name: 'Azure AD', category: 'Directory' },
      { name: 'Keycloak', category: 'Open Source' }
    ],
    monitoring: [
      { name: 'Splunk', category: 'SIEM' },
      { name: 'ELK Stack', category: 'Log Analysis' },
      { name: 'Datadog', category: 'Monitoring' },
      { name: 'CrowdStrike', category: 'EDR' }
    ]
  };

  const process = [
    { step: '01', title: 'Security Assessment', description: 'Evaluate current security posture and identify gaps.' },
    { step: '02', title: 'Strategy & Planning', description: 'Develop comprehensive security roadmap and policies.' },
    { step: '03', title: 'Implementation', description: 'Deploy security controls and monitoring systems.' },
    { step: '04', title: 'Continuous Monitoring', description: '24/7 threat detection and incident response.' }
  ];

  const metrics = [
    { value: '100%', label: 'Threat Prevention' },
    { value: '24/7', label: 'Security Monitoring' },
    { value: '<5min', label: 'Incident Response' },
    { value: '100%', label: 'Compliance Rate' }
  ];

  const certifications = [
    { name: 'ISO 27001', icon: Shield },
    { name: 'SOC 2 Type II', icon: ShieldCheck },
    { name: 'PCI DSS', icon: Lock },
    { name: 'GDPR Compliant', icon: FileCheck }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full backdrop-blur-md mb-6">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Cybersecurity Services</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Enterprise-Grade{' '}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Security Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Protect your business with comprehensive cybersecurity solutions. 
              From threat detection to compliance, we secure your digital assets 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Shield className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Secure Your Business</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Trophy className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">Security Case Studies</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 max-w-4xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Threat Protection */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Protection Against{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                All Threats
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-red-500/20 rounded-xl hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{threat.name}</h3>
                  <p className="text-sm text-white/60">{threat.protection}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Security Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-red-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-red-400 group-hover:text-white transition-colors duration-500 mb-3">
                      {capability.title}
                    </h3>

                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                      {capability.description}
                    </p>

                    <div className="space-y-2">
                      {capability.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Service Offerings
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border border-red-500/20 rounded-xl hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-white/70 mb-5">{service.description}</p>
                
                <div className="space-y-2">
                  {service.deliverables.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Certified &{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Compliant
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-red-500/20 rounded-xl hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-300 text-center"
                >
                  <Icon className="w-12 h-12 text-red-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm font-semibold text-white/70">{cert.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Security Tools
              </h3>
              <div className="space-y-3">
                {techStack.tools.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-red-400" />
                Platforms
              </h3>
              <div className="space-y-3">
                {techStack.platforms.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-red-400" />
                Authentication
              </h3>
              <div className="space-y-3">
                {techStack.authentication.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-400" />
                Monitoring
              </h3>
              <div className="space-y-3">
                {techStack.monitoring.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-red-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Security{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Implementation Process
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-red-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-red-500/20 rounded-xl hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-500">
                  <div className="text-6xl font-bold text-red-500/20 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Security{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-red-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-red-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-red-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
              <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View All Case Studies</span>
              <ArrowRight className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Secure Your Business?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Don't wait for a breach. Protect your business with enterprise-grade security solutions today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Get Security Audit</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">Explore All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
