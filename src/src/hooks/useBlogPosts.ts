import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_name: string;
  author_avatar?: string;
  author_role?: string;
  status: 'draft' | 'published' | 'archived';
  category_id?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  tags?: {
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  published_at?: string;
  created_at: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  is_featured?: boolean;
}

interface UseBlogPostsOptions {
  category?: string;
  tag?: string;
  status?: 'draft' | 'published' | 'archived';
  search?: string;
  sortBy?: 'created_at' | 'published_at' | 'title' | 'views';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(id, name, slug, color),
          tags:blog_post_tags(tag:blog_tags(id, name, slug))
        `, { count: 'exact' });

      // Filters
      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%,excerpt.ilike.%${options.search}%`);
      }
      if (options.status) {
        query = query.eq('status', options.status);
      }
      if (options.category) {
        query = query.eq('category_id', options.category);
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

      setPosts(data || []);
      setTotalCount(count || 0);
    } catch (err: any) {
      console.error('Error fetching blog posts:', err);
      setError(err.message || 'Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [
    options.category,
    options.tag,
    options.status,
    options.search,
    options.sortBy,
    options.sortOrder,
    options.limit,
    options.offset
  ]);

  return {
    posts,
    loading,
    error,
    totalCount,
    refetch: fetchPosts
  };
}
