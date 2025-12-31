import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Tag,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Link2,
    Eye,
    MessageCircle,
    Heart,
    ChevronRight,
    TrendingUp,
    Loader2,
    Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogComments } from '../src/components/BlogComments';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    author_name: string;
    author_avatar?: string;
    author_role?: string;
    published_at: string;
    read_time?: number;
    views: number;
    status: string;
    category?: { name: string };
    tags: string[];
}

export function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const normalizeImageUrl = (url: string | null | undefined) => {
        if (!url) return null;
        const trimmed = url.trim();
        if (!trimmed) return null;
        return trimmed.startsWith('http://') ? `https://${trimmed.slice(7)}` : trimmed;
    };

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch post details
            const { data: postData, error: postError } = await supabase
                .from('blog_posts')
                .select(`
          *,
          category:blog_categories(name),
          tags:blog_post_tags(tag:blog_tags(name))
        `)
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (postError) throw postError;
            if (!postData) throw new Error('Post not found');

            const transformedPost: BlogPost = {
                ...postData,
                featured_image: normalizeImageUrl(postData.featured_image),
                author_avatar: normalizeImageUrl(postData.author_avatar),
                tags: postData.tags?.map((t: any) => t.tag?.name).filter(Boolean) || [],
                read_time: postData.read_time
            };

            setPost(transformedPost);

            // Fetch related posts (same category)
            if (postData.category_id) {
                const { data: relatedData } = await supabase
                    .from('blog_posts')
                    .select('id, title, slug, excerpt, featured_image, published_at, read_time')
                    .eq('category_id', postData.category_id)
                    .eq('status', 'published')
                    .neq('id', postData.id)
                    .limit(3);

                if (relatedData) {
                    setRelatedPosts(relatedData.map(p => ({
                        ...p,
                        featured_image: normalizeImageUrl(p.featured_image)
                    })));
                }
            }

        } catch (err: any) {
            console.error('Error fetching blog post:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = post?.title || '';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
                setShowShareMenu(false);
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            setShowShareMenu(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#00FFFF] animate-spin mx-auto mb-4" />
                    <p className="text-white/60 font-black tracking-widest uppercase">Loading Article...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-[#05060A] flex items-center justify-center p-4">
                <div className="max-w-md w-full p-8 bg-black/50 border-2 border-red-500/30 rounded-3xl text-center backdrop-blur-xl">
                    <MessageCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-white mb-4">Post Not Found</h2>
                    <p className="text-white/60 mb-8">{error || 'The article you are looking for could not be found.'}</p>
                    <Link to="/blog">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white rounded-2xl font-black flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Blog
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
            {/* Ultra-premium neon background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#FF0099] rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#00FFFF] rounded-full blur-[150px] opacity-10"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
                {/* Back Button */}
                <Link to="/blog">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-white/10 rounded-xl text-white/70 hover:border-[#00FFFF] hover:text-white transition-all mb-12 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-black">Back to Blog</span>
                    </button>
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    {/* Category */}
                    {post.category && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0099]/10 border-2 border-[#FF0099]/30 rounded-xl mb-6 backdrop-blur-sm">
                            <Tag className="w-4 h-4 text-[#FF0099]" />
                            <span className="text-[#FF0099] font-black text-sm uppercase tracking-wider">{post.category.name}</span>
                        </div>
                    )}

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 pb-8 border-b-2 border-white/10">
                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00FFFF]/30 to-[#DD00FF]/30 border-2 border-[#00FFFF]/50 backdrop-blur-sm overflow-hidden">
                                {post.author_avatar ? (
                                    <img src={post.author_avatar} alt={post.author_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-black text-xl">
                                        {post.author_name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-white font-black text-lg">{post.author_name}</p>
                                <p className="text-white/50 text-sm font-bold">{post.author_role || 'Tech Expert'}</p>
                            </div>
                        </div>

                        <div className="h-10 w-px bg-white/10 hidden md:block"></div>

                        {/* Date & Read Time */}
                        <div className="flex flex-wrap items-center gap-6 text-white/60 font-black text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#00FFFF]" />
                                <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#DD00FF]" />
                                <span>{post.read_time || Math.max(1, Math.ceil((post.content?.replace(/<[^>]*>/g, '').trim().split(/\s+/).length || 0) / 200))} min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-[#FF0099]" />
                                <span>{post.views.toLocaleString()} views</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <div className="relative group mb-16">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="relative mb-16">
                    {/* Excerpt */}
                    {post.excerpt && (
                        <div className="mb-12 p-8 bg-white/[0.02] border-l-4 border-[#00FFFF] rounded-r-3xl backdrop-blur-sm">
                            <p className="text-xl md:text-2xl text-white/90 font-bold italic leading-relaxed">
                                "{post.excerpt}"
                            </p>
                        </div>
                    )}

                    {/* Main Content Body */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:bg-gradient-to-r prose-h2:from-white prose-h2:to-white/60 prose-h2:bg-clip-text prose-h2:text-transparent
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
              prose-a:text-[#00FFFF] prose-a:no-underline hover:prose-a:text-[#DD00FF] prose-a:transition-colors prose-a:font-black
              prose-strong:text-white prose-strong:font-black
              prose-code:text-[#00FFFF] prose-code:bg-black/60 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-bold
              prose-pre:bg-black/60 prose-pre:border-2 prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-2xl
              prose-ul:text-white/80 prose-ol:text-white/80 prose-li:mb-3
              prose-blockquote:border-l-4 prose-blockquote:border-[#DD00FF] prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-white/70 prose-blockquote:bg-white/[0.02] prose-blockquote:py-4 prose-blockquote:rounded-r-2xl
              prose-img:rounded-3xl prose-img:border-2 prose-img:border-white/10 prose-img:shadow-2xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Tags, Share & Like */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-3xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Tag className="w-6 h-6 text-[#DD00FF]" />
                                <h3 className="text-xl font-black text-white uppercase tracking-wider">Tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-black/40 border-2 border-white/10 rounded-xl text-sm font-black text-white/60 hover:border-[#DD00FF]/50 hover:text-white transition-all cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share & Like */}
                    <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-3xl backdrop-blur-sm">
                        <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wider">Spread the Word</h3>
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Like Button */}
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${liked
                                    ? 'bg-[#FF0099]/20 border-2 border-[#FF0099]/50 text-[#FF0099] shadow-[0_0_30px_rgba(255,0,153,0.3)]'
                                    : 'bg-white/5 border-2 border-white/10 text-white/70 hover:border-[#FF0099]/50 hover:text-white'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                                <span>{liked ? 'Liked' : 'Like'}</span>
                            </button>

                            {/* Share Trigger */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-black rounded-xl hover:shadow-[0_10px_40px_rgba(0,255,255,0.4)] transition-all"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>

                                {showShareMenu && (
                                    <div className="absolute right-0 bottom-full mb-4 w-56 bg-[#0B0D14] border-2 border-white/10 rounded-2xl p-3 shadow-2xl z-50 backdrop-blur-xl">
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all font-bold"
                                        >
                                            <Facebook className="w-5 h-5 text-[#1877F2]" />
                                            <span>Facebook</span>
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all font-bold"
                                        >
                                            <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                                            <span>Twitter</span>
                                        </button>
                                        <button
                                            onClick={() => handleShare('linkedin')}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all font-bold"
                                        >
                                            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                                            <span>LinkedIn</span>
                                        </button>
                                        <div className="h-px bg-white/10 my-2"></div>
                                        <button
                                            onClick={() => handleShare('copy')}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all font-bold"
                                        >
                                            <Link2 className="w-5 h-5 text-[#00FFFF]" />
                                            <span>Copy Link</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-10">
                            <TrendingUp className="w-8 h-8 text-[#DD00FF]" />
                            <h2 className="text-3xl md:text-4xl font-black text-white">Related <span className="text-[#DD00FF]">Articles</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                                    <div className="relative h-full p-6 bg-white/[0.02] border-2 border-white/10 rounded-3xl hover:border-[#DD00FF]/50 transition-all duration-500 hover:scale-[1.02]">
                                        {relatedPost.featured_image && (
                                            <div className="aspect-video rounded-2xl overflow-hidden mb-6 border-2 border-white/10">
                                                <img
                                                    src={relatedPost.featured_image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#00FFFF] transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-white/60 text-sm mb-6 line-clamp-2 font-medium">
                                            {relatedPost.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-6 border-t-2 border-white/10">
                                            <span className="text-xs font-black text-white/40 uppercase tracking-widest">
                                                {new Date(relatedPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                            <div className="flex items-center gap-1 text-[#00FFFF] font-black text-sm">
                                                <span>Read</span>
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div className="mt-16 pt-16 border-t-2 border-white/10">
                    <BlogComments blogPostId={post.id} blogPostTitle={post.title} />
                </div>

                {/* Final Back Button */}
                <div className="mt-20 text-center">
                    <Link to="/blog">
                        <button className="inline-flex items-center gap-3 px-10 py-5 bg-white/[0.03] border-2 border-white/10 rounded-2xl text-white font-black hover:border-[#00FFFF] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all">
                            <ArrowLeft className="w-6 h-6" />
                            Back to All Articles
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
