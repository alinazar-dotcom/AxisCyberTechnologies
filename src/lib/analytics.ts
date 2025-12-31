import { supabase } from './supabase';

// ============================================
// TYPES
// ============================================

export interface ViewStats {
  totalViews: number;
  uniqueViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
}

export interface DashboardStats {
  services: {
    total: number;
    active: number;
    featured: number;
  };
  testimonials: {
    total: number;
    published: number;
    averageRating: number;
  };
  caseStudies: {
    total: number;
    published: number;
    featured: number;
  };
  teamMembers: {
    total: number;
    active: number;
    leadership: number;
  };
  blogPosts: {
    total: number;
    published: number;
    draft: number;
  };
  contactSubmissions: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
}

export interface PopularContent {
  id: string;
  title: string;
  slug: string;
  views: number;
  type: 'service' | 'blog' | 'case_study';
}

// ============================================
// VIEW TRACKING
// ============================================

/**
 * Track page view
 */
export async function trackView(
  entityType: 'service' | 'blog_post' | 'case_study' | 'team_member',
  entityId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const tableName = entityType === 'blog_post' ? 'blog_posts' :
      entityType === 'case_study' ? 'case_studies' :
        entityType === 'team_member' ? 'team_members' :
          'services';

    // Increment views counter using RPC for atomicity
    const { error } = await supabase.rpc('increment_views', {
      table_name: tableName,
      row_id: entityId
    });

    if (error) {
      // Fallback to manual increment if RPC fails
      const { data: current } = await supabase
        .from(tableName)
        .select('views')
        .eq('id', entityId)
        .single();

      const { error: updateError } = await supabase
        .from(tableName)
        .update({ views: (current?.views || 0) + 1 })
        .eq('id', entityId);

      if (updateError) throw updateError;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to track view',
    };
  }
}

/**
 * Track helpful FAQ
 */
export async function trackFAQHelpful(
  faqId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.rpc('increment_faq_helpful', {
      row_id: faqId
    });

    if (error) {
      // Fallback to manual increment
      const { data: current } = await supabase
        .from('faqs')
        .select('helpful_count')
        .eq('id', faqId)
        .single();

      const { error: updateError } = await supabase
        .from('faqs')
        .update({ helpful_count: (current?.helpful_count || 0) + 1 })
        .eq('id', faqId);

      if (updateError) throw updateError;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to track helpful',
    };
  }
}

// ============================================
// STATISTICS
// ============================================

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<{
  success: boolean;
  data?: DashboardStats;
  error?: string;
}> {
  try {
    // Services stats
    const { count: totalServices } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    const { count: activeServices } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    const { count: featuredServices } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true);

    // Testimonials stats
    const { count: totalTestimonials } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true });

    const { count: publishedTestimonials } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { data: avgRatingData } = await supabase
      .from('testimonials')
      .select('rating');

    const averageRating = avgRatingData && avgRatingData.length > 0
      ? avgRatingData.reduce((sum, t) => sum + (t.rating || 0), 0) / avgRatingData.length
      : 0;

    // Case studies stats
    const { count: totalCaseStudies } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true });

    const { count: publishedCaseStudies } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { count: featuredCaseStudies } = await supabase
      .from('case_studies')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true);

    // Team members stats
    const { count: totalTeamMembers } = await supabase
      .from('team_members')
      .select('*', { count: 'exact', head: true });

    const { count: activeTeamMembers } = await supabase
      .from('team_members')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    const { count: leadershipTeamMembers } = await supabase
      .from('team_members')
      .select('*', { count: 'exact', head: true })
      .eq('is_leadership', true);

    // Blog posts stats
    const { count: totalBlogPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });

    const { count: publishedBlogPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    const { count: draftBlogPosts } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');

    // Contact submissions stats
    const { count: totalContacts } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: contactsThisMonth } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: contactsThisWeek } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    const stats: DashboardStats = {
      services: {
        total: totalServices || 0,
        active: activeServices || 0,
        featured: featuredServices || 0,
      },
      testimonials: {
        total: totalTestimonials || 0,
        published: publishedTestimonials || 0,
        averageRating: Math.round(averageRating * 10) / 10,
      },
      caseStudies: {
        total: totalCaseStudies || 0,
        published: publishedCaseStudies || 0,
        featured: featuredCaseStudies || 0,
      },
      teamMembers: {
        total: totalTeamMembers || 0,
        active: activeTeamMembers || 0,
        leadership: leadershipTeamMembers || 0,
      },
      blogPosts: {
        total: totalBlogPosts || 0,
        published: publishedBlogPosts || 0,
        draft: draftBlogPosts || 0,
      },
      contactSubmissions: {
        total: totalContacts || 0,
        thisMonth: contactsThisMonth || 0,
        thisWeek: contactsThisWeek || 0,
      },
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get dashboard stats',
    };
  }
}

/**
 * Get popular content (most viewed)
 */
export async function getPopularContent(
  limit: number = 10
): Promise<{
  success: boolean;
  data?: PopularContent[];
  error?: string;
}> {
  try {
    const popularContent: PopularContent[] = [];

    // Get popular services
    const { data: services } = await supabase
      .from('services')
      .select('id, name, slug, views')
      .order('views', { ascending: false })
      .limit(limit);

    if (services) {
      popularContent.push(...services.map(s => ({
        id: s.id,
        title: s.name,
        slug: s.slug,
        views: s.views || 0,
        type: 'service' as const,
      })));
    }

    // Get popular blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('id, title, slug, views')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(limit);

    if (blogPosts) {
      popularContent.push(...blogPosts.map(b => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        views: b.views || 0,
        type: 'blog' as const,
      })));
    }

    // Get popular case studies
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('id, title, slug, views')
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(limit);

    if (caseStudies) {
      popularContent.push(...caseStudies.map(c => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        views: c.views || 0,
        type: 'case_study' as const,
      })));
    }

    // Sort by views and limit
    const sorted = popularContent
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);

    return {
      success: true,
      data: sorted,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get popular content',
    };
  }
}

/**
 * Get service statistics
 */
export async function getServiceStats(
  serviceId: string
): Promise<{
  success: boolean;
  data?: {
    views: number;
    relatedCaseStudies: number;
    relatedTestimonials: number;
    relatedFAQs: number;
  };
  error?: string;
}> {
  try {
    // Get service views
    const { data: service } = await supabase
      .from('services')
      .select('views')
      .eq('id', serviceId)
      .single();

    // Get related case studies count (using services array)
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('id')
      .contains('services', [serviceId]);

    // Get related testimonials count
    const { count: testimonialsCount } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('service_provided', serviceId);

    // Get related FAQs count
    const { count: faqsCount } = await supabase
      .from('faqs')
      .select('*', { count: 'exact', head: true })
      .eq('service_id', serviceId);

    return {
      success: true,
      data: {
        views: service?.views || 0,
        relatedCaseStudies: caseStudies?.length || 0,
        relatedTestimonials: testimonialsCount || 0,
        relatedFAQs: faqsCount || 0,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get service stats',
    };
  }
}

/**
 * Get time-series data for charts
 */
export async function getTimeSeriesData(
  entityType: 'contact_submissions' | 'blog_posts' | 'job_applications',
  days: number = 30
): Promise<{
  success: boolean;
  data?: Array<{ date: string; count: number }>;
  error?: string;
}> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from(entityType)
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Group by date
    const grouped = (data || []).reduce((acc: any, item: any) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort
    const timeSeriesData = Object.entries(grouped)
      .map(([date, count]) => ({ date, count: count as number }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      success: true,
      data: timeSeriesData,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to get time series data',
    };
  }
}

// ============================================
// EXPORT DATA
// ============================================

/**
 * Export data to CSV
 */
export function exportToCSV(data: any[], filename: string): string {
  if (data.length === 0) return '';

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value || '');
        return stringValue.includes(',') || stringValue.includes('"')
          ? `"${stringValue.replace(/"/g, '""')}"`
          : stringValue;
      }).join(',')
    ),
  ].join('\n');

  return csvContent;
}

/**
 * Export data to JSON
 */
export function exportToJSON(data: any[], filename: string): string {
  return JSON.stringify(data, null, 2);
}

// ============================================
// EXPORT
// ============================================

export default {
  // Tracking
  trackView,
  trackFAQHelpful,

  // Statistics
  getDashboardStats,
  getPopularContent,
  getServiceStats,
  getTimeSeriesData,

  // Export
  exportToCSV,
  exportToJSON,
};
