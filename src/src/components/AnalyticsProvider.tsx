'use client';

import { usePageTracking } from '@/hooks/useAnalytics';

/**
 * Client-side analytics wrapper component
 * Tracks page views automatically using Next.js navigation
 */
export function AnalyticsProvider() {
  usePageTracking();
  return null;
}
