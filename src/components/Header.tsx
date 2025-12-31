import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  Code2,
  Briefcase,
  Lightbulb,
  Mail,
  Cpu,
  Layers,
  ArrowRight,
  Zap,
  Building2,
  BookOpen,
  Search,
  Globe,
  ChevronDown,
  Home,
  Users,
  FileText,
  Rocket,
  ChevronRight,
} from "lucide-react";
import axisCyberLogo from "figma:asset/a263fa6f66fe3253d59bdb515c0453cac0011e78.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredItem, setHoveredItem] = useState<number | null>(
    null,
  );
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let closeTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only detect sections on home page
      if (location.pathname === "/") {
        const sections = [
          "hero",
          "philosophy",
          "services",
          "tech-stack",
          "case-studies",
          "innovation",
          "contact",
        ];
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
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Main navigation items
  const mainNavItems = [
    { label: "Home", to: "/", type: "route", icon: Home },
    {
      label: "About",
      to: "/about",
      type: "route",
      icon: Building2,
    },
    {
      label: "Services",
      to: "/services",
      type: "route",
      icon: Layers,
    },
  ];

  // Resources dropdown items
  const resourcesItems = [
    {
      label: "Case Studies",
      to: "/case-studies",
      icon: Briefcase,
      description: "Real-world success stories",
    },
    {
      label: "Tech Blog",
      to: "/blog",
      icon: BookOpen,
      description: "Insights & industry trends",
    },
    {
      label: "Careers",
      to: "/careers",
      icon: Users,
      description: "Join our global team",
    },
  ];

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    if (item.type === "scroll") {
      e.preventDefault();

      // If not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
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
      const elementPosition =
        target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const isActiveItem = (item: any) => {
    if (item.type === "route") {
      return location.pathname === item.to;
    } else {
      return activeSection === item.href.substring(1);
    }
  };

  const isResourcesActive = resourcesItems.some(
    (item) => location.pathname === item.to,
  );

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? "bg-[#05060A]/98 backdrop-blur-2xl border-b border-white/[0.15] shadow-2xl shadow-violet-500/10"
            : "bg-gradient-to-b from-[#05060A]/90 via-[#05060A]/50 to-transparent backdrop-blur-lg"
          }`}
      >
        {/* Animated glow effect line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent transition-all duration-500 ${isScrolled ? "opacity-50" : "opacity-30"}`}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-50 animate-pulse"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Premium Enhanced with Real Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3 relative z-10 shrink-0"
            >
              {/* Logo Container */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] p-[1px] shadow-xl group-hover:shadow-2xl group-hover:shadow-[#00FFFF]/30 transition-all duration-300 group-hover:scale-110 border-2 border-white/[0.2]">
                <div className="w-full h-full rounded-xl md:rounded-2xl bg-[#0A0A14] flex items-center justify-center p-2 md:p-2.5">
                  <img
                    src={axisCyberLogo}
                    alt="Axis Cyber Technologies"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Text - Enhanced Typography */}
              <div className="flex flex-col leading-none">
                <span className="text-lg lg:text-xl xl:text-2xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_2px_20px_rgba(0,229,255,0.5)] transition-all duration-500">
                    AXIS
                  </span>
                  <span className="text-white ml-1.5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] transition-all duration-500">
                    CYBER
                  </span>
                </span>
                <span className="text-[9px] lg:text-[10px] xl:text-[11px] text-white/50 font-bold tracking-[0.2em] uppercase -mt-0.5 group-hover:text-white/80 group-hover:tracking-[0.25em] transition-all duration-300">
                  Technologies
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Ultra-Professional with Colorful Icons */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Main nav items */}
              {mainNavItems.map((item, index) => {
                const isActive = isActiveItem(item);
                const Icon = item.icon;
                const isHovered = hoveredItem === index;

                // Unique colors for each navigation item
                const colorSchemes = [
                  {
                    name: "Home",
                    icon: "text-cyan-400",
                    iconHover: "group-hover/nav:text-cyan-400",
                    bg: "from-cyan-500/10 to-cyan-600/5",
                    border: "border-cyan-400/30",
                    glow: "shadow-[0_0_20px_rgba(0,229,255,0.15)]",
                    indicator: "via-cyan-400",
                    iconBg: "bg-cyan-500/10",
                    iconBorder: "border-cyan-400/20",
                  },
                  {
                    name: "About",
                    icon: "text-violet-400",
                    iconHover:
                      "group-hover/nav:text-violet-400",
                    bg: "from-violet-500/10 to-violet-600/5",
                    border: "border-violet-400/30",
                    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
                    indicator: "via-violet-400",
                    iconBg: "bg-violet-500/10",
                    iconBorder: "border-violet-400/20",
                  },
                  {
                    name: "Services",
                    icon: "text-emerald-400",
                    iconHover:
                      "group-hover/nav:text-emerald-400",
                    bg: "from-emerald-500/10 to-emerald-600/5",
                    border: "border-emerald-400/30",
                    glow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
                    indicator: "via-emerald-400",
                    iconBg: "bg-emerald-500/10",
                    iconBorder: "border-emerald-400/20",
                  },
                ];

                const scheme = colorSchemes[index];

                return (
                  <Link
                    key={index}
                    to={item.to}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative group/nav px-4 xl:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 whitespace-nowrap ${isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      }`}
                  >
                    {/* Active background with unique color */}
                    {isActive && (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} rounded-lg`}
                        ></div>
                        <div
                          className={`absolute inset-0 border ${scheme.border} rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${scheme.glow}`}
                        ></div>
                      </>
                    )}

                    {/* Hover background with color tint */}
                    {!isActive && (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300`}
                        ></div>
                        <div
                          className={`absolute inset-0 border ${scheme.iconBorder} rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]`}
                        ></div>
                      </>
                    )}

                    <span className="relative flex items-center gap-2.5">
                      {/* Icon with background circle and unique color */}
                      <div
                        className={`relative p-1.5 rounded-md ${isActive ? scheme.iconBg : "bg-white/[0.03]"} ${isActive ? scheme.iconBorder : "border border-white/[0.06]"} transition-all duration-300 group-hover/nav:${scheme.iconBg} group-hover/nav:${scheme.iconBorder} group-hover/nav:scale-110`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 transition-all duration-300 ${isActive
                              ? scheme.icon
                              : `text-white/40 ${scheme.iconHover}`
                            } drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]`}
                        />
                      </div>
                      <span className="tracking-wide">
                        {item.label}
                      </span>
                    </span>

                    {/* Active indicator with unique color */}
                    {isActive && (
                      <>
                        <div
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent ${scheme.indicator} to-transparent`}
                        ></div>
                        <div
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent ${scheme.indicator} to-transparent blur-sm`}
                        ></div>
                      </>
                    )}

                    {/* Hover indicator with color */}
                    {!isActive && isHovered && (
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[1.5px] bg-gradient-to-r from-transparent ${scheme.indicator} to-transparent`}
                      ></div>
                    )}
                  </Link>
                );
              })}

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (closeTimeout) clearTimeout(closeTimeout);
                  setIsResourcesOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimeout = setTimeout(() => {
                    setIsResourcesOpen(false);
                  }, 150);
                }}
              >
                <button
                  onClick={() =>
                    setIsResourcesOpen(!isResourcesOpen)
                  }
                  className={`relative group/nav px-4 xl:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 whitespace-nowrap ${isResourcesActive || isResourcesOpen
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                    }`}
                >
                  {/* Active background - Orange theme */}
                  {(isResourcesActive || isResourcesOpen) && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg"></div>
                      <div className="absolute inset-0 border border-orange-400/30 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(255,122,0,0.15)]"></div>
                    </>
                  )}

                  {/* Hover background - Orange tint */}
                  {!isResourcesActive && !isResourcesOpen && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300"></div>
                      <div className="absolute inset-0 border border-orange-400/20 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"></div>
                    </>
                  )}

                  <span className="relative flex items-center gap-2.5">
                    {/* Icon with background circle - Orange */}
                    <div
                      className={`relative p-1.5 rounded-md ${isResourcesActive || isResourcesOpen
                          ? "bg-orange-500/10 border border-orange-400/20"
                          : "bg-white/[0.03] border border-white/[0.06]"
                        } transition-all duration-300 group-hover/nav:bg-orange-500/10 group-hover/nav:border-orange-400/20 group-hover/nav:scale-110`}
                    >
                      <Rocket
                        className={`w-3.5 h-3.5 transition-all duration-300 ${isResourcesActive || isResourcesOpen
                            ? "text-orange-400"
                            : "text-white/40 group-hover/nav:text-orange-400"
                          } drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]`}
                      />
                    </div>
                    <span className="tracking-wide">
                      Resources
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-300 ${isResourcesOpen ? "rotate-180" : ""
                        } ${isResourcesActive || isResourcesOpen
                          ? "text-orange-400"
                          : "text-white/40 group-hover/nav:text-orange-400"
                        }`}
                    />
                  </span>

                  {/* Active indicator - Orange */}
                  {(isResourcesActive || isResourcesOpen) && (
                    <>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent blur-sm"></div>
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] transition-all duration-500 ease-out z-50 ${isResourcesOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto scale-100"
                    : "opacity-0 invisible -translate-y-4 pointer-events-none scale-95"
                    }`}
                  onMouseEnter={() => {
                    if (closeTimeout)
                      clearTimeout(closeTimeout);
                  }}
                  onMouseLeave={() => {
                    closeTimeout = setTimeout(() => {
                      setIsResourcesOpen(false);
                    }, 150);
                  }}
                >
                  {/* Connecting bridge - invisible area to prevent dropdown closing */}
                  <div className="absolute -top-3 left-0 right-0 h-3"></div>

                  {/* Menu Container - Ultra-Premium Neon */}
                  <div className="relative bg-gradient-to-br from-[#0D0D1A]/98 via-[#12132A]/98 to-[#0D0D1A]/98 backdrop-blur-3xl border-2 border-[#FF0099]/30 rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(255,0,153,0.4),0_0_80px_rgba(0,255,255,0.2)]">
                    {/* Animated top glow line */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FF0099] to-transparent animate-pulse"></div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-br-3xl blur-xl"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#00FFFF]/20 to-transparent rounded-bl-3xl blur-xl"></div>

                    {/* Ambient moving glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF0099]/10 via-transparent to-[#00FFFF]/10 pointer-events-none animate-pulse"></div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)'
                    }}></div>

                    <div className="relative p-3.5 space-y-1.5">
                      {/* Section header */}
                      <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-white/[0.08]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse"></div>
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.15em]">Quick Access</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-white/[0.1] to-transparent"></div>
                      </div>

                      {resourcesItems.map((item, idx) => {
                        const Icon = item.icon;
                        const isActive =
                          location.pathname === item.to;

                        // Enhanced unique colors for dropdown items with neon theme
                        const dropdownColors = [
                          {
                            icon: "text-[#00FFFF]",
                            iconHover: "group-hover/item:text-[#00FFFF]",
                            bg: "from-[#00FFFF]/15 via-[#00FFFF]/8 to-transparent",
                            bgHover: "group-hover/item:from-[#00FFFF]/25 group-hover/item:via-[#00FFFF]/15 group-hover/item:to-transparent",
                            border: "border-[#00FFFF]/40",
                            borderHover: "group-hover/item:border-[#00FFFF]/60",
                            iconBg: "bg-[#00FFFF]/15",
                            iconBorder: "border-[#00FFFF]/30",
                            glow: "shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)]",
                            glowHover: "group-hover/item:shadow-[0_0_30px_rgba(0,255,255,0.5),inset_0_0_30px_rgba(0,255,255,0.15)]",
                            shimmer: "from-transparent via-[#00FFFF]/30 to-transparent"
                          },
                          {
                            icon: "text-[#DD00FF]",
                            iconHover: "group-hover/item:text-[#DD00FF]",
                            bg: "from-[#DD00FF]/15 via-[#DD00FF]/8 to-transparent",
                            bgHover: "group-hover/item:from-[#DD00FF]/25 group-hover/item:via-[#DD00FF]/15 group-hover/item:to-transparent",
                            border: "border-[#DD00FF]/40",
                            borderHover: "group-hover/item:border-[#DD00FF]/60",
                            iconBg: "bg-[#DD00FF]/15",
                            iconBorder: "border-[#DD00FF]/30",
                            glow: "shadow-[0_0_20px_rgba(221,0,255,0.3),inset_0_0_20px_rgba(221,0,255,0.1)]",
                            glowHover: "group-hover/item:shadow-[0_0_30px_rgba(221,0,255,0.5),inset_0_0_30px_rgba(221,0,255,0.15)]",
                            shimmer: "from-transparent via-[#DD00FF]/30 to-transparent"
                          },
                          {
                            icon: "text-[#00FF9D]",
                            iconHover: "group-hover/item:text-[#00FF9D]",
                            bg: "from-[#00FF9D]/15 via-[#00FF9D]/8 to-transparent",
                            bgHover: "group-hover/item:from-[#00FF9D]/25 group-hover/item:via-[#00FF9D]/15 group-hover/item:to-transparent",
                            border: "border-[#00FF9D]/40",
                            borderHover: "group-hover/item:border-[#00FF9D]/60",
                            iconBg: "bg-[#00FF9D]/15",
                            iconBorder: "border-[#00FF9D]/30",
                            glow: "shadow-[0_0_20px_rgba(0,255,157,0.3),inset_0_0_20px_rgba(0,255,157,0.1)]",
                            glowHover: "group-hover/item:shadow-[0_0_30px_rgba(0,255,157,0.5),inset_0_0_30px_rgba(0,255,157,0.15)]",
                            shimmer: "from-transparent via-[#00FF9D]/30 to-transparent"
                          },
                        ];

                        const scheme = dropdownColors[idx];

                        return (
                          <Link
                            key={idx}
                            to={item.to}
                            onClick={() =>
                              setIsResourcesOpen(false)
                            }
                            className={`group/item relative flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-500 overflow-hidden ${isActive
                                ? "text-white scale-[1.02]"
                                : "text-white/70 hover:text-white hover:scale-[1.02] hover:-translate-y-0.5"
                              }`}
                          >
                            {/* Animated background with unique color */}
                            <div
                              className={`absolute inset-0 rounded-xl transition-all duration-500 ${isActive
                                  ? `bg-gradient-to-br ${scheme.bg} border-2 ${scheme.border} ${scheme.glow} shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`
                                  : `bg-white/[0.02] border-2 border-white/[0.06] group-hover/item:bg-gradient-to-br ${scheme.bgHover} ${scheme.borderHover} ${scheme.glowHover} group-hover/item:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`
                                }`}
                            ></div>

                            {/* Shimmer effect on hover */}
                            <div className={`absolute inset-0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000 bg-gradient-to-r ${scheme.shimmer} opacity-0 group-hover/item:opacity-100`}></div>

                            {/* Icon container with color and enhanced glow */}
                            <div
                              className={`relative shrink-0 p-2 rounded-lg transition-all duration-500 border-2 ${isActive
                                  ? `${scheme.iconBg} ${scheme.iconBorder} ${scheme.glow} scale-110`
                                  : `bg-white/[0.03] border-white/[0.06] group-hover/item:${scheme.iconBg} group-hover/item:${scheme.iconBorder} group-hover/item:scale-110 group-hover/item:rotate-6 ${scheme.glowHover}`
                                }`}
                            >
                              {/* Icon background glow */}
                              <div className={`absolute inset-0 rounded-lg blur-lg opacity-0 group-hover/item:opacity-60 transition-opacity duration-500 ${scheme.iconBg}`}></div>

                              <Icon
                                className={`relative w-4 h-4 transition-all duration-500 ${isActive
                                    ? `${scheme.icon} drop-shadow-[0_0_12px_currentColor]`
                                    : `text-white/50 ${scheme.iconHover} group-hover/item:drop-shadow-[0_0_10px_currentColor]`
                                  }`}
                              />
                            </div>

                            {/* Text content with enhanced typography */}
                            <div className="relative flex-1 min-w-0">
                              <div
                                className={`font-black text-[13px] mb-0.5 transition-all duration-500 tracking-tight leading-tight ${isActive
                                    ? scheme.icon
                                    : "group-hover/item:text-white group-hover/item:tracking-wide"
                                  }`}
                              >
                                {item.label}
                              </div>
                              <div
                                className={`text-[10px] leading-snug transition-colors duration-500 ${isActive
                                    ? "text-white/70 font-medium"
                                    : "text-white/50 group-hover/item:text-white/80"
                                  }`}
                              >
                                {item.description}
                              </div>
                            </div>

                            {/* Enhanced active/hover indicator */}
                            <div className={`relative shrink-0 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${scheme.icon} shadow-[0_0_15px_currentColor] animate-pulse`}></div>
                              <div className={`absolute inset-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${scheme.icon} blur-md opacity-70 animate-pulse`}></div>
                            </div>

                            {/* Chevron arrow indicator */}
                            <ChevronRight className={`relative w-3 h-3 transition-all duration-500 ${isActive
                                ? `${scheme.icon} translate-x-0 opacity-100`
                                : 'text-white/30 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-hover/item:text-white/70'
                              }`} />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom glow line */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Contact Link */}
              <Link
                to="/contact"
                onMouseEnter={() => setHoveredItem(999)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative group/nav px-4 xl:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 whitespace-nowrap ${location.pathname === "/contact"
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                  }`}
              >
                {/* Active background - Pink/Magenta theme */}
                {location.pathname === "/contact" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-magenta-600/5 rounded-lg"></div>
                    <div className="absolute inset-0 border border-pink-400/30 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(255,0,153,0.15)]"></div>
                  </>
                )}

                {/* Hover background - Pink tint */}
                {location.pathname !== "/contact" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-magenta-600/5 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300"></div>
                    <div className="absolute inset-0 border border-pink-400/20 rounded-lg opacity-0 group-hover/nav:opacity-100 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"></div>
                  </>
                )}

                <span className="relative flex items-center gap-2.5">
                  {/* Icon with background circle - Pink */}
                  <div
                    className={`relative p-1.5 rounded-md ${location.pathname === "/contact"
                        ? "bg-pink-500/10 border border-pink-400/20"
                        : "bg-white/[0.03] border border-white/[0.06]"
                      } transition-all duration-300 group-hover/nav:bg-pink-500/10 group-hover/nav:border-pink-400/20 group-hover/nav:scale-110`}
                  >
                    <Mail
                      className={`w-3.5 h-3.5 transition-all duration-300 ${location.pathname === "/contact"
                          ? "text-pink-400"
                          : "text-white/40 group-hover/nav:text-pink-400"
                        } drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]`}
                    />
                  </div>
                  <span className="tracking-wide">Contact</span>
                </span>

                {/* Active indicator - Pink */}
                {location.pathname === "/contact" && (
                  <>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent blur-sm"></div>
                  </>
                )}

                {/* Hover indicator - Pink */}
                {location.pathname !== "/contact" &&
                  hoveredItem === 999 && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
                  )}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Global Office Indicator */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                </div>
                <span className="text-[11px] font-bold text-white/60">
                  24/7
                </span>
              </div>

              {/* CTA Button - Professional */}
              <Link
                to="/contact"
                className="hidden sm:flex group relative items-center gap-2 px-5 xl:px-6 py-2.5 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-violet-500/20"
              >
                {/* Solid gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-600"></div>

                {/* Subtle shine on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>

                {/* Button content */}
                <span className="relative flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4" />
                  <span className="whitespace-nowrap tracking-wide">
                    Start Project
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>

              {/* Mobile Menu Button - Enhanced */}
              <button
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                className="lg:hidden relative p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 hover:scale-105 group shadow-lg shadow-black/20"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg"></div>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 relative z-10" />
                ) : (
                  <Menu className="w-6 h-6 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
              ? "max-h-[80vh] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="mx-4 sm:mx-6 mb-4 bg-gradient-to-br from-[#0D0D1A]/98 to-[#15162A]/98 backdrop-blur-2xl border-2 border-white/[0.15] rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20">
            {/* Glow line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"></div>

            <nav className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {/* Main nav items */}
              {mainNavItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActiveItem(item);

                return (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative group/mobile flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${isActive ? "text-white" : "text-white/70"
                      }`}
                  >
                    {/* Background */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                          ? "bg-gradient-to-r from-violet-600/25 via-cyan-600/25 to-emerald-600/25 border-2 border-violet-500/40"
                          : "bg-white/[0.04] border border-white/[0.08]"
                        }`}
                    ></div>

                    {/* Glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20 blur-xl"></div>
                    )}

                    <Icon
                      className={`relative w-5 h-5 transition-all duration-300 ${isActive ? "text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" : "text-white/50"}`}
                    />
                    <span className="relative flex-1">
                      {item.label}
                    </span>

                    {isActive && (
                      <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.6)] animate-pulse"></div>
                    )}
                  </Link>
                );
              })}

              {/* Resources section */}
              <div className="pt-2 space-y-2">
                <div className="px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">
                  Resources
                </div>
                {resourcesItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.to;

                  return (
                    <Link
                      key={idx}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`relative group/mobile flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${isActive
                          ? "text-white"
                          : "text-white/70"
                        }`}
                    >
                      {/* Background */}
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                            ? "bg-gradient-to-r from-violet-600/25 via-cyan-600/25 to-emerald-600/25 border-2 border-violet-500/40"
                            : "bg-white/[0.04] border border-white/[0.08]"
                          }`}
                      ></div>

                      {/* Glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20 blur-xl"></div>
                      )}

                      <Icon
                        className={`relative w-5 h-5 transition-all duration-300 ${isActive ? "text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" : "text-white/50"}`}
                      />
                      <span className="relative flex-1">
                        {item.label}
                      </span>

                      {isActive && (
                        <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.6)] animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative group/mobile flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${location.pathname === "/contact"
                    ? "text-white"
                    : "text-white/70"
                  }`}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${location.pathname === "/contact"
                      ? "bg-gradient-to-r from-violet-600/25 via-cyan-600/25 to-emerald-600/25 border-2 border-violet-500/40"
                      : "bg-white/[0.04] border border-white/[0.08]"
                    }`}
                ></div>

                {/* Glow effect */}
                {location.pathname === "/contact" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-emerald-600/20 blur-xl"></div>
                )}

                <Mail
                  className={`relative w-5 h-5 transition-all duration-300 ${location.pathname === "/contact" ? "text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" : "text-white/50"}`}
                />
                <span className="relative flex-1">Contact</span>

                {location.pathname === "/contact" && (
                  <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.6)] animate-pulse"></div>
                )}
              </Link>

              {/* Mobile CTA - Enhanced */}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold overflow-hidden group shadow-lg shadow-violet-500/30"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>

                {/* Content */}
                <span className="relative flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5" />
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              {/* Mobile footer info */}
              <div className="mt-4 pt-4 border-t border-white/[0.10] flex items-center justify-center gap-2 text-xs font-semibold text-white/50">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Available 24/7 • 4 Global Offices</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}