import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, Tag, ArrowRight, TrendingUp, Sparkles, BookOpen, MessageCircle, Share2, Bookmark, Eye, ChevronRight, Filter, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [tags, setTags] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('name')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (categoriesError) throw categoriesError;
      if (categoriesData) {
        setCategories(['All', ...categoriesData.map((c: { name: string }) => c.name)]);
      }

      // Fetch tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('blog_tags')
        .select('name')
        .order('name', { ascending: true });

      if (tagsError) throw tagsError;
      if (tagsData) {
        setTags(['All', ...tagsData.map((t: { name: string }) => t.name)]);
      }

      // Fetch posts with category name
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name),
          tags:blog_post_tags(tag:blog_tags(name))
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (postsError) throw postsError;

      if (postsData) {
        // Transform data to match UI expectations
        const transformedPosts = postsData.map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category?.name || 'Uncategorized',
          tags: post.tags?.map((t: any) => t.tag?.name).filter(Boolean) || [],
          readTime: post.read_time ? `${post.read_time} min read` : `${Math.max(1, Math.ceil((post.content?.replace(/<[^>]*>/g, '').trim().split(/\s+/).length || 0) / 200))} min read`,
          views: post.views,
          comments: 0, // Placeholder as comments table not in schema yet
          featured: post.is_featured,
          trending: post.views > 1000, // Simple trending logic
          image: normalizeImageUrl(post.featured_image),
          author: {
            name: post.author_name,
            role: post.author_role,
            avatar: normalizeImageUrl(post.author_avatar)
          },
          publishedDate: post.published_at,
        }));
        setBlogPosts(transformedPosts);
      }
    } catch (err: any) {
      console.error('Error fetching blog data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    const matchesTag = selectedTag === 'All' || post.tags.some((tag: string) =>
      tag.toLowerCase().includes(selectedTag.toLowerCase())
    );

    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const trendingPosts = filteredPosts.filter(post => post.trending && !post.featured).slice(0, 3);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const normalizeImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    return trimmed.startsWith('http://') ? `https://${trimmed.slice(7)}` : trimmed;
  };

  const stats = [
    { value: '200+', label: 'Articles Published', icon: BookOpen, color: '#FF0099' },
    { value: '500K+', label: 'Monthly Readers', icon: Eye, color: '#00FFFF' },
    { value: '10K+', label: 'Community Members', icon: User, color: '#DD00FF' },
    { value: '100%', label: 'Quality Content', icon: TrendingUp, color: '#00FF9D' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#00FFFF] animate-spin mx-auto mb-4" />
          <p className="text-white/60 font-black tracking-widest uppercase">Loading Insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05060A] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 bg-black/50 border-2 border-red-500/30 rounded-3xl text-center backdrop-blur-xl">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4">Failed to Load Blog</h2>
          <p className="text-white/60 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-black"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#FF0099] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#DD00FF] rounded-full blur-[140px] opacity-15"></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF0099] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#FF0099]/30 rounded-full mb-8 backdrop-blur-sm">
            <BookOpen className="w-5 h-5 text-[#FF0099]" />
            <span className="text-white font-black tracking-wide">Tech Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 leading-tight">
            Insights on <span className="bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,153,0.5)]">Next-Gen Tech</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-10 max-w-4xl mx-auto">
            Deep dives into AI, blockchain, cloud architecture, and software engineering from our team of
            experts building the future of technology with 100% success.
          </p>

          {/* Search Bar - Ultra-Premium */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00FFFF]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-14 py-5 bg-black/50 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#00FFFF]/60 focus:shadow-[0_0_40px_rgba(0,255,255,0.3)] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-white/[0.08] rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats - Ultra-Premium Neon Cards */}
        <div className="mb-20 md:mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: `${stat.color}40`,
                    boxShadow: `0 0 40px ${stat.color}20`
                  }}
                >
                  {/* Animated glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${stat.color}30, transparent 70%)` }}
                  ></div>

                  <div className="relative z-10">
                    <Icon
                      className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"
                      style={{ color: stat.color, filter: `drop-shadow(0 0 15px ${stat.color}80)` }}
                    />
                    <div
                      className="text-3xl md:text-4xl font-black mb-2"
                      style={{
                        color: stat.color,
                        textShadow: `0 0 20px ${stat.color}80, 0 0 40px ${stat.color}40`
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-white/70 font-black">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters - Ultra-Premium */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="p-8 md:p-10 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-6 h-6 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 10px #DD00FF80)' }} />
              <span className="text-white text-xl font-black">Filter Articles</span>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="text-sm text-white/60 mb-3 block font-black tracking-wide">BY CATEGORY</label>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-[#FF0099] to-[#DD00FF] text-white border-2 border-[#FF0099]/50 shadow-[0_10px_40px_rgba(255,0,153,0.3)]'
                      : 'bg-black/40 backdrop-blur-sm border-2 border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <label className="text-sm text-white/60 mb-3 block font-black tracking-wide">BY TAG</label>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 ${selectedTag === tag
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] text-[#05060A] border-2 border-[#00FFFF]/50 shadow-[0_10px_40px_rgba(0,255,255,0.3)]'
                      : 'bg-black/40 backdrop-blur-sm border-2 border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 pt-6 border-t-2 border-white/10">
              <p className="text-base text-white/70 font-black">
                Showing <span className="text-[#00FFFF]" style={{ textShadow: '0 0 10px #00FFFF80' }}>{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                Featured <span className="bg-gradient-to-r from-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(255,0,153,0.5)' }}>Articles</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70">
                Editor's picks and must-read content
              </p>
            </div>

            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative p-10 md:p-12 bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 hover:scale-[1.01] overflow-hidden"
                >
                  {/* Top gradient border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0099] via-[#00FFFF] to-[#DD00FF]"></div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>

                  <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                    {/* Image Placeholder */}
                    <div className="lg:w-1/3">
                      <div className="aspect-video bg-gradient-to-br from-[#FF0099]/20 to-[#DD00FF]/20 border-2 border-[#FF0099]/30 rounded-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <BookOpen className="w-20 h-20 text-[#FF0099]/50" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="px-4 py-2 bg-gradient-to-r from-[#FF0099]/20 to-[#DD00FF]/20 border-2 border-[#FF0099]/40 rounded-xl text-sm text-[#FF0099] font-black backdrop-blur-sm">
                          {post.category}
                        </span>
                        {post.trending && (
                          <span className="px-4 py-2 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF0099]/20 border-2 border-[#FF7A00]/40 rounded-xl text-sm text-[#FF7A00] font-black flex items-center gap-2 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4" />
                            TRENDING
                          </span>
                        )}
                        <span className="px-4 py-2 bg-gradient-to-r from-[#00FF9D]/20 to-[#00FFFF]/20 border-2 border-[#00FF9D]/40 rounded-xl text-sm text-[#00FF9D] font-black backdrop-blur-sm">
                          FEATURED
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#FF0099] group-hover:to-[#00FFFF] group-hover:bg-clip-text transition-all duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      {/* Author & Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0099]/30 to-[#DD00FF]/30 border-2 border-[#FF0099]/50 backdrop-blur-sm overflow-hidden">
                            {post.author.avatar ? (
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white font-black">
                                {post.author.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-base font-black text-white">{post.author.name}</div>
                            <div className="text-sm text-white/60 font-black">{post.author.role}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 text-sm text-white/60 font-black">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#00FFFF]" />
                            {formatDate(post.publishedDate)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#DD00FF]" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-[#FF0099]" />
                            {post.views.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.15] rounded-lg text-xs font-black text-white/70"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group/btn inline-flex items-center gap-2 text-base text-[#00FFFF] font-black hover:gap-3 transition-all duration-300"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Trending Articles */}
        {trendingPosts.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-10 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#FF7A00]" style={{ filter: 'drop-shadow(0 0 15px #FF7A0080)' }} />
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Trending <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF0099] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(255,122,0,0.5)' }}>Now</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative p-8 bg-black/50 backdrop-blur-xl border-2 border-[#FF7A00]/30 rounded-3xl hover:border-[#FF7A00]/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{ boxShadow: '0 0 30px rgba(255,122,0,0.15)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-[#FF7A00]/20 to-[#FF0099]/20"></div>

                  <div className="relative z-10">
                    {/* Image */}
                    <div className="aspect-video bg-gradient-to-br from-[#FF7A00]/20 to-[#FF0099]/20 border-2 border-[#FF7A00]/40 rounded-2xl flex items-center justify-center mb-5 overflow-hidden backdrop-blur-sm">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <TrendingUp className="w-16 h-16 text-[#FF7A00]/50" />
                      )}
                    </div>

                    {/* Category */}
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF0099]/20 border-2 border-[#FF7A00]/40 rounded-xl text-sm text-[#FF7A00] font-black mb-4 backdrop-blur-sm">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#FF7A00] group-hover:to-[#FF0099] group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-white/60 mb-5 font-black">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FF7A00]" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#FF0099]" />
                        {post.views.toLocaleString()}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between pt-5 border-t-2 border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A00]/30 to-[#FF0099]/30 border-2 border-[#FF7A00]/50 backdrop-blur-sm overflow-hidden">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-black">
                              {post.author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-black text-white/80">{post.author.name}</div>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group/btn flex items-center gap-1 text-sm text-[#FF7A00] font-black hover:gap-2 transition-all duration-300"
                      >
                        Read
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        {regularPosts.length > 0 && (
          <div className="mb-20 md:mb-28">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
                Latest <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent" style={{ textShadow: '0 0 40px rgba(0,255,157,0.5)' }}>Articles</span>
              </h2>
              <p className="text-lg md:text-xl text-white/70">
                Fresh insights and technical deep dives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative p-8 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-[#00FFFF]/10 to-[#DD00FF]/10"></div>

                  <div className="relative z-10">
                    {/* Image */}
                    <div className="aspect-video bg-gradient-to-br from-[#00FFFF]/20 to-[#DD00FF]/20 border-2 border-[#00FFFF]/30 rounded-2xl flex items-center justify-center mb-5 overflow-hidden backdrop-blur-sm">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <BookOpen className="w-16 h-16 text-[#00FFFF]/50" />
                      )}
                    </div>

                    {/* Category */}
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#00FFFF]/20 to-[#DD00FF]/20 border-2 border-[#00FFFF]/40 rounded-xl text-sm text-[#00FFFF] font-black mb-4 backdrop-blur-sm">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00FFFF] group-hover:to-[#DD00FF] group-hover:bg-clip-text transition-all duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-base text-white/70 leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-white/60 mb-5 font-black">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00FFFF]" />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#DD00FF]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-5 border-t-2 border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FFFF]/30 to-[#DD00FF]/30 border-2 border-[#00FFFF]/50 backdrop-blur-sm overflow-hidden">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-black">
                              {post.author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-black text-white/80">{post.author.name}</div>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group/btn flex items-center gap-1 text-sm text-[#00FFFF] font-black hover:gap-2 transition-all duration-300"
                      >
                        Read
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">No articles found</h3>
            <p className="text-base text-white/60 mb-8">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#FF0099] to-[#DD00FF] text-white rounded-2xl font-black hover:shadow-[0_20px_60px_rgba(255,0,153,0.5)] transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Newsletter CTA - Ultra-Premium */}
        <div className="relative p-12 md:p-16 lg:p-20 text-center bg-black/60 backdrop-blur-xl border-2 border-[#FF0099]/30 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/10 via-[#00FFFF]/10 to-[#DD00FF]/10"></div>
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          </div>

          <div className="relative z-10">
            <Sparkles className="w-16 h-16 text-[#FF0099] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 20px #FF009980)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5">
              Never Miss an <span className="bg-gradient-to-r from-[#FF0099] to-[#00FFFF] bg-clip-text text-transparent">Update</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              Subscribe to our newsletter and get the latest insights on AI, blockchain, cloud architecture,
              and software engineering delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-6 py-5 bg-black/50 backdrop-blur-xl border-2 border-white/20 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:border-[#00FFFF]/50 focus:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300"
              />
              <button className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 border-2 border-[#00FFFF]/30">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative text-[#05060A] text-lg font-black">Subscribe</span>
                <ArrowRight className="relative w-6 h-6 text-[#05060A] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-sm text-white/60 mt-6 font-black">
              Join 10,000+ developers and tech leaders. Unsubscribe anytime.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
