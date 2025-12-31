'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Link as LinkIcon,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { BlogComments } from '@/components/BlogComments';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  author_bio?: string;
  author_avatar?: string;
  published_date: string;
  updated_date?: string;
  reading_time_minutes?: number;
  categories: string[];
  tags: string[];
  seo_title?: string;
  seo_description?: string;
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
  return trimmed.startsWith('http://') ? `https://${trimmed.slice(7)}` : trimmed;
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        if (data.success && data.data?.post) {
          const normalizedPost = {
            ...data.data.post,
            featured_image: normalizeImageUrl(data.data.post)
          };
          setPost(normalizedPost);
          
          // Fetch related posts (same category or recent)
          const relatedResponse = await fetch(`/api/blog?status=published&limit=3&sortBy=published_date&sortOrder=desc`);
          const relatedData = await relatedResponse.json();
          
          if (relatedData.success) {
            // Filter out current post and get 3 others
            const filtered = (relatedData.data || [])
              .filter((p: BlogPost) => p.slug !== slug)
              .slice(0, 3)
              .map((p: BlogPost) => ({
                ...p,
                featured_image: normalizeImageUrl(p)
              }));
            setRelatedPosts(filtered);
          }
        } else {
          setError('Blog post not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post?.title || '';
    
    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'blog_post' }),
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin mb-4"></div>
          <p className="text-white/60 font-black">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Article Not Found</h1>
          <p className="text-white/60 mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <Link href="/blog">
            <Button variant="primary">
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-pink)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--neon-purple)] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <article>
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 rounded-lg text-sm text-[var(--neon-purple)] font-bold uppercase"
                >
                  {category}
                </span>
              ))}
              {post.featured && (
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg text-sm text-white font-bold uppercase">
                  Featured
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-[var(--neon-cyan)] font-bold mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b-2 border-white/10">
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.author_avatar ? (
                <img
                  src={post.author_avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full border-2 border-[var(--neon-cyan)]/30"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] border-2 border-[var(--neon-cyan)]/30 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-bold">{post.author}</p>
                <p className="text-xs text-white/60">Author</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(post.published_date)}</span>
            </div>

            {/* Reading Time */}
            {post.reading_time_minutes && (
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.reading_time_minutes} min read</span>
              </div>
            )}

            {/* View Count */}
            {post.view_count > 0 && (
              <div className="text-white/70 text-sm">
                {post.view_count.toLocaleString()} views
              </div>
            )}
          </div>

          {/* Share Buttons */}
          <div className="mb-12">
            <div className="flex items-center gap-3 p-4 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <Share2 className="w-5 h-5 text-white/60" />
              <span className="text-white/60 font-bold text-sm mr-2">Share:</span>
              
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-pink)]/30 hover:text-[var(--neon-pink)] transition-all"
                title="Copy Link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              
              {copied && (
                <span className="text-[var(--neon-green)] text-sm font-bold animate-fade-in">
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-12 rounded-2xl overflow-hidden border-2 border-white/10">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-16">
            <div 
              className="text-white/80 leading-relaxed space-y-6"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.75',
              }}
            >
              {/* Render content - supporting basic formatting */}
              {post.content.split('\n\n').map((paragraph, index) => {
                // Check if it's a heading
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={index} className="text-2xl md:text-3xl font-black text-white mt-12 mb-6 first:mt-0">
                      {paragraph.replace('# ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-xl md:text-2xl font-black text-white mt-10 mb-5">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={index} className="text-lg md:text-xl font-black text-white mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                
                // Check if it's a list item
                if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- ') || line.startsWith('* '));
                  return (
                    <ul key={index} className="space-y-3 my-6">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[var(--neon-cyan)] mt-1 flex-shrink-0" />
                          <span>{item.replace(/^[*-]\s/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Regular paragraph
                return (
                  <p key={index} className="text-white/80 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-12 p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-[var(--neon-purple)]" />
                <h3 className="text-lg font-black text-white">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 rounded-lg text-sm text-[var(--neon-purple)] font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author_bio && (
            <div className="mb-12 p-8 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-[var(--neon-purple)]/5 border-2 border-[var(--neon-cyan)]/20 rounded-2xl">
              <div className="flex items-start gap-4">
                {post.author_avatar ? (
                  <img
                    src={post.author_avatar}
                    alt={post.author}
                    className="w-16 h-16 rounded-full border-2 border-[var(--neon-cyan)]/30 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] border-2 border-[var(--neon-cyan)]/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black text-white mb-2">About {post.author}</h3>
                  <p className="text-white/70 leading-relaxed">{post.author_bio}</p>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Newsletter CTA */}
        <div className="mb-16 p-8 md:p-12 bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border-2 border-[var(--neon-purple)]/30 rounded-3xl text-center">
          <Sparkles className="w-12 h-12 text-[var(--neon-purple)] mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Get the latest insights on AI, blockchain, cloud, and software engineering delivered to your inbox.
          </p>
          
          {newsletterStatus === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-[var(--neon-green)] font-bold">
              <CheckCircle2 className="w-5 h-5" />
              Thanks for subscribing! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] rounded-lg font-bold text-white hover:shadow-[0_10px_30px_var(--glow-purple)] transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
          
          {newsletterStatus === 'error' && (
            <p className="text-red-400 text-sm mt-2">Failed to subscribe. Please try again.</p>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
                >
                  {relatedPost.featured_image && (
                    <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[var(--neon-purple)] transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[var(--neon-purple)] text-sm font-bold">
                    Read More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-16">
          <BlogComments blogPostId={post.id} blogPostTitle={post.title} />
        </div>
      </div>
    </div>
  );
}
