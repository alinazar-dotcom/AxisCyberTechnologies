import { Linkedin, Twitter, Mail, Award, Briefcase, GraduationCap, MapPin, Users, Target, Lightbulb, TrendingUp, Globe, Rocket, Shield, Heart, Zap, ArrowRight, Quote, Star, Sparkles, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function LeadershipPage() {
  const Trophy = Star;
  const [leadershipTeam, setLeadershipTeam] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_leadership', true)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        const colors = ['#DD00FF', '#00FFFF', '#00FF9D', '#FF0099'];
        const transformedData = data.map((member, index) => ({
          name: member.name,
          role: member.role,
          location: member.location || 'Global',
          image: member.avatar || `https://images.unsplash.com/photo-${index === 0 ? '1507003211169-0a1dd7228f2d' : index === 1 ? '1519085360753-af0119f7cbe7' : '1472099645785-5658abf4ff4e'}?w=800&q=80`,
          bio: member.bio || 'Technology leader at Axis Cyber Technologies.',
          expertise: member.specializations || member.skills || [],
          achievements: [
            `${member.years_experience || '10+'} years of experience`,
            `${member.projects_completed || '50+'} successful projects`,
            'Industry recognized expertise'
          ],
          education: 'Advanced Degree in Technology',
          linkedin: member.linkedin_url || 'https://linkedin.com',
          twitter: member.twitter_url || 'https://twitter.com',
          email: member.email || 'contact@axiscyber.tech',
          quote: 'Innovation is at the heart of everything we do at Axis Cyber Technologies.',
          color: colors[index % colors.length]
        }));
        setLeadershipTeam(transformedData);
      }
    } catch (err: any) {
      console.error('Error fetching team:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { value: '50+', label: 'Years Combined Experience', icon: Award, color: '#FF0099' },
    { value: '3', label: 'Leadership Executives', icon: Users, color: '#00FFFF' },
    { value: '4', label: 'Global Locations', icon: Globe, color: '#DD00FF' },
    { value: '100+', label: 'Projects Delivered', icon: Trophy, color: '#00FF9D' }
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We constantly push boundaries and embrace cutting-edge technologies to deliver 100% exceptional solutions.',
      color: '#DD00FF'
    },
    {
      icon: Users,
      title: 'People-Centric',
      description: 'Our team is our greatest asset. We invest in growth, wellbeing, and creating an inclusive culture.',
      color: '#00FFFF'
    },
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every project receives our full commitment to 100% excellence.',
      color: '#00FF9D'
    },
    {
      icon: Heart,
      title: 'Client Success',
      description: 'Your success is our success. We build lasting partnerships based on trust and 100% exceptional results.',
      color: '#FF0099'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
          <p className="text-white/60 font-black tracking-widest uppercase">Loading Leadership Team...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-black/50 border-2 border-red-500/30 rounded-3xl text-center backdrop-blur-xl">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4">Failed to Load Leadership</h2>
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
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#DD00FF] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#00FF9D] rounded-full blur-[140px] opacity-15"></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD00FF] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#DD00FF]/30 rounded-full mb-8 backdrop-blur-sm">
            <Users className="w-5 h-5 text-[#DD00FF]" />
            <span className="text-white font-black tracking-wide">Leadership Team</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Meet the <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,0,255,0.5)]">Visionaries</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
            Our leadership team brings together decades of experience from top tech companies and startups.
            Together, we're building the future of software engineering with 100% commitment.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${stat.color}30`,
                    boxShadow: `0 0 30px ${stat.color}15`
                  }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: stat.color, filter: `drop-shadow(0 0 15px ${stat.color}80)` }}
                  />
                  <div className="text-3xl md:text-4xl font-black mb-2"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/70 font-black">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Profiles */}
        <div className="mb-20 md:mb-28">
          <div className="space-y-12">
            {leadershipTeam.map((leader, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 p-8 md:p-10 lg:p-12 bg-black/40 backdrop-blur-xl border-2 rounded-[2rem] group transition-all duration-500 hover:scale-[1.02]`}
                style={{
                  borderColor: `${leader.color}30`,
                  boxShadow: `0 0 40px ${leader.color}15`
                }}
              >
                {/* Image Section */}
                <div className="lg:w-1/3 flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"
                      style={{ background: `radial-gradient(circle, ${leader.color}40, transparent 70%)` }}
                    ></div>
                    <div className="relative aspect-square rounded-3xl overflow-hidden border-2 transition-all duration-300"
                      style={{ borderColor: `${leader.color}40` }}
                    >
                      <ImageWithFallback
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-white/[0.04] border-2 border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all duration-300 group/link"
                      style={{
                        '--hover-color': leader.color,
                        boxShadow: `0 0 20px ${leader.color}00`
                      } as any}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${leader.color}40`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}00`;
                      }}
                    >
                      <Linkedin className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors" />
                    </a>
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-white/[0.04] border-2 border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all duration-300 group/link"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${leader.color}40`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}00`;
                      }}
                    >
                      <Twitter className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors" />
                    </a>
                    <a
                      href={`mailto:${leader.email}`}
                      className="w-12 h-12 rounded-2xl bg-white/[0.04] border-2 border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all duration-300 group/link"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${leader.color}40`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${leader.color}00`;
                      }}
                    >
                      <Mail className="w-5 h-5 text-white/60 group-hover/link:text-white transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3 flex flex-col">
                  {/* Header */}
                  <div className="mb-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
                      {leader.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="px-4 py-2 border-2 rounded-2xl font-black backdrop-blur-sm"
                        style={{
                          backgroundColor: `${leader.color}20`,
                          borderColor: `${leader.color}40`,
                          color: leader.color
                        }}
                      >
                        {leader.role}
                      </span>
                      <div className="flex items-center gap-2 text-white/70 font-black">
                        <MapPin className="w-4 h-4" style={{ color: leader.color }} />
                        <span>{leader.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
                    {leader.bio}
                  </p>

                  {/* Quote */}
                  <div className="p-6 md:p-8 bg-white/[0.02] border-l-4 rounded-2xl mb-6"
                    style={{ borderColor: leader.color }}
                  >
                    <Quote className="w-6 h-6 mb-3" style={{ color: leader.color, filter: `drop-shadow(0 0 10px ${leader.color}80)` }} />
                    <p className="text-base md:text-lg text-white/80 italic leading-relaxed">"{leader.quote}"</p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" style={{ color: leader.color, filter: `drop-shadow(0 0 10px ${leader.color}80)` }} />
                      Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {leader.expertise.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white/[0.04] border-2 border-white/[0.08] rounded-xl text-sm text-white/80 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 font-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Grid: Achievements & Education */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Achievements */}
                    <div>
                      <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5" style={{ color: leader.color, filter: `drop-shadow(0 0 10px ${leader.color}80)` }} />
                        Key Achievements
                      </h3>
                      <ul className="space-y-3">
                        {leader.achievements.map((achievement: string, idx: number) => (
                          <li key={idx} className="text-sm md:text-base text-white/80 flex items-start gap-3 font-black">
                            <span className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                              style={{
                                backgroundColor: leader.color,
                                boxShadow: `0 0 10px ${leader.color}80`
                              }}
                            ></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" style={{ color: leader.color, filter: `drop-shadow(0 0 10px ${leader.color}80)` }} />
                        Education
                      </h3>
                      <p className="text-sm md:text-base text-white/80 font-black">{leader.education}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Values */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
              <Target className="w-5 h-5 text-[#FF0099]" />
              <span className="text-white font-black tracking-wide">Our Leadership Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              What Guides <span className="bg-gradient-to-r from-[#FF0099] to-[#FF7A00] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Our Decisions</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Our leadership team is united by a shared set of values that drive every decision we make with 100% integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 text-center hover:scale-105"
                  style={{
                    borderColor: `${value.color}30`,
                    boxShadow: `0 0 30px ${value.color}15`
                  }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${value.color}30, ${value.color}10)`,
                      boxShadow: `0 10px 40px ${value.color}30`
                    }}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3">{value.title}</h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="relative p-12 md:p-16 lg:p-20 bg-black/60 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-[2rem] text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#DD00FF]/10 via-[#00FFFF]/10 to-[#00FF9D]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-[#DD00FF] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #DD00FF80)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Join Our <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Growing Team</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              We're always looking for talented individuals who share our passion for innovation and excellence.
              Explore opportunities to work with our world-class leadership team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/careers"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(221,0,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#DD00FF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-white text-lg font-black tracking-wide">View Open Positions</span>
                <ArrowRight className="relative w-6 h-6 text-white" />
              </Link>
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00FF9D]/50 hover:shadow-[0_20px_60px_rgba(0,255,157,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">Learn About Our Culture</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
