import {
  Shield,
  Award,
  Cloud,
  Lock,
  CheckCircle2,
  Globe,
  Zap,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

const companies = [
  { name: "TechCorp", logo: "TECH" },
  { name: "InnovateLabs", logo: "INNO" },
  { name: "DataFlow", logo: "DATA" },
  { name: "CloudX", logo: "CX" },
  { name: "NextGen", logo: "NEXT" },
  { name: "Quantum", logo: "QNT" },
  { name: "FutureTech", logo: "FT" },
  { name: "AlphaAI", logo: "AAI" },
];

const trustBadges = [
  {
    icon: Shield,
    title: "ISO 27001",
    subtitle: "Certified",
    color: "#00FF9D",
  },
  {
    icon: Award,
    title: "SOC 2 Type II",
    subtitle: "Compliant",
    color: "#DD00FF",
  },
  {
    icon: Cloud,
    title: "AWS Partner",
    subtitle: "Advanced Tier",
    color: "#00FFFF",
  },
  {
    icon: Lock,
    title: "GDPR",
    subtitle: "Compliant",
    color: "#FF0099",
  },
];

const stats = [
  {
    icon: Users,
    value: "150+",
    label: "Enterprise Clients",
    color: "#DD00FF",
  },
  {
    icon: Globe,
    value: "45+",
    label: "Countries Served",
    color: "#00FFFF",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Client Rating",
    color: "#FF7A00",
  },
  {
    icon: TrendingUp,
    value: "100%",
    label: "Success Rate",
    color: "#00FF9D",
  },
];

export function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-[#05060A] border-y-2 border-[#DD00FF]/20"
    >
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#DD00FF] rounded-full blur-[140px] opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[140px] opacity-15"></div>
      </div>

      {/* Neon grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(221,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(221,0,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border-2 border-[#00FF9D]/30 rounded-full backdrop-blur-sm mb-8">
            <CheckCircle2
              className="w-5 h-5 text-[#00FF9D]"
              style={{
                filter: "drop-shadow(0 0 10px #00FF9D80)",
              }}
            />
            <span className="text-white font-black tracking-wide">
              TRUSTED WORLDWIDE
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,0,255,0.5)]">
              Industry Leaders
            </span>
          </h3>

          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Powering innovation for Fortune 500 companies and
            fast-growing startups across the globe with 100%
            success
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="group p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  borderColor: `${stat.color}30`,
                  boxShadow: `0 0 30px ${stat.color}15`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${stat.color}30, transparent 70%)`,
                  }}
                ></div>

                <div className="relative z-10 text-center space-y-3">
                  <Icon
                    className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-300"
                    style={{
                      color: stat.color,
                      filter: `drop-shadow(0 0 15px ${stat.color}80)`,
                    }}
                  />
                  <div
                    className="text-3xl md:text-4xl font-black"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/70 font-black">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Logos */}
        <div className="mb-16 md:mb-20">
          <p className="text-sm text-white/60 text-center mb-10 uppercase tracking-wider font-black">
            FEATURED CLIENTS
          </p>

          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#05060A] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#05060A] to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling animation */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll">
                {[...companies, ...companies].map(
                  (company, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 mx-4 md:mx-6 group cursor-pointer"
                    >
                      <div className="w-36 h-24 md:w-44 md:h-28 bg-black/40 border-2 border-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center transition-all duration-500 hover:bg-black/60 hover:border-[#DD00FF]/40 hover:scale-110 group-hover:shadow-[0_0_30px_rgba(221,0,255,0.3)]">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent group-hover:from-[#DD00FF] group-hover:to-[#00FFFF] transition-all duration-500">
                            {company.logo}
                          </div>
                          <div className="text-[10px] md:text-xs text-white/40 tracking-widest uppercase mt-1 group-hover:text-white/70 transition-colors duration-500 font-black">
                            {company.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div>
          <p className="text-sm text-white/60 text-center mb-10 uppercase tracking-wider font-black">
            CERTIFICATIONS & COMPLIANCE
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;

              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: `${badge.color}30`,
                    boxShadow: `0 0 30px ${badge.color}20`,
                    animation:
                      "fadeInUp 0.8s ease-out forwards",
                    animationDelay: `${index * 0.1 + 0.4}s`,
                    opacity: 0,
                  }}
                >
                  {/* Animated gradient glow - fixed to stay inside card */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${badge.color}30, transparent 70%)`,
                    }}
                  ></div>

                  {/* Shimmer effect - stays within card boundaries */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-3xl pointer-events-none"></div>

                  <div className="relative z-10 text-center space-y-4">
                    {/* Icon */}
                    <div className="relative inline-block">
                      <div
                        className="absolute inset-0 blur-lg rounded-2xl opacity-40"
                        style={{ backgroundColor: badge.color }}
                      ></div>
                      <div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border-2"
                        style={{
                          background: `linear-gradient(135deg, ${badge.color}30, ${badge.color}10)`,
                          borderColor: `${badge.color}40`,
                        }}
                      >
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <div className="text-lg md:text-xl font-black text-white mb-2">
                        {badge.title}
                      </div>
                      <div className="text-sm md:text-base text-white/70 font-black">
                        {badge.subtitle}
                      </div>
                    </div>

                    {/* Checkmark */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border-2 border-white/10 rounded-full">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{
                            color: badge.color,
                            filter: `drop-shadow(0 0 10px ${badge.color}80)`,
                          }}
                        />
                        <span className="text-xs text-white/80 font-black">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t-2 border-[#DD00FF]/20 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm md:text-base text-white/70">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full bg-[#00FF9D] animate-pulse"
                style={{ boxShadow: "0 0 10px #00FF9D" }}
              ></div>
              <span className="font-black">
                Enterprise-Grade Security
              </span>
            </div>
            
            {/* Animated Divider with Flow Effect */}
            <div className="relative flex items-center gap-1">
              {/* Left pulse dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse relative z-10" style={{ boxShadow: '0 0 12px rgba(0,255,157,0.8)' }}></div>
              
              {/* Animated gradient line with flow */}
              <div className="relative w-8 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D] via-[#DD00FF] to-[#00FF9D] opacity-60 animate-gradient-flow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer-flow"></div>
              </div>
              
              {/* Right pulse dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD00FF] animate-pulse relative z-10" style={{ animationDelay: '0.5s', boxShadow: '0 0 12px rgba(221,0,255,0.8)' }}></div>
            </div>
            
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full bg-[#DD00FF] animate-pulse"
                style={{
                  animationDelay: "0.5s",
                  boxShadow: "0 0 10px #DD00FF",
                }}
              ></div>
              <span className="font-black">
                99.9% Uptime SLA
              </span>
            </div>
            
            {/* Animated Divider with Flow Effect */}
            <div className="relative flex items-center gap-1">
              {/* Left pulse dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD00FF] animate-pulse relative z-10" style={{ boxShadow: '0 0 12px rgba(221,0,255,0.8)', animationDelay: '0.25s' }}></div>
              
              {/* Animated gradient line with flow */}
              <div className="relative w-8 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#DD00FF] opacity-60 animate-gradient-flow" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer-flow" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Right pulse dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-pulse relative z-10" style={{ animationDelay: '0.75s', boxShadow: '0 0 12px rgba(0,255,255,0.8)' }}></div>
            </div>
            
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full bg-[#00FFFF] animate-pulse"
                style={{
                  animationDelay: "1s",
                  boxShadow: "0 0 10px #00FFFF",
                }}
              ></div>
              <span className="font-black">
                24/7 Global Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-flow {
          animation: gradient-flow 3s linear infinite;
        }
        
        .animate-shimmer-flow {
          animation: shimmer-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}