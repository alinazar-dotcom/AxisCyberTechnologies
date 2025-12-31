import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/offices
 * Fetch all active office locations (Lahore, Dubai, Los Angeles, London)
 */
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseTyped
      .from('office_locations')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Offices fetch error:', error);
      const { response, status } = errorResponse(
        'Failed to fetch office locations',
        'DATABASE_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({ offices: data, total: data.length }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Offices API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
