'use client';

import { useState, useEffect } from 'react';
import { User, Linkedin, Github, Twitter, Globe, MapPin, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientText } from './ui/GradientText';
import { supabase } from '../lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  department?: string;
  bio: string;
  photo_url?: string;
  email?: string;
  location?: string;
  skills: string[];
  expertise_areas: string[];
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  years_experience?: number;
  status: 'active' | 'inactive';
  is_leadership: boolean;
}

export function TeamDynamic() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .eq('is_leadership', true)
          .order('display_order', { ascending: true })
          .limit(6);

        if (supabaseError) throw supabaseError;

        if (data) {
          setTeamMembers(data || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load team');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section id="team" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading team...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || teamMembers.length === 0) {
    return null; // Hide section if no team members
  }

  return (
    <section id="team" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-cyan)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-purple)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-cyan)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border border-[var(--border-cyan)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-cyan)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Meet Our Experts</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            The Minds Behind{' '}
            <GradientText variant="cyan-purple">
              The Innovation
            </GradientText>
          </h2>

          <p className="text-body text-white/75 max-w-3xl mx-auto leading-relaxed">
            Our team of world-class engineers, designers, and strategists brings decades of combined experience
            across AI, blockchain, cloud, and enterprise solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

              <div className="relative h-full p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.04] hover:border-[var(--neon-cyan)]/30">
                {/* Photo */}
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[var(--neon-cyan)]/30 group-hover:border-[var(--neon-cyan)]/60 transition-all duration-500">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Featured badge */}
                  {member.is_leadership && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] border-4 border-[var(--bg-secondary)] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors duration-500">
                    {member.name}
                  </h3>

                  <p className="text-[var(--neon-purple)] font-bold mb-1">
                    {member.role}
                  </p>

                  {member.department && (
                    <p className="text-sm text-white/60 mb-2">
                      {member.department}
                    </p>
                  )}

                  {(member.location || member.years_experience) && (
                    <div className="flex items-center justify-center gap-3 text-sm text-white/60 mb-4">
                      {member.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{member.location}</span>
                        </div>
                      )}
                      {member.location && member.years_experience && (
                        <span className="text-white/30">•</span>
                      )}
                      {member.years_experience && (
                        <span>{member.years_experience}+ years exp.</span>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  {member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 rounded-lg text-xs text-[var(--neon-cyan)] font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-3 py-1 text-xs text-white/40">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-2 pt-4 border-t-2 border-white/10">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.social_links.linkedin && (
                    <a
                      href={member.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social_links.github && (
                    <a
                      href={member.social_links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.social_links.twitter && (
                    <a
                      href={member.social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social_links.website && (
                    <a
                      href={member.social_links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-orange)]/30 hover:text-[var(--neon-orange)] transition-all"
                      title="Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[var(--neon-cyan)] to-[var(--neon-purple)]"></div>
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[var(--neon-cyan)] to-[var(--neon-purple)]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {teamMembers.length >= 6 && (
          <div className="text-center mt-16 md:mt-20">
            <p className="text-white/60 mb-6 text-body-small font-black">
              Want to meet the whole team?
            </p>
            <Link
              to="/team"
              className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_var(--glow-cyan)] hover:-translate-y-1 active:translate-y-0"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Content */}
              <span className="relative text-white font-black">View Full Team</span>
              <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
