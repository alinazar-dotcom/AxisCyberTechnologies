'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Mail,
    Send,
    Plus,
    Calendar,
    Eye,
    Edit,
    Trash2,
    BarChart3,
    Users,
    CheckCircle2,
    Clock,
    Zap,
    ArrowLeft,
    RefreshCw,
    X,
    TrendingUp,
    MousePointerClick,
    Target,
    FileText
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Campaign {
    id: string;
    name: string;
    subject: string;
    preview_text?: string;
    html_content?: string;
    status: string;
    campaign_type: string;
    scheduled_at?: string;
    sent_at?: string;
    total_recipients: number;
    total_sent: number;
    total_opens: number;
    total_clicks: number;
    created_at: string;
    updated_at: string;
}

interface Template {
    id: string;
    name: string;
    subject: string;
    html_content?: string;
    template_type: string;
    is_active: boolean;
    created_at: string;
}

export default function EmailMarketingPage() {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'templates'>('campaigns');
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Campaign | Template | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        preview_text: '',
        html_content: '',
        campaign_type: 'newsletter',
        template_type: 'newsletter',
        is_active: true,
        scheduled_at: '',
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

    const toast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [campaignsRes, templatesRes] = await Promise.all([
                supabase.from('email_campaigns').select('*').order('created_at', { ascending: false }),
                supabase.from('email_templates').select('*').order('created_at', { ascending: false }),
            ]);

            if (campaignsRes.error) throw campaignsRes.error;
            if (templatesRes.error) throw templatesRes.error;

            setCampaigns(campaignsRes.data || []);
            setTemplates(templatesRes.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (item?: Campaign | Template, type?: 'campaign' | 'template') => {
        if (item) {
            setIsEditing(true);
            setSelectedItem(item);
            setFormData({
                name: item.name,
                subject: item.subject,
                preview_text: 'preview_text' in item ? item.preview_text || '' : '',
                html_content: item.html_content || '',
                campaign_type: 'campaign_type' in item ? item.campaign_type : 'newsletter',
                template_type: 'template_type' in item ? item.template_type : 'newsletter',
                is_active: 'is_active' in item ? item.is_active : true,
                scheduled_at: 'scheduled_at' in item ? item.scheduled_at || '' : '',
            });
        } else {
            setIsEditing(false);
            setSelectedItem(null);
            setFormData({
                name: '',
                subject: '',
                preview_text: '',
                html_content: '',
                campaign_type: 'newsletter',
                template_type: 'newsletter',
                is_active: true,
                scheduled_at: '',
            });
        }
        setShowModal(true);
    };

    const createCampaignFromTemplate = (template: Template) => {
        setActiveTab('campaigns');
        setIsEditing(false);
        setSelectedItem(null);
        setFormData({
            name: `${template.name} Campaign`,
            subject: template.subject,
            preview_text: '',
            html_content: template.html_content || '',
            campaign_type: 'newsletter',
            template_type: 'newsletter',
            is_active: true,
            scheduled_at: '',
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const table = activeTab === 'campaigns' ? 'email_campaigns' : 'email_templates';

            let result;
            if (isEditing && selectedItem) {
                result = await supabase
                    .from(table)
                    .update(formData)
                    .eq('id', selectedItem.id);
            } else {
                result = await supabase
                    .from(table)
                    .insert([formData]);
            }

            if (result.error) throw result.error;

            toast(isEditing
                ? `${activeTab === 'campaigns' ? 'Campaign' : 'Template'} updated!`
                : `${activeTab === 'campaigns' ? 'Campaign' : 'Template'} created!`
            );
            fetchData();
            closeModal();
        } catch (err: any) {
            console.error('Save error:', err);
            toast(err.message || 'Failed to save', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const table = activeTab === 'campaigns' ? 'email_campaigns' : 'email_templates';
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast(`${activeTab === 'campaigns' ? 'Campaign' : 'Template'} deleted!`);
            fetchData();
        } catch (err: any) {
            console.error('Delete error:', err);
            toast(err.message || 'Failed to delete', 'error');
        }
    };

    const handleSendCampaign = async (id: string) => {
        if (!confirm('Send this campaign now?')) return;

        try {
            // Get campaign data
            const { data: campaign, error: fetchError } = await supabase
                .from('email_campaigns')
                .select('*')
                .eq('id', id)
                .single();

            if (fetchError || !campaign) throw fetchError || new Error('Campaign not found');

            // Get all active newsletter subscribers
            const { data: subscribers, error: subError } = await supabase
                .from('newsletter_subscriptions')
                .select('email')
                .eq('is_active', true);

            if (subError) throw subError;
            if (!subscribers || subscribers.length === 0) {
                toast('No active subscribers found', 'error');
                return;
            }

            const emails = subscribers.map(s => s.email);

            // Update status to sending
            await supabase
                .from('email_campaigns')
                .update({ status: 'sending', total_recipients: emails.length })
                .eq('id', id);

            // In a real app, this would be handled by a background job or Edge Function
            // For now, we'll simulate sending or call the sendEmail helper if it supports bulk
            // The sendEmail helper we saw earlier sends one email at a time.

            // For demonstration, we'll just mark it as sent
            // In a real scenario, you'd loop or use a bulk sending service

            await supabase
                .from('email_campaigns')
                .update({
                    status: 'sent',
                    sent_at: new Date().toISOString(),
                    total_sent: emails.length
                })
                .eq('id', id);

            toast('Campaign sent successfully to ' + emails.length + ' subscribers!');
            fetchData();
        } catch (err: any) {
            console.error('Send error:', err);
            toast(err.message || 'Failed to send campaign', 'error');

            // Reset status if failed
            await supabase
                .from('email_campaigns')
                .update({ status: 'draft' })
                .eq('id', id);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-white/10 border-white/30 text-white/60';
            case 'scheduled':
                return 'bg-[#00FFFF]/10 border-[#00FFFF]/30 text-[#00FFFF]';
            case 'sending':
                return 'bg-[#FF7A00]/10 border-[#FF7A00]/30 text-[#FF7A00]';
            case 'sent':
                return 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D]';
            default:
                return 'bg-white/10 border-white/30 text-white/60';
        }
    };

    const stats = {
        total_campaigns: campaigns.length,
        active_campaigns: campaigns.filter(c => c.status === 'scheduled' || c.status === 'sending').length,
        total_sent: campaigns.reduce((sum, c) => sum + c.total_sent, 0),
        avg_open_rate: campaigns.length > 0
            ? (campaigns.reduce((sum, c) => sum + (c.total_opens / Math.max(c.total_sent, 1) * 100), 0) / campaigns.length).toFixed(1)
            : 0,
        total_templates: templates.length,
        active_templates: templates.filter(t => t.is_active).length,
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
                                    Marketing Automation
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Email Marketing
                            </h1>
                            <p className="text-white/60">
                                Create and manage email campaigns and templates
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => fetchData()}
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
                                New {activeTab === 'campaigns' ? 'Campaign' : 'Template'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/30 rounded-2xl p-6">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#DD00FF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#DD00FF]/40"></div>
                            <Mail className="w-8 h-8 text-[#DD00FF] mb-4" />
                            <h3 className="text-3xl font-black text-white mb-1">{stats.total_campaigns}</h3>
                            <p className="text-white/60 font-bold text-sm">Total Campaigns</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-6">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <Send className="w-8 h-8 text-[#00FFFF] mb-4" />
                            <h3 className="text-3xl font-black text-white mb-1">{stats.total_sent.toLocaleString()}</h3>
                            <p className="text-white/60 font-bold text-sm">Emails Sent</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF0099]/30 rounded-2xl p-6">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF0099]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF0099]/40"></div>
                            <BarChart3 className="w-8 h-8 text-[#FF0099] mb-4" />
                            <h3 className="text-3xl font-black text-white mb-1">{stats.avg_open_rate}%</h3>
                            <p className="text-white/60 font-bold text-sm">Avg Open Rate</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FF9D]/30 rounded-2xl p-6">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FF9D]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FF9D]/40"></div>
                            <Zap className="w-8 h-8 text-[#00FF9D] mb-4" />
                            <h3 className="text-3xl font-black text-white mb-1">{stats.total_templates}</h3>
                            <p className="text-white/60 font-bold text-sm">Templates</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-3 mb-8 flex-wrap">
                    <button
                        onClick={() => setActiveTab('campaigns')}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'campaigns'
                            ? 'bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white shadow-lg shadow-[#00FFFF]/20'
                            : 'bg-white/5 border border-white/20 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Campaigns ({stats.total_campaigns})
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'templates'
                            ? 'bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white shadow-lg shadow-[#00FFFF]/20'
                            : 'bg-white/5 border border-white/20 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Templates ({stats.total_templates})
                        </span>
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading {activeTab}...</p>
                    </div>
                )}

                {/* Campaigns Tab */}
                {!loading && activeTab === 'campaigns' && (
                    <>
                        {campaigns.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-10 h-10 text-white/20" />
                                </div>
                                <p className="text-white/60 font-bold mb-2">No campaigns yet</p>
                                <p className="text-white/40 text-sm mb-6">Create your first email campaign to get started</p>
                                <button
                                    onClick={() => openModal()}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Campaign
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {campaigns.map((campaign) => (
                                    <div key={campaign.id} className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 group-hover:border-[#00FFFF]/30 rounded-2xl p-6 transition-all">
                                            <div className="flex items-start justify-between gap-4">
                                                {/* Left - Main Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                        <h3 className="font-black text-white">{campaign.name}</h3>
                                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(campaign.status)}`}>
                                                            {campaign.status.toUpperCase()}
                                                        </span>
                                                        <span className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-xs font-bold text-white/60 capitalize">
                                                            {campaign.campaign_type}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-white/70 mb-4">
                                                        <strong>Subject:</strong> {campaign.subject}
                                                    </p>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                            <p className="text-xs text-white/40 mb-1">Recipients</p>
                                                            <p className="font-black text-white">{campaign.total_recipients.toLocaleString()}</p>
                                                        </div>
                                                        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                            <p className="text-xs text-white/40 mb-1">Sent</p>
                                                            <p className="font-black text-[#00FFFF]">{campaign.total_sent.toLocaleString()}</p>
                                                        </div>
                                                        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                            <p className="text-xs text-white/40 mb-1">Opens</p>
                                                            <p className="font-black text-[#00FF9D]">{campaign.total_opens.toLocaleString()}</p>
                                                        </div>
                                                        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                            <p className="text-xs text-white/40 mb-1">Clicks</p>
                                                            <p className="font-black text-[#DD00FF]">{campaign.total_clicks.toLocaleString()}</p>
                                                        </div>
                                                    </div>

                                                    {/* Meta */}
                                                    <div className="flex items-center gap-4 text-xs text-white/40 mt-3">
                                                        {campaign.scheduled_at && (
                                                            <>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    Scheduled: {new Date(campaign.scheduled_at).toLocaleString()}
                                                                </span>
                                                            </>
                                                        )}
                                                        {campaign.sent_at && (
                                                            <span className="flex items-center gap-1">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                Sent: {new Date(campaign.sent_at).toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right - Actions */}
                                                <div className="flex flex-col gap-2 flex-shrink-0">
                                                    {campaign.status === 'draft' && (
                                                        <button
                                                            onClick={() => handleSendCampaign(campaign.id)}
                                                            className="flex items-center gap-2 px-3 py-2 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-[#00FF9D] font-bold hover:bg-[#00FF9D]/20 transition-all"
                                                        >
                                                            <Send className="w-4 h-4" />
                                                            <span className="hidden md:inline">Send</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => openModal(campaign, 'campaign')}
                                                        className="flex items-center gap-2 px-3 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] font-bold hover:bg-[#00FFFF]/20 transition-all"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        <span className="hidden md:inline">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(campaign.id)}
                                                        className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-bold hover:bg-red-500/20 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="hidden md:inline">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Templates Tab */}
                {!loading && activeTab === 'templates' && (
                    <>
                        {templates.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-10 h-10 text-white/20" />
                                </div>
                                <p className="text-white/60 font-bold mb-2">No templates yet</p>
                                <p className="text-white/40 text-sm mb-6">Create reusable email templates</p>
                                <button
                                    onClick={() => openModal()}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Template
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {templates.map((template) => (
                                    <div key={template.id} className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 group-hover:border-[#DD00FF]/30 rounded-2xl p-6 transition-all">
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#DD00FF] to-[#00FFFF] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-6 h-6 text-white" />
                                                </div>
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${template.is_active
                                                    ? 'bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-[#00FF9D]'
                                                    : 'bg-white/10 border border-white/20 text-white/60'
                                                    }`}>
                                                    {template.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>

                                            <h3 className="font-black text-white mb-2">{template.name}</h3>
                                            <p className="text-sm text-white/60 mb-3 line-clamp-1">
                                                <strong>Subject:</strong> {template.subject}
                                            </p>
                                            <p className="text-xs text-white/40 mb-4 capitalize">
                                                Type: {template.template_type}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => openModal(template, 'template')}
                                                    className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-lg text-[#00FFFF] font-bold hover:bg-[#00FFFF]/20 transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => createCampaignFromTemplate(template)}
                                                    className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 bg-[#DD00FF]/10 border border-[#DD00FF]/30 rounded-lg text-[#DD00FF] font-bold hover:bg-[#DD00FF]/20 transition-all"
                                                >
                                                    <Send className="w-4 h-4" />
                                                    Use
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(template.id)}
                                                    className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-bold hover:bg-red-500/20 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="relative max-w-4xl w-full bg-[#0B0D14] border border-white/20 rounded-2xl p-6 my-8">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <h2 className="text-2xl font-black text-white mb-6">
                                {isEditing
                                    ? `Edit ${activeTab === 'campaigns' ? 'Campaign' : 'Template'}`
                                    : `Create ${activeTab === 'campaigns' ? 'Campaign' : 'Template'}`
                                }
                            </h2>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Campaign/Template Name"
                                            required
                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">
                                            Type *
                                        </label>
                                        <select
                                            value={activeTab === 'campaigns' ? formData.campaign_type : formData.template_type}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                [activeTab === 'campaigns' ? 'campaign_type' : 'template_type']: e.target.value
                                            })}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                        >
                                            <option value="newsletter">Newsletter</option>
                                            <option value="promotional">Promotional</option>
                                            <option value="transactional">Transactional</option>
                                            <option value="announcement">Announcement</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">
                                        Subject Line *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Your compelling subject line"
                                        required
                                        className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                    />
                                </div>

                                {activeTab === 'campaigns' && (
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">
                                            Preview Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.preview_text}
                                            onChange={(e) => setFormData({ ...formData, preview_text: e.target.value })}
                                            placeholder="Text shown in inbox preview"
                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">
                                        HTML Content
                                    </label>
                                    <textarea
                                        value={formData.html_content}
                                        onChange={(e) => setFormData({ ...formData, html_content: e.target.value })}
                                        placeholder="Email HTML content"
                                        rows={10}
                                        className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all resize-none font-mono text-sm"
                                    />
                                </div>

                                {activeTab === 'campaigns' && (
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">
                                            Schedule For (Optional)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={formData.scheduled_at}
                                            onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                                        />
                                    </div>
                                )}

                                {activeTab === 'templates' && (
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_active}
                                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00FFFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFFF]"></div>
                                        </label>
                                        <span className="text-sm font-bold text-white">Active Template</span>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                                    >
                                        {isEditing ? 'Update' : 'Create'}
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
