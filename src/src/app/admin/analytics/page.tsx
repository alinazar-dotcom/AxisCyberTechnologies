'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  TrendingUp,
  Search,
  Eye,
  FileText,
  MousePointerClick,
  BarChart3,
  Calendar,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react';

interface AnalyticsOverview {
  total_searches: number;
  total_page_views: number;
  total_form_submissions: number;
  total_engagement_events: number;
}

interface PopularSearch {
  query: string;
  search_count: number;
  avg_results_count: number;
  click_through_rate: number;
}

interface TopPage {
  url: string;
  title: string;
  type: string;
  views: number;
}

interface FormStats {
  form_type: string;
  total: number;
  submitted: number;
  converted: number;
  spam: number;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState(30); // days
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [popularSearches, setPopularSearches] = useState<PopularSearch[]>([]);
  const [noResultSearches, setNoResultSearches] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [viewsByType, setViewsByType] = useState<Record<string, number>>({});
  const [formStats, setFormStats] = useState<FormStats[]>([]);
  const [formTrend, setFormTrend] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch overview
      const overviewRes = await fetch(`/api/analytics?type=overview&days=${timeRange}`);
      const overviewData = await overviewRes.json();
      if (overviewData.success) {
        setOverview(overviewData.data);
      }

      // Fetch search analytics
      const searchRes = await fetch(`/api/analytics?type=search&days=${timeRange}&limit=10`);
      const searchData = await searchRes.json();
      if (searchData.success) {
        setPopularSearches(searchData.data.popular_searches || []);
        setNoResultSearches(searchData.data.no_result_searches || []);
      }

      // Fetch page view analytics
      const pageViewRes = await fetch(`/api/analytics?type=pageviews&days=${timeRange}&limit=10`);
      const pageViewData = await pageViewRes.json();
      if (pageViewData.success) {
        setTopPages(pageViewData.data.top_pages || []);
        setViewsByType(pageViewData.data.views_by_type || {});
      }

      // Fetch form analytics
      const formRes = await fetch(`/api/analytics?type=forms&days=${timeRange}`);
      const formData = await formRes.json();
      if (formData.success) {
        setFormStats(formData.data.by_form_type || []);
        setFormTrend(formData.data.trend || []);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const timeRanges = [
    { value: 7, label: 'Last 7 Days' },
    { value: 30, label: 'Last 30 Days' },
    { value: 90, label: 'Last 90 Days' },
  ];

  if (loading && !overview) {
    return (
      <AdminLayout title="Analytics & Insights">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-[var(--neon-purple)] animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics & Insights">
      {/* Time Range Selector */}
      <div className="mb-8 flex items-center gap-4">
        <Calendar className="w-5 h-5 text-white/60" />
        <div className="flex gap-2">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === range.value
                ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white'
                : 'bg-black/40 border-2 border-white/10 text-white/60 hover:bg-black/60'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-purple)]/5 border-2 border-[var(--neon-purple)]/30 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Search className="w-8 h-8 text-[var(--neon-purple)]" />
            <div className="flex items-center gap-1 text-[var(--neon-green)] text-sm font-bold">
              <ArrowUp className="w-4 h-4" />
              <span>100%</span>
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mb-1">
            {overview?.total_searches.toLocaleString() || 0}
          </h3>
          <p className="text-white/60 font-bold text-sm">Total Searches</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-cyan)]/5 border-2 border-[var(--neon-cyan)]/30 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-[var(--neon-cyan)]" />
            <div className="flex items-center gap-1 text-[var(--neon-green)] text-sm font-bold">
              <ArrowUp className="w-4 h-4" />
              <span>100%</span>
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mb-1">
            {overview?.total_page_views.toLocaleString() || 0}
          </h3>
          <p className="text-white/60 font-bold text-sm">Page Views</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-pink)]/10 to-[var(--neon-pink)]/5 border-2 border-[var(--neon-pink)]/30 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-[var(--neon-pink)]" />
            <div className="flex items-center gap-1 text-[var(--neon-green)] text-sm font-bold">
              <ArrowUp className="w-4 h-4" />
              <span>100%</span>
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mb-1">
            {overview?.total_form_submissions.toLocaleString() || 0}
          </h3>
          <p className="text-white/60 font-bold text-sm">Form Submissions</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-[var(--neon-orange)]/10 to-[var(--neon-orange)]/5 border-2 border-[var(--neon-orange)]/30 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <MousePointerClick className="w-8 h-8 text-[var(--neon-orange)]" />
            <div className="flex items-center gap-1 text-[var(--neon-green)] text-sm font-bold">
              <ArrowUp className="w-4 h-4" />
              <span>100%</span>
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mb-1">
            {overview?.total_engagement_events.toLocaleString() || 0}
          </h3>
          <p className="text-white/60 font-bold text-sm">Engagement Events</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Popular Searches */}
        <div className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[var(--neon-purple)]" />
            <h2 className="text-xl font-black text-white">Popular Searches</h2>
          </div>

          {popularSearches.length === 0 ? (
            <p className="text-white/40 text-center py-8">No search data yet</p>
          ) : (
            <div className="space-y-3">
              {popularSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center text-white font-black text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-bold">{search.query}</p>
                      <p className="text-xs text-white/50">
                        {search.search_count} searches • {Math.round(search.click_through_rate)}% CTR
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">
                      ~{Math.round(search.avg_results_count)} results
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Pages */}
        <div className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[var(--neon-cyan)]" />
            <h2 className="text-xl font-black text-white">Top Pages</h2>
          </div>

          {topPages.length === 0 ? (
            <p className="text-white/40 text-center py-8">No page view data yet</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate">
                      {page.title || page.url}
                    </p>
                    <p className="text-xs text-white/50 truncate">{page.url}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="px-3 py-1 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 rounded-lg text-xs text-[var(--neon-cyan)] font-bold">
                      {page.type || 'page'}
                    </span>
                    <span className="text-white font-black">{page.views}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* No Result Searches */}
        <div className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-[var(--neon-orange)]" />
            <h2 className="text-xl font-black text-white">Searches with No Results</h2>
            <span className="ml-auto px-3 py-1 bg-[var(--neon-orange)]/10 border border-[var(--neon-orange)]/30 rounded-lg text-xs text-[var(--neon-orange)] font-bold">
              Content Gaps
            </span>
          </div>

          {noResultSearches.length === 0 ? (
            <p className="text-white/40 text-center py-8">All searches returned results! 🎉</p>
          ) : (
            <div className="space-y-2">
              {noResultSearches.slice(0, 8).map((search, index) => (
                <div
                  key={index}
                  className="p-3 bg-black/40 border border-white/10 rounded-xl"
                >
                  <p className="text-white font-bold text-sm">{search.query}</p>
                  <p className="text-xs text-white/40">
                    {new Date(search.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Conversion Stats */}
        <div className="p-6 bg-black/20 border-2 border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[var(--neon-pink)]" />
            <h2 className="text-xl font-black text-white">Form Performance</h2>
          </div>

          {formStats.length === 0 ? (
            <p className="text-white/40 text-center py-8">No form submission data yet</p>
          ) : (
            <div className="space-y-4">
              {formStats.map((form, index) => (
                <div
                  key={index}
                  className="p-4 bg-black/40 border border-white/10 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-black capitalize">
                      {form.form_type.replace('_', ' ')}
                    </h3>
                    <span className="text-[var(--neon-pink)] font-black text-lg">
                      {form.total}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-white/50">Submitted: </span>
                      <span className="text-white/80 font-bold">{form.submitted}</span>
                    </div>
                    <div>
                      <span className="text-white/50">Converted: </span>
                      <span className="text-[var(--neon-green)] font-bold">{form.converted}</span>
                    </div>
                    <div>
                      <span className="text-white/50">Spam: </span>
                      <span className="text-red-400 font-bold">{form.spam}</span>
                    </div>
                  </div>
                  {form.total > 0 && (
                    <div className="mt-3">
                      <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)]"
                          style={{ width: `${(form.converted / form.total) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-white/50 mt-1 text-center">
                        {((form.converted / form.total) * 100).toFixed(1)}% conversion rate
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Views by Content Type */}
      {Object.keys(viewsByType).length > 0 && (
        <div className="mt-8 p-6 bg-black/20 border-2 border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-[var(--neon-cyan)]" />
            <h2 className="text-xl font-black text-white">Views by Content Type</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(viewsByType).map(([type, count]) => (
              <div
                key={type}
                className="p-4 bg-black/40 border border-white/10 rounded-xl text-center"
              >
                <p className="text-2xl font-black text-white mb-1">{count}</p>
                <p className="text-sm text-white/60 capitalize">{type}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
