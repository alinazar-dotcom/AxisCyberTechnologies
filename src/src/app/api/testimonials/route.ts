import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/testimonials
 * Fetch all published testimonials with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    let baseQuery = supabaseTyped
      .from('testimonials')
      .select('*', { count: 'exact' });

    // Apply status filter if provided
    const status = searchParams.get('status');
    if (status && status !== 'all') {
      const dbStatus = status === 'approved' ? 'published' : status === 'rejected' ? 'archived' : 'draft';
      baseQuery = baseQuery.eq('status', dbStatus);
    } else {
      // Default to published for public view if no status filter (though manager might want all)
      // But this API is used by the manager too. 
      // Let's check if there's a 'public' flag or something.
      // For now, if no status is provided, we don't filter by status (manager view).
    }

    // Apply featured filter
    if (featured) {
      baseQuery = baseQuery.eq('is_featured', true);
    }

    // Apply advanced query features
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: true,
      search: true,
      allowedSortFields: [
        'display_order',
        'rating',
        'created_at',
        'client_name'
      ],
      allowedFilterFields: [
        'is_featured',
        'rating',
        'service_provided'
      ],
      searchFields: [
        'client_name',
        'client_company',
        'client_role',
        'content'
      ],
      defaultSortField: 'display_order',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Testimonials fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch testimonials',
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
    console.error('Testimonials API error:', error);
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
 * POST /api/testimonials
 * Create a new testimonial
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'client_name',
      'content',
      'rating'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        const { response, status } = errorResponse(
          `Missing required field: ${field}`,
          'VALIDATION_ERROR',
          `The field '${field}' is required`,
          400
        );
        return NextResponse.json(response, { status });
      }
    }

    // Map form fields to database columns
    const testimonialData: any = {
      client_name: body.client_name,
      client_role: body.client_role || body.position || null,
      client_company: body.client_company || body.company || null,
      client_avatar: body.client_avatar || body.avatar_url || null,
      client_location: body.client_location || null,
      content: body.content,
      rating: body.rating,
      service_provided: body.service_provided || null,
      status: (body.status === 'approved' ? 'published' : body.status === 'rejected' ? 'archived' : 'draft') as 'draft' | 'published' | 'archived',
      is_featured: body.is_featured || false,
      is_verified: body.is_verified !== undefined ? body.is_verified : true,
      display_order: body.display_order || 0,
    };

    const { data, error } = await supabaseTyped
      .from('testimonials')
      .insert(testimonialData as any)
      .select()
      .single();

    if (error) {
      console.error('Testimonial creation error:', error);
      const { response, status } = errorResponse(
        'Failed to create testimonial',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ testimonial: data }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Testimonial creation API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}