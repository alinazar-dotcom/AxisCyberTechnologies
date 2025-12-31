'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutGrid,
  FileText,
  Users,
  Briefcase,
  Star,
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Calendar,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Activity,
  BarChart3,
  Zap,
  Shield,
  LogOut,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/supabase';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';

interface DashboardStats {
  services: {
    total: number;
    active: number;
    recent: any[];
  };
  blog: {
    total: number;
    published: number;
    recent: any[];
  };
  team: {
    total: number;
    featured: number;
    recent: any[];
  };
  caseStudies: {
    total: number;
    active: number;
    recent: any[];
  };
  testimonials: {
    total: number;
    approved: number;
    recent: any[];
  };
  media: {
    total: number;
    recent: any[];
  };
}

export default function AdminOverviewPage() {
  const router = useRouter();
  const authSupabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [stats, setStats] = useState<DashboardStats>({
    services: { total: 0, active: 0, recent: [] },
    blog: { total: 0, published: 0, recent: [] },
    team: { total: 0, featured: 0, recent: [] },
    caseStudies: { total: 0, active: 0, recent: [] },
    testimonials: { total: 0, approved: 0, recent: [] },
    media: { total: 0, recent: [] },
  });
  const [loading, setLoading] = useState(true);
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
      // Load Services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      // Load Blog Posts
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_date', { ascending: false });

      // Load Team Members
      const { data: teamData } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      // Load Case Studies
      const { data: caseStudiesData } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      // Load Testimonials
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      // Load Media
      const { data: mediaData } = await supabase
        .from('media_library')
        .select('*')
        .order('uploaded_at', { ascending: false });

      setStats({
        services: {
          total: servicesData?.length || 0,
          active: servicesData?.filter(s => s.is_active).length || 0,
          recent: servicesData?.slice(0, 5) || [],
        },
        blog: {
          total: blogData?.length || 0,
          published: blogData?.filter(b => b.status === 'published').length || 0,
          recent: blogData?.slice(0, 5) || [],
        },
        team: {
          total: teamData?.length || 0,
          featured: teamData?.filter(t => t.is_featured).length || 0,
          recent: teamData?.slice(0, 5) || [],
        },
        caseStudies: {
          total: caseStudiesData?.length || 0,
          active: caseStudiesData?.filter(c => c.is_active).length || 0,
          recent: caseStudiesData?.slice(0, 5) || [],
        },
        testimonials: {
          total: testimonialsData?.length || 0,
          approved: testimonialsData?.filter(t => t.is_approved).length || 0,
          recent: testimonialsData?.slice(0, 5) || [],
        },
        media: {
          total: mediaData?.length || 0,
          recent: mediaData?.slice(0, 5) || [],
        },
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const totalItems = stats.services.total + stats.blog.total + stats.team.total +
    stats.caseStudies.total + stats.testimonials.total;
  const activeItems = stats.services.active + stats.blog.published + stats.team.total +
    stats.caseStudies.active + stats.testimonials.approved;

  const managerLinks = [
    { href: '/admin/services', label: 'Services', icon: LayoutGrid, color: 'cyan', count: stats.services.total },
    { href: '/admin/blog', label: 'Blog', icon: FileText, color: 'purple', count: stats.blog.total },
    { href: '/admin/team', label: 'Team', icon: Users, color: 'pink', count: stats.team.total },
    { href: '/admin/case-studies', label: 'Case Studies', icon: Briefcase, color: 'green', count: stats.caseStudies.total },
    { href: '/admin/testimonials', label: 'Testimonials', icon: Star, color: 'orange', count: stats.testimonials.total },
    { href: '/admin/media', label: 'Media', icon: ImageIcon, color: 'cyan', count: stats.media.total },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-pink)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[var(--neon-purple)]/10 via-[var(--neon-pink)]/10 to-[var(--neon-orange)]/10 border border-[var(--border-purple)] rounded-full backdrop-blur-md mb-4">
                <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
                <span className="text-white text-sm font-black tracking-wide uppercase">CMS Dashboard</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                <GradientText variant="purple-pink">
                  Content Overview
                </GradientText>
              </h1>

              <p className="text-xl text-white/70">
                Manage all content across your website from one central hub
              </p>
            </div>

            <div className="flex items-center gap-3">
              {userEmail && (
                <div className="px-4 py-2 rounded-lg bg-black/40 border-2 border-white/10 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[var(--neon-purple)]" />
                  <span className="text-sm text-white/70">{userEmail}</span>
                </div>
              )}
              <Button onClick={loadData} variant="secondary" size="sm">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Link href="/admin">
                <Button variant="secondary" size="sm">
                  Form Submissions
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin mb-4"></div>
            <p className="text-white/60 font-black">Loading dashboard...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Content Items */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-cyan)]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-xl">
                    <LayoutGrid className="w-6 h-6 text-[var(--neon-cyan)]" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-[var(--neon-cyan)]">
                    {totalItems}
                  </span>
                </div>
                <p className="text-sm text-white/70 font-bold">Total Content Items</p>
                <p className="text-xs text-white/50 mt-1">{activeItems} active/published</p>
              </div>

              {/* Blog Posts */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-purple)]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 rounded-xl">
                    <FileText className="w-6 h-6 text-[var(--neon-purple)]" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-[var(--neon-purple)]">
                    {stats.blog.total}
                  </span>
                </div>
                <p className="text-sm text-white/70 font-bold">Blog Posts</p>
                <p className="text-xs text-white/50 mt-1">{stats.blog.published} published</p>
              </div>

              {/* Team Members */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-pink)]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[var(--neon-pink)]/10 border-2 border-[var(--neon-pink)]/30 rounded-xl">
                    <Users className="w-6 h-6 text-[var(--neon-pink)]" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-[var(--neon-pink)]">
                    {stats.team.total}
                  </span>
                </div>
                <p className="text-sm text-white/70 font-bold">Team Members</p>
                <p className="text-xs text-white/50 mt-1">{stats.team.featured} featured</p>
              </div>

              {/* Media Files */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-green)]/30 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 rounded-xl">
                    <ImageIcon className="w-6 h-6 text-[var(--neon-green)]" />
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-[var(--neon-green)]">
                    {stats.media.total}
                  </span>
                </div>
                <p className="text-sm text-white/70 font-bold">Media Files</p>
                <p className="text-xs text-white/50 mt-1">Images & documents</p>
              </div>
            </div>

            {/* Quick Actions - Manager Links */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-[var(--neon-purple)]" />
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Quick Actions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {managerLinks.map((link, index) => {
                  const Icon = link.icon;
                  const colorClasses = {
                    cyan: 'border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)]',
                    purple: 'border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)]/50 text-[var(--neon-purple)]',
                    pink: 'border-[var(--neon-pink)]/30 hover:border-[var(--neon-pink)]/50 text-[var(--neon-pink)]',
                    green: 'border-[var(--neon-green)]/30 hover:border-[var(--neon-green)]/50 text-[var(--neon-green)]',
                    orange: 'border-[var(--neon-orange)]/30 hover:border-[var(--neon-orange)]/50 text-[var(--neon-orange)]',
                  };

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`group p-6 bg-white/[0.02] border-2 ${colorClasses[link.color as keyof typeof colorClasses]} rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 bg-${link.color === 'cyan' ? '[var(--neon-cyan)]' : link.color === 'purple' ? '[var(--neon-purple)]' : link.color === 'pink' ? '[var(--neon-pink)]' : link.color === 'green' ? '[var(--neon-green)]' : '[var(--neon-orange)]'}/10 border-2 ${colorClasses[link.color as keyof typeof colorClasses].split(' ')[0]} rounded-xl`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
                      </div>

                      <h3 className="text-lg font-black text-white mb-1 group-hover:text-current transition-colors">
                        {link.label}
                      </h3>

                      <p className="text-sm text-white/60">
                        Manage {link.count} {link.count === 1 ? 'item' : 'items'}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity - 2 Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Blog Posts */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-purple)]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[var(--neon-purple)]" />
                    <h3 className="text-xl font-black text-white">Recent Blog Posts</h3>
                  </div>
                  <Link href="/admin/blog" className="text-sm text-[var(--neon-purple)] font-bold hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {stats.blog.recent.length > 0 ? (
                    stats.blog.recent.map((post: any) => (
                      <div key={post.id} className="p-4 bg-black/40 border border-white/10 rounded-xl hover:bg-black/60 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-white/60 mb-2 line-clamp-1">
                              {post.excerpt || 'No excerpt'}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-white/50">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.published_date)}
                              </span>
                              {post.view_count > 0 && (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {post.view_count}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${post.status === 'published' ? 'bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 text-[var(--neon-green)]' :
                            post.status === 'draft' ? 'bg-white/10 border border-white/30 text-white/70' :
                              'bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)]'
                            }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/50 py-8">No blog posts yet</p>
                  )}
                </div>
              </div>

              {/* Recent Team Members */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-pink)]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-[var(--neon-pink)]" />
                    <h3 className="text-xl font-black text-white">Recent Team Members</h3>
                  </div>
                  <Link href="/admin/team" className="text-sm text-[var(--neon-pink)] font-bold hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {stats.team.recent.length > 0 ? (
                    stats.team.recent.map((member: any) => (
                      <div key={member.id} className="p-4 bg-black/40 border border-white/10 rounded-xl hover:bg-black/60 transition-all">
                        <div className="flex items-center gap-3">
                          {member.profile_image ? (
                            <img
                              src={member.profile_image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full border-2 border-[var(--neon-pink)]/30 object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--neon-pink)] to-[var(--neon-purple)] border-2 border-[var(--neon-pink)]/30 flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm line-clamp-1">
                              {member.name}
                            </h4>
                            <p className="text-xs text-white/60 line-clamp-1">
                              {member.role}
                            </p>
                          </div>
                          {member.is_featured && (
                            <Star className="w-4 h-4 text-[var(--neon-orange)] flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/50 py-8">No team members yet</p>
                  )}
                </div>
              </div>

              {/* Recent Case Studies */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-green)]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[var(--neon-green)]" />
                    <h3 className="text-xl font-black text-white">Recent Case Studies</h3>
                  </div>
                  <Link href="/admin/case-studies" className="text-sm text-[var(--neon-green)] font-bold hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {stats.caseStudies.recent.length > 0 ? (
                    stats.caseStudies.recent.map((study: any) => (
                      <div key={study.id} className="p-4 bg-black/40 border border-white/10 rounded-xl hover:bg-black/60 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">
                              {study.title}
                            </h4>
                            <p className="text-xs text-white/60 mb-2 line-clamp-1">
                              {study.client}
                            </p>
                            {study.success_rate && (
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-[var(--neon-green)] font-bold">
                                  {study.success_rate}% Success
                                </span>
                              </div>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${study.is_active
                            ? 'bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 text-[var(--neon-green)]'
                            : 'bg-white/10 border border-white/30 text-white/70'
                            }`}>
                            {study.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/50 py-8">No case studies yet</p>
                  )}
                </div>
              </div>

              {/* Recent Testimonials */}
              <div className="p-6 bg-white/[0.02] border-2 border-[var(--neon-orange)]/30 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-[var(--neon-orange)]" />
                    <h3 className="text-xl font-black text-white">Recent Testimonials</h3>
                  </div>
                  <Link href="/admin/testimonials" className="text-sm text-[var(--neon-orange)] font-bold hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {stats.testimonials.recent.length > 0 ? (
                    stats.testimonials.recent.map((testimonial: any) => (
                      <div key={testimonial.id} className="p-4 bg-black/40 border border-white/10 rounded-xl hover:bg-black/60 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm line-clamp-1 mb-1">
                              {testimonial.client_name}
                            </h4>
                            <p className="text-xs text-white/60 mb-2 line-clamp-2">
                              "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(testimonial.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-[var(--neon-orange)] fill-[var(--neon-orange)]" />
                              ))}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${testimonial.is_approved
                            ? 'bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 text-[var(--neon-green)]'
                            : 'bg-[var(--neon-orange)]/10 border border-[var(--neon-orange)]/30 text-[var(--neon-orange)]'
                            }`}>
                            {testimonial.is_approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white/50 py-8">No testimonials yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="p-6 bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border-2 border-[var(--neon-purple)]/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-[var(--neon-purple)]" />
                <h3 className="text-xl font-black text-white">System Status</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-white/60 mb-2">Content Distribution</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Services</span>
                      <span className="text-[var(--neon-cyan)] font-bold">{stats.services.total}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Blog Posts</span>
                      <span className="text-[var(--neon-purple)] font-bold">{stats.blog.total}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Team Members</span>
                      <span className="text-[var(--neon-pink)] font-bold">{stats.team.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/60 mb-2">Active Content</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Active Services</span>
                      <span className="text-[var(--neon-green)] font-bold">{stats.services.active}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Published Posts</span>
                      <span className="text-[var(--neon-green)] font-bold">{stats.blog.published}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/70">Approved Testimonials</span>
                      <span className="text-[var(--neon-green)] font-bold">{stats.testimonials.approved}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/60 mb-2">CMS Health</p>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--neon-green)]" />
                    <span className="text-sm text-[var(--neon-green)] font-bold">All Systems Operational</span>
                  </div>
                  <p className="text-xs text-white/60">
                    {totalItems} total items managed
                  </p>
                  <p className="text-xs text-white/60">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
