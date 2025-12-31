import { ArrowRight, Sparkles, Cpu, Zap, Play, Users, TrendingUp, Clock, Star, Layers, Code, Database, CheckCircle2, Beaker, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const demos = [
  {
    title: 'AI Voice Synthesis Engine',
    description: 'Enterprise-grade real-time voice cloning and speech synthesis powered by transformer models and neural vocoding. Sub-50ms latency with 99.9% uptime SLA.',
    image: 'https://images.unsplash.com/photo-1663770114127-4f61cb62b56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBkZW1vfGVufDF8fHx8MTc2NDI5MTA2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Production Ready',
    statusType: 'success',
    gradient: 'from-emerald-500 to-teal-600',
    tech: 'PyTorch + ONNX',
    users: '2,500+',
    performance: '< 50ms',
    rating: '4.9',
    category: 'AI/ML'
  },
  {
    title: 'Blockchain Explorer 3D',
    description: 'Interactive three-dimensional visualization of blockchain transactions, smart contracts, and network activity. Real-time data processing with WebGL acceleration.',
    image: 'https://images.unsplash.com/photo-1642354984104-90e16a092c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjQyOTEwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Public Beta',
    statusType: 'beta',
    gradient: 'from-violet-500 to-purple-600',
    tech: 'Three.js + Web3',
    users: '1,800+',
    performance: '60 FPS',
    rating: '4.7',
    category: 'Blockchain'
  },
  {
    title: 'AR Spatial Computing',
    description: 'WebXR-powered augmented reality experiences featuring hand tracking, spatial anchors, and real-world object detection with advanced computer vision.',
    image: 'https://images.unsplash.com/photo-1641226020521-1ad4675b26c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ciUyMGF1Z21lbnRlZCUyMHJlYWxpdHl8ZW58MXx8fHwxNzY0MjgwMzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Production Ready',
    statusType: 'success',
    gradient: 'from-cyan-500 to-blue-600',
    tech: 'WebXR + TensorFlow',
    users: '3,200+',
    performance: '90 FPS',
    rating: '4.8',
    category: 'AR/VR'
  },
  {
    title: 'Quantum Circuit Simulator',
    description: 'Browser-based quantum computing simulator with visual qubit representation, gate operations, and quantum algorithm testing. Built for education and research.',
    image: 'https://images.unsplash.com/photo-1617839625591-e5a789593135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nfGVufDF8fHx8MTc2NDIxODI1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Research Preview',
    statusType: 'research',
    gradient: 'from-amber-500 to-orange-600',
    tech: 'WebAssembly + Rust',
    users: '890+',
    performance: '< 100ms',
    rating: '4.6',
    category: 'Quantum'
  }
];

export function InnovationLab() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const statusStyles: any = {
    success: {
      bg: 'from-emerald-500 to-green-600',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      glow: 'rgba(16, 185, 129, 0.5)'
    },
    beta: {
      bg: 'from-blue-500 to-indigo-600',
      border: 'border-blue-500/40',
      text: 'text-blue-400',
      glow: 'rgba(59, 130, 246, 0.5)'
    },
    research: {
      bg: 'from-amber-500 to-orange-600',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      glow: 'rgba(245, 158, 11, 0.5)'
    }
  };

  return (
    <section id="innovation" className="py-12 md:py-20 lg:py-[120px] relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14]">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/8 via-violet-500/8 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-violet-500/8 via-orange-500/8 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/6 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
      </div>

      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* PREMIUM HEADER */}
        <div className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16 lg:mb-24">
          {/* PREMIUM ANIMATED BADGE */}
          <div className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-violet-500/12 via-cyan-500/12 to-emerald-500/12 border-2 border-violet-500/30 rounded-full shadow-lg shadow-violet-500/15 hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-700 group cursor-pointer relative overflow-hidden backdrop-blur-md">
            {/* Shimmer effects */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
              background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981)',
              backgroundSize: '200% 100%',
              animation: 'borderFlow 4s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '2px',
            }}></div>
            
            <Beaker className="w-4.5 h-4.5 text-violet-400" style={{filter: 'drop-shadow(0 0 6px rgb(139 92 246))'}} />
            <span className="text-white text-xs md:text-sm font-bold tracking-[0.15em] uppercase relative z-10">
              Innovation Lab
            </span>
            <Sparkles className="w-4.5 h-4.5 text-emerald-400" style={{filter: 'drop-shadow(0 0 6px rgb(16 185 129))'}} />
          </div>
          
          {/* PREMIUM GRADIENT TITLE */}
          <div className="space-y-4">
            <h2 className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent" style={{
                backgroundSize: '200% auto',
                animation: 'gradientShift 6s ease-in-out infinite'
              }}>
                Research & Development Showcase
              </span>
              
              {/* Enhanced decorative underline */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-2 pointer-events-none">
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-violet-400/50 to-cyan-400/50 rounded-full"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
                <div className="h-0.5 w-24 bg-gradient-to-r from-cyan-400/50 via-emerald-400/50 to-transparent rounded-full"></div>
              </div>
            </h2>
          </div>
          
          <p className="max-w-3xl mx-auto text-base md:text-lg text-white/80 leading-relaxed">
            Explore cutting-edge prototypes and experimental technologies from our R&D division. 
            <span className="text-cyan-400 font-semibold"> Live demos</span>, 
            <span className="text-violet-400 font-semibold"> interactive experiences</span>, and 
            <span className="text-emerald-400 font-semibold"> real-world applications</span>.
          </p>
        </div>

        {/* PREMIUM DEMO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {demos.map((demo, index) => {
            const isHovered = hoveredIndex === index;
            const statusStyle = statusStyles[demo.statusType];
            
            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                style={{
                  animation: 'fadeInUp 0.9s ease-out forwards',
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Subtle outer glow */}
                <div className={`absolute -inset-3 bg-gradient-${demo.gradient} opacity-0 group-hover:opacity-15 blur-3xl transition-all duration-1000 rounded-3xl`}></div>
                
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/[0.06] bg-[#0D0D1A]/80 backdrop-blur-xl transition-all duration-700 hover:border-white/[0.12] group-hover:translate-y-[-4px] hover:shadow-2xl"
                  style={{
                    boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(139, 92, 246, 0.1)' : '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-64 md:h-80 overflow-hidden bg-black/40">
                    <ImageWithFallback
                      src={demo.image}
                      alt={demo.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                      style={{
                        filter: 'brightness(0.85) contrast(1.1)'
                      }}
                    />
                    
                    {/* Professional gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40"></div>
                    
                    {/* Subtle hover overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-[0.08] transition-all duration-700`}></div>

                    {/* Top Bar with Category and Status */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      {/* Category Badge */}
                      <div className="px-3 py-1.5 bg-black/60 border border-white/10 backdrop-blur-xl rounded-lg">
                        <span className="text-xs font-semibold text-white/90 tracking-wide">{demo.category}</span>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-4 py-1.5 bg-gradient-to-r ${statusStyle.bg} backdrop-blur-xl rounded-lg shadow-xl border ${statusStyle.border}`}
                        style={{
                          boxShadow: isHovered ? `0 0 20px ${statusStyle.glow}` : '0 4px 12px rgba(0,0,0,0.4)'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{demo.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Badge - Bottom Left */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="px-4 py-2 bg-black/70 border border-white/15 backdrop-blur-xl rounded-xl transition-all duration-500 group-hover:bg-black/80 group-hover:border-white/25">
                        <div className="flex items-center gap-2.5">
                          <Code className="w-4 h-4 text-violet-400" />
                          <span className="text-sm font-semibold text-white">{demo.tech}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Play Button - Center */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="relative">
                        {/* Animated rings */}
                        <div className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" style={{animationDuration: '2s'}}></div>
                        <div className="absolute inset-[-8px] rounded-full bg-violet-500/20 animate-pulse" style={{animationDuration: '3s'}}></div>
                        
                        <button className="relative w-20 h-20 rounded-full bg-black/60 border-2 border-white/30 backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black/80 hover:border-white/50 group/play"
                          style={{
                            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                          }}
                        >
                          <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform duration-300" fill="white" />
                        </button>
                      </div>
                    </div>

                    {/* Corner Accent Lines */}
                    <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${demo.gradient}`}></div>
                      <div className={`absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b ${demo.gradient}`}></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l ${demo.gradient}`}></div>
                      <div className={`absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t ${demo.gradient}`}></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-7 md:p-8 space-y-5 relative bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl text-white font-bold leading-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-violet-400 group-hover:via-cyan-400 group-hover:to-emerald-400">
                      {demo.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                      {demo.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-white/50">
                          <Users className="w-4 h-4" />
                          <span className="text-xs font-medium uppercase tracking-wide">Users</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-500">{demo.users}</div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-white/50">
                          <Zap className="w-4 h-4" />
                          <span className="text-xs font-medium uppercase tracking-wide">Speed</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors duration-500">{demo.performance}</div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-white/50">
                          <Star className="w-4 h-4" />
                          <span className="text-xs font-medium uppercase tracking-wide">Rating</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-500">{demo.rating}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button className="group/btn relative w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 flex items-center justify-center gap-3">
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                        <Play className="relative w-4 h-4 text-[var(--text-secondary)] group-hover/btn:text-white transition-all duration-300 group-hover/btn:scale-110" />
                        <span className="relative text-sm text-[var(--text-secondary)] group-hover/btn:text-white font-semibold transition-colors duration-300">Try Interactive Demo</span>
                        <ArrowRight className="relative w-4 h-4 text-[var(--text-secondary)] group-hover/btn:text-white transition-all duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.03]">
                    <div className={`h-full bg-gradient-to-r ${demo.gradient} origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-1000 ease-out`}
                      style={{
                        boxShadow: isHovered ? `0 0 20px ${statusStyle.glow}` : 'none'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ENHANCED CTA SECTION */}
        <div className="mt-16 md:mt-20 lg:mt-28">
          <div className="relative group/cta">
            {/* Subtle outer glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl opacity-50 group-hover/cta:opacity-100 transition-opacity duration-1000 rounded-3xl"></div>
            
            <div className="relative p-10 md:p-12 lg:p-16 rounded-3xl border-2 border-white/[0.08] bg-gradient-to-br from-[#0D0D1A]/95 via-[#0A0A14]/98 to-[#0D0D1A]/95 backdrop-blur-2xl max-w-5xl mx-auto overflow-hidden group-hover/cta:border-white/[0.15] transition-all duration-700"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
            >
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L80 80M80 0L0 80' stroke='%238B5CF6' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
              }}></div>
              
              <div className="relative z-10 text-center space-y-8">
                {/* Icon Row */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-600/15 border border-violet-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Layers className="w-7 h-7 text-violet-400" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-cyan-600/15 border border-cyan-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Database className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/15 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Cpu className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    Ready to Collaborate on R&D?
                  </h3>
                  
                  <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-3xl mx-auto">
                    Partner with our innovation team to explore emerging technologies, validate proof-of-concepts, 
                    and build the next generation of enterprise solutions. Let's push boundaries together.
                  </p>
                </div>
                
                {/* Professional Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Primary CTA */}
                  <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-magenta)] to-[var(--accent-cyan)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(185,0,255,0.3)] hover:-translate-y-1 active:translate-y-0">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative text-white font-semibold">Start Collaboration</span>
                    <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  
                  {/* Secondary CTA */}
                  <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                    <Sparkles className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                    <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Research Papers</span>
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>50+ Published Papers</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>15+ Patents Filed</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <span>ISO 27001 Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}