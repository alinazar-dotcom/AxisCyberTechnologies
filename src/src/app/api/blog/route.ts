import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/blog
 * Fetch all published blog posts with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured') === 'true';

    // Build base query with relations
    let baseQuery = supabaseTyped
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, slug, color),
        tags:blog_post_tags(tag:blog_tags(id, name, slug))
      `, { count: 'exact' })
      .eq('status', 'published');

    // Apply category filter
    if (category) {
      baseQuery = baseQuery.eq('category_id', category);
    }

    // Apply featured filter
    if (featured) {
      baseQuery = baseQuery.eq('is_featured', true);
    }

    // Apply advanced query features (pagination, sorting, search)
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: false, // Already handling filters above
      search: true,
      allowedSortFields: [
        'title',
        'published_at',
        'views',
        'reading_time',
        'created_at'
      ],
      searchFields: [
        'title',
        'excerpt',
        'content'
      ],
      defaultSortField: 'published_at',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Blog fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch blog posts',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    // Return paginated response
    const { page, limit } = getPaginationParams(request);
    
    return NextResponse.json(
      paginatedResponse(data || [], count || 0, page, limit),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Blog API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}