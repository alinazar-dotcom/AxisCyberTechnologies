'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Mail, Calendar, Settings, Users, CheckCircle2, Clock, AlertCircle, Eye, Trash2, RefreshCw, Filter, LogOut, Shield, ChevronRight, Search, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { GradientText } from '@/src/components/ui/GradientText';
import { Button } from '@/src/components/ui/Button';
import { createClient } from '@supabase/supabase-js';

type ContactSubmission = {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message: string;
    services: string[];
    status: 'new' | 'contacted' | 'completed';
    submitted_at: string;
};

type ConsultationRequest = {
    id: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    project_type?: string;
    budget_range?: string;
    timeline?: string;
    message?: string;
    status: 'pending' | 'scheduled' | 'completed';
    requested_at: string;
};

type NewsletterSubscription = {
    id: string;
    email: string;
    subscribed_at: string;
    source: string;
    is_active: boolean;
};



export default function AdminDashboardPage() {
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
    const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'consultations' | 'newsletter'>('overview');
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
    const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        loadData();
        loadUser();
    }, []);

    const loadUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const loadData = async () => {
        setLoading(true);
        try {
            // Load contacts
            const { data: contactsData, error: contactsError } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('submitted_at', { ascending: false });

            if (!contactsError && contactsData) {
                setContacts(contactsData);
            }

            // Load consultations
            const { data: consultationsData, error: consultationsError } = await supabase
                .from('consultation_requests')
                .select('*')
                .order('requested_at', { ascending: false });

            if (!consultationsError && consultationsData) {
                setConsultations(consultationsData);
            }

            // Load newsletters
            const { data: newslettersData, error: newslettersError } = await supabase
                .from('newsletter_subscriptions')
                .select('*')
                .order('subscribed_at', { ascending: false });

            if (!newslettersError && newslettersData) {
                setNewsletters(newslettersData);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
            case 'pending':
                return 'text-[#00FFFF] bg-[#00FFFF]/10 border-[#00FFFF]/30';
            case 'contacted':
            case 'scheduled':
                return 'text-[#DD00FF] bg-[#DD00FF]/10 border-[#DD00FF]/30';
            case 'completed':
                return 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/30';
            default:
                return 'text-white/70 bg-white/10 border-white/30';
        }
    };

    const filteredContacts = contacts.filter(c => {
        const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const filteredConsultations = consultations.filter(c => {
        const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const filteredNewsletters = newsletters.filter(n => {
        return n.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
            {/* Simplified background */}
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
                            <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase mb-3">
                                Admin Dashboard
                            </h2>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Monitor & Manage
                            </h1>
                            <p className="text-white/60">
                                View submissions, consultations, and site settings
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {userEmail && (
                                <div className="hidden md:flex px-4 py-2 rounded-lg bg-white/5 border border-white/10 items-center gap-2">
                                    <Shield className="w-4 h-4 text-[#DD00FF]" />
                                    <span className="text-sm text-white/70">{userEmail}</span>
                                </div>
                            )}
                            <button
                                onClick={loadData}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden md:inline">Refresh</span>
                            </button>
                            <a href="/admin/overview">
                                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#DD00FF] transition-colors">
                                    CMS
                                </button>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-red-500/50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex gap-3 min-w-max pb-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: TrendingUp },
                            { id: 'contacts', label: 'Contact Forms', icon: Mail },
                            { id: 'consultations', label: 'Consultations', icon: Calendar },
                            { id: 'newsletter', label: 'Newsletter', icon: Users },
                        ].map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all duration-300 whitespace-nowrap text-sm
                    ${isActive
                                            ? 'bg-white text-black'
                                            : 'bg-white/5 border border-white/20 text-white/70 hover:bg-white/10'
                                        }
                  `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading data...</p>
                    </div>
                ) : (
                    <div>
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Contact Stats */}
                                    <div className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                            {/* Corner brackets */}
                                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center">
                                                    <Mail className="w-6 h-6 text-[#00FFFF]" />
                                                </div>
                                                <span className="text-3xl font-black text-[#00FFFF]">
                                                    {contacts.length}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white/80 mb-1">Contact Submissions</p>
                                            <p className="text-xs text-white/40">
                                                {contacts.filter(c => c.status === 'new').length} new submissions
                                            </p>
                                        </div>
                                    </div>

                                    {/* Consultations Stats */}
                                    <div className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                            {/* Corner brackets */}
                                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#DD00FF]/10 border border-[#DD00FF]/30 flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-[#DD00FF]" />
                                                </div>
                                                <span className="text-3xl font-black text-[#DD00FF]">
                                                    {consultations.length}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white/80 mb-1">Consultations</p>
                                            <p className="text-xs text-white/40">
                                                {consultations.filter(c => c.status === 'pending').length} pending requests
                                            </p>
                                        </div>
                                    </div>

                                    {/* Newsletter Stats */}
                                    <div className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                            {/* Corner brackets */}
                                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#FF0099]/10 border border-[#FF0099]/30 flex items-center justify-center">
                                                    <Users className="w-6 h-6 text-[#FF0099]" />
                                                </div>
                                                <span className="text-3xl font-black text-[#FF0099]">
                                                    {newsletters.filter(n => n.is_active).length}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white/80 mb-1">Newsletter Subscribers</p>
                                            <p className="text-xs text-white/40">
                                                {newsletters.length} total subscribers
                                            </p>
                                        </div>
                                    </div>

                                    {/* Site Settings Stats */}
                                    <div className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                            {/* Corner brackets */}
                                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center">
                                                    <Settings className="w-6 h-6 text-[#00FF9D]" />
                                                </div>
                                                <span className="text-3xl font-black text-[#00FF9D]">
                                                    1
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white/80 mb-1">Site Configuration</p>
                                            <p className="text-xs text-white/40">
                                                Manage global settings
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <button
                                        onClick={() => setActiveTab('contacts')}
                                        className="relative group text-left"
                                    >
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/10 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                            <Mail className="w-8 h-8 text-[#00FFFF] mb-4" />
                                            <h3 className="text-lg font-black text-white mb-2">View Contacts</h3>
                                            <p className="text-sm text-white/60 mb-4">Manage contact form submissions</p>
                                            <div className="flex items-center gap-2 text-[#00FFFF] text-sm font-bold">
                                                Open <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('consultations')}
                                        className="relative group text-left"
                                    >
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/10 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                            <Calendar className="w-8 h-8 text-[#DD00FF] mb-4" />
                                            <h3 className="text-lg font-black text-white mb-2">View Consultations</h3>
                                            <p className="text-sm text-white/60 mb-4">Review consultation requests</p>
                                            <div className="flex items-center gap-2 text-[#DD00FF] text-sm font-bold">
                                                Open <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('newsletter')}
                                        className="relative group text-left"
                                    >
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/10 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                            <Users className="w-8 h-8 text-[#FF0099] mb-4" />
                                            <h3 className="text-lg font-black text-white mb-2">View Subscribers</h3>
                                            <p className="text-sm text-white/60 mb-4">Manage newsletter subscribers</p>
                                            <div className="flex items-center gap-2 text-[#FF0099] text-sm font-bold">
                                                Open <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </button>
                                </div>

                                {/* Recent Activity */}
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-[#DD00FF]" />
                                            Recent Activity
                                        </h3>
                                        <div className="space-y-3">
                                            {[...contacts.slice(0, 3), ...consultations.slice(0, 2)]
                                                .sort((a, b) => {
                                                    const dateA = 'submitted_at' in a ? a.submitted_at : a.requested_at;
                                                    const dateB = 'submitted_at' in b ? b.submitted_at : b.requested_at;
                                                    return new Date(dateB).getTime() - new Date(dateA).getTime();
                                                })
                                                .slice(0, 5)
                                                .map((item, idx) => {
                                                    const isContact = 'submitted_at' in item;
                                                    return (
                                                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isContact ? 'bg-[#00FFFF]/10 border border-[#00FFFF]/30' : 'bg-[#DD00FF]/10 border border-[#DD00FF]/30'}`}>
                                                                    {isContact ? (
                                                                        <Mail className="w-5 h-5 text-[#00FFFF]" />
                                                                    ) : (
                                                                        <Calendar className="w-5 h-5 text-[#DD00FF]" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-white text-sm">{item.name}</p>
                                                                    <p className="text-xs text-white/60">{item.email}</p>
                                                                </div>
                                                            </div>
                                                            <span className="text-xs text-white/40 whitespace-nowrap">
                                                                {formatDate(isContact ? (item as ContactSubmission).submitted_at : (item as ConsultationRequest).requested_at)}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contacts Tab */}
                        {activeTab === 'contacts' && (
                            <div className="space-y-6">
                                {/* Filters */}
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="Search by name, email, or message..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white text-black placeholder-black/40 border-2 border-white/20 rounded-xl focus:border-[#00FFFF] focus:outline-none transition-all font-medium text-sm"
                                                />
                                            </div>
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="px-4 py-2.5 bg-white text-black border-2 border-white/20 rounded-xl focus:border-[#00FFFF] focus:outline-none font-bold text-sm [&>option]:bg-white [&>option]:text-black"
                                            >
                                                <option value="all">All Status</option>
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Contacts List */}
                                <div className="space-y-4">
                                    {filteredContacts.length === 0 ? (
                                        <div className="text-center py-20">
                                            <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                            <p className="text-white/40">No contacts found</p>
                                        </div>
                                    ) : (
                                        filteredContacts.map(contact => (
                                            <div key={contact.id} className="relative group">
                                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                                    {/* Corner brackets */}
                                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/20"></div>

                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h4 className="font-black text-lg text-white">{contact.name}</h4>
                                                            <p className="text-sm text-white/60">{contact.email}</p>
                                                            {contact.company && (
                                                                <p className="text-xs text-white/40">{contact.company}</p>
                                                            )}
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(contact.status)}`}>
                                                            {contact.status.toUpperCase()}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-white/80 mb-4 p-4 rounded-lg bg-white/5 border border-white/5">{contact.message}</p>

                                                    {contact.services.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {contact.services.map(service => (
                                                                <span key={service} className="px-2 py-1 rounded-lg bg-[#DD00FF]/10 border border-[#DD00FF]/30 text-xs font-bold text-[#DD00FF] uppercase">
                                                                    {service}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDate(contact.submitted_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Consultations Tab */}
                        {activeTab === 'consultations' && (
                            <div className="space-y-6">
                                {/* Filters */}
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                                <input
                                                    type="text"
                                                    placeholder="Search by name or email..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white text-black placeholder-black/40 border-2 border-white/20 rounded-xl focus:border-[#00FFFF] focus:outline-none transition-all font-medium text-sm"
                                                />
                                            </div>
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="px-4 py-2.5 bg-white text-black border-2 border-white/20 rounded-xl focus:border-[#00FFFF] focus:outline-none font-bold text-sm [&>option]:bg-white [&>option]:text-black"
                                            >
                                                <option value="all">All Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Consultations List */}
                                <div className="space-y-4">
                                    {filteredConsultations.length === 0 ? (
                                        <div className="text-center py-20">
                                            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                            <p className="text-white/40">No consultations found</p>
                                        </div>
                                    ) : (
                                        filteredConsultations.map(consultation => (
                                            <div key={consultation.id} className="relative group">
                                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                                                    {/* Corner brackets */}
                                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/20"></div>

                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h4 className="font-black text-lg text-white">{consultation.name}</h4>
                                                            <p className="text-sm text-white/60">{consultation.email}</p>
                                                            {consultation.company && (
                                                                <p className="text-xs text-white/40">{consultation.company}</p>
                                                            )}
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(consultation.status)}`}>
                                                            {consultation.status.toUpperCase()}
                                                        </span>
                                                    </div>

                                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                                        {consultation.project_type && (
                                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Project Type</p>
                                                                <p className="text-sm font-bold text-[#00FFFF]">{consultation.project_type}</p>
                                                            </div>
                                                        )}
                                                        {consultation.budget_range && (
                                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Budget</p>
                                                                <p className="text-sm font-bold text-[#00FF9D]">{consultation.budget_range}</p>
                                                            </div>
                                                        )}
                                                        {consultation.timeline && (
                                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Timeline</p>
                                                                <p className="text-sm font-bold text-[#DD00FF]">{consultation.timeline}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {consultation.message && (
                                                        <p className="text-sm text-white/80 mb-4 p-4 rounded-lg bg-white/5 border border-white/5">{consultation.message}</p>
                                                    )}

                                                    <div className="flex items-center gap-2 text-xs text-white/40">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDate(consultation.requested_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Newsletter Tab */}
                        {activeTab === 'newsletter' && (
                            <div className="space-y-6">
                                {/* Search */}
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                            <input
                                                type="text"
                                                placeholder="Search subscribers by email..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-white text-black placeholder-black/40 border-2 border-white/20 rounded-xl focus:border-[#00FFFF] focus:outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Subscribers List */}
                                <div className="space-y-3">
                                    {filteredNewsletters.length === 0 ? (
                                        <div className="text-center py-20">
                                            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                            <p className="text-white/40">No subscribers found</p>
                                        </div>
                                    ) : (
                                        filteredNewsletters.map(subscription => (
                                            <div key={subscription.id} className="relative group">
                                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-[#FF0099]/10 border border-[#FF0099]/30 flex items-center justify-center">
                                                            <Users className="w-5 h-5 text-[#FF0099]" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white">{subscription.email}</p>
                                                            <p className="text-xs text-white/40">
                                                                {subscription.source} • {formatDate(subscription.subscribed_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${subscription.is_active ? 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/30' : 'text-white/30 bg-white/5 border-white/10'}`}>
                                                        {subscription.is_active ? 'ACTIVE' : 'INACTIVE'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
