'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, ThumbsUp, ThumbsDown, Star, User, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { TestimonialFormModal } from '@/components/admin/TestimonialFormModal';
import { useTestimonials, Testimonial } from '@/hooks/useTestimonials';
import { supabase } from '@/lib/supabase';

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
    toast.success(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
    refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 rounded-lg text-xs text-[var(--neon-green)] font-black flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            APPROVED
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-xs text-red-400 font-black flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            REJECTED
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-3 py-1 bg-[var(--neon-orange)]/10 border-2 border-[var(--neon-orange)]/30 rounded-lg text-xs text-[var(--neon-orange)] font-black flex items-center gap-1">
            <Clock className="w-3 h-3" />
            PENDING
          </span>
        );
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
              ? 'fill-[var(--neon-orange)] text-[var(--neon-orange)]'
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
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Testimonials Manager
            </h1>
            <p className="text-white/60">
              Manage client testimonials and reviews
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditingTestimonial(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            Add Testimonial
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-white/[0.02] border-2 border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total</p>
            <p className="text-2xl font-black text-white">{stats.total}</p>
          </div>
          <div className="p-4 bg-[var(--neon-orange)]/5 border-2 border-[var(--neon-orange)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Pending</p>
            <p className="text-2xl font-black text-[var(--neon-orange)]">{stats.pending}</p>
          </div>
          <div className="p-4 bg-[var(--neon-green)]/5 border-2 border-[var(--neon-green)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Approved</p>
            <p className="text-2xl font-black text-[var(--neon-green)]">{stats.approved}</p>
          </div>
          <div className="p-4 bg-red-500/5 border-2 border-red-500/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Rejected</p>
            <p className="text-2xl font-black text-red-400">{stats.rejected}</p>
          </div>
          <div className="p-4 bg-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Avg Rating</p>
            <p className="text-2xl font-black text-[var(--neon-cyan)]">{stats.avgRating}</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, or content..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="created_at">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="client_name">Sort by Name</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white hover:border-[var(--neon-purple)]/50 transition-colors flex items-center gap-2"
          >
            <ArrowUpDown className="w-5 h-5" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        {/* Loading State - Only on initial load or when no data */}
        {loading && testimonials.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading testimonials...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
            <p className="text-red-400 font-black">{error}</p>
          </div>
        )}

        {/* Testimonials List */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Testimonial Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] p-0.5 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
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
                          {/* Fallback for image error - hidden by default */}
                          <div className="hidden absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)]">
                            <User className="w-8 h-8 text-white/60" />
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-black text-white truncate">
                            {testimonial.client_name}
                          </h3>
                          {getStatusBadge(testimonial.status)}
                        </div>

                        <p className="text-sm text-white/60 mb-1">
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
                          <span className="text-[var(--neon-cyan)] font-black">
                            {testimonial.project_title}
                          </span>
                        </div>
                      )}
                      {testimonial.service_provided && (
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">Service:</span>
                          <span className="text-[var(--neon-purple)] font-black">
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
                          className="p-2 rounded-lg bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 text-[var(--neon-green)] hover:bg-[var(--neon-green)]/20 transition-all"
                          title="Approve"
                        >
                          <ThumbsUp className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(testimonial.id)}
                          className="p-2 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Reject"
                        >
                          <ThumbsDown className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {testimonial.status === 'approved' && (
                      <button
                        onClick={() => handleReject(testimonial.id)}
                        className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                        title="Reject"
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    )}

                    {testimonial.status === 'rejected' && (
                      <button
                        onClick={() => handleApprove(testimonial.id)}
                        className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-green)]/30 hover:text-[var(--neon-green)] transition-all"
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
                      className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery || statusFilter !== 'all'
                ? 'No testimonials found'
                : 'No testimonials yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Click "Add Testimonial" to get started'}
            </p>
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
    </AdminLayout>
  );
}
