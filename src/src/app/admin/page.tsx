'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Mail, Calendar, TrendingUp, Users, CheckCircle2, Clock, AlertCircle, Eye, Trash2, RefreshCw, Filter, LogOut, Shield } from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/supabase';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { getAnalyticsStats } from '@/hooks/useAnalytics';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  services: string[];
  status: 'new' | 'contacted' | 'completed';
  submitted_at: string;
};

type ConsultationRequest = {
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
};

type NewsletterSubscription = {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
  is_active: boolean;
};

interface AnalyticsStats {
  totalViews: number;
  recentViews: number;
  topPages: { path: string; count: number; }[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const authSupabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'consultations' | 'newsletter'>('overview');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats>({ totalViews: 0, recentViews: 0, topPages: [] });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    loadData();
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: { session } } = await authSupabase.auth.getSession();
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  };

  const handleLogout = async () => {
    await authSupabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Load contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!contactsError && contactsData) {
        setContacts(contactsData);
      }

      // Load consultations
      const { data: consultationsData, error: consultationsError } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (!consultationsError && consultationsData) {
        setConsultations(consultationsData);
      }

      // Load newsletters
      const { data: newslettersData, error: newslettersError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (!newslettersError && newslettersData) {
        setNewsletters(newslettersData);
      }

      // Load analytics
      const stats = await getAnalyticsStats();
      setAnalytics(stats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'pending':
        return 'text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)]/30';
      case 'contacted':
      case 'scheduled':
        return 'text-[var(--neon-purple)] bg-[var(--neon-purple)]/10 border-[var(--neon-purple)]/30';
      case 'completed':
        return 'text-[var(--neon-green)] bg-[var(--neon-green)]/10 border-[var(--neon-green)]/30';
      default:
        return 'text-white/70 bg-white/10 border-white/30';
    }
  };

  const filteredContacts = filterStatus === 'all'
    ? contacts
    : contacts.filter(c => c.status === filterStatus);

  const filteredConsultations = filterStatus === 'all'
    ? consultations
    : consultations.filter(c => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Header */}
      <div className="container-padding mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="mb-4">
              <GradientText gradient="purple-cyan">
                Admin Dashboard
              </GradientText>
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Monitor submissions, consultations, and analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userEmail && (
              <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--neon-purple)]" />
                <span className="text-sm text-white/70">{userEmail}</span>
              </div>
            )}
            <Button onClick={loadData} variant="secondary" size="sm">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <a href="/admin/overview">
              <Button variant="secondary" size="sm">
                CMS Overview
              </Button>
            </a>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container-padding mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'contacts', label: 'Contact Forms', icon: Mail },
            { id: 'consultations', label: 'Consultations', icon: Calendar },
            { id: 'newsletter', label: 'Newsletter', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-[var(--neon-purple)]/20 border-2 border-[var(--neon-purple)]/60 text-[var(--neon-purple)] shadow-[0_0_20px_rgba(221,0,255,0.3)]'
                    : 'bg-black/40 border-2 border-white/10 text-white/70 hover:border-white/30'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="container-padding text-center py-20">
          <RefreshCw className="w-12 h-12 text-[var(--neon-purple)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">Loading data...</p>
        </div>
      ) : (
        <div className="container-padding">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-neon-cyan p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Mail className="w-8 h-8 text-[var(--neon-cyan)]" />
                    <span className="text-3xl font-black text-[var(--neon-cyan)]">
                      {contacts.length}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">Contact Submissions</p>
                  <p className="text-xs text-white/50 mt-1">
                    {contacts.filter(c => c.status === 'new').length} new
                  </p>
                </div>

                <div className="card-neon-purple p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-[var(--neon-purple)]" />
                    <span className="text-3xl font-black text-[var(--neon-purple)]">
                      {consultations.length}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">Consultations</p>
                  <p className="text-xs text-white/50 mt-1">
                    {consultations.filter(c => c.status === 'pending').length} pending
                  </p>
                </div>

                <div className="card-neon-pink p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-[var(--neon-pink)]" />
                    <span className="text-3xl font-black text-[var(--neon-pink)]">
                      {newsletters.filter(n => n.is_active).length}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">Newsletter Subscribers</p>
                  <p className="text-xs text-white/50 mt-1">
                    {newsletters.length} total
                  </p>
                </div>

                <div className="card-neon-green p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-[var(--neon-green)]" />
                    <span className="text-3xl font-black text-[var(--neon-green)]">
                      {analytics.totalViews}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">Total Page Views</p>
                  <p className="text-xs text-white/50 mt-1">
                    {analytics.recentViews} last 7 days
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-neon p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[var(--neon-purple)]" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[...contacts.slice(0, 3), ...consultations.slice(0, 2)]
                    .sort((a, b) => {
                      const dateA = 'submitted_at' in a ? a.submitted_at : a.requested_at;
                      const dateB = 'submitted_at' in b ? b.submitted_at : b.requested_at;
                      return new Date(dateB).getTime() - new Date(dateA).getTime();
                    })
                    .slice(0, 5)
                    .map((item, idx) => {
                      const isContact = 'submitted_at' in item;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10">
                          <div className="flex items-center gap-3">
                            {isContact ? (
                              <Mail className="w-5 h-5 text-[var(--neon-cyan)]" />
                            ) : (
                              <Calendar className="w-5 h-5 text-[var(--neon-purple)]" />
                            )}
                            <div>
                              <p className="font-bold">{item.name}</p>
                              <p className="text-sm text-white/60">{item.email}</p>
                            </div>
                          </div>
                          <span className="text-xs text-white/50">
                            {formatDate(isContact ? (item as ContactSubmission).submitted_at : (item as ConsultationRequest).requested_at)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[var(--neon-purple)]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-black/40 border-2 border-white/10 text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="card-neon p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{contact.name}</h4>
                        <p className="text-sm text-[var(--text-muted)]">{contact.email}</p>
                        {contact.company && (
                          <p className="text-sm text-[var(--text-muted)]">{contact.company}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>

                    <p className="text-sm text-white/80 mb-4">{contact.message}</p>

                    {contact.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {contact.services.map(service => (
                          <span key={service} className="px-2 py-1 rounded-lg bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 text-xs text-[var(--neon-purple)]">
                            {service}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-white/50">{formatDate(contact.submitted_at)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consultations Tab */}
          {activeTab === 'consultations' && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[var(--neon-purple)]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-black/40 border-2 border-white/10 text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredConsultations.map(consultation => (
                  <div key={consultation.id} className="card-neon p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{consultation.name}</h4>
                        <p className="text-sm text-[var(--text-muted)]">{consultation.email}</p>
                        {consultation.company && (
                          <p className="text-sm text-[var(--text-muted)]">{consultation.company}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(consultation.status)}`}>
                        {consultation.status}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      {consultation.project_type && (
                        <div>
                          <p className="text-xs text-white/50 mb-1">Project Type</p>
                          <p className="text-sm font-bold text-[var(--neon-cyan)]">{consultation.project_type}</p>
                        </div>
                      )}
                      {consultation.budget_range && (
                        <div>
                          <p className="text-xs text-white/50 mb-1">Budget</p>
                          <p className="text-sm font-bold text-[var(--neon-green)]">{consultation.budget_range}</p>
                        </div>
                      )}
                      {consultation.timeline && (
                        <div>
                          <p className="text-xs text-white/50 mb-1">Timeline</p>
                          <p className="text-sm font-bold text-[var(--neon-purple)]">{consultation.timeline}</p>
                        </div>
                      )}
                    </div>

                    {consultation.message && (
                      <p className="text-sm text-white/80 mb-4">{consultation.message}</p>
                    )}

                    <p className="text-xs text-white/50">{formatDate(consultation.requested_at)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Tab */}
          {activeTab === 'newsletter' && (
            <div className="space-y-4">
              {newsletters.map(subscription => (
                <div key={subscription.id} className="card-neon p-6 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{subscription.email}</p>
                    <p className="text-sm text-white/60">
                      Subscribed: {formatDate(subscription.subscribed_at)}
                    </p>
                    <p className="text-xs text-white/50">Source: {subscription.source}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${subscription.is_active
                      ? 'text-[var(--neon-green)] bg-[var(--neon-green)]/10 border-[var(--neon-green)]/30'
                      : 'text-white/50 bg-white/10 border-white/30'
                    }`}>
                    {subscription.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}