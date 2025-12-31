'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TeamMember } from '../../hooks/useTeamMembers';
import { Loader2, X, Plus, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

interface TeamMemberFormModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TeamMemberFormModal({ member, isOpen, onClose, onSuccess }: TeamMemberFormModalProps) {
  const isEdit = !!member;

  const [formData, setFormData] = useState({
    full_name: '',
    slug: '',
    role: '',
    department: '',
    bio: '',
    photo_url: '',
    email: '',
    phone: '',
    location: '',
    skills: [] as string[],
    expertise_areas: [] as string[],
    social_links: {
      linkedin: '',
      github: '',
      twitter: '',
      website: '',
    },
    years_experience: '',
    joined_date: '',
    status: 'active' as 'active' | 'inactive',
    featured: false,
    display_order: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newExpertise, setNewExpertise] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Load member data if editing
  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || '',
        slug: member.slug || '',
        role: member.role || '',
        department: member.department || '',
        bio: member.bio || '',
        photo_url: member.photo_url || '',
        email: member.email || '',
        phone: member.phone || '',
        location: member.location || '',
        skills: member.skills || [],
        expertise_areas: member.expertise_areas || [],
        social_links: {
          linkedin: member.social_links?.linkedin || '',
          github: member.social_links?.github || '',
          twitter: member.social_links?.twitter || '',
          website: member.social_links?.website || '',
        },
        years_experience: member.years_experience ? member.years_experience.toString() : '',
        joined_date: member.joined_date || '',
        status: member.status || 'active',
        featured: member.featured || false,
        display_order: member.display_order ? member.display_order.toString() : '',
      });
    } else {
      // Reset form for new member
      setFormData({
        full_name: '',
        slug: '',
        role: '',
        department: '',
        bio: '',
        photo_url: '',
        email: '',
        phone: '',
        location: '',
        skills: [],
        expertise_areas: [],
        social_links: {
          linkedin: '',
          github: '',
          twitter: '',
          website: '',
        },
        years_experience: '',
        joined_date: '',
        status: 'active',
        featured: false,
        display_order: '',
      });
    }
    setErrors({});
  }, [member, isOpen]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && formData.full_name) {
      const slug = formData.full_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.full_name, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    try {
      // Map frontend fields to DB columns
      const dbData = {
        name: formData.full_name,
        slug: formData.slug,
        role: formData.role,
        department: formData.department,
        bio: formData.bio,
        avatar: formData.photo_url,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        skills: formData.skills,
        specializations: formData.expertise_areas,
        linkedin_url: formData.social_links.linkedin,
        github_url: formData.social_links.github,
        twitter_url: formData.social_links.twitter,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
        joined_date: formData.joined_date || new Date().toISOString(),
        is_active: formData.status === 'active',
        is_leadership: formData.featured,
        display_order: formData.display_order ? parseInt(formData.display_order) : 0,
        updated_at: new Date().toISOString(),
      };

      let error;

      if (isEdit && member) {
        // Update existing member
        const { error: updateError } = await supabase
          .from('team_members')
          .update(dbData)
          .eq('id', member.id);
        error = updateError;
      } else {
        // Create new member
        const { error: insertError } = await supabase
          .from('team_members')
          .insert([dbData]);
        error = insertError;
      }

      if (error) {
        throw error;
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      const message = error.message || 'Failed to save team member';
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
      if (errors.skills) {
        setErrors({ ...errors, skills: '' });
      }
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise_areas.includes(newExpertise.trim())) {
      setFormData({
        ...formData,
        expertise_areas: [...formData.expertise_areas, newExpertise.trim()],
      });
      setNewExpertise('');
    }
  };

  const removeExpertise = (expertise: string) => {
    setFormData({
      ...formData,
      expertise_areas: formData.expertise_areas.filter(e => e !== expertise),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Team Member' : 'Add New Team Member'}
      size="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={saving} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="team-member-form" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Member' : 'Add Member'}</>
            )}
          </Button>
        </div>
      }
    >
      <form id="team-member-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
            {errors.submit}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Basic Information</h3>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="e.g., John Smith"
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.full_name ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.full_name && <p className="mt-1 text-sm text-red-400">{errors.full_name}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm">/team/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="john-smith"
                className={`flex-1 px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
            </div>
            {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Role */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Role / Title *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Senior Full-Stack Developer"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.role ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.role && <p className="mt-1 text-sm text-red-400">{errors.role}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Department (Optional)
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g., Engineering, Design, Sales"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              value={formData.photo_url}
              onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
              placeholder="Paste image URL from Media Library"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <p className="mt-1 text-xs text-white/40 flex items-center gap-2">
              <ImageIcon className="w-3 h-3" />
              Upload photo in Media Library, then copy URL here
            </p>
            {formData.photo_url && (
              <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src={formData.photo_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief bio or description (2-3 sentences)"
              rows={4}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.bio ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.bio && <p className="mt-1 text-sm text-red-400">{errors.bio}</p>}
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Skills & Expertise</h3>

          {/* Skills */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Skills *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="e.g., React, TypeScript, AWS"
                className={`flex-1 px-4 py-2 bg-black/40 border-2 rounded-lg text-white placeholder-white/40 focus:outline-none transition-colors ${errors.skills ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              <Button type="button" variant="secondary" onClick={addSkill}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            {errors.skills && <p className="mb-2 text-sm text-red-400">{errors.skills}</p>}
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 rounded-lg text-sm text-[var(--neon-purple)] font-bold flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Expertise Areas */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Expertise Areas (Optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                placeholder="e.g., Frontend Development, Cloud Architecture"
                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <Button type="button" variant="secondary" onClick={addExpertise}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.expertise_areas.map((expertise) => (
                <span
                  key={expertise}
                  className="px-3 py-1 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-lg text-sm text-[var(--neon-cyan)] font-bold flex items-center gap-2"
                >
                  {expertise}
                  <button
                    type="button"
                    onClick={() => removeExpertise(expertise)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Years of Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Years of Experience (Optional)
              </label>
              <input
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                placeholder="e.g., 5"
                min="0"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Joined Date (Optional)
              </label>
              <input
                type="date"
                value={formData.joined_date}
                onChange={(e) => setFormData({ ...formData, joined_date: e.target.value })}
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Los Angeles, USA"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Social Links (Optional)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.social_links.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.social_links.github}
                onChange={(e) => setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, github: e.target.value }
                })}
                placeholder="https://github.com/username"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Twitter URL
              </label>
              <input
                type="url"
                value={formData.social_links.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/username"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Personal Website
              </label>
              <input
                type="url"
                value={formData.social_links.website}
                onChange={(e) => setFormData({
                  ...formData,
                  social_links: { ...formData.social_links, website: e.target.value }
                })}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Settings</h3>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'active'
              ? 'bg-[var(--neon-green)]/10 border-[var(--neon-green)]/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Active</span>
                <span className="text-xs text-white/60">Currently with team</span>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'inactive'
              ? 'bg-red-500/10 border-red-500/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Inactive</span>
                <span className="text-xs text-white/60">No longer with team</span>
              </div>
            </label>
          </div>

          {/* Featured & Display Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured */}
            <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-cyan)]/30 transition-all">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Featured Member</span>
                <span className="text-xs text-white/60">Highlight on homepage</span>
              </div>
            </label>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Display Order (Optional)
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                placeholder="1, 2, 3..."
                min="0"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <p className="mt-1 text-xs text-white/40">Lower numbers appear first</p>
            </div>
          </div>
        </div>

      </form>
    </Modal>
  );
}
