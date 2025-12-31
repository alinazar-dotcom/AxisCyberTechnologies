import { supabase } from '@/lib/supabase';

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Track search event
export async function trackSearch(query: string, resultsCount: number, clickedResultId?: string, clickedResultType?: string) {
  try {
    const { error } = await supabase
      .from('search_analytics')
      .insert([{
        query,
        results_count: resultsCount,
        clicked_result_id: clickedResultId,
        clicked_result_type: clickedResultType,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track search:', error);
  }
}

// Track page view
export async function trackPageView(pageUrl: string, pageTitle: string, pageType?: string) {
  try {
    const sessionId = getSessionId();
    const referrer = typeof document !== 'undefined' ? document.referrer : undefined;

    const { error } = await supabase
      .from('page_views')
      .insert([{
        page_url: pageUrl,
        page_title: pageTitle,
        page_type: pageType || 'other',
        referrer,
        session_id: sessionId,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track form submission
export async function trackFormSubmission(formType: string, formData?: any, status: string = 'submitted') {
  try {
    const { error } = await supabase
      .from('form_analytics')
      .insert([{
        form_type: formType,
        form_data: formData,
        status,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track form submission:', error);
  }
}

// Track engagement event (clicks, shares, etc.)
export async function trackEngagement(eventType: string, eventData?: any, pageUrl?: string) {
  try {
    const sessionId = getSessionId();

    const { error } = await supabase
      .from('engagement_events')
      .insert([{
        event_type: eventType,
        event_data: eventData || {},
        page_url: pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
        session_id: sessionId,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track engagement:', error);
  }
}

// Hook for page view tracking (use in components)
export function usePageViewTracking(pageTitle: string, pageType?: string) {
  if (typeof window !== 'undefined') {
    const pageUrl = window.location.pathname;

    // Track on mount
    setTimeout(() => {
      trackPageView(pageUrl, pageTitle, pageType);
    }, 1000); // Delay to ensure page is loaded
  }
}

