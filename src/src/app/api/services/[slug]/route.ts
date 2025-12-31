import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, notFoundError, errorResponse } from '@/lib/api-response';
import { trackView } from '@/lib/analytics';

/**
 * GET /api/services/[slug]
 * Fetch single service by slug with view tracking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabaseTyped
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      const { response, status } = notFoundError('Service');
      return NextResponse.json(response, { status });
    }

    // Track view asynchronously (don't wait for it)
    trackView('service', (data as any).id).catch(err =>
      console.error('Failed to track view:', err)
    );

    return NextResponse.json(
      successResponse({ service: data }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Service API error:', error);
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
 * PUT /api/services/[id]
 * Update a service
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug: id } = params; // The client sends ID in the URL
    const body = await request.json();

    const { data, error } = await (supabaseTyped as any)
      .from('services')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Service update error:', error);
      const { response, status } = errorResponse(
        'Failed to update service',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(successResponse(data, 'Service updated successfully'), { status: 200 });
  } catch (error: any) {
    console.error('Service update API error:', error);
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
 * DELETE /api/services/[id]
 * Delete a service
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug: id } = params; // The client sends ID in the URL

    const { error } = await (supabaseTyped as any)
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Service deletion error:', error);
      const { response, status } = errorResponse(
        'Failed to delete service',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(successResponse(null, 'Service deleted successfully'), { status: 200 });
  } catch (error: any) {
    console.error('Service deletion API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}