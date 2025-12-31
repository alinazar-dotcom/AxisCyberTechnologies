import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface SiteSettings {
    id: string;
    // General
    site_name: string;
    site_tagline: string;
    site_description: string;
    site_url: string;
    site_logo_url?: string;
    favicon_url?: string;

    // Contact Information
    contact_email: string;
    support_email?: string;
    sales_email?: string;
    phone_primary?: string;
    phone_secondary?: string;

    // Social Media
    facebook_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
    instagram_url?: string;
    github_url?: string;
    youtube_url?: string;

    // Business Information
    company_name: string;
    company_address?: string;
    company_city?: string;
    company_state?: string;
    company_zip?: string;
    company_country?: string;
    tax_id?: string;

    // Office Locations
    office_lahore?: string;
    office_dubai?: string;
    office_los_angeles?: string;
    office_london?: string;

    // Analytics & Tracking
    google_analytics_id?: string;
    facebook_pixel_id?: string;
    google_tag_manager_id?: string;

    // Features
    maintenance_mode: boolean;
    allow_registration: boolean;
    enable_blog: boolean;
    enable_portfolio: boolean;
    enable_comments: boolean;

    // SEO Defaults
    default_og_image?: string;
    default_twitter_card?: string;

    // Newsletter
    mailchimp_api_key?: string;
    mailchimp_list_id?: string;

    created_at: string;
    updated_at: string;
}

interface UseSiteSettingsReturn {
    settings: SiteSettings | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    updateSettings: (data: Partial<SiteSettings>) => Promise<{ success: boolean; error?: string }>;
}

export function useSiteSettings(): UseSiteSettingsReturn {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (fetchError) {
                if (fetchError.code === 'PGRST116') {
                    // No settings found, return null instead of error
                    setSettings(null);
                } else {
                    throw fetchError;
                }
            } else {
                setSettings(data);
            }
        } catch (err: any) {
            console.error('Error fetching site settings:', err);
            setError(err.message || 'An error occurred while fetching site settings');
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (data: Partial<SiteSettings>) => {
        try {
            const { error: updateError } = await supabase
                .from('site_settings')
                .upsert({
                    ...data,
                    id: settings?.id || undefined,
                    updated_at: new Date().toISOString()
                });

            if (updateError) throw updateError;

            await fetchSettings();
            return { success: true };
        } catch (err: any) {
            console.error('Error updating site settings:', err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        refetch: fetchSettings,
        updateSettings,
    };
}
