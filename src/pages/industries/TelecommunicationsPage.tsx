import { Radio, Sparkles, ArrowRight, CheckCircle2, Rocket, Wifi, Antenna, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TelecommunicationsPage() {
  const solutions = [
    {
      title: '5G Network Infrastructure',
      description: 'Next-generation 5G core and RAN deployment platforms.',
      features: ['5G Core', 'Network Slicing', 'Edge Computing', 'Private 5G']
    },
    {
      title: 'Network Orchestration',
      description: 'Automated network management and orchestration systems.',
      features: ['SDN/NFV', 'Network Automation', 'Service Orchestration', 'Self-Healing Networks']
    },
    {
      title: 'Edge Computing Platforms',
      description: 'Multi-access edge computing for ultra-low latency applications.',
      features: ['MEC Platforms', 'Edge Analytics', 'Content Delivery', 'IoT Integration']
    },
    {
      title: 'Carrier-Grade Systems',
      description: 'Mission-critical telecom infrastructure with 99.999% uptime.',
      features: ['Billing Systems', 'OSS/BSS', 'Customer Care', 'Revenue Management']
    },
    {
      title: 'Spectrum Management',
      description: 'RF spectrum planning, optimization, and management platforms.',
      features: ['Spectrum Planning', 'Interference Analysis', 'License Management', 'Optimization']
    },
    {
      title: 'IoT Connectivity',
      description: 'Massive IoT connectivity platforms for NB-IoT and LTE-M.',
      features: ['IoT Platform', 'Device Management', 'Analytics', 'Connectivity APIs']
    }
  ];

  const metrics = [
    { value: '56+', label: 'Projects', icon: Rocket },
    { value: '18', label: 'Carriers', icon: Antenna },
    { value: '5G', label: 'Ready', icon: Signal },
    { value: '100M+', label: 'Subscribers', icon: Wifi }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full backdrop-blur-md mb-6">
              <Radio className="w-4 h-4 text-blue-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Telecommunications & 5G</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Next-Gen{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                5G Networks
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Building carrier-grade 5G infrastructure, network orchestration, and edge computing platforms serving 100M+ subscribers across 18 telecom carriers worldwide.
            </p>

            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Build Your 5G Network</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-sm text-white/60">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Telecom Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="p-6 md:p-8 bg-white/[0.02] border-2 border-blue-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-blue-400/40 transition-all duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-3">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                  {solution.description}
                </p>
                <div className="space-y-2">
                  {solution.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Deploy{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              5G?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">
            Build carrier-grade 5G networks that power the connected future.
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
