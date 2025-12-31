import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateAuth } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const auth = await validateAuth(request);
    if (!auth.valid) {
      const { response, status } = errorResponse('Unauthorized', 'UNAUTHORIZED', 'Authentication required', 401);
      return NextResponse.json(response, { status });
    }

    const { postId, tagIds } = await request.json();
    if (!postId) {
      const { response, status } = errorResponse('Post ID is required', 'VALIDATION_ERROR', 'postId missing', 400);
      return NextResponse.json(response, { status });
    }

    const { error: deleteError } = await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', postId);

    if (deleteError) {
      console.error('Error clearing blog tags:', deleteError);
      const { response, status } = errorResponse(
        'Failed to clear existing tags',
        'DATABASE_ERROR',
        deleteError.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    if (Array.isArray(tagIds) && tagIds.length > 0) {
      const tagRelations = tagIds.map((tagId: string) => ({
        post_id: postId,
        tag_id: tagId,
      }));

      const { error: insertError } = await supabase
        .from('blog_post_tags')
        .insert(tagRelations);

      if (insertError) {
        console.error('Error inserting blog tags:', insertError);
        const { response, status } = errorResponse(
          'Failed to assign tags',
          'DATABASE_ERROR',
          insertError.message,
          500
        );
        return NextResponse.json(response, { status });
      }
    }

    return NextResponse.json(
      successResponse({ synced: true }, 'Tags updated successfully'),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Blog tags API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
