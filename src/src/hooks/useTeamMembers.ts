import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: string;
  full_name: string;
  slug: string;
  role: string;
  department?: string;
  bio: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  location?: string;
  skills: string[];
  expertise_areas: string[];
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  years_experience?: number;
  joined_date?: string;
  status: 'active' | 'inactive';
  featured: boolean;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

interface UseTeamMembersOptions {
  search?: string;
  status?: 'active' | 'inactive';
  featured?: boolean;
  department?: string;
  sortBy?: 'full_name' | 'role' | 'joined_date' | 'display_order';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

interface UseTeamMembersReturn {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateMember: (member: TeamMember) => void;
  total: number;
}

export function useTeamMembers(options: UseTeamMembersOptions = {}): UseTeamMembersReturn {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('team_members')
        .select('*', { count: 'exact' });

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,role.ilike.%${options.search}%,bio.ilike.%${options.search}%`);
      }
      if (options.status) {
        query = query.eq('is_active', options.status === 'active');
      }
      if (options.featured !== undefined) {
        query = query.eq('is_leadership', options.featured);
      }
      if (options.department) {
        query = query.eq('department', options.department);
      }

      // Sorting
      const sortBy = options.sortBy === 'full_name' ? 'name' : (options.sortBy || 'display_order');
      const sortOrder = options.sortOrder || 'asc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Pagination
      if (options.limit) {
        const from = options.offset || 0;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error: supabaseError, count } = await query;

      if (supabaseError) throw supabaseError;

      const mappedMembers: TeamMember[] = (data || []).map(item => ({
        id: item.id,
        full_name: item.name, // Map 'name' from DB to 'full_name'
        slug: item.slug,
        role: item.role,
        department: item.department,
        bio: item.bio,
        photo_url: item.photo_url || item.avatar, // Handle both photo_url and avatar
        email: item.email,
        phone: item.phone,
        location: item.location,
        skills: item.skills || [],
        expertise_areas: item.specializations || item.expertise_areas || [], // Handle specializations
        social_links: {
          linkedin: item.linkedin_url || item.social_links?.linkedin,
          github: item.github_url || item.social_links?.github,
          twitter: item.twitter_url || item.social_links?.twitter,
          website: item.social_links?.website,
        },
        years_experience: item.years_experience,
        joined_date: item.joined_date,
        status: item.status || (item.is_active ? 'active' : 'inactive'),
        featured: item.is_leadership,
        display_order: item.display_order,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      setTeamMembers(mappedMembers);
      setTotal(count || 0);
    } catch (err: any) {
      console.error('Error fetching team members:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [
    options.search,
    options.status,
    options.featured,
    options.department,
    options.sortBy,
    options.sortOrder,
    options.limit,
    options.offset,
  ]);

  const updateMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  return {
    teamMembers,
    loading,
    error,
    refetch: fetchTeamMembers,
    updateMember,
    total,
  };
}
