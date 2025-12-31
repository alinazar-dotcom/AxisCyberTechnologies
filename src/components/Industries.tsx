import { TrendingUp, Blocks, Activity, Shield, Zap, Radio, Package, Factory, FileText, Sparkles, Building2, ArrowUpRight, Cpu, Check, Star, Globe, Lock, Users, BarChart3, Loader2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const iconMap: { [key: string]: any } = {
  TrendingUp,
  Blocks,
  Activity,
  Shield,
  Zap,
  Radio,
  Package,
  Factory,
  FileText,
  Sparkles,
  Building2,
  Cpu,
  Check,
  Star,
  Globe,
  Lock,
  Users,
  BarChart3,
};



export function Industries() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fallbackIndustries = [
    {
      title: 'Financial Services & Capital Markets',
      slug: 'financial-services',
      description: 'High-frequency trading systems, algorithmic execution engines, risk analytics platforms, regulatory compliance automation, and real-time payment infrastructure.',
      icon: 'TrendingUp',
      gradient: 'from-emerald-500 to-teal-500',
      projects: '85+',
      growth: '+156%',
      highlight: 'HFT & Trading',
      clients: '12 Fortune 500',
      metric: '< 1ms Latency',
      tags: ['Trading', 'Risk Analytics', 'Compliance', 'Payments'],
      link: '/industries/financial-services'
    },
    {
      title: 'Blockchain & Distributed Ledger',
      slug: 'blockchain',
      description: 'Enterprise blockchain networks, tokenization platforms, digital asset custody solutions, smart contract security auditing, and DeFi infrastructure.',
      icon: 'Blocks',
      gradient: 'from-violet-500 to-purple-500',
      projects: '62+',
      growth: '+240%',
      highlight: 'DeFi & Web3',
      clients: '40+ Protocols',
      metric: '99.99% Uptime',
      tags: ['Smart Contracts', 'DeFi', 'NFTs', 'Tokenization'],
      link: '/industries/blockchain'
    },
    {
      title: 'Healthcare & Life Sciences',
      slug: 'healthcare',
      description: 'Clinical trials management systems, genomics data processing, medical device integration, pharmaceutical supply chain, and diagnostic AI models.',
      icon: 'Activity',
      gradient: 'from-rose-500 to-pink-500',
      projects: '48+',
      growth: '+128%',
      highlight: 'Medical AI',
      clients: '25 Hospitals',
      metric: 'HIPAA Compliant',
      tags: ['Clinical AI', 'Genomics', 'Telemedicine', 'Diagnostics'],
      link: '/industries/healthcare'
    },
    {
      title: 'Defense & Aerospace',
      slug: 'defense-aerospace',
      description: 'Encrypted communication systems, mission-critical infrastructure, satellite data processing, cybersecurity defense platforms, and tactical simulation.',
      icon: 'Shield',
      gradient: 'from-slate-500 to-gray-500',
      projects: '31+',
      growth: '+94%',
      highlight: 'Secure Systems',
      clients: '8 Gov Agencies',
      metric: 'Mil-Grade Security',
      tags: ['Encryption', 'Satellite', 'Cyber Defense', 'Simulation'],
      link: '/industries/defense-aerospace'
    },
    {
      title: 'Energy & Utilities',
      slug: 'energy-utilities',
      description: 'Smart grid orchestration, renewable energy optimization, power distribution networks, energy trading platforms, and predictive maintenance AI.',
      icon: 'Zap',
      gradient: 'from-amber-500 to-yellow-500',
      projects: '42+',
      growth: '+167%',
      highlight: 'Smart Grid',
      clients: '15 Utilities',
      metric: '40% Energy Saved',
      tags: ['Smart Grid', 'Renewables', 'Trading', 'Maintenance'],
      link: '/industries/energy-utilities'
    },
    {
      title: 'Telecommunications & 5G',
      slug: 'telecommunications',
      description: 'Network orchestration platforms, carrier-grade infrastructure, edge computing systems, spectrum management, and SDN/NFV solutions.',
      icon: 'Radio',
      gradient: 'from-blue-500 to-indigo-500',
      projects: '56+',
      growth: '+189%',
      highlight: '5G & Edge',
      clients: '18 Carriers',
      metric: '5G Ready',
      tags: ['5G Networks', 'Edge Computing', 'SDN', 'NFV'],
      link: '/industries/telecommunications'
    },
    {
      title: 'Supply Chain & Logistics',
      slug: 'supply-chain',
      description: 'Multi-modal logistics optimization, warehouse automation systems, demand forecasting AI, fleet management platforms, and customs compliance.',
      icon: 'Package',
      gradient: 'from-orange-500 to-red-500',
      projects: '67+',
      growth: '+145%',
      highlight: 'AI Optimization',
      clients: '30+ Logistics',
      metric: '35% Cost Reduced',
      tags: ['Logistics AI', 'Automation', 'Forecasting', 'Fleet'],
      link: '/industries/supply-chain'
    },
    {
      title: 'Manufacturing & Industry 4.0',
      slug: 'manufacturing',
      description: 'Digital twin technology, predictive maintenance systems, robotics integration platforms, quality control AI, and production optimization.',
      icon: 'Factory',
      gradient: 'from-cyan-500 to-blue-500',
      projects: '53+',
      growth: '+178%',
      highlight: 'Digital Twin',
      clients: '22 Manufacturers',
      metric: '60% Efficiency',
      tags: ['Digital Twin', 'Robotics', 'Quality AI', 'IoT'],
      link: '/industries/manufacturing'
    },
    {
      title: 'Insurance & Risk Management',
      slug: 'insurance',
      description: 'Underwriting automation, claims processing AI, fraud detection systems, catastrophe modeling, and actuarial analytics platforms.',
      icon: 'FileText',
      gradient: 'from-teal-500 to-emerald-500',
      projects: '39+',
      growth: '+112%',
      highlight: 'AI Underwriting',
      clients: '14 Insurers',
      metric: '80% Faster Claims',
      tags: ['Underwriting', 'Fraud Detection', 'Analytics', 'Modeling'],
      link: '/industries/insurance'
    }
  ];

  const fetchIndustries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('industries')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const transformedData = data.map((industry) => ({
          ...industry,
          icon: iconMap[industry.icon] || Building2,
          link: `/industries/${industry.slug}`
        }));
        setIndustries(transformedData);
      } else {
        // Fallback if no data returned
        const transformedFallback = fallbackIndustries.map(ind => ({
          ...ind,
          icon: iconMap[ind.icon] || Building2
        }));
        setIndustries(transformedFallback);
      }
    } catch (err: any) {
      console.error('Error fetching industries, using fallback:', err);
      // Use fallback on error
      const transformedFallback = fallbackIndustries.map(ind => ({
        ...ind,
        icon: iconMap[ind.icon] || Building2
      }));
      setIndustries(transformedFallback);
      // We don't set the error state here so the UI still renders the fallback
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 lg:py-[120px] bg-[#0D0D1A] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin relative z-10" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-20 lg:py-[120px] bg-[#0D0D1A] flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white/[0.02] border border-red-500/30 rounded-2xl backdrop-blur-xl max-w-lg">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-white/60 mb-6 text-sm">{error}</p>
          <button
            onClick={() => fetchIndustries()}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" className="py-12 md:py-20 lg:py-[120px] relative overflow-hidden bg-gradient-to-b from-[#0D0D1A] via-[#0A0A14] to-[#0D0D1A]">
      {/* Enhanced animated background with moving gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500/10 via-blue-500/10 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-amber-500/8 via-orange-500/8 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced grid pattern with diagonal lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L60 60M60 0L0 60' stroke='%2300E5FF' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* PREMIUM HEADER */}
        <div className="text-center space-y-5 md:space-y-7 mb-10 md:mb-14 lg:mb-20">
          {/* PREMIUM ANIMATED BADGE */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-violet-500/15 border-2 border-cyan-500/40 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-700 group cursor-pointer relative overflow-hidden backdrop-blur-md">
            {/* Triple shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-100 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)',
              backgroundSize: '200% 100%',
              animation: 'borderFlow 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '2px',
            }}></div>

            <Building2 className="w-4 h-4 text-cyan-400 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgb(34 211 238))' }} />
            <span className="text-white text-xs md:text-sm font-black tracking-[0.2em] uppercase relative z-10" style={{ textShadow: '0 0 20px rgba(34,211,238,0.6)' }}>
              💼 ENTERPRISE SOLUTIONS
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgb(16 185 129))', animationDelay: '0.3s' }} />
          </div>

          {/* PREMIUM GRADIENT TITLE */}
          <h2 className="relative inline-block">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent" style={{
              backgroundSize: '200% auto',
              animation: 'gradientShift 5s ease-in-out infinite'
            }}>
              Mission-Critical Systems Across Industries
            </span>

            {/* Enhanced decorative underline with particles */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
              <div className="w-32 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
              <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
            </div>
          </h2>

          <p className="max-w-3xl mx-auto text-sm md:text-base lg:text-lg text-white/85 leading-relaxed mt-8">
            Delivering <span className="text-emerald-400 font-semibold">enterprise-grade solutions</span> for the world's most demanding sectors. From <span className="text-cyan-400 font-semibold">high-frequency trading</span> to <span className="text-violet-400 font-semibold">mission-critical infrastructure</span>.
          </p>
        </div>

        {/* PREMIUM INDUSTRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={index}
                to={industry.link}
                className="group relative block"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Enhanced outer glow with gradient */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 rounded-2xl`}></div>

                <div className="relative h-full p-6 md:p-7 rounded-2xl border-2 border-white/[0.08] bg-gradient-to-br from-[#0D0D1A]/98 via-[#0A0A14]/95 to-[#0D0D1A]/98 backdrop-blur-xl transition-all duration-700 hover:translate-y-[-6px] overflow-hidden group-hover:border-white/20 hover:shadow-2xl">
                  {/* Animated gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`}></div>

                  {/* Multiple shimmer sweep effects */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-150 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"></div>

                  {/* Corner accent glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none blur-3xl`}></div>

                  {/* Animated corner lines - ALL FOUR CORNERS */}
                  <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                    <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100`}></div>
                    <div className={`absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-100 origin-top scale-y-0 group-hover:scale-y-100`}></div>
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
                    <div className={`absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-100 origin-right scale-x-0 group-hover:scale-x-100`}></div>
                    <div className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-200 origin-top scale-y-0 group-hover:scale-y-100`}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
                    <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-200 origin-left scale-x-0 group-hover:scale-x-100`}></div>
                    <div className={`absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-300 origin-bottom scale-y-0 group-hover:scale-y-100`}></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                    <div className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-300 origin-right scale-x-0 group-hover:scale-x-100`}></div>
                    <div className={`absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t ${industry.gradient} opacity-0 group-hover:opacity-70 transition-all duration-700 delay-400 origin-bottom scale-y-0 group-hover:scale-y-100`}></div>
                  </div>

                  <div className="flex flex-col h-full relative z-10">
                    {/* Top Content Wrapper to allow bottom alignment */}
                    <div className="flex-grow space-y-4 md:space-y-5 mb-6">
                      {/* Enhanced Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        {/* Premium Icon Container */}
                        <div
                          className={`relative w-16 h-16 md:w-18 md:h-18 rounded-xl border-2 bg-gradient-to-br ${industry.gradient} bg-opacity-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 overflow-hidden`}
                          style={{
                            borderColor: 'rgba(255,255,255,0.1)',
                            boxShadow: isHovered ? '0 0 30px currentColor' : '0 0 0px transparent'
                          }}
                        >
                          {/* Layered rotating backgrounds */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-20 group-hover:opacity-100 transition-all duration-700`}></div>

                          {/* Rotating border effect */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700`} style={{
                            background: `conic-gradient(from 0deg, transparent, currentColor, transparent)`,
                            animation: 'rotateBorder 3s linear infinite',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            padding: '2px',
                          }}></div>

                          {/* Secondary rotating ring */}
                          <div className={`absolute inset-[-4px] opacity-0 group-hover:opacity-30 transition-opacity duration-700`} style={{
                            background: `conic-gradient(from 180deg, transparent, currentColor, transparent)`,
                            animation: 'rotateBorderReverse 4s linear infinite',
                            borderRadius: '0.75rem'
                          }}></div>

                          <Icon
                            className="w-8 h-8 md:w-9 md:h-9 text-white relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                          />

                          {/* Multiple pulsing rings */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${industry.gradient} animate-ping opacity-0 group-hover:opacity-30`} style={{ animationDuration: '2s' }}></div>
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${industry.gradient} animate-ping opacity-0 group-hover:opacity-20`} style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                        </div>

                        {/* Enhanced Stats Column */}
                        <div className="flex flex-col items-end gap-2">
                          {/* Project Badge with tooltip */}
                          <div className="relative group/badge">
                            <div className={`px-3 py-1.5 bg-gradient-to-r ${industry.gradient} bg-opacity-10 border border-white/10 rounded-lg backdrop-blur-sm group-hover:border-white/20 transition-all duration-500 hover:scale-105`}>
                              <div className="flex items-center gap-2">
                                <Cpu className="w-3.5 h-3.5 text-white/70" />
                                <span className="text-xs font-bold text-white/90">{industry.projects}</span>
                              </div>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#0A0A14]/98 border border-white/20 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 pointer-events-none z-20 backdrop-blur-md shadow-xl">
                              <div className="font-semibold text-emerald-400">Projects Delivered</div>
                              <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/20"></div>
                            </div>
                          </div>

                          {/* Highlight badge */}
                          <div className={`px-2.5 py-1 bg-gradient-to-r ${industry.gradient} rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-lg`} style={{
                            boxShadow: isHovered ? '0 0 15px currentColor' : 'none'
                          }}>
                            <span className="text-[10px] font-black text-white uppercase tracking-wide">{industry.highlight}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title with gradient on hover */}
                      <h4
                        className={`text-xl md:text-2xl text-white font-bold transition-all duration-500 leading-tight ${isHovered ? 'bg-gradient-to-r bg-clip-text text-transparent' : ''
                          } ${industry.gradient}`}
                      >
                        {industry.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                        {industry.description}
                      </p>

                      {/* Enhanced Tags Row */}
                      <div className="flex flex-wrap gap-2">
                        {industry.tags.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className={`px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-semibold text-white/60 hover:bg-gradient-to-r hover:text-white hover:border-white/30 transition-all duration-300 ${industry.gradient}`}
                            style={{
                              transitionDelay: `${tagIndex * 50}ms`
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Content - Aligned across cards */}
                    <div className="mt-auto space-y-4">
                      {/* Enhanced Stats Row */}
                      <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/5 group-hover:border-white/10 transition-colors duration-500">
                        <div className="flex items-center gap-2 text-xs text-white/60 group-hover:text-white/80 transition-colors duration-500">
                          <Users className="w-3.5 h-3.5" />
                          <span className="font-semibold">{industry.clients}</span>
                        </div>

                        <div className={`px-2.5 py-1 bg-gradient-to-r ${industry.gradient} bg-opacity-10 border border-white/10 rounded-md text-[10px] font-bold text-white/90 group-hover:border-white/30 transition-all duration-500`}>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3" />
                            <span>{industry.metric}</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced footer */}
                      <div className="pt-4 flex items-center justify-between border-t border-white/5 group-hover:border-white/10 transition-colors duration-500">
                        <div className="flex items-center gap-3">
                          {/* Animated progress line */}
                          <div className="relative h-[3px] w-20 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-full transition-all duration-1000 origin-left scale-x-0 group-hover:scale-x-100`}
                              style={{
                                boxShadow: isHovered ? '0 0 10px currentColor' : 'none'
                              }}
                            ></div>

                            {/* Traveling light dot */}
                            <div className={`absolute top-0 left-0 h-full w-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{
                              animation: isHovered ? 'travelDot 2s ease-in-out infinite' : 'none',
                              boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                            }}></div>
                          </div>

                          {/* Explore button */}
                          <div className="flex items-center gap-1 text-white/50 group-hover:text-white transition-colors duration-500 cursor-pointer">
                            <span className="text-xs font-semibold">Explore</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>

                        {/* Growth indicator */}
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg group-hover:border-emerald-500/40 transition-all duration-500`}>
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-400">{industry.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator dots - all corners */}
                  <div className={`absolute bottom-6 left-6 w-2 h-2 rounded-full bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg`} style={{
                    boxShadow: isHovered ? '0 0 15px currentColor' : 'none',
                    animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none'
                  }}></div>
                  <div className={`absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100`} style={{
                    animation: isHovered ? 'pulse 2s ease-in-out infinite 0.3s' : 'none'
                  }}></div>
                  <div className={`absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200`} style={{
                    animation: isHovered ? 'pulse 2s ease-in-out infinite 0.6s' : 'none'
                  }}></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ENHANCED CTA SECTION */}
        <div className="mt-12 md:mt-16 lg:mt-20 flex flex-col items-center gap-6 md:gap-8 text-center">
          {/* Info box */}
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] border-2 border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
            <p className="text-white/90 text-sm md:text-base">
              <span className="text-cyan-400 font-semibold">Don't see your industry?</span> We rapidly adapt to <span className="text-emerald-400 font-semibold">new domains</span>, <span className="text-violet-400 font-semibold">emerging technologies</span>, and <span className="text-amber-400 font-semibold">complex challenges</span>.
            </p>
          </div>

          {/* Professional CTA Button */}
          <button className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0">
            {/* Shine effect - only on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

            {/* Content */}
            <Zap className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-semibold">Schedule Enterprise Consultation</span>
            <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </button>

          {/* Enhanced trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4">
            <div className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors duration-300 cursor-pointer group/trust">
              <Shield className="w-4 h-4 text-emerald-400 group-hover/trust:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm font-semibold">SOC 2 Compliant</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors duration-300 cursor-pointer group/trust">
              <Lock className="w-4 h-4 text-cyan-400 group-hover/trust:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm font-semibold">ISO 27001 Certified</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/60 hover:text-violet-400 transition-colors duration-300 cursor-pointer group/trust">
              <Activity className="w-4 h-4 text-violet-400 group-hover/trust:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm font-semibold">24/7 Support</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors duration-300 cursor-pointer group/trust">
              <Globe className="w-4 h-4 text-amber-400 group-hover/trust:scale-110 transition-transform duration-300" />
              <span className="text-xs md:text-sm font-semibold">Global Presence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced custom animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes rotateBorderReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes travelDot {
          0% { left: 0%; }
          50% { left: 90%; }
          100% { left: 0%; }
        }
      `}</style>
    </section>
  );
}