'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, FileText, Calendar, Tag, CheckCircle2, Clock, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BlogFormModal } from '../src/components/admin/BlogFormModal';
import { useBlogPosts, BlogPost } from '../src/hooks/useBlogPosts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';

export default function BlogManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'published_at' | 'title' | 'views'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        action: () => Promise<void>;
    }>({
        isOpen: false,
        title: '',
        message: '',
        action: async () => { },
    });
    const navigate = useNavigate();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            }
        };
        checkSession();
        fetchCategories();
    }, [supabase, navigate]);

    const fetchCategories = async () => {
        const { data } = await supabase.from('blog_categories').select('id, name').order('name');
        if (data) setCategories(data);
    };
    const { posts, loading, error, refetch } = useBlogPosts({
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : statusFilter,
        category: categoryFilter === 'all' ? undefined : categoryFilter,
        sortBy,
        sortOrder,
        limit: 50,
    });

    // Categories are now fetched separately

    // Categories are now fetched separately

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Blog Post',
            message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error: supabaseError } = await supabase
                            .from('blog_posts')
                            .delete()
                            .eq('id', id);

                        if (supabaseError) throw supabaseError;
                        refetch();
                    })(),
                    {
                        loading: 'Deleting blog post...',
                        success: 'Blog post deleted successfully!',
                        error: (err: any) => err.message || 'Failed to delete blog post',
                    }
                );
            },
        });
    };

    const handleFormSuccess = () => {
        console.log('Form success callback received in AdminBlogPage');
        const message = editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!';
        toast.success(message);
        refetch();
        setShowModal(false);
        setEditingPost(null);
    };

    const handleFormClose = () => {
        setShowModal(false);
        setEditingPost(null);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return (
                    <span className="px-2.5 py-1 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-xs text-[#00FF9D] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Published
                    </span>
                );
            case 'archived':
                return (
                    <span className="px-2.5 py-1 bg-white/10 border border-white/30 rounded-lg text-xs text-white/50 font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Archived
                    </span>
                );
            case 'draft':
            default:
                return (
                    <span className="px-2.5 py-1 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg text-xs text-[#FF7A00] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Draft
                    </span>
                );
        }
    };

    const stats = {
        total: posts.length,
        draft: posts.filter(p => p.status === 'draft').length,
        published: posts.filter(p => p.status === 'published').length,
        archived: posts.filter(p => p.status === 'archived').length,
        totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    };

    return (
        <div className="min-h-screen bg-[#030005] text-white font-['Inter']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/overview">
                            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                                BLOG <span className="text-[#00FFFF]">MANAGER</span>
                            </h1>
                            <p className="text-white/50 font-medium">Create and manage your articles</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => refetch()}
                            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-[#00FFFF] hover:border-[#00FFFF]/50 transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={() => {
                                setEditingPost(null);
                                setShowModal(true);
                            }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00FFFF] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            New Post
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Total Posts</p>
                        <p className="text-2xl font-black text-white">{stats.total}</p>
                    </div>
                    <div className="p-4 bg-[#FF7A00]/5 border border-[#FF7A00]/20 rounded-2xl">
                        <p className="text-xs text-[#FF7A00]/60 font-bold uppercase tracking-wider mb-1">Drafts</p>
                        <p className="text-2xl font-black text-[#FF7A00]">{stats.draft}</p>
                    </div>
                    <div className="p-4 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-2xl">
                        <p className="text-xs text-[#00FF9D]/60 font-bold uppercase tracking-wider mb-1">Published</p>
                        <p className="text-2xl font-black text-[#00FF9D]">{stats.published}</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/20 rounded-2xl">
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Archived</p>
                        <p className="text-2xl font-black text-white/60">{stats.archived}</p>
                    </div>
                    <div className="p-4 bg-[#B900FF]/5 border border-[#B900FF]/20 rounded-2xl">
                        <p className="text-xs text-[#B900FF]/60 font-bold uppercase tracking-wider mb-1">Total Views</p>
                        <p className="text-2xl font-black text-[#B900FF]">{stats.totalViews}</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#00FFFF]/50 transition-colors"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00FFFF]/50 transition-colors [&>option]:bg-[#0B0D14] [&>option]:text-white"
                    >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00FFFF]/50 transition-colors [&>option]:bg-[#0B0D14] [&>option]:text-white"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white hover:border-[#00FFFF]/50 transition-colors flex items-center gap-2"
                    >
                        <ArrowUpDown className="w-5 h-5" />
                        {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-[#00FFFF]/20 border-t-[#00FFFF] rounded-full animate-spin mb-4"></div>
                        <p className="text-white/40 font-bold animate-pulse">FETCHING ARTICLES...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl text-center">
                        <p className="text-red-400 font-bold mb-4">{error}</p>
                        <button onClick={() => refetch()} className="text-[#00FFFF] font-bold hover:underline">Try Again</button>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-24 bg-white/[0.02] border border-white/10 rounded-3xl">
                        <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
                        <p className="text-white/40 font-bold">NO ARTICLES FOUND</p>
                        <p className="text-white/20 text-sm mt-2">Try adjusting your filters or create a new post</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-3xl hover:bg-white/[0.04] hover:border-[#00FFFF]/30 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Preview */}
                                    <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                                        {post.featured_image ? (
                                            <img
                                                src={post.featured_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10">
                                                <FileText className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-black text-white group-hover:text-[#00FFFF] transition-colors line-clamp-1">
                                                    {post.title}
                                                </h3>
                                                {getStatusBadge(post.status)}
                                                {post.is_featured && (
                                                    <span className="px-2 py-0.5 bg-[#B900FF]/10 border border-[#B900FF]/30 rounded text-[10px] text-[#B900FF] font-black uppercase">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingPost(post);
                                                        setShowModal(true);
                                                    }}
                                                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-[#00FFFF] hover:border-[#00FFFF]/50 transition-all"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-red-400 hover:border-red-400/50 transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-white/40 mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
                                                    {post.author_name?.charAt(0) || 'A'}
                                                </div>
                                                {post.author_name}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5">
                                                <Eye className="w-4 h-4" />
                                                {post.views || 0} views
                                            </span>
                                        </div>

                                        <p className="text-white/60 text-sm line-clamp-2 mb-4 font-medium">
                                            {post.excerpt || 'No excerpt provided.'}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {post.category && (
                                                <span className="px-3 py-1 bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-full text-xs text-[#00FFFF] font-bold">
                                                    {post.category.name}
                                                </span>
                                            )}
                                            {(post.tags || []).map((t: any) => (
                                                <span
                                                    key={t.tag.id}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 font-medium flex items-center gap-1"
                                                >
                                                    <Tag className="w-3 h-3" />
                                                    {t.tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form Modal */}
            <BlogFormModal
                post={editingPost}
                isOpen={showModal}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
            />

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
                variant="danger"
            />
        </div>
    );
}