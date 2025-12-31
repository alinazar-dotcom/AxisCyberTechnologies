import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    MessageSquare,
    Mail as MailIcon,
    ArrowRight,
    RefreshCw,
    Shield,
    LogOut,
    ChevronRight,
    Database
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
    jobs: {
        total: number;
        active: number;
    };
    comments: {
        total: number;
        pending: number;
    };
    seo: {
        total: number;
    };
    emailCampaigns: {
        total: number;
        active: number;
    };
    applications: {
        total: number;
        new: number;
    };
}

export default function AdminOverviewPage() {
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
    const [stats, setStats] = useState<DashboardStats>({
        services: { total: 0, active: 0, recent: [] },
        blog: { total: 0, published: 0, recent: [] },
        team: { total: 0, featured: 0, recent: [] },
        caseStudies: { total: 0, active: 0, recent: [] },
        testimonials: { total: 0, approved: 0, recent: [] },
        media: { total: 0, recent: [] },
        jobs: { total: 0, active: 0 },
        comments: { total: 0, pending: 0 },
        seo: { total: 0 },
        emailCampaigns: { total: 0, active: 0 },
        applications: { total: 0, new: 0 },
    });
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        loadData();
        loadUser();
    }, []);

    const loadUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
            setUserEmail(session.user.email);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const loadData = async () => {
        setLoading(true);
        try {
            // Load all data in parallel
            const [
                servicesData,
                blogData,
                teamData,
                caseStudiesData,
                testimonialsData,
                mediaData,
                jobsData,
                commentsData,
                siteSettingsData,
                campaignsData,
                applicationsData
            ] = await Promise.all([
                supabase.from('services').select('*').order('display_order', { ascending: true }),
                supabase.from('blog_posts').select('*').order('published_at', { ascending: false }),
                supabase.from('team_members').select('*').order('display_order', { ascending: true }),
                supabase.from('case_studies').select('*').order('created_at', { ascending: false }),
                supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
                supabase.from('media_library').select('*').order('created_at', { ascending: false }),
                supabase.from('jobs').select('*').order('created_at', { ascending: false }),
                supabase.from('comments').select('*').order('created_at', { ascending: false }),
                supabase.from('seo_settings').select('*'),
                supabase.from('email_campaigns').select('*').order('created_at', { ascending: false }),
                supabase.from('job_applications').select('*')
            ]);

            setStats({
                services: {
                    total: servicesData.data?.length || 0,
                    active: servicesData.data?.filter(s => s.is_active).length || 0,
                    recent: servicesData.data?.slice(0, 5) || [],
                },
                blog: {
                    total: blogData.data?.length || 0,
                    published: blogData.data?.filter(b => b.status === 'published').length || 0,
                    recent: blogData.data?.slice(0, 5) || [],
                },
                team: {
                    total: teamData.data?.length || 0,
                    featured: teamData.data?.filter(t => t.is_featured).length || 0,
                    recent: teamData.data?.slice(0, 5) || [],
                },
                caseStudies: {
                    total: caseStudiesData.data?.length || 0,
                    active: caseStudiesData.data?.filter(c => c.is_active).length || 0,
                    recent: caseStudiesData.data?.slice(0, 5) || [],
                },
                testimonials: {
                    total: testimonialsData.data?.length || 0,
                    approved: testimonialsData.data?.filter(t => t.is_approved).length || 0,
                    recent: testimonialsData.data?.slice(0, 5) || [],
                },
                media: {
                    total: mediaData.data?.length || 0,
                    recent: mediaData.data?.slice(0, 5) || [],
                },
                jobs: {
                    total: jobsData.data?.length || 0,
                    active: jobsData.data?.filter(j => j.is_active).length || 0,
                },
                comments: {
                    total: commentsData.data?.length || 0,
                    pending: commentsData.data?.filter(c => (c.status === 'pending') || (!c.status && !c.is_approved)).length || 0,
                },
                seo: {
                    total: siteSettingsData.data?.length || 0,
                },
                emailCampaigns: {
                    total: campaignsData.data?.length || 0,
                    active: campaignsData.data?.filter(c => c.status === 'active').length || 0,
                },
                applications: {
                    total: applicationsData.data?.length || 0,
                    new: applicationsData.data?.filter(a => a.status === 'new').length || 0,
                }
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

    const totalItems = stats.services.total + stats.blog.total + stats.team.total +
        stats.caseStudies.total + stats.testimonials.total + stats.jobs.total;

    const contentModules = [
        {
            href: '/admin/blog',
            label: 'Blog Posts',
            icon: FileText,
            color: '#DD00FF',
            count: stats.blog.total,
            subtitle: `${stats.blog.published} published`
        },
        {
            href: '/admin/portfolio',
            label: 'Portfolio',
            icon: LayoutGrid,
            color: '#00FFFF',
            count: stats.caseStudies.total,
            subtitle: 'Project showcases'
        },
        {
            href: '/admin/case-studies',
            label: 'Case Studies',
            icon: Briefcase,
            color: '#00FF9D',
            count: stats.caseStudies.total,
            subtitle: `${stats.caseStudies.active} active`
        },
        {
            href: '/admin/team',
            label: 'Team Members',
            icon: Users,
            color: '#FF0099',
            count: stats.team.total,
            subtitle: `${stats.team.featured} featured`
        },
        {
            href: '/admin/services',
            label: 'Services',
            icon: Settings,
            color: '#00FFFF',
            count: stats.services.total,
            subtitle: `${stats.services.active} active`
        },
        {
            href: '/admin/testimonials',
            label: 'Testimonials',
            icon: Star,
            color: '#FF7A00',
            count: stats.testimonials.total,
            subtitle: `${stats.testimonials.approved} approved`
        },
        {
            href: '/admin/jobs-manager',
            label: 'Job Postings',
            icon: Briefcase,
            color: '#DD00FF',
            count: stats.jobs.total,
            subtitle: `${stats.jobs.active} open positions`
        },
        {
            href: '/admin/jobs',
            label: 'Career Applications',
            icon: MailIcon,
            color: '#00FFFF',
            count: stats.applications.total,
            subtitle: `${stats.applications.new} new candidates`
        },
        {
            href: '/admin/comments',
            label: 'Comments',
            icon: MessageSquare,
            color: '#00FFFF',
            count: stats.comments.total,
            subtitle: `${stats.comments.pending} pending`
        },
        {
            href: '/admin/media',
            label: 'Media Library',
            icon: ImageIcon,
            color: '#00FF9D',
            count: stats.media.total,
            subtitle: 'Images & files'
        },
        {
            href: '/admin/seo',
            label: 'SEO Settings',
            icon: TrendingUp,
            color: '#FF0099',
            count: stats.seo.total,
            subtitle: 'Meta tags & descriptions'
        },
        {
            href: '/admin/site-settings',
            label: 'Site Settings',
            icon: Settings,
            color: '#00FFFF',
            count: 1,
            subtitle: 'Global configuration'
        },
        {
            href: '/admin/email-marketing',
            label: 'Email Marketing',
            icon: MailIcon,
            color: '#DD00FF',
            count: stats.emailCampaigns.total,
            subtitle: `${stats.emailCampaigns.active} active campaigns`
        },
    ];

    return (
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
            {/* Simplified background */}
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

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h2 className="text-xs font-black text-white/50 tracking-[0.3em] uppercase mb-3">
                                CMS Dashboard
                            </h2>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                Content Management System
                            </h1>
                            <p className="text-white/60">
                                Manage all content across your website
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {userEmail && (
                                <div className="hidden md:flex px-4 py-2 rounded-lg bg-white/5 border border-white/10 items-center gap-2">
                                    <Shield className="w-4 h-4 text-[#DD00FF]" />
                                    <span className="text-sm text-white/70">{userEmail}</span>
                                </div>
                            )}
                            <button
                                onClick={loadData}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden md:inline">Refresh</span>
                            </button>
                            <Link to="/admin/dashboard">
                                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#DD00FF] transition-colors">
                                    Forms
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-red-500/50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <RefreshCw className="w-12 h-12 text-[#DD00FF] animate-spin mx-auto mb-4" />
                        <p className="text-white/60">Loading CMS data...</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {/* Overview Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Total Content */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#00FFFF]/10 border border-[#00FFFF]/30 flex items-center justify-center">
                                            <Database className="w-6 h-6 text-[#00FFFF]" />
                                        </div>
                                        <span className="text-3xl font-black text-[#00FFFF]">
                                            {totalItems}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white/80 mb-1">Total Content</p>
                                    <p className="text-xs text-white/40">Across all modules</p>
                                </div>
                            </div>

                            {/* Blog Posts */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#DD00FF]/10 border border-[#DD00FF]/30 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-[#DD00FF]" />
                                        </div>
                                        <span className="text-3xl font-black text-[#DD00FF]">
                                            {stats.blog.total}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white/80 mb-1">Blog Posts</p>
                                    <p className="text-xs text-white/40">{stats.blog.published} published</p>
                                </div>
                            </div>

                            {/* Team Members */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#FF0099]/10 border border-[#FF0099]/30 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-[#FF0099]" />
                                        </div>
                                        <span className="text-3xl font-black text-[#FF0099]">
                                            {stats.team.total}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white/80 mb-1">Team Members</p>
                                    <p className="text-xs text-white/40">{stats.team.featured} featured</p>
                                </div>
                            </div>

                            {/* Media Files */}
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#00FF9D]/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20"></div>
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20"></div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center">
                                            <ImageIcon className="w-6 h-6 text-[#00FF9D]" />
                                        </div>
                                        <span className="text-3xl font-black text-[#00FF9D]">
                                            {stats.media.total}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white/80 mb-1">Media Files</p>
                                    <p className="text-xs text-white/40">Images & documents</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Management Modules */}
                        <div>
                            <h2 className="text-xl font-black text-white mb-6">Content Modules</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {contentModules.map((module, index) => {
                                    const Icon = module.icon;
                                    return (
                                        <Link
                                            key={module.href}
                                            to={module.href}
                                            className="relative group"
                                        >
                                            <div
                                                className="absolute -inset-px rounded-2xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"
                                                style={{ background: `linear-gradient(to bottom right, ${module.color}20, transparent)` }}
                                            ></div>
                                            <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 group-hover:border-white/20 transition-all">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                        style={{
                                                            backgroundColor: `${module.color}10`,
                                                            border: `1px solid ${module.color}30`
                                                        }}
                                                    >
                                                        <Icon className="w-5 h-5" style={{ color: module.color }} />
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                                                </div>
                                                <h3 className="font-black text-white text-sm mb-1">{module.label}</h3>
                                                <p className="text-xs text-white/60 mb-2">{module.subtitle}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold" style={{ color: module.color }}>
                                                        {module.count} items
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Recent Blog Posts */}
                            {stats.blog.recent.length > 0 && (
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-[#DD00FF]" />
                                                Recent Blog Posts
                                            </h3>
                                            <Link to="/admin/blog" className="text-xs font-bold text-[#DD00FF] hover:underline">
                                                View All
                                            </Link>
                                        </div>
                                        <div className="space-y-3">
                                            {stats.blog.recent.slice(0, 3).map((post: any) => (
                                                <div key={post.id} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                                                    <h4 className="font-bold text-white text-sm mb-1">{post.title}</h4>
                                                    <div className="flex items-center justify-between text-xs text-white/40">
                                                        <span>{formatDate(post.published_at)}</span>
                                                        <span className={`px-2 py-0.5 rounded ${post.status === 'published' ? 'bg-[#00FF9D]/10 text-[#00FF9D]' : 'bg-white/10 text-white/60'}`}>
                                                            {post.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recent Team Members */}
                            {stats.team.recent.length > 0 && (
                                <div className="relative">
                                    <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                    <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                                <Users className="w-5 h-5 text-[#FF0099]" />
                                                Recent Team
                                            </h3>
                                            <Link to="/admin/team" className="text-xs font-bold text-[#FF0099] hover:underline">
                                                View All
                                            </Link>
                                        </div>
                                        <div className="space-y-3">
                                            {stats.team.recent.slice(0, 3).map((member: any) => (
                                                <div key={member.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                                                    <div className="w-10 h-10 rounded-full bg-[#FF0099]/10 border border-[#FF0099]/30 flex items-center justify-center">
                                                        <Users className="w-5 h-5 text-[#FF0099]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white text-sm">{member.name}</h4>
                                                        <p className="text-xs text-white/60">{member.role}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
