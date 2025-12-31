'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Settings,
    ArrowLeft,
    RefreshCw,
    Save,
    Globe,
    Mail,
    Phone,
    Share2,
    Building2,
    MapPin,
    BarChart3,
    Zap,
    Image as ImageIcon,
    Code,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useSiteSettings, SiteSettings } from '../src/hooks/useSiteSettings';
import { supabase } from '../lib/supabase';

export default function SiteSettingsPage() {
    const { settings, loading, error, refetch, updateSettings } = useSiteSettings();
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState<Partial<SiteSettings>>({});
    const [saving, setSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);

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

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        } else if (!loading && !settings) {
            // Initialize with empty defaults if no settings exist
            setFormData({
                site_name: 'Axis Cyber Technologies',
                site_url: 'https://axiscyber.tech',
                contact_email: 'info@axiscyber.tech',
                company_name: 'Axis Cyber Technologies',
                maintenance_mode: false,
                allow_registration: false,
                enable_blog: true,
                enable_portfolio: true,
                enable_comments: true
            });
        }
    }, [settings, loading]);

    const toast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const result = await updateSettings(formData);

            if (result.success) {
                toast('Settings saved successfully!');
            } else {
                toast(result.error || 'Failed to save settings', 'error');
            }
        } catch (err) {
            toast('Failed to save settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'social', label: 'Social Media', icon: Share2 },
        { id: 'business', label: 'Business Info', icon: Building2 },
        { id: 'offices', label: 'Global Offices', icon: MapPin },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'features', label: 'Features', icon: Zap },
    ];

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
                                    Configuration
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Site Settings
                            </h1>
                            <p className="text-white/60">
                                Manage global website configuration and preferences
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
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && !settings && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading settings...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Settings Form */}
                {!loading && (
                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Tabs */}
                        <div className="lg:col-span-1">
                            <div className="relative group sticky top-24">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                                    <div className="space-y-2">
                                        {tabs.map((tab) => {
                                            const Icon = tab.icon;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                                        ? 'bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white shadow-lg'
                                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span>{tab.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="lg:col-span-3">
                            <form onSubmit={handleSubmit}>
                                <div className="relative group mb-6">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">

                                        {/* General Settings */}
                                        {activeTab === 'general' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">General Settings</h3>

                                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Site Name *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.site_name || ''}
                                                                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                                                placeholder="Axis Cyber Technologies"
                                                                required
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Site Tagline
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.site_tagline || ''}
                                                                onChange={(e) => setFormData({ ...formData, site_tagline: e.target.value })}
                                                                placeholder="Next-Gen Software Engineering"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-sm font-bold text-white mb-2">
                                                            Site Description
                                                        </label>
                                                        <textarea
                                                            value={formData.site_description || ''}
                                                            onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                                                            placeholder="Brief description of your website"
                                                            rows={3}
                                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all resize-none"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-sm font-bold text-white mb-2">
                                                            Site URL *
                                                        </label>
                                                        <input
                                                            type="url"
                                                            value={formData.site_url || ''}
                                                            onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
                                                            placeholder="https://axiscyber.com"
                                                            required
                                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Logo URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.site_logo_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, site_logo_url: e.target.value })}
                                                                placeholder="https://example.com/logo.png"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Favicon URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.favicon_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
                                                                placeholder="https://example.com/favicon.ico"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Contact Settings */}
                                        {activeTab === 'contact' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Contact Information</h3>

                                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Contact Email *
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={formData.contact_email || ''}
                                                                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                                                                placeholder="info@axiscyber.com"
                                                                required
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Support Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={formData.support_email || ''}
                                                                onChange={(e) => setFormData({ ...formData, support_email: e.target.value })}
                                                                placeholder="support@axiscyber.com"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Sales Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={formData.sales_email || ''}
                                                                onChange={(e) => setFormData({ ...formData, sales_email: e.target.value })}
                                                                placeholder="sales@axiscyber.com"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Primary Phone
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={formData.phone_primary || ''}
                                                                onChange={(e) => setFormData({ ...formData, phone_primary: e.target.value })}
                                                                placeholder="+1 (555) 123-4567"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Secondary Phone
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={formData.phone_secondary || ''}
                                                                onChange={(e) => setFormData({ ...formData, phone_secondary: e.target.value })}
                                                                placeholder="+1 (555) 987-6543"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Social Media Settings */}
                                        {activeTab === 'social' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Social Media Links</h3>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Facebook URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.facebook_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                                                                placeholder="https://facebook.com/axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Twitter URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.twitter_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                                                placeholder="https://twitter.com/axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                LinkedIn URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.linkedin_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                                                placeholder="https://linkedin.com/company/axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Instagram URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.instagram_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                                                placeholder="https://instagram.com/axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                GitHub URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.github_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                                                placeholder="https://github.com/axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                YouTube URL
                                                            </label>
                                                            <input
                                                                type="url"
                                                                value={formData.youtube_url || ''}
                                                                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                                                placeholder="https://youtube.com/@axiscyber"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Business Information */}
                                        {activeTab === 'business' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Business Information</h3>

                                                    <div className="mb-4">
                                                        <label className="block text-sm font-bold text-white mb-2">
                                                            Company Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.company_name || ''}
                                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                                            placeholder="Axis Cyber Technologies Inc."
                                                            required
                                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-sm font-bold text-white mb-2">
                                                            Company Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.company_address || ''}
                                                            onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
                                                            placeholder="123 Main Street"
                                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                City
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.company_city || ''}
                                                                onChange={(e) => setFormData({ ...formData, company_city: e.target.value })}
                                                                placeholder="Los Angeles"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                State/Province
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.company_state || ''}
                                                                onChange={(e) => setFormData({ ...formData, company_state: e.target.value })}
                                                                placeholder="California"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                ZIP/Postal Code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.company_zip || ''}
                                                                onChange={(e) => setFormData({ ...formData, company_zip: e.target.value })}
                                                                placeholder="90001"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Country
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.company_country || ''}
                                                                onChange={(e) => setFormData({ ...formData, company_country: e.target.value })}
                                                                placeholder="United States"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <label className="block text-sm font-bold text-white mb-2">
                                                            Tax ID / EIN
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formData.tax_id || ''}
                                                            onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                                                            placeholder="12-3456789"
                                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Global Offices */}
                                        {activeTab === 'offices' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Global Office Locations</h3>
                                                    <p className="text-white/60 mb-6">24/7 operations across 4 continents</p>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                🇵🇰 Lahore, Pakistan
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.office_lahore || ''}
                                                                onChange={(e) => setFormData({ ...formData, office_lahore: e.target.value })}
                                                                placeholder="Johar Town, Lahore, Pakistan"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                🇦🇪 Dubai, UAE
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.office_dubai || ''}
                                                                onChange={(e) => setFormData({ ...formData, office_dubai: e.target.value })}
                                                                placeholder="Dubai Media City, Dubai, UAE"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                🇺🇸 Los Angeles, USA
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.office_los_angeles || ''}
                                                                onChange={(e) => setFormData({ ...formData, office_los_angeles: e.target.value })}
                                                                placeholder="Downtown LA, Los Angeles, CA"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                🇬🇧 London, UK
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.office_london || ''}
                                                                onChange={(e) => setFormData({ ...formData, office_london: e.target.value })}
                                                                placeholder="Canary Wharf, London, UK"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Analytics & Tracking */}
                                        {activeTab === 'analytics' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Analytics & Tracking</h3>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Google Analytics ID
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.google_analytics_id || ''}
                                                                onChange={(e) => setFormData({ ...formData, google_analytics_id: e.target.value })}
                                                                placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Facebook Pixel ID
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.facebook_pixel_id || ''}
                                                                onChange={(e) => setFormData({ ...formData, facebook_pixel_id: e.target.value })}
                                                                placeholder="1234567890"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-bold text-white mb-2">
                                                                Google Tag Manager ID
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={formData.google_tag_manager_id || ''}
                                                                onChange={(e) => setFormData({ ...formData, google_tag_manager_id: e.target.value })}
                                                                placeholder="GTM-XXXXXXX"
                                                                className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                            />
                                                        </div>

                                                        <div className="pt-4 border-t-2 border-white/10">
                                                            <h4 className="font-bold text-white mb-4">Newsletter Integration</h4>

                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-bold text-white mb-2">
                                                                        Mailchimp API Key
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        value={formData.mailchimp_api_key || ''}
                                                                        onChange={(e) => setFormData({ ...formData, mailchimp_api_key: e.target.value })}
                                                                        placeholder="••••••••••••••••"
                                                                        className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-bold text-white mb-2">
                                                                        Mailchimp List ID
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={formData.mailchimp_list_id || ''}
                                                                        onChange={(e) => setFormData({ ...formData, mailchimp_list_id: e.target.value })}
                                                                        placeholder="a1b2c3d4e5"
                                                                        className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Features */}
                                        {activeTab === 'features' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-xl font-black text-white mb-6">Feature Toggles</h3>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl">
                                                            <div>
                                                                <h4 className="font-bold text-white mb-1">Maintenance Mode</h4>
                                                                <p className="text-sm text-white/60">Display maintenance page to visitors</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.maintenance_mode || false}
                                                                    onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl">
                                                            <div>
                                                                <h4 className="font-bold text-white mb-1">Allow User Registration</h4>
                                                                <p className="text-sm text-white/60">Enable new user sign-ups</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.allow_registration || false}
                                                                    onChange={(e) => setFormData({ ...formData, allow_registration: e.target.checked })}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl">
                                                            <div>
                                                                <h4 className="font-bold text-white mb-1">Enable Blog</h4>
                                                                <p className="text-sm text-white/60">Show blog posts on website</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.enable_blog || false}
                                                                    onChange={(e) => setFormData({ ...formData, enable_blog: e.target.checked })}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl">
                                                            <div>
                                                                <h4 className="font-bold text-white mb-1">Enable Portfolio</h4>
                                                                <p className="text-sm text-white/60">Show portfolio projects on website</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.enable_portfolio || false}
                                                                    onChange={(e) => setFormData({ ...formData, enable_portfolio: e.target.checked })}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl">
                                                            <div>
                                                                <h4 className="font-bold text-white mb-1">Enable Comments</h4>
                                                                <p className="text-sm text-white/60">Allow users to comment on blog posts</p>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.enable_comments || false}
                                                                    onChange={(e) => setFormData({ ...formData, enable_comments: e.target.checked })}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t-2 border-white/10 mt-6">
                                                        <h4 className="font-bold text-white mb-4">SEO Defaults</h4>

                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-bold text-white mb-2">
                                                                    Default Open Graph Image
                                                                </label>
                                                                <input
                                                                    type="url"
                                                                    value={formData.default_og_image || ''}
                                                                    onChange={(e) => setFormData({ ...formData, default_og_image: e.target.value })}
                                                                    placeholder="https://example.com/og-default.jpg"
                                                                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-bold text-white mb-2">
                                                                    Default Twitter Card Type
                                                                </label>
                                                                <select
                                                                    value={formData.default_twitter_card || 'summary_large_image'}
                                                                    onChange={(e) => setFormData({ ...formData, default_twitter_card: e.target.value })}
                                                                    className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                                                >
                                                                    <option value="summary">Summary</option>
                                                                    <option value="summary_large_image">Summary Large Image</option>
                                                                    <option value="app">App</option>
                                                                    <option value="player">Player</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save Settings
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
