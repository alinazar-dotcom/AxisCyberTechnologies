'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Home, Building2, Layers, FileText, ChevronDown, ArrowRight, Zap } from 'lucide-react';

export function HeaderSimple() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const mainNavItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'About', to: '/about', icon: Building2 },
    { label: 'Services', to: '/services', icon: Layers },
    { label: 'Contact', to: '/contact', icon: Mail },
  ];

  const resourcesItems = [
    { label: 'Case Studies', to: '/case-studies', icon: FileText },
    { label: 'Careers', to: '/careers', icon: FileText },
  ];

  const isResourcesActive = resourcesItems.some(item => pathname === item.to);

  return (
    <>
      {/* Main Header - Properly Responsive */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[var(--bg-primary)] border-b border-white/10' 
            : 'bg-[var(--bg-primary)]/95'
        }`}
      >
        {/* Container with proper responsive padding */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18 xl:h-20">
            
            {/* Logo - Properly Responsive */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0"
            >
              {/* Logo Icon Container - Responsive sizes */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13">
                {/* Background with gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-[var(--neon-cyan)]/40 transition-all duration-300 group-hover:border-[var(--neon-cyan)]/60 group-hover:shadow-[0_0_16px_rgba(0,255,255,0.3)]"></div>
                
                {/* Inner dark background - Formula: 12px(rounded-xl) - 2px(border) = 10px */}
                <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-[#0A0B10] via-[#08090E] to-[#05060A] flex items-center justify-center">
                  {/* Icon - Responsive sizing */}
                  <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-6.5 lg:h-6.5 xl:w-7 xl:h-7 text-[var(--neon-cyan)] transition-all duration-300 group-hover:text-[var(--neon-purple)] group-hover:brightness-125" />
                </div>
              </div>
              
              {/* Text - Properly responsive */}
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                    AXIS
                  </span>
                  <span className="text-white ml-1">CYBER</span>
                </span>
                <span className="hidden sm:block text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] text-white/50 font-bold tracking-[0.15em] uppercase group-hover:text-white/70 transition-colors">
                  Technologies
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-[var(--neon-cyan)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation - Properly Responsive */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Main nav items */}
              {mainNavItems.map((item, index) => {
                const isActive = pathname === item.to;
                const Icon = item.icon;
                
                // Color schemes for each item
                const colors = [
                  { active: 'bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/40', hover: 'hover:text-[var(--neon-cyan)]' },
                  { active: 'bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] border-[var(--neon-purple)]/40', hover: 'hover:text-[var(--neon-purple)]' },
                  { active: 'bg-[var(--neon-green)]/10 text-[var(--neon-green)] border-[var(--neon-green)]/40', hover: 'hover:text-[var(--neon-green)]' },
                  { active: 'bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border-[var(--neon-pink)]/40', hover: 'hover:text-[var(--neon-pink)]' },
                ];
                
                const color = colors[index];
                
                return (
                  <Link
                    key={index}
                    href={item.to}
                    className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base xl:text-lg font-semibold transition-all duration-300 ${
                      isActive 
                        ? `${color.active} border` 
                        : `text-white/60 ${color.hover} hover:bg-white/5 border border-transparent`
                    }`}
                  >
                    <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 xl:px-5 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base xl:text-lg font-semibold transition-all duration-300 ${
                    isResourcesActive
                      ? 'bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border border-[var(--neon-pink)]/40' 
                      : 'text-white/60 hover:text-[var(--neon-pink)] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <FileText className="w-4 h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" />
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-60 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--neon-pink)]/30 rounded-xl p-2 animate-fade-in">
                    {resourcesItems.map((resource, idx) => (
                      <Link
                        key={idx}
                        href={resource.to}
                        className="flex items-center gap-3 p-3 rounded-lg text-base text-white/80 hover:bg-[var(--neon-pink)]/5 hover:text-[var(--neon-pink)] transition-all duration-300 border border-transparent hover:border-[var(--neon-pink)]/20"
                      >
                        <div className="p-2 rounded-md bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/20">
                          <resource.icon className="w-4 h-4 text-[var(--neon-pink)]" />
                        </div>
                        <span className="font-semibold">{resource.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col">
            {/* Spacer for header */}
            <div className="h-16"></div>
            
            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-3">
                {/* Main Navigation */}
                {mainNavItems.map((item, index) => {
                  const isActive = pathname === item.to;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={index}
                      href={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl text-lg font-bold transition-all ${
                        isActive
                          ? 'bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border-2 border-[var(--neon-cyan)]/40'
                          : 'text-white/80 hover:bg-white/5 border-2 border-transparent'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Resources Section */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 px-4">
                    Resources
                  </div>
                  {resourcesItems.map((resource, idx) => (
                    <Link
                      key={idx}
                      href={resource.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl text-lg font-bold text-white/80 hover:bg-[var(--neon-pink)]/5 hover:text-[var(--neon-pink)] transition-all border-2 border-transparent hover:border-[var(--neon-pink)]/20"
                    >
                      <resource.icon className="w-6 h-6" />
                      <span>{resource.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}