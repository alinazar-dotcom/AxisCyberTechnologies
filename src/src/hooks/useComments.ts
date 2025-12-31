'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Comment {
    id: string;
    blog_post_id: string;
    author_name: string;
    author_email: string;
    author_website?: string;
    content: string;
    status: 'pending' | 'approved' | 'spam' | 'trash';
    ip_address?: string;
    user_agent?: string;
    created_at: string;
    updated_at: string;
    blog_posts?: {
        title: string;
        slug: string;
    };
    parent_comment_id?: string;
    parent?: {
        author_name: string;
        author_email: string;
    };
}

interface UseCommentsOptions {
    search?: string;
    status?: 'pending' | 'approved' | 'spam' | 'trash';
    blogPostId?: string;
    sortBy?: 'created_at' | 'author_name';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}

interface UseCommentsReturn {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useComments(options: UseCommentsOptions = {}): UseCommentsReturn {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('comments')
                .select(`
                    *,
                    blog_posts (
                        title,
                        slug
                    ),
                    parent:parent_comment_id (
                        author_name,
                        author_email
                    )
                `);

            if (options.status) {
                query = query.eq('status', options.status);
            }

            if (options.blogPostId) {
                query = query.eq('blog_post_id', options.blogPostId);
            }

            if (options.search) {
                query = query.or(`author_name.ilike.%${options.search}%,content.ilike.%${options.search}%`);
            }

            if (options.sortBy) {
                query = query.order(options.sortBy, { ascending: options.sortOrder === 'asc' });
            } else {
                query = query.order('created_at', { ascending: false });
            }

            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: supabaseError } = await query;

            console.log('useComments fetch:', { data, error: supabaseError });

            if (supabaseError) throw supabaseError;

            const processedData = (data || []).map((c: any) => ({
                ...c,
                status: c.status || (c.is_approved ? 'approved' : 'pending')
            }));

            setComments(processedData);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching comments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [
        options.search,
        options.status,
        options.blogPostId,
        options.sortBy,
        options.sortOrder,
        options.limit,
    ]);

    return {
        comments,
        loading,
        error,
        refetch: fetchComments,
    };
}
