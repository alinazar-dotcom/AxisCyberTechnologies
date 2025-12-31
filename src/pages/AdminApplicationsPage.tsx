'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase,
    Mail,
    Phone,
    ExternalLink,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Trash2,
    Filter,
    RefreshCw,
    ArrowLeft,
    Search
} from 'lucide-react';
import { useApplications, Application } from '../src/hooks/useApplications';
import { supabase } from '../lib/supabase';

export default function AdminApplicationsPage() {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);

    const { applications, loading, error, refetch } = useApplications({
        status: selectedStatus,
        search: searchQuery
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

    const updateStatus = async (id: string, status: string) => {
        try {
            const { error: supabaseError } = await supabase
                .from('job_applications')
                .update({ status })
                .eq('id', id);

            if (supabaseError) throw supabaseError;

            toast(`Status updated to ${status}`);
            refetch();
            if (selectedApp?.id === id) {
                setSelectedApp(prev => prev ? { ...prev, status: status as any } : null);
            }
        } catch (err: any) {
            toast(err.message || 'Failed to update status', 'error');
        }
    };

    const deleteApplication = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;

        try {
            const { error: supabaseError } = await supabase
                .from('job_applications')
                .delete()
                .eq('id', id);

            if (supabaseError) throw supabaseError;

            toast('Application deleted successfully');
            refetch();
            if (selectedApp?.id === id) {
                setSelectedApp(null);
            }
        } catch (err: any) {
            toast(err.message || 'Failed to delete application', 'error');
        }
    };

    const statuses = ['all', 'new', 'reviewed', 'interview', 'rejected', 'hired'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
            case 'reviewed': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'interview': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
            case 'hired': return 'text-green-400 bg-green-400/10 border-green-400/30';
            case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/30';
            default: return 'text-white/60 bg-white/10 border-white/30';
        }
    };

    const stats = {
        total: applications.length,
        new: applications.filter(a => a.status === 'new').length,
        reviewed: applications.filter(a => a.status === 'reviewed').length,
        interview: applications.filter(a => a.status === 'interview').length,
        hired: applications.filter(a => a.status === 'hired').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
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
                                    Careers Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Career Applications
                            </h1>
                            <p className="text-white/60">
                                Manage job applications and candidate pipeline
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
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    {[
                        { label: 'Total', value: stats.total, color: 'white' },
                        { label: 'New', value: stats.new, color: '#00FFFF' },
                        { label: 'Reviewed', value: stats.reviewed, color: '#FF7A00' },
                        { label: 'Interview', value: stats.interview, color: '#DD00FF' },
                        { label: 'Hired', value: stats.hired, color: '#00FF9D' },
                        { label: 'Rejected', value: stats.rejected, color: '#FF0000' }
                    ].map((stat) => (
                        <div key={stat.label} className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-lg"></div>
                            <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                                <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    <div className="md:col-span-6 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/20 focus:border-[#00FFFF] focus:outline-none transition-all"
                        />
                    </div>
                    <div className="md:col-span-6 flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize whitespace-nowrap ${selectedStatus === status
                                    ? 'bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] text-white'
                                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading applications...</p>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                        <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60">No applications found</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* List */}
                        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    onClick={() => setSelectedApp(app)}
                                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedApp?.id === app.id
                                        ? 'bg-[#DD00FF]/10 border-[#DD00FF]/30'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-lg font-black text-white mb-1">{app.full_name}</h3>
                                            <p className="text-sm text-[#00FFFF]">{app.job?.title || 'Unknown Position'}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border capitalize ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {app.email}
                                        </span>
                                        <span>{new Date(app.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Details */}
                        {selectedApp ? (
                            <div className="sticky top-24">
                                <div className="p-8 bg-[#0B0D14]/90 backdrop-blur-xl border-2 border-[#DD00FF]/30 rounded-2xl">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-black text-white mb-2">{selectedApp.full_name}</h2>
                                            <p className="text-[#00FFFF] font-bold">{selectedApp.job?.title}</p>
                                            <p className="text-sm text-white/40">{selectedApp.job?.department}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-lg text-sm font-bold border capitalize ${getStatusColor(selectedApp.status)}`}>
                                            {selectedApp.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Email</p>
                                            <a href={`mailto:${selectedApp.email}`} className="text-white hover:text-[#00FFFF] transition-colors flex items-center gap-2">
                                                {selectedApp.email} <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                        {selectedApp.phone && (
                                            <div>
                                                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Phone</p>
                                                <a href={`tel:${selectedApp.phone}`} className="text-white hover:text-[#00FFFF] transition-colors">
                                                    {selectedApp.phone}
                                                </a>
                                            </div>
                                        )}
                                        {selectedApp.current_location && (
                                            <div>
                                                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Location</p>
                                                <p className="text-white">{selectedApp.current_location}</p>
                                            </div>
                                        )}
                                        {selectedApp.years_of_experience !== undefined && (
                                            <div>
                                                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Experience</p>
                                                <p className="text-white">{selectedApp.years_of_experience} Years</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {selectedApp.resume_url && (
                                            <a href={selectedApp.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#00FFFF] transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#00FFFF]/10 flex items-center justify-center">
                                                        <Eye className="w-5 h-5 text-[#00FFFF]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Resume / CV</p>
                                                        <p className="text-xs text-white/40">Click to view document</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#00FFFF]" />
                                            </a>
                                        )}
                                        {selectedApp.portfolio_url && (
                                            <a href={selectedApp.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#DD00FF] transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#DD00FF]/10 flex items-center justify-center">
                                                        <ExternalLink className="w-5 h-5 text-[#DD00FF]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Portfolio / Website</p>
                                                        <p className="text-xs text-white/40">View candidate's work</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#DD00FF]" />
                                            </a>
                                        )}
                                    </div>

                                    {selectedApp.cover_letter && (
                                        <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                                            <p className="text-xs text-white/40 mb-3 uppercase tracking-wider">Cover Letter</p>
                                            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                                                {selectedApp.cover_letter}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-white mb-3">Update Pipeline Status</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['new', 'reviewed', 'interview', 'hired', 'rejected'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateStatus(selectedApp.id, status)}
                                                    disabled={selectedApp.status === status}
                                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all capitalize ${selectedApp.status === status
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : 'hover:scale-105'
                                                        } ${getStatusColor(status)}`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => deleteApplication(selectedApp.id)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-bold hover:bg-red-500/20 transition-all mt-4"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Application
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[600px] border-2 border-dashed border-white/10 rounded-2xl">
                                <div className="text-center">
                                    <Eye className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                    <p className="text-white/40">Select an application to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
