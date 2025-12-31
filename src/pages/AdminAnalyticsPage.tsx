'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    RefreshCw,
    ArrowLeft,
    Globe,
    Users,
    Clock,
    Zap,
    Target,
    Activity
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    const [timeRange, setTimeRange] = useState(30);
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [popularSearches, setPopularSearches] = useState<PopularSearch[]>([]);
    const [noResultSearches, setNoResultSearches] = useState<any[]>([]);
    const [topPages, setTopPages] = useState<TopPage[]>([]);
    const [viewsByType, setViewsByType] = useState<Record<string, number>>({});
    const [formStats, setFormStats] = useState<FormStats[]>([]);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            }
        };
        checkSession();
    }, [supabase, navigate]);
    const toast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - timeRange);
            const startDateISO = startDate.toISOString();

            // 1. Fetch Overview Stats
            const [searchesCount, pageViewsCount, formsCount, engagementCount] = await Promise.all([
                supabase.from('search_analytics').select('*', { count: 'exact', head: true }).gte('created_at', startDateISO),
                supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', startDateISO),
                supabase.from('form_analytics').select('*', { count: 'exact', head: true }).gte('created_at', startDateISO),
                supabase.from('engagement_events').select('*', { count: 'exact', head: true }).gte('created_at', startDateISO),
            ]);

            setOverview({
                total_searches: searchesCount.count || 0,
                total_page_views: pageViewsCount.count || 0,
                total_form_submissions: formsCount.count || 0,
                total_engagement_events: engagementCount.count || 0,
            });

            // 2. Fetch Search Analytics
            const { data: searchData } = await supabase
                .from('search_analytics')
                .select('*')
                .gte('created_at', startDateISO);

            if (searchData) {
                // Group by query
                const searchGroups: Record<string, any> = {};
                searchData.forEach(item => {
                    if (!searchGroups[item.query]) {
                        searchGroups[item.query] = {
                            query: item.query,
                            search_count: 0,
                            total_results: 0,
                            clicks: 0
                        };
                    }
                    searchGroups[item.query].search_count++;
                    searchGroups[item.query].total_results += item.results_count || 0;
                    if (item.clicked_result_id) searchGroups[item.query].clicks++;
                });

                const popular = Object.values(searchGroups)
                    .map((g: any) => ({
                        query: g.query,
                        search_count: g.search_count,
                        avg_results_count: g.total_results / g.search_count,
                        click_through_rate: (g.clicks / g.search_count) * 100
                    }))
                    .sort((a, b) => b.search_count - a.search_count)
                    .slice(0, 10);

                setPopularSearches(popular);

                const noResults = Object.values(searchGroups)
                    .filter((g: any) => g.total_results === 0)
                    .map((g: any) => ({
                        query: g.query,
                        count: g.search_count
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10);

                setNoResultSearches(noResults);
            }

            // 3. Fetch Page View Analytics
            const { data: pageViewData } = await supabase
                .from('page_views')
                .select('*')
                .gte('created_at', startDateISO);

            if (pageViewData) {
                const pageGroups: Record<string, any> = {};
                const typeGroups: Record<string, number> = {};

                pageViewData.forEach(item => {
                    // Top pages
                    if (!pageGroups[item.page_url]) {
                        pageGroups[item.page_url] = {
                            url: item.page_url,
                            title: item.page_title || item.page_url,
                            type: item.page_type || 'other',
                            views: 0
                        };
                    }
                    pageGroups[item.page_url].views++;

                    // Views by type
                    const type = item.page_type || 'other';
                    typeGroups[type] = (typeGroups[type] || 0) + 1;
                });

                const top = Object.values(pageGroups)
                    .sort((a: any, b: any) => b.views - a.views)
                    .slice(0, 10) as TopPage[];

                setTopPages(top);
                setViewsByType(typeGroups);
            }

            // 4. Fetch Form Analytics
            const { data: formData } = await supabase
                .from('form_analytics')
                .select('*')
                .gte('created_at', startDateISO);

            if (formData) {
                const formGroups: Record<string, FormStats> = {};
                formData.forEach(item => {
                    if (!formGroups[item.form_type]) {
                        formGroups[item.form_type] = {
                            form_type: item.form_type,
                            total: 0,
                            submitted: 0,
                            converted: 0,
                            spam: 0
                        };
                    }
                    formGroups[item.form_type].total++;
                    if (item.status === 'submitted') formGroups[item.form_type].submitted++;
                    if (item.status === 'converted') formGroups[item.form_type].converted++;
                    if (item.status === 'spam') formGroups[item.form_type].spam++;
                });
                setFormStats(Object.values(formGroups));
            }

        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            toast('Failed to load analytics data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const timeRanges = [
        { value: 7, label: 'Last 7 Days' },
        { value: 30, label: 'Last 30 Days' },
        { value: 90, label: 'Last 90 Days' },
    ];

    return (
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #DD00FF 0%, transparent 70%)',
                        transform: 'translate(-40%, -40%)'
                    }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
                        transform: 'translate(40%, 40%)'
                    }}
                ></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
                        <div className={`px-6 py-3 rounded-xl backdrop-blur-xl border-2 ${toastType === 'success'
                            ? 'bg-[#00FF9D]/10 border-[#00FF9D]/50 text-[#00FF9D]'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`}>
                            {toastMessage}
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Link to="/admin/overview">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </Link>
                                <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase">
                                    Analytics Dashboard
                                </h2>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Analytics & Insights
                            </h1>
                            <p className="text-white/60">
                                Track performance, engagement, and user behavior
                            </p>
                        </div>
                        <button
                            onClick={() => fetchAnalytics()}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden md:inline">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-3 mb-8">
                    <Calendar className="w-5 h-5 text-white/60" />
                    <div className="flex flex-wrap gap-2">
                        {timeRanges.map(range => (
                            <button
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === range.value
                                    ? 'bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white shadow-lg shadow-[#00FFFF]/20'
                                    : 'bg-white/5 border border-white/20 text-white/60 hover:bg-white/10'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && !overview && (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading analytics data...</p>
                    </div>
                )}

                {/* Overview Stats */}
                {overview && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/30 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#DD00FF]/40"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#DD00FF]/40"></div>
                                    <div className="flex items-center justify-between mb-4">
                                        <Search className="w-8 h-8 text-[#DD00FF]" />
                                        <div className="flex items-center gap-1 text-[#00FF9D] text-sm font-bold">
                                            <ArrowUp className="w-4 h-4" />
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {overview.total_searches.toLocaleString()}
                                    </h3>
                                    <p className="text-white/60 font-bold text-sm">Total Searches</p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00FFFF]/40"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00FFFF]/40"></div>
                                    <div className="flex items-center justify-between mb-4">
                                        <Eye className="w-8 h-8 text-[#00FFFF]" />
                                        <div className="flex items-center gap-1 text-[#00FF9D] text-sm font-bold">
                                            <ArrowUp className="w-4 h-4" />
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {overview.total_page_views.toLocaleString()}
                                    </h3>
                                    <p className="text-white/60 font-bold text-sm">Page Views</p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF0099]/30 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF0099]/40"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF0099]/40"></div>
                                    <div className="flex items-center justify-between mb-4">
                                        <FileText className="w-8 h-8 text-[#FF0099]" />
                                        <div className="flex items-center gap-1 text-[#00FF9D] text-sm font-bold">
                                            <ArrowUp className="w-4 h-4" />
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {overview.total_form_submissions.toLocaleString()}
                                    </h3>
                                    <p className="text-white/60 font-bold text-sm">Form Submissions</p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#FF7A00]/20 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF7A00]/30 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#FF7A00]/40"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#FF7A00]/40"></div>
                                    <div className="flex items-center justify-between mb-4">
                                        <MousePointerClick className="w-8 h-8 text-[#FF7A00]" />
                                        <div className="flex items-center gap-1 text-[#00FF9D] text-sm font-bold">
                                            <ArrowUp className="w-4 h-4" />
                                            <span>100%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-1">
                                        {overview.total_engagement_events.toLocaleString()}
                                    </h3>
                                    <p className="text-white/60 font-bold text-sm">Engagement Events</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-8">
                            {/* Popular Searches */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#DD00FF] to-[#00FFFF] rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Popular Searches</h2>
                                    </div>

                                    {popularSearches.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Search className="w-12 h-12 text-white/20 mx-auto mb-3" />
                                            <p className="text-white/40">No search data yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {popularSearches.map((search, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl hover:border-white/20 transition-all"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DD00FF] to-[#00FFFF] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-bold truncate">{search.query}</p>
                                                            <p className="text-xs text-white/50">
                                                                {search.search_count} searches • {Math.round(search.click_through_rate)}% CTR
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-3">
                                                        <p className="text-sm text-white/60">
                                                            ~{Math.round(search.avg_results_count)} results
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Top Pages */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Top Pages</h2>
                                    </div>

                                    {topPages.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Eye className="w-12 h-12 text-white/20 mx-auto mb-3" />
                                            <p className="text-white/40">No page view data yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {topPages.map((page, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-xl hover:border-white/20 transition-all"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                                            {index + 1}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-white font-bold truncate">{page.title || page.url}</p>
                                                            <p className="text-xs text-white/50 truncate">{page.url}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-3">
                                                        <p className="text-lg font-black text-[#00FFFF]">{page.views}</p>
                                                        <p className="text-xs text-white/50">views</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Views by Type */}
                        {Object.keys(viewsByType).length > 0 && (
                            <div className="relative group mb-8">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A00] to-[#FF0099] rounded-lg flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Views by Page Type</h2>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {Object.entries(viewsByType).map(([type, count]) => (
                                            <div key={type} className="p-4 bg-black/40 border border-white/10 rounded-xl">
                                                <p className="text-xs text-white/50 mb-1 capitalize">{type}</p>
                                                <p className="text-2xl font-black text-white">{count}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Statistics */}
                        {formStats.length > 0 && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#FF0099] to-[#DD00FF] rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Form Analytics</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {formStats.map((form, index) => (
                                            <div key={index} className="p-5 bg-black/40 border border-white/10 rounded-xl">
                                                <h3 className="font-black text-white mb-4 capitalize">{form.form_type}</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-white/60">Total</span>
                                                        <span className="font-bold text-white">{form.total}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-white/60">Submitted</span>
                                                        <span className="font-bold text-[#00FFFF]">{form.submitted}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-white/60">Converted</span>
                                                        <span className="font-bold text-[#00FF9D]">{form.converted}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-white/60">Spam</span>
                                                        <span className="font-bold text-red-400">{form.spam}</span>
                                                    </div>
                                                    <div className="mt-3 pt-3 border-t border-white/10">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-white/60">Conversion Rate</span>
                                                            <span className="font-black text-[#00FF9D]">
                                                                {form.submitted > 0
                                                                    ? Math.round((form.converted / form.submitted) * 100)
                                                                    : 0}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* No Result Searches */}
                        {noResultSearches.length > 0 && (
                            <div className="relative group mt-8">
                                <div className="absolute -inset-px bg-gradient-to-br from-red-500/20 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-center">
                                            <Search className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Searches with No Results</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {noResultSearches.map((search, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-black/40 border border-red-500/20 rounded-xl"
                                            >
                                                <p className="text-white font-bold">{search.query}</p>
                                                <p className="text-sm text-red-400">{search.count} searches</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
