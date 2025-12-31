'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, Eye, EyeOff, Star, RefreshCw, ArrowLeft, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices, Service } from '../src/hooks/useServices';
import { ServiceFormModal } from '../src/components/admin/ServiceFormModal';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function ServicesManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'display_order' | 'projects_completed'>('display_order');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

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

    const { services, loading, error, refetch, updateLocalService } = useServices({
        search: searchQuery,
        sortBy,
        sortOrder,
        limit: 50,
    });

    const handleDeleteClick = (id: string) => {
        setServiceToDelete(id);
    };

    const confirmDelete = async () => {
        if (!serviceToDelete) return;

        try {
            const { error: supabaseError } = await supabase
                .from('services')
                .delete()
                .eq('id', serviceToDelete);

            if (supabaseError) throw supabaseError;

            toast.success('Service deleted successfully!');
            refetch();
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete service');
        } finally {
            setServiceToDelete(null);
        }
    };

    const handleToggleActive = async (service: Service) => {
        try {
            const { error: supabaseError } = await supabase
                .from('services')
                .update({ is_active: !service.is_active })
                .eq('id', service.id);

            if (supabaseError) throw supabaseError;

            toast.success(`Service ${!service.is_active ? 'activated' : 'deactivated'}`);
            updateLocalService(service.id, { is_active: !service.is_active });
        } catch (err: any) {
            toast.error(err.message || 'Failed to update service');
        }
    };

    const handleToggleFeatured = async (service: Service) => {
        try {
            const { error: supabaseError } = await supabase
                .from('services')
                .update({ is_featured: !service.is_featured })
                .eq('id', service.id);

            if (supabaseError) throw supabaseError;

            toast.success(`Service ${!service.is_featured ? 'featured' : 'unfeatured'}`);
            updateLocalService(service.id, { is_featured: !service.is_featured });
        } catch (err: any) {
            toast.error(err.message || 'Failed to update service');
        }
    };

    const handleFormSuccess = () => {
        toast.success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        refetch();
    };

    const stats = {
        total: services.length,
        active: services.filter(s => s.is_active).length,
        inactive: services.filter(s => !s.is_active).length,
        featured: services.filter(s => s.is_featured).length,
        totalProjects: services.reduce((sum, s) => sum + s.projects_completed, 0),
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
                                    Services Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                All 12 Services
                            </h1>
                            <p className="text-white/60">
                                Manage services and their success rates
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
                                    setEditingService(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Add Service
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
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Active</p>
                            <p className="text-2xl font-black text-[#00FF9D]">{stats.active}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-red-500/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-red-500/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-red-500/40"></div>
                            <p className="text-xs text-white/40 mb-1">Inactive</p>
                            <p className="text-2xl font-black text-red-400">{stats.inactive}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF7A00]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF7A00]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF7A00]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF7A00]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Featured</p>
                            <p className="text-2xl font-black text-[#FF7A00]">{stats.featured}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Projects</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.totalProjects}+</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-6 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search services..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Sort By */}
                    <div className="md:col-span-3">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="display_order">Sort by Order</option>
                            <option value="name">Sort by Name</option>
                            <option value="projects_completed">Sort by Projects</option>
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
                        <p className="text-white/60">Loading services...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Services List */}
                {!loading && !error && services.length > 0 && (
                    <div className="space-y-4">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="relative group"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Service Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <h3 className="text-xl font-black text-white">
                                                    {service.name}
                                                </h3>

                                                {/* Status Badges */}
                                                <div className="flex items-center gap-2">
                                                    {service.is_featured && (
                                                        <span className="px-2 py-1 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg text-xs text-[#FF7A00] font-bold">
                                                            FEATURED
                                                        </span>
                                                    )}
                                                    {service.is_active ? (
                                                        <span className="px-2 py-1 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-xs text-[#00FF9D] font-bold">
                                                            ACTIVE
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-white/10 border border-white/30 rounded-lg text-xs text-white/50 font-bold">
                                                            INACTIVE
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-sm text-white/60 mb-4 line-clamp-2">
                                                {service.short_description}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex flex-wrap gap-6 text-sm mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/40">Projects:</span>
                                                    <span className="text-[#00FFFF] font-bold">
                                                        {service.projects_completed}+
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/40">Success Rate:</span>
                                                    <span className="text-[#00FF9D] font-bold">
                                                        {service.success_rate}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/40">Order:</span>
                                                    <span className="text-white/70 font-bold">
                                                        #{service.display_order}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/40">Views:</span>
                                                    <span className="text-[#DD00FF] font-bold">
                                                        {service.views}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Technologies */}
                                            {service.technologies && service.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {service.technologies.slice(0, 6).map((tech, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/60 font-bold"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {service.technologies.length > 6 && (
                                                        <span className="px-2 py-1 text-xs text-[#00FFFF] font-bold">
                                                            +{service.technologies.length - 6}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => handleToggleFeatured(service)}
                                                className={`p-2 rounded-lg border transition-all ${service.is_featured
                                                    ? 'bg-[#FF7A00]/20 border-[#FF7A00]/50 text-[#FF7A00]'
                                                    : 'bg-black/40 border-white/10 text-white/40 hover:border-[#FF7A00]/30 hover:text-[#FF7A00]'
                                                    }`}
                                                title="Toggle Featured"
                                            >
                                                <Star className={`w-5 h-5 ${service.is_featured ? 'fill-current' : ''}`} />
                                            </button>

                                            <button
                                                onClick={() => handleToggleActive(service)}
                                                className={`p-2 rounded-lg border transition-all ${service.is_active
                                                    ? 'bg-[#00FF9D]/20 border-[#00FF9D]/50 text-[#00FF9D]'
                                                    : 'bg-black/40 border-white/10 text-white/40 hover:border-[#00FF9D]/30 hover:text-[#00FF9D]'
                                                    }`}
                                                title="Toggle Active"
                                            >
                                                {service.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEditingService(service);
                                                    setShowModal(true);
                                                }}
                                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                                title="Edit Service"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteClick(service.id)}
                                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                                                title="Delete Service"
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
                {!loading && !error && services.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery ? `No services found for "${searchQuery}"` : 'No services yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery ? 'Try a different search term' : 'Click "Add Service" to get started'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => {
                                    setEditingService(null);
                                    setShowModal(true);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Add First Service
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Service Form Modal */}
            <ServiceFormModal
                service={editingService}
                isOpen={showModal}
                onSuccess={handleFormSuccess}
                onClose={() => setShowModal(false)}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!serviceToDelete}
                onClose={() => setServiceToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Service"
                message="Are you sure you want to delete this service? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
