import { Book, Rocket, Globe, Users, Target, Heart, Zap, TrendingUp, Award, Sparkles, ArrowRight, CheckCircle, Star, Lightbulb, Building2, Code, Shield, Compass, Flag, Crown, Map, Calendar, Trophy, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function StoryPage() {
  const timeline = [
    {
      year: '2012',
      title: 'The Foundation',
      description: 'Axis Cyber Technologies was founded in Lahore, Pakistan by Omer Abbas with a vision to build world-class software solutions.',
      icon: Rocket,
      color: '#DD00FF'
    },
    {
      year: '2014',
      title: 'Early Growth',
      description: 'Expanded service portfolio and built a talented team of developers. Established strong local presence in Pakistan.',
      icon: Users,
      color: '#00FFFF'
    },
    {
      year: '2016',
      title: 'International Recognition',
      description: 'Secured first international clients and began working with Fortune 500 companies. Reputation for quality spreads globally.',
      icon: Award,
      color: '#00FF9D'
    },
    {
      year: '2018',
      title: 'Technology Leadership',
      description: 'Expanded into AI/ML and blockchain development. Became recognized experts in emerging technologies.',
      icon: Code,
      color: '#FF7A00'
    },
    {
      year: '2020',
      title: 'Global Expansion Begins',
      description: 'Opened our first international office in Dubai, UAE. Began 24/7 operations to serve clients worldwide.',
      icon: Globe,
      color: '#FF0099'
    },
    {
      year: '2021',
      title: 'Americas & Europe',
      description: 'Established offices in Los Angeles, USA and London, UK. Team grew to 25+ professionals across three continents.',
      icon: Map,
      color: '#DD00FF'
    },
    {
      year: '2022',
      title: 'Innovation Lab',
      description: 'Launched dedicated Innovation Lab for R&D in cutting-edge technologies. Focus on AI, blockchain, and WebGL.',
      icon: Lightbulb,
      color: '#00FFFF'
    },
    {
      year: '2023',
      title: 'Scaling Excellence',
      description: 'Grew to 50+ team members across 4 continents. Delivered 100+ successful projects with 100% client satisfaction.',
      icon: TrendingUp,
      color: '#00FF9D'
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Recognized as a leader in AI/ML and blockchain solutions. Expanded to 25+ countries with major enterprise clients.',
      icon: Trophy,
      color: '#FF7A00'
    },
    {
      year: '2025',
      title: 'Future Forward',
      description: 'Continuing to push boundaries in next-gen technologies. Building the future with innovation, excellence, and global impact.',
      icon: Sparkles,
      color: '#FF0099'
    }
  ];

  const milestones = [
    { value: '13+', label: 'Years in Business', color: '#FF0099' },
    { value: '100+', label: 'Projects Delivered', color: '#00FFFF' },
    { value: '50+', label: 'Team Members', color: '#DD00FF' },
    { value: '4', label: 'Global Offices', color: '#00FF9D' },
    { value: '25+', label: 'Countries Served', color: '#FF7A00' },
    { value: '100%', label: 'Success Rate', color: '#FF0099' }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions that push the boundaries of what\'s possible with 100% commitment.',
      color: '#DD00FF'
    },
    {
      icon: Shield,
      title: 'Excellence',
      description: 'Quality is non-negotiable. We maintain the highest standards in every project, ensuring 100% exceptional results that exceed expectations.',
      color: '#00FFFF'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honesty and transparency guide every decision. We build lasting relationships based on trust, reliability, and ethical practices.',
      color: '#FF0099'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Great solutions emerge from teamwork. We foster a culture where diverse perspectives unite to create extraordinary outcomes.',
      color: '#00FF9D'
    },
    {
      icon: Rocket,
      title: 'Growth',
      description: 'We invest in our people and embrace continuous learning, ensuring our team stays ahead in the ever-evolving tech landscape.',
      color: '#FF7A00'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'From Lahore to Los Angeles, we deliver solutions that make a difference across borders, cultures, and industries.',
      color: '#DD00FF'
    }
  ];

  const offices = [
    {
      city: 'Lahore',
      country: 'Pakistan',
      role: 'Global Headquarters',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
      description: 'Our founding office and innovation hub',
      color: '#DD00FF'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      role: 'Middle East Hub',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      description: 'Serving clients across the Middle East',
      color: '#00FFFF'
    },
    {
      city: 'Los Angeles',
      country: 'USA',
      role: 'Americas Hub',
      image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80',
      description: 'Supporting North & South America',
      color: '#00FF9D'
    },
    {
      city: 'London',
      country: 'UK',
      role: 'European Hub',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
      description: 'Expanding across Europe',
      color: '#FF0099'
    }
  ];

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
            <Book className="w-5 h-5 text-[#DD00FF]" />
            <span className="text-white font-black tracking-wide">Our Story</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Building the <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,0,255,0.5)]">Future of Tech</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
            From a vision in Lahore to a global operation spanning four continents, our journey is defined by 
            innovation, excellence, and an unwavering commitment to transforming businesses through technology with 100% dedication.
          </p>

          {/* Milestones Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="group p-6 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                style={{
                  borderColor: `${milestone.color}30`,
                  boxShadow: `0 0 30px ${milestone.color}15`
                }}
              >
                <div className="text-2xl md:text-3xl font-black mb-1"
                  style={{ 
                    color: milestone.color,
                    textShadow: `0 0 20px ${milestone.color}80`
                  }}
                >
                  {milestone.value}
                </div>
                <div className="text-xs text-white/70 font-black">
                  {milestone.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Story */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="p-10 md:p-12 lg:p-16 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/20 rounded-[2rem]">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-3xl border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${('#DD00FF')}30, ${('#00FFFF')}20)`,
                    borderColor: '#DD00FF40',
                    boxShadow: `0 10px 40px ${('#DD00FF')}30`
                  }}
                >
                  <Rocket className="w-10 h-10 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                    The <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Beginning</span>
                  </h2>
                  <div className="space-y-5 text-base md:text-lg text-white/80 leading-relaxed">
                    <p>
                      In 2012, Omer Abbas founded Axis Cyber Technologies with a bold vision: to create a software 
                      engineering company that could compete globally while staying rooted in Pakistan. Starting from 
                      Lahore, we began with a small team of passionate developers and a commitment to 100% excellence.
                    </p>
                    <p>
                      Our early days were defined by late nights, ambitious projects, and a relentless focus on quality. 
                      We didn't just want to build software—we wanted to craft solutions that would genuinely transform 
                      businesses and push the boundaries of what's possible with technology.
                    </p>
                    <p>
                      What started as a local operation quickly caught the attention of international clients. Our 
                      expertise in emerging technologies like AI/ML and blockchain, combined with our dedication to 
                      100% client success, opened doors to opportunities across continents.
                    </p>
                    <p>
                      Over the past 13 years, we've grown from a small startup to a global operation with offices in 
                      Lahore, Dubai, Los Angeles, and London. We now operate 24/7 to serve clients worldwide. But 
                      despite our growth, we've never lost sight of our founding principle: deliver exceptional quality, always.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-8 bg-white/[0.02] border-l-4 border-[#DD00FF]/50 rounded-2xl">
                <p className="text-base md:text-lg text-white/80 italic leading-relaxed">
                  "We started with a simple belief: that a team in Pakistan could build world-class software 
                  that rivals the best in Silicon Valley. Today, we're proving that vision every single day with 100% commitment."
                </p>
                <p className="text-sm md:text-base font-black mt-4"
                  style={{ color: '#DD00FF', textShadow: '0 0 10px #DD00FF80' }}
                >
                  — Omer Abbas, Founder & CTO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FFFF]/30 rounded-full mb-8 backdrop-blur-sm">
              <Clock className="w-5 h-5 text-[#00FFFF]" />
              <span className="text-white font-black tracking-wide">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Milestones That <span className="bg-gradient-to-r from-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">Shaped Us</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#DD00FF]/30 via-[#00FFFF]/30 to-[#00FF9D]/30"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`relative flex items-start gap-6 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Icon */}
                      <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl border-2 flex items-center justify-center z-10`}
                        style={{
                          background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                          borderColor: `${item.color}40`,
                          boxShadow: `0 10px 40px ${item.color}40`
                        }}
                      >
                        <Icon className={`w-10 h-10`} style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color}80)` }} />
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ml-28 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                        <div className="p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                          style={{
                            borderColor: `${item.color}30`,
                            boxShadow: `0 0 30px ${item.color}15`
                          }}
                        >
                          <div className={`text-2xl md:text-3xl font-black mb-3`}
                            style={{ 
                              color: item.color,
                              textShadow: `0 0 20px ${item.color}80`
                            }}
                          >
                            {item.year}
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                            {item.title}
                          </h3>
                          <p className="text-base md:text-lg text-white/80 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-10 md:p-12 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-[2rem]">
              <div className="w-20 h-20 rounded-3xl border-2 flex items-center justify-center mb-6"
                style={{
                  background: `linear-gradient(135deg, ${('#DD00FF')}30, ${('#B900FF')}20)`,
                  borderColor: '#DD00FF40',
                  boxShadow: `0 10px 40px ${('#DD00FF')}30`
                }}
              >
                <Target className="w-10 h-10 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Our Mission</h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
                To empower businesses worldwide with innovative software solutions that drive growth, efficiency, 
                and digital transformation. We combine cutting-edge technology with exceptional service to deliver 
                100% results that exceed expectations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#DD00FF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                  <span className="text-base text-white/80 font-black">Deliver world-class software solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#DD00FF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                  <span className="text-base text-white/80 font-black">Build lasting client partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#DD00FF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
                  <span className="text-base text-white/80 font-black">Foster innovation and 100% excellence</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="p-10 md:p-12 bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-[2rem]">
              <div className="w-20 h-20 rounded-3xl border-2 flex items-center justify-center mb-6"
                style={{
                  background: `linear-gradient(135deg, ${('#00FFFF')}30, ${('#00E5FF')}20)`,
                  borderColor: '#00FFFF40',
                  boxShadow: `0 10px 40px ${('#00FFFF')}30`
                }}
              >
                <Compass className="w-10 h-10 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 15px #00FFFF80)' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Our Vision</h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
                To be the global leader in next-generation software engineering, recognized for our innovation, 
                quality, and impact. We envision a future where technology seamlessly enhances human potential 
                and transforms industries worldwide with 100% success.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#00FFFF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                  <span className="text-base text-white/80 font-black">Lead in AI, blockchain, and emerging tech</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#00FFFF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                  <span className="text-base text-white/80 font-black">Expand to every major global market</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#00FFFF] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 10px #00FFFF80)' }} />
                  <span className="text-base text-white/80 font-black">Create lasting technological impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
              <Heart className="w-5 h-5 text-[#FF0099]" />
              <span className="text-white font-black tracking-wide">Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Values That <span className="bg-gradient-to-r from-[#FF0099] to-[#FF7A00] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Drive Us</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              These principles guide every decision we make and every solution we build with 100% integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${value.color}30`,
                    boxShadow: `0 0 30px ${value.color}15`
                  }}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      background: `linear-gradient(135deg, ${value.color}30, ${value.color}10)`,
                      boxShadow: `0 10px 40px ${value.color}30`
                    }}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 text-center">{value.title}</h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed text-center">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Offices */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FF9D]/30 rounded-full mb-8 backdrop-blur-sm">
              <Map className="w-5 h-5 text-[#00FF9D]" />
              <span className="text-white font-black tracking-wide">Global Presence</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Operating <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,157,0.5)]">24/7 Worldwide</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              With offices across four continents, we deliver round-the-clock support and local expertise globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border-2 transition-all duration-500 hover:scale-105"
                style={{
                  borderColor: `${office.color}30`,
                  boxShadow: `0 0 30px ${office.color}15`
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={office.image}
                    alt={`${office.city}, ${office.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white mb-2">{office.city}</h3>
                    <p className="text-sm text-white/70 font-black">{office.country}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="px-4 py-2 border-2 rounded-2xl inline-block mb-3"
                    style={{
                      backgroundColor: `${office.color}20`,
                      borderColor: `${office.color}40`,
                      color: office.color
                    }}
                  >
                    <span className="text-sm font-black">{office.role}</span>
                  </div>
                  <p className="text-sm text-white/70 font-black">{office.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative p-12 md:p-16 lg:p-20 bg-black/60 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-[2rem] text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#DD00FF]/10 via-[#00FFFF]/10 to-[#00FF9D]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <Crown className="w-16 h-16 md:w-20 md:h-20 text-[#DD00FF] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #DD00FF80)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Be Part of <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Our Story</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking to transform your business with cutting-edge technology or join our world-class 
              team, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(221,0,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#DD00FF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-white text-lg font-black tracking-wide">Start Your Project</span>
                <ArrowRight className="relative w-6 h-6 text-white" />
              </Link>
              <Link
                to="/careers"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00FF9D]/50 hover:shadow-[0_20px_60px_rgba(0,255,157,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">Join Our Team</span>
                <ChevronRight className="relative w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
