'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    experience_level: 'entry' | 'mid' | 'senior' | 'lead';
    salary_range?: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    nice_to_have?: string[];
    benefits?: string[];
    is_active: boolean;
    is_remote: boolean;
    created_at: string;
    updated_at: string;
}

interface UseJobsOptions {
    search?: string;
    department?: string;
    isActive?: boolean;
    sortBy?: 'created_at' | 'title' | 'department';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}

interface UseJobsReturn {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useJobs(options: UseJobsOptions = {}): UseJobsReturn {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('jobs')
                .select('*', { count: 'exact' });

            if (options.search) {
                query = query.or(`title.ilike.%${options.search}%,department.ilike.%${options.search}%,description.ilike.%${options.search}%`);
            }
            if (options.department) {
                query = query.eq('department', options.department);
            }
            if (options.isActive !== undefined) {
                query = query.eq('is_active', options.isActive);
            }

            // Sorting
            const sortBy = options.sortBy || 'created_at';
            const sortOrder = options.sortOrder || 'desc';
            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            // Pagination
            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: supabaseError } = await query;

            if (supabaseError) throw supabaseError;

            setJobs(data || []);
        } catch (err: any) {
            console.error('Error fetching jobs:', err);
            setError(err.message || 'An error occurred while fetching jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [
        options.search,
        options.department,
        options.isActive,
        options.sortBy,
        options.sortOrder,
        options.limit,
    ]);

    return {
        jobs,
        loading,
        error,
        refetch: fetchJobs,
    };
}
