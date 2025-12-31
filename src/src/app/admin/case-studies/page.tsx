'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, Briefcase, Star, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { CaseStudyFormModal } from '@/components/admin/CaseStudyFormModal';
import { useCaseStudies, CaseStudy } from '@/hooks/useCaseStudies';
import { supabase } from '@/lib/supabase';

export default function CaseStudiesManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'regular'>('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'views'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
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

  const { caseStudies, loading, error, refetch } = useCaseStudies({
    search: searchQuery,
    status: statusFilter === 'all' ? undefined : statusFilter,
    featured: featuredFilter === 'all' ? undefined : featuredFilter === 'featured',
    industry: industryFilter === 'all' ? undefined : industryFilter,
    sortBy,
    sortOrder,
    limit: 50,
  });



  // Get unique industries from all case studies
  const allIndustries = Array.from(
    new Set(caseStudies.map(cs => cs.client_industry))
  ).sort();

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Case Study',
      message: 'Are you sure you want to delete this case study? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const { error } = await supabase
              .from('case_studies')
              .delete()
              .eq('id', id);

            if (error) throw error;
            refetch();
          })(),
          {
            loading: 'Deleting case study...',
            success: 'Case study deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete case study',
          }
        );
      },
    });
  };

  const toggleFeatured = async (caseStudy: CaseStudy) => {
    toast.promise(
      (async () => {
        const { error } = await supabase
          .from('case_studies')
          .update({
            is_featured: !caseStudy.featured,
            updated_at: new Date().toISOString()
          })
          .eq('id', caseStudy.id);

        if (error) throw error;
        refetch();
      })(),
      {
        loading: caseStudy.featured ? 'Removing from featured...' : 'Adding to featured...',
        success: caseStudy.featured ? 'Removed from featured' : 'Added to featured!',
        error: (err: any) => err.message || 'Failed to update case study',
      }
    );
  };

  const handleFormSuccess = () => {
    toast.success(editingCaseStudy ? 'Case study updated successfully!' : 'Case study created successfully!');
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
    total: caseStudies.length,
    draft: caseStudies.filter(cs => cs.status === 'draft').length,
    published: caseStudies.filter(cs => cs.status === 'published').length,
    featured: caseStudies.filter(cs => cs.featured).length,
    totalViews: caseStudies.reduce((sum, cs) => sum + (cs.views || 0), 0),
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Case Studies Manager
            </h1>
            <p className="text-white/60">
              Showcase your best projects and success stories
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditingCaseStudy(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            New Case Study
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-white/[0.02] border-2 border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Projects</p>
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
            <p className="text-xs text-white/40 mb-1">Featured</p>
            <p className="text-2xl font-black text-[var(--neon-cyan)]">{stats.featured}</p>
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
              placeholder="Search by title, client, or description..."
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
          </select>

          {/* Featured Filter */}
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Projects</option>
            <option value="featured">Featured Only</option>
            <option value="regular">Regular Only</option>
          </select>

          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Industries</option>
            {allIndustries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="created_at">Sort by Date</option>
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
        {loading && caseStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading case studies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
            <p className="text-red-400 font-black">{error}</p>
          </div>
        )}

        {/* Case Studies List */}
        {caseStudies.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
              >
                <div className="flex gap-6">
                  {/* Featured Image */}
                  {caseStudy.featured_image_url ? (
                    <div className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-black/40">
                      <img
                        src={caseStudy.featured_image_url}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-64 h-40 flex-shrink-0 rounded-xl bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border-2 border-white/10 flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white/20" />
                    </div>
                  )}

                  {/* Case Study Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-white truncate">
                            {caseStudy.title}
                          </h3>
                          {getStatusBadge(caseStudy.status)}
                          {caseStudy.featured && (
                            <span className="px-3 py-1 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-lg text-xs text-[var(--neon-cyan)] font-black flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              FEATURED
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                          <span className="font-bold text-[var(--neon-purple)]">
                            {caseStudy.client_name}
                          </span>
                          <span>•</span>
                          <span>{caseStudy.client_industry}</span>
                          <span>•</span>
                          <span>{caseStudy.project_duration}</span>
                          {caseStudy.views !== undefined && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {caseStudy.views} views
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleFeatured(caseStudy)}
                          className={`p-2 rounded-lg border-2 transition-all ${caseStudy.featured
                            ? 'bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)]'
                            : 'bg-black/40 border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)]'
                            }`}
                          title={caseStudy.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          <Star className={`w-5 h-5 ${caseStudy.featured ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => {
                            setEditingCaseStudy(caseStudy);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleDelete(caseStudy.id)}
                          className="p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 mb-3 line-clamp-2">
                      {caseStudy.project_description}
                    </p>

                    {/* Metrics */}
                    {caseStudy.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-3">
                        {caseStudy.metrics.slice(0, 3).map((metric, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 rounded-lg"
                          >
                            <div className="text-2xl font-black text-[var(--neon-green)]">
                              {metric.value}
                            </div>
                            <div className="text-xs text-white/60">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                        {caseStudy.metrics.length > 3 && (
                          <div className="px-4 py-2 flex items-center text-sm text-white/40">
                            +{caseStudy.metrics.length - 3} more
                          </div>
                        )}
                      </div>
                    )}

                    {/* Technologies & Services */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caseStudy.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 rounded-full text-xs text-[var(--neon-purple)] font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                      {caseStudy.technologies.length > 5 && (
                        <span className="px-3 py-1 text-xs text-white/40">
                          +{caseStudy.technologies.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Gallery Preview & Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        {caseStudy.gallery_images.length > 0 && (
                          <span>📸 {caseStudy.gallery_images.length} images</span>
                        )}
                        <span>Slug: /{caseStudy.slug}</span>
                      </div>

                      {/* External Links */}
                      <div className="flex items-center gap-2">
                        {caseStudy.project_url && (
                          <a
                            href={caseStudy.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
                            title="View live project"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && caseStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || industryFilter !== 'all'
                ? 'No case studies found'
                : 'No case studies yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || industryFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Click "New Case Study" to showcase your first project'}
            </p>
          </div>
        )}
      </div>

      {/* Case Study Form Modal */}
      <CaseStudyFormModal
        caseStudy={editingCaseStudy}
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
