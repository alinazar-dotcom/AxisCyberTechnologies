'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ArrowUpDown, User, Star, CheckCircle2, XCircle, Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { TeamMemberFormModal } from '@/components/admin/TeamMemberFormModal';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useTeamMembers, TeamMember } from '@/hooks/useTeamMembers';

export default function TeamManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'regular'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'full_name' | 'role' | 'joined_date' | 'display_order'>('display_order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
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

  const { teamMembers, loading, error, refetch } = useTeamMembers({
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

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Team Member',
      message: 'Are you sure you want to delete this team member? This action cannot be undone.',
      action: async () => {
        toast.promise(
          (async () => {
            const response = await fetch(`/api/team/${id}`, {
              method: 'DELETE',
            });

            const result = await response.json();
            if (!result.success) throw new Error(result.error || 'Failed to delete team member');

            refetch();
          })(),
          {
            loading: 'Deleting team member...',
            success: 'Team member deleted successfully!',
            error: (err: any) => err.message || 'Failed to delete team member',
          }
        );
      },
    });
  };

  const toggleFeatured = async (member: TeamMember) => {
    toast.promise(
      (async () => {
        const response = await fetch(`/api/team/${member.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featured: !member.featured }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to update team member');

        refetch();
      })(),
      {
        loading: 'Updating featured status...',
        success: member.featured ? 'Removed from featured' : 'Added to featured!',
        error: (err: any) => err.message || 'Failed to update team member',
      }
    );
  };

  const toggleStatus = async (member: TeamMember) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    toast.promise(
      (async () => {
        const response = await fetch(`/api/team/${member.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Failed to update team member');

        refetch();
      })(),
      {
        loading: `Changing status to ${newStatus}...`,
        success: `Status changed to ${newStatus}!`,
        error: (err: any) => err.message || 'Failed to update team member',
      }
    );
  };

  const handleFormSuccess = () => {
    toast.success(editingMember ? 'Team member updated successfully!' : 'Team member added successfully!');
    refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-3 py-1 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 rounded-lg text-xs text-[var(--neon-green)] font-black flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            ACTIVE
          </span>
        );
      case 'inactive':
      default:
        return (
          <span className="px-3 py-1 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-xs text-red-400 font-black flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            INACTIVE
          </span>
        );
    }
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
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              Team Manager
            </h1>
            <p className="text-white/60">
              Manage team members and their profiles
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditingMember(null);
              setShowModal(true);
            }}
          >
            <Plus className="w-5 h-5" />
            Add Team Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-white/[0.02] border-2 border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Total Team</p>
            <p className="text-2xl font-black text-white">{stats.total}</p>
          </div>
          <div className="p-4 bg-[var(--neon-green)]/5 border-2 border-[var(--neon-green)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Active</p>
            <p className="text-2xl font-black text-[var(--neon-green)]">{stats.active}</p>
          </div>
          <div className="p-4 bg-red-500/5 border-2 border-red-500/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Inactive</p>
            <p className="text-2xl font-black text-red-400">{stats.inactive}</p>
          </div>
          <div className="p-4 bg-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Featured</p>
            <p className="text-2xl font-black text-[var(--neon-cyan)]">{stats.featured}</p>
          </div>
          <div className="p-4 bg-[var(--neon-purple)]/5 border-2 border-[var(--neon-purple)]/20 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Avg Experience</p>
            <p className="text-2xl font-black text-[var(--neon-purple)]">{stats.avgExperience}y</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, or skills..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Featured Filter */}
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="all">All Members</option>
            <option value="featured">Featured Only</option>
            <option value="regular">Regular Only</option>
          </select>

          {/* Department Filter */}
          {allDepartments.length > 0 && (
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
            >
              <option value="all">All Departments</option>
              {allDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          )}

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
          >
            <option value="display_order">Sort by Order</option>
            <option value="full_name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="joined_date">Sort by Join Date</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white hover:border-[var(--neon-purple)]/50 transition-colors flex items-center gap-2"
          >
            <ArrowUpDown className="w-5 h-5" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        {/* Loading State - Only on initial load or when no data */}
        {loading && teamMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin"></div>
            <p className="mt-4 text-white/60 font-black">Loading team members...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl">
            <p className="text-red-400 font-black">{error}</p>
          </div>
        )}

        {/* Team Members Grid */}
        {teamMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
              >
                {/* Photo & Status */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Photo */}
                  <div className="relative flex-shrink-0">
                    {member.photo_url ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--neon-purple)]/30">
                        <img
                          src={member.photo_url}
                          alt={member.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                    )}
                    {member.featured && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--neon-cyan)] border-2 border-[var(--bg-secondary)] flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Name & Role */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-white truncate mb-1">
                      {member.full_name}
                    </h3>
                    <p className="text-sm text-[var(--neon-purple)] font-bold mb-1">
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
                        className="px-2 py-1 bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 rounded text-xs text-[var(--neon-purple)] font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs text-white/40">
                        +{member.skills.length - 3} more
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
                          className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
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
                          className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
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
                          className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] transition-all"
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
                          className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-white/60 hover:border-[var(--neon-orange)]/30 hover:text-[var(--neon-orange)] transition-all"
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
                  {getStatusBadge(member.status)}
                  {member.years_experience && (
                    <span className="text-xs text-white/60">
                      {member.years_experience} years exp.
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t-2 border-white/10">
                  <button
                    onClick={() => toggleFeatured(member)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${member.featured
                      ? 'bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)]'
                      : 'bg-black/40 border-white/10 text-white/60 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)]'
                      }`}
                    title={member.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Star className={`w-4 h-4 mx-auto ${member.featured ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleStatus(member)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${member.status === 'active'
                      ? 'bg-[var(--neon-green)]/20 border-[var(--neon-green)]/50 text-[var(--neon-green)]'
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
                    className="flex-1 p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-[var(--neon-purple)]/30 hover:text-[var(--neon-purple)] transition-all"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>

                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 p-2 rounded-lg bg-black/40 border-2 border-white/10 text-white/60 hover:border-red-500/30 hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && teamMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/[0.02] border-2 border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/60 font-black mb-2">
              {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || departmentFilter !== 'all'
                ? 'No team members found'
                : 'No team members yet'}
            </p>
            <p className="text-white/40 text-sm">
              {searchQuery || statusFilter !== 'all' || featuredFilter !== 'all' || departmentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Click "Add Team Member" to add your first team member'}
            </p>
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
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        message={confirmModal.message}
        variant="danger"
      />
    </AdminLayout>
  );
}
