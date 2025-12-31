import { TrendingUp, Sparkles, ArrowRight, CheckCircle2, Rocket, Shield, Zap, Clock, BarChart3, Lock, Globe, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FinancialServicesPage() {
  const solutions = [
    {
      icon: TrendingUp,
      title: 'High-Frequency Trading',
      description: 'Ultra-low latency trading systems with microsecond execution times.',
      features: ['Sub-millisecond Latency', 'Market Data Processing', 'Order Execution', 'Risk Management']
    },
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Automated compliance monitoring and reporting systems.',
      features: ['AML/KYC Automation', 'Transaction Monitoring', 'Regulatory Reporting', 'Audit Trails']
    },
    {
      icon: Lock,
      title: 'Risk Analytics',
      description: 'Real-time risk assessment and portfolio optimization.',
      features: ['VaR Calculation', 'Stress Testing', 'Portfolio Analytics', 'Credit Scoring']
    },
    {
      icon: Zap,
      title: 'Payment Infrastructure',
      description: 'Real-time payment processing and settlement systems.',
      features: ['Instant Payments', 'Multi-Currency', 'Fraud Prevention', 'Settlement Engine']
    },
    {
      icon: BarChart3,
      title: 'Trading Analytics',
      description: 'Advanced analytics for trading desks and investment management.',
      features: ['Performance Attribution', 'Market Analytics', 'Trade Surveillance', 'Reporting']
    },
    {
      icon: Globe,
      title: 'Digital Banking',
      description: 'Next-generation digital banking platforms and mobile apps.',
      features: ['Mobile Banking', 'Account Management', 'Loan Origination', 'Wealth Management']
    }
  ];

  const metrics = [
    { value: '<1ms', label: 'Trade Latency', icon: Clock },
    { value: '85+', label: 'Projects Delivered', icon: Rocket },
    { value: '100%', label: 'Uptime SLA', icon: Shield },
    { value: '$50B+', label: 'Daily Volume', icon: DollarSign }
  ];

  const technologies = [
    { name: 'Java/C++', category: 'Low Latency' },
    { name: 'Apache Kafka', category: 'Streaming' },
    { name: 'Redis', category: 'Caching' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'React/TypeScript', category: 'Frontend' },
    { name: 'Kubernetes', category: 'Infrastructure' },
    { name: 'Python', category: 'Analytics' },
    { name: 'TensorFlow', category: 'AI/ML' }
  ];

  const caseStudies = [
    {
      title: 'Global Investment Bank Trading Platform',
      challenge: 'Legacy trading system with 500ms+ latency impacting competitiveness',
      solution: 'Built ultra-low latency trading engine with sub-millisecond execution',
      results: ['<1ms latency achieved', '$10M+ daily savings', '10x throughput increase', '99.999% uptime'],
      tech: ['C++', 'FPGA', 'Kafka', 'Redis']
    },
    {
      title: 'Digital Wallet & Payment Platform',
      challenge: 'Needed scalable payment infrastructure for 50M+ users',
      solution: 'Developed real-time payment processing system with fraud detection',
      results: ['50M+ users onboarded', '1000 TPS capacity', '100% PCI compliance', '$5B+ processed'],
      tech: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Risk Management System',
      challenge: 'Manual risk assessment causing delays and errors',
      solution: 'AI-powered real-time risk analytics and portfolio optimization',
      results: ['Real-time risk scoring', '90% automation', '40% risk reduction', '100% audit compliance'],
      tech: ['Python', 'TensorFlow', 'Spark', 'Tableau']
    }
  ];

  const compliance = [
    { name: 'SOC 2 Type II', icon: Shield },
    { name: 'PCI DSS', icon: Lock },
    { name: 'ISO 27001', icon: Shield },
    { name: 'GDPR', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Financial Services & Capital Markets</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Mission-Critical{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                FinTech Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Powering the future of finance with ultra-low latency trading systems, real-time payments, 
              and AI-driven risk analytics. Trusted by Fortune 500 financial institutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
                <Rocket className="relative w-5 h-5 text-white" />
                <span className="relative text-white font-semibold">Transform Your FinTech</span>
                <ArrowRight className="relative w-5 h-5 text-white" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 max-w-4xl mx-auto">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-emerald-400 mb-3 mx-auto" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-sm text-white/60">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                FinTech Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-emerald-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-400 group-hover:text-white transition-colors duration-500 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                    {solution.description}
                  </p>
                  <div className="space-y-2">
                    {solution.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technology{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 text-center">
                <div className="text-white font-semibold text-sm mb-1">{tech.name}</div>
                <div className="text-xs text-white/50">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Success{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="p-6 md:p-8 bg-white/[0.02] border-2 border-emerald-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-3">{study.title}</h3>
                <div className="mb-4">
                  <p className="text-sm text-white/50 mb-2">Challenge:</p>
                  <p className="text-sm text-white/70">{study.challenge}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-white/50 mb-2">Solution:</p>
                  <p className="text-sm text-white/70">{study.solution}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-white/50 mb-2">Results:</p>
                  <div className="space-y-2">
                    {study.results.map((result, rIndex) => (
                      <div key={rIndex} className="flex items-center gap-2 text-sm text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span key={tIndex} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compliance &{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Security
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {compliance.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="p-6 bg-white/[0.02] border border-emerald-500/20 rounded-xl hover:bg-white/[0.04] hover:border-emerald-400/40 transition-all duration-300 text-center">
                  <Icon className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
                  <div className="text-sm font-semibold text-white/70">{cert.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Your FinTech?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">
            Build ultra-low latency systems that power the future of finance.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Start Your Project</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
