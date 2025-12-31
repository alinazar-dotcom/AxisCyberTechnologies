import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, notFoundError, errorResponse } from '@/lib/api-response';

/**
 * GET /api/careers/[slug]
 * Fetch single career listing by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { data, error } = await supabaseTyped
      .from('career_listings')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'open')
      .single();

    if (error || !data) {
      const { response, status } = notFoundError('Career listing');
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ career: data }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Career API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
