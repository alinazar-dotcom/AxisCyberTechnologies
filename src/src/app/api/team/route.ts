import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';
import {
  buildAdvancedQuery,
  getPaginationParams,
  paginatedResponse,
} from '@/lib/api-utils';

/**
 * GET /api/team
 * Fetch all active team members with advanced query features
 * Supports: pagination, sorting, filtering, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const office = searchParams.get('office');
    const leadership = searchParams.get('leadership') === 'true';
    const department = searchParams.get('department');

    let baseQuery = supabaseTyped
      .from('team_members')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Apply office filter
    if (office) {
      baseQuery = baseQuery.eq('office_location', office);
    }

    // Apply leadership filter
    if (leadership) {
      baseQuery = baseQuery.eq('is_leadership', true);
    }

    // Apply department filter
    if (department) {
      baseQuery = baseQuery.eq('department', department);
    }

    // Apply advanced query features
    const query = await buildAdvancedQuery(request, baseQuery, {
      pagination: true,
      sorting: true,
      filtering: false, // Already handling filters above
      search: true,
      allowedSortFields: [
        'display_order',
        'name',
        'years_experience',
        'created_at'
      ],
      searchFields: [
        'name',
        'role',
        'bio',
        'specialties'
      ],
      defaultSortField: 'display_order',
    });

    const { data, error, count } = await query;

    if (error) {
      console.error('Team fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch team members',
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
    console.error('Team API error:', error);
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
 * POST /api/team
 * Create a new team member
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Map frontend fields to DB columns
    const dbData = {
      name: body.full_name,
      slug: body.slug,
      role: body.role,
      department: body.department,
      bio: body.bio,
      avatar: body.photo_url,
      email: body.email,
      phone: body.phone,
      location: body.location,
      skills: body.skills,
      specializations: body.expertise_areas,
      linkedin_url: body.social_links?.linkedin,
      github_url: body.social_links?.github,
      twitter_url: body.social_links?.twitter,
      years_experience: body.years_experience,
      joined_date: body.joined_date || new Date().toISOString(),
      is_active: body.status === 'active',
      is_leadership: body.featured,
      display_order: body.display_order || 0,
    };

    const { data, error } = await supabaseTyped
      .from('team_members')
      .insert([dbData] as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Team API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}