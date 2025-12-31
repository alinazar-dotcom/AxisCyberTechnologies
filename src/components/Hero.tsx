import {
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  Code2,
  Globe,
  ChevronDown,
  Shield,
  Layers,
  Boxes,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Hero() {
  const techStack = [
    "AI/ML",
    "Blockchain",
    "Cloud",
    "DevOps",
    "Web3",
    "Gaming",
    "IoT",
    "XR",
    "Quantum",
  ];
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [activeOrb, setActiveOrb] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Cycle through active orbs
    const orbInterval = setInterval(() => {
      setActiveOrb((prev) => (prev + 1) % 3);
    }, 4000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(orbInterval);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Enhanced animated background grid with depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(0,229,255,0.05) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
          transform: `perspective(1200px) rotateX(60deg) translateZ(-200px)`,
          transformOrigin: "center center",
        }}
      >
        {/* Secondary grid layer for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(185,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(185,0,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Animated border glow effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/30 to-transparent"></div>

      {/* Subtle scan lines with multiple layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,229,255,0.5)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(185,0,255,0.3)_50%)] bg-[length:4px_100%] animate-[scanHorizontal_12s_linear_infinite]"></div>
      </div>

      {/* Enhanced floating gradient orbs with glow rings */}
      <div
        className={`absolute top-1/4 left-1/4 transition-all duration-[3000ms] ${activeOrb === 0 ? "opacity-100 scale-100" : "opacity-70 scale-95"}`}
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) scale(${activeOrb === 0 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-[var(--accent-cyan)]/8 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div
            className="absolute inset-10 bg-[var(--accent-cyan)]/5 rounded-full blur-[80px] animate-[pulse_8s_ease-in-out_infinite]"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      <div
        className={`absolute bottom-1/4 right-1/4 transition-all duration-[3000ms] ${activeOrb === 1 ? "opacity-100 scale-100" : "opacity-70 scale-95"}`}
        style={{
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) scale(${activeOrb === 1 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-[var(--accent-magenta)]/8 rounded-full blur-[140px] animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div
            className="absolute inset-10 bg-[var(--accent-magenta)]/5 rounded-full blur-[90px] animate-[pulse_10s_ease-in-out_infinite]"
            style={{ animationDelay: "0.7s" }}
          ></div>
        </div>
      </div>

      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] ${activeOrb === 2 ? "opacity-100 scale-100" : "opacity-70 scale-95"}`}
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 0.025}px), calc(-50% + ${mousePosition.y * 0.025}px)) scale(${activeOrb === 2 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-[var(--accent-orange)]/6 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div
            className="absolute inset-8 bg-[var(--accent-orange)]/4 rounded-full blur-[60px] animate-[pulse_6s_ease-in-out_infinite]"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>

      {/* Enhanced floating particles with trails */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background:
                i % 3 === 0
                  ? "var(--accent-cyan)"
                  : i % 3 === 1
                    ? "var(--accent-magenta)"
                    : "var(--accent-orange)",
              opacity: 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow:
                i % 3 === 0
                  ? "0 0 10px rgba(0,229,255,0.5)"
                  : i % 3 === 1
                    ? "0 0 10px rgba(185,0,255,0.5)"
                    : "0 0 10px rgba(255,122,0,0.5)",
            }}
          ></div>
        ))}
      </div>

      {/* Connecting lines network effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full">
          <defs>
            <linearGradient
              id="lineGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="rgb(0,229,255)"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="rgb(185,0,255)"
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              className="animate-[fadeInOut_8s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-28 lg:py-32 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div
            className={`space-y-8 md:space-y-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Premium Badge with holographic effect */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--accent-cyan)]/10 via-[var(--accent-magenta)]/10 to-[var(--accent-orange)]/10 border border-[var(--accent-cyan)]/30 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-700 group cursor-pointer relative overflow-hidden">
              {/* Shimmer effect on badge */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <div className="relative">
                <Zap className="w-4 h-4 text-[var(--accent-cyan)] group-hover:rotate-180 transition-transform duration-1000" />
                <div className="absolute inset-0 blur-md">
                  <Zap className="w-4 h-4 text-[var(--accent-cyan)]" />
                </div>
              </div>
              <span className="text-[var(--accent-cyan)] text-sm font-bold tracking-wide relative z-10">
                Next-Generation Software Engineering
              </span>
              <div className="relative flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-ping"></div>
              </div>
            </div>

            {/* Main Headline - Enhanced with holographic styling */}
            <div className="space-y-6 md:space-y-8 relative">
              {/* Decorative elements with glow */}
              <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-magenta)] to-transparent rounded-full opacity-60 shadow-[0_0_20px_rgba(0,229,255,0.5)]"></div>
              <div className="absolute -left-3 top-8 w-8 h-8 border-2 border-[var(--accent-cyan)]/30 rounded-lg rotate-45 opacity-40"></div>

              <h1 className="relative">
                <span className="block bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-cyan)] to-[var(--accent-magenta)] bg-clip-text text-transparent leading-[1.1] drop-shadow-[0_0_40px_rgba(0,229,255,0.3)]">
                  Engineering the Future.
                </span>
                <span className="block mt-2 bg-gradient-to-r from-[var(--accent-magenta)] via-[var(--accent-orange)] to-[var(--accent-cyan)] bg-clip-text text-transparent leading-[1.1] drop-shadow-[0_0_40px_rgba(185,0,255,0.3)]">
                  Building the Impossible.
                </span>

                {/* Holographic reflection effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-cyan)]/5 via-transparent to-[var(--accent-magenta)]/5 blur-2xl -z-10 opacity-50"></div>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl relative">
                We architect{" "}
                <span className="relative inline-block">
                  <span className="text-[var(--accent-cyan)] font-semibold">
                    next-generation software ecosystems
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--accent-cyan)]/50 to-transparent"></span>
                </span>{" "}
                for forward-thinking enterprises. From
                AI-powered platforms to immersive Web3
                experiences, we transform visionary ideas into{" "}
                <span className="relative inline-block">
                  <span className="text-[var(--accent-magenta)] font-semibold">
                    production-ready solutions
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--accent-magenta)]/50 to-transparent"></span>
                </span>
                .
              </p>
            </div>

            {/* Enhanced Stats Row with icons and animations */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[var(--accent-cyan)]/10 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/5 to-transparent"></div>

              {[
                {
                  value: "500+",
                  label: "Projects Delivered",
                  icon: Code2,
                  color: "cyan",
                },
                {
                  value: "100%",
                  label: "Success Rate",
                  icon: Sparkles,
                  color: "magenta",
                },
                {
                  value: "24/7",
                  label: "Support",
                  icon: Shield,
                  color: "orange",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer relative z-10"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative">
                      <stat.icon
                        className={`w-5 h-5 transition-all duration-500 group-hover:scale-125 ${stat.color === "cyan"
                          ? "text-[var(--accent-cyan)]/60 group-hover:text-[var(--accent-cyan)]"
                          : stat.color === "magenta"
                            ? "text-[var(--accent-magenta)]/60 group-hover:text-[var(--accent-magenta)]"
                            : "text-[var(--accent-orange)]/60 group-hover:text-[var(--accent-orange)]"
                          }`}
                      />
                      <div
                        className={`absolute inset-0 blur-md transition-opacity duration-500 opacity-0 group-hover:opacity-100`}
                      >
                        <stat.icon
                          className={`w-5 h-5 ${stat.color === "cyan"
                            ? "text-[var(--accent-cyan)]"
                            : stat.color === "magenta"
                              ? "text-[var(--accent-magenta)]"
                              : "text-[var(--accent-orange)]"
                            }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-2xl md:text-3xl font-black bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110 ${stat.color === "cyan"
                      ? "from-[var(--accent-cyan)] to-[var(--accent-cyan)]/70"
                      : stat.color === "magenta"
                        ? "from-[var(--accent-magenta)] to-[var(--accent-magenta)]/70"
                        : "from-[var(--accent-orange)] to-[var(--accent-orange)]/70"
                      }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-[var(--text-muted)] mt-1 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              {/* Primary CTA - Modern Gradient */}
              <Link to="/contact" className="group relative px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0 text-center">
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Content */}
                <div className="relative flex items-center justify-center gap-2.5 text-white">
                  <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold">
                    Start Your Project
                  </span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Secondary CTA - Glass Border */}
              <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0">
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>

                {/* Content */}
                <div className="relative flex items-center justify-center gap-2.5 text-[var(--text-secondary)] group-hover:text-white transition-colors duration-300">
                  <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-semibold">
                    Explore Our Expertise
                  </span>
                </div>
              </button>
            </div>

            {/* Professional Tech Stack Marquee */}
            <div className="relative overflow-hidden py-4 mt-8 md:mt-12">
              {/* Subtle gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

              <div className="flex gap-8 md:gap-12 animate-[scroll_35s_linear_infinite]">
                {[...techStack, ...techStack, ...techStack].map(
                  (tech, i) => (
                    <div
                      key={i}
                      className="group cursor-pointer"
                    >
                      <span className="text-[var(--text-muted)] hover:text-white whitespace-nowrap text-sm md:text-base font-semibold tracking-wider transition-colors duration-300 uppercase">
                        {tech}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Trusted by badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] bg-gradient-to-br from-[var(--accent-cyan)]/80 to-[var(--accent-magenta)]/80 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-[var(--text-muted)] font-semibold">
                Trusted by{" "}
                <span className="text-[var(--accent-cyan)]">
                  Fortune 500
                </span>{" "}
                companies
              </div>
            </div>
          </div>

          {/* Right Side - Ultra-Enhanced 3D Visualization */}
          <div
            className={`relative h-[400px] md:h-[650px] lg:h-[800px] transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {/* Main visualization container - NO FRAME, NO OVERFLOW CLIP */}
            <div className="absolute inset-0 flex items-center justify-center relative">
              <div className="text-center space-y-8 relative z-10">
                {/* ULTRA-ENHANCED 3D GLOBE - MAIN FEATURE - Embedded in background */}
                <div className="w-[350px] h-[350px] md:w-[700px] md:h-[700px] mx-auto relative group/globe">
                  {/* Atmospheric glow base */}
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-radial from-[var(--accent-cyan)]/3 via-transparent to-transparent animate-pulse"
                    style={{ animationDuration: "4s" }}
                  ></div>

                  {/* Star field background with depth layers */}
                  <div className="absolute inset-0 rounded-full opacity-40">
                    {[...Array(50)].map((_, i) => {
                      const size =
                        Math.random() < 0.8
                          ? 0.5
                          : Math.random() < 0.9
                            ? 1
                            : 1.5;
                      return (
                        <div
                          key={i}
                          className="absolute bg-white rounded-full"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0.3 + Math.random() * 0.7,
                            boxShadow:
                              size > 1
                                ? "0 0 3px rgba(255,255,255,0.8)"
                                : "none",
                          }}
                        ></div>
                      );
                    })}
                  </div>

                  {/* Latitude/Longitude Grid System */}
                  <div
                    className="absolute inset-16 rounded-full border border-[var(--accent-cyan)]/15 animate-[spin_60s_linear_infinite]"
                    style={{ transform: "rotateX(60deg)" }}
                  ></div>
                  <div
                    className="absolute inset-16 rounded-full border border-[var(--accent-cyan)]/15 animate-[spin_60s_linear_infinite_reverse]"
                    style={{ transform: "rotateX(30deg)" }}
                  ></div>
                  <div className="absolute inset-16 rounded-full border border-[var(--accent-cyan)]/10"></div>
                  <div
                    className="absolute inset-16 rounded-full border border-[var(--accent-magenta)]/10 animate-[spin_50s_linear_infinite]"
                    style={{ transform: "rotateY(45deg)" }}
                  ></div>
                  <div
                    className="absolute inset-16 rounded-full border border-[var(--accent-magenta)]/10 animate-[spin_50s_linear_infinite_reverse]"
                    style={{ transform: "rotateY(90deg)" }}
                  ></div>

                  {/* Hexagonal grid overlay */}
                  <div className="absolute inset-20 opacity-20">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <pattern
                          id="hexagons"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M10,2 L17,6 L17,14 L10,18 L3,14 L3,6 Z"
                            fill="none"
                            stroke="rgba(0,229,255,0.3)"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="url(#hexagons)"
                      />
                    </svg>
                  </div>

                  {/* OUTER ORBITAL RING - With border */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[var(--accent-cyan)]/40 shadow-[0_0_40px_rgba(0,229,255,0.4)] group-hover/globe:scale-105 group-hover/globe:border-[var(--accent-cyan)]/60 transition-all duration-1000"
                    style={{
                      animation: "spin 30s linear infinite",
                    }}
                  >
                    {/* Enhanced Data node 1 with HUD */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2">
                      <div className="relative w-5 h-5 group/node">
                        {/* Node core */}
                        <div
                          className="absolute inset-0 bg-[var(--accent-cyan)] rounded-full shadow-[0_0_25px_rgba(0,229,255,1)] animate-pulse"
                          style={{ animationDuration: "2s" }}
                        ></div>
                        <div className="absolute inset-0 bg-[var(--accent-cyan)] rounded-full animate-ping"></div>

                        {/* Node ring */}
                        <div className="absolute -inset-2 border-2 border-[var(--accent-cyan)]/30 rounded-full animate-[spin_4s_linear_infinite]"></div>

                        {/* Data streams with particles */}
                        <div className="absolute inset-0 w-16 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-cyan)]/50 to-transparent blur-[1px] opacity-60"></div>
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 left-full w-1 h-1 bg-[var(--accent-cyan)] rounded-full -translate-y-1/2"
                            style={{
                              animation: `streamParticle 2s ease-in-out infinite`,
                              animationDelay: `${i * 0.7}s`,
                            }}
                          ></div>
                        ))}

                        {/* HUD brackets */}
                        <div className="absolute -inset-3 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--accent-cyan)]"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--accent-cyan)]"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--accent-cyan)]"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--accent-cyan)]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Multiple energy pulses with varied speeds */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] animate-[orbitPulse_4s_linear_infinite]"></div>
                    <div
                      className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full shadow-[0_0_10px_rgba(0,229,255,1)] animate-[orbitPulse_3s_linear_infinite]"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>

                  {/* MIDDLE ORBITAL RING - With border */}
                  <div
                    className="absolute inset-12 rounded-full border-2 border-[var(--accent-magenta)]/35 shadow-[0_0_35px_rgba(185,0,255,0.35)] group-hover/globe:scale-105 group-hover/globe:border-[var(--accent-magenta)]/55 transition-all duration-1000"
                    style={{
                      animation:
                        "spin 25s linear infinite reverse",
                    }}
                  >
                    {/* Enhanced Data node 2 */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                      <div className="relative w-4 h-4 group/node">
                        <div
                          className="absolute inset-0 bg-[var(--accent-magenta)] rounded-full shadow-[0_0_20px_rgba(185,0,255,1)] animate-pulse"
                          style={{ animationDuration: "1.8s" }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-[var(--accent-magenta)] rounded-full animate-ping"
                          style={{ animationDuration: "1.5s" }}
                        ></div>

                        {/* Node ring */}
                        <div className="absolute -inset-1.5 border-2 border-[var(--accent-magenta)]/30 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>

                        {/* Data streams */}
                        <div className="absolute inset-0 w-14 h-0.5 bg-gradient-to-l from-[var(--accent-magenta)] via-[var(--accent-magenta)]/50 to-transparent blur-[1px] opacity-60"></div>
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 right-full w-0.5 h-0.5 bg-[var(--accent-magenta)] rounded-full -translate-y-1/2"
                            style={{
                              animation: `streamParticleReverse 1.8s ease-in-out infinite`,
                              animationDelay: `${i * 0.5}s`,
                            }}
                          ></div>
                        ))}

                        {/* HUD */}
                        <div className="absolute -inset-2.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-[var(--accent-magenta)]"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-[var(--accent-magenta)]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Energy pulses */}
                    <div
                      className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] animate-[orbitPulse_3s_linear_infinite]"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[var(--accent-magenta)] rounded-full shadow-[0_0_8px_rgba(185,0,255,1)] animate-[orbitPulse_2.5s_linear_infinite]"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>

                  {/* INNER ORBITAL RING - With border */}
                  <div
                    className="absolute inset-24 rounded-full border-2 border-[var(--accent-orange)]/30 shadow-[0_0_30px_rgba(255,122,0,0.3)] group-hover/globe:scale-105 group-hover/globe:border-[var(--accent-orange)]/50 transition-all duration-1000"
                    style={{
                      animation: "spin 20s linear infinite",
                    }}
                  >
                    {/* Enhanced Data node 3 */}
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
                      <div className="relative w-3.5 h-3.5 group/node">
                        <div
                          className="absolute inset-0 bg-[var(--accent-orange)] rounded-full shadow-[0_0_18px_rgba(255,122,0,1)] animate-pulse"
                          style={{ animationDuration: "2.2s" }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-[var(--accent-orange)] rounded-full animate-ping"
                          style={{ animationDuration: "2s" }}
                        ></div>

                        {/* Node ring */}
                        <div className="absolute -inset-1 border-2 border-[var(--accent-orange)]/30 rounded-full animate-[spin_2.5s_linear_infinite]"></div>

                        {/* Data streams */}
                        <div className="absolute inset-0 h-12 w-0.5 bg-gradient-to-b from-[var(--accent-orange)] via-[var(--accent-orange)]/50 to-transparent blur-[1px] opacity-60"></div>
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-full left-1/2 w-0.5 h-0.5 bg-[var(--accent-orange)] rounded-full -translate-x-1/2"
                            style={{
                              animation: `streamParticleVertical 2.2s ease-in-out infinite`,
                              animationDelay: `${i * 0.8}s`,
                            }}
                          ></div>
                        ))}

                        {/* HUD */}
                        <div className="absolute -inset-2 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 border border-[var(--accent-orange)] rounded-full"></div>
                          <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-[var(--accent-orange)] -translate-x-1/2"></div>
                        </div>
                      </div>
                    </div>

                    {/* Multiple energy pulses */}
                    <div
                      className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] animate-[orbitPulse_2.5s_linear_infinite]"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute top-1/3 right-1/3 w-1 h-1 bg-[var(--accent-orange)] rounded-full shadow-[0_0_8px_rgba(255,122,0,1)] animate-[orbitPulse_2s_linear_infinite]"
                      style={{ animationDelay: "1.2s" }}
                    ></div>
                  </div>

                  {/* NETWORK HUB CENTER - Subtle & Professional */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Network hub core - distributed glow, no eye appearance */}
                      <div className="relative w-8 h-8">
                        {/* Soft distributed core */}
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-cyan)]/60 via-[var(--accent-magenta)]/50 to-[var(--accent-orange)]/40 shadow-[0_0_30px_rgba(0,229,255,0.4),0_0_50px_rgba(185,0,255,0.3)] animate-pulse"
                          style={{ animationDuration: "3s" }}
                        ></div>

                        {/* Rotating inner elements - no white center */}
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--accent-cyan)]/40 to-[var(--accent-magenta)]/30 animate-[spin_8s_linear_infinite] opacity-60"></div>
                      </div>

                      {/* Subtle glow layers - no bright ping */}
                      <div
                        className="absolute -inset-2 w-12 h-12 bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-magenta)]/20 rounded-full blur-lg animate-pulse"
                        style={{ animationDuration: "4s" }}
                      ></div>
                      <div
                        className="absolute -inset-4 w-16 h-16 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-orange)]/10 rounded-full blur-xl animate-pulse"
                        style={{ animationDuration: "5s" }}
                      ></div>

                      {/* Network connection lines - fewer, subtler */}
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-[1.5px] h-6 origin-bottom"
                          style={{
                            background:
                              "linear-gradient(to top, transparent, rgba(0,229,255,0.3))",
                            transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                            animation: `energyPulse 3s ease-in-out infinite`,
                            animationDelay: `${i * 0.25}s`,
                            filter: "blur(0.5px)",
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* ULTRA-ENHANCED ORBITING PARTICLES WITH DEPTH & TRAILS */}
                  {[...Array(24)].map((_, i) => {
                    const layer = i % 4; // 4 layers of depth
                    const radius = 70 + layer * 18;
                    const speed = 5 + i * 0.3;
                    const size =
                      layer === 0
                        ? 2.5
                        : layer === 1
                          ? 2
                          : layer === 2
                            ? 1.5
                            : 1;
                    const color =
                      i % 3 === 0
                        ? "cyan"
                        : i % 3 === 1
                          ? "magenta"
                          : "orange";
                    const opacity = 1 - layer * 0.15;

                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          animation:
                            layer % 2 === 0
                              ? `orbit ${speed}s linear infinite`
                              : `orbitElliptical ${speed}s linear infinite`,
                          animationDelay: `${i * 0.35}s`,
                          opacity: opacity,
                        }}
                      >
                        <div
                          className="relative rounded-full -translate-x-1/2 -translate-y-1/2 group/particle"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            background:
                              color === "cyan"
                                ? "var(--accent-cyan)"
                                : color === "magenta"
                                  ? "var(--accent-magenta)"
                                  : "var(--accent-orange)",
                            boxShadow:
                              color === "cyan"
                                ? `0 0 ${12 + size * 2}px rgba(0,229,255,1), 0 0 ${20 + size * 4}px rgba(0,229,255,0.5)`
                                : color === "magenta"
                                  ? `0 0 ${12 + size * 2}px rgba(185,0,255,1), 0 0 ${20 + size * 4}px rgba(185,0,255,0.5)`
                                  : `0 0 ${12 + size * 2}px rgba(255,122,0,1), 0 0 ${20 + size * 4}px rgba(255,122,0,0.5)`,
                            transformOrigin: `${radius}px 0`,
                          }}
                        >
                          {/* Enhanced particle trail with gradient */}
                          <div
                            className="absolute inset-0 rounded-full blur-sm"
                            style={{
                              width: `${size * 4}px`,
                              height: `${size}px`,
                              transform: "translateX(-75%)",
                              background: `linear-gradient(to left, ${color === "cyan"
                                ? "rgba(0,229,255,0.8)"
                                : color === "magenta"
                                  ? "rgba(185,0,255,0.8)"
                                  : "rgba(255,122,0,0.8)"
                                } 0%, ${color === "cyan"
                                  ? "rgba(0,229,255,0.4)"
                                  : color === "magenta"
                                    ? "rgba(185,0,255,0.4)"
                                    : "rgba(255,122,0,0.4)"
                                } 50%, transparent 100%)`,
                            }}
                          ></div>

                          {/* Particle glow */}
                          <div
                            className="absolute -inset-1 rounded-full blur-md opacity-60"
                            style={{
                              background:
                                color === "cyan"
                                  ? "var(--accent-cyan)"
                                  : color === "magenta"
                                    ? "var(--accent-magenta)"
                                    : "var(--accent-orange)",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Connection lines between particles */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <defs>
                      <linearGradient
                        id="connectionGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgb(0,229,255)"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="50%"
                          stopColor="rgb(185,0,255)"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(255,122,0)"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    {/* Radial connection lines from center */}
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + Math.cos((i * 45 * Math.PI) / 180) * 45}%`}
                        y2={`${50 + Math.sin((i * 45 * Math.PI) / 180) * 45}%`}
                        stroke="url(#connectionGradient)"
                        strokeWidth="1"
                        className="animate-[fadeInOut_4s_ease-in-out_infinite]"
                        style={{
                          animationDelay: `${i * 0.5}s`,
                        }}
                      />
                    ))}
                    {/* Circular connection rings */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="30%"
                      stroke="url(#connectionGradient)"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.3"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="40%"
                      stroke="url(#connectionGradient)"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.2"
                    />
                  </svg>

                  {/* Data streams connecting to core */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                      style={{
                        animation: `dataStreamToCore 3s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                        transformOrigin: `${100 + i * 20}px 0`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Enhanced info labels - Hidden on mobile */}
                <div className="space-y-3 relative z-20 hidden md:block">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-elevated)]/60 border border-[var(--accent-cyan)]/30 rounded-full backdrop-blur-xl shadow-lg">
                    <Cpu className="w-4 h-4 text-[var(--accent-cyan)]" />
                    <p className="text-[var(--accent-cyan)] font-bold text-sm">
                      Real-time 3D Visualization
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse"></div>
                  </div>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] font-semibold flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 bg-[var(--bg-elevated)]/50 rounded-lg border border-[var(--accent-cyan)]/15 hover:border-[var(--accent-cyan)]/40 transition-colors duration-500 cursor-pointer">
                      <Layers className="w-3 h-3 inline mr-1" />
                      Globe Render
                    </span>
                    <span className="text-[var(--accent-cyan)]">
                      ·
                    </span>
                    <span className="px-2.5 py-1 bg-[var(--bg-elevated)]/50 rounded-lg border border-[var(--accent-magenta)]/15 hover:border-[var(--accent-magenta)]/40 transition-colors duration-500 cursor-pointer">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      Particle Systems
                    </span>
                    <span className="text-[var(--accent-cyan)]">
                      ·
                    </span>
                    <span className="px-2.5 py-1 bg-[var(--bg-elevated)]/50 rounded-lg border border-[var(--accent-orange)]/15 hover:border-[var(--accent-orange)]/40 transition-colors duration-500 cursor-pointer">
                      <Boxes className="w-3 h-3 inline mr-1" />
                      WebGL Powered
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced floating info cards */}
            <div
              className="absolute -left-6 top-1/4 bg-gradient-to-br from-[var(--bg-elevated)]/90 to-[var(--bg-elevated)]/70 backdrop-blur-xl border border-[var(--accent-cyan)]/30 rounded-xl px-3 py-2 shadow-[0_0_30px_rgba(0,229,255,0.2)] hidden xl:flex items-center gap-2"
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <Zap className="w-4 h-4 text-[var(--accent-cyan)]" />
              <div className="text-xs font-bold text-[var(--accent-cyan)]">
                AI Powered
              </div>
            </div>

            <div
              className="absolute -right-6 top-1/3 bg-gradient-to-br from-[var(--bg-elevated)]/90 to-[var(--bg-elevated)]/70 backdrop-blur-xl border border-[var(--accent-magenta)]/30 rounded-xl px-3 py-2 shadow-[0_0_30px_rgba(185,0,255,0.2)] hidden xl:flex items-center gap-2"
              style={{
                animation: "float 7s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <Globe className="w-4 h-4 text-[var(--accent-magenta)]" />
              <div className="text-xs font-bold text-[var(--accent-magenta)]">
                Web3 Ready
              </div>
            </div>

            <div
              className="absolute -left-6 bottom-1/4 bg-gradient-to-br from-[var(--bg-elevated)]/90 to-[var(--bg-elevated)]/70 backdrop-blur-xl border border-[var(--accent-orange)]/30 rounded-xl px-3 py-2 shadow-[0_0_30px_rgba(255,122,0,0.2)] hidden xl:flex items-center gap-2"
              style={{
                animation: "float 8s ease-in-out infinite",
                animationDelay: "2s",
              }}
            >
              <Layers className="w-4 h-4 text-[var(--accent-orange)]" />
              <div className="text-xs font-bold text-[var(--accent-orange)]">
                Cloud Native
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator - Adjusted for mobile */}
        <div
          onClick={() => {
            const target =
              document.querySelector("#trusted-by");
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
          }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer group/scroll z-30"
        >
          <span className="text-xs text-[var(--text-muted)] font-semibold tracking-wide group-hover/scroll:text-[var(--accent-cyan)] transition-colors duration-500">
            Scroll to explore
          </span>
          <div className="relative">
            <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] animate-bounce" />
            <div className="absolute inset-0 blur-md">
              <ChevronDown className="w-5 h-5 text-[var(--accent-cyan)] animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
        }

        @keyframes scanHorizontal {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(0px); }
          100% { transform: rotate(360deg) translateX(0px); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        @keyframes orbitPulse {
          0% { 
            transform: rotate(0deg) translateX(0px);
            opacity: 1;
          }
          100% { 
            transform: rotate(360deg) translateX(0px);
            opacity: 0.4;
          }
        }

        @keyframes colorShift {
          0%, 100% { 
            filter: hue-rotate(0deg) brightness(1.2);
          }
          25% { 
            filter: hue-rotate(30deg) brightness(1.4);
          }
          50% { 
            filter: hue-rotate(60deg) brightness(1.6);
          }
          75% { 
            filter: hue-rotate(30deg) brightness(1.4);
          }
        }

        @keyframes energyPulse {
          0%, 100% { 
            opacity: 0.3;
            height: 2rem;
          }
          50% { 
            opacity: 0.8;
            height: 2.5rem;
          }
        }

        @keyframes dataStreamToCore {
          0% { 
            transform: rotate(0deg) translateX(100px) scale(1);
            opacity: 1;
          }
          100% { 
            transform: rotate(720deg) translateX(0px) scale(0);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes quantumPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes streamParticle {
          0% { 
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          100% { 
            transform: translateX(60px) translateY(-50%);
            opacity: 0;
          }
        }

        @keyframes streamParticleReverse {
          0% { 
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
          100% { 
            transform: translateX(-60px) translateY(-50%);
            opacity: 0;
          }
        }

        @keyframes streamParticleVertical {
          0% { 
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
          100% { 
            transform: translateY(50px) translateX(-50%);
            opacity: 0;
          }
        }

        @keyframes waveExpand {
          0% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% { 
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes orbitElliptical {
          0% { 
            transform: rotate(0deg) translateX(0px) translateY(0px);
          }
          25% { 
            transform: rotate(90deg) translateX(0px) translateY(-10px);
          }
          50% { 
            transform: rotate(180deg) translateX(0px) translateY(0px);
          }
          75% { 
            transform: rotate(270deg) translateX(0px) translateY(10px);
          }
          100% { 
            transform: rotate(360deg) translateX(0px) translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}