import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_logo_url?: string;
  client_industry: string;
  project_description: string;
  challenge: string;
  solution: string;
  results: string;
  featured_image_url?: string;
  gallery_images: string[];
  technologies: string[];
  team_members: string[];
  services_provided: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  project_duration: string;
  project_url?: string;
  repository_url?: string;
  testimonial_id?: string;
  status: 'draft' | 'published';
  featured: boolean;
  created_at: string;
  updated_at?: string;
  views?: number;
}

interface UseCaseStudiesOptions {
  search?: string;
  status?: 'draft' | 'published';
  featured?: boolean;
  industry?: string;
  sortBy?: 'created_at' | 'title' | 'views';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

interface UseCaseStudiesReturn {
  caseStudies: CaseStudy[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
}

export function useCaseStudies(options: UseCaseStudiesOptions = {}): UseCaseStudiesReturn {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchCaseStudies = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('case_studies')
        .select('*', { count: 'exact' });

      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,summary.ilike.%${options.search}%,client_name.ilike.%${options.search}%`);
      }
      if (options.status) {
        query = query.eq('status', options.status);
      }
      if (options.featured !== undefined) {
        query = query.eq('is_featured', options.featured);
      }
      if (options.industry) {
        query = query.eq('client_industry', options.industry);
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

      const mappedCaseStudies: CaseStudy[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        client_name: item.client_name,
        client_logo_url: item.client_logo,
        client_industry: item.client_industry,
        project_description: item.summary,
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
        featured_image_url: item.featured_image,
        gallery_images: item.gallery_images || [],
        technologies: item.technologies || [],
        team_members: item.team_members || [],
        services_provided: item.services || [],
        metrics: Array.isArray(item.success_metrics) ? item.success_metrics : [],
        project_duration: item.project_duration,
        project_url: item.project_url,
        repository_url: item.github_url,
        testimonial_id: item.testimonial_id,
        status: item.status,
        featured: item.is_featured,
        created_at: item.created_at,
        updated_at: item.updated_at,
        views: item.views,
      }));

      setCaseStudies(mappedCaseStudies);
      setTotal(count || 0);
    } catch (err: any) {
      console.error('Error fetching case studies:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, [
    options.search,
    options.status,
    options.featured,
    options.industry,
    options.sortBy,
    options.sortOrder,
    options.limit,
    options.offset,
  ]);

  return {
    caseStudies,
    loading,
    error,
    refetch: fetchCaseStudies,
    total,
  };
}
