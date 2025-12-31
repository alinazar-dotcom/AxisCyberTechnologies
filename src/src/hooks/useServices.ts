import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  tagline: string;
  icon_name: string;
  color_theme: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  projects_completed: number;
  happy_clients: string;
  success_rate: number;
  avg_delivery_time: string;
  technologies: string[];
  key_features: string[];
  process_steps: any[];
  use_cases: string[];
  views: number;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

interface UseServicesOptions {
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UseServicesReturn {
  services: Service[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateLocalService: (id: string, updates: Partial<Service>) => void;
}

export function useServices(options: UseServicesOptions = {}): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    page = 1,
    limit = 12,
    featured,
    search,
    sortBy = 'display_order',
    sortOrder = 'asc',
  } = options;

  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('services')
        .select('*', { count: 'exact' });

      if (featured !== undefined) {
        query = query.eq('is_featured', featured);
      }
      if (search) {
        query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`);
      }

      // Sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error: supabaseError, count } = await query;

      if (supabaseError) throw supabaseError;

      const mappedServices: Service[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        short_description: item.short_description,
        full_description: item.full_description,
        tagline: item.tagline || '',
        icon_name: item.icon,
        color_theme: item.color,
        is_featured: item.is_featured,
        is_active: item.is_active,
        display_order: item.display_order,
        projects_completed: item.projects_completed || 0,
        happy_clients: item.happy_clients || '50+',
        success_rate: item.success_rate || 100,
        avg_delivery_time: '2-4 weeks', // Default or from schema if exists
        technologies: item.technologies || [],
        key_features: item.features || [],
        process_steps: item.process_steps || [],
        use_cases: item.use_cases || [],
        views: 0, // Not in schema
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      setServices(mappedServices);

      const total = count || 0;
      setPagination({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
        hasPrevious: page > 1,
      });
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, limit, featured, search, sortBy, sortOrder]);

  const updateLocalService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(service =>
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  return {
    services,
    pagination,
    loading,
    error,
    refetch: fetchServices,
    updateLocalService,
  };
}
