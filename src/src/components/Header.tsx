'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Code2, Briefcase, Lightbulb, Mail, Cpu, Layers, ArrowRight, Zap, Building2, BookOpen, Search, Globe, ChevronDown, Home, Users, FileText, Rocket } from 'lucide-react';
import { Button } from './ui/Button';
import { GradientText } from './ui/GradientText';
import { GlobalSearchAdvanced } from './GlobalSearchAdvanced';
import footerIcon from 'figma:asset/bdc13241391ec66d1f5995d4119d486872acccff.png';
import { useSiteSettings } from '../hooks/useSiteSettings';

export function Header() {
  const { settings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let closeTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only detect sections on home page
      if (pathname === '/') {
        const sections = ['hero', 'philosophy', 'services', 'tech-stack', 'case-studies', 'innovation', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Main navigation items
  const mainNavItems = [
    { label: 'Home', to: '/', type: 'route', icon: Home },
    { label: 'About', to: '/about', type: 'route', icon: Building2 },
    { label: 'Services', to: '/services', type: 'route', icon: Layers },
  ];

  // Resources dropdown items
  const resourcesItems = [
    { label: 'Case Studies', to: '/case-studies', icon: Briefcase, description: 'Real-world success stories' },
    { label: 'Tech Blog', to: '/blog', icon: BookOpen, description: 'Insights & industry trends', hidden: settings?.enable_blog === false },
    { label: 'Careers', to: '/careers', icon: Users, description: 'Join our global team' },
  ].filter(item => !item.hidden);

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    if (item.type === 'scroll') {
      e.preventDefault();

      // If not on home page, navigate to home first
      if (pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.href);
        }, 100);
      } else {
        scrollToSection(item.href);
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
      setIsResourcesOpen(false);
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

  const isActiveItem = (item: any) => {
    if (item.type === 'route') {
      return pathname === item.to;
    } else {
      return activeSection === item.href.substring(1);
    }
  };

  const isResourcesActive = resourcesItems.some(item => pathname === item.to);

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${isScrolled
          ? 'bg-[var(--bg-primary)]/98 backdrop-blur-2xl border-b border-white/[0.15] shadow-2xl shadow-[var(--neon-purple)]/10'
          : 'bg-gradient-to-b from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/50 to-transparent backdrop-blur-lg'
          }`}
      >
        {/* Animated glow effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-transparent via-[var(--neon-purple)] to-transparent transition-all duration-500 ${isScrolled ? 'opacity-50' : 'opacity-30'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent blur-sm opacity-50 animate-pulse"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 h-16 sm:h-18 md:h-20">

            {/* Logo - Premium Enhanced with Responsive Sizing */}
            <Link
              to="/"
              className="group flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 relative z-10 shrink-0"
            >
              {/* Logo Container - Same as Footer styling */}
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-[1px] border border-white/[0.1]">
                  <div className="w-full h-full rounded-[11px] bg-[var(--bg-primary)] flex items-center justify-center p-1.5">
                    <img
                      src={footerIcon}
                      alt={settings?.site_name || "Axis Cyber Logo"}
                      className="w-full h-full object-contain drop-shadow-[0_0_8px_var(--glow-cyan)]"
                    />
                  </div>
                </div>
              </div>

              {/* Text - Enhanced Typography with Responsive Sizing */}
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-black tracking-tight">
                  {/* If site_name is customizable and differs from default, show it as one block, otherwise show stylized split */}
                  {settings?.site_name && settings.site_name !== 'Axis Cyber Technologies' ? (
                    <GradientText
                      variant="cyan-purple"
                      className="drop-shadow-[0_2px_8px_var(--glow-purple)] md:drop-shadow-[0_2px_12px_var(--glow-purple)] group-hover:drop-shadow-[0_2px_20px_var(--glow-purple-intense)] transition-all duration-500"
                    >
                      {settings.site_name}
                    </GradientText>
                  ) : (
                    <>
                      <GradientText
                        variant="cyan-purple"
                        className="drop-shadow-[0_2px_8px_var(--glow-purple)] md:drop-shadow-[0_2px_12px_var(--glow-purple)] group-hover:drop-shadow-[0_2px_20px_var(--glow-purple-intense)] transition-all duration-500"
                      >
                        AXIS
                      </GradientText>
                      <span className="text-white ml-0.5 sm:ml-1 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] md:drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] transition-all duration-500">CYBER</span>
                    </>
                  )}
                </span>
                <span className="hidden sm:block text-body-tiny text-white/50 font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase -mt-0.5 group-hover:text-white/80 group-hover:tracking-[0.15em] sm:group-hover:tracking-[0.2em] transition-all duration-300">
                  {settings?.site_tagline || 'Technologies'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Ultra Compact */}
            <nav className="hidden lg:flex items-center gap-0 xl:gap-0.5">
              {/* Main nav items */}
              {mainNavItems.map((item, index) => {
                const isActive = isActiveItem(item);
                const Icon = item.icon;

                const colorSchemes = [
                  {
                    icon: 'text-[var(--neon-cyan)]',
                    bg: 'from-[var(--neon-cyan)]/10 to-[var(--neon-cyan)]/5',
                    border: 'border-[var(--neon-cyan)]/30',
                    glow: 'shadow-[0_0_20px_var(--glow-cyan)]',
                    iconBg: 'bg-[var(--neon-cyan)]/10',
                  },
                  {
                    icon: 'text-[var(--neon-purple)]',
                    bg: 'from-[var(--neon-purple)]/10 to-[var(--neon-purple)]/5',
                    border: 'border-[var(--neon-purple)]/30',
                    glow: 'shadow-[0_0_20px_var(--glow-purple)]',
                    iconBg: 'bg-[var(--neon-purple)]/10',
                  },
                  {
                    icon: 'text-[var(--neon-green)]',
                    bg: 'from-[var(--neon-green)]/10 to-[var(--neon-green)]/5',
                    border: 'border-[var(--neon-green)]/30',
                    glow: 'shadow-[0_0_20px_var(--glow-green)]',
                    iconBg: 'bg-[var(--neon-green)]/10',
                  }
                ];

                const scheme = colorSchemes[index];

                return (
                  <Link
                    key={index}
                    to={item.to}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative group/nav px-2 lg:px-2.5 xl:px-3 2xl:px-4 py-1.5 lg:py-2 rounded-lg font-semibold text-[11px] lg:text-xs xl:text-sm transition-all duration-300 whitespace-nowrap ${isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                      }`}
                  >
                    {/* Active background */}
                    {isActive && (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} rounded-lg`}></div>
                        <div className={`absolute inset-0 border ${scheme.border} rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${scheme.glow}`}></div>
                      </>
                    )}

                    {/* Hover background */}
                    {!isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300`}></div>
                    )}

                    <span className="relative flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                      {/* Icon */}
                      <div className={`relative p-0.5 lg:p-1 rounded-md ${isActive ? scheme.iconBg : 'bg-white/[0.03]'} border border-white/[0.06] transition-all duration-300 group-hover/nav:scale-110`}>
                        <Icon className={`w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 ${isActive ? scheme.icon : 'text-white/40'} group-hover/nav:${scheme.icon} transition-colors duration-300`} />
                      </div>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Resources Dropdown - Ultra Compact */}
              <div
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  className={`relative group/nav px-2 lg:px-2.5 xl:px-3 2xl:px-4 py-1.5 lg:py-2 rounded-lg font-semibold text-[11px] lg:text-xs xl:text-sm transition-all duration-300 whitespace-nowrap ${isResourcesActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {isResourcesActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-pink)]/10 to-[var(--neon-pink)]/5 rounded-lg"></div>
                      <div className="absolute inset-0 border border-[var(--neon-pink)]/30 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] shadow-[0_0_20px_var(--glow-pink)]"></div>
                    </>
                  )}

                  {!isResourcesActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-pink)]/10 to-[var(--neon-pink)]/5 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300"></div>
                  )}

                  <span className="relative flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                    <div className={`relative p-0.5 lg:p-1 rounded-md ${isResourcesActive ? 'bg-[var(--neon-pink)]/10' : 'bg-white/[0.03]'} border border-white/[0.06] transition-all duration-300 group-hover/nav:scale-110`}>
                      <FileText className={`w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 ${isResourcesActive ? 'text-[var(--neon-pink)]' : 'text-white/40'} group-hover/nav:text-[var(--neon-pink)] transition-colors duration-300`} />
                    </div>
                    <span className="hidden xl:inline">Resources</span>
                    <span className="xl:hidden">More</span>
                    <ChevronDown className={`w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-purple)] rounded-2xl shadow-[0_0_30px_var(--glow-purple)] p-2 animate-fade-in-scale">
                    {resourcesItems.map((resource, idx) => (
                      <Link
                        key={idx}
                        to={resource.to}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group/item"
                      >
                        <div className="p-2 rounded-lg bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/20 group-hover/item:scale-110 transition-transform duration-300">
                          <resource.icon className="w-5 h-5 text-[var(--neon-pink)]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-body text-white group-hover/item:text-[var(--neon-pink)] transition-colors duration-300">{resource.label}</div>
                          <div className="text-body-small text-white/50 mt-0.5">{resource.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Global Search */}
              <div className="ml-0.5 lg:ml-1 xl:ml-2">
                <GlobalSearchAdvanced />
              </div>

              {/* Contact Button - Ultra Compact */}
              <Link
                to="/contact"
                className="relative group/cta ml-0.5 lg:ml-1 xl:ml-2 px-2 lg:px-3 xl:px-4 2xl:px-6 py-1.5 lg:py-2 rounded-lg lg:rounded-xl font-black text-[11px] lg:text-xs xl:text-sm transition-all duration-300 overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-[length:200%_100%] animate-shimmer"></div>
                <div className="absolute inset-[2px] bg-[var(--bg-primary)] rounded-[6px] lg:rounded-[8px] xl:rounded-[10px]"></div>

                <span className="relative flex items-center gap-1 lg:gap-1.5 xl:gap-2 gradient-text-cyber">
                  <Mail className="w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4" />
                  <span className="hidden 2xl:inline">Contact Us</span>
                  <span className="2xl:hidden">Contact</span>
                  <ArrowRight className="hidden xl:inline w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </nav>

            {/* Mobile Menu Button - Responsive sizing */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg md:rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] active:scale-95 transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Enhanced Responsiveness */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop with touch feedback */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Menu Panel - Responsive positioning */}
          <div className="absolute top-16 sm:top-18 md:top-20 left-0 right-0 bg-[var(--bg-secondary)] border-b-2 border-[var(--border-purple)] shadow-2xl shadow-[var(--neon-purple)]/20 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4.5rem)] md:max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in-scale">
            <nav className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              {/* Main Navigation Items */}
              {mainNavItems.map((item, index) => {
                const isActive = isActiveItem(item);
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-300 active:scale-98 ${isActive
                      ? 'bg-[var(--neon-purple)]/10 border-2 border-[var(--border-purple)] text-white shadow-neon-purple-sm'
                      : 'text-white/60 hover:bg-white/[0.05] active:bg-white/[0.08] border-2 border-transparent'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--neon-purple)]/20' : 'bg-white/[0.05]'} transition-colors duration-300`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[var(--neon-purple)]' : 'text-white/40'}`} />
                    </div>
                    <span className="font-semibold text-body-small">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-[var(--neon-purple)] animate-pulse shadow-neon-purple-sm"></div>
                    )}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-white/[0.1] my-3 sm:my-4"></div>

              {/* Resources Section Header */}
              <div className="px-4 py-2 mb-6">
                <span className="text-body-small text-white/40 uppercase tracking-wider font-black">Resources</span>
              </div>

              {/* Resources Items */}
              {resourcesItems.map((resource, idx) => (
                <Link
                  key={idx}
                  to={resource.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-start gap-3 p-3 sm:p-4 rounded-xl text-white/60 hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-98 transition-all duration-300 border-2 border-transparent"
                >
                  <div className="p-2 rounded-lg bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/20 shrink-0">
                    <resource.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-pink)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-body-small">{resource.label}</div>
                    <div className="text-body-small text-white/40 mt-0.5 line-clamp-1">{resource.description}</div>
                  </div>
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-white/[0.1] my-3 sm:my-4"></div>

              {/* Contact CTA Button */}
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                icon={Mail}
                iconRight={ArrowRight}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full shadow-neon-purple-lg hover:shadow-neon-purple-xl"
              >
                Contact Us
              </Button>

              {/* Safe area padding for mobile devices */}
              <div className="h-4 sm:h-6"></div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}