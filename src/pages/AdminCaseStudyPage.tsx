'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, Briefcase, Star, CheckCircle2, Clock, RefreshCw, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';
import { CaseStudyFormModal } from '../src/components/admin/CaseStudyFormModal';
import { useCaseStudies, CaseStudy } from '../src/hooks/useCaseStudies';
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
        variant?: 'danger' | 'warning' | 'info';
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

    // Get unique industries from all case studies
    const allIndustries = Array.from(
        new Set(caseStudies.map(cs => cs.client_industry))
    ).sort();

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Case Study',
            message: 'Are you sure you want to delete this case study? This action cannot be undone.',
            variant: 'danger',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error: supabaseError } = await supabase
                            .from('case_studies')
                            .delete()
                            .eq('id', id);

                        if (supabaseError) throw supabaseError;
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
                const { error: supabaseError } = await supabase
                    .from('case_studies')
                    .update({ is_featured: !caseStudy.featured })
                    .eq('id', caseStudy.id);

                if (supabaseError) throw supabaseError;
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
        refetch();
    };

    const stats = {
        total: caseStudies.length,
        draft: caseStudies.filter(cs => cs.status === 'draft').length,
        published: caseStudies.filter(cs => cs.status === 'published').length,
        featured: caseStudies.filter(cs => cs.featured).length,
        totalViews: caseStudies.reduce((sum, cs) => sum + (cs.views || 0), 0),
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
                                    Case Studies Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Success Stories
                            </h1>
                            <p className="text-white/60">
                                Showcase your best projects and client achievements
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
                                    setEditingCaseStudy(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                New Case Study
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
                            <p className="text-xs text-white/40 mb-1">Drafts</p>
                            <p className="text-2xl font-black text-[#FF7A00]">{stats.draft}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Published</p>
                            <p className="text-2xl font-black text-[#00FF9D]">{stats.published}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Featured</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.featured}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#DD00FF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#DD00FF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Views</p>
                            <p className="text-2xl font-black text-[#DD00FF]">{stats.totalViews}</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-4 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search case studies..."
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
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Featured Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Items</option>
                            <option value="featured">Featured Only</option>
                            <option value="regular">Regular Only</option>
                        </select>
                    </div>

                    {/* Industry Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={industryFilter}
                            onChange={(e) => setIndustryFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Industries</option>
                            {allIndustries.map(industry => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="md:col-span-2">
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black hover:border-[#00FFFF] transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </button>
                    </div>
                </div>

                {/* Loading State - Only on initial load or when no data */}
                {loading && caseStudies.length === 0 && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading case studies...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Case Studies List */}
                {((!loading && caseStudies.length > 0) || (loading && caseStudies.length > 0)) && (
                    <div className="grid grid-cols-1 gap-6">
                        {caseStudies.map((caseStudy) => (
                            <div
                                key={caseStudy.id}
                                className="relative group"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 transition-all">
                                    <div className="p-6 flex gap-6">
                                        {/* Featured Image */}
                                        {caseStudy.featured_image_url ? (
                                            <div className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-black/40 relative">
                                                <img
                                                    src={caseStudy.featured_image_url}
                                                    alt={caseStudy.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Status badge on image */}
                                                <div className="absolute top-2 left-2">
                                                    {caseStudy.status === 'published' ? (
                                                        <span className="px-2 py-1 bg-[#00FF9D]/90 backdrop-blur-sm border border-[#00FF9D] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-[#FF7A00]/90 backdrop-blur-sm border border-[#FF7A00] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            Draft
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-64 h-40 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#DD00FF]/20 to-[#00FFFF]/20 border border-white/10 flex items-center justify-center">
                                                <Briefcase className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}

                                        {/* Case Study Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                        <h3 className="text-xl font-black text-white">
                                                            {caseStudy.title}
                                                        </h3>
                                                        {caseStudy.featured && (
                                                            <span className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-xs text-[#00FFFF] font-bold flex items-center gap-1">
                                                                <Star className="w-3 h-3 fill-current" />
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm text-white/60 mb-2 flex-wrap">
                                                        <span className="font-bold text-[#DD00FF]">
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
                                                                    {caseStudy.views}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => toggleFeatured(caseStudy)}
                                                        className={`p-2 rounded-lg border transition-all ${caseStudy.featured
                                                            ? 'bg-[#00FFFF]/20 border-[#00FFFF]/50 text-[#00FFFF]'
                                                            : 'bg-black/40 border-white/10 text-white/60 hover:border-[#00FFFF]/30 hover:text-[#00FFFF]'
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
                                                        className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(caseStudy.id)}
                                                        className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
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
                                                            className="px-4 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg"
                                                        >
                                                            <div className="text-2xl font-black text-[#00FF9D]">
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

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {caseStudy.technologies.slice(0, 5).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 bg-[#DD00FF]/10 border border-[#DD00FF]/30 rounded-full text-xs text-[#DD00FF] font-bold"
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

                                            {/* Meta & Links */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-white/40">
                                                    {caseStudy.gallery_images.length > 0 && (
                                                        <span>📸 {caseStudy.gallery_images.length} images</span>
                                                    )}
                                                    <span>/{caseStudy.slug}</span>
                                                </div>

                                                {/* External Links */}
                                                <div className="flex items-center gap-2">
                                                    {caseStudy.project_url && (
                                                        <a
                                                            href={caseStudy.project_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#00FFFF]/30 hover:text-[#00FFFF] transition-all text-xs"
                                                            title="View live project"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            Live
                                                        </a>
                                                    )}
                                                </div>
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
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || industryFilter !== 'all'
                                ? 'No case studies found'
                                : 'No case studies yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || industryFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "New Case Study" to showcase your first project'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && featuredFilter === 'all' && industryFilter === 'all' && (
                            <button
                                onClick={() => {
                                    setEditingCaseStudy(null);
                                    setShowModal(true);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Create First Case Study
                            </button>
                        )}
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
                variant={confirmModal.variant || 'danger'}
            />
        </div>
    );
}
