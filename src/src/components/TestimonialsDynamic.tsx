'use client';

import { Star, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { GradientText } from './ui/GradientText';

export function TestimonialsDynamic() {
  // Fetch featured 5-star testimonials
  const { testimonials, loading, error } = useTestimonials({
    status: 'approved',
    limit: 6,
    sortBy: 'rating',
    sortOrder: 'desc',
  });

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null; // Don't show section if there's an error or no testimonials
  }

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[var(--neon-purple)] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-[var(--neon-cyan)] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] border-2 border-[var(--neon-orange)]/30 rounded-full backdrop-blur-sm mb-8">
            <Star className="w-5 h-5 text-[var(--neon-orange)] fill-[var(--neon-orange)]" />
            <span className="text-white font-black tracking-wide">CLIENT SUCCESS STORIES</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
            What Our Clients{' '}
            <GradientText variant="orange-pink">Say About Us</GradientText>
          </h2>

          <p className="text-body text-white/70 max-w-2xl mx-auto leading-relaxed">
            Trusted by industry leaders worldwide. Here's what they have to say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-orange)] to-[var(--neon-pink)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

              <div className="relative h-full p-8 bg-white/[0.02] border-2 border-[var(--border-orange)] rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-[var(--neon-orange)]/50 hover:shadow-[0_20px_60px_var(--glow-orange)]">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-[var(--neon-orange)]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[var(--neon-orange)] fill-[var(--neon-orange)]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-body-small text-white/80 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Project Info */}
                {testimonial.project_title && (
                  <div className="mb-6 p-3 bg-white/[0.03] border border-white/10 rounded-lg">
                    <p className="text-body-tiny text-white/60 uppercase tracking-wide font-black mb-1">
                      Project
                    </p>
                    <p className="text-body-small text-[var(--neon-orange)] font-black">
                      {testimonial.project_title}
                    </p>
                  </div>
                )}

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t-2 border-white/10">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--neon-orange)] to-[var(--neon-pink)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {testimonial.avatar_url ? (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.client_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-black text-lg">
                        {testimonial.client_name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-body-small font-black text-white truncate">
                      {testimonial.client_name}
                    </p>
                    <p className="text-body-tiny text-white/60 truncate">
                      {testimonial.position}
                    </p>
                    <p className="text-body-tiny text-[var(--neon-orange)] font-black truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Service Tag */}
                {testimonial.service_provided && (
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1.5 bg-[var(--neon-orange)]/10 border border-[var(--neon-orange)]/30 rounded-lg text-body-tiny text-[var(--neon-orange)] font-black">
                      {testimonial.service_provided}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
