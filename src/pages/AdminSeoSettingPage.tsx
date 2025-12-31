'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    Search,
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    ArrowLeft,
    Globe,
    FileText,
    Tag,
    Image as ImageIcon,
    Code,
    CheckCircle2,
    X,
    ExternalLink,
    Share2
} from 'lucide-react';
import { useSEOSettings, SEOSetting } from '../src/hooks/useSEOSettings';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';

export default function SEOSettingsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSetting, setSelectedSetting] = useState<SEOSetting | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [toastMessage, setToastMessage] = useState(''); // Removed, using sonner
    // const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Removed, using sonner
    // const [showToast, setShowToast] = useState(false); // Removed, using sonner

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

    const [userEmail, setUserEmail] = useState<string>('');
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

    const [formData, setFormData] = useState<Partial<SEOSetting>>({
        page_type: '',
        page_title: '',
        meta_description: '',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_card: 'summary_large_image',
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',
        canonical_url: '',
        robots: 'index, follow',
    });

    const { settings, loading, error, refetch } = useSEOSettings({
        search: searchQuery,
        sortBy: 'page_type',
        sortOrder: 'asc',
    });

    // const toast = (message: string, type: 'success' | 'error' = 'success') => { // Removed, using sonner
    //     setToastMessage(message);
    //     setToastType(type);
    //     setShowToast(true);
    //     setTimeout(() => setShowToast(false), 3000);
    // };

    const openModal = (setting?: SEOSetting) => {
        if (setting) {
            setIsEditing(true);
            setSelectedSetting(setting);
            setFormData({
                ...setting,
            });
        } else {
            setIsEditing(false);
            setSelectedSetting(null);
            setFormData({
                page_type: '',
                page_title: '',
                meta_description: '',
                meta_keywords: '',
                og_title: '',
                og_description: '',
                og_image: '',
                twitter_card: 'summary_large_image',
                twitter_title: '',
                twitter_description: '',
                twitter_image: '',
                canonical_url: '',
                robots: 'index, follow',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSetting(null);
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const { error: supabaseError } = await supabase
                    .from('seo_settings')
                    .update(formData)
                    .eq('id', selectedSetting?.id);

                if (supabaseError) throw supabaseError;
                toast.success('SEO settings updated!');
            } else {
                const { error: supabaseError } = await supabase
                    .from('seo_settings')
                    .insert([formData]);

                if (supabaseError) throw supabaseError;
                toast.success('SEO settings created!');
            }
            refetch();
            closeModal();
        } catch (err: any) {
            toast.error(err.message || 'Failed to save SEO settings');
        }
    };

    const handleDelete = async (setting: SEOSetting) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete SEO Setting',
            message: `Are you sure you want to delete SEO settings for "${setting.page_title}"? This action cannot be undone.`,
            action: async () => {
                try {
                    const { error } = await supabase
                        .from('seo_settings')
                        .delete()
                        .eq('id', setting.id);

                    if (error) throw error;
                    toast.success('SEO setting deleted successfully!');
                    refetch(); // Use refetch instead of loadData
                } catch (error: any) {
                    toast.error(error.message || 'Failed to delete setting');
                }
            }
        });
    };

    const stats = {
        total: settings.length,
        optimized: settings.filter(s => s.meta_description && s.og_title).length,
        withImages: settings.filter(s => s.og_image || s.twitter_image).length,
        indexed: settings.filter(s => s.robots?.includes('index')).length,
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
                {/* Toast Notification - Removed, using sonner */}
                {/* {showToast && (
                    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
                        <div className={`px-6 py-3 rounded-xl backdrop-blur-xl border-2 ${toastType === 'success'
                            ? 'bg-[#00FF9D]/10 border-[#00FF9D]/50 text-[#00FF9D]'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`}>
                            {toastMessage}
                        </div>
                    </div>
                )} */}

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
                                    SEO Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                SEO Settings
                            </h1>
                            <p className="text-white/60">
                                Manage meta tags, Open Graph, and search optimization
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => refetch()}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden md:inline">Refresh</span>
                            </button>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Add Page SEO
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                            <p className="text-xs text-white/40 mb-1">Total Pages</p>
                            <p className="text-2xl font-black text-white">{stats.total}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Optimized</p>
                            <p className="text-2xl font-black text-[#00FF9D]">{stats.optimized}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#DD00FF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#DD00FF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">With Images</p>
                            <p className="text-2xl font-black text-[#DD00FF]">{stats.withImages}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Indexed</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.indexed}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search pages..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading SEO settings...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Settings Grid */}
                {!loading && !error && settings.length > 0 && (
                    <div className="grid gap-4">
                        {settings.map((setting) => (
                            <div key={setting.id} className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 group-hover:border-[#00FFFF]/30 rounded-2xl p-6 transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left - Main Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Globe className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-black text-white mb-1 capitalize">{setting.page_title}</h3>
                                                    <p className="text-sm text-white/60 truncate">{setting.page_type}</p>
                                                </div>
                                            </div>

                                            {/* Meta Description */}
                                            {setting.meta_description && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-white/40 mb-1">Meta Description</p>
                                                    <p className="text-sm text-white/70 line-clamp-2">{setting.meta_description}</p>
                                                </div>
                                            )}

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {setting.og_title && (
                                                    <span className="px-2 py-1 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-xs font-bold text-[#00FF9D]">
                                                        Open Graph ✓
                                                    </span>
                                                )}
                                                {setting.twitter_card && (
                                                    <span className="px-2 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-xs font-bold text-[#00FFFF]">
                                                        Twitter Card ✓
                                                    </span>
                                                )}
                                                {setting.og_image && (
                                                    <span className="px-2 py-1 bg-[#DD00FF]/10 border border-[#DD00FF]/30 rounded-lg text-xs font-bold text-[#DD00FF]">
                                                        OG Image ✓
                                                    </span>
                                                )}
                                                {setting.robots !== undefined && (
                                                    <span className={`px-2 py-1 border rounded-lg text-xs font-bold ${setting.robots?.includes('index')
                                                        ? 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D]'
                                                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                        }`}>
                                                        {setting.robots?.includes('index') ? 'Indexed' : 'NoIndex'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right - Actions */}
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => openModal(setting)}
                                                className="flex items-center gap-2 px-3 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] font-bold hover:bg-[#00FFFF]/20 transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                                <span className="hidden md:inline">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(setting)}
                                                className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && settings.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery ? 'No SEO settings found' : 'No SEO settings yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery
                                ? 'Try adjusting your search'
                                : 'Add your first page SEO settings to get started'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => openModal()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                Add Page SEO
                            </button>
                        )}
                    </div>
                )}

                {/* SEO Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
                        <div className="relative max-w-4xl w-full bg-[#0B0D14] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                                <div>
                                    <h2 className="text-2xl font-black text-white">
                                        {selectedSetting ? 'Edit SEO Setting' : 'Add SEO Setting'}
                                    </h2>
                                    <p className="text-white/40 text-sm mt-1">Configure meta tags and information for your page</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
                                    {/* Basic Info */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-[#00FFFF] rounded-full"></div>
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Page Information</h3>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Page Type (Unique Key)</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.page_type}
                                                onChange={(e) => setFormData({ ...formData, page_type: e.target.value })}
                                                placeholder="e.g. home, about, services"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FFFF] focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Robots Tag</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.robots}
                                                onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                                                placeholder="e.g. index, follow"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FFFF] focus:outline-none transition-all font-mono text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Canonical URL</label>
                                            <input
                                                type="text"
                                                value={formData.canonical_url}
                                                onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                                                placeholder="https://axiscyber.tech/page"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FFFF] focus:outline-none transition-all font-mono text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Meta Tags */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-[#DD00FF] rounded-full"></div>
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Primary Meta Tags</h3>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Browser Tab Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.page_title}
                                                onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                                                placeholder="Page title (under 60 characters recommended)"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#DD00FF] focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Meta Description</label>
                                            <textarea
                                                rows={4}
                                                value={formData.meta_description}
                                                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                                placeholder="Brief summary of the page content (under 160 characters recommended)"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#DD00FF] focus:outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Meta Keywords</label>
                                            <input
                                                type="text"
                                                value={formData.meta_keywords}
                                                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                                                placeholder="e.g. software, engineering, ai (comma separated)"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#DD00FF] focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Open Graph */}
                                    <div className="space-y-6 md:col-span-2 mt-4 pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-[#00FF9D] rounded-full"></div>
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Social Sharing (Open Graph / Twitter)</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">OG Title</label>
                                                    <input
                                                        type="text"
                                                        value={formData.og_title}
                                                        onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                                                        placeholder="Title for Facebook/LinkedIn shares"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">OG Description</label>
                                                    <textarea
                                                        rows={3}
                                                        value={formData.og_description}
                                                        onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                                                        placeholder="Description for Facebook/LinkedIn shares"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all resize-none"
                                                    ></textarea>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">OG Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={formData.og_image}
                                                        onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                                                        placeholder="Image URL (1200x630px)"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all font-mono text-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Twitter title</label>
                                                    <input
                                                        type="text"
                                                        value={formData.twitter_title}
                                                        onChange={(e) => setFormData({ ...formData, twitter_title: e.target.value })}
                                                        placeholder="Title for X (Twitter) shares"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Twitter Description</label>
                                                    <textarea
                                                        rows={3}
                                                        value={formData.twitter_description}
                                                        onChange={(e) => setFormData({ ...formData, twitter_description: e.target.value })}
                                                        placeholder="Description for X (Twitter) shares"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all resize-none"
                                                    ></textarea>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Twitter Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={formData.twitter_image}
                                                        onChange={(e) => setFormData({ ...formData, twitter_image: e.target.value })}
                                                        placeholder="Image URL (800x418px)"
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:border-[#00FF9D] focus:outline-none transition-all font-mono text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-wider mb-2">Twitter Card Style</label>
                                            <select
                                                value={formData.twitter_card}
                                                onChange={(e) => setFormData({ ...formData, twitter_card: e.target.value as any })}
                                                className="w-full px-4 py-3 bg-[#0B0D14] border border-white/10 rounded-xl text-white focus:border-[#00FF9D] focus:outline-none transition-all"
                                            >
                                                <option value="summary">Summary</option>
                                                <option value="summary_large_image">Summary Large Image</option>
                                                <option value="app">App</option>
                                                <option value="player">Player</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-10 pt-6 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-black rounded-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading && <RefreshCw className="w-5 h-5 animate-spin" />}
                                        {selectedSetting ? 'Update Setting' : 'Save Setting'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
            />
        </div>
    );
}
