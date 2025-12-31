'use client';

import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Sparkles, Shield, Award, Globe, Heart, ChevronRight, ExternalLink, MessageCircle, Send, Zap, Clock, TrendingUp, Users, CheckCircle2, Rocket, Building2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { GradientText } from './ui/GradientText';
import { supabase } from '@/lib/supabase';
import { useSiteSettings } from '../hooks/useSiteSettings';

export function Footer() {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Live time for offices
  const [times, setTimes] = useState({
    lahore: '',
    dubai: '',
    losAngeles: '',
    london: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        lahore: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true }),
        dubai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: true }),
        losAngeles: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true }),
        london: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: true })
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(href);
      }, 100);
    } else {
      scrollToSection(href);
    }
  };

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    if (email) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');

      try {
        const { data, error } = await supabase
          .from('newsletter_subscriptions')
          .insert([{ email, source: 'website_footer' }])
          .select();

        if (error) {
          // Handle unique constraint violation gracefully
          if (error.code === '23505') {
            setSubmitStatus('error');
            setErrorMessage('This email is already subscribed!');
          } else {
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to subscribe. Please try again.');
          }
        } else {
          setSubmitStatus('success');
          setEmail('');
          setShowValidation(false);
          // Auto-hide success message after 5 seconds
          setTimeout(() => setSubmitStatus('idle'), 5000);
        }
      } catch (error) {
        setSubmitStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setShowValidation(true);
      // Prevent default browser validation
      setTimeout(() => setShowValidation(false), 5000); // Auto hide after 5 seconds
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

  const company = [
    { label: 'About Us', to: '/about' },
    { label: 'Leadership', to: '/leadership' },
    { label: 'Our Story', to: '/story' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press Kit', to: '/press-kit' },
  ];

  const resources = [
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Tech Blog', to: '/blog', hidden: settings?.enable_blog === false },
    { label: 'Contact Us', to: '/contact' },
  ].filter(item => !item.hidden);

  const legal = [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookie-policy' },
  ];

  const offices = [
    {
      city: 'Lahore',
      country: 'Pakistan',
      flag: '🇵🇰',
      role: 'Global Headquarters',
      time: times.lahore,
      color: 'neon-green'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      role: 'Middle East Hub',
      time: times.dubai,
      color: 'neon-cyan'
    },
    {
      city: 'Los Angeles',
      country: 'USA',
      flag: '🇺🇸',
      role: 'Americas Hub',
      time: times.losAngeles,
      color: 'neon-purple'
    },
    {
      city: 'London',
      country: 'UK',
      flag: '🇬🇧',
      role: 'Europe Hub',
      time: times.london,
      color: 'neon-pink'
    }
  ];

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t-2 border-[var(--border-purple)] overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--neon-purple)] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column - Spans 3 columns */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-[1px] border border-white/[0.1]">
                  <div className="w-full h-full rounded-[11px] bg-[var(--bg-primary)] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[var(--neon-cyan)] drop-shadow-[0_0_8px_var(--glow-cyan)]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black">
                  <GradientText variant="cyan-purple">AXIS CYBER</GradientText>
                </span>
                <span className="text-body-tiny text-white/40 font-bold tracking-widest uppercase mt-0.5">
                  Technologies
                </span>
              </div>
            </Link>

            <p className="text-body-small text-white/60 mb-6 leading-relaxed">
              {settings?.site_description || (
                <>Engineering the future. Building the impossible. Next-generation software solutions with <span className="text-[var(--neon-green)] font-black">100% success rate</span>.</>
              )}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: settings?.twitter_url || 'https://twitter.com/axiscybertech', color: 'neon-cyan' },
                { icon: Linkedin, href: settings?.linkedin_url || 'https://linkedin.com/company/axiscybertech', color: 'neon-purple' },
                { icon: Github, href: settings?.github_url || 'https://github.com/axiscybertech', color: 'neon-pink' }
              ].filter(link => link.href).map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/social p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[var(--${social.color})]/30 hover:bg-[var(--${social.color})]/5 transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className={`w-4 h-4 text-white/40 group-hover/social:text-[var(--${social.color})] transition-colors duration-300`} />
                </a>
              ))}
            </div>
          </div>

          {/* Services - Spans 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-body-small font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--neon-cyan)]" />
              Services
            </h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service, idx) => (
                <li key={idx}>
                  <Link to={service.to} className="footer-link text-body-small flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 opacity-50" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries & Company - Spans 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-body-small font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[var(--neon-purple)]" />
                Industries
              </h3>
              <ul className="space-y-2">
                {industries.slice(0, 4).map((industry, idx) => (
                  <li key={idx}>
                    <Link to={industry.to} className="footer-link text-body-small flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 opacity-50" />
                      {industry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-body-small font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[var(--neon-green)]" />
                Company
              </h3>
              <ul className="space-y-2">
                {company.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.to} className="footer-link text-body-small flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 opacity-50" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter - Spans 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-body-small font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-[var(--neon-pink)]" />
              Stay Updated
            </h3>
            <p className="text-body-small text-white/60 mb-4">
              Get the latest tech insights and updates delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (showValidation) setShowValidation(false);
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border-2 border-[var(--border-purple)] text-white placeholder:text-white/30 focus:border-[var(--neon-purple)] focus:outline-none transition-colors duration-300 text-body-small peer"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                {/* Custom Cyberpunk Validation Tooltip */}
                {showValidation && !email && (
                  <div className="absolute left-0 -bottom-2 translate-y-full z-50 animate-fade-in">
                    <div className="relative">
                      {/* Triangle arrow pointing up */}
                      <div className="absolute -top-[10px] left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[var(--neon-pink)]"></div>

                      {/* Tooltip card with cyberpunk styling */}
                      <div className="relative bg-gradient-to-br from-[var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-cyan)] p-[2px] rounded-xl shadow-[0_0_30px_rgba(255,0,153,0.6)]">
                        <div className="bg-[#0A0B14] rounded-[10px] px-4 py-3">
                          <div className="flex items-center gap-3">
                            {/* Glowing icon */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-[var(--neon-pink)] rounded-full blur-md opacity-60"></div>
                              <div className="relative w-6 h-6 rounded-full bg-[var(--neon-pink)] flex items-center justify-center border-2 border-white/20">
                                <Zap className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-0.5">
                              <span className="text-white font-black text-xs uppercase tracking-wide">Validation Error</span>
                              <span className="text-white/80 text-xs">Please fill out this field</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                iconRight={ArrowUpRight}
                className="w-full hover:shadow-[0_0_30px_var(--glow-purple)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>

              {/* Submission Status Messages */}
              {submitStatus === 'success' && (
                <div className="text-sm text-[var(--neon-green)] font-bold mt-2">
                  Thank you for subscribing!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-sm text-[var(--neon-red)] font-bold mt-2">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Global Offices Section - ENHANCED */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-3">
              <div className="relative">
                <Globe className="w-6 h-6 text-[var(--neon-cyan)]" />
                <div className="absolute inset-0 blur-md">
                  <Globe className="w-6 h-6 text-[var(--neon-cyan)]" />
                </div>
              </div>
              24/7 Global Operations
              <div className="flex gap-1.5 ml-2">
                <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, idx) => {
              const colors = ['#FF0099', '#00FFFF', '#DD00FF', '#00FF9D'];
              const gradients = [
                'from-[#FF0099]/20 to-transparent',
                'from-[#00FFFF]/20 to-transparent',
                'from-[#DD00FF]/20 to-transparent',
                'from-[#00FF9D]/20 to-transparent'
              ];
              // Adjust colors/gradients index based on actual filtered index if needed, or just cycle
              const colorIdx = idx % colors.length;
              const color = colors[colorIdx];
              const gradient = gradients[colorIdx];

              return (
                <div
                  key={idx}
                  className="group relative"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${color}, transparent)`,
                    }}
                  ></div>

                  {/* Card */}
                  <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-2 border-white/[0.1] group-hover:border-white/30 backdrop-blur-sm transition-all duration-500 overflow-hidden">

                    {/* Top gradient bar */}
                    <div
                      className={`h-1 bg-gradient-to-r ${gradient}`}
                      style={{ backgroundColor: color }}
                    ></div>

                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-500">
                          {office.flag}
                        </div>
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 transition-all duration-300"
                          style={{
                            backgroundColor: `${color}15`,
                            borderColor: color
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{
                              backgroundColor: color,
                              boxShadow: `0 0 8px ${color}`
                            }}
                          ></div>
                          <Clock className="w-3.5 h-3.5" style={{ color: color }} />
                        </div>
                      </div>

                      {/* City & Country */}
                      <h4 className="font-black text-white text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${color}, white)`
                        }}
                      >
                        {office.city}
                      </h4>
                      <p className="text-sm text-white/50 font-bold mb-4">{office.role}</p>

                      {/* Time Display */}
                      <div
                        className="p-3 rounded-xl border-2 transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          backgroundColor: `${color}10`,
                          borderColor: `${color}40`,
                          boxShadow: `0 0 0 ${color}00, 0 0 20px ${color}40`
                        }}
                      >
                        <p className="text-xs text-white/40 font-bold mb-1">Local Time</p>
                        <p
                          className="text-2xl font-black font-mono tracking-tight"
                          style={{
                            color: color,
                            textShadow: `0 0 20px ${color}80`
                          }}
                        >
                          {office.time || 'Loading...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <div className="flex items-center gap-2 text-body-small text-white/50">
              <span>© {currentYear} {settings?.company_name || 'Axis Cyber Technologies'}.</span>
              <span className="hidden lg:inline">|</span>
              <span className="flex items-center gap-1">
                Built with <Heart className="w-3 h-3 text-[var(--neon-pink)] fill-current" /> in Pakistan
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {legal.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="text-body-small text-white/50 hover:text-[var(--neon-cyan)] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}