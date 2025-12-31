import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/auth/session
 * Get current session
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      const { response, status } = errorResponse(
        'Failed to get session',
        'SESSION_ERROR',
        error.message,
        500
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({
        session: session ? {
          user: {
            id: session.user.id,
            email: session.user.email,
          },
          expires_at: session.expires_at,
        } : null,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Session API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
