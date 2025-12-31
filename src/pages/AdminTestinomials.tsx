'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, ThumbsUp, ThumbsDown, Star, User, CheckCircle2, XCircle, Clock, RefreshCw, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';
import { TestimonialFormModal } from '../src/components/admin/TestimonialFormModal';
import { useTestimonials, Testimonial } from '../src/hooks/useTestimonials';
import { supabase } from '../lib/supabase';

export default function TestimonialsManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'rating' | 'client_name'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        action: () => Promise<void>;
        variant: 'danger' | 'warning' | 'info';
    }>({
        isOpen: false,
        title: '',
        message: '',
        action: async () => { },
        variant: 'danger',
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

    const { testimonials, loading, error, refetch } = useTestimonials({
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : statusFilter,
        sortBy,
        sortOrder,
        limit: 50,
    });

    const handleApprove = async (id: string) => {
        toast.promise(
            (async () => {
                const { error: supabaseError } = await supabase
                    .from('testimonials')
                    .update({ status: 'published' })
                    .eq('id', id);

                if (supabaseError) throw supabaseError;
                refetch();
            })(),
            {
                loading: 'Approving testimonial...',
                success: 'Testimonial approved!',
                error: (err: any) => err.message || 'Failed to approve testimonial',
            }
        );
    };

    const handleReject = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Reject Testimonial',
            message: 'Are you sure you want to reject this testimonial? it will be moved to archived.',
            variant: 'warning',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error: supabaseError } = await supabase
                            .from('testimonials')
                            .update({ status: 'archived' })
                            .eq('id', id);

                        if (supabaseError) throw supabaseError;
                        refetch();
                    })(),
                    {
                        loading: 'Rejecting testimonial...',
                        success: 'Testimonial rejected',
                        error: (err: any) => err.message || 'Failed to reject testimonial',
                    }
                );
            },
        });
    };

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Testimonial',
            message: 'Are you sure you want to delete this testimonial? This action cannot be undone.',
            variant: 'danger',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error: supabaseError } = await supabase
                            .from('testimonials')
                            .delete()
                            .eq('id', id);

                        if (supabaseError) throw supabaseError;
                        refetch();
                    })(),
                    {
                        loading: 'Deleting testimonial...',
                        success: 'Testimonial deleted successfully!',
                        error: (err: any) => err.message || 'Failed to delete testimonial',
                    }
                );
            },
        });
    };

    const handleFormSuccess = () => {
        toast(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        refetch();
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                            ? 'fill-[#FF7A00] text-[#FF7A00]'
                            : 'text-white/20'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const stats = {
        total: testimonials.length,
        pending: testimonials.filter(t => t.status === 'pending').length,
        approved: testimonials.filter(t => t.status === 'approved').length,
        rejected: testimonials.filter(t => t.status === 'rejected').length,
        avgRating: testimonials.length > 0
            ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
            : '0.0',
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

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">


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
                                    Testimonials Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Client Reviews
                            </h1>
                            <p className="text-white/60">
                                Manage client testimonials and ratings
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => refetch()}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden md:inline">Refresh</span>
                            </button>
                            <button
                                onClick={() => {
                                    setEditingTestimonial(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Add Testimonial
                            </button>
                        </div>
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
                            <p className="text-xs text-white/40 mb-1">Rejected</p>
                            <p className="text-2xl font-black text-red-400">{stats.rejected}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Avg Rating</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.avgRating}</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-5 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search testimonials..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div className="md:col-span-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="created_at">Sort by Date</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="client_name">Sort by Name</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="md:col-span-3">
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black hover:border-[#00FFFF] transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading testimonials...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Testimonials List */}
                {!loading && !error && testimonials.length > 0 && (
                    <div className="space-y-4">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="relative group"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Testimonial Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                {/* Avatar */}
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DD00FF] to-[#00FFFF] p-0.5 flex-shrink-0">
                                                    <div className="w-full h-full rounded-full bg-[#0B0D14] flex items-center justify-center overflow-hidden relative">
                                                        {testimonial.avatar_url && testimonial.avatar_url.trim() !== '' ? (
                                                            <img
                                                                src={testimonial.avatar_url}
                                                                alt={testimonial.client_name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                                }}
                                                            />
                                                        ) : (
                                                            <User className="w-8 h-8 text-white/60" />
                                                        )}
                                                        {/* Fallback for image error */}
                                                        <div className="hidden absolute inset-0 flex items-center justify-center bg-[#0B0D14]">
                                                            <User className="w-8 h-8 text-white/60" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Client Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                        <h3 className="text-lg font-black text-white">
                                                            {testimonial.client_name}
                                                        </h3>
                                                        {testimonial.status === 'approved' && (
                                                            <span className="px-2 py-1 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-xs text-[#00FF9D] font-bold flex items-center gap-1">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                APPROVED
                                                            </span>
                                                        )}
                                                        {testimonial.status === 'rejected' && (
                                                            <span className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-bold flex items-center gap-1">
                                                                <XCircle className="w-3 h-3" />
                                                                REJECTED
                                                            </span>
                                                        )}
                                                        {testimonial.status === 'pending' && (
                                                            <span className="px-2 py-1 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg text-xs text-[#FF7A00] font-bold flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                PENDING
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-white/60 mb-2">
                                                        {testimonial.position} at {testimonial.company}
                                                    </p>

                                                    <div className="flex items-center gap-3">
                                                        {renderStars(testimonial.rating)}
                                                        <span className="text-xs text-white/40">
                                                            {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <p className="text-white/80 mb-4 leading-relaxed">
                                                "{testimonial.content}"
                                            </p>

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                {testimonial.project_title && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40">Project:</span>
                                                        <span className="text-[#00FFFF] font-bold">
                                                            {testimonial.project_title}
                                                        </span>
                                                    </div>
                                                )}
                                                {testimonial.service_provided && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40">Service:</span>
                                                        <span className="text-[#DD00FF] font-bold">
                                                            {testimonial.service_provided}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            {testimonial.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(testimonial.id)}
                                                        className="p-2 rounded-lg bg-[#00FF9D]/20 border border-[#00FF9D]/50 text-[#00FF9D] hover:bg-[#00FF9D]/30 transition-all"
                                                        title="Approve"
                                                    >
                                                        <ThumbsUp className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(testimonial.id)}
                                                        className="p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
                                                        title="Reject"
                                                    >
                                                        <ThumbsDown className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}

                                            {testimonial.status === 'approved' && (
                                                <button
                                                    onClick={() => handleReject(testimonial.id)}
                                                    className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                                                    title="Reject"
                                                >
                                                    <ThumbsDown className="w-5 h-5" />
                                                </button>
                                            )}

                                            {testimonial.status === 'rejected' && (
                                                <button
                                                    onClick={() => handleApprove(testimonial.id)}
                                                    className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#00FF9D]/30 hover:text-[#00FF9D] transition-all"
                                                    title="Approve"
                                                >
                                                    <ThumbsUp className="w-5 h-5" />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setEditingTestimonial(testimonial);
                                                    setShowModal(true);
                                                }}
                                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                                title="Edit"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(testimonial.id)}
                                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && testimonials.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || statusFilter !== 'all'
                                ? 'No testimonials found'
                                : 'No testimonials yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "Add Testimonial" to get started'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <button
                                onClick={() => {
                                    setEditingTestimonial(null);
                                    setShowModal(true);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Add First Testimonial
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Testimonial Form Modal */}
            <TestimonialFormModal
                testimonial={editingTestimonial}
                isOpen={showModal}
                onSuccess={handleFormSuccess}
                onClose={() => setShowModal(false)}
            />

            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
                variant={confirmModal.variant}
            />
        </div>
    );
}
