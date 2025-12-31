import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface NewsletterSubscription {
    id: string;
    email: string;
    subscribed_at: string;
    source: string;
    is_active: boolean;
}

interface Stats {
    total: number;
    active: number;
    today: number;
    thisWeek: number;
}

export default function NewsletterSubscriptionsManager() {
    const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, active: 0, today: 0, thisWeek: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');

    useEffect(() => {
        fetchSubscriptions();
        fetchStats();
    }, [filter]);

    const fetchSubscriptions = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('newsletter_subscriptions')
                .select('*')
                .order('subscribed_at', { ascending: false });

            if (filter === 'active') {
                query = query.eq('is_active', true);
            } else if (filter === 'inactive') {
                query = query.eq('is_active', false);
            }

            const { data, error } = await query;

            if (error) throw error;
            setSubscriptions(data || []);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            // Total subscribers
            const { count: total } = await supabase
                .from('newsletter_subscriptions')
                .select('*', { count: 'exact', head: true });

            // Active subscribers
            const { count: active } = await supabase
                .from('newsletter_subscriptions')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true);

            // Today's subscribers
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const { count: todayCount } = await supabase
                .from('newsletter_subscriptions')
                .select('*', { count: 'exact', head: true })
                .gte('subscribed_at', today.toISOString());

            // This week's subscribers
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const { count: weekCount } = await supabase
                .from('newsletter_subscriptions')
                .select('*', { count: 'exact', head: true })
                .gte('subscribed_at', weekAgo.toISOString());

            setStats({
                total: total || 0,
                active: active || 0,
                today: todayCount || 0,
                thisWeek: weekCount || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const toggleSubscriptionStatus = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('newsletter_subscriptions')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            // Refresh data
            fetchSubscriptions();
            fetchStats();
        } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Failed to update subscription status');
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['Email', 'Subscribed At', 'Source', 'Status'].join(','),
            ...subscriptions.map(sub => [
                sub.email,
                new Date(sub.subscribed_at).toLocaleString(),
                sub.source,
                sub.is_active ? 'Active' : 'Inactive'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#B900FF] to-[#FF0099] bg-clip-text text-transparent">
                    📧 Newsletter Subscriptions
                </h1>
                <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-gradient-to-r from-[#00E5FF] to-[#B900FF] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                    📥 Export CSV
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-[#00E5FF]/10 to-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-lg p-6">
                    <div className="text-sm text-gray-400 mb-1">Total Subscribers</div>
                    <div className="text-3xl font-bold text-[#00E5FF]">{stats.total}</div>
                </div>
                <div className="bg-gradient-to-br from-[#00FFAA]/10 to-[#00FFAA]/5 border border-[#00FFAA]/20 rounded-lg p-6">
                    <div className="text-sm text-gray-400 mb-1">Active</div>
                    <div className="text-3xl font-bold text-[#00FFAA]">{stats.active}</div>
                </div>
                <div className="bg-gradient-to-br from-[#B900FF]/10 to-[#B900FF]/5 border border-[#B900FF]/20 rounded-lg p-6">
                    <div className="text-sm text-gray-400 mb-1">Today</div>
                    <div className="text-3xl font-bold text-[#B900FF]">{stats.today}</div>
                </div>
                <div className="bg-gradient-to-br from-[#FF0099]/10 to-[#FF0099]/5 border border-[#FF0099]/20 rounded-lg p-6">
                    <div className="text-sm text-gray-400 mb-1">This Week</div>
                    <div className="text-3xl font-bold text-[#FF0099]">{stats.thisWeek}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'all'
                            ? 'bg-gradient-to-r from-[#00E5FF] to-[#B900FF] text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    All ({stats.total})
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'active'
                            ? 'bg-gradient-to-r from-[#00FFAA] to-[#00E5FF] text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    Active ({stats.active})
                </button>
                <button
                    onClick={() => setFilter('inactive')}
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'inactive'
                            ? 'bg-gradient-to-r from-[#FF0099] to-[#B900FF] text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    Inactive ({stats.total - stats.active})
                </button>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400">
                        <div className="animate-spin w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full mx-auto mb-4"></div>
                        Loading subscriptions...
                    </div>
                ) : subscriptions.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        No subscriptions found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Subscribed At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {subscriptions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(sub.subscribed_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                                                {sub.source}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${sub.is_active
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                    }`}
                                            >
                                                {sub.is_active ? '✓ Active' : '✗ Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => toggleSubscriptionStatus(sub.id, sub.is_active)}
                                                className={`px-3 py-1 rounded text-xs transition-colors ${sub.is_active
                                                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                    }`}
                                            >
                                                {sub.is_active ? 'Deactivate' : 'Reactivate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer Info */}
            <div className="text-sm text-gray-500 text-center">
                Showing {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}
            </div>
        </div>
    );
}
