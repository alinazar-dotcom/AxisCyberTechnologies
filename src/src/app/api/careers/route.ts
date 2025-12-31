import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/careers
 * Fetch all open career listings with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const location = searchParams.get('location');
    const employmentType = searchParams.get('employment_type');
    const remote = searchParams.get('remote') === 'true';

    let baseQuery = supabaseTyped
      .from('career_listings')
      .select('*', { count: 'exact' })
      .eq('status', 'open');

    // Apply department filter
    if (department) {
      baseQuery = baseQuery.eq('department', department);
    }

    // Apply location filter
    if (location) {
      baseQuery = baseQuery.eq('location', location);
    }

    // Apply employment type filter
    if (employmentType) {
      baseQuery = baseQuery.eq('employment_type', employmentType);
    }

    // Apply remote filter
    if (remote) {
      baseQuery = baseQuery.eq('is_remote', true);
    }

    // Apply advanced query features
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: false, // Already handling filters above
      search: true,
      allowedSortFields: [
        'title',
        'posted_at',
        'is_featured',
        'salary_min',
        'salary_max',
        'created_at'
      ],
      searchFields: [
        'title',
        'description',
        'responsibilities',
        'qualifications'
      ],
      defaultSortField: 'posted_at',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Careers fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch career listings',
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
    console.error('Careers API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}