'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase,
    Plus,
    Edit,
    Trash2,
    Search,
    ArrowUpDown,
    MapPin,
    Clock,
    DollarSign,
    RefreshCw,
    ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';
import { JobFormModal } from '../src/components/admin/JobFormModal';
import { useJobs, Job } from '../src/hooks/useJobs';
import { supabase } from '../lib/supabase';

export default function JobsManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'department'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
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

    const { jobs, loading, error, refetch } = useJobs({
        search: searchQuery,
        department: departmentFilter,
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
        sortBy,
        sortOrder,
        limit: 50,
    });

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        toast.promise(
            (async () => {
                const { error: supabaseError } = await supabase
                    .from('jobs')
                    .update({ is_active: !currentStatus })
                    .eq('id', id);

                if (supabaseError) throw supabaseError;
                refetch();
            })(),
            {
                loading: 'Updating job status...',
                success: `Job ${!currentStatus ? 'activated' : 'deactivated'} successfully!`,
                error: (err: any) => err.message || 'Failed to update job status',
            }
        );
    };

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Job Posting',
            message: 'Are you sure you want to delete this job posting? This action cannot be undone.',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error: supabaseError } = await supabase
                            .from('jobs')
                            .delete()
                            .eq('id', id);

                        if (supabaseError) throw supabaseError;
                        refetch();
                    })(),
                    {
                        loading: 'Deleting job posting...',
                        success: 'Job deleted successfully!',
                        error: (err: any) => err.message || 'Failed to delete job',
                    }
                );
            },
        });
    };

    const handleFormSuccess = () => {
        refetch();
        toast.success(editingJob ? 'Job updated successfully!' : 'Job created successfully!');
    };

    const getEmploymentTypeBadge = (type: string) => {
        const colors = {
            'full-time': 'text-[#00FFFF] bg-[#00FFFF]/10 border-[#00FFFF]/30',
            'part-time': 'text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/30',
            'contract': 'text-[#DD00FF] bg-[#DD00FF]/10 border-[#DD00FF]/30',
            'internship': 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/30',
        };
        return colors[type as keyof typeof colors] || colors['full-time'];
    };

    const getExperienceLevelBadge = (level: string) => {
        const colors = {
            'entry': 'text-[#00FF9D] bg-[#00FF9D]/10 border-[#00FF9D]/30',
            'mid': 'text-[#00FFFF] bg-[#00FFFF]/10 border-[#00FFFF]/30',
            'senior': 'text-[#FF7A00] bg-[#FF7A00]/10 border-[#FF7A00]/30',
            'lead': 'text-[#DD00FF] bg-[#DD00FF]/10 border-[#DD00FF]/30',
        };
        return colors[level as keyof typeof colors] || colors['mid'];
    };

    const stats = {
        total: jobs.length,
        active: jobs.filter(j => j.is_active).length,
        inactive: jobs.filter(j => !j.is_active).length,
        remote: jobs.filter(j => j.is_remote).length,
    };

    const departments = Array.from(new Set(jobs.map(j => j.department))).sort();

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
                                    Jobs Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Job Postings
                            </h1>
                            <p className="text-white/60">
                                Create and manage job opportunities
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
                                    setEditingJob(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Create Job
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
                            <p className="text-xs text-white/40 mb-1">Total Jobs</p>
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
                        <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>
                            <p className="text-xs text-white/40 mb-1">Inactive</p>
                            <p className="text-2xl font-black text-white/60">{stats.inactive}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-4">
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                            <p className="text-xs text-white/40 mb-1">Remote</p>
                            <p className="text-2xl font-black text-[#00FFFF]">{stats.remote}</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                    {/* Search */}
                    <div className="md:col-span-5 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search jobs..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-white/20 rounded-xl text-black placeholder-black/40 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        />
                    </div>

                    {/* Department Filter */}
                    <div className="md:col-span-3">
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    {/* Active Filter */}
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

                {/* Loading State - Only on initial load or when no data */}
                {loading && jobs.length === 0 && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading jobs...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Jobs Grid */}
                {((!loading && jobs.length > 0) || (loading && jobs.length > 0)) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="relative group"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-black text-white mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getEmploymentTypeBadge(job.employment_type)}`}>
                                                    {job.employment_type.replace('-', ' ').toUpperCase()}
                                                </span>
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getExperienceLevelBadge(job.experience_level)}`}>
                                                    {job.experience_level.toUpperCase()}
                                                </span>
                                                {job.is_remote && (
                                                    <span className="px-2 py-1 bg-[#DD00FF]/10 border border-[#DD00FF]/30 rounded-lg text-xs text-[#DD00FF] font-bold">
                                                        REMOTE
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${job.is_active ? 'bg-[#00FF9D]' : 'bg-white/10'}`}
                                            onClick={() => handleToggleActive(job.id, job.is_active)}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${job.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-white/60">
                                            <Briefcase className="w-4 h-4" />
                                            {job.department}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/60">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                        {job.salary_range && (
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <DollarSign className="w-4 h-4" />
                                                {job.salary_range}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-white/40">
                                            <Clock className="w-4 h-4" />
                                            Posted {new Date(job.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Description Preview */}
                                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                        {job.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t border-white/10">
                                        <button
                                            onClick={() => {
                                                setEditingJob(job);
                                                setShowModal(true);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || departmentFilter || activeFilter !== 'all'
                                ? 'No jobs found'
                                : 'No job postings yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery || departmentFilter || activeFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "Create Job" to post your first position'}
                        </p>
                        {!searchQuery && !departmentFilter && activeFilter === 'all' && (
                            <button
                                onClick={() => {
                                    setEditingJob(null);
                                    setShowModal(true);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Create First Job
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Job Form Modal */}
            <JobFormModal
                job={editingJob}
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
            />
        </div>
    );
}
