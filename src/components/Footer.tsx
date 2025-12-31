import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Sparkles, Shield, Award, Globe, Heart, ChevronRight, ExternalLink, MessageCircle, Send, Zap, Clock, TrendingUp, Users, CheckCircle2, Rocket } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { sendNewsletterConfirmation } from '../lib/email';
import axisCyberLogo from 'figma:asset/a263fa6f66fe3253d59bdb515c0453cac0011e78.png';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [times, setTimes] = useState({
    lahore: '',
    dubai: '',
    losAngeles: '',
    london: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };

      setTimes({
        lahore: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Karachi' }).format(new Date()),
        dubai: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Dubai' }).format(new Date()),
        losAngeles: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'America/Los_Angeles' }).format(new Date()),
        london: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Europe/London' }).format(new Date())
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollLink = (e: React.MouseEvent, href?: string) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      setValidationMessage('Please fill out this field');
      setShowValidation(true);
      return;
    }

    if (!email.includes('@')) {
      setValidationMessage("Please include an '@' in the email address");
      setShowValidation(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage('Please enter a valid email address');
      setShowValidation(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, source: 'website_footer' }]);



      if (error) {
        if (error.code === '23505') {
          setValidationMessage('This email is already subscribed!');
        } else {
          setValidationMessage('Failed to subscribe. Please try again.');
        }
        setShowValidation(true);
        setSubmitStatus('error');
      } else {
        // Send welcome email
        sendNewsletterConfirmation({ email }).catch(console.error);

        setSubmitStatus('success');
        setEmail('');
        setShowValidation(false);
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (err) {
      setSubmitStatus('error');
      setValidationMessage('An unexpected error occurred.');
      setShowValidation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { label: 'AI & Machine Learning', to: '/services/ai-ml' },
    { label: 'Blockchain & Web3', to: '/services/blockchain' },
    { label: 'Enterprise Software', to: '/services/enterprise-software' },
    { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
    { label: 'Mobile Development', to: '/services/mobile-apps' },
    { label: 'Gaming & WebGL', to: '/services/gaming-webgl' },
    { label: 'Cybersecurity', to: '/services/cybersecurity' },
    { label: 'Data Engineering', to: '/services/data-engineering' },
    { label: 'API Integration', to: '/services/api-integration' },
    { label: 'Performance Optimization', to: '/services/performance' },
    { label: 'IoT & Edge Computing', to: '/services/iot-edge' },
    { label: 'Product & UX Design', to: '/services/product-ux' }
  ];

  const industries = [
    { label: 'Financial Services', to: '/industries/financial-services' },
    { label: 'Blockchain & DLT', to: '/industries/blockchain' },
    { label: 'Healthcare & Life Sciences', to: '/industries/healthcare' },
    { label: 'Defense & Aerospace', to: '/industries/defense-aerospace' },
    { label: 'Energy & Utilities', to: '/industries/energy-utilities' },
    { label: 'Telecommunications & 5G', to: '/industries/telecommunications' },
    { label: 'Supply Chain & Logistics', to: '/industries/supply-chain' },
    { label: 'Manufacturing & Industry 4.0', to: '/industries/manufacturing' },
    { label: 'Insurance & Risk Management', to: '/industries/insurance' }
  ];

  const techCategories = [
    'Frontend Frameworks',
    'Backend & APIs',
    'Cloud Platforms',
    'Database Systems',
    'AI/ML Tools',
    'Blockchain Networks'
  ];

  const company = [
    { label: 'About Us', to: '/about', type: 'route' },
    { label: 'Our Story', to: '/story', type: 'route' },
    { label: 'Leadership Team', to: '/leadership', type: 'route' },
    { label: 'Careers', to: '/careers', type: 'route', badge: 'Hiring' },
    { label: 'Press Kit', to: '/press-kit', type: 'route' },
    { label: 'Contact Us', to: '/contact', type: 'route' }
  ];

  const resources = [
    { label: 'Case Studies', to: '/case-studies', type: 'route' },
    { label: 'Tech Blog', to: '/blog', type: 'route' },
    { label: 'Whitepapers', href: '#resources', external: true },
    { label: 'Documentation', href: '#docs', external: true },
    { label: 'API Reference', href: '#api', external: true },
    { label: 'Developer Portal', href: '#dev', external: true }
  ];

  const globalOffices = [
    {
      city: 'Lahore',
      country: 'Pakistan',
      status: 'HQ',
      time: times.lahore,
      color: 'from-[#FF0099] to-[#B900FF]',
      glowColor: 'rgba(255, 0, 153, 0.3)'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      status: 'Regional',
      time: times.dubai,
      color: 'from-[#00FFFF] to-[#00E5FF]',
      glowColor: 'rgba(0, 255, 255, 0.3)'
    },
    {
      city: 'Los Angeles',
      country: 'USA',
      status: 'Regional',
      time: times.losAngeles,
      color: 'from-[#FF7A00] to-[#FF0099]',
      glowColor: 'rgba(255, 122, 0, 0.3)'
    },
    {
      city: 'London',
      country: 'UK',
      status: 'Regional',
      time: times.london,
      color: 'from-[#DD00FF] to-[#B900FF]',
      glowColor: 'rgba(221, 0, 255, 0.3)'
    }
  ];

  const stats = [
    {
      value: '500+',
      label: 'Projects Delivered',
      icon: Rocket,
      color: 'from-[#00FFFF] to-[#00E5FF]'
    },
    {
      value: '100%',
      label: 'Success Rate',
      icon: CheckCircle2,
      color: 'from-[#FF0099] to-[#B900FF]'
    },
    {
      value: '13',
      label: 'Years Experience',
      icon: TrendingUp,
      color: 'from-[#DD00FF] to-[#B900FF]'
    },
    {
      value: '24/7',
      label: 'Global Operations',
      icon: Globe,
      color: 'from-[#FF7A00] to-[#FF0099]'
    }
  ];

  return (
    <footer id="contact" className="bg-[#05060A] border-t border-white/[0.12] relative overflow-hidden">
      {/* Enhanced Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#FF0099]/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00FFFF]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DD00FF]/5 rounded-full blur-[120px]"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Stats Section - NEW */}
        <div className="py-12 md:py-16 lg:py-20 border-b border-white/[0.08]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative bg-white/[0.02] border border-white/[0.12] rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:border-white/[0.2] transition-all duration-500 hover:scale-105 overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} mb-3 md:mb-4 shadow-lg`}>
                      <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    <div className={`text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1 md:mb-2`}>
                      {stat.value}
                    </div>

                    <div className="text-xs md:text-sm lg:text-base text-white/70 font-semibold">
                      {stat.label}
                    </div>
                  </div>

                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stat.color.includes('00FFFF') ? 'rgba(0, 255, 255, 0.5)' : stat.color.includes('FF0099') ? 'rgba(255, 0, 153, 0.5)' : stat.color.includes('DD00FF') ? 'rgba(221, 0, 255, 0.5)' : 'rgba(255, 122, 0, 0.5)'}, transparent)`,
                      animation: 'shimmer 2s infinite',
                      backgroundSize: '200% 100%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section - Enhanced */}
        <div className="py-12 md:py-16 lg:py-20 border-b border-white/[0.08]">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#FF0099]/10 to-[#00FFFF]/10 border border-white/[0.15] rounded-full shadow-[0_0_30px_rgba(255,0,153,0.2)]">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#FF0099] animate-pulse" />
              <span className="text-sm md:text-base text-white font-bold tracking-wide">Stay Updated</span>
              <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
            </div>

            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black px-4">
              Join Our <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent animate-gradient">Tech Newsletter</span>
            </h3>

            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
              Get exclusive insights on emerging technologies, industry trends, and innovation updates delivered monthly.
            </p>

            {/* Enhanced Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto pt-2 md:pt-4 px-4" noValidate>
              <div className="flex-1 relative group">
                <Mail className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/50 group-focus-within:text-[#00FFFF] transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (showValidation) setShowValidation(false);
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-white/[0.05] border-2 border-white/[0.12] rounded-xl md:rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#00FFFF]/50 focus:bg-white/[0.08] transition-all duration-300 text-sm md:text-base shadow-[0_0_20px_rgba(0,0,0,0.3)] focus:shadow-[0_0_30px_rgba(0,255,255,0.2)]"
                />

                {/* Custom Cyberpunk Validation Tooltip */}
                {showValidation && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full z-50 w-max max-w-[250px] md:max-w-xs">
                    <div className="relative animate-fade-in">
                      {/* Triangle arrow pointing up */}
                      <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#FF0099]"></div>

                      {/* Tooltip card */}
                      <div className="bg-[#0A0B14] border-2 border-[#FF0099] rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(255,0,153,0.5)]">
                        <div className="flex items-start gap-2">
                          {/* Icon */}
                          <div className="w-5 h-5 rounded-full bg-[#FF0099]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Zap className="w-3 h-3 text-[#FF0099]" />
                          </div>

                          {/* Message */}
                          <span className="text-white text-xs font-semibold leading-relaxed">{validationMessage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full z-50">
                    <div className="relative animate-fade-in">
                      <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#00FF9D]"></div>
                      <div className="bg-[#0A0B14] border-2 border-[#00FF9D] rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(0,255,157,0.5)]">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#00FF9D]" />
                          </div>
                          <span className="text-white text-xs font-semibold whitespace-nowrap">Successfully subscribed!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="group relative px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 md:gap-3 border-2 border-[#00FFFF]/30"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-sm md:text-base font-black tracking-wide">Subscribe</span>
                <Send className="relative w-4 h-4 md:w-5 md:h-5 text-[#05060A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-white/60 px-4">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00FFFF]" />
                <span>10,000+ subscribers</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00FF9D]" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16">

            {/* Column 1: Company Info - 3 cols */}
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2.5 md:gap-3 group">
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] p-[1px] shadow-xl group-hover:shadow-2xl group-hover:shadow-[#00FFFF]/30 transition-all duration-300 group-hover:scale-110 border-2 border-white/[0.2]">
                  <div className="w-full h-full rounded-xl md:rounded-2xl bg-[#0A0A14] flex items-center justify-center p-2 md:p-2.5">
                    <img
                      src={axisCyberLogo}
                      alt="Axis Cyber Technologies"
                      className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tight leading-none">
                    <span className="bg-gradient-to-r from-[#00FFFF] via-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent">
                      AXIS
                    </span>
                    <span className="text-white ml-1.5 md:ml-2">CYBER</span>
                  </span>
                  <span className="text-[10px] md:text-[11px] text-white/70 font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase -mt-0.5">
                    Technologies
                  </span>
                </div>
              </Link>

              <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                Next-generation software engineering for forward-thinking enterprises. Building the future with cutting-edge technology.
              </p>

              {/* 24/7 Operations Badge */}
              <div className="relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#00FF9D]/10 to-[#00FFFF]/10 border-2 border-[#00FF9D]/30 rounded-lg md:rounded-xl overflow-hidden group hover:border-[#00FF9D]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/5 to-[#00FFFF]/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative flex items-center gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#00FF9D] rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,157,0.6)]"></div>
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#00FF9D]" />
                </div>
                <div className="relative">
                  <div className="text-xs md:text-sm font-black text-white">24/7 Operations</div>
                  <div className="text-[10px] md:text-xs text-white/70 font-semibold">Always Active • Global Coverage</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <a href="tel:+923001234567" className="flex items-center gap-4 group hover:translate-x-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFFF]/20 to-[#00FFFF]/5 border border-[#00FFFF]/30 flex items-center justify-center group-hover:border-[#00FFFF]/50 transition-all duration-300">
                    <Phone className="w-5 h-5 text-[#00FFFF]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 font-semibold">Call Us</div>
                    <div className="text-sm text-white/90 font-bold group-hover:text-white transition-colors duration-200">+92 300 1234567</div>
                  </div>
                </a>

                <a href="mailto:info@axiscyber.tech" className="flex items-center gap-4 group hover:translate-x-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0099]/20 to-[#FF0099]/5 border border-[#FF0099]/30 flex items-center justify-center group-hover:border-[#FF0099]/50 transition-all duration-300">
                    <Mail className="w-5 h-5 text-[#FF0099]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 font-semibold">Email Us</div>
                    <div className="text-sm text-white/90 font-bold group-hover:text-white transition-colors duration-200">info@axiscyber.tech</div>
                  </div>
                </a>
              </div>

              {/* Trust Badges - Enhanced */}
              <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                <div className="px-3 md:px-4 py-2 md:py-2.5 bg-white/[0.04] border-2 border-[#00FF9D]/30 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 hover:border-[#00FF9D]/50 hover:bg-white/[0.06] transition-all duration-300 group">
                  <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00FF9D] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs md:text-sm text-white/80 font-black">ISO 27001</span>
                </div>
                <div className="px-3 md:px-4 py-2 md:py-2.5 bg-white/[0.04] border-2 border-[#DD00FF]/30 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 hover:border-[#DD00FF]/50 hover:bg-white/[0.06] transition-all duration-300 group">
                  <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#DD00FF] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs md:text-sm text-white/80 font-black">SOC 2</span>
                </div>
                <div className="px-3 md:px-4 py-2 md:py-2.5 bg-white/[0.04] border-2 border-[#00FFFF]/30 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 hover:border-[#00FFFF]/50 hover:bg-white/[0.06] transition-all duration-300 group">
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00FFFF] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs md:text-sm text-white/80 font-black">GDPR</span>
                </div>
              </div>
            </div>

            {/* Column 2: Services - 3 cols */}
            <div className="lg:col-span-3">
              <Link to="/services" className="text-white mb-5 md:mb-6 text-base md:text-lg font-black flex items-center gap-2 hover:text-[#DD00FF] transition-colors duration-200 w-fit group">
                <span>Services</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#DD00FF] group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 md:gap-3 text-sm">
                {services.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2.5 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DD00FF]/50 group-hover:bg-[#DD00FF] group-hover:shadow-[0_0_8px_rgba(221,0,255,0.6)] transition-all duration-200"></div>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Industries - 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-white mb-5 md:mb-6 text-base md:text-lg font-black flex items-center gap-2">
                <span>Industries</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#00FFFF]" />
              </h4>
              <ul className="space-y-2.5 md:space-y-3 text-sm">
                {industries.map((item, index) => (
                  <li key={index}>
                    <Link to={item.to} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2.5 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]/50 group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-200"></div>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Company & Resources - 4 cols */}
            <div className="lg:col-span-4 space-y-8 md:space-y-10">
              {/* Global Offices - NEW Enhanced */}
              <div>
                <h4 className="text-white mb-5 md:mb-6 text-base md:text-lg font-black flex items-center gap-2">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#FF0099]" />
                  <span>Global Offices</span>
                  <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {globalOffices.map((office, index) => (
                    <div
                      key={index}
                      className="group relative bg-white/[0.03] border border-white/[0.12] rounded-lg md:rounded-xl p-3 md:p-4 hover:border-white/[0.2] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                        style={{ background: `linear-gradient(135deg, ${office.glowColor}, transparent)` }}
                      ></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-2 md:mb-3">
                          <div>
                            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" />
                              <h5 className="text-sm md:text-base font-black text-white">{office.city}</h5>
                            </div>
                            <p className="text-[10px] md:text-xs text-white/60 font-semibold">{office.country}</p>
                          </div>
                          {office.status === 'HQ' && (
                            <span className={`px-2 md:px-2.5 py-0.5 md:py-1 bg-gradient-to-r ${office.color} rounded text-[9px] md:text-[10px] font-black text-white shadow-lg`}>
                              HQ
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs">
                          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/50" />
                          <span className={`font-bold bg-gradient-to-r ${office.color} bg-clip-text text-transparent`}>
                            {office.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company & Resources */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {/* Company */}
                <div>
                  <h4 className="text-white mb-4 md:mb-5 text-sm md:text-base font-black flex items-center gap-2">
                    <span>Company</span>
                    <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#DD00FF]" />
                  </h4>
                  <ul className="space-y-2.5 md:space-y-3 text-sm">
                    {company.map((item, index) => (
                      <li key={index}>
                        {item.type === 'route' ? (
                          <Link to={item.to} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#DD00FF]/50 group-hover:bg-[#DD00FF] group-hover:shadow-[0_0_8px_rgba(221,0,255,0.6)] transition-all duration-200"></div>
                            <span className="font-semibold">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-1 bg-[#00FF9D]/20 border border-[#00FF9D]/40 rounded-lg text-[10px] font-black text-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.3)]">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ) : (
                          <a href={item.to} onClick={(e) => handleScrollLink(e, item.to)} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#DD00FF]/50 group-hover:bg-[#DD00FF] group-hover:shadow-[0_0_8px_rgba(221,0,255,0.6)] transition-all duration-200"></div>
                            <span className="font-semibold">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-1 bg-[#00FF9D]/20 border border-[#00FF9D]/40 rounded-lg text-[10px] font-black text-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.3)]">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-white mb-4 md:mb-5 text-sm md:text-base font-black flex items-center gap-2">
                    <span>Resources</span>
                    <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00FFFF]" />
                  </h4>
                  <ul className="space-y-2.5 md:space-y-3 text-sm">
                    {resources.map((item, index) => (
                      <li key={index}>
                        {item.type === 'route' ? (
                          <Link to={item.to} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]/50 group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-200"></div>
                            <span className="font-semibold">{item.label}</span>
                          </Link>
                        ) : (
                          <a href={item.href} onClick={(e) => handleScrollLink(e, item.href)} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]/50 group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-200"></div>
                            <span className="font-semibold">{item.label}</span>
                            {item.external && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Quick Link */}
              <div className="relative group">
                <a
                  href="#tech-stack"
                  onClick={(e) => handleScrollLink(e, '#tech-stack')}
                  className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-[#FF0099]/10 via-[#DD00FF]/10 to-[#00FFFF]/10 border-2 border-white/[0.12] rounded-lg md:rounded-xl hover:border-white/[0.2] transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#FF0099] flex items-center justify-center shadow-lg">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm font-black text-white">View Tech Stack</div>
                      <div className="text-[10px] md:text-xs text-white/60 font-semibold">293 Technologies</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#00FFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar - Enhanced */}
        <div className="py-6 md:py-8 border-t border-white/[0.12]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-6">

            {/* Left - Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 text-center lg:text-left">
              <p className="text-xs md:text-sm text-white/60 flex items-center gap-2 md:gap-2.5 font-semibold">
                © {currentYear} Axis Cyber Technologies.
                <span className="hidden sm:inline">Made with</span>
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF0099] fill-[#FF0099] animate-pulse" />
                <span className="hidden sm:inline">in Lahore</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-5 text-xs md:text-sm">
                <Link to="/privacy" className="text-white/60 hover:text-[#DD00FF] transition-colors duration-200 font-semibold hover:underline underline-offset-4">
                  Privacy
                </Link>
                <Link to="/terms" className="text-white/60 hover:text-[#00FFFF] transition-colors duration-200 font-semibold hover:underline underline-offset-4">
                  Terms
                </Link>
                <Link to="/cookie-policy" className="text-white/60 hover:text-[#00FF9D] transition-colors duration-200 font-semibold hover:underline underline-offset-4">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Right - Social Icons - Enhanced */}
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="https://github.com/axiscybertech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl border-2 border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-white/70 hover:border-[#DD00FF]/50 hover:text-white hover:bg-gradient-to-br hover:from-[#DD00FF]/20 hover:to-transparent transition-all duration-300 group hover:shadow-[0_0_20px_rgba(221,0,255,0.3)]"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a
                href="https://twitter.com/axiscybertech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl border-2 border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-white/70 hover:border-[#00FFFF]/50 hover:text-white hover:bg-gradient-to-br hover:from-[#00FFFF]/20 hover:to-transparent transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a
                href="https://linkedin.com/company/axiscybertech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl border-2 border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-white/70 hover:border-[#FF0099]/50 hover:text-white hover:bg-gradient-to-br hover:from-[#FF0099]/20 hover:to-transparent transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,0,153,0.3)]"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a
                href="#contact"
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl border-2 border-white/[0.12] bg-white/[0.04] flex items-center justify-center text-white/70 hover:border-[#00FF9D]/50 hover:text-white hover:bg-gradient-to-br hover:from-[#00FF9D]/20 hover:to-transparent transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>

              {/* Scroll to top - Enhanced */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl border-2 border-white/[0.15] bg-gradient-to-br from-[#FF0099]/20 via-[#DD00FF]/20 to-[#00FFFF]/20 flex items-center justify-center text-white hover:border-white/[0.3] transition-all duration-300 group ml-2 md:ml-3 hover:shadow-[0_0_30px_rgba(255,0,153,0.4)] hover:-translate-y-1"
              >
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-125 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Add keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </footer>
  );
}