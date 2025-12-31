import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validate, commonSchemas } from '@/lib/api-validator';

/**
 * POST /api/auth/login
 * Admin login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validate(body, commonSchemas.login);
    if (!validation.isValid) {
      const { response, status } = validationError(validation.errors);
      return NextResponse.json(response, { status });
    }

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      const { response, status } = errorResponse(
        'Invalid email or password',
        'INVALID_CREDENTIALS',
        null,
        401
      );
      return NextResponse.json(response, { status });
    }

    return NextResponse.json(
      successResponse({
        user: {
          id: data.user?.id,
          email: data.user?.email,
        },
        message: 'Login successful',
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login API error:', error);
    const { response, status } = errorResponse(
      'An unexpected error occurred',
      'SERVER_ERROR',
      error.message,
      500
    );
    return NextResponse.json(response, { status });
  }
}
