'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Sparkles, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientText } from './ui/GradientText';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  author_name: string;
  published_at: string;
  reading_time_minutes?: number;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
}

const normalizeImageUrl = (post: any) => {
  if (!post) return undefined;
  const raw = post.featured_image || post.featured_image_url || post.image_url;
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const normalized = trimmed.startsWith('http://') ? `https://${trimmed.slice(7)}` : trimmed;
  console.log('[BlogDynamic] normalizeImageUrl', {
    id: post.id,
    title: post.title,
    raw,
    normalized
  });
  return normalized;
};

export function BlogDynamic() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (supabaseError) throw supabaseError;

        if (data) {
          const normalized = (data as BlogPost[]).map((post) => ({
            ...post,
            featured_image: normalizeImageUrl(post)
          }));
          console.log('[BlogDynamic] fetched posts', normalized);
          setBlogPosts(normalized);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || blogPosts.length === 0) {
    return null; // Hide section if no blog posts
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '9s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-pink)]/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '11s', animationDelay: '1.5s' }}></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,153,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,153,0.01)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-purple)]/10 via-[var(--neon-pink)]/10 to-[var(--neon-orange)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Latest Insights</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            From Our{' '}
            <GradientText variant="purple-pink">
              Tech Blog
            </GradientText>
          </h2>

          <p className="text-body text-white/75 max-w-3xl mx-auto leading-relaxed">
            Explore cutting-edge insights on AI, blockchain, cloud architecture, and modern software engineering
            from our team of experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

              <div className="relative h-full bg-white/[0.02] border-2 border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30">
                {/* Featured Image */}
                {post.featured_image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={() => {
                        console.warn('[BlogDynamic] image failed to load', {
                          id: post.id,
                          title: post.title,
                          src: post.featured_image
                        });
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-60"></div>

                    {/* Featured badge */}
                    {post.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg">
                        <span className="text-xs font-black text-white uppercase">Featured</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-pink)]/20 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white/20" />

                    {/* Featured badge */}
                    {post.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg">
                        <span className="text-xs font-black text-white uppercase">Featured</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Categories */}
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.slice(0, 2).map((category, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 rounded-lg text-xs text-[var(--neon-purple)] font-bold uppercase"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-[var(--neon-purple)] transition-colors duration-500 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-white/60 mb-4 pb-4 border-b-2 border-white/10">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>{post.author_name}</span>
                    </div>
                    <span className="text-white/30">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    {post.reading_time_minutes && (
                      <>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{post.reading_time_minutes} min</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[var(--neon-purple)] text-sm font-bold group-hover:gap-3 transition-all duration-300">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)]"></div>
                  <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[var(--neon-purple)] to-[var(--neon-pink)]"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-white/60 mb-6 text-body-small font-black">
            Explore more insights and technical deep-dives
          </p>
          <Link
            to="/blog"
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_var(--glow-purple)] hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Content */}
            <span className="relative text-white font-black">View All Articles</span>
            <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
