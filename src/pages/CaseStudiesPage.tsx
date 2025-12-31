import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Clock, Award, CheckCircle, ExternalLink, Filter, Search, ChevronRight, Sparkles, Target, Zap, DollarSign, BarChart3, Shield, Rocket, Globe, Brain, Blocks, Code, Smartphone, Cloud, Gamepad2, Star, Quote, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [industries, setIndustries] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const { data, error: fetchError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        // Extract unique categories and industries
        const allServices = data.flatMap(item => item.services || []);
        const uniqueCategories = Array.from(new Set(allServices.filter(item => item && item.trim() !== '')));

        const uniqueIndustries = Array.from(new Set(data
          .map(item => item.client_industry)
          .filter(item => item && item.trim() !== '')
        ));

        setCategories(['All', ...uniqueCategories]);
        setIndustries(['All', ...uniqueIndustries]);

        // Transform data to match UI expectations
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          client: item.client_name,
          industry: item.client_industry,
          category: item.project_type || (item.services && item.services[0]) || 'Uncategorized',
          services: item.services || [],
          description: item.summary,
          challenge: item.challenge,
          solution: item.solution,
          results: Array.isArray(item.success_metrics) ? item.success_metrics :
            (typeof item.success_metrics === 'object' && item.success_metrics !== null ?
              Object.entries(item.success_metrics).map(([label, metric]) => ({
                metric: String(metric),
                label: label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
              })) : []),
          technologies: item.technologies || [],
          duration: item.project_duration || 'N/A',
          teamSize: item.team_size || 'N/A',
          testimonial: {
            quote: item.testimonial || 'Excellent work by the Axis Cyber team.',
            author: item.testimonial_author || 'Client Executive',
            company: item.client_name,
            avatar: item.client_logo
          },
          impact: item.results ? item.results.split('\n').filter((l: string) => l.trim()) : [],
          featured: item.is_featured
        }));

        setCaseStudies(transformedData);
      }
    } catch (err: any) {
      console.error('Error fetching case studies:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCaseStudies = caseStudies.filter(study => {
    const categoryMatch = selectedCategory === 'All' ||
      (study.services && study.services.includes(selectedCategory)) ||
      study.category === selectedCategory;
    const industryMatch = selectedIndustry === 'All' || study.industry === selectedIndustry;
    return categoryMatch && industryMatch;
  });

  const featuredStudies = filteredCaseStudies.filter(study => study.featured);
  const regularStudies = filteredCaseStudies.filter(study => !study.featured);

  const stats = [
    { value: '100+', label: 'Successful Projects', icon: Rocket, color: '#FF0099' },
    { value: '100%', label: 'Client Satisfaction', icon: Star, color: '#00FFFF' },
    { value: '$500M+', label: 'Client Revenue Impact', icon: DollarSign, color: '#DD00FF' },
    { value: '25+', label: 'Industries Served', icon: Globe, color: '#00FF9D' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#FF0099] animate-spin mx-auto mb-4" />
          <p className="text-white/60 font-black tracking-widest uppercase">Loading Success Stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-black/50 border-2 border-red-500/30 rounded-3xl text-center backdrop-blur-xl">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4">Failed to Load Case Studies</h2>
          <p className="text-white/60 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-black"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
            <Award className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">Case Studies</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Real Results, <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Real Impact</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-4xl mx-auto">
            Explore how we've helped leading organizations across industries transform their businesses
            with innovative software solutions delivering 100% measurable results.
          </p>
        </div>

        {/* Stats - Ultra-Premium Neon Cards */}
        <div className="mb-20 md:mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
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

        {/* Filters - Ultra-Premium */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="p-8 md:p-10 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-6 h-6 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
              <span className="text-white text-xl font-black">Filter Case Studies</span>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="text-sm text-white/60 mb-3 block font-black tracking-wide">BY SERVICE</label>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-[#FF0099] to-[#DD00FF] text-white border-2 border-[#FF0099]/50 shadow-[0_10px_40px_rgba(255,0,153,0.3)]'
                      : 'bg-black/40 backdrop-blur-sm border-2 border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="text-sm text-white/60 mb-3 block font-black tracking-wide">BY INDUSTRY</label>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${selectedIndustry === industry
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] text-[#05060A] border-2 border-[#00FFFF]/50 shadow-[0_10px_40px_rgba(0,255,255,0.3)]'
                      : 'bg-black/40 backdrop-blur-sm border-2 border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 pt-6 border-t-2 border-white/10">
              <p className="text-base text-white/70 font-black">
                Showing <span className="text-[#00FFFF]" style={{ textShadow: '0 0 10px #00FFFF80' }}>{filteredCaseStudies.length}</span> case {filteredCaseStudies.length === 1 ? 'study' : 'studies'}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                Featured <span className="bg-gradient-to-r from-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(255,0,153,0.5)' }}>Projects</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70">
                Our most impactful success stories
              </p>
            </div>

            <div className="space-y-12">
              {featuredStudies.map((study) => (
                <div
                  key={study.id}
                  className="group relative p-10 md:p-12 lg:p-16 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-[2rem] hover:border-white/20 transition-all duration-500 hover:scale-[1.01] overflow-hidden"
                >
                  {/* Top gradient border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF]"></div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-4 py-2 bg-gradient-to-r from-[#FF0099]/20 to-[#DD00FF]/20 border-2 border-[#FF0099]/40 rounded-xl text-sm text-[#FF0099] font-black backdrop-blur-sm">
                            {study.category}
                          </span>
                          <span className="px-4 py-2 bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-xl text-sm text-white/70 font-black">
                            {study.industry}
                          </span>
                          <span className="px-4 py-2 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF0099]/20 border-2 border-[#FF7A00]/40 rounded-xl text-sm text-[#FF7A00] font-black flex items-center gap-2 backdrop-blur-sm">
                            <Star className="w-4 h-4" />
                            FEATURED
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">{study.title}</h3>
                        <p className="text-lg md:text-xl text-white/60 font-black">{study.client}</p>
                      </div>
                      <div className="flex items-center gap-5 text-base text-white/60 font-black">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#00FFFF]" />
                          <span>{study.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#DD00FF]" />
                          <span>{study.teamSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                      {study.description}
                    </p>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-8 bg-black/40 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-3xl">
                        <h4 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                          <Target className="w-6 h-6 text-[#FF0099]" style={{ filter: 'drop-shadow(0 0 10px #FF009980)' }} />
                          The Challenge
                        </h4>
                        <p className="text-base md:text-lg text-white/70 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div className="p-8 bg-black/40 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-3xl">
                        <h4 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                          <Zap className="w-6 h-6 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                          The Solution
                        </h4>
                        <p className="text-base md:text-lg text-white/70 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <BarChart3 className="w-7 h-7 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                        Results & Impact
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {study.results.map((result: { metric: string; label: string }, index: number) => (
                          <div
                            key={index}
                            className="p-6 md:p-8 bg-gradient-to-br from-[#FF0099]/10 to-[#DD00FF]/10 border-2 border-[#FF0099]/30 rounded-2xl text-center backdrop-blur-sm"
                          >
                            <div
                              className="text-3xl md:text-4xl font-black mb-2"
                              style={{
                                color: '#FF0099',
                                textShadow: '0 0 20px #FF009980'
                              }}
                            >
                              {result.metric}
                            </div>
                            <div className="text-sm text-white/70 font-black">{result.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.impact.map((item: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#00FF9D] flex-shrink-0 mt-1" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                            <span className="text-base text-white/80 font-black">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                        <Code className="w-6 h-6 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {study.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-white/[0.05] border-2 border-white/[0.15] rounded-xl text-sm font-black text-white/80 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="p-8 md:p-10 bg-gradient-to-br from-white/[0.08] to-white/[0.04] border-2 border-white/10 rounded-3xl backdrop-blur-xl">
                      <Quote className="w-10 h-10 text-[#FF0099]/50 mb-5" />
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 italic font-black">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0099]/30 to-[#DD00FF]/30 border-2 border-[#FF0099]/50 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
                          {study.testimonial.avatar ? (
                            <img
                              src={study.testimonial.avatar}
                              alt={study.testimonial.author}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : (
                            <span className="text-xl font-black text-white">
                              {study.testimonial.author.charAt(0)}
                            </span>
                          )}
                          {/* Fallback for image error */}
                          <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FF0099]/30 to-[#DD00FF]/30">
                            <span className="text-xl font-black text-white">
                              {study.testimonial.author.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-base font-black text-white">{study.testimonial.author}</div>
                          <div className="text-sm text-white/60 font-black">{study.testimonial.company}</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex justify-end">
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-black rounded-xl hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300 group/cta"
                      >
                        Read Full Case Study
                        <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Case Studies */}
        {regularStudies.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                More <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,157,0.5)' }}>Success Stories</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70">
                Additional projects showcasing our expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularStudies.map((study) => (
                <div
                  key={study.id}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-[#00FFFF]/10 to-[#DD00FF]/10"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-[#00FFFF]/20 to-[#DD00FF]/20 border-2 border-[#00FFFF]/40 rounded-xl text-sm text-[#00FFFF] font-black backdrop-blur-sm">
                          {study.category}
                        </span>
                        <span className="px-4 py-2 bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-xl text-sm text-white/70 font-black">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00FFFF] group-hover:to-[#DD00FF] group-hover:bg-clip-text transition-all duration-300">
                        {study.title}
                      </h3>
                      <p className="text-base text-white/60 font-black">{study.client}</p>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.results.slice(0, 4).map((result: { metric: string; label: string }, index: number) => (
                        <div
                          key={index}
                          className="p-5 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl text-center"
                        >
                          <div
                            className="text-2xl md:text-3xl font-black mb-1"
                            style={{
                              color: '#00FFFF',
                              textShadow: '0 0 20px #00FFFF80'
                            }}
                          >
                            {result.metric}
                          </div>
                          <div className="text-xs text-white/70 font-black">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-5 border-t-2 border-white/10">
                      <div className="flex items-center gap-4 text-sm text-white/60 font-black">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#00FFFF]" />
                          {study.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#DD00FF]" />
                          {study.teamSize}
                        </span>
                      </div>
                      <Link to={`/case-studies/${study.slug}`} className="group/btn flex items-center gap-2 text-sm text-[#00FFFF] font-black hover:gap-3 transition-all duration-300">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">No case studies found</h3>
            <p className="text-base text-white/60 mb-8">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedIndustry('All');
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#FF0099] to-[#DD00FF] text-white rounded-2xl font-black hover:shadow-[0_20px_60px_rgba(255,0,153,0.5)] transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA - Ultra-Premium */}
        <div className="relative p-12 md:p-16 lg:p-20 text-center bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Ready to Create Your <span className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your business with innovative software solutions
              that deliver real, measurable results with 100% success rate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black tracking-wide">Start Your Project</span>
                <ArrowRight className="relative w-6 h-6 text-[#05060A] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#DD00FF]/50 hover:shadow-[0_20px_60px_rgba(221,0,255,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">Explore Our Services</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
