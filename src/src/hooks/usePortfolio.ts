import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PortfolioItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    featured_image_url?: string;
    gallery_images: string[];
    category: string;
    tags: string[];
    client_name?: string;
    project_url?: string;
    repository_url?: string;
    technologies: string[];
    completion_date?: string;
    is_featured: boolean;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
    views: number;
}

interface UsePortfolioOptions {
    category?: string;
    featured?: boolean;
    active?: boolean;
    search?: string;
    sortBy?: 'created_at' | 'title' | 'display_order' | 'views';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}

export function usePortfolio(options: UsePortfolioOptions = {}) {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPortfolio = async () => {
        setLoading(true);
        setError(null);

        try {
            let query = supabase
                .from('case_studies')
                .select('*');

            // Filters
            if (options.category) {
                query = query.eq('project_type', options.category);
            }
            if (options.featured !== undefined) {
                query = query.eq('is_featured', options.featured);
            }
            if (options.active !== undefined) {
                query = query.eq('status', options.active ? 'published' : 'draft');
            }
            if (options.search) {
                query = query.or(`title.ilike.%${options.search}%,summary.ilike.%${options.search}%,client_name.ilike.%${options.search}%`);
            }

            // Sorting
            const sortBy = options.sortBy || 'display_order';
            const sortOrder = options.sortOrder || 'asc';
            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            // Limit
            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) throw supabaseError;

            // Map case_studies to PortfolioItem
            const mappedItems: PortfolioItem[] = (data || []).map(item => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                description: item.summary,
                featured_image_url: item.featured_image,
                gallery_images: item.gallery_images || [],
                category: item.project_type,
                tags: item.services || [], // Using services as tags
                client_name: item.client_name,
                project_url: item.project_url,
                repository_url: item.github_url,
                technologies: item.technologies || [],
                completion_date: item.completion_date,
                is_featured: item.is_featured,
                is_active: item.status === 'published',
                display_order: item.display_order,
                created_at: item.created_at,
                updated_at: item.updated_at,
                views: item.views || 0,
            }));

            setItems(mappedItems);
        } catch (err: any) {
            console.error('Error fetching portfolio:', err);
            setError(err.message || 'Failed to fetch portfolio items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, [
        options.category,
        options.featured,
        options.active,
        options.search,
        options.sortBy,
        options.sortOrder,
        options.limit
    ]);

    return {
        items,
        loading,
        error,
        refetch: fetchPortfolio
    };
}
