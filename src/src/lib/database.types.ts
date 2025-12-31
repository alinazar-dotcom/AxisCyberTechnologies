/**
 * TypeScript Database Types - Phase 2
 * Axis Cyber Technologies - Comprehensive CMS Types
 */

// =====================================================================
// BLOG TYPES
// =====================================================================

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  post_count: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  post_count: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: string;
  author_name: string;
  author_avatar?: string;
  author_role?: string;
  read_time?: number;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface BlogPostTag {
  post_id: string;
  tag_id: string;
}

// =====================================================================
// CASE STUDIES TYPES
// =====================================================================

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_logo?: string;
  client_industry?: string;
  project_type?: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  services?: string[];
  featured_image?: string;
  gallery_images?: string[];
  testimonial?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  project_duration?: string;
  team_size?: string;
  completion_date?: string;
  project_url?: string;
  github_url?: string;
  success_metrics?: Record<string, string>;
  views: number;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// SERVICES TYPES
// =====================================================================

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  short_description: string;
  full_description?: string;
  icon?: string;
  color?: string;
  features?: string[];
  technologies?: string[];
  use_cases?: string[];
  pricing_model?: string;
  starting_price?: string;
  process_steps?: ProcessStep[];
  case_study_ids?: string[];
  success_rate: number;
  projects_completed: number;
  happy_clients?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// TESTIMONIALS TYPES
// =====================================================================

export interface Testimonial {
  id: string;
  client_name: string;
  client_role?: string;
  client_company?: string;
  client_avatar?: string;
  client_location?: string;
  content: string;
  rating: number; // 1-5
  service_provided?: string;
  project_id?: string;
  video_url?: string;
  is_featured: boolean;
  is_verified: boolean;
  display_order: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

// =====================================================================
// TEAM TYPES
// =====================================================================

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  department?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  office_location?: string; // 'Lahore' | 'Dubai' | 'Los Angeles' | 'London'
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  skills?: string[];
  specializations?: string[];
  years_experience?: number;
  projects_completed: number;
  is_leadership: boolean;
  is_active: boolean;
  display_order: number;
  joined_date?: string;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// CAREERS TYPES
// =====================================================================

export interface CareerListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  office_locations?: string[];
  employment_type: string; // 'Full-time' | 'Part-time' | 'Contract'
  experience_level?: string; // 'Entry' | 'Mid' | 'Senior' | 'Lead'
  salary_range?: string;
  summary: string;
  responsibilities?: string[];
  requirements?: string[];
  preferred_qualifications?: string[];
  benefits?: string[];
  technologies?: string[];
  application_deadline?: string;
  positions_available: number;
  applications_count: number;
  is_remote: boolean;
  is_featured: boolean;
  status: 'open' | 'closed' | 'filled';
  posted_at: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  applicant_location?: string;
  resume_url?: string;
  cover_letter?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  years_experience?: number;
  applicant_current_role?: string;
  applicant_current_company?: string;
  expected_salary?: string;
  availability?: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn';
  notes?: string;
  applied_at: string;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// FAQ TYPES
// =====================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  service_id?: string;
  is_featured: boolean;
  display_order: number;
  views: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// MEDIA LIBRARY TYPES
// =====================================================================

export interface MediaItem {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_type?: string; // 'image' | 'video' | 'document' | 'audio'
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  alt_text?: string;
  caption?: string;
  tags?: string[];
  uploaded_by?: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// SETTINGS TYPES
// =====================================================================

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type: 'string' | 'number' | 'boolean' | 'json';
  category?: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// OFFICE LOCATIONS TYPES
// =====================================================================

export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  timezone?: string;
  operating_hours?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  map_url?: string;
  is_headquarters: boolean;
  is_active: boolean;
  team_size?: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// PHASE 1 TYPES (from original schema)
// =====================================================================

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  is_active: boolean;
  unsubscribed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services: string[];
  status: 'new' | 'contacted' | 'completed';
  submitted_at: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  status: 'pending' | 'scheduled' | 'completed';
  requested_at: string;
  scheduled_for?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: string;
  page_path: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  viewed_at: string;
  session_id?: string;
}

// =====================================================================
// ANALYTICS VIEW TYPES
// =====================================================================

export interface BlogAnalytics {
  total_posts: number;
  published_posts: number;
  draft_posts: number;
  featured_posts: number;
  total_views: number;
  total_likes: number;
  posts_this_month: number;
}

export interface CaseStudyAnalytics {
  total_case_studies: number;
  published: number;
  featured: number;
  total_views: number;
  industries_served: number;
}

export interface CareerAnalytics {
  total_listings: number;
  open_positions: number;
  total_openings: number;
  departments_hiring: number;
  pending_applications: number;
}

export interface NewsletterStats {
  total_subscribers: number;
  active_subscribers: number;
  new_this_month: number;
  new_this_week: number;
}

export interface ContactStats {
  total_submissions: number;
  pending: number;
  contacted: number;
  completed: number;
  this_week: number;
}

// =====================================================================
// COMBINED DATABASE TYPE
// =====================================================================

export interface Database {
  public: {
    Tables: {
      // Phase 2 Tables
      blog_categories: { Row: BlogCategory; Insert: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<BlogCategory, 'id'>> };
      blog_tags: { Row: BlogTag; Insert: Omit<BlogTag, 'id' | 'created_at'>; Update: Partial<Omit<BlogTag, 'id'>> };
      blog_posts: { Row: BlogPost; Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<BlogPost, 'id'>> };
      blog_post_tags: { Row: BlogPostTag; Insert: BlogPostTag; Update: never };
      case_studies: { Row: CaseStudy; Insert: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<CaseStudy, 'id'>> };
      services: { Row: Service; Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Service, 'id'>> };
      testimonials: { Row: Testimonial; Insert: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Testimonial, 'id'>> };
      team_members: { Row: TeamMember; Insert: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<TeamMember, 'id'>> };
      career_listings: { Row: CareerListing; Insert: Omit<CareerListing, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<CareerListing, 'id'>> };
      job_applications: { Row: JobApplication; Insert: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<JobApplication, 'id'>> };
      faqs: { Row: FAQ; Insert: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<FAQ, 'id'>> };
      media_library: { Row: MediaItem; Insert: Omit<MediaItem, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<MediaItem, 'id'>> };
      site_settings: { Row: SiteSetting; Insert: Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<SiteSetting, 'id'>> };
      office_locations: { Row: OfficeLocation; Insert: Omit<OfficeLocation, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<OfficeLocation, 'id'>> };

      // Phase 1 Tables
      newsletter_subscriptions: { Row: NewsletterSubscription; Insert: Omit<NewsletterSubscription, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<NewsletterSubscription, 'id'>> };
      contact_submissions: { Row: ContactSubmission; Insert: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<ContactSubmission, 'id'>> };
      consultation_requests: { Row: ConsultationRequest; Insert: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<ConsultationRequest, 'id'>> };
      page_views: { Row: PageView; Insert: Omit<PageView, 'id'>; Update: never };
    };
    Views: {
      blog_analytics: { Row: BlogAnalytics };
      case_studies_analytics: { Row: CaseStudyAnalytics };
      career_analytics: { Row: CareerAnalytics };
      newsletter_stats: { Row: NewsletterStats };
      contact_stats: { Row: ContactStats };
    };
  };
}

// =====================================================================
// UTILITY TYPES
// =====================================================================

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
export type Views<T extends keyof Database['public']['Views']> = Database['public']['Views'][T]['Row'];