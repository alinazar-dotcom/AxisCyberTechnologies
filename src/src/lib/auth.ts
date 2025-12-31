/**
 * Authentication Utilities for Admin Dashboard
 * Axis Cyber Technologies - Backend Infrastructure
 */

import { createBrowserClient, createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * Get authenticated user from session
 */
export async function getAuthUser() {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthUser();
  return !!user;
}

/**
 * Check if user is admin
 * For now, any authenticated user is considered admin
 * In production, you'd check against a specific role or email whitelist
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getAuthUser();

  if (!user) return false;

  // Option 1: Check against whitelist of admin emails
  const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];
  if (ADMIN_EMAILS.length > 0) {
    return ADMIN_EMAILS.includes(user.email || '');
  }

  // Option 2: All authenticated users are admins (development mode)
  return true;
}

/**
 * Require authentication middleware
 */
export async function requireAuth() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error('UNAUTHORIZED');
  }
}

/**
 * Require admin middleware
 */
export async function requireAdmin() {
  const admin = await isAdmin();

  if (!admin) {
    throw new Error('UNAUTHORIZED');
  }
}

/**
 * Get client-side Supabase client for auth
 */
export function getSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Validate authentication for API routes
 */
export async function validateAuth(request: any) {
  try {
    const user = await getAuthUser();

    return {
      valid: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        role: 'admin' // For now, all authenticated users are admins
      } : null
    };
  } catch (error) {
    return {
      valid: false,
      user: null
    };
  }
}
