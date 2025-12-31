import { Smartphone, Zap, Layers, Users, Sparkles, ArrowRight, CheckCircle2, Trophy, Rocket, Globe, TrendingUp, Code2, Cpu, Palette, Lock, Bell, Download, Share2, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MobileAppPage() {
  const capabilities = [
    {
      icon: Smartphone,
      title: 'Native iOS & Android Development',
      description: 'High-performance native apps leveraging platform-specific features and capabilities.',
      features: ['Swift & Objective-C', 'Kotlin & Java', 'Native UI/UX', 'Platform APIs']
    },
    {
      icon: Layers,
      title: 'Cross-Platform Development',
      description: 'Build once, deploy everywhere with React Native, Flutter, and modern frameworks.',
      features: ['React Native', 'Flutter', 'Expo', 'Code Reusability']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Intuitive, beautiful interfaces following Material Design and Human Interface Guidelines.',
      features: ['Custom UI Components', 'Motion Design', 'Accessibility', 'Design Systems']
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast apps with optimized rendering, memory management, and battery efficiency.',
      features: ['60 FPS Animations', 'Memory Management', 'Battery Optimization', 'App Size Reduction']
    },
    {
      icon: Lock,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with encryption, secure storage, and compliance standards.',
      features: ['End-to-End Encryption', 'Biometric Auth', 'Secure Storage', 'GDPR Compliance']
    },
    {
      icon: Bell,
      title: 'Push Notifications & Real-Time',
      description: 'Engage users with push notifications, real-time updates, and background processing.',
      features: ['FCM & APNs', 'Real-Time Sync', 'Background Jobs', 'In-App Messaging']
    }
  ];

  const platforms = [
    {
      name: 'iOS',
      description: 'Native iOS apps for iPhone and iPad',
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'Xcode'],
      icon: Smartphone
    },
    {
      name: 'Android',
      description: 'Native Android apps for phones and tablets',
      technologies: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Android Studio'],
      icon: Smartphone
    },
    {
      name: 'Cross-Platform',
      description: 'Hybrid apps for both iOS and Android',
      technologies: ['React Native', 'Flutter', 'Expo', 'TypeScript'],
      icon: Layers
    },
    {
      name: 'Progressive Web Apps',
      description: 'Web apps with native-like experience',
      technologies: ['PWA', 'Service Workers', 'Web Manifest', 'Offline Support'],
      icon: Globe
    }
  ];

  const features = [
    { icon: Code2, title: 'Clean Architecture', description: 'Maintainable, testable code following best practices' },
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized performance with 60 FPS smooth animations' },
    { icon: Lock, title: 'Secure by Design', description: 'End-to-end encryption and secure data storage' },
    { icon: Users, title: 'User-Centric', description: 'Intuitive UX designed for maximum engagement' }
  ];

  const caseStudies = [
    {
      title: 'Social Media Platform',
      client: 'Tech Startup',
      metric: '5M+ Downloads',
      description: 'Built a cross-platform social networking app with real-time messaging, stories, and AI-powered content recommendations.',
      tech: ['React Native', 'Node.js', 'WebSocket', 'Redis']
    },
    {
      title: 'FinTech Mobile Banking',
      client: 'Digital Bank',
      metric: '4.8★ Rating',
      description: 'Developed secure mobile banking app with biometric auth, instant transfers, and investment portfolio management.',
      tech: ['Flutter', 'Firebase', 'Plaid API', 'Face ID']
    },
    {
      title: 'Healthcare & Wellness',
      client: 'Health Tech Company',
      metric: '2M+ Active Users',
      description: 'Created telehealth platform with video consultations, prescription management, and health tracking features.',
      tech: ['Swift', 'Kotlin', 'WebRTC', 'HealthKit']
    }
  ];

  const process = [
    { step: '01', title: 'Discovery & Strategy', description: 'User research, competitor analysis, and feature prioritization.' },
    { step: '02', title: 'Design & Prototyping', description: 'Wireframes, high-fidelity designs, and interactive prototypes.' },
    { step: '03', title: 'Development & Testing', description: 'Agile sprints with continuous testing and quality assurance.' },
    { step: '04', title: 'Launch & Growth', description: 'App store submission, marketing support, and post-launch updates.' }
  ];

  const industries = [
    { name: 'E-commerce & Retail', icon: Download },
    { name: 'FinTech & Banking', icon: Lock },
    { name: 'Healthcare & Wellness', icon: Users },
    { name: 'Social & Entertainment', icon: Share2 },
    { name: 'Education & EdTech', icon: Code2 },
    { name: 'Travel & Hospitality', icon: Globe }
  ];

  const appTypes = [
    {
      title: 'Consumer Apps',
      description: 'Social networks, entertainment, lifestyle, and utility apps',
      examples: ['Social Media', 'Dating Apps', 'Fitness Trackers', 'Photo Editors']
    },
    {
      title: 'Enterprise Apps',
      description: 'Internal tools, productivity apps, and business solutions',
      examples: ['CRM Systems', 'Project Management', 'Field Service', 'Sales Enablement']
    },
    {
      title: 'E-commerce Apps',
      description: 'Mobile shopping, marketplaces, and retail experiences',
      examples: ['Online Stores', 'Marketplaces', 'Food Delivery', 'Booking Systems']
    },
    {
      title: 'On-Demand Apps',
      description: 'Service platforms connecting users with providers',
      examples: ['Ride-Sharing', 'Home Services', 'Delivery Apps', 'Freelance Platforms']
    }
  ];

  const techStack = {
    native: [
      { name: 'Swift', category: 'iOS' },
      { name: 'Kotlin', category: 'Android' },
      { name: 'SwiftUI', category: 'iOS' },
      { name: 'Jetpack Compose', category: 'Android' }
    ],
    crossPlatform: [
      { name: 'React Native', category: 'Framework' },
      { name: 'Flutter', category: 'Framework' },
      { name: 'Expo', category: 'Toolchain' },
      { name: 'TypeScript', category: 'Language' }
    ],
    backend: [
      { name: 'Firebase', category: 'BaaS' },
      { name: 'Node.js', category: 'API' },
      { name: 'GraphQL', category: 'API' },
      { name: 'REST APIs', category: 'API' }
    ],
    tools: [
      { name: 'Xcode', category: 'IDE' },
      { name: 'Android Studio', category: 'IDE' },
      { name: 'Fastlane', category: 'CI/CD' },
      { name: 'TestFlight', category: 'Testing' }
    ]
  };

  const metrics = [
    { value: '400+', label: 'Apps Published' },
    { value: '100%', label: 'App Store Approval' },
    { value: '50M+', label: 'Total Downloads' },
    { value: '4.7★', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-rose-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-full backdrop-blur-md mb-6">
              <Smartphone className="w-4 h-4 text-pink-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Mobile App Development</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Native & Cross-Platform{' '}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                Mobile Excellence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              From concept to launch, we build iOS and Android apps that users love. 
              Beautiful design, lightning-fast performance, and seamless experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Build Your App</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Trophy className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Portfolio</span>
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

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-pink-500/20 rounded-xl hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              End-to-End{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Mobile Development
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-pink-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-pink-400 group-hover:text-white transition-colors duration-500 mb-3">
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
                          <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
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

      {/* Platforms Section */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multi-Platform{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Development
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-pink-500/20 rounded-xl hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-sm text-white/60 mb-4">{platform.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.technologies.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2 py-1 bg-pink-500/10 border border-pink-500/20 rounded text-xs text-pink-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Types */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              App Types{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                We Build
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {appTypes.map((type, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border border-pink-500/20 rounded-xl hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-sm text-white/70 mb-5">{type.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {type.examples.map((example, eIndex) => (
                    <div key={eIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <ChevronRight className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mobile{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Native */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-pink-400" />
                Native
              </h3>
              <div className="space-y-3">
                {techStack.native.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Platform */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-pink-400" />
                Cross-Platform
              </h3>
              <div className="space-y-3">
                {techStack.crossPlatform.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-pink-400" />
                Backend
              </h3>
              <div className="space-y-3">
                {techStack.backend.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-pink-400" />
                Tools
              </h3>
              <div className="space-y-3">
                {techStack.tools.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                We Serve
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="group p-4 bg-white/[0.02] border border-pink-500/20 rounded-lg hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-300 text-center"
                >
                  <Icon className="w-8 h-8 text-pink-400 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm text-white/70">{industry.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-pink-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-pink-500/20 rounded-xl hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-pink-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                App Projects
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-pink-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-pink-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-pink-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs text-pink-400"
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Your Mobile App?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              From initial concept to App Store launch, we'll guide you through every step. 
              Let's create something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your Project</span>
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
