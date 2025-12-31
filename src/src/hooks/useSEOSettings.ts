'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SEOSetting {
    id: string;
    page_type: string;
    page_title: string;
    meta_description: string;
    meta_keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_card?: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    canonical_url?: string;
    robots?: string;
    created_at: string;
    updated_at: string;
}

interface UseSEOSettingsOptions {
    search?: string;
    pageType?: string;
    sortBy?: 'page_type' | 'updated_at';
    sortOrder?: 'asc' | 'desc';
}

interface UseSEOSettingsReturn {
    settings: SEOSetting[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useSEOSettings(options: UseSEOSettingsOptions = {}): UseSEOSettingsReturn {
    const [settings, setSettings] = useState<SEOSetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('seo_settings')
                .select('*')
                .order(options.sortBy || 'page_type', { ascending: options.sortOrder !== 'desc' });

            if (options.search) {
                query = query.or(`page_type.ilike.%${options.search}%,page_title.ilike.%${options.search}%,meta_description.ilike.%${options.search}%`);
            }

            if (options.pageType) {
                query = query.eq('page_type', options.pageType);
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) {
                setError(supabaseError.message);
            } else {
                setSettings(data || []);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching SEO settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [
        options.search,
        options.pageType,
        options.sortBy,
        options.sortOrder,
    ]);

    return {
        settings,
        loading,
        error,
        refetch: fetchSettings,
    };
}

