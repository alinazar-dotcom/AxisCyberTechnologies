import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped, Insertable } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/services
 * Fetch all active services with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    // Base query
    let baseQuery = supabaseTyped
      .from('services')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Apply featured filter if requested
    if (featured) {
      baseQuery = baseQuery.eq('is_featured', true);
    }

    // Apply advanced query features (pagination, sorting, filtering, search)
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: true,
      search: true,
      allowedSortFields: [
        'name',
        'display_order',
        'projects_completed',
        'success_rate',
        'views',
        'created_at'
      ],
      allowedFilterFields: [
        'is_featured',
        'success_rate'
      ],
      searchFields: [
        'name',
        'short_description',
        'full_description'
      ],
      defaultSortField: 'display_order',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Services fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch services',
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
    console.error('Services API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}

/**
 * POST /api/services
 * Create a new service
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.slug) {
      const { response, status } = errorResponse(
        'Name and slug are required',
        'VALIDATION_ERROR',
        null,
        400
      );
      return NextResponse.json(response, { status });
    }

    // Insert new service
    const { data, error } = await (supabaseTyped as any)
      .from('services')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Service creation error:', error);
      const { response, status } = errorResponse(
        'Failed to create service',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(successResponse(data, 'Service created successfully'), { status: 201 });
  } catch (error: any) {
    console.error('Service creation API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}