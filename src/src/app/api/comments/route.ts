import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch comments for a blog post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blogPostId = searchParams.get('blog_post_id');
    const isApproved = searchParams.get('is_approved');
    const includeReplies = searchParams.get('include_replies') !== 'false';

    let query = supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by blog post
    if (blogPostId) {
      query = query.eq('blog_post_id', blogPostId);
    }

    // Filter by approval status
    if (isApproved !== null) {
      query = query.eq('is_approved', isApproved === 'true');
    }

    // Only show top-level comments (no replies) if requested
    if (!includeReplies) {
      query = query.is('parent_comment_id', null);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // If including replies, organize into threaded structure
    let organized = data;
    if (includeReplies && data) {
      // Separate top-level comments and replies
      const topLevel = data.filter(c => !c.parent_comment_id);
      const replies = data.filter(c => c.parent_comment_id);

      // Attach replies to their parents
      organized = topLevel.map(comment => ({
        ...comment,
        replies: replies.filter(r => r.parent_comment_id === comment.id)
      }));
    }

    return NextResponse.json({
      success: true,
      data: organized,
      count: data?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blog_post_id, author_name, author_email, content, parent_comment_id } = body;

    // Validation
    if (!blog_post_id || !author_name || !author_email || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if blog post exists
    const { data: blogPost, error: blogError } = await supabase
      .from('blog_posts')
      .select('id, title')
      .eq('id', blog_post_id)
      .single();

    if (blogError || !blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Create comment (pending approval)
    const { data, error } = await supabase
      .from('comments')
      .insert({
        blog_post_id,
        author_name,
        author_email,
        content,
        parent_comment_id: parent_comment_id || null,
        is_approved: false, // Requires moderation
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    // TODO: Send email notification to admin
    // This would use your existing email system

    return NextResponse.json({
      success: true,
      data,
      message: 'Comment submitted successfully. It will appear after approval.',
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update a comment (approve/reject, edit)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_approved, content } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (typeof is_approved === 'boolean') {
      updates.is_approved = is_approved;
    }
    if (content) {
      updates.content = content;
    }

    const { data, error } = await supabase
      .from('comments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Comment updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a comment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
