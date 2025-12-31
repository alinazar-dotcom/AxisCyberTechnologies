import { ArrowRight, Sparkles, TrendingUp, Zap, Loader2, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';



export function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fallbackCaseStudies = [
    {
      title: 'Global FinTech Transformation',
      summary: 'Re-engineering a legacy banking platform into a high-performance, AI-driven financial ecosystem.',
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      technologies: ['React', 'Node.js', 'AWS', 'TensorFlow'],
      services: ['AI & Machine Learning', 'Cloud & DevOps'],
      success_metrics: { 'Revenue Growth': '240%' },
      slug: 'fintech-transformation'
    },
    {
      title: 'Next-Gen HealthTech Platform',
      summary: 'Building a HIPAA-compliant telemedicine platform with real-time diagnostic capabilities.',
      featured_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      technologies: ['Next.js', 'Python', 'Azure', 'WebRTC'],
      services: ['Web Development', 'Healthcare AI'],
      success_metrics: { 'User Engagement': '180%' },
      slug: 'healthtech-platform'
    },
    {
      title: 'Enterprise Supply Chain AI',
      summary: 'Optimizing global logistics with a predictive AI engine and real-time tracking.',
      featured_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      technologies: ['Flutter', 'Go', 'GCP', 'Kafka'],
      services: ['Data Engineering', 'Mobile App Development'],
      success_metrics: { 'Cost Reduction': '35%' },
      slug: 'supply-chain-ai'
    }
  ];

  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      let studiesToTransform = data;

      if (!data || data.length === 0) {
        studiesToTransform = fallbackCaseStudies;
      }

      const transformedData = studiesToTransform.map((study, index) => {
        // Map colors based on index for variety
        const colors = ['#FF0099', '#00FFFF', '#DD00FF'];
        const color = colors[index % 3];

        // Extract a primary metric from success_metrics JSONB
        let metric = 'Success';
        if (study.success_metrics) {
          const keys = Object.keys(study.success_metrics);
          if (keys.length > 0) {
            metric = study.success_metrics[keys[0]];
          }
        }

        return {
          title: study.title,
          description: study.summary,
          image: study.featured_image || (study.gallery_images && study.gallery_images.length > 0 ? study.gallery_images[0] : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'),
          tags: [...(study.technologies || []), ...(study.services || [])].slice(0, 3),
          metrics: metric,
          color: color,
          link: `/case-studies/${study.slug}`
        };
      });
      setCaseStudies(transformedData);
    } catch (err: any) {
      console.error('Error fetching case studies, using fallback:', err);

      const transformedFallback = fallbackCaseStudies.map((study, index) => {
        const colors = ['#FF0099', '#00FFFF', '#DD00FF'];
        const color = colors[index % 3];
        const keys = Object.keys(study.success_metrics);
        const metric = study.success_metrics[keys[0]];

        return {
          title: study.title,
          description: study.summary,
          image: study.featured_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
          tags: [...(study.technologies || []), ...(study.services || [])].slice(0, 3),
          metrics: metric,
          color: color,
          link: `/case-studies/${study.slug}`
        };
      });

      setCaseStudies(transformedFallback);
      // Don't set error state to keep UI functional
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin relative z-10" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white/[0.02] border border-red-500/30 rounded-2xl backdrop-blur-xl max-w-lg">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-white/60 mb-6 text-sm">{error}</p>
          <button
            onClick={() => fetchCaseStudies()}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }
  return (
    <section id="case-studies" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14]">
      {/* ULTRA NEON CYBERPUNK BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,153,0.20),transparent_50%)] animate-pulse pointer-events-none z-0" style={{ animationDuration: '9s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,255,255,0.20),transparent_50%)] animate-pulse pointer-events-none z-0" style={{ animationDuration: '11s', animationDelay: '1s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(221,0,255,0.18),transparent_50%)] animate-pulse pointer-events-none z-0" style={{ animationDuration: '13s', animationDelay: '2s' }}></div>

      {/* Diagonal grid pattern */}
      <div className="absolute inset-0 opacity-[0.09] pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L80 80M80 0L0 80' stroke='%23FF0099' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
      }}></div>

      {/* Animated neon grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.07)_2px,transparent_2px),linear-gradient(90deg,rgba(221,0,255,0.07)_2px,transparent_2px)] bg-[size:80px_80px] opacity-70 pointer-events-none z-0" style={{
        animation: 'gridPulse 5s ease-in-out infinite',
      }}></div>

      {/* Horizontal scanning lines */}
      <div className="absolute inset-0 opacity-60 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#FF0099] to-transparent shadow-[0_0_25px_rgba(255,0,153,1)]" style={{ animation: 'scanDown 14s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent shadow-[0_0_25px_rgba(0,255,255,1)]" style={{ animation: 'scanUp 18s ease-in-out infinite' }}></div>
      </div>

      {/* Floating neon particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: `${Math.random() * 6 + 3}px`,
            height: `${Math.random() * 6 + 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? 'rgba(255,0,153,0.95)' : i % 3 === 1 ? 'rgba(0,255,255,0.95)' : 'rgba(221,0,255,0.95)',
            boxShadow: `0 0 ${Math.random() * 30 + 20}px ${i % 3 === 0 ? 'rgba(255,0,153,1)' : i % 3 === 1 ? 'rgba(0,255,255,1)' : 'rgba(221,0,255,1)'}`,
            animation: `floatParticle ${Math.random() * 25 + 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.7 + 0.5,
          }}
        ></div>
      ))}

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-20">
        {/* ULTRA NEON HEADER */}
        <div className="text-center space-y-5 md:space-y-6 mb-12 md:mb-16 lg:mb-20">
          {/* NEON BADGE */}
          <div className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-[#00FFFF]/25 via-[#DD00FF]/25 to-[#FF0099]/25 border-3 border-[#00FFFF]/80 rounded-full backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,255,0.8),0_0_30px_rgba(221,0,255,0.6),0_0_15px_rgba(255,0,153,0.4)] hover:shadow-[0_0_70px_rgba(0,255,255,1),0_0_45px_rgba(221,0,255,0.8),0_0_25px_rgba(255,0,153,0.6)] transition-all duration-700 group cursor-pointer relative overflow-hidden" style={{ borderWidth: '3px' }}>
            {/* Triple shimmer effects */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-100 bg-gradient-to-r from-transparent via-[#FF0099]/35 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1400 delay-200 bg-gradient-to-r from-transparent via-[#00FFFF]/35 to-transparent pointer-events-none"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(90deg, #00FFFF, #DD00FF, #FF0099, #00FFFF)',
              backgroundSize: '300% 100%',
              animation: 'borderFlow 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '3px',
            }}></div>

            <div className="relative flex items-center gap-2.5 z-10">
              <TrendingUp className="w-4 h-4 text-[#00FFFF] animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,255,1))' }} />
              <span className="text-white text-xs md:text-sm font-black tracking-widest uppercase" style={{ textShadow: '0 0 15px rgba(0,255,255,0.9), 0 0 8px rgba(221,0,255,0.7)' }}>💎 SUCCESS STORIES</span>
              <Sparkles className="w-4 h-4 text-[#FF0099] animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(255,0,153,1))', animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* ULTRA NEON TITLE */}
          <h2 className="text-white relative" style={{ textShadow: '0 0 30px rgba(0,255,255,0.6), 0 0 20px rgba(255,0,153,0.5), 0 0 12px rgba(221,0,255,0.4)' }}>
            Proven Results, Real Impact

            {/* Decorative elements */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-none">
              <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#00FFFF] to-[#DD00FF] rounded-full shadow-[0_0_15px_rgba(0,255,255,1)]"></div>
              <div className="w-4 h-4 rounded-full bg-[#DD00FF] animate-pulse shadow-[0_0_20px_rgba(221,0,255,1)]"></div>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#DD00FF] via-[#FF0099] to-transparent rounded-full shadow-[0_0_15px_rgba(255,0,153,1)]"></div>
            </div>
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-white/90 leading-relaxed mt-8">
            From <span className="text-[#00FFFF] font-bold" style={{ textShadow: '0 0 12px rgba(0,255,255,1)' }}>innovative startups</span> to <span className="text-[#FF0099] font-bold" style={{ textShadow: '0 0 12px rgba(255,0,153,1)' }}>enterprise giants</span> — explore the transformative
            solutions we've delivered across <span className="text-[#DD00FF] font-bold" style={{ textShadow: '0 0 12px rgba(221,0,255,1)' }}>global industries</span>.
          </p>
        </div>

        {/* ULTRA NEON CASE STUDY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((study, index) => {
            const neonColor = study.color;
            const neonRgba = neonColor === '#FF0099' ? 'rgba(255,0,153,1)' : neonColor === '#00FFFF' ? 'rgba(0,255,255,1)' : 'rgba(221,0,255,1)';
            const accentColor = index % 3 === 0 ? '#DD00FF' : index % 3 === 1 ? '#FF0099' : '#00FFFF';

            return (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border-3 backdrop-blur-xl transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer"
                style={{
                  borderWidth: '3px',
                  borderColor: `${neonColor}60`,
                  background: `linear-gradient(to bottom, ${neonColor}15, ${neonColor}05, transparent)`,
                  boxShadow: `0 0 40px ${neonRgba.replace('1)', '0.35)')}, 0 0 20px ${neonRgba.replace('1)', '0.25)')}, inset 0 0 25px ${neonRgba.replace('1)', '0.08)')}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 60px ${neonRgba.replace('1)', '0.6)')}, 0 0 35px ${neonRgba.replace('1)', '0.45)')}, 0 0 20px ${neonRgba.replace('1)', '0.3)')}, inset 0 0 40px ${neonRgba.replace('1)', '0.15)')}`;
                  e.currentTarget.style.borderColor = `${neonColor}90`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${neonRgba.replace('1)', '0.35)')}, 0 0 20px ${neonRgba.replace('1)', '0.25)')}, inset 0 0 25px ${neonRgba.replace('1)', '0.08)')}`;
                  e.currentTarget.style.borderColor = `${neonColor}60`;
                }}
              >
                {/* Outer glow halo */}
                <div
                  className="absolute -inset-1.5 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${neonColor}40, ${accentColor}30, ${neonColor}40)`
                  }}
                ></div>

                {/* Animated border flow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" style={{
                  background: `linear-gradient(90deg, ${neonColor}, ${accentColor}, ${neonColor})`,
                  backgroundSize: '300% 100%',
                  animation: 'borderFlow 4s linear infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '3px',
                }}></div>

                {/* NEON IMAGE SECTION */}
                <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115"
                    style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                  />

                  {/* Triple gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/60 to-transparent opacity-90"></div>
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(to bottom right, ${neonColor}40, transparent, ${accentColor}30)`
                    }}
                  ></div>

                  {/* Top-right metrics badge */}
                  <div
                    className="absolute top-4 right-4 px-4 py-2 border-2 rounded-xl backdrop-blur-xl font-black text-xs tracking-wide shadow-lg group-hover:scale-110 transition-transform duration-500"
                    style={{
                      borderColor: neonColor,
                      background: `linear-gradient(to bottom right, ${neonColor}30, ${neonColor}15)`,
                      color: '#FFFFFF',
                      textShadow: `0 0 10px ${neonRgba}`,
                      boxShadow: `0 0 20px ${neonRgba.replace('1)', '0.5)')}, inset 0 0 12px ${neonRgba.replace('1)', '0.1)')}`
                    }}
                  >
                    {study.metrics}
                  </div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
                </div>

                {/* NEON CONTENT SECTION */}
                <div className="relative flex flex-col h-[calc(100%-12rem)] md:h-[calc(100%-14rem)] lg:h-[calc(100%-16rem)] p-6 md:p-7 bg-gradient-to-b from-[#0D0D1A]/95 via-[#0A0A14]/90 to-[#0D0D1A]/95 backdrop-blur-xl">
                  {/* Inner grid pattern */}
                  <div
                    className="absolute inset-0 bg-[size:30px_30px] opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(${neonColor}15 1px, transparent 1px), linear-gradient(90deg, ${neonColor}15 1px, transparent 1px)`
                    }}
                  ></div>

                  <div className="flex flex-col h-full space-y-4 relative z-10">
                    {/* Top part with grow */}
                    <div className="flex-grow space-y-4">
                      {/* NEON TAG PILLS */}
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, i) => {
                          const tagColor = i % 3 === 0 ? neonColor : i % 3 === 1 ? accentColor : (neonColor === '#FF0099' ? '#00FFFF' : '#FF0099');
                          const tagRgba = tagColor === '#FF0099' ? 'rgba(255,0,153,1)' : tagColor === '#00FFFF' ? 'rgba(0,255,255,1)' : 'rgba(221,0,255,1)';

                          return (
                            <span
                              key={i}
                              className="px-3 py-1.5 border-2 rounded-lg text-xs font-bold backdrop-blur-sm transition-all duration-500 hover:scale-110 cursor-pointer"
                              style={{
                                borderColor: `${tagColor}70`,
                                background: `linear-gradient(to bottom right, ${tagColor}25, ${tagColor}12)`,
                                color: '#FFFFFF',
                                textShadow: `0 0 8px ${tagRgba.replace('1)', '0.6)')}`,
                                boxShadow: `0 0 15px ${tagRgba.replace('1)', '0.3)')}, inset 0 0 10px ${tagRgba.replace('1)', '0.08)')}`,
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                      {/* NEON TITLE */}
                      <h4
                        className="text-xl md:text-2xl font-black text-white group-hover:translate-x-1 transition-transform duration-500"
                        style={{
                          textShadow: `0 0 20px ${neonRgba.replace('1)', '0.6)')}, 0 0 10px ${neonRgba.replace('1)', '0.4)')}`
                        }}
                      >
                        {study.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm md:text-base text-white/85 line-clamp-3 leading-relaxed">
                        {study.description}
                      </p>
                    </div>

                    {/* ULTRA NEON CTA - Pushed to bottom */}
                    <div className="mt-auto pt-4">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-500 font-bold text-sm md:text-base"
                        style={{
                          color: neonColor,
                          textShadow: `0 0 12px ${neonRgba.replace('1)', '0.8)')}`
                        }}
                      >
                        <span>View Case Study</span>
                        <ArrowRight
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500"
                          style={{ filter: `drop-shadow(0 0 6px ${neonRgba})` }}
                        />
                      </a>
                    </div>
                  </div>

                  {/* Bottom corner accent */}
                  <div className="absolute bottom-4 right-4 flex gap-1.5 pointer-events-none">
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{
                        background: neonColor,
                        boxShadow: `0 0 10px ${neonRgba}`
                      }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{
                        background: accentColor,
                        boxShadow: `0 0 10px ${accentColor === '#FF0099' ? 'rgba(255,0,153,1)' : accentColor === '#00FFFF' ? 'rgba(0,255,255,1)' : 'rgba(221,0,255,1)'}`,
                        animationDelay: '0.3s'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional CTA Button */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <button className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--accent-magenta)] to-[var(--accent-cyan)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(185,0,255,0.3)] hover:-translate-y-1 active:translate-y-0">
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Content */}
            <Zap className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-semibold">View All Case Studies</span>
            <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </section>
  );
}
