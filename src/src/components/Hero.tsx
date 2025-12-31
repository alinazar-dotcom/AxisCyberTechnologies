'use client';

import { ArrowRight, Sparkles, Zap, Cpu, Code2, Globe, ChevronDown, Shield, Layers, Boxes } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { GradientText } from './ui/GradientText';

export function Hero() {
  const techStack = ['AI/ML', 'Blockchain', 'Cloud', 'DevOps', 'Web3', 'Gaming', 'IoT', 'XR', 'Quantum'];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeOrb, setActiveOrb] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };
    
    // Cycle through active orbs
    const orbInterval = setInterval(() => {
      setActiveOrb(prev => (prev + 1) % 3);
    }, 4000);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(orbInterval);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Enhanced animated background grid with depth */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(0,229,255,0.05) 2px, transparent 2px)',
          backgroundSize: '80px 80px',
          transform: `perspective(1200px) rotateX(60deg) translateZ(-200px)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Secondary grid layer for depth */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(185,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(185,0,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Animated border glow effect */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent"></div>

      {/* Subtle scan lines with multiple layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,229,255,0.5)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(185,0,255,0.3)_50%)] bg-[length:4px_100%] animate-[scanHorizontal_12s_linear_infinite]"></div>
      </div>

      {/* Enhanced floating gradient orbs with glow rings */}
      <div 
        className={`absolute top-1/4 left-1/4 transition-all duration-[3000ms] ${activeOrb === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) scale(${activeOrb === 0 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-[var(--neon-cyan)]/8 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute inset-10 bg-[var(--neon-cyan)]/5 rounded-full blur-[80px] animate-[pulse_8s_ease-in-out_infinite]" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-1/4 right-1/4 transition-all duration-[3000ms] ${activeOrb === 1 ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}
        style={{
          transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) scale(${activeOrb === 1 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-[var(--neon-purple)]/8 rounded-full blur-[140px] animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute inset-10 bg-[var(--neon-purple)]/5 rounded-full blur-[90px] animate-[pulse_10s_ease-in-out_infinite]" style={{animationDelay: '0.7s'}}></div>
        </div>
      </div>
      
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[3000ms] ${activeOrb === 2 ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 0.025}px), calc(-50% + ${mousePosition.y * 0.025}px)) scale(${activeOrb === 2 ? 1 : 0.95})`,
        }}
      >
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-[var(--neon-orange)]/6 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute inset-8 bg-[var(--neon-orange)]/4 rounded-full blur-[60px] animate-[pulse_6s_ease-in-out_infinite]" style={{animationDelay: '0.3s'}}></div>
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
              background: i % 3 === 0 ? 'var(--neon-cyan)' : i % 3 === 1 ? 'var(--neon-purple)' : 'var(--neon-orange)',
              opacity: 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: i % 3 === 0 
                ? '0 0 10px var(--glow-cyan)' 
                : i % 3 === 1 
                ? '0 0 10px var(--glow-purple)' 
                : '0 0 10px var(--glow-orange)',
            }}
          ></div>
        ))}
      </div>

      {/* Connecting lines network effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(0,229,255)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(185,0,255)" stopOpacity="0.1" />
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

      <div className="max-w-[1440px] mx-auto container-padding section-spacing w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className={`space-y-8 md:space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Premium Badge with holographic effect */}
            <Badge 
              variant="neon-cyan" 
              size="lg"
              className="inline-flex items-center gap-2.5 relative overflow-hidden group cursor-pointer"
            >
              {/* Shimmer effect on badge */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="relative">
                <Zap className="w-4 h-4 text-[var(--neon-cyan)] group-hover:rotate-180 transition-transform duration-1000" />
                <div className="absolute inset-0 blur-md">
                  <Zap className="w-4 h-4 text-[var(--neon-cyan)]" />
                </div>
              </div>
              <span className="text-[var(--neon-cyan)] font-bold tracking-wide relative z-10">Next-Generation Software Engineering</span>
              <div className="relative flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-ping"></div>
              </div>
            </Badge>

            {/* Main Headline - Enhanced with holographic styling */}
            <div className="space-y-6 md:space-y-8 relative">
              {/* Decorative elements with glow */}
              <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-purple)] to-transparent rounded-full opacity-60 shadow-[0_0_20px_var(--glow-cyan)]"></div>
              <div className="absolute -left-3 top-8 w-8 h-8 border-2 border-[var(--neon-cyan)]/30 rounded-lg rotate-45 opacity-40"></div>
              
              <h1 className="relative title-hero">
                <GradientText 
                  as="span" 
                  variant="cyan-purple" 
                  className="block leading-[1.1] drop-shadow-[0_0_40px_var(--glow-purple)]"
                >
                  Engineering the Future.
                </GradientText>
                <GradientText 
                  as="span" 
                  variant="purple-orange-cyan" 
                  className="block mt-2 leading-[1.1] drop-shadow-[0_0_40px_var(--glow-purple)]"
                >
                  Building the Impossible.
                </GradientText>
                
                {/* Holographic reflection effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[var(--neon-cyan)]/5 via-transparent to-[var(--neon-purple)]/5 blur-2xl -z-10 opacity-50"></div>
              </h1>

              <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl relative">
                We architect <span className="relative inline-block">
                  <span className="text-[var(--neon-cyan)] font-semibold">next-generation software ecosystems</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--neon-cyan)]/50 to-transparent"></span>
                </span> for forward-thinking enterprises. 
                From AI-powered platforms to immersive Web3 experiences, we transform visionary 
                ideas into <span className="relative inline-block">
                  <span className="text-[var(--neon-purple)] font-semibold">production-ready solutions</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--neon-purple)]/50 to-transparent"></span>
                </span>.
              </p>
            </div>

            {/* Enhanced Stats Row with icons and animations */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[var(--neon-cyan)]/10 relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/5 to-transparent"></div>
              
              {[
                { value: '500+', label: 'Projects Delivered', icon: Code2, color: 'cyan' },
                { value: '100%', label: 'Success Rate', icon: Sparkles, color: 'purple' },
                { value: '24/7', label: 'Support', icon: Shield, color: 'orange' },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative">
                      <stat.icon className={`w-5 h-5 transition-all duration-500 group-hover:scale-125 ${
                        stat.color === 'cyan' ? 'text-[var(--neon-cyan)]/60 group-hover:text-[var(--neon-cyan)]' :
                        stat.color === 'purple' ? 'text-[var(--neon-purple)]/60 group-hover:text-[var(--neon-purple)]' :
                        'text-[var(--neon-orange)]/60 group-hover:text-[var(--neon-orange)]'
                      }`} />
                      <div className={`absolute inset-0 blur-md transition-opacity duration-500 opacity-0 group-hover:opacity-100`}>
                        <stat.icon className={`w-5 h-5 ${
                          stat.color === 'cyan' ? 'text-[var(--neon-cyan)]' :
                          stat.color === 'purple' ? 'text-[var(--neon-purple)]' :
                          'text-[var(--neon-orange)]'
                        }`} />
                      </div>
                    </div>
                  </div>
                  <GradientText 
                    as="div" 
                    variant={stat.color === 'cyan' ? 'cyan' : stat.color === 'purple' ? 'purple' : 'orange'}
                    className="title-component transition-all duration-500 group-hover:scale-110"
                  >
                    {stat.value}
                  </GradientText>
                  <div className="text-body-small text-[var(--text-muted)] mt-1 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              {/* Primary CTA - Modern Gradient */}
              <Button 
                variant="primary" 
                size="lg"
                icon={Sparkles}
                iconRight={ArrowRight}
                className="group relative overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="relative">Start Your Project</span>
              </Button>

              {/* Secondary CTA - Glass Border */}
              <Button 
                variant="outline-cyan" 
                size="lg"
                icon={Code2}
                className="group relative overflow-hidden"
              >
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/10 to-transparent"></div>
                <span className="relative">Explore Our Expertise</span>
              </Button>
            </div>

            {/* Professional Tech Stack Marquee */}
            <div className="relative overflow-hidden py-4 mt-8 md:mt-12">
              {/* Subtle gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-8 md:gap-12 animate-[scroll_35s_linear_infinite]">
                {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                  <div key={i} className="group cursor-pointer">
                    <span className="text-[var(--text-muted)] hover:text-white whitespace-nowrap text-body font-semibold tracking-wider transition-colors duration-300 uppercase">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trusted by badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] bg-gradient-to-br from-[var(--neon-cyan)]/80 to-[var(--neon-purple)]/80 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-body-small text-[var(--text-muted)] font-semibold">
                Trusted by <span className="text-[var(--neon-cyan)]">Fortune 500</span> companies
              </div>
            </div>
          </div>

          {/* Right Side - 3D Visualization (Simplified for migration) */}
          <div className={`relative h-[500px] md:h-[650px] lg:h-[800px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-8 relative z-10">
                <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] mx-auto relative">
                  {/* Central orb */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--neon-cyan)]/40 via-[var(--neon-purple)]/30 to-[var(--neon-orange)]/20 blur-3xl animate-pulse"></div>
                  </div>
                  
                  {/* Orbiting elements placeholder */}
                  <div className="absolute inset-0 border-2 border-[var(--neon-cyan)]/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
                  <div className="absolute inset-12 border-2 border-[var(--neon-purple)]/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-24 border-2 border-[var(--neon-orange)]/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                </div>

                {/* Info label */}
                <Badge variant="neon-cyan" size="md">
                  <Cpu className="w-4 h-4 text-[var(--neon-cyan)]" />
                  <p className="text-[var(--neon-cyan)] font-bold">
                    Real-time 3D Visualization
                  </p>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse"></div>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer group/scroll">
          <span className="text-body-small text-[var(--text-muted)] font-semibold tracking-wide group-hover/scroll:text-[var(--neon-cyan)] transition-colors duration-500">Scroll to explore</span>
          <div className="relative">
            <ChevronDown className="w-5 h-5 text-[var(--neon-cyan)] animate-bounce" />
            <div className="absolute inset-0 blur-md">
              <ChevronDown className="w-5 h-5 text-[var(--neon-cyan)] animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
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

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
