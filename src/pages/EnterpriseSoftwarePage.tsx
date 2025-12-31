import { Code2, Zap, Layers, Database, GitBranch, Server, Sparkles, ArrowRight, CheckCircle2, Trophy, Users, Rocket, Globe, Lock, TrendingUp, Network, Box, Gauge, FileCode, Cloud, BarChart3, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EnterpriseSoftwarePage() {
  const capabilities = [
    {
      icon: Code2,
      title: 'Full-Stack Web Applications',
      description: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.',
      features: ['React & Next.js', 'Vue.js & Nuxt.js', 'Progressive Web Apps', 'Server-Side Rendering']
    },
    {
      icon: Layers,
      title: 'Microservices Architecture',
      description: 'Scalable, loosely-coupled services designed for flexibility, resilience, and independent deployment.',
      features: ['Service Decomposition', 'API Gateway Patterns', 'Event-Driven Architecture', 'Container Orchestration']
    },
    {
      icon: Network,
      title: 'API Development & Integration',
      description: 'RESTful and GraphQL APIs with comprehensive documentation and developer-friendly design.',
      features: ['REST & GraphQL APIs', 'API Gateway Management', 'Third-Party Integrations', 'Webhook Systems']
    },
    {
      icon: Database,
      title: 'Database Design & Optimization',
      description: 'Robust database architecture with performance tuning, indexing, and scalability planning.',
      features: ['SQL & NoSQL Design', 'Query Optimization', 'Data Modeling', 'Replication & Sharding']
    },
    {
      icon: Zap,
      title: 'Real-Time Data Processing',
      description: 'High-performance systems for real-time analytics, streaming data, and live updates.',
      features: ['WebSocket Integration', 'Message Queues', 'Stream Processing', 'Live Dashboards']
    },
    {
      icon: GitBranch,
      title: 'Legacy System Modernization',
      description: 'Transform outdated systems into modern, cloud-native applications without disrupting operations.',
      features: ['Gradual Migration', 'API Wrapping', 'Data Migration', 'Zero-Downtime Deployments']
    }
  ];

  const techStack = {
    frontend: [
      { name: 'React', category: 'Framework' },
      { name: 'Next.js', category: 'Framework' },
      { name: 'Vue.js', category: 'Framework' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Redux', category: 'State Management' }
    ],
    backend: [
      { name: 'Node.js', category: 'Runtime' },
      { name: 'Python', category: 'Language' },
      { name: 'Go', category: 'Language' },
      { name: 'Java', category: 'Language' },
      { name: 'Express.js', category: 'Framework' },
      { name: 'FastAPI', category: 'Framework' }
    ],
    databases: [
      { name: 'PostgreSQL', category: 'SQL' },
      { name: 'MongoDB', category: 'NoSQL' },
      { name: 'Redis', category: 'Cache' },
      { name: 'Elasticsearch', category: 'Search' },
      { name: 'MySQL', category: 'SQL' },
      { name: 'DynamoDB', category: 'NoSQL' }
    ],
    tools: [
      { name: 'Docker', category: 'Containerization' },
      { name: 'Kubernetes', category: 'Orchestration' },
      { name: 'GitHub Actions', category: 'CI/CD' },
      { name: 'Jenkins', category: 'CI/CD' },
      { name: 'Terraform', category: 'IaC' },
      { name: 'Nginx', category: 'Web Server' }
    ]
  };

  const industries = [
    { icon: BarChart3, name: 'Financial Services', description: 'Trading platforms, banking systems, fintech solutions' },
    { icon: Globe, name: 'E-commerce & Retail', description: 'Online stores, inventory management, customer portals' },
    { icon: Shield, name: 'Healthcare & MedTech', description: 'Patient portals, EHR systems, telemedicine platforms' },
    { icon: Users, name: 'SaaS & Enterprise', description: 'B2B platforms, CRM systems, collaboration tools' }
  ];

  const caseStudies = [
    {
      title: 'Global E-commerce Platform',
      client: 'International Retailer',
      metric: '10M+ Users',
      description: 'Built a highly scalable e-commerce platform with microservices, real-time inventory, and multi-region deployment.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Enterprise CRM System',
      client: 'Fortune 500 Company',
      metric: '5K+ Employees',
      description: 'Developed comprehensive CRM with advanced analytics, automation workflows, and third-party integrations.',
      tech: ['React', 'Python', 'MongoDB', 'Elasticsearch']
    },
    {
      title: 'Financial Trading Platform',
      client: 'Investment Firm',
      metric: '$2B+ Daily Volume',
      description: 'Created low-latency trading system with real-time market data, advanced charting, and risk management.',
      tech: ['TypeScript', 'Go', 'WebSocket', 'TimescaleDB']
    }
  ];

  const process = [
    { step: '01', title: 'Discovery & Planning', description: 'Requirements gathering, technical architecture design, and project roadmap.' },
    { step: '02', title: 'Agile Development', description: 'Iterative development with sprint-based delivery and continuous feedback.' },
    { step: '03', title: 'Quality Assurance', description: 'Comprehensive testing including unit, integration, and end-to-end tests.' },
    { step: '04', title: 'Deployment & Support', description: 'Production deployment with monitoring, maintenance, and ongoing optimization.' }
  ];

  const features = [
    { icon: Gauge, title: 'High Performance', description: 'Optimized for speed with sub-second response times' },
    { icon: Lock, title: 'Enterprise Security', description: 'Bank-level security with encryption and compliance' },
    { icon: TrendingUp, title: 'Scalable', description: 'Auto-scaling infrastructure handling millions of users' },
    { icon: Cloud, title: 'Cloud-Native', description: 'Built for AWS, Azure, and Google Cloud Platform' }
  ];

  const architecturePatterns = [
    {
      title: 'Microservices',
      description: 'Distributed systems with independent services communicating via APIs',
      benefits: ['Independent Scaling', 'Technology Flexibility', 'Fault Isolation', 'Rapid Deployment']
    },
    {
      title: 'Event-Driven',
      description: 'Asynchronous architecture using message brokers and event streams',
      benefits: ['Loose Coupling', 'Real-Time Processing', 'High Scalability', 'Resilient Systems']
    },
    {
      title: 'Serverless',
      description: 'Auto-scaling functions-as-a-service for cost-effective computing',
      benefits: ['Zero Server Management', 'Pay-per-Use', 'Infinite Scaling', 'Reduced Costs']
    },
    {
      title: 'Monolithic to Modern',
      description: 'Strategic migration from legacy systems to cloud-native architecture',
      benefits: ['Risk Mitigation', 'Gradual Transformation', 'Business Continuity', 'Proven Methodology']
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md mb-6">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Enterprise Software Engineering</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Scalable Systems,{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Flawless Execution
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Enterprise-grade applications built with modern frameworks, microservices architecture, 
              and industry best practices for mission-critical systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your Project</span>
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
            <div className="grid grid-cols-3 gap-6 md:gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">250+</div>
                <div className="text-sm text-white/60">Enterprise Apps Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-white/60">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50M+</div>
                <div className="text-sm text-white/60">End Users Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-emerald-500/20 rounded-xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Full-Stack{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Development Expertise
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-emerald-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-emerald-400 group-hover:text-white transition-colors duration-500 mb-3">
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
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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

      {/* Architecture Patterns */}
      <section className="py-16 md:py-24 bg-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Modern{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Architecture Patterns
              </span>
            </h2>
            <p className="text-white/60">Proven architectures for scalable, resilient systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {architecturePatterns.map((pattern, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border border-emerald-500/20 rounded-xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{pattern.title}</h3>
                <p className="text-sm text-white/70 mb-5">{pattern.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {pattern.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Frontend
              </h3>
              <div className="space-y-3">
                {techStack.frontend.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                Backend
              </h3>
              <div className="space-y-3">
                {techStack.backend.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                Databases
              </h3>
              <div className="space-y-3">
                {techStack.databases.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-emerald-400" />
                DevOps
              </h3>
              <div className="space-y-3">
                {techStack.tools.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Agile methodology with continuous delivery and quality assurance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-emerald-500/20 rounded-xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-emerald-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries We{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Serve
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-sm text-white/60">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Success{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-emerald-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Enterprise Software?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Let's transform your vision into a scalable, high-performance application. 
              Our expert engineering team is ready to deliver excellence.
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
