'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, User, Star, CheckCircle2, XCircle, Mail, MapPin, Linkedin, Github, Twitter, Globe, RefreshCw, ArrowLeft, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TeamMemberFormModal } from '../src/components/admin/TeamMemberFormModal';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';
import { useTeamMembers, TeamMember } from '../src/hooks/useTeamMembers';
import { supabase } from '../lib/supabase';

export default function TeamManagerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'regular'>('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'full_name' | 'role' | 'joined_date' | 'display_order'>('display_order');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

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

    const { teamMembers, loading, error, refetch, updateMember } = useTeamMembers({
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : statusFilter,
        featured: featuredFilter === 'all' ? undefined : featuredFilter === 'featured',
        department: departmentFilter === 'all' ? undefined : departmentFilter,
        sortBy,
        sortOrder,
        limit: 50,
    });

    // Get unique departments from all team members
    const allDepartments = Array.from(
        new Set(teamMembers.map(m => m.department).filter(Boolean))
    ).sort();

    const handleDelete = async () => {
        if (!deleteId) return;

        toast.promise(
            (async () => {
                const { error: supabaseError } = await supabase
                    .from('team_members')
                    .delete()
                    .eq('id', deleteId);

                if (supabaseError) throw supabaseError;
                refetch();
            })(),
            {
                loading: 'Deleting team member...',
                success: 'Team member deleted successfully!',
                error: (err: any) => err.message || 'Failed to delete team member',
            }
        );
        setDeleteId(null);
    };

    const toggleFeatured = async (member: TeamMember) => {
        toast.promise(
            (async () => {
                const { error: supabaseError } = await supabase
                    .from('team_members')
                    .update({ is_leadership: !member.featured })
                    .eq('id', member.id);

                if (supabaseError) throw supabaseError;
                updateMember({ ...member, featured: !member.featured });
            })(),
            {
                loading: member.featured ? 'Removing from leadership...' : 'Adding to leadership...',
                success: member.featured ? 'Removed from leadership' : 'Added to leadership!',
                error: (err: any) => err.message || 'Failed to update team member',
            }
        );
    };

    const toggleStatus = async (member: TeamMember) => {
        const newIsActive = member.status !== 'active';
        toast.promise(
            (async () => {
                const { error: supabaseError } = await supabase
                    .from('team_members')
                    .update({ is_active: newIsActive })
                    .eq('id', member.id);

                if (supabaseError) throw supabaseError;
                updateMember({ ...member, status: newIsActive ? 'active' : 'inactive' });
            })(),
            {
                loading: `Setting member to ${newIsActive ? 'active' : 'inactive'}...`,
                success: `Status changed to ${newIsActive ? 'active' : 'inactive'}!`,
                error: (err: any) => err.message || 'Failed to update team member',
            }
        );
    };

    const handleFormSuccess = () => {
        toast.success(editingMember ? 'Team member updated successfully!' : 'Team member added successfully!');
        refetch();
    };

    const stats = {
        total: teamMembers.length,
        active: teamMembers.filter(m => m.status === 'active').length,
        inactive: teamMembers.filter(m => m.status === 'inactive').length,
        featured: teamMembers.filter(m => m.featured).length,
        avgExperience: teamMembers.length > 0
            ? Math.round(teamMembers.reduce((sum, m) => sum + (m.years_experience || 0), 0) / teamMembers.filter(m => m.years_experience).length) || 0
            : 0,
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
                                    Team Manager
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Our Team
                            </h1>
                            <p className="text-white/60">
                                Manage team members and their profiles
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
                                    setEditingMember(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                <Plus className="w-5 h-5" />
                                Add Member
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
                            <p className="text-xs text-white/40 mb-1">Avg Exp</p>
                            <p className="text-2xl font-black text-[#DD00FF]">{stats.avgExperience}y</p>
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
                            placeholder="Search team members..."
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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Featured Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.value as any)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Members</option>
                            <option value="featured">Featured Only</option>
                            <option value="regular">Regular Only</option>
                        </select>
                    </div>

                    {/* Department Filter */}
                    <div className="md:col-span-2">
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-white/20 rounded-xl text-black focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all"
                        >
                            <option value="all">All Departments</option>
                            {allDepartments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
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

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading team members...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Team Members Grid */}
                {!loading && !error && teamMembers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="relative group h-full"
                            >
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all h-full flex flex-col">
                                    <div className="flex-1">
                                        {/* Photo & Status */}
                                        <div className="flex items-start gap-4 mb-4">
                                            {/* Photo */}
                                            <div className="relative flex-shrink-0">
                                                {member.photo_url ? (
                                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#DD00FF]/30">
                                                        <img
                                                            src={member.photo_url}
                                                            alt={member.full_name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DD00FF] to-[#00FFFF] flex items-center justify-center">
                                                        <User className="w-10 h-10 text-white" />
                                                    </div>
                                                )}
                                                {member.featured && (
                                                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00FFFF] border-2 border-[#0B0D14] flex items-center justify-center">
                                                        <Star className="w-3 h-3 text-white fill-current" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Name & Role */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-black text-white truncate mb-1">
                                                    {member.full_name}
                                                </h3>
                                                <p className="text-sm text-[#DD00FF] font-bold mb-1">
                                                    {member.role}
                                                </p>
                                                {member.department && (
                                                    <p className="text-xs text-white/60">
                                                        {member.department}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-sm text-white/70 mb-4 line-clamp-2">
                                            {member.bio}
                                        </p>

                                        {/* Skills */}
                                        {member.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {member.skills.slice(0, 3).map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2 py-1 bg-[#DD00FF]/10 border border-[#DD00FF]/30 rounded text-xs text-[#DD00FF] font-bold"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {member.skills.length > 3 && (
                                                    <span className="px-2 py-1 text-xs text-white/40">
                                                        +{member.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Contact & Social */}
                                        <div className="space-y-2 mb-4">
                                            {member.email && (
                                                <div className="flex items-center gap-2 text-xs text-white/60">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="truncate">{member.email}</span>
                                                </div>
                                            )}
                                            {member.location && (
                                                <div className="flex items-center gap-2 text-xs text-white/60">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{member.location}</span>
                                                </div>
                                            )}

                                            {/* Social Links */}
                                            {(member.social_links.linkedin || member.social_links.github || member.social_links.twitter || member.social_links.website) && (
                                                <div className="flex items-center gap-2 pt-2">
                                                    {member.social_links.linkedin && (
                                                        <a
                                                            href={member.social_links.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#00FFFF]/30 hover:text-[#00FFFF] transition-all"
                                                            title="LinkedIn"
                                                        >
                                                            <Linkedin className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    {member.social_links.github && (
                                                        <a
                                                            href={member.social_links.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                                            title="GitHub"
                                                        >
                                                            <Github className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    {member.social_links.twitter && (
                                                        <a
                                                            href={member.social_links.twitter}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#00FFFF]/30 hover:text-[#00FFFF] transition-all"
                                                            title="Twitter"
                                                        >
                                                            <Twitter className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    {member.social_links.website && (
                                                        <a
                                                            href={member.social_links.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#FF7A00]/30 hover:text-[#FF7A00] transition-all"
                                                            title="Website"
                                                        >
                                                            <Globe className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Status & Experience */}
                                        <div className="flex items-center justify-between mb-4">
                                            {member.status === 'active' ? (
                                                <span className="px-3 py-1 bg-[#00FF9D]/10 border border-[#00FF9D]/30 rounded-lg text-xs text-[#00FF9D] font-bold flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-bold flex items-center gap-1">
                                                    <XCircle className="w-3 h-3" />
                                                    Inactive
                                                </span>
                                            )}
                                            {member.years_experience && (
                                                <span className="text-xs text-white/60">
                                                    {member.years_experience}y exp.
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4 border-t border-white/10">
                                        <button
                                            onClick={() => toggleFeatured(member)}
                                            className={`flex-1 p-2 rounded-lg border transition-all ${member.featured
                                                ? 'bg-[#00FFFF]/20 border-[#00FFFF]/50 text-[#00FFFF]'
                                                : 'bg-black/40 border-white/10 text-white/60 hover:border-[#00FFFF]/30 hover:text-[#00FFFF]'
                                                }`}
                                            title={member.featured ? 'Remove from featured' : 'Add to featured'}
                                        >
                                            <Star className={`w-4 h-4 mx-auto ${member.featured ? 'fill-current' : ''}`} />
                                        </button>

                                        <button
                                            onClick={() => toggleStatus(member)}
                                            className={`flex-1 p-2 rounded-lg border transition-all ${member.status === 'active'
                                                ? 'bg-[#00FF9D]/20 border-[#00FF9D]/50 text-[#00FF9D]'
                                                : 'bg-red-500/20 border-red-500/50 text-red-400'
                                                }`}
                                            title={member.status === 'active' ? 'Set inactive' : 'Set active'}
                                        >
                                            {member.status === 'active' ? (
                                                <CheckCircle2 className="w-4 h-4 mx-auto" />
                                            ) : (
                                                <XCircle className="w-4 h-4 mx-auto" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingMember(member);
                                                setShowModal(true);
                                            }}
                                            className="flex-1 p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[#DD00FF]/30 hover:text-[#DD00FF] transition-all"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4 mx-auto" />
                                        </button>

                                        <button
                                            onClick={() => setDeleteId(member.id)}
                                            className="flex-1 p-2 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && teamMembers.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-10 h-10 text-white/20" />
                        </div>
                        <p className="text-white/60 font-bold mb-2">
                            {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || departmentFilter !== 'all'
                                ? 'No team members found'
                                : 'No team members yet'}
                        </p>
                        <p className="text-white/40 text-sm mb-6">
                            {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || departmentFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Click "Add Member" to add your first team member'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && featuredFilter === 'all' && departmentFilter === 'all' && (
                            <button
                                onClick={() => {
                                    setEditingMember(null);
                                    setShowModal(true);
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-[#DD00FF] to-[#00FFFF] rounded-lg text-white font-bold hover:shadow-[0_0_30px_rgba(221,0,255,0.5)] transition-all"
                            >
                                <Plus className="w-5 h-5 inline mr-2" />
                                Add First Member
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Team Member Form Modal */}
            <TeamMemberFormModal
                member={editingMember}
                isOpen={showModal}
                onSuccess={handleFormSuccess}
                onClose={() => setShowModal(false)}
            />

            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Team Member"
                message="Are you sure you want to delete this team member? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </div>
    );
}