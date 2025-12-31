'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, FileText, Calendar, Tag, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { BlogFormModal } from '@/components/admin/BlogFormModal';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';

export default function BlogManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'published_at' | 'title' | 'views'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
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

  const { posts, loading, error, refetch } = useBlogPosts({
    search: searchQuery,
    status: statusFilter === 'all' ? undefined : statusFilter,
    category: categoryFilter === 'all' ? undefined : categoryFilter,
    sortBy,
    sortOrder,
    limit: 50,
  });

  // Get unique categories from all posts
  const allCategories = Array.from(
    new Set(posts.map(post => post.category?.name).filter(Boolean))
  ).sort() as string[];

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Blog Post',
      message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/blog/${id}`, {
              method: 'DELETE',
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete blog post');

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
    toast.success(editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!');
    refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-3 py-1 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 rounded-lg text-xs text-[var(--neon-green)] font-black flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            PUBLISHED
          </span>
        );
      case 'archived':
        return (
          <span className="px-3 py-1 bg-white/10 border-2 border-white/30 rounded-lg text-xs text-white/50 font-black flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            ARCHIVED
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="px-3 py-1 bg-[var(--neon-orange)]/10 border-2 border-[var(--neon-orange)]/30 rounded-lg text-xs text-[var(--neon-orange)] font-black flex items-center gap-1">
            <Clock className="w-3 h-3" />
            DRAFT
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
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Blog Manager
            </h1>
            <p className="text-white/60">
              Create and manage blog posts
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditingPost(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            New Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-white/[0.02] border-2 border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Posts</p>
            <p className="text-2xl font-black text-white">{stats.total}</p>
          </div>
          <div className="p-4 bg-[var(--neon-orange)]/5 border-2 border-[var(--neon-orange)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Drafts</p>
            <p className="text-2xl font-black text-[var(--neon-orange)]">{stats.draft}</p>
          </div>
          <div className="p-4 bg-[var(--neon-green)]/5 border-2 border-[var(--neon-green)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Published</p>
            <p className="text-2xl font-black text-[var(--neon-green)]">{stats.published}</p>
          </div>
          <div className="p-4 bg-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Archived</p>
            <p className="text-2xl font-black text-[var(--neon-cyan)]">{stats.archived}</p>
          </div>
          <div className="p-4 bg-[var(--neon-purple)]/5 border-2 border-[var(--neon-purple)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Views</p>
            <p className="text-2xl font-black text-[var(--neon-purple)]">{stats.totalViews}</p>
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
              placeholder="Search by title, content, or author..."
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="created_at">Sort by Date</option>
            <option value="published_at">Sort by Published</option>
            <option value="title">Sort by Title</option>
            <option value="views">Sort by Views</option>
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
        {loading && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
            <p className="text-red-400 font-black">{error}</p>
          </div>
        )}

        {/* Blog Posts List */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
              >
                <div className="flex gap-6">
                  {/* Featured Image */}
                  {post.featured_image ? (
                    <div className="w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-black/40">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-32 flex-shrink-0 rounded-xl bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border-2 border-white/10 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-white/20" />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-white truncate">
                            {post.title}
                          </h3>
                          {getStatusBadge(post.status)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>By {post.author_name}</span>
                          <span>•</span>
                          <span>
                            {post.status === 'published' && post.published_at
                              ? new Date(post.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                              : `Created ${new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}`}
                          </span>
                          {post.views !== undefined && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.views} views
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-white/70 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Categories & Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.category && (
                        <span
                          key={post.category.id}
                          className="px-3 py-1 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 rounded-full text-xs text-[var(--neon-purple)] font-bold"
                        >
                          {post.category.name}
                        </span>
                      )}
                      {(post.tags || []).map((t) => (
                        <span
                          key={t.tag.id}
                          className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-xs text-white/60 font-bold flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {t.tag.name}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>Slug: /{post.slug}</span>
                      {post.meta_title && (
                        <>
                          <span>•</span>
                          <span>SEO Optimized</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'No posts found'
                : 'No blog posts yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Click "New Post" to create your first blog post'}
            </p>
          </div>
        )}
      </div>

      {/* Blog Form Modal */}
      <BlogFormModal
        post={editingPost}
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
        variant="danger"
      />
    </AdminLayout>
  );
}
