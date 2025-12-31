'use client';

import { Brain, Blocks, Code2, Cloud, Smartphone, Layers, Shield, Database, Network, Cpu, Sparkles, Zap } from 'lucide-react';
import { GradientText } from './ui/GradientText';

export function TechGalaxy() {
  const techCategories = [
    { icon: Brain, name: 'AI & ML', color: 'var(--neon-purple)' },
    { icon: Blocks, name: 'Blockchain', color: 'var(--neon-cyan)' },
    { icon: Code2, name: 'Full-Stack', color: 'var(--neon-green)' },
    { icon: Cloud, name: 'Cloud/DevOps', color: 'var(--neon-orange)' },
    { icon: Smartphone, name: 'Mobile', color: 'var(--neon-pink)' },
    { icon: Layers, name: '3D/WebGL', color: 'var(--neon-purple)' },
    { icon: Shield, name: 'Security', color: 'var(--neon-cyan)' },
    { icon: Database, name: 'Data Eng', color: 'var(--neon-green)' },
  ];

  return (
    <section id="tech-galaxy" className="py-16 md:py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Our <GradientText variant="cyan-purple">Technology Galaxy</GradientText>
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Comprehensive expertise across all modern technology stacks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techCategories.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div key={idx} className="p-6 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.04] transition-all duration-300 text-center group">
                <Icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{color: tech.color}} />
                <p className="font-black text-white">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
