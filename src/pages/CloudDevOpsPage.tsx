import { Cloud, Server, GitBranch, Zap, Shield, Gauge, Sparkles, ArrowRight, CheckCircle2, Trophy, Rocket, Globe, Lock, TrendingUp, Database, Network, Container, Settings, Terminal, Activity, Workflow, Box, Layers, HardDrive, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CloudDevOpsPage() {
  const capabilities = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure Design',
      description: 'Architect scalable, fault-tolerant cloud infrastructure optimized for performance and cost.',
      features: ['Multi-Cloud Strategy', 'Auto-Scaling Systems', 'High Availability', 'Disaster Recovery']
    },
    {
      icon: Container,
      title: 'Containerization & Orchestration',
      description: 'Docker and Kubernetes deployments for portable, scalable microservices architecture.',
      features: ['Docker Containerization', 'Kubernetes Clusters', 'Helm Charts', 'Service Mesh']
    },
    {
      icon: GitBranch,
      title: 'CI/CD Pipeline Automation',
      description: 'Automated build, test, and deployment pipelines for rapid, reliable software delivery.',
      features: ['GitHub Actions', 'Jenkins Pipelines', 'GitLab CI/CD', 'Automated Testing']
    },
    {
      icon: Code2,
      title: 'Infrastructure as Code',
      description: 'Version-controlled infrastructure using Terraform, CloudFormation, and Ansible.',
      features: ['Terraform Modules', 'CloudFormation Templates', 'Ansible Playbooks', 'Configuration Management']
    },
    {
      icon: Activity,
      title: 'Monitoring & Observability',
      description: 'Comprehensive monitoring, logging, and alerting for proactive issue detection.',
      features: ['Prometheus & Grafana', 'ELK Stack', 'CloudWatch', 'Custom Dashboards']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with encryption, access control, and compliance frameworks.',
      features: ['Security Hardening', 'Compliance Automation', 'Secret Management', 'Audit Logging']
    }
  ];

  const cloudProviders = [
    {
      name: 'Amazon Web Services',
      services: ['EC2', 'ECS/EKS', 'Lambda', 'RDS', 'S3', 'CloudFront'],
      icon: Cloud
    },
    {
      name: 'Google Cloud Platform',
      services: ['Compute Engine', 'GKE', 'Cloud Functions', 'Cloud SQL', 'Cloud Storage', 'Cloud CDN'],
      icon: Cloud
    },
    {
      name: 'Microsoft Azure',
      services: ['Virtual Machines', 'AKS', 'Azure Functions', 'Azure SQL', 'Blob Storage', 'Azure CDN'],
      icon: Cloud
    },
    {
      name: 'DigitalOcean',
      services: ['Droplets', 'Kubernetes', 'App Platform', 'Managed Databases', 'Spaces', 'CDN'],
      icon: Cloud
    }
  ];

  const techStack = {
    containerization: [
      { name: 'Docker', category: 'Containers' },
      { name: 'Kubernetes', category: 'Orchestration' },
      { name: 'Helm', category: 'Package Manager' },
      { name: 'Docker Compose', category: 'Multi-Container' }
    ],
    cicd: [
      { name: 'GitHub Actions', category: 'CI/CD' },
      { name: 'Jenkins', category: 'CI/CD' },
      { name: 'GitLab CI', category: 'CI/CD' },
      { name: 'ArgoCD', category: 'GitOps' }
    ],
    iac: [
      { name: 'Terraform', category: 'IaC' },
      { name: 'CloudFormation', category: 'IaC' },
      { name: 'Ansible', category: 'Configuration' },
      { name: 'Pulumi', category: 'IaC' }
    ],
    monitoring: [
      { name: 'Prometheus', category: 'Monitoring' },
      { name: 'Grafana', category: 'Visualization' },
      { name: 'ELK Stack', category: 'Logging' },
      { name: 'Datadog', category: 'APM' }
    ]
  };

  const benefits = [
    { icon: Zap, title: '10x Faster Deployments', description: 'Automated pipelines reduce deployment time from hours to minutes' },
    { icon: Gauge, title: '99.99% Uptime', description: 'High availability architecture with zero-downtime deployments' },
    { icon: TrendingUp, title: '60% Cost Reduction', description: 'Optimized resource utilization and auto-scaling' },
    { icon: Lock, title: 'Enterprise Security', description: 'Multi-layer security with automated compliance checks' }
  ];

  const caseStudies = [
    {
      title: 'Global SaaS Platform Migration',
      client: 'Enterprise Software Company',
      metric: '99.99% Uptime',
      description: 'Migrated monolithic application to AWS microservices with Kubernetes, achieving 10x faster deployments and 50% cost savings.',
      tech: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins']
    },
    {
      title: 'Multi-Cloud DevOps Platform',
      client: 'Financial Services Provider',
      metric: '5 Min Deployments',
      description: 'Built automated CI/CD pipelines across AWS and GCP with comprehensive monitoring and security compliance.',
      tech: ['GitHub Actions', 'Docker', 'Prometheus', 'Grafana']
    },
    {
      title: 'High-Traffic E-commerce Infrastructure',
      client: 'Retail Giant',
      metric: '50K RPS',
      description: 'Designed auto-scaling infrastructure handling 50,000 requests per second during peak traffic with zero downtime.',
      tech: ['Azure', 'Kubernetes', 'Redis', 'CloudFlare']
    }
  ];

  const process = [
    { step: '01', title: 'Assessment & Planning', description: 'Infrastructure audit, requirements analysis, and migration strategy.' },
    { step: '02', title: 'Architecture Design', description: 'Design scalable, secure cloud architecture aligned with business goals.' },
    { step: '03', title: 'Implementation & Migration', description: 'Gradual migration with minimal disruption and continuous validation.' },
    { step: '04', title: 'Optimization & Support', description: 'Ongoing monitoring, cost optimization, and 24/7 support.' }
  ];

  const services = [
    {
      title: 'Cloud Migration',
      description: 'Seamless migration from on-premises to cloud or multi-cloud environments',
      items: ['Lift & Shift', 'Re-platforming', 'Re-architecting', 'Hybrid Cloud']
    },
    {
      title: 'DevOps Automation',
      description: 'End-to-end automation of development and operations workflows',
      items: ['Pipeline Setup', 'Test Automation', 'Deployment Automation', 'Rollback Strategies']
    },
    {
      title: 'Performance Optimization',
      description: 'Optimize infrastructure for maximum performance and minimal cost',
      items: ['Load Balancing', 'Caching Strategies', 'Database Tuning', 'CDN Integration']
    },
    {
      title: 'Security Hardening',
      description: 'Implement comprehensive security measures and compliance frameworks',
      items: ['IAM Policies', 'Network Security', 'Encryption', 'Vulnerability Scanning']
    }
  ];

  const metrics = [
    { value: '300+', label: 'Cloud Projects Delivered' },
    { value: '100%', label: 'Deployment Success Rate' },
    { value: '99.99%', label: 'Average Uptime' },
    { value: '60%', label: 'Avg Cost Savings' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full backdrop-blur-md mb-6">
              <Cloud className="w-4 h-4 text-orange-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Cloud Infrastructure & DevOps</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Build, Deploy, Scale{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              From cloud migration to automated CI/CD pipelines, we architect resilient infrastructure 
              that scales effortlessly and deploys reliably.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Transform Your Infrastructure</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Trophy className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Case Studies</span>
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

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-orange-500/20 rounded-xl hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/60">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Complete{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                DevOps Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-orange-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-orange-400 group-hover:text-white transition-colors duration-500 mb-3">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                      {capability.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {capability.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
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

      {/* Cloud Providers Section */}
      <section className="py-16 md:py-24 bg-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multi-Cloud{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-white/60">Certified experts across all major cloud platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {cloudProviders.map((provider, index) => {
              const Icon = provider.icon;
              return (
                <div
                  key={index}
                  className="group p-6 md:p-8 bg-white/[0.02] border border-orange-500/20 rounded-xl hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-orange-400" />
                    <h3 className="text-xl font-bold text-white">{provider.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {provider.services.map((service, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              DevOps{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Containerization */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Container className="w-5 h-5 text-orange-400" />
                Containerization
              </h3>
              <div className="space-y-3">
                {techStack.containerization.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CI/CD */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-orange-400" />
                CI/CD
              </h3>
              <div className="space-y-3">
                {techStack.cicd.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* IaC */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-orange-400" />
                Infrastructure as Code
              </h3>
              <div className="space-y-3">
                {techStack.iac.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                Monitoring
              </h3>
              <div className="space-y-3">
                {techStack.monitoring.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Service Offerings
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border border-orange-500/20 rounded-xl hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-white/70 mb-5">{service.description}</p>
                
                <div className="space-y-2">
                  {service.items.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Implementation Process
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Structured approach from assessment to optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-orange-500/20 rounded-xl hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-orange-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Infrastructure{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-orange-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-orange-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-orange-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400"
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Modernize{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Your Infrastructure?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Whether migrating to the cloud or optimizing existing infrastructure, our DevOps experts 
              will accelerate your deployment pipeline and reduce operational costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Get Started Today</span>
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

      {/* Animations */}
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
