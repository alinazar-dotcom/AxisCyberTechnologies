import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/case-studies
 * Fetch all published case studies with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const industry = searchParams.get('industry');
    const service = searchParams.get('service');

    let baseQuery = supabaseTyped
      .from('case_studies')
      .select('*', { count: 'exact' })
      .eq('status', 'published');

    // Apply featured filter
    if (featured) {
      baseQuery = baseQuery.eq('is_featured', true);
    }

    // Apply industry filter
    if (industry) {
      baseQuery = baseQuery.eq('client_industry', industry);
    }

    // Apply service filter (JSONB array contains)
    if (service) {
      baseQuery = baseQuery.contains('services', [service]);
    }

    // Apply advanced query features
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: true,
      search: true,
      allowedSortFields: [
        'title',
        'display_order',
        'completion_date',
        'views',
        'created_at'
      ],
      allowedFilterFields: [
        'is_featured',
        'client_industry'
      ],
      searchFields: [
        'title',
        'client_name',
        'summary',
        'challenge',
        'solution'
      ],
      defaultSortField: 'display_order',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Case studies fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch case studies',
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
    console.error('Case studies API error:', error);
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
 * POST /api/case-studies
 * Create a new case study
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'title',
      'slug',
      'client_name',
      'client_industry',
      'project_description',
      'challenge',
      'solution',
      'results',
      'project_duration'
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

    // Prepare data for insertion
    const caseStudyData = {
      title: body.title,
      slug: body.slug,
      client_name: body.client_name,
      client_logo: body.client_logo_url || null,
      client_industry: body.client_industry,
      summary: body.project_description,
      challenge: body.challenge,
      solution: body.solution,
      results: body.results,
      featured_image: body.featured_image_url || null,
      gallery_images: body.gallery_images || [],
      technologies: body.technologies || [],
      team_members: body.team_members || [],
      services: body.services_provided || [],
      success_metrics: body.metrics || [],
      project_duration: body.project_duration,
      project_url: body.project_url || null,
      github_url: body.repository_url || null,
      testimonial_id: body.testimonial_id || null,
      status: body.status || 'draft',
      is_featured: body.featured || false,
    };

    const { data, error } = await supabaseTyped
      .from('case_studies')
      .insert([caseStudyData])
      .select()
      .single();

    if (error) {
      console.error('Case study creation error:', error);
      const { response, status } = errorResponse(
        'Failed to create case study',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ caseStudy: data }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Case study creation API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}