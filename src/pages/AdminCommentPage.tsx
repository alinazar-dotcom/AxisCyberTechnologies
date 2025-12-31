'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    Search,
    ArrowUpDown,
    Trash2,
    RefreshCw,
    ArrowLeft,
    ThumbsUp,
    ThumbsDown,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    Mail,
    Globe,
    Calendar,
    FileText,
    Eye,
    X
} from 'lucide-react';
import { useComments, Comment } from '../src/hooks/useComments';
import { supabase } from '@/lib/supabase';

export default function CommentsManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'spam' | 'trash'>('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'author_name'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        type: 'danger' | 'warning';
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        type: 'warning'
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
    }, [supabase, navigate]);

    const { comments, loading, error, refetch } = useComments({
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : statusFilter,
        sortBy,
        sortOrder,
        limit: 100,
    });

    const toast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleApprove = async (id: string) => {
        try {
            const { error: supabaseError } = await supabase
                .from('comments')
                .update({
                    status: 'approved',
                    is_approved: true
                })
                .eq('id', id);

            if (supabaseError) throw supabaseError;

            toast('Comment approved successfully');
            refetch();
            if (selectedComment?.id === id) {
                setSelectedComment({ ...selectedComment, status: 'approved' });
            }
        } catch (err: any) {
            toast(err.message || 'Failed to approve comment', 'error');
        }
    };

    const handleMarkSpam = async (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Mark as Spam',
            message: 'Are you sure you want to mark this comment as spam?',
            type: 'warning',
            onConfirm: async () => {
                try {
                    const { error: supabaseError } = await supabase
                        .from('comments')
                        .update({
                            status: 'spam',
                            is_approved: false
                        })
                        .eq('id', id);

                    if (supabaseError) throw supabaseError;

                    toast('Comment marked as spam');
                    refetch();
                    if (selectedComment?.id === id) {
                        setSelectedComment({ ...selectedComment, status: 'spam' });
                    }
                } catch (err: any) {
                    toast(err.message || 'Failed to mark as spam', 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleTrash = async (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Move to Trash',
            message: 'Are you sure you want to move this comment to trash?',
            type: 'warning',
            onConfirm: async () => {
                try {
                    const { error: supabaseError } = await supabase
                        .from('comments')
                        .update({
                            status: 'trash',
                            is_approved: false
                        })
                        .eq('id', id);

                    if (supabaseError) throw supabaseError;

                    toast('Comment moved to trash');
                    refetch();
                    if (selectedComment?.id === id) {
                        setSelectedComment(null);
                    }
                } catch (err: any) {
                    toast(err.message || 'Failed to move to trash', 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleDelete = async (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Permanently',
            message: 'Are you sure you want to permanently delete this comment? This action cannot be undone.',
            type: 'danger',
            onConfirm: async () => {
                try {
                    const { error: supabaseError } = await supabase
                        .from('comments')
                        .update({
                            status: 'trash',
                            is_approved: false
                        })
                        .eq('id', id);

                    if (supabaseError) throw supabaseError;

                    toast('Comment deleted permanently');
                    refetch();
                    if (selectedComment?.id === id) {
                        setSelectedComment(null);
                    }
                } catch (err: any) {
                    toast(err.message || 'Failed to delete comment', 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/30';
            case 'pending':
                return 'text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/30';
            case 'spam':
                return 'text-red-400 bg-red-400/10 border-red-400/30';
            case 'trash':
                return 'text-white/40 bg-white/5 border-white/10';
            default:
                return 'text-white/60 bg-white/10 border-white/30';
        }
    };

    const stats = {
        total: comments.length,
        pending: comments.filter(c => c.status === 'pending').length,
        approved: comments.filter(c => c.status === 'approved').length,
        spam: comments.filter(c => c.status === 'spam').length,
        trash: comments.filter(c => c.status === 'trash').length,
    };

    return (
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #DD00FF 0%, transparent 70%)',
                        transform: 'translate(-40%, -40%)'
                    }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
                        transform: 'translate(40%, 40%)'
                    }}
                ></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
                        <div className={`px-6 py-3 rounded-xl backdrop-blur-xl border-2 ${toastType === 'success'
                            ? 'bg-[#00FF9D]/10 border-[#00FF9D]/50 text-[#00FF9D]'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`}>
                            {toastMessage}
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Link to="/admin/overview">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </Link>
                                <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase">
                                    Comments Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Blog Comments
                            </h1>
                            <p className="text-white/60">
                                Moderate and manage blog post comments
                            </p>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden md:inline">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                            <p className="text-xs text-white/40 mb-1">Total</p>
                            <p className="text-2xl font-black text-white">{stats.total}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF7A00]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF7A00]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF7A00]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF7A00]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Pending</p>
                            <p className="text-2xl font-black text-[#FF7A00]">{stats.pending}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Approved</p>
                            <p className="text-2xl font-black text-[#00FF9D]">{stats.approved}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-red-500/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-red-500/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-red-500/40"></div>
                            <p className="text-xs text-white/40 mb-1">Spam</p>
                            <p className="text-2xl font-black text-red-400">{stats.spam}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                            <p className="text-xs text-white/40 mb-1">Trash</p>
                            <p className="text-2xl font-black text-white/40">{stats.trash}</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-7 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search comments by author or content..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="spam">Spam</option>
                            <option value="trash">Trash</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="md:col-span-2">
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black hover:border-[#00FFFF] transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                            {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading comments...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Comments Grid */}
                {!loading && !error && comments.length > 0 && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Comments List */}
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    onClick={() => setSelectedComment(comment)}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                    <div className={`relative bg-[#0B0D14]/90 backdrop-blur-xl border rounded-2xl p-5 transition-all duration-500 ${selectedComment?.id === comment.id
                                        ? 'border-[#00FFFF]/40 shadow-[0_0_20px_rgba(0,255,255,0.1)]'
                                        : 'border-white/10 group-hover:border-white/20'
                                        }`}>
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-black text-white mb-1">
                                                    {comment.author_name}
                                                    {comment.parent && (
                                                        <span className="ml-2 text-[10px] text-[#00FFFF]/60 font-medium uppercase tracking-wider">
                                                            Reply to {comment.parent.author_name} ({comment.parent.author_email})
                                                        </span>
                                                    )}
                                                </h4>
                                                <p className="text-xs text-white/50 truncate">{comment.author_email}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border flex-shrink-0 ${getStatusColor(comment.status)}`}>
                                                {comment.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Content Preview */}
                                        <p className="text-white/70 text-sm mb-3 line-clamp-3">
                                            {comment.content}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-xs text-white/40 flex-wrap">
                                            {comment.blog_posts && (
                                                <span className="flex items-center gap-1">
                                                    <FileText className="w-3 h-3" />
                                                    {comment.blog_posts.title}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Comment Details */}
                        {selectedComment ? (
                            <div className="sticky top-24">
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-xl"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-6 h-[800px] flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-black text-white">{selectedComment.author_name}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(selectedComment.status)}`}>
                                                        {selectedComment.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/60">{selectedComment.author_email}</p>
                                                {selectedComment.parent && (
                                                    <div className="mt-2 flex items-center gap-2 text-xs text-[#00FFFF]/60">
                                                        <MessageSquare className="w-3 h-3" />
                                                        <span>Replying to {selectedComment.parent.author_name} ({selectedComment.parent.author_email})</span>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => setSelectedComment(null)}
                                                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-all"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                            {/* Author Details */}
                                            <div className="space-y-3 mb-5">
                                                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                    <p className="text-xs text-white/50 mb-1">Email</p>
                                                    <a href={`mailto:${selectedComment.author_email}`} className="text-white hover:text-[#00FFFF] transition-colors flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        {selectedComment.author_email}
                                                    </a>
                                                </div>

                                                {selectedComment.author_website && (
                                                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                        <p className="text-xs text-white/50 mb-1">Website</p>
                                                        <a href={selectedComment.author_website} target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:underline flex items-center gap-2">
                                                            <Globe className="w-4 h-4" />
                                                            {selectedComment.author_website}
                                                        </a>
                                                    </div>
                                                )}

                                                {selectedComment.blog_posts && (
                                                    <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                        <p className="text-xs text-white/50 mb-1">Blog Post</p>
                                                        <p className="text-white font-bold">{selectedComment.blog_posts.title}</p>
                                                    </div>
                                                )}

                                                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                    <p className="text-xs text-white/50 mb-1">Posted</p>
                                                    <p className="text-white">
                                                        {new Date(selectedComment.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Comment Content */}
                                            <div className="p-4 bg-black/40 border border-white/10 rounded-xl mb-5">
                                                <p className="text-xs text-white/50 mb-2 font-bold">Comment</p>
                                                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedComment.content}</p>
                                            </div>

                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-3">
                                            <p className="text-sm text-white/60 font-bold">Actions:</p>

                                            {selectedComment.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleApprove(selectedComment.id)}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF9D]/20 border border-[#00FF9D]/50 rounded-lg text-[#00FF9D] font-bold hover:bg-[#00FF9D]/30 transition-all"
                                                >
                                                    <ThumbsUp className="w-4 h-4" />
                                                    Approve Comment
                                                </button>
                                            )}

                                            {selectedComment.status !== 'spam' && (
                                                <button
                                                    onClick={() => handleMarkSpam(selectedComment.id)}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-bold hover:bg-red-500/20 transition-all"
                                                >
                                                    <AlertTriangle className="w-4 h-4" />
                                                    Mark as Spam
                                                </button>
                                            )}

                                            {selectedComment.status !== 'trash' && (
                                                <button
                                                    onClick={() => handleTrash(selectedComment.id)}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/60 font-bold hover:bg-white/10 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Move to Trash
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(selectedComment.id)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-400 font-bold hover:bg-red-500/30 transition-all"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Delete Permanently
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[800px] text-white/40 bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="text-center">
                                    <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">Select a comment to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && comments.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || statusFilter !== 'all'
                                ? 'No comments found'
                                : 'No comments yet'}
                        </p>
                        <p className="text-white/40 text-sm">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Comments will appear here when visitors comment on blog posts'}
                        </p>
                    </div>
                )}
            </div>

            {/* Confirm Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                    ></div>
                    <div className="relative w-full max-w-md bg-[#0B0D14] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${confirmModal.type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-[#FF7A00]/10 text-[#FF7A00]'
                            }`}>
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{confirmModal.title}</h3>
                        <p className="text-white/60 mb-8 leading-relaxed">{confirmModal.message}</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmModal.onConfirm}
                                className={`flex-1 px-6 py-3 rounded-xl text-white font-bold transition-all ${confirmModal.type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-[#FF7A00] hover:bg-[#FF8A00] shadow-[0_0_20px_rgba(255,122,0,0.3)]'
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
