'use client';

import { Sparkles, Brain, Atom, Cpu, Layers, Zap } from 'lucide-react';
import { GradientText } from './ui/GradientText';

const innovations = [
  {
    icon: Brain,
    title: 'AI Research',
    description: 'Cutting-edge machine learning and neural network development',
    color: 'var(--neon-purple)'
  },
  {
    icon: Atom,
    title: 'Quantum Computing',
    description: 'Exploring quantum algorithms for next-gen applications',
    color: 'var(--neon-cyan)'
  },
  {
    icon: Cpu,
    title: 'Edge AI',
    description: 'Bringing intelligence to IoT and edge devices',
    color: 'var(--neon-green)'
  },
  {
    icon: Layers,
    title: 'Web3 Infrastructure',
    description: 'Building the decentralized web of tomorrow',
    color: 'var(--neon-orange)'
  },
];

export function InnovationLab() {
  return (
    <section id="innovation-lab" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[140px] opacity-15 animate-pulse" style={{animationDuration: '6s'}}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[var(--neon-purple)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Innovation Lab</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Research & <GradientText variant="cyan-purple">Development</GradientText>
          </h2>
          
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Pioneering tomorrow's technology today through continuous R&D
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, idx) => {
            const Icon = innovation.icon;
            return (
              <div 
                key={idx}
                className="group relative p-8 md:p-10 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                {/* Glow effect */}
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl" style={{backgroundColor: innovation.color}}></div>
                
                <div className="relative space-y-5">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{
                    background: `linear-gradient(135deg, ${innovation.color}, ${innovation.color}80)`,
                    boxShadow: `0 10px 40px ${innovation.color}30`
                  }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[var(--neon-cyan)] transition-colors duration-500">
                    {innovation.title}
                  </h3>
                  
                  <p className="text-body-small text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                    {innovation.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.02] border-2 border-[var(--neon-green)]/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" style={{boxShadow: '0 0 10px var(--neon-green)'}}></div>
            <span className="text-body-small font-black text-white/80">Currently researching 12+ emerging technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
