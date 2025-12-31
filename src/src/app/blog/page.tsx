'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, Sparkles, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { GradientText } from '@/components/ui/GradientText';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  author: string;
  published_date: string;
  reading_time_minutes?: number;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  view_count: number;
}

const normalizeImageUrl = (post: any) => {
  if (!post) return undefined;
  const raw = post.featured_image || post.featured_image_url || post.image_url;
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const normalized = trimmed.startsWith('http://') ? `https://${trimmed.slice(7)}` : trimmed;
  console.log('[BlogPage] normalizeImageUrl', {
    id: post.id,
    title: post.title,
    raw,
    normalized
  });
  return normalized;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog?status=published&sortBy=published_date&sortOrder=desc');
        const data = await response.json();

        if (data.success) {
          const normalized = (data.data || []).map((post: BlogPost) => ({
            ...post,
            featured_image: normalizeImageUrl(post),
            author: (post as any).author || (post as any).author_name || post.author,
            published_date: (post as any).published_date || (post as any).published_at || post.published_date,
            featured: (post as any).featured ?? (post as any).is_featured ?? post.featured,
            view_count: (post as any).view_count ?? (post as any).views ?? post.view_count,
          }));
          console.log('[BlogPage] fetched posts', normalized);
          setPosts(normalized);
          setFilteredPosts(normalized);
          
          // Extract all unique categories
          const categories = new Set<string>();
          data.data.forEach((post: BlogPost) => {
            post.categories.forEach((cat: string) => categories.add(cat));
          });
          setAllCategories(Array.from(categories));
        } else {
          setError(data.error || 'Failed to load blog posts');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.categories.includes(selectedCategory));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPosts = filteredPosts.filter(post => post.featured).slice(0, 2);
  const regularPosts = filteredPosts.filter(post => !post.featured || !featuredPosts.includes(post));

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-pink)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-purple)]/10 via-[var(--neon-pink)]/10 to-[var(--neon-orange)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-white text-body-small font-black tracking-wide uppercase">Tech Insights & Guides</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            <GradientText variant="purple-pink">
              Blog & Resources
            </GradientText>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Explore cutting-edge insights on AI, blockchain, cloud architecture, and modern software engineering 
            from our team of experts.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-14 pr-6 py-4 bg-white/[0.02] border-2 border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          {allCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-white'
                    : 'bg-white/[0.02] border-2 border-white/10 text-white/70 hover:border-[var(--neon-purple)]/30'
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-white'
                      : 'bg-white/[0.02] border-2 border-white/10 text-white/70 hover:border-[var(--neon-purple)]/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          <p className="text-center text-white/60 text-sm">
            Showing <span className="text-[var(--neon-purple)] font-bold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin mb-4"></div>
            <p className="text-white/60 font-black">Loading articles...</p>
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

        {/* No Results */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 font-black">No articles found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-[var(--neon-purple)] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Featured Posts */}
        {!loading && !error && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[var(--neon-purple)]" />
              Featured Articles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

                  <div className="relative h-full bg-white/[0.02] border-2 border-[var(--neon-purple)]/30 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/50">
                    {post.featured_image ? (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={() => {
                            console.warn('[BlogPage] image failed to load', {
                              id: post.id,
                              title: post.title,
                              src: post.featured_image
                            });
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-60"></div>
                        
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg">
                          <span className="text-xs font-black text-white uppercase">Featured</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-64 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-pink)]/20 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    <div className="p-8">
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

                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[var(--neon-purple)] transition-colors duration-500">
                        {post.title}
                      </h3>

                      <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-white/60 mb-6 pb-6 border-b-2 border-white/10">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.published_date)}</span>
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

                      <div className="flex items-center gap-2 text-[var(--neon-purple)] font-bold group-hover:gap-3 transition-all duration-300">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        {!loading && !error && regularPosts.length > 0 && (
          <div>
            {featuredPosts.length > 0 && (
              <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                All Articles
              </h2>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${(index + featuredPosts.length) * 0.05}s` }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 rounded-2xl"></div>

                  <div className="relative h-full bg-white/[0.02] border-2 border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30">
                    {post.featured_image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={() => {
                            console.warn('[BlogPage] image failed to load (grid)', {
                              id: post.id,
                              title: post.title,
                              src: post.featured_image
                            });
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-60"></div>
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-pink)]/20 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    <div className="p-6 md:p-8">
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

                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-[var(--neon-purple)] transition-colors duration-500 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-white/60 mb-4 pb-4 border-b-2 border-white/10">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.published_date)}</span>
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

                      <div className="flex items-center gap-2 text-[var(--neon-purple)] text-sm font-bold group-hover:gap-3 transition-all duration-300">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
