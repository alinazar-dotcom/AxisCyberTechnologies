import { Palette, Users, Figma as FigmaIcon, Sparkles, ArrowRight, CheckCircle2, Rocket, Eye, Layout, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProductUXPage() {
  const capabilities = [
    { icon: Eye, title: 'User Research', features: ['User Interviews', 'Usability Testing', 'Analytics', 'Persona Development'] },
    { icon: PenTool, title: 'UI/UX Design', features: ['Wireframing', 'Prototyping', 'Visual Design', 'Design Systems'] },
    { icon: Layout, title: 'Product Strategy', features: ['Market Research', 'Competitive Analysis', 'Feature Prioritization', 'Roadmapping'] },
    { icon: FigmaIcon, title: 'Design Tools', features: ['Figma', 'Sketch', 'Adobe XD', 'Principle'] },
    { icon: Users, title: 'User Testing', features: ['A/B Testing', 'Heat Maps', 'Session Recording', 'Feedback Loops'] },
    { icon: Palette, title: 'Brand Identity', features: ['Logo Design', 'Style Guides', 'Typography', 'Color Systems'] }
  ];

  const metrics = [
    { value: '500+', label: 'Products Designed' },
    { value: '4.8/5', label: 'User Satisfaction' },
    { value: '100%', label: 'Client Approval' },
    { value: '50%', label: 'Conversion Increase' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 rounded-full backdrop-blur-md mb-6">
              <Palette className="w-4 h-4 text-fuchsia-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Product & UX Design</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              User-Centered{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Design Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto">
              Create products users love with research-driven design and beautiful interfaces that convert.
            </p>
            <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
              <Rocket className="relative w-5 h-5 text-white" />
              <span className="relative text-white font-semibold">Start Design Project</span>
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
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Design Services
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div key={idx} className="group p-6 md:p-8 bg-white/[0.02] border-2 border-fuchsia-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-fuchsia-400/40 transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-fuchsia-400 group-hover:text-white mb-3">{cap.title}</h3>
                  <div className="space-y-2">
                    {cap.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
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
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Transform Your Product?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">Let's create experiences that delight users and drive business results.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Start Design Sprint</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
