import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'search', 'pageviews', 'forms', 'content', 'overview'
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '10');

    switch (type) {
      case 'search':
        return await getSearchAnalytics(days, limit);
      
      case 'pageviews':
        return await getPageViewAnalytics(days, limit);
      
      case 'forms':
        return await getFormAnalytics(days);
      
      case 'content':
        return await getContentPerformance(days, limit);
      
      case 'overview':
        return await getOverviewAnalytics(days);
      
      case 'popular-searches':
        return await getPopularSearches(days, limit);
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid analytics type' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, data } = body;

    // Get user info from headers
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';

    switch (event_type) {
      case 'search':
        return await trackSearch(data, userAgent, ipAddress);
      
      case 'pageview':
        return await trackPageView(data, userAgent, ipAddress);
      
      case 'form_submission':
        return await trackFormSubmission(data, userAgent, ipAddress);
      
      case 'engagement':
        return await trackEngagement(data, userAgent, ipAddress);
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid event type' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper functions

async function getSearchAnalytics(days: number, limit: number) {
  const { data, error } = await supabase.rpc('get_popular_searches', {
    days,
    result_limit: limit,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  // Get searches with no results
  const { data: noResults } = await supabase
    .from('search_analytics')
    .select('query, created_at')
    .eq('results_count', 0)
    .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({
    success: true,
    data: {
      popular_searches: data,
      no_result_searches: noResults,
    },
  });
}

async function getPageViewAnalytics(days: number, limit: number) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  // Top pages by views
  const { data: topPages, error } = await supabase
    .from('page_views')
    .select('page_url, page_title, page_type')
    .gte('created_at', startDate);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  // Aggregate by page
  const pageStats = topPages?.reduce((acc: any, view) => {
    const key = view.page_url;
    if (!acc[key]) {
      acc[key] = {
        url: view.page_url,
        title: view.page_title,
        type: view.page_type,
        views: 0,
      };
    }
    acc[key].views++;
    return acc;
  }, {});

  const sortedPages = Object.values(pageStats || {})
    .sort((a: any, b: any) => b.views - a.views)
    .slice(0, limit);

  // Views by type
  const viewsByType = topPages?.reduce((acc: any, view) => {
    const type = view.page_type || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    success: true,
    data: {
      top_pages: sortedPages,
      total_views: topPages?.length || 0,
      views_by_type: viewsByType,
    },
  });
}

async function getFormAnalytics(days: number) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('form_analytics')
    .select('form_type, status, created_at')
    .gte('created_at', startDate);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  // Aggregate by form type
  const formStats = data?.reduce((acc: any, submission) => {
    const type = submission.form_type;
    if (!acc[type]) {
      acc[type] = {
        form_type: type,
        total: 0,
        submitted: 0,
        converted: 0,
        spam: 0,
      };
    }
    acc[type].total++;
    acc[type][submission.status as keyof typeof acc[typeof type]]++;
    return acc;
  }, {});

  // Group by date for trend
  const submissionsByDate = data?.reduce((acc: any, submission) => {
    const date = new Date(submission.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trend = Object.entries(submissionsByDate || {})
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    success: true,
    data: {
      by_form_type: Object.values(formStats || {}),
      trend,
      total_submissions: data?.length || 0,
    },
  });
}

async function getContentPerformance(days: number, limit: number) {
  const { data, error } = await supabase.rpc('get_top_content', {
    content_type_param: null,
    days,
    result_limit: limit,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: data || [],
  });
}

async function getOverviewAnalytics(days: number) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  // Get total counts
  const [searchCount, pageViewCount, formCount, engagementCount] = await Promise.all([
    supabase.from('search_analytics').select('id', { count: 'exact', head: true }).gte('created_at', startDate),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', startDate),
    supabase.from('form_analytics').select('id', { count: 'exact', head: true }).gte('created_at', startDate),
    supabase.from('engagement_events').select('id', { count: 'exact', head: true }).gte('created_at', startDate),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      total_searches: searchCount.count || 0,
      total_page_views: pageViewCount.count || 0,
      total_form_submissions: formCount.count || 0,
      total_engagement_events: engagementCount.count || 0,
    },
  });
}

async function getPopularSearches(days: number, limit: number) {
  const { data, error } = await supabase.rpc('get_popular_searches', {
    days,
    result_limit: limit,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: data || [],
  });
}

// Tracking functions

async function trackSearch(data: any, userAgent: string, ipAddress: string) {
  const { query, results_count, clicked_result_id, clicked_result_type } = data;

  const { error } = await supabase
    .from('search_analytics')
    .insert({
      query,
      results_count: results_count || 0,
      clicked_result_id,
      clicked_result_type,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Search tracked',
  });
}

async function trackPageView(data: any, userAgent: string, ipAddress: string) {
  const { page_url, page_title, page_type, referrer, session_id } = data;

  const { error } = await supabase
    .from('page_views')
    .insert({
      page_url,
      page_title,
      page_type,
      referrer,
      session_id,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Page view tracked',
  });
}

async function trackFormSubmission(data: any, userAgent: string, ipAddress: string) {
  const { form_type, form_data, status } = data;

  const { error } = await supabase
    .from('form_analytics')
    .insert({
      form_type,
      form_data,
      status: status || 'submitted',
      user_agent: userAgent,
      ip_address: ipAddress,
    });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Form submission tracked',
  });
}

async function trackEngagement(data: any, userAgent: string, ipAddress: string) {
  const { event_type, event_data, page_url, session_id } = data;

  const { error } = await supabase
    .from('engagement_events')
    .insert({
      event_type,
      event_data,
      page_url,
      session_id,
      user_agent: userAgent,
    });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Engagement event tracked',
  });
}
