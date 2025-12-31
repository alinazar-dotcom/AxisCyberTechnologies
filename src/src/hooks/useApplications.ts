import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Application {
    id: string;
    job_id: string;
    full_name: string;
    email: string;
    phone?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    resume_url?: string;
    cover_letter?: string;
    years_of_experience?: number;
    current_location?: string;
    status: 'new' | 'reviewed' | 'interview' | 'rejected' | 'hired';
    created_at: string;
    updated_at: string;
    job?: {
        title: string;
        department: string;
    };
}

interface UseApplicationsOptions {
    status?: string;
    search?: string;
    limit?: number;
}

export function useApplications(options: UseApplicationsOptions = {}) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('job_applications')
                .select(`
                    *,
                    job:jobs(title, department)
                `);

            if (options.status && options.status !== 'all') {
                query = query.eq('status', options.status);
            }

            if (options.search) {
                query = query.or(`full_name.ilike.%${options.search}%,email.ilike.%${options.search}%`);
            }

            query = query.order('created_at', { ascending: false });

            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) throw supabaseError;

            setApplications(data || []);
        } catch (err: any) {
            console.error('Error fetching applications:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [options.status, options.search, options.limit]);

    return {
        applications,
        loading,
        error,
        refetch: fetchApplications
    };
}
