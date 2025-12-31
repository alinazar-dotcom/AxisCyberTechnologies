import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

/**
 * Analytics Hook for Axis Cyber Technologies
 * Tracks page views and user navigation
 */

interface PageViewData {
  page_url: string;
  page_title?: string;
  page_type?: string;
  referrer?: string;
  user_agent?: string;
  session_id?: string;
}

// Generate a simple session ID (stored in sessionStorage)
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('axis_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('axis_session_id', sessionId);
  }

  return sessionId;
};

// Track a page view
export const trackPageView = async (url: string, title?: string, type?: string) => {
  if (typeof window === 'undefined') return;

  try {
    const pageViewData: PageViewData = {
      page_url: url,
      page_title: title || document.title,
      page_type: type || 'other',
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      session_id: getSessionId(),
    };

    const { error } = await supabase
      .from('page_views')
      .insert([pageViewData]);

    if (error) {
      console.error('Analytics tracking error:', error);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

/**
 * Hook to automatically track page views
 * Usage: Add to layout.tsx or individual pages
 * 
 * Example:
 * ```tsx
 * import { usePageTracking } from '@/hooks/useAnalytics';
 * 
 * export default function Page() {
 *   usePageTracking();
 *   return <div>...</div>
 * }
 * ```
 */
export const usePageTracking = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);
};

/**
 * Track custom events
 * Usage for button clicks, form submissions, etc.
 * 
 * Example:
 * ```tsx
 * import { trackEvent } from '@/hooks/useAnalytics';
 * 
 * const handleClick = () => {
 *   trackEvent('button_click', { button_name: 'CTA Hero' });
 * }
 * ```
 */
export const trackEvent = async (eventType: string, eventData?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  try {
    const { error } = await supabase
      .from('engagement_events')
      .insert([{
        event_type: eventType,
        event_data: eventData || {},
        page_url: window.location.pathname,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
      }]);

    if (error) {
      console.error('Event tracking error:', error);
    }
  } catch (error) {
    console.error('Event tracking failed:', error);
  }
};

/**
 * Get analytics data (for admin dashboard)
 * 
 * Example:
 * ```tsx
 * const stats = await getAnalyticsStats();
 * console.log(stats);
 * ```
 */
export const getAnalyticsStats = async () => {
  try {
    // Get total page views
    const { count: totalViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // Get views from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: recentViews } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    // Get most viewed pages
    const { data: pageViews } = await supabase
      .from('page_views')
      .select('page_url');

    // Count page views
    const pageCounts: Record<string, number> = {};
    pageViews?.forEach(view => {
      pageCounts[view.page_url] = (pageCounts[view.page_url] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    return {
      totalViews: totalViews || 0,
      recentViews: recentViews || 0,
      topPages,
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return {
      totalViews: 0,
      recentViews: 0,
      topPages: [],
    };
  }
};
