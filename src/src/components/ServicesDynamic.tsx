'use client';

import { Brain, Blocks, Code2, Cloud, Smartphone, Layers, Shield, Database, Sparkles, Zap, Cpu, Network, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { GradientText } from './ui/GradientText';
import { useServices } from '@/hooks/useServices';

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  Blocks,
  Code2,
  Cloud,
  Smartphone,
  Layers,
  Shield,
  Database,
  Sparkles,
  Zap,
  Cpu,
  Network,
};

// Color mapping
const colorMap: any = {
  violet: { border: 'border-[var(--border-purple)]', text: 'text-[var(--neon-purple)]', bg: 'bg-[var(--neon-purple)]/10', shadow: 'var(--glow-purple)', gradient: 'from-[var(--neon-purple)] to-purple-600' },
  cyan: { border: 'border-[var(--border-cyan)]', text: 'text-[var(--neon-cyan)]', bg: 'bg-[var(--neon-cyan)]/10', shadow: 'var(--glow-cyan)', gradient: 'from-[var(--neon-cyan)] to-blue-600' },
  emerald: { border: 'border-[var(--border-green)]', text: 'text-[var(--neon-green)]', bg: 'bg-[var(--neon-green)]/10', shadow: 'var(--glow-green)', gradient: 'from-[var(--neon-green)] to-teal-600' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', shadow: 'rgba(59,130,246,0.4)', gradient: 'from-blue-500 to-indigo-600' },
  pink: { border: 'border-[var(--border-pink)]', text: 'text-[var(--neon-pink)]', bg: 'bg-[var(--neon-pink)]/10', shadow: 'var(--glow-pink)', gradient: 'from-[var(--neon-pink)] to-rose-600' },
  purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', shadow: 'rgba(168,85,247,0.4)', gradient: 'from-purple-500 to-fuchsia-600' },
  red: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/10', shadow: 'rgba(239,68,68,0.4)', gradient: 'from-red-500 to-orange-600' },
  amber: { border: 'border-[var(--border-orange)]', text: 'text-[var(--neon-orange)]', bg: 'bg-[var(--neon-orange)]/10', shadow: 'var(--glow-orange)', gradient: 'from-[var(--neon-orange)] to-yellow-600' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', shadow: 'rgba(20,184,166,0.4)', gradient: 'from-teal-500 to-cyan-600' },
  yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', shadow: 'rgba(234,179,8,0.4)', gradient: 'from-yellow-500 to-amber-600' },
  indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', shadow: 'rgba(99,102,241,0.4)', gradient: 'from-indigo-500 to-purple-600' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', shadow: 'rgba(244,63,94,0.4)', gradient: 'from-rose-500 to-pink-600' },
  green: { border: 'border-[var(--border-green)]', text: 'text-[var(--neon-green)]', bg: 'bg-[var(--neon-green)]/10', shadow: 'var(--glow-green)', gradient: 'from-[var(--neon-green)] to-emerald-600' },
  orange: { border: 'border-[var(--border-orange)]', text: 'text-[var(--neon-orange)]', bg: 'bg-[var(--neon-orange)]/10', shadow: 'var(--glow-orange)', gradient: 'from-[var(--neon-orange)] to-red-600' },
};

export function ServicesDynamic() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Fetch services from API
  const { services, loading, error } = useServices({
    limit: 12,
    sortBy: 'display_order',
    sortOrder: 'asc',
  });

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-cyan)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-purple)]/10 via-[var(--neon-cyan)]/10 to-[var(--neon-green)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Full-Spectrum Expertise</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Enterprise Solutions{' '}
            <GradientText variant="cyan-purple">
              Across Every Domain
            </GradientText>
          </h2>
          
          <p className="text-body text-white/75 max-w-3xl mx-auto leading-relaxed mb-6">
            From AI to blockchain, cloud to mobile—we deliver cutting-edge technology solutions 
            that transform businesses and drive measurable results.
          </p>
          
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--neon-purple)] hover:text-[var(--neon-cyan)] font-black transition-colors duration-200 group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
              <p className="text-red-400 font-black">{error}</p>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || Code2;
              const isHovered = hoveredIndex === index;
              const isExpanded = expandedIndex === index;
              const colors = colorMap[service.color_theme] || colorMap.violet;
              
              return (
                <div
                  key={service.id}
                  className={`group relative transition-all duration-700 animate-fade-in-up ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    animationDelay: `${(index % 6) * 0.1}s`,
                  }}
                >
                  {/* Hover glow */}
                  <div className={`absolute -inset-2 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl`}></div>
                  
                  <div 
                    className={`relative h-full p-6 md:p-8 bg-white/[0.02] border-2 ${colors.border} rounded-2xl backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.04] hover:border-white/[0.15]`}
                    style={{
                      boxShadow: isHovered ? `0 20px 60px ${colors.shadow}` : '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <div className={`${isExpanded ? 'md:flex md:gap-10' : 'space-y-5'}`}>
                      {/* Left Column - Main Info */}
                      <div className={`${isExpanded ? 'md:w-1/3' : ''} space-y-5`}>
                        {/* Icon */}
                        <div className="relative inline-block">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <div>
                          <h3 className={`text-xl md:text-2xl font-black ${colors.text} group-hover:text-white transition-colors duration-500 mb-2`}>
                            {service.name}
                          </h3>
                          <div className="flex items-center gap-3 text-body-small">
                            <span className="text-white/60 font-black uppercase tracking-wide">
                              {service.projects_completed}+ Projects
                            </span>
                            <span className="text-white/30">•</span>
                            <span className={`${colors.text} font-black`}>
                              {service.success_rate}% Success
                            </span>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-body-small text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                          {service.short_description}
                        </p>

                        {/* Expand/Collapse button */}
                        <button 
                          className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg text-body-small ${colors.text} font-black hover:bg-white/[0.08] transition-colors duration-300`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedIndex(isExpanded ? null : index);
                          }}
                        >
                          {isExpanded ? 'Show Less' : 'View Details'}
                        </button>
                      </div>

                      {/* Right Column - Expanded Details */}
                      {isExpanded && (
                        <div className="md:w-2/3 space-y-6 mt-6 md:mt-0">
                          {/* Full Description */}
                          <div>
                            <p className="text-body-small text-white/80 leading-relaxed">
                              {service.full_description}
                            </p>
                          </div>

                          {/* Key Features */}
                          {service.key_features && service.key_features.length > 0 && (
                            <div>
                              <h4 className="text-sm font-black text-white/90 mb-4 uppercase tracking-wide">Key Capabilities</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {service.key_features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-start gap-3 text-body-small text-white/70">
                                    <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`}></div>
                                    <span className="leading-relaxed">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Technologies */}
                          {service.technologies && service.technologies.length > 0 && (
                            <div>
                              <h4 className="text-sm font-black text-white/90 mb-4 uppercase tracking-wide">Technologies & Tools</h4>
                              <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech, tIndex) => (
                                  <span 
                                    key={tIndex} 
                                    className={`px-3 py-1.5 ${colors.bg} border ${colors.border} rounded-lg text-body-small font-black ${colors.text} backdrop-blur-sm`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Learn More Link */}
                          <div className="pt-4">
                            <Link
                              href={`/services/${service.slug}`}
                              className={`group/link inline-flex items-center gap-2 px-5 py-3 ${colors.bg} border ${colors.border} rounded-lg text-body-small ${colors.text} font-black hover:bg-white/[0.08] transition-all duration-300`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l ${colors.gradient}`}></div>
                      <div className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b ${colors.gradient}`}></div>
                    </div>

                    {/* Status indicator */}
                    <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${colors.bg} ${isHovered ? 'animate-pulse' : ''}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-white/60 mb-6 text-body-small font-black">
            Don't see what you're looking for? We love custom challenges.
          </p>
          <a 
            href="#contact" 
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_var(--glow-cyan)] hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* Content */}
            <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-black">Discuss Your Custom Project</span>
            <Zap className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
}