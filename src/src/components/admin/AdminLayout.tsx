'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Briefcase,
  Users,
  Star,
  Mail,
  Image,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { GradientText } from '@/src/components/ui/GradientText';
import { ToastProvider } from '@/components/ui/Toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['content']);

  useEffect(() => {
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigationSections = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/site-settings', label: 'Site Settings', icon: Settings },
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      items: [
        { href: '/admin/services', label: 'Services', icon: Layers },
        { href: '/admin/portfolio', label: 'Portfolio', icon: Layers },
        { href: '/admin/case-studies', label: 'Case Studies', icon: Briefcase },
        { href: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
        { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
        { href: '/admin/team', label: 'Team Members', icon: Users },
      ]
    },
    {
      id: 'engagement',
      label: 'User Engagement',
      items: [
        { href: '/admin/contacts', label: 'Contact Forms', icon: Mail },
        { href: '/admin/consultations', label: 'Consultations', icon: Briefcase },
        { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
      ]
    },
    {
      id: 'media',
      label: 'Media & Assets',
      items: [
        { href: '/admin/media', label: 'Media Library', icon: Image },
      ]
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-b-2 border-[var(--border-purple)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
            <h2 className="font-black">
              <GradientText variant="cyan-purple">ADMIN</GradientText>
            </h2>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white/60 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[var(--bg-secondary)] border-r-2 border-[var(--border-purple)] z-40 transition-all duration-300
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isSidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`font-black transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              <GradientText variant="cyan-purple">ADMIN</GradientText>
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:border-[var(--neon-purple)]/50 transition-colors"
            >
              <Menu className="w-4 h-4 text-white/60" />
            </button>
          </div>

          {isSidebarOpen && userEmail && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10">
              <Shield className="w-4 h-4 text-[var(--neon-purple)] flex-shrink-0" />
              <span className="text-xs text-white/70 truncate">{userEmail}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {navigationSections.map((section) => (
              <div key={section.id}>
                {isSidebarOpen && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs text-white/40 uppercase tracking-wider font-black hover:text-white/60 transition-colors"
                  >
                    <span>{section.label}</span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                )}

                {(expandedSections.includes(section.id) || !isSidebarOpen) && (
                  <div className="space-y-1 mt-2">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-3 rounded-lg font-bold transition-all duration-300
                            ${active
                              ? 'bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/50 text-[var(--neon-purple)] shadow-[0_0_20px_var(--glow-purple)]'
                              : 'text-white/60 hover:bg-white/[0.05] hover:text-white border-2 border-transparent'
                            }
                          `}
                          title={!isSidebarOpen ? item.label : undefined}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          {isSidebarOpen && (
                            <span className="text-sm">{item.label}</span>
                          )}
                          {active && isSidebarOpen && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-[var(--neon-purple)] animate-pulse" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-white/10 bg-[var(--bg-secondary)]">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full px-3 py-3 rounded-lg font-bold text-white/60 hover:text-white hover:bg-white/[0.05] transition-all border-2 border-transparent hover:border-red-500/30
              ${!isSidebarOpen && 'justify-center'}
            `}
            title={!isSidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 min-h-screen
          lg:ml-0
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
          pt-16 lg:pt-0
        `}
      >
        <div className="p-6 lg:p-8">
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-white">
                {title}
              </h1>
            </div>
          )}
          <ToastProvider>
            {children}
          </ToastProvider>
        </div>
      </main>
    </div>
  );
}
