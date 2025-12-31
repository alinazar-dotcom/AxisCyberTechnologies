'use client';

import { Code2, Sparkles, Zap, Shield } from 'lucide-react';
import { GradientText } from './ui/GradientText';

export function CoreLogic() {
  const values = [
    { icon: Code2, title: 'Clean Code', description: 'Enterprise-grade, maintainable, production-ready' },
    { icon: Sparkles, title: 'Innovation', description: 'Cutting-edge tech, forward-thinking solutions' },
    { icon: Zap, title: 'Performance', description: 'Blazing fast, highly optimized, scalable' },
    { icon: Shield, title: 'Security', description: 'ISO 27001, SOC 2, GDPR compliant' },
  ];

  return (
    <section id="core-logic" className="py-16 md:py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Our <GradientText variant="cyan-purple">Core Values</GradientText>
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            The principles that guide everything we build
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div key={idx} className="p-8 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-cyan)]/30 transition-all duration-500 hover:scale-105 text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{value.title}</h3>
                <p className="text-body-small text-white/70">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
