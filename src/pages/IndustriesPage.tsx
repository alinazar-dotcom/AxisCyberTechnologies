import { TrendingUp, Blocks, Activity, Shield, Zap, Radio, Package, Factory, FileText, Sparkles, ArrowRight, Globe, Rocket, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function IndustriesPage() {
  const industries = [
    {
      icon: TrendingUp,
      title: 'Financial Services & Capital Markets',
      description: 'High-frequency trading, risk analytics, payment infrastructure, and regulatory compliance automation.',
      link: '/industries/financial-services',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00FFFF]',
      projects: '85+',
      metric: '<1ms Latency'
    },
    {
      icon: Blocks,
      title: 'Blockchain & Distributed Ledger',
      description: 'Enterprise blockchain networks, tokenization platforms, smart contracts, and DeFi infrastructure.',
      link: '/industries/blockchain',
      color: '#DD00FF',
      gradient: 'from-[#DD00FF] to-[#B900FF]',
      projects: '62+',
      metric: '99.99% Uptime'
    },
    {
      icon: Activity,
      title: 'Healthcare & Life Sciences',
      description: 'Clinical trials management, genomics processing, medical AI, and telemedicine platforms.',
      link: '/industries/healthcare',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#DD00FF]',
      projects: '48+',
      metric: '100% HIPAA Compliant'
    },
    {
      icon: Shield,
      title: 'Defense & Aerospace',
      description: 'Encrypted communications, mission-critical systems, satellite processing, and cyber defense.',
      link: '/industries/defense-aerospace',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00E5FF]',
      projects: '31+',
      metric: 'Mil-Grade Security'
    },
    {
      icon: Zap,
      title: 'Energy & Utilities',
      description: 'Smart grid orchestration, renewable optimization, energy trading, and predictive maintenance.',
      link: '/industries/energy-utilities',
      color: '#FF7A00',
      gradient: 'from-[#FF7A00] to-[#FF0099]',
      projects: '42+',
      metric: '40% Energy Saved'
    },
    {
      icon: Radio,
      title: 'Telecommunications & 5G',
      description: 'Network orchestration, carrier infrastructure, edge computing, and SDN/NFV solutions.',
      link: '/industries/telecommunications',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#DD00FF]',
      projects: '56+',
      metric: '100% 5G Ready'
    },
    {
      icon: Package,
      title: 'Supply Chain & Logistics',
      description: 'Logistics optimization, warehouse automation, demand forecasting, and fleet management.',
      link: '/industries/supply-chain',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#FF7A00]',
      projects: '67+',
      metric: '35% Cost Reduced'
    },
    {
      icon: Factory,
      title: 'Manufacturing & Industry 4.0',
      description: 'Digital twin technology, predictive maintenance, robotics integration, and quality control AI.',
      link: '/industries/manufacturing',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00FF9D]',
      projects: '53+',
      metric: '60% Efficiency'
    },
    {
      icon: FileText,
      title: 'Insurance & Risk Management',
      description: 'Underwriting automation, claims AI, fraud detection, and actuarial analytics platforms.',
      link: '/industries/insurance',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00E5FF]',
      projects: '39+',
      metric: '80% Faster Claims'
    }
  ];

  const stats = [
    { value: '400+', label: 'Industry Projects', icon: Rocket, color: '#FF0099' },
    { value: '25+', label: 'Industries Served', icon: Globe, color: '#00FFFF' },
    { value: '100%', label: 'Client Satisfaction', icon: Target, color: '#DD00FF' },
    { value: '$500M+', label: 'Revenue Impact', icon: BarChart3, color: '#00FF9D' }
  ];

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#FF0099] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#DD00FF] rounded-full blur-[140px] opacity-15"></div>
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0099] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">
        
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
            <Globe className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">Industries We Serve</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Transforming <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Every Industry</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-4xl mx-auto">
            From finance to healthcare, manufacturing to telecommunications — we deliver mission-critical 
            software solutions that drive transformation across 25+ global industries with 100% success.
          </p>

          {/* Stats - Ultra-Premium Neon Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: `${stat.color}40`,
                    boxShadow: `0 0 40px ${stat.color}20`
                  }}
                >
                  {/* Animated glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${stat.color}30, transparent 70%)` }}
                  ></div>
                  
                  <div className="relative z-10">
                    <Icon 
                      className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" 
                      style={{ color: stat.color, filter: `drop-shadow(0 0 15px ${stat.color}80)` }}
                    />
                    <div 
                      className="text-3xl md:text-4xl font-black mb-2"
                      style={{ 
                        color: stat.color,
                        textShadow: `0 0 20px ${stat.color}80, 0 0 40px ${stat.color}40`
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-white/70 font-black">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industries Grid */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Industry <span className="bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,255,0.5)' }}>Expertise</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Specialized solutions for mission-critical industries worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={index}
                  to={industry.link}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${industry.color}30`,
                    boxShadow: `0 0 30px ${industry.color}15`
                  }}
                >
                  {/* Animated glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at top, ${industry.color}20, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto md:mx-0`}
                      style={{ boxShadow: `0 10px 40px ${industry.color}40` }}
                    >
                      <Icon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500" 
                      style={{ 
                        '--tw-gradient-from': industry.color,
                        '--tw-gradient-to': industry.color + '80'
                      } as any}
                    >
                      {industry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
                      {industry.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-white/10">
                      <div className="text-sm">
                        <div className="text-white/50 font-black mb-1">Projects</div>
                        <div className="font-black" style={{ color: industry.color, textShadow: `0 0 10px ${industry.color}80` }}>
                          {industry.projects}
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <div className="text-white/50 font-black mb-1">Success</div>
                        <div className="font-black" style={{ color: industry.color, textShadow: `0 0 10px ${industry.color}80` }}>
                          {industry.metric}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-base font-black group-hover:gap-3 transition-all duration-300"
                      style={{ color: industry.color }}
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA Section - Ultra-Premium */}
        <div className="relative p-12 md:p-16 lg:p-20 text-center bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Ready to Transform <span className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] bg-clip-text text-transparent">Your Industry?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let's build solutions that drive your industry forward with 100% success rate and measurable results.
            </p>
            <Link 
              to="/contact" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <Sparkles className="relative w-6 h-6 text-[#05060A]" />
              <span className="relative text-[#05060A] text-lg font-black tracking-wide">Start Your Project</span>
              <ArrowRight className="relative w-6 h-6 text-[#05060A] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
