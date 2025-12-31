import { NextRequest, NextResponse } from 'next/server';
import { supabaseTyped } from '@/lib/supabase-typed';
import { successResponse, errorResponse, notFoundError } from '@/lib/api-response';
import { trackView } from '@/lib/analytics';

/**
 * GET /api/blog/[slug]
 * Fetch single blog post by slug with view tracking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Fetch post with category and tags
    const { data, error } = await supabaseTyped
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(id, name, slug, color, icon),
        tags:blog_post_tags(tag:blog_tags(id, name, slug))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      const { response, status } = notFoundError('Blog post');
      return NextResponse.json(response, { status });
    }

    // Track view using analytics utility (handles increment internally)
    trackView('blog_post', (data as any).id).catch(err =>
      console.error('Failed to track view:', err)
    );

    return NextResponse.json(
      successResponse({ post: data }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Blog post API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}