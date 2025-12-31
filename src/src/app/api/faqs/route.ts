import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/faqs
 * Fetch all FAQs with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const serviceId = searchParams.get('service_id');
    const featured = searchParams.get('featured') === 'true';

    let baseQuery = supabaseTyped
      .from('faqs')
      .select('*', { count: 'exact' });

    // Apply category filter
    if (category) {
      baseQuery = baseQuery.eq('category', category);
    }

    // Apply service filter
    if (serviceId) {
      baseQuery = baseQuery.eq('service_id', serviceId);
    }

    // Apply featured filter
    if (featured) {
      baseQuery = baseQuery.eq('is_featured', true);
    }

    // Apply advanced query features
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: false, // Already handling filters above
      search: true,
      allowedSortFields: [
        'display_order',
        'helpful_count',
        'created_at',
        'updated_at'
      ],
      searchFields: [
        'question',
        'answer',
        'keywords'
      ],
      defaultSortField: 'display_order',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('FAQs fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch FAQs',
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
    console.error('FAQs API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}