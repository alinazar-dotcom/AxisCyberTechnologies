import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch media files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');

    let query = supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.ilike('original_filename', `%${search}%`);
    }

    if (type === 'image') {
      query = query.ilike('file_type', 'image/%');
    } else if (type === 'document') {
      query = query.not('file_type', 'ilike', 'image/%');
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
