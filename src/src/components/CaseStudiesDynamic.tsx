'use client';

import { ArrowRight, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCaseStudies } from '@/hooks/useCaseStudies';
import { GradientText } from './ui/GradientText';
import { CaseStudiesSkeleton } from './CaseStudiesSkeleton';

export function CaseStudiesDynamic() {
  // Fetch featured case studies
  const { caseStudies, loading, error } = useCaseStudies({
    featured: true,
    limit: 6,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  if (loading) {
    return <CaseStudiesSkeleton />;
  }

  if (error || caseStudies.length === 0) {
    return null; // Don't show section if there's an error or no case studies
  }

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--neon-green)] rounded-full blur-[150px] opacity-10"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border-2 border-[var(--neon-cyan)]/30 rounded-full backdrop-blur-sm mb-8">
            <TrendingUp className="w-5 h-5 text-[var(--neon-cyan)]" />
            <span className="text-white font-black tracking-wide">SUCCESS STORIES</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
            Delivering Real{' '}
            <GradientText variant="cyan-green">Business Impact</GradientText>
          </h2>

          <p className="text-body text-white/70 max-w-2xl mx-auto leading-relaxed mb-6">
            Explore how we've helped businesses transform their operations and achieve exceptional results.
          </p>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[var(--neon-cyan)] hover:text-[var(--neon-green)] font-black transition-colors duration-200 group"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((caseStudy, index) => (
            <Link
              key={caseStudy.id}
              href={`/case-studies/${caseStudy.slug}`}
              className="group relative block animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-green)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

              <div className="relative h-full bg-white/[0.02] border-2 border-[var(--border-cyan)] rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-[var(--neon-cyan)]/50 hover:shadow-[0_20px_60px_var(--glow-cyan)]">
                {/* Featured Badge */}
                {caseStudy.featured && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]/40 rounded-lg backdrop-blur-md">
                    <span className="text-body-tiny text-[var(--neon-cyan)] font-black">FEATURED</span>
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-green)]/20 border-b-2 border-[var(--border-cyan)] overflow-hidden">
                  {caseStudy.featured_image_url ? (
                    <img
                      src={caseStudy.featured_image_url}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <TrendingUp className="w-20 h-20 text-[var(--neon-cyan)]/30" />
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4">
                  {/* Industry Tag */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 rounded-lg text-body-tiny text-[var(--neon-cyan)] font-black uppercase tracking-wide">
                      {caseStudy.client_industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[var(--neon-cyan)] transition-colors duration-500">
                    {caseStudy.title}
                  </h3>

                  {/* Client */}
                  <p className="text-body-small text-white/70 font-black">
                    Client: <span className="text-[var(--neon-green)]">{caseStudy.client_name}</span>
                  </p>

                  {/* Summary */}
                  <p className="text-body-small text-white/60 leading-relaxed line-clamp-3">
                    {caseStudy.project_description}
                  </p>

                  {/* Metrics Row */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--neon-cyan)]" />
                      <span className="text-body-tiny text-white/60 font-black">
                        {caseStudy.team_members?.length || 0} Team
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--neon-green)]" />
                      <span className="text-body-tiny text-white/60 font-black">
                        {caseStudy.project_duration}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/[0.03] border border-white/10 rounded text-body-tiny text-white/60 font-black"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseStudy.technologies.length > 3 && (
                        <span className="px-2 py-1 text-body-tiny text-[var(--neon-cyan)] font-black">
                          +{caseStudy.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 text-body-small text-[var(--neon-cyan)] font-black group-hover:text-[var(--neon-green)] transition-colors duration-300">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[var(--neon-cyan)] to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[var(--neon-cyan)] to-transparent"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-white/60 mb-6 text-body-small font-black">
            Ready to write your own success story?
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-green)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_var(--glow-cyan)] hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Content */}
            <CheckCircle2 className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-black">Start Your Project</span>
            <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
}
