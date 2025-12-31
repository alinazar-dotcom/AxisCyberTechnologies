'use client';

import { Building2, Heart, Shield, Zap, Factory, Truck, Phone, Bitcoin, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from './ui/GradientText';

const industries = [
  { icon: Building2, name: 'Financial Services', color: 'var(--neon-purple)', link: '/industries/financial-services' },
  { icon: Bitcoin, name: 'Blockchain & DLT', color: 'var(--neon-cyan)', link: '/industries/blockchain' },
  { icon: Heart, name: 'Healthcare', color: 'var(--neon-green)', link: '/industries/healthcare' },
  { icon: Shield, name: 'Defense & Aerospace', color: 'var(--neon-orange)', link: '/industries/defense-aerospace' },
  { icon: Zap, name: 'Energy & Utilities', color: 'var(--neon-pink)', link: '/industries/energy-utilities' },
  { icon: Phone, name: 'Telecommunications', color: 'var(--neon-cyan)', link: '/industries/telecommunications' },
  { icon: Truck, name: 'Supply Chain', color: 'var(--neon-purple)', link: '/industries/supply-chain' },
  { icon: Factory, name: 'Manufacturing', color: 'var(--neon-green)', link: '/industries/manufacturing' },
  { icon: FileText, name: 'Insurance', color: 'var(--neon-orange)', link: '/industries/insurance' },
];

export function Industries() {
  return (
    <section id="industries" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Industries <GradientText variant="cyan-purple">We Transform</GradientText>
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto mb-6">
            Deep domain expertise across 9 critical sectors
          </p>
          <Link href="/industries" className="inline-flex items-center gap-2 text-body-small text-[var(--neon-purple)] hover:text-white font-black transition-colors group">
            <span>Explore All Industries</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <Link 
                key={idx}
                href={industry.link}
                className="group p-8 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/[0.05]" style={{borderLeft: `3px solid ${industry.color}`}}>
                    <Icon className="w-7 h-7" style={{color: industry.color}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white group-hover:text-[var(--neon-cyan)] transition-colors">{industry.name}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
