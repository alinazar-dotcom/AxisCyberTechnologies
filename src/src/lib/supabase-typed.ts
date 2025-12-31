/**
 * Typed Supabase Client
 * Axis Cyber Technologies - Phase 2
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Typed Supabase client with full database type inference
 */
export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Helper type exports for easy access
 */
export type { Database, Tables, Insertable, Updatable, Views } from './database.types';

// Re-export common types for convenience
export type {
  BlogCategory,
  BlogTag,
  BlogPost,
  BlogPostTag,
  CaseStudy,
  Service,
  Testimonial,
  TeamMember,
  CareerListing,
  JobApplication,
  FAQ,
  MediaItem,
  SiteSetting,
  OfficeLocation,
  NewsletterSubscription,
  ContactSubmission,
  ConsultationRequest,
  PageView,
} from './database.types';
