import { Briefcase, MapPin, Clock, DollarSign, Users, Rocket, Heart, Zap, Globe, Code, Brain, Trophy, Coffee, Laptop, Wifi, Plane, GraduationCap, Shield, TrendingUp, Star, ChevronRight, Search, Filter, ArrowRight, CheckCircle2, Sparkles, Target, Award, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>(['All']);
  const [locations, setLocations] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('career_listings')
        .select('*')
        .eq('status', 'open')
        .order('posted_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        setJobOpenings(data);

        // Extract unique departments and locations
        const uniqueDepts = Array.from(new Set(data.map(job => job.department)));
        const uniqueLocs = Array.from(new Set(data.map(job => job.location)));

        setDepartments(['All', ...uniqueDepts]);
        setLocations(['All', ...uniqueLocs]);
      }
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Top-tier compensation packages with equity options',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00E5FF]'
    },
    {
      icon: Plane,
      title: 'Remote Flexible',
      description: 'Work from anywhere with flexible hours',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00E5FF]'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance for you and family',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#DD00FF]'
    },
    {
      icon: GraduationCap,
      title: 'Learning Budget',
      description: '$5,000 annual budget for courses and conferences',
      color: '#DD00FF',
      gradient: 'from-[#DD00FF] to-[#B900FF]'
    },
    {
      icon: Coffee,
      title: 'Unlimited PTO',
      description: 'Take time off when you need it, no questions asked',
      color: '#FF7A00',
      gradient: 'from-[#FF7A00] to-[#FF0099]'
    },
    {
      icon: Laptop,
      title: 'Latest Tech',
      description: 'MacBook Pro, accessories, and tools of your choice',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#DD00FF]'
    },
    {
      icon: Users,
      title: 'Team Events',
      description: 'Regular team building and social activities',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#00FFFF]'
    },
    {
      icon: Trophy,
      title: 'Performance Bonus',
      description: 'Quarterly bonuses based on individual and team goals',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#DD00FF]'
    }
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and push boundaries.',
      gradient: 'from-[#FF0099] to-[#DD00FF]',
      glow: '#FF0099'
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'We believe in the power of teamwork and diverse perspectives.',
      gradient: 'from-[#00FFFF] to-[#00E5FF]',
      glow: '#00FFFF'
    },
    {
      icon: Brain,
      title: 'Continuous Learning',
      description: 'Growth mindset and lifelong learning are in our DNA.',
      gradient: 'from-[#00FF9D] to-[#00E5FF]',
      glow: '#00FF9D'
    },
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'We deliver exceptional results and never compromise on quality.',
      gradient: 'from-[#DD00FF] to-[#B900FF]',
      glow: '#DD00FF'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const stats = [
    { value: '50+', label: 'Team Members', icon: Users, color: '#FF0099' },
    { value: '4', label: 'Global Offices', icon: Globe, color: '#00FFFF' },
    { value: '25+', label: 'Countries', icon: MapPin, color: '#DD00FF' },
    { value: '100%', label: 'Employee Satisfaction', icon: Award, color: '#00FF9D' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#FF0099] animate-spin mx-auto mb-4" />
          <p className="text-white/60 font-black tracking-widest uppercase">Loading Opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-black/50 border-2 border-red-500/30 rounded-3xl text-center backdrop-blur-xl">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4">Failed to Load Careers</h2>
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
            <Briefcase className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">Join Our Team</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Build the <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Future</span> with Us
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-4xl mx-auto">
            Join a team of passionate engineers, designers, and innovators building next-generation software solutions across 12 specialized services with 100% success rate.
          </p>

          {/* Stats - Ultra-Premium Neon Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105"
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
                      className="w-8 h-8 md:w-10 md:h-10 mb-3 mx-auto group-hover:scale-110 transition-transform duration-500"
                      style={{ color: stat.color }}
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
                    <div className="text-xs md:text-sm text-white/70 font-black tracking-wide">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href="#openings"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF0099] to-[#DD00FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,153,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#FF0099]/30"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="relative text-white text-lg font-black tracking-wide">View Open Positions</span>
              <ArrowRight className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#culture"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00FFFF]/50 hover:shadow-[0_20px_60px_rgba(0,255,255,0.3)] hover:-translate-y-1"
            >
              <span className="relative text-white text-lg font-black tracking-wide">Learn About Our Culture</span>
            </a>
          </div>
        </div>

        {/* Why Work Here */}
        <div id="culture" className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FFFF]/30 rounded-full mb-8 backdrop-blur-sm">
              <Star className="w-5 h-5 text-[#00FFFF]" />
              <span className="text-white font-black tracking-wide">Why Axis Cyber</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              More Than Just a <span className="bg-gradient-to-r from-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,255,0.5)' }}>Job</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              We offer an environment where you can grow, learn, and make a real impact.
            </p>
          </div>

          {/* Benefits Grid - Ultra-Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${benefit.color}40`,
                    boxShadow: `0 0 30px ${benefit.color}20`
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at top, ${benefit.color}30, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 mx-auto`}
                      style={{ boxShadow: `0 10px 40px ${benefit.color}40` }}
                    >
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-3 text-center">{benefit.title}</h3>
                    <p className="text-sm md:text-base text-white/70 text-center leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#DD00FF]/30 rounded-full mb-8 backdrop-blur-sm">
              <Heart className="w-5 h-5 text-[#DD00FF]" />
              <span className="text-white font-black tracking-wide">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              What Drives <span className="bg-gradient-to-r from-[#DD00FF] to-[#FF0099] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(221,0,255,0.5)' }}>Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: `${value.glow}40`,
                    boxShadow: `0 0 30px ${value.glow}20`
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at center, ${value.glow}30, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}
                      style={{ boxShadow: `0 10px 40px ${value.glow}40` }}
                    >
                      <Icon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-4">{value.title}</h3>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div id="openings" className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FF9D]/30 rounded-full mb-8 backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-[#00FF9D]" />
              <span className="text-white font-black tracking-wide">Open Positions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Find Your <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,157,0.5)' }}>Role</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Explore opportunities across engineering, design, and more.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00FFFF]" />
              <input
                type="text"
                placeholder="Search by role, skill, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#00FFFF]/60 focus:shadow-[0_0_40px_rgba(0,255,255,0.3)] transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DD00FF]" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-black/50 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl text-white font-black focus:outline-none focus:border-[#DD00FF]/60 focus:shadow-[0_0_40px_rgba(221,0,255,0.3)] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="bg-[#0A0A14] text-white">
                        {dept === 'All' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF0099]" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-black/50 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-2xl text-white font-black focus:outline-none focus:border-[#FF0099]/60 focus:shadow-[0_0_40px_rgba(255,0,153,0.3)] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#0A0A14] text-white">
                        {loc === 'All' ? 'All Locations' : loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="text-center text-base text-white/60 font-black">
              Showing {filteredJobs.length} of {jobOpenings.length} positions
            </div>
          </div>

          {/* Job Listings - Ultra-Premium */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group relative p-8 md:p-10 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              >
                {job.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF]"></div>
                )}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#FF0099] group-hover:to-[#00FFFF] group-hover:bg-clip-text transition-all">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="px-4 py-1.5 bg-gradient-to-r from-[#FF0099]/20 to-[#00FFFF]/20 border-2 border-[#FF0099]/50 rounded-xl text-xs font-black text-[#FF0099] flex items-center gap-2 backdrop-blur-sm">
                              <Sparkles className="w-4 h-4" />
                              FEATURED
                            </span>
                          )}
                        </div>
                        <p className="text-base md:text-lg text-white/70 mb-5 leading-relaxed">{job.description}</p>
                      </div>
                    </div>

                    {/* Job Meta */}
                    <div className="flex flex-wrap gap-4 mb-5">
                      <div className="flex items-center gap-2 text-base text-white/70">
                        <Briefcase className="w-5 h-5 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                        <span className="font-black">{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base text-white/70">
                        <MapPin className="w-5 h-5 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 10px #00FF9D80)' }} />
                        <span className="font-black">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base text-white/70">
                        <Clock className="w-5 h-5 text-[#FF7A00]" style={{ filter: 'drop-shadow(0 0 10px #FF7A0080)' }} />
                        <span className="font-black">{job.employment_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base text-white/70">
                        <DollarSign className="w-5 h-5 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                        <span className="font-black">{job.salary_range}</span>
                      </div>
                      {job.is_remote && (
                        <div className="flex items-center gap-2 text-base">
                          <Wifi className="w-5 h-5 text-[#FF0099]" style={{ filter: 'drop-shadow(0 0 10px #FF009980)' }} />
                          <span className="text-[#FF0099] font-black">REMOTE OK</span>
                        </div>
                      )}
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-wrap gap-3">
                      {job.requirements?.map((req: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white/[0.05] border border-white/[0.15] rounded-xl text-sm font-black text-white/80 backdrop-blur-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="flex-shrink-0">
                    <Link
                      to={`/careers/apply?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}`}
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <span className="relative text-[#05060A] font-black tracking-wide whitespace-nowrap">Apply Now</span>
                      <ChevronRight className="relative w-5 h-5 text-[#05060A] transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white/40" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">No positions found</h3>
              <p className="text-base text-white/60 mb-8">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('All');
                  setSelectedLocation('All');
                }}
                className="px-8 py-4 bg-black/50 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Application Process */}
        <div className="mb-20">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#DD00FF]/30 rounded-full mb-8 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-[#DD00FF]" />
              <span className="text-white font-black tracking-wide">Application Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              How It <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(221,0,255,0.5)' }}>Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Apply Online', description: 'Submit your application through our portal', icon: Code, color: '#FF0099' },
              { step: '02', title: 'Initial Screening', description: 'We review your profile and experience', icon: Users, color: '#00FFFF' },
              { step: '03', title: 'Technical Interview', description: 'Showcase your skills and problem-solving', icon: Brain, color: '#DD00FF' },
              { step: '04', title: 'Join the Team', description: 'Welcome aboard! Let\'s build together', icon: Rocket, color: '#00FF9D' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div
                    className="p-8 bg-black/50 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 text-center group"
                    style={{
                      borderColor: `${item.color}40`,
                      boxShadow: `0 0 30px ${item.color}20`
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-3xl"
                      style={{ background: `radial-gradient(circle at center, ${item.color}30, transparent 70%)` }}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className="text-5xl md:text-6xl font-black mb-4"
                        style={{
                          color: item.color,
                          textShadow: `0 0 20px ${item.color}80`
                        }}
                      >
                        {item.step}
                      </div>
                      <Icon
                        className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"
                        style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color}80)` }}
                      />
                      <h3 className="text-lg md:text-xl font-black text-white mb-3">{item.title}</h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {index < 3 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 text-white/30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section - Ultra-Premium */}
        <div className="relative p-12 md:p-16 lg:p-20 bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10 text-center">
            <Rocket className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Ready to Make an <span className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] bg-clip-text text-transparent">Impact</span>?
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join a team of world-class engineers and designers building the future of technology with 100% project success rate across 12 specialized services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a
                href="#openings"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black tracking-wide">Browse Open Positions</span>
                <ArrowRight className="relative w-6 h-6 text-[#05060A] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#DD00FF]/50 hover:shadow-[0_20px_60px_rgba(221,0,255,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">Get in Touch</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
