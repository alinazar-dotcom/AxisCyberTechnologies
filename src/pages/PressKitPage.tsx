import { Download, FileText, Image, Palette, Type, Users, Globe, Award, Mail, Phone, Link2, Calendar, TrendingUp, Briefcase, Code, Newspaper, BookOpen, Camera, Film, ExternalLink, CheckCircle, Package, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import axisCyberLogo from 'figma:asset/a263fa6f66fe3253d59bdb515c0453cac0011e78.png';

export function PressKitPage() {
  const companyFacts = [
    { label: 'Founded', value: '2012', color: '#DD00FF' },
    { label: 'Headquarters', value: 'Lahore, Pakistan', color: '#00FFFF' },
    { label: 'Global Offices', value: '4 (Lahore, Dubai, LA, London)', color: '#00FF9D' },
    { label: 'Team Size', value: '50+ Professionals', color: '#FF0099' },
    { label: 'Projects Delivered', value: '100+', color: '#FF7A00' },
    { label: 'Countries Served', value: '25+', color: '#DD00FF' },
    { label: 'Industry Focus', value: 'Enterprise Software', color: '#00FFFF' },
    { label: 'Specialization', value: 'AI/ML, Blockchain, Full-Stack', color: '#00FF9D' }
  ];

  const brandColors = [
    { name: 'Primary Cyan', hex: '#00E5FF', rgb: 'RGB(0, 229, 255)' },
    { name: 'Primary Magenta', hex: '#B900FF', rgb: 'RGB(185, 0, 255)' },
    { name: 'Primary Orange', hex: '#FF7A00', rgb: 'RGB(255, 122, 0)' },
    { name: 'Neon Pink', hex: '#FF0099', rgb: 'RGB(255, 0, 153)' },
    { name: 'Electric Cyan', hex: '#00FFFF', rgb: 'RGB(0, 255, 255)' },
    { name: 'Neon Purple', hex: '#DD00FF', rgb: 'RGB(221, 0, 255)' },
    { name: 'Dark Background', hex: '#05060A', rgb: 'RGB(5, 6, 10)' }
  ];

  const logoVariations = [
    {
      name: 'Primary Logo',
      description: 'Main logo for dark backgrounds',
      format: 'SVG, PNG',
      file: 'axis-logo-dark.svg'
    },
    {
      name: 'Light Logo',
      description: 'Logo variant for light backgrounds',
      format: 'SVG, PNG',
      file: 'axis-logo-light.svg'
    },
    {
      name: 'Icon Only',
      description: 'Brand icon without text',
      format: 'SVG, PNG',
      file: 'axis-icon.svg'
    },
    {
      name: 'Monochrome',
      description: 'Single color version',
      format: 'SVG, PNG',
      file: 'axis-logo-mono.svg'
    }
  ];

  const pressReleases = [
    {
      date: 'January 15, 2025',
      title: 'Axis Cyber Technologies Expands AI/ML Capabilities with New Innovation Lab',
      excerpt: 'Company announces major investment in artificial intelligence and machine learning research, positioning for next-generation software solutions.',
      category: 'Product Launch',
      color: '#DD00FF'
    },
    {
      date: 'November 10, 2024',
      title: 'Axis Cyber Reaches 100+ Successfully Delivered Projects Milestone with 100% Success',
      excerpt: 'Global software engineering firm celebrates major achievement, maintaining 100% client satisfaction across diverse industries.',
      category: 'Company News',
      color: '#00FFFF'
    },
    {
      date: 'September 5, 2024',
      title: 'New London Office Opening Strengthens European Presence',
      excerpt: 'Fourth global office enables 24/7 operations and enhanced service delivery across Europe, Middle East, and Africa.',
      category: 'Expansion',
      color: '#00FF9D'
    },
    {
      date: 'June 20, 2024',
      title: 'Axis Cyber Technologies Partners with Fortune 500 Companies for Blockchain Solutions',
      excerpt: 'Strategic partnerships demonstrate company\'s leadership in enterprise blockchain development and implementation.',
      category: 'Partnership',
      color: '#FF0099'
    }
  ];

  const mediaAssets = [
    {
      category: 'Leadership Photos',
      icon: Camera,
      color: '#DD00FF',
      items: [
        'Omer Abbas - Founder & CTO (High-res)',
        'Muneeb Rehman - CEO (High-res)',
        'Ali Rehman - BDE (High-res)',
        'Full Leadership Team Photo'
      ]
    },
    {
      category: 'Office Photos',
      icon: Image,
      color: '#00FFFF',
      items: [
        'Lahore HQ - Exterior & Interior',
        'Dubai Office - Workspace',
        'Los Angeles Office - Team',
        'London Office - Innovation Lab'
      ]
    },
    {
      category: 'Product Screenshots',
      icon: Film,
      color: '#00FF9D',
      items: [
        'AI/ML Solutions Interface',
        'Blockchain Dashboard',
        'Mobile App Samples',
        'Web Platform Examples'
      ]
    },
    {
      category: 'Brand Assets',
      icon: Palette,
      color: '#FF0099',
      items: [
        'Logo Package (All Formats)',
        'Brand Guidelines PDF',
        'Color Palette Swatches',
        'Typography Samples'
      ]
    }
  ];

  const statistics = [
    { value: '13+', label: 'Years of Excellence', icon: Award, color: '#DD00FF' },
    { value: '100+', label: 'Projects Delivered', icon: Briefcase, color: '#00FFFF' },
    { value: '50+', label: 'Expert Team Members', icon: Users, color: '#00FF9D' },
    { value: '4', label: 'Global Locations', icon: Globe, color: '#FF0099' },
    { value: '25+', label: 'Countries Served', icon: TrendingUp, color: '#FF7A00' },
    { value: '100%', label: 'Client Satisfaction', icon: CheckCircle, color: '#DD00FF' }
  ];

  const mediaContact = {
    name: 'Media Relations Team',
    email: 'press@axiscyber.tech',
    phone: '+92 (0) 300 1234567',
    website: 'www.axiscyber.tech',
    linkedin: 'linkedin.com/company/axis-cyber-technologies'
  };

  const downloadableResources = [
    {
      name: 'Complete Press Kit',
      description: 'All brand assets, fact sheet, and press releases',
      size: '15 MB',
      format: 'ZIP',
      icon: Package,
      color: '#DD00FF'
    },
    {
      name: 'Brand Guidelines',
      description: 'Comprehensive brand usage guide',
      size: '2.5 MB',
      format: 'PDF',
      icon: BookOpen,
      color: '#00FFFF'
    },
    {
      name: 'Logo Package',
      description: 'All logo variations in multiple formats',
      size: '5 MB',
      format: 'ZIP',
      icon: Image,
      color: '#00FF9D'
    },
    {
      name: 'Fact Sheet',
      description: 'Company overview and key statistics',
      size: '500 KB',
      format: 'PDF',
      icon: FileText,
      color: '#FF0099'
    },
    {
      name: 'Leadership Photos',
      description: 'High-resolution executive headshots',
      size: '8 MB',
      format: 'ZIP',
      icon: Camera,
      color: '#FF7A00'
    },
    {
      name: 'Recent Press Releases',
      description: 'Latest company announcements',
      size: '1 MB',
      format: 'PDF',
      icon: Newspaper,
      color: '#DD00FF'
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
            <Newspaper className="w-5 h-5 text-[#DD00FF]" />
            <span className="text-white font-black tracking-wide">Press Kit</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Media & <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,0,255,0.5)]">Press Resources</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
            Everything you need to cover Axis Cyber Technologies. Download our press kit, brand assets, 
            and latest company information for media coverage and publications.
          </p>

          {/* Quick Download */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(221,0,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#DD00FF]/30">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <Download className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
              <span className="relative text-white text-lg font-black tracking-wide">Download Complete Press Kit</span>
            </button>
            <a
              href={`mailto:${mediaContact.email}`}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FF9D]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00FF9D]/50 hover:shadow-[0_20px_60px_rgba(0,255,157,0.3)] hover:-translate-y-1"
            >
              <Mail className="w-6 h-6 text-white" />
              <span className="text-white text-lg font-black tracking-wide">Contact Media Team</span>
            </a>
          </div>
        </div>

        {/* Company Overview */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                Company <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Overview</span>
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Quick facts and essential information about Axis Cyber Technologies.
              </p>
            </div>

            {/* Boilerplate */}
            <div className="p-10 md:p-12 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/20 rounded-[2rem] mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
                <FileText className="w-7 h-7 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
                Company Boilerplate
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
                Axis Cyber Technologies is a global software engineering company founded in 2012, specializing in 
                AI/ML, blockchain, full-stack development, cloud/DevOps, mobile applications, and gaming/WebGL solutions. 
                With headquarters in Lahore, Pakistan, and offices in Dubai, Los Angeles, and London, the company 
                operates 24/7 to serve clients across 25+ countries with 100% success.
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Led by Founder & CTO Omer Abbas, Axis Cyber has delivered 100+ successful projects for Fortune 500 
                companies and innovative startups alike. The company's 50+ member team combines technical excellence 
                with creative problem-solving to build next-generation software solutions that drive business transformation with 100% commitment.
              </p>
            </div>

            {/* Company Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {companyFacts.map((fact, index) => (
                <div
                  key={index}
                  className="group p-6 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                  style={{
                    borderColor: `${fact.color}30`,
                    boxShadow: `0 0 30px ${fact.color}15`
                  }}
                >
                  <div className="text-xs text-white/60 mb-2 font-black">{fact.label}</div>
                  <div className="text-sm md:text-base font-black text-white">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                By the <span className="bg-gradient-to-r from-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">Numbers</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statistics.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 text-center"
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
                    <div className="text-xs text-white/70 font-black">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brand Assets */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                Brand <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Assets</span>
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Official logos, colors, and brand guidelines for media use.
              </p>
            </div>

            {/* Logo Variations */}
            <div className="mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
                <Image className="w-6 h-6 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 15px #00FFFF80)' }} />
                Logo Variations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logoVariations.map((logo, index) => (
                  <div
                    key={index}
                    className="group p-8 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="h-48 bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl flex items-center justify-center mb-6 border-2 border-white/[0.05] p-8">
                      {/* Real Axis Cyber Logo */}
                      <div className="relative flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.04] p-1 border-2 border-white/[0.1]">
                          <div className="w-full h-full rounded-xl bg-[#0A0A14] flex items-center justify-center p-2">
                            <img 
                              src={axisCyberLogo} 
                              alt="Axis Cyber Logo" 
                              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,229,255,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-3xl font-black tracking-tight leading-none">
                            <span className="bg-gradient-to-r from-[#00FFFF] via-[#DD00FF] to-[#FF0099] bg-clip-text text-transparent">
                              AXIS
                            </span>
                            <span className="text-white ml-2">CYBER</span>
                          </span>
                          <span className="text-[10px] text-white/50 font-black tracking-[0.2em] uppercase -mt-0.5">
                            Technologies
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-3">{logo.name}</h4>
                    <p className="text-sm md:text-base text-white/70 mb-4">{logo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60 font-black">{logo.format}</span>
                      <button className="px-6 py-3 bg-white/[0.04] border-2 border-[#00FFFF]/30 rounded-2xl text-sm text-white hover:bg-white/[0.08] hover:border-[#00FFFF]/50 transition-all duration-300 flex items-center gap-2 font-black">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Colors */}
            <div className="mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
                <Palette className="w-6 h-6 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 15px #00FF9D80)' }} />
                Brand Colors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {brandColors.map((color, index) => (
                  <div
                    key={index}
                    className="p-6 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                    style={{
                      borderColor: `${color.hex}30`,
                      boxShadow: `0 0 30px ${color.hex}15`
                    }}
                  >
                    <div
                      className="w-full h-24 rounded-2xl mb-4 border-2"
                      style={{ backgroundColor: color.hex, borderColor: `${color.hex}40` }}
                    ></div>
                    <div className="text-xs font-black text-white mb-2">{color.name}</div>
                    <div className="text-xs text-white/60 mb-1 font-black">{color.hex}</div>
                    <div className="text-xs text-white/50 font-black">{color.rgb}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
                <Type className="w-6 h-6 text-[#FF7A00]" style={{ filter: 'drop-shadow(0 0 15px #FF7A0080)' }} />
                Typography
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-10 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/20 rounded-3xl">
                  <div className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                    Space Grotesk
                  </div>
                  <p className="text-base text-white/70 mb-2 font-black">Primary Font - Headings</p>
                  <p className="text-sm text-white/60">Used for headlines, titles, and emphasis</p>
                </div>
                <div className="p-10 bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20 rounded-3xl">
                  <div className="text-5xl text-white mb-4" style={{ fontFamily: 'Inter' }}>
                    Inter
                  </div>
                  <p className="text-base text-white/70 mb-2 font-black">Secondary Font - Body Text</p>
                  <p className="text-sm text-white/60">Used for paragraphs, descriptions, and UI elements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                Recent <span className="bg-gradient-to-r from-[#FF0099] to-[#FF7A00] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Press Releases</span>
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Latest company announcements and news.
              </p>
            </div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    borderColor: `${release.color}30`,
                    boxShadow: `0 0 30px ${release.color}15`
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-2 border-2 rounded-2xl text-sm font-black backdrop-blur-sm"
                          style={{
                            backgroundColor: `${release.color}20`,
                            borderColor: `${release.color}40`,
                            color: release.color
                          }}
                        >
                          {release.category}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-white/60 font-black">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-4">
                        {release.title}
                      </h3>
                      <p className="text-base md:text-lg text-white/70 leading-relaxed">{release.excerpt}</p>
                    </div>
                    <button className="px-6 py-3 bg-white/[0.04] border-2 border-white/10 rounded-2xl text-sm text-white hover:bg-white/[0.08] transition-all duration-300 flex items-center gap-2 self-start font-black">
                      <FileText className="w-4 h-4" />
                      Read Full Release
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Assets */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                Media <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,157,0.5)]">Assets</span>
              </h2>
              <p className="text-base md:text-lg text-white/70">
                High-resolution photos and visual resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaAssets.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                    style={{
                      borderColor: `${asset.color}30`,
                      boxShadow: `0 0 30px ${asset.color}15`
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-3xl border-2 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${asset.color}30, ${asset.color}10)`,
                          borderColor: `${asset.color}40`,
                          boxShadow: `0 10px 40px ${asset.color}30`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: asset.color }} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white">{asset.category}</h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {asset.items.map((item, idx) => (
                        <li key={idx} className="text-base text-white/80 flex items-start gap-3 font-black">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" 
                            style={{ color: asset.color, filter: `drop-shadow(0 0 10px ${asset.color}80)` }} 
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="group/btn relative w-full px-6 py-4 bg-gradient-to-r rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 active:translate-y-0 border-2 flex items-center justify-center gap-3"
                      style={{
                        background: `linear-gradient(135deg, ${asset.color}20, ${asset.color}10)`,
                        borderColor: `${asset.color}40`
                      }}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <Download className="relative w-5 h-5 text-white" />
                      <span className="relative text-base text-white font-black">Download {asset.category}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
                Download <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Resources</span>
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Quick access to all press materials and documents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadableResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105"
                    style={{
                      borderColor: `${resource.color}30`,
                      boxShadow: `0 0 30px ${resource.color}15`
                    }}
                  >
                    <div className="w-16 h-16 rounded-3xl border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${resource.color}30, ${resource.color}10)`,
                        borderColor: `${resource.color}40`,
                        boxShadow: `0 10px 40px ${resource.color}30`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: resource.color }} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-3">{resource.name}</h3>
                    <p className="text-sm md:text-base text-white/70 mb-5">{resource.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-white/60 font-black">{resource.format}</span>
                      <span className="text-sm text-white/60 font-black">{resource.size}</span>
                    </div>
                    <button className="w-full px-6 py-3 bg-white/[0.04] border-2 border-white/10 rounded-2xl text-base text-white font-black hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Media Contact */}
        <div className="mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="p-10 md:p-12 lg:p-16 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-[2rem]">
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-3xl border-2 flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${('#DD00FF')}30, ${('#00FFFF')}20)`,
                    borderColor: '#DD00FF40',
                    boxShadow: `0 10px 40px ${('#DD00FF')}30`
                  }}
                >
                  <Mail className="w-10 h-10 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                  Media <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Contact</span>
                </h2>
                <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
                  For press inquiries, interviews, or additional information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <a
                  href={`mailto:${mediaContact.email}`}
                  className="group p-8 bg-white/[0.04] border-2 border-[#DD00FF]/30 rounded-3xl hover:bg-white/[0.08] hover:border-[#DD00FF]/50 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${('#DD00FF')}30, ${('#DD00FF')}10)`,
                      borderColor: '#DD00FF40'
                    }}
                  >
                    <Mail className="w-7 h-7 text-[#DD00FF]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-black">Email</div>
                    <div className="text-base font-black text-white">{mediaContact.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${mediaContact.phone}`}
                  className="group p-8 bg-white/[0.04] border-2 border-[#00FFFF]/30 rounded-3xl hover:bg-white/[0.08] hover:border-[#00FFFF]/50 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${('#00FFFF')}30, ${('#00FFFF')}10)`,
                      borderColor: '#00FFFF40'
                    }}
                  >
                    <Phone className="w-7 h-7 text-[#00FFFF]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-black">Phone</div>
                    <div className="text-base font-black text-white">{mediaContact.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://${mediaContact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-white/[0.04] border-2 border-[#00FF9D]/30 rounded-3xl hover:bg-white/[0.08] hover:border-[#00FF9D]/50 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${('#00FF9D')}30, ${('#00FF9D')}10)`,
                      borderColor: '#00FF9D40'
                    }}
                  >
                    <Globe className="w-7 h-7 text-[#00FF9D]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-black">Website</div>
                    <div className="text-base font-black text-white">{mediaContact.website}</div>
                  </div>
                </a>

                <a
                  href={`https://${mediaContact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-white/[0.04] border-2 border-[#FF7A00]/30 rounded-3xl hover:bg-white/[0.08] hover:border-[#FF7A00]/50 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${('#FF7A00')}30, ${('#FF7A00')}10)`,
                      borderColor: '#FF7A0040'
                    }}
                  >
                    <Link2 className="w-7 h-7 text-[#FF7A00]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-black">LinkedIn</div>
                    <div className="text-base font-black text-white">Company Page</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative p-12 md:p-16 bg-black/60 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-[2rem] text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#DD00FF]/10 via-[#00FFFF]/10 to-[#00FF9D]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>
          
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-[#DD00FF] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #DD00FF80)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Need Additional <span className="bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Information?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our media team is available to provide additional resources, arrange interviews, 
              or answer any questions you may have.
            </p>
            <a
              href={`mailto:${mediaContact.email}`}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(221,0,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#DD00FF]/30"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <Mail className="relative w-6 h-6 text-white" />
              <span className="relative text-white text-lg font-black tracking-wide">Contact Media Relations</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
