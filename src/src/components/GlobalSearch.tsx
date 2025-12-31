'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Sparkles,
  LayoutGrid,
  FileText,
  Users,
  Briefcase,
  Star,
  ArrowRight,
  Command,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SearchResult {
  id: string;
  type: 'service' | 'blog' | 'team' | 'case-study' | 'testimonial';
  title: string;
  description: string;
  url: string;
  metadata?: string;
}

export function GlobalSearch() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to open search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults: SearchResult[] = [];
      const searchLower = searchQuery.toLowerCase();

      // Search Services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true);

      if (servicesData) {
        servicesData.forEach((service: any) => {
          const titleMatch = service.name?.toLowerCase().includes(searchLower);
          const descMatch = service.short_description?.toLowerCase().includes(searchLower);
          const fullMatch = service.full_description?.toLowerCase().includes(searchLower);

          if (titleMatch || descMatch || fullMatch) {
            searchResults.push({
              id: service.id,
              type: 'service',
              title: service.name,
              description: service.short_description || service.full_description?.substring(0, 120) || '',
              url: `/services/${service.slug}`,
              metadata: service.icon_name || '💼',
            });
          }
        });
      }

      // Search Blog Posts
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published');

      if (blogData) {
        blogData.forEach((post: any) => {
          const titleMatch = post.title?.toLowerCase().includes(searchLower);
          const excerptMatch = post.excerpt?.toLowerCase().includes(searchLower);
          const contentMatch = post.content?.toLowerCase().includes(searchLower);
          const tagsMatch = post.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower));

          if (titleMatch || excerptMatch || contentMatch || tagsMatch) {
            searchResults.push({
              id: post.id,
              type: 'blog',
              title: post.title,
              description: post.excerpt || '',
              url: `/blog/${post.slug}`,
              metadata: post.author_name || 'Blog Post',
            });
          }
        });
      }

      // Search Team Members
      const { data: teamData } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true);

      if (teamData) {
        teamData.forEach((member: any) => {
          const nameMatch = member.name?.toLowerCase().includes(searchLower);
          const roleMatch = member.role?.toLowerCase().includes(searchLower);
          const bioMatch = member.bio?.toLowerCase().includes(searchLower);
          const skillsMatch = member.skills?.some((skill: string) => skill.toLowerCase().includes(searchLower));

          if (nameMatch || roleMatch || bioMatch || skillsMatch) {
            searchResults.push({
              id: member.id,
              type: 'team',
              title: member.name,
              description: member.role || '',
              url: '/#team',
              metadata: member.department || 'Team Member',
            });
          }
        });
      }

      // Search Case Studies
      const { data: casesData } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_active', true);

      if (casesData) {
        casesData.forEach((study: any) => {
          const titleMatch = study.title?.toLowerCase().includes(searchLower);
          const clientMatch = study.client?.toLowerCase().includes(searchLower);
          const descMatch = study.description?.toLowerCase().includes(searchLower);

          if (titleMatch || clientMatch || descMatch) {
            searchResults.push({
              id: study.id,
              type: 'case-study',
              title: study.title,
              description: `${study.client} - ${study.description?.substring(0, 100) || ''}`,
              url: '/#case-studies',
              metadata: `${study.success_rate || 100}% Success`,
            });
          }
        });
      }

      // Search Testimonials
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved');

      if (testimonialsData) {
        testimonialsData.forEach((testimonial: any) => {
          const clientMatch = testimonial.client_name?.toLowerCase().includes(searchLower);
          const companyMatch = testimonial.company?.toLowerCase().includes(searchLower);
          const contentMatch = testimonial.content?.toLowerCase().includes(searchLower);

          if (clientMatch || companyMatch || contentMatch) {
            searchResults.push({
              id: testimonial.id,
              type: 'testimonial',
              title: testimonial.client_name,
              description: testimonial.content?.substring(0, 120) || '',
              url: '/#testimonials',
              metadata: testimonial.company || 'Client',
            });
          }
        });
      }

      setResults(searchResults);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return <LayoutGrid className="w-5 h-5 text-[var(--neon-cyan)]" />;
      case 'blog':
        return <FileText className="w-5 h-5 text-[var(--neon-purple)]" />;
      case 'team':
        return <Users className="w-5 h-5 text-[var(--neon-pink)]" />;
      case 'case-study':
        return <Briefcase className="w-5 h-5 text-[var(--neon-green)]" />;
      case 'testimonial':
        return <Star className="w-5 h-5 text-[var(--neon-orange)]" />;
    }
  };

  const getResultTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return 'Service';
      case 'blog':
        return 'Blog Post';
      case 'team':
        return 'Team Member';
      case 'case-study':
        return 'Case Study';
      case 'testimonial':
        return 'Testimonial';
    }
  };

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg hover:border-[var(--neon-purple)]/30 transition-all"
        aria-label="Open search"
      >
        <Search className="w-4 h-4 text-white/60 group-hover:text-[var(--neon-purple)] transition-colors" />
        <span className="text-sm text-white/60 hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/50">
          <Command className="w-3 h-3" />
          K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border-2 border-[var(--neon-purple)]/30 rounded-2xl shadow-[0_20px_60px_rgba(221,0,255,0.3)] animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b-2 border-white/10">
              <Search className="w-5 h-5 text-[var(--neon-purple)] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, blog posts, team members..."
                className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
              />
              {loading && (
                <Loader2 className="w-5 h-5 text-[var(--neon-purple)] animate-spin flex-shrink-0" />
              )}
              <button
                onClick={handleClose}
                className="p-1 rounded-lg hover:bg-white/10 transition-all flex-shrink-0"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef}>
              {!query.trim() ? (
                <div className="p-12 text-center">
                  <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 font-bold mb-2">Search Across Everything</p>
                  <p className="text-sm text-white/40">
                    Services • Blog Posts • Team Members • Case Studies • Testimonials
                  </p>
                </div>
              ) : results.length === 0 && !loading ? (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 font-bold mb-2">No results found</p>
                  <p className="text-sm text-white/40">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {Object.entries(groupedResults).map(([type, typeResults], groupIndex) => (
                    <div key={type} className="mb-4 last:mb-0">
                      {/* Group Header */}
                      <div className="px-3 py-2 flex items-center gap-2">
                        {getResultIcon(type as SearchResult['type'])}
                        <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">
                          {getResultTypeLabel(type as SearchResult['type'])}s ({typeResults.length})
                        </h3>
                      </div>

                      {/* Results */}
                      {typeResults.map((result, index) => {
                        const globalIndex = results.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result)}
                            className={`w-full text-left p-4 rounded-xl transition-all group ${isSelected
                              ? 'bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30'
                              : 'bg-black/20 border-2 border-transparent hover:bg-black/40 hover:border-white/10'
                              }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                {getResultIcon(result.type)}
                                <div className="flex-1 min-w-0">
                                  <h4 className={`font-bold mb-1 line-clamp-1 ${isSelected ? 'text-[var(--neon-purple)]' : 'text-white'
                                    }`}>
                                    {result.title}
                                  </h4>
                                  <p className="text-sm text-white/60 line-clamp-2 mb-2">
                                    {result.description}
                                  </p>
                                  {result.metadata && (
                                    <p className="text-xs text-white/50">
                                      {result.metadata}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <ArrowRight className={`w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all ${isSelected ? 'text-[var(--neon-purple)]' : 'text-white/40'
                                } ${isSelected ? 'translate-x-0' : '-translate-x-2'}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="p-3 border-t-2 border-white/10 bg-black/20">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">↑</kbd>
                      <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">↵</kbd>
                      Open
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded">ESC</kbd>
                      Close
                    </span>
                  </div>
                  <span>{results.length} results</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
