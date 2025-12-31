import { Target, Lightbulb, Users, Globe, Award, TrendingUp, Shield, Zap, Heart, Code, Rocket, Star, MapPin, Building2, Clock, ArrowRight, Sparkles, Brain, Lock, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../src/hooks/useSiteSettings';

export function AboutPage() {
  const { settings } = useSiteSettings();
  const stats = [
    { value: '500+', label: 'Projects Delivered', icon: Rocket, color: '#FF0099' },
    { value: '150+', label: 'Happy Clients', icon: Users, color: '#00FFFF' },
    { value: '100%', label: 'Success Rate', icon: Award, color: '#00FF9D' },
    { value: '24/7', label: 'Global Operations', icon: Globe, color: '#DD00FF' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver solutions that set new industry standards.',
      gradient: 'from-[#FF0099] to-[#DD00FF]',
      glow: 'rgba(255,0,153,0.3)'
    },
    {
      icon: Shield,
      title: 'Quality & Security',
      description: 'Enterprise-grade security and rigorous quality assurance are built into every line of code we write.',
      gradient: 'from-[#00FFFF] to-[#00E5FF]',
      glow: 'rgba(0,255,255,0.3)'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We build lasting partnerships through transparent communication and collaboration.',
      gradient: 'from-[#00FF9D] to-[#00E5FF]',
      glow: 'rgba(0,255,157,0.3)'
    },
    {
      icon: Brain,
      title: 'Continuous Learning',
      description: 'We invest in our team\'s growth and stay ahead of the curve with the latest technologies and methodologies.',
      gradient: 'from-[#DD00FF] to-[#B900FF]',
      glow: 'rgba(221,0,255,0.3)'
    },
    {
      icon: Heart,
      title: 'Passion & Purpose',
      description: 'We love what we do and believe in building technology that makes a meaningful impact on the world.',
      gradient: 'from-[#FF0099] to-[#FF7A00]',
      glow: 'rgba(255,0,153,0.3)'
    },
    {
      icon: Zap,
      title: 'Speed & Agility',
      description: 'Fast execution without compromising quality. We adapt quickly to changes and deliver results efficiently.',
      gradient: 'from-[#00FFFF] to-[#DD00FF]',
      glow: 'rgba(0,255,255,0.3)'
    },
  ];

  const timeline = [
    { year: '2012', title: 'Founded with WizKids', description: 'Started with international clients, developing AI-powered smartphone apps for WizKids with exclusive access to Apple\'s core-level hidden features', gradient: 'from-[#FF0099] to-[#DD00FF]' },
    { year: '2015', title: 'Established in Lahore', description: 'Officially established headquarters in Lahore, Pakistan as demand for our cutting-edge solutions grew globally', gradient: 'from-[#00FFFF] to-[#00E5FF]' },
    { year: '2017', title: 'Global Expansion', description: 'Opened offices in Dubai and London to serve clients across time zones with 24/7 operations', gradient: 'from-[#DD00FF] to-[#B900FF]' },
    { year: '2019', title: 'US Presence', description: 'Established Los Angeles office to strengthen North American operations and partnerships', gradient: 'from-[#00FF9D] to-[#00E5FF]' },
    { year: '2021', title: 'Tech Leadership', description: 'Launched specialized divisions: AI/ML, Blockchain, Gaming/WebGL, IoT, and Cybersecurity', gradient: 'from-[#FF0099] to-[#FF7A00]' },
    { year: '2023', title: 'Industry Recognition', description: 'Named Top Next-Generation Software Engineering Company with 100% project success rate', gradient: 'from-[#00FFFF] to-[#DD00FF]' },
    { year: '2024', title: 'Today', description: '500+ projects delivered with 100% success across all 12 specialized services, serving 150+ international clients', gradient: 'from-[#DD00FF] to-[#FF0099]' },
  ];

  const offices = [
    { city: 'Lahore', country: 'Pakistan', address: settings?.office_lahore || 'Innovation District, Punjab', isHQ: true, timezone: 'PKT (UTC+5)', glow: '#FF0099' },
    { city: 'Dubai', country: 'UAE', address: settings?.office_dubai || 'Dubai Internet City', isHQ: false, timezone: 'GST (UTC+4)', glow: '#00FFFF' },
    { city: 'Los Angeles', country: 'USA', address: settings?.office_los_angeles || 'Silicon Beach, California', isHQ: false, timezone: 'PST (UTC-8)', glow: '#DD00FF' },
    { city: 'London', country: 'UK', address: settings?.office_london || 'Tech City, Shoreditch', isHQ: false, timezone: 'GMT (UTC+0)', glow: '#00FF9D' },
  ];

  const achievements = [
    { icon: Award, label: '100% Project Success Rate', value: 'All Projects' },
    { icon: Star, label: '100% Client Satisfaction', value: '150+ Clients' },
    { icon: Gauge, label: '100% On-Time Delivery', value: '500+ Projects' },
    { icon: Lock, label: '100% Security Standards', value: 'Zero Breaches' },
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
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#DD00FF] to-transparent"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00FF9D] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
            <Building2 className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">About Axis Cyber Technologies</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Building Tomorrow's{' '}
            <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">
              Technology Today
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            A next-generation software engineering company operating 24/7 across global offices in Lahore, Dubai, Los Angeles, and London, delivering cutting-edge solutions with 100% success rate.
          </p>
        </div>

        {/* Stats - Ultra-Premium Neon Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-32">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105"
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
                    className="w-10 h-10 md:w-12 md:h-12 mb-4 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: stat.color }}
                  />
                  <div
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-2"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80, 0 0 40px ${stat.color}40`
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-white/70 font-black tracking-wide">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision - Ultra-Premium */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-32">
          {/* Mission */}
          <div className="group relative p-10 md:p-12 lg:p-14 bg-black/50 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-3xl overflow-hidden hover:border-[#FF0099]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0099]/10 to-transparent opacity-50"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[#FF0099]/20"></div>

            <div className="relative z-10">
              <Target className="w-14 h-14 md:w-16 md:h-16 text-[#FF0099] mb-6 group-hover:scale-110 transition-transform duration-500" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Our Mission</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                To empower businesses worldwide with innovative technology solutions that drive growth, efficiency, and competitive advantage through 24/7 global operations and 100% project success.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative p-10 md:p-12 lg:p-14 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-3xl overflow-hidden hover:border-[#00FFFF]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-50"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-[#00FFFF]/20"></div>

            <div className="relative z-10">
              <Lightbulb className="w-14 h-14 md:w-16 md:h-16 text-[#00FFFF] mb-6 group-hover:scale-110 transition-transform duration-500" style={{ filter: 'drop-shadow(0 0 20px #00FFFF80)' }} />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">Our Vision</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                To be the world's most trusted next-generation technology partner, recognized for excellence, innovation, and transformative impact across all 12 specialized services globally.
              </p>
            </div>
          </div>
        </div>

        {/* 100% Achievement Badges */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,157,0.5)' }}>100% Commitment</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Excellence in every metric, every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-black/50 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-2xl hover:border-[#00FF9D]/50 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#00FF9D]/20"></div>
                  <div className="relative z-10 text-center">
                    <Icon className="w-12 h-12 text-[#00FF9D] mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 15px #00FF9D80)' }} />
                    <div className="text-5xl font-black text-[#00FF9D] mb-2" style={{ textShadow: '0 0 20px #00FF9D80' }}>
                      100%
                    </div>
                    <p className="font-black text-white/90 mb-1">{item.label}</p>
                    <p className="text-sm text-white/60">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#DD00FF] to-[#FF0099] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(221,0,255,0.5)' }}>Core Values</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${value.glow}60`,
                    boxShadow: `0 0 30px ${value.glow}20`
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at top, ${value.glow}, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                      style={{ boxShadow: `0 10px 40px ${value.glow}` }}
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

        {/* Timeline */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF0099] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(255,122,0,0.5)' }}>Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Over 12 years of innovation, from WizKids partnership to global tech leadership
            </p>
          </div>

          <div className="relative">
            {/* Glowing timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF0099] via-[#00FFFF] to-[#DD00FF] opacity-50 blur-sm"></div>
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF0099] via-[#00FFFF] to-[#DD00FF]"></div>

            <div className="space-y-12 md:space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block p-8 md:p-10 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 group hover:scale-105">
                      <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-3`}
                        style={{ filter: 'drop-shadow(0 0 20px rgba(255,0,153,0.5))' }}
                      >
                        {item.year}
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3">{item.title}</h3>
                      <p className="text-base md:text-lg text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Glowing Dot */}
                  <div className={`hidden lg:flex w-6 h-6 rounded-full bg-gradient-to-r ${item.gradient} border-4 border-[#05060A] flex-shrink-0`}
                    style={{
                      boxShadow: `0 0 30px ${index % 2 === 0 ? '#FF0099' : '#00FFFF'}80`,
                      filter: `drop-shadow(0 0 10px ${index % 2 === 0 ? '#FF0099' : '#00FFFF'})`
                    }}
                  ></div>

                  {/* Spacer */}
                  <div className="hidden lg:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Offices - 24/7 Operations */}
        <div className="mb-20">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-full mb-6">
              <Clock className="w-5 h-5 text-[#00FFFF]" />
              <span className="text-white font-black tracking-wide">24/7 Global Operations</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,255,0.5)' }}>Worldwide</span> Presence
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Four strategic offices across the globe ensuring round-the-clock service and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="group relative p-8 md:p-10 bg-black/50 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
                style={{
                  borderColor: `${office.glow}40`,
                  boxShadow: `0 0 40px ${office.glow}20`
                }}
              >
                {office.isHQ && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#FF0099]/20 border-2 border-[#FF0099]/50 rounded-lg backdrop-blur-sm">
                    <span className="text-xs font-black text-[#FF0099]" style={{ textShadow: '0 0 10px #FF009980' }}>
                      HEADQUARTERS
                    </span>
                  </div>
                )}

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${office.glow}30, transparent 70%)` }}
                ></div>

                <div className="relative z-10">
                  <MapPin
                    className="w-10 h-10 mb-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: office.glow, filter: `drop-shadow(0 0 15px ${office.glow}80)` }}
                  />
                  <h3 className="text-2xl font-black text-white mb-1">{office.city}</h3>
                  <p className="font-black text-white/70 mb-2">{office.country}</p>
                  <p className="text-sm text-white/60 mb-3">{office.address}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                    <Clock className="w-3.5 h-3.5" style={{ color: office.glow }} />
                    <span className="text-xs font-black text-white/80">{office.timezone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Ultra-Premium */}
        <div className="relative p-12 md:p-16 lg:p-20 bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10 text-center">
            <Sparkles className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Ready to Start Your <span className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] bg-clip-text text-transparent">Next Project?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              Let's discuss how we can help transform your business with cutting-edge technology solutions delivered with 100% success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF0099] to-[#DD00FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,153,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#FF0099]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-white text-lg font-black tracking-wide">Get in Touch</span>
                <ArrowRight className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00FFFF]/50 hover:shadow-[0_20px_60px_rgba(0,255,255,0.3)] hover:-translate-y-1"
              >
                <span className="relative text-white text-lg font-black tracking-wide">View Services</span>
                <Code className="relative w-6 h-6 text-[#00FFFF]" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
