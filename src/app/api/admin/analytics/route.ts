// ============================================
// ADMIN ANALYTICS API - PHASE 4
// ============================================
// Dashboard statistics, popular content, reports
// ============================================

import { NextRequest } from 'next/server';
import { validateAuth } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-utils';
import {
  getDashboardStats,
  getPopularContent,
  getTimeSeriesData,
  exportToCSV,
  exportToJSON,
} from '@/lib/analytics';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// GET ANALYTICS
// ============================================

export async function GET(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'dashboard';

    // Dashboard stats
    if (type === 'dashboard') {
      const result = await getDashboardStats();
      
      if (!result.success) {
        return errorResponse(result.error || 'Failed to get dashboard stats', 500);
      }

      return successResponse(result.data);
    }

    // Popular content
    if (type === 'popular') {
      const limit = parseInt(searchParams.get('limit') || '10');
      const result = await getPopularContent(limit);
      
      if (!result.success) {
        return errorResponse(result.error || 'Failed to get popular content', 500);
      }

      return successResponse(result.data);
    }

    // Time series data
    if (type === 'timeseries') {
      const entityType = searchParams.get('entity') as 'contact_submissions' | 'blog_posts' | 'job_applications';
      const days = parseInt(searchParams.get('days') || '30');

      if (!entityType) {
        return errorResponse('Entity type is required for time series data');
      }

      const result = await getTimeSeriesData(entityType, days);
      
      if (!result.success) {
        return errorResponse(result.error || 'Failed to get time series data', 500);
      }

      return successResponse(result.data);
    }

    // Service breakdown
    if (type === 'services-breakdown') {
      const { data: services, error } = await supabase
        .from('services')
        .select('name, projects_completed, success_rate, views')
        .order('projects_completed', { ascending: false });

      if (error) {
        return errorResponse(error.message, 500);
      }

      return successResponse(services);
    }

    // Contact submissions by status
    if (type === 'contacts-by-status') {
      const { data: contacts, error } = await supabase
        .from('contact_submissions')
        .select('status');

      if (error) {
        return errorResponse(error.message, 500);
      }

      // Group by status
      const grouped = contacts.reduce((acc: any, contact: any) => {
        const status = contact.status || 'new';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      return successResponse(grouped);
    }

    // Blog posts by category
    if (type === 'blog-by-category') {
      const { data: categories, error } = await supabase
        .from('blog_categories')
        .select(`
          name,
          post_count
        `)
        .order('post_count', { ascending: false });

      if (error) {
        return errorResponse(error.message, 500);
      }

      return successResponse(categories);
    }

    // Team distribution
    if (type === 'team-distribution') {
      const { data: teamMembers, error } = await supabase
        .from('team_members')
        .select('department, office_location, is_leadership')
        .eq('is_active', true);

      if (error) {
        return errorResponse(error.message, 500);
      }

      const byDepartment = teamMembers.reduce((acc: any, member: any) => {
        const dept = member.department || 'Other';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {});

      const byOffice = teamMembers.reduce((acc: any, member: any) => {
        const office = member.office_location || 'Unknown';
        acc[office] = (acc[office] || 0) + 1;
        return acc;
      }, {});

      const leadership = teamMembers.filter((m: any) => m.is_leadership).length;
      const staff = teamMembers.length - leadership;

      return successResponse({
        byDepartment,
        byOffice,
        byRole: { leadership, staff },
      });
    }

    return errorResponse('Invalid analytics type');

  } catch (error: any) {
    console.error('Analytics error:', error);
    return errorResponse(error.message || 'Failed to get analytics', 500);
  }
}

// ============================================
// EXPORT DATA
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Validate admin authentication
    const authResult = await validateAuth(request);
    if (!authResult.valid || authResult.user?.role !== 'admin') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { table, format = 'csv', filters = {} } = body;

    if (!table) {
      return errorResponse('Table name is required');
    }

    // Validate table name (whitelist)
    const allowedTables = [
      'services',
      'testimonials',
      'case_studies',
      'team_members',
      'blog_posts',
      'contact_submissions',
      'job_applications',
      'faqs',
    ];

    if (!allowedTables.includes(table)) {
      return errorResponse('Invalid table name');
    }

    // Fetch data
    let query = supabase.from(table).select('*');

    // Apply filters if provided
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query;

    if (error) {
      return errorResponse(error.message, 500);
    }

    if (!data || data.length === 0) {
      return errorResponse('No data to export');
    }

    // Export data
    const filename = `${table}-export-${Date.now()}`;
    let content: string;
    let contentType: string;

    if (format === 'csv') {
      content = exportToCSV(data, filename);
      contentType = 'text/csv';
    } else if (format === 'json') {
      content = exportToJSON(data, filename);
      contentType = 'application/json';
    } else {
      return errorResponse('Invalid export format. Use "csv" or "json"');
    }

    // Return file
    return new Response(content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}.${format}"`,
      },
    });

  } catch (error: any) {
    console.error('Export error:', error);
    return errorResponse(error.message || 'Failed to export data', 500);
  }
}
