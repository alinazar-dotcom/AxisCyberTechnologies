'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, LayoutGrid, Star, CheckCircle2, XCircle, RefreshCw, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortfolio, PortfolioItem } from '../src/hooks/usePortfolio';

import { supabase } from '../lib/supabase';

export default function PortfolioManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'notfeatured'>('all');
    const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'display_order' | 'views'>('display_order');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

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

    const { items, loading, error, refetch } = usePortfolio({
        search: searchQuery,
        category: categoryFilter === 'all' ? undefined : categoryFilter,
        featured: featuredFilter === 'all' ? undefined : featuredFilter === 'featured',
        active: activeFilter === 'all' ? undefined : activeFilter === 'active',
        sortBy,
        sortOrder,
        limit: 50,
    });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // Get unique categories from all items
    const allCategories = Array.from(
        new Set(items.map(item => item.category))
    ).sort();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this portfolio item? This action cannot be undone.')) return;

        try {
            const { error } = await supabase
                .from('case_studies')
                .delete()
                .eq('id', id);

            if (error) throw error;

            showToast('Portfolio item deleted successfully!');
            refetch();
        } catch (err: any) {
            console.error('Error deleting portfolio item:', err);
            showToast(err.message || 'Failed to delete portfolio item', 'error');
        }
    };

    const stats = {
        total: items.length,
        featured: items.filter(i => i.is_featured).length,
        active: items.filter(i => i.is_active).length,
        inactive: items.filter(i => !i.is_active).length,
        totalViews: items.reduce((sum, i) => sum + (i.views || 0), 0),
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
                {/* Toast Notification */}
                {toastMessage && (
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
                                    Portfolio Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Portfolio Projects
                            </h1>
                            <p className="text-white/60">
                                Showcase your best work and projects
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
                            <Link
                                to="/admin/portfolio/new"
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                New Project
                            </Link>
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
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF0099]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF0099]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF0099]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Featured</p>
                            <p className="text-2xl font-black text-[#FF0099]">{stats.featured}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Active</p>
                            <p className="text-2xl font-black text-[#00FF9D]">{stats.active}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF7A00]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF7A00]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF7A00]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF7A00]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Inactive</p>
                            <p className="text-2xl font-black text-[#FF7A00]">{stats.inactive}</p>
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
                            placeholder="Search projects..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
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
                            <option value="notfeatured">Not Featured</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading portfolio items...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Portfolio Grid */}
                {!loading && !error && items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                to={`/admin/portfolio/${item.id}`}
                                className="relative group h-full block"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-[#00FFFF]/50 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all h-full flex flex-col cursor-pointer">
                                    {/* Image */}
                                    {item.featured_image_url ? (
                                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.featured_image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#DD00FF]/20 to-[#00FFFF]/20 flex items-center justify-center"><svg class="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg></div>';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                            {/* Badges on Image */}
                                            <div className="absolute top-3 left-3 flex gap-2 z-10">
                                                {item.is_featured && (
                                                    <span className="px-2 py-1 bg-[#FF0099]/90 backdrop-blur-sm border border-[#FF0099] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quick Actions on Image */}
                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDelete(item.id);
                                                    }}
                                                    className="p-2 rounded-lg bg-red-500/80 backdrop-blur-sm border border-red-500 text-white hover:bg-red-500 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute bottom-3 right-3 z-10">
                                                {item.is_active ? (
                                                    <span className="px-2 py-1 bg-[#00FF9D]/90 backdrop-blur-sm border border-[#00FF9D] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-[#FF7A00]/90 backdrop-blur-sm border border-[#FF7A00] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" />
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-[#DD00FF]/20 to-[#00FFFF]/20 border-b border-white/10 flex items-center justify-center flex-shrink-0 relative">
                                            <LayoutGrid className="w-16 h-16 text-white/20" />
                                            <div className="absolute top-3 left-3">
                                                {item.is_featured && (
                                                    <span className="px-2 py-1 bg-[#FF0099]/90 backdrop-blur-sm border border-[#FF0099] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-current" />
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDelete(item.id);
                                                    }}
                                                    className="p-2 rounded-lg bg-red-500/80 backdrop-blur-sm border border-red-500 text-white hover:bg-red-500 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-3 right-3">
                                                {item.is_active ? (
                                                    <span className="px-2 py-1 bg-[#00FF9D]/90 backdrop-blur-sm border border-[#00FF9D] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-[#FF7A00]/90 backdrop-blur-sm border border-[#FF7A00] rounded-lg text-xs text-white font-bold flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" />
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-5 flex-1 flex flex-col relative">
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                                            <div className="px-6 py-3 bg-[#00FFFF]/20 backdrop-blur-xl border-2 border-[#00FFFF] rounded-2xl">
                                                <div className="flex items-center gap-2 text-[#00FFFF] font-black uppercase tracking-wider text-sm">
                                                    <Edit className="w-4 h-4" />
                                                    <span>Click to Edit</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <h3 className="text-lg font-black text-white line-clamp-1">
                                                {item.title}
                                            </h3>
                                            {item.views !== undefined && (
                                                <span className="flex items-center gap-1 text-xs text-white/60 flex-shrink-0">
                                                    <Eye className="w-3 h-3" />
                                                    {item.views}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-white/70 mb-3 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Category */}
                                        <div className="mb-3">
                                            <span className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-full text-xs text-[#00FFFF] font-bold">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Technologies */}
                                        {item.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {item.technologies.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-0.5 bg-white/5 border border-white/20 rounded text-xs text-white/60"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {item.technologies.length > 3 && (
                                                    <span className="px-2 py-0.5 text-xs text-white/40">
                                                        +{item.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Links */}
                                        <div className="flex items-center gap-2 text-xs text-white/40 mt-auto pt-4 border-t border-white/5">
                                            <span>Order: {item.display_order}</span>
                                            {item.project_url && (
                                                <>
                                                    <span>•</span>
                                                    <a
                                                        href={item.project_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 hover:text-[#00FFFF] transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        Live
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && items.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <LayoutGrid className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || categoryFilter !== 'all'
                                ? 'No portfolio items found'
                                : 'No portfolio items yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery || categoryFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "New Project" to add your first portfolio item'}
                        </p>
                        {!searchQuery && categoryFilter === 'all' && (
                            <Link
                                to="/admin/portfolio/new"
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Create First Project
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
