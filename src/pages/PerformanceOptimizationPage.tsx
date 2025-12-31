import { Zap, Gauge, TrendingUp, Cpu, Sparkles, ArrowRight, CheckCircle2, Rocket, BarChart3, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PerformanceOptimizationPage() {
  const capabilities = [
    { icon: Zap, title: 'Frontend Performance', features: ['Code Splitting', 'Lazy Loading', 'Image Optimization', 'CDN Integration'] },
    { icon: Cpu, title: 'Backend Optimization', features: ['Query Optimization', 'Caching Strategies', 'Load Balancing', 'Database Tuning'] },
    { icon: BarChart3, title: 'Application Profiling', features: ['Performance Monitoring', 'Bottleneck Analysis', 'Memory Profiling', 'CPU Usage'] },
    { icon: TrendingUp, title: 'Scalability Planning', features: ['Auto-scaling', 'Horizontal Scaling', 'Vertical Scaling', 'Traffic Management'] },
    { icon: Gauge, title: 'Core Web Vitals', features: ['LCP Optimization', 'FID Improvement', 'CLS Reduction', 'SEO Enhancement'] },
    { icon: Clock, title: 'Real-Time Monitoring', features: ['APM Tools', 'Error Tracking', 'Alerting', 'Performance Dashboards'] }
  ];

  const metrics = [
    { value: '10x', label: 'Speed Improvement' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<100ms', label: 'Page Load Time' },
    { value: '100%', label: 'Optimization Success' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-full backdrop-blur-md mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Performance Optimization</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lightning-Fast{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Performance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto">
              Speed is everything. We optimize every layer of your application for maximum performance and user satisfaction.
            </p>
            <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
              <Rocket className="relative w-5 h-5 text-white" />
              <span className="relative text-white font-semibold">Optimize Your App</span>
              <ArrowRight className="relative w-5 h-5 text-white" />
            </Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{m.value}</div>
                  <div className="text-sm text-white/60">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Complete{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Optimization Stack
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div key={idx} className="group p-6 md:p-8 bg-white/[0.02] border-2 border-amber-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-amber-400/40 transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-400 group-hover:text-white mb-3">{cap.title}</h3>
                  <div className="space-y-2">
                    {cap.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Supercharge Your App?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">Let's make your application faster than ever before.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Start Optimization</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
