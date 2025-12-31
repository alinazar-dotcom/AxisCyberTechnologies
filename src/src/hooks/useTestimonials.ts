import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Testimonial {
  id: string;
  client_name: string;
  position: string;
  company: string;
  email?: string;
  avatar_url?: string;
  content: string;
  rating: number;
  project_title?: string;
  service_provided?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at?: string;
}

interface UseTestimonialsOptions {
  search?: string;
  status?: 'pending' | 'approved' | 'rejected';
  sortBy?: 'created_at' | 'rating' | 'client_name';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
}

export function useTestimonials(options: UseTestimonialsOptions = {}): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('testimonials')
        .select('*', { count: 'exact' });

      if (options.search) {
        query = query.or(`client_name.ilike.%${options.search}%,company.ilike.%${options.search}%,content.ilike.%${options.search}%`);
      }
      if (options.status) {
        const dbStatus = options.status === 'approved' ? 'published' : options.status === 'rejected' ? 'archived' : 'draft';
        query = query.eq('status', dbStatus);
      }

      // Sorting
      const sortBy = options.sortBy || 'created_at';
      const sortOrder = options.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Pagination
      if (options.limit) {
        const from = options.offset || 0;
        const to = from + options.limit - 1;
        query = query.range(from, to);
      }

      const { data, error: supabaseError, count } = await query;

      if (supabaseError) throw supabaseError;

      const mappedTestimonials: Testimonial[] = (data || []).map(item => ({
        id: item.id,
        client_name: item.client_name,
        company: item.client_company || item.company || '',
        position: item.client_role || item.position || '',
        email: item.email || '',
        avatar_url: item.client_avatar || item.avatar_url || '',
        content: item.content,
        rating: item.rating,
        project_title: item.project_title || '',
        service_provided: item.service_provided || '',
        status: item.status === 'published' ? 'approved' : item.status === 'archived' ? 'rejected' : 'pending',
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      setTestimonials(mappedTestimonials);
      setTotal(count || 0);
    } catch (err: any) {
      console.error('Error fetching testimonials:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [
    options.search,
    options.status,
    options.sortBy,
    options.sortOrder,
    options.limit,
    options.offset,
  ]);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
    total,
  };
}
