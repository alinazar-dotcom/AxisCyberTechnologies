import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, notFoundError, errorResponse } from '@/lib/api-response';
import { trackView } from '@/lib/analytics';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabaseTyped
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const { response, status } = notFoundError('Case study');
      return NextResponse.json(response, { status });
    }

    trackView('case_study', (data as any).id).catch(err =>
      console.error('Failed to track view:', err)
    );

    return NextResponse.json(
      successResponse({ caseStudy: data }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Case study API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    const updateData: any = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.client_name !== undefined) updateData.client_name = body.client_name;
    if (body.client_logo_url !== undefined) updateData.client_logo = body.client_logo_url || null;
    if (body.client_industry !== undefined) updateData.client_industry = body.client_industry;
    if (body.project_description !== undefined) updateData.summary = body.project_description;
    if (body.challenge !== undefined) updateData.challenge = body.challenge;
    if (body.solution !== undefined) updateData.solution = body.solution;
    if (body.results !== undefined) updateData.results = body.results;
    if (body.featured_image_url !== undefined) updateData.featured_image = body.featured_image_url || null;
    if (body.gallery_images !== undefined) updateData.gallery_images = body.gallery_images;
    if (body.technologies !== undefined) updateData.technologies = body.technologies;
    if (body.team_size !== undefined) updateData.team_size = body.team_size;
    if (body.services_provided !== undefined) updateData.services = body.services_provided;
    if (body.metrics !== undefined) updateData.success_metrics = body.metrics;
    if (body.project_duration !== undefined) updateData.project_duration = body.project_duration;
    if (body.project_url !== undefined) updateData.project_url = body.project_url || null;
    if (body.repository_url !== undefined) updateData.github_url = body.repository_url || null;
    if (body.testimonial_id !== undefined) updateData.testimonial_id = body.testimonial_id || null;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.featured !== undefined) updateData.is_featured = body.featured;

    let query = supabaseTyped
      .from('case_studies')
      .update(updateData)
      .select()
      .single();

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    if (isUUID) {
      query = query.eq('id', slug);
    } else {
      query = query.eq('slug', slug);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Case study update error:', error);
      const { response, status } = errorResponse(
        'Failed to update case study',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    if (!data) {
      const { response, status } = notFoundError('Case study');
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ caseStudy: data }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Case study update API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    let query = supabaseTyped
      .from('case_studies')
      .delete()
      .select()
      .single();

    if (isUUID) {
      query = query.eq('id', slug);
    } else {
      query = query.eq('slug', slug);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Case study deletion error:', error);
      const { response, status } = errorResponse(
        'Failed to delete case study',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    if (!data) {
      const { response, status } = notFoundError('Case study');
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ message: 'Case study deleted successfully' }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Case study deletion API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
