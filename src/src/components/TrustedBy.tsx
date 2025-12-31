'use client';

import { Shield, Award, Cloud, Lock, CheckCircle2, Globe, Zap, Star, Users, TrendingUp } from 'lucide-react';
import { GradientText } from './ui/GradientText';

const companies = [
  { name: 'TechCorp', logo: 'TECH' },
  { name: 'InnovateLabs', logo: 'INNO' },
  { name: 'DataFlow', logo: 'DATA' },
  { name: 'CloudX', logo: 'CX' },
  { name: 'NextGen', logo: 'NEXT' },
  { name: 'Quantum', logo: 'QNT' },
  { name: 'FutureTech', logo: 'FT' },
  { name: 'AlphaAI', logo: 'AAI' }
];

const trustBadges = [
  {
    icon: Shield,
    title: 'ISO 27001',
    subtitle: 'Certified',
    color: 'var(--neon-green)'
  },
  {
    icon: Award,
    title: 'SOC 2 Type II',
    subtitle: 'Compliant',
    color: 'var(--neon-purple)'
  },
  {
    icon: Cloud,
    title: 'AWS Partner',
    subtitle: 'Advanced Tier',
    color: 'var(--neon-cyan)'
  },
  {
    icon: Lock,
    title: 'GDPR',
    subtitle: 'Compliant',
    color: 'var(--neon-pink)'
  }
];

const stats = [
  { icon: Users, value: '150+', label: 'Enterprise Clients', color: 'var(--neon-purple)' },
  { icon: Globe, value: '45+', label: 'Countries Served', color: 'var(--neon-cyan)' },
  { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'var(--neon-orange)' },
  { icon: TrendingUp, value: '100%', label: 'Success Rate', color: 'var(--neon-green)' }
];

export function TrustedBy() {
  return (
    <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-[var(--bg-primary)] border-y-2 border-[var(--border-purple)]">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[140px] opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[140px] opacity-15"></div>
      </div>
      
      {/* Neon grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(221,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(221,0,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border-2 border-[var(--neon-green)]/30 rounded-full backdrop-blur-sm mb-8">
            <CheckCircle2 className="w-5 h-5 text-[var(--neon-green)]" style={{ filter: 'drop-shadow(0 0 10px var(--glow-green))' }} />
            <span className="text-white font-black tracking-wide">TRUSTED WORLDWIDE</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
            Trusted by <GradientText variant="cyan-purple" className="drop-shadow-[0_0_30px_var(--glow-purple-intense)]">Industry Leaders</GradientText>
          </h3>
          
          <p className="text-body text-white/70 max-w-2xl mx-auto leading-relaxed">
            Powering innovation for Fortune 500 companies and fast-growing startups across the globe with <span className="text-[var(--neon-green)] font-black">100% success</span>
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div
                key={index}
                className="group p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up"
                style={{
                  borderColor: `${stat.color}30`,
                  boxShadow: `0 0 30px ${stat.color}15`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" 
                  style={{ background: `radial-gradient(circle, ${stat.color}30, transparent 70%)` }}
                ></div>
                
                <div className="relative z-10 text-center space-y-3">
                  <Icon className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-300" 
                    style={{ color: stat.color, filter: `drop-shadow(0 0 15px ${stat.color}80)` }}
                  />
                  <div className="text-3xl md:text-4xl font-black"
                    style={{ 
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-body-small text-white/70 font-black">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Logos */}
        <div className="mb-16 md:mb-20">
          <p className="text-body-small text-white/60 text-center mb-10 uppercase tracking-wider font-black">FEATURED CLIENTS</p>
          
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling animation */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll">
                {[...companies, ...companies].map((company, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-4 md:mx-6 group cursor-pointer"
                  >
                    <div className="w-36 h-24 md:w-44 md:h-28 bg-black/40 border-2 border-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center transition-all duration-500 hover:bg-black/60 hover:border-[var(--neon-purple)]/40 hover:scale-110 group-hover:shadow-[0_0_30px_var(--glow-purple)]">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent group-hover:from-[var(--neon-purple)] group-hover:to-[var(--neon-cyan)] transition-all duration-500">
                          {company.logo}
                        </div>
                        <div className="text-body-tiny text-white/40 tracking-widest uppercase mt-1 group-hover:text-white/70 transition-colors duration-500 font-black">
                          {company.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div>
          <p className="text-body-small text-white/60 text-center mb-10 uppercase tracking-wider font-black">CERTIFICATIONS & COMPLIANCE</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up"
                  style={{
                    borderColor: `${badge.color}30`,
                    boxShadow: `0 0 30px ${badge.color}20`,
                    animationDelay: `${index * 0.1 + 0.4}s`,
                  }}
                >
                  {/* Animated gradient glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle, ${badge.color}30, transparent 70%)` }}
                  ></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-3xl pointer-events-none"></div>
                  
                  <div className="relative z-10 text-center space-y-4">
                    {/* Icon */}
                    <div className="relative inline-block">
                      <div className="absolute inset-0 blur-lg rounded-2xl opacity-40" 
                        style={{ backgroundColor: badge.color }}
                      ></div>
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border-2"
                        style={{
                          background: `linear-gradient(135deg, ${badge.color}30, ${badge.color}10)`,
                          borderColor: `${badge.color}40`
                        }}
                      >
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Text */}
                    <div>
                      <div className="text-body-lg font-black text-white mb-2">
                        {badge.title}
                      </div>
                      <div className="text-body-small text-white/70 font-black">
                        {badge.subtitle}
                      </div>
                    </div>
                    
                    {/* Checkmark */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border-2 border-white/10 rounded-full">
                        <CheckCircle2 className="w-4 h-4" style={{ color: badge.color, filter: `drop-shadow(0 0 10px ${badge.color}80)` }} />
                        <span className="text-body-tiny text-white/80 font-black">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t-2 border-[var(--border-purple)] text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-body-small text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-green)] animate-pulse" style={{ boxShadow: '0 0 10px var(--neon-green)' }}></div>
              <span className="font-black">Enterprise-Grade Security</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-purple)] animate-pulse" style={{ animationDelay: '0.5s', boxShadow: '0 0 10px var(--neon-purple)' }}></div>
              <span className="font-black">99.9% Uptime SLA</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" style={{ animationDelay: '1s', boxShadow: '0 0 10px var(--neon-cyan)' }}></div>
              <span className="font-black">24/7 Global Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
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
      `}</style>
    </section>
  );
}
