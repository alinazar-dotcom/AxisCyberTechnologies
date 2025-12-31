'use client';

import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from './ui/GradientText';

const caseStudies = [
  {
    title: 'DeFi Trading Platform',
    client: 'Fortune 500 Financial Services',
    results: '300% increase in transaction volume',
    tags: ['Blockchain', 'Web3', 'React'],
    color: 'var(--neon-purple)'
  },
  {
    title: 'AI-Powered Analytics',
    client: 'Global Healthcare Leader',
    results: '85% reduction in processing time',
    tags: ['AI/ML', 'Python', 'TensorFlow'],
    color: 'var(--neon-cyan)'
  },
  {
    title: 'Enterprise Cloud Migration',
    client: 'Manufacturing Giant',
    results: '60% cost savings achieved',
    tags: ['AWS', 'Kubernetes', 'DevOps'],
    color: 'var(--neon-green)'
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Proven <GradientText variant="cyan-purple">Success Stories</GradientText>
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Real results from real clients across industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <div key={idx} className="group p-8 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500 hover:scale-105 cursor-pointer">
              <h3 className="text-2xl font-black text-white mb-4">{study.title}</h3>
              <p className="text-white/60 text-body-small font-black mb-4">{study.client}</p>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5" style={{color: study.color}} />
                <p className="font-black" style={{color: study.color}}>{study.results}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, tidx) => (
                  <span key={tidx} className="px-3 py-1 bg-white/[0.05] border border-white/[0.1] rounded-full text-body-small font-black text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[var(--neon-cyan)] hover:text-white font-black transition-colors group">
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
