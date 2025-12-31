// ============================================
// ADVANCED SEARCH API - PHASE 4
// ============================================
// Full-text search across all content types
// ============================================

import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { errorResponse, successResponse, getPaginationParams } from '@/lib/api-utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// TYPES
// ============================================

interface SearchResult {
  type: 'service' | 'blog' | 'case_study' | 'faq' | 'team_member';
  id: string;
  title: string;
  slug?: string;
  description: string;
  url: string;
  relevance?: number;
}

// ============================================
// SEARCH
// ============================================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || searchParams.get('query');

    if (!query || query.trim().length === 0) {
      return errorResponse('Search query is required');
    }

    if (query.length < 2) {
      return errorResponse('Search query must be at least 2 characters');
    }

    const { limit } = getPaginationParams(request);
    const type = searchParams.get('type'); // Filter by type if provided

    const results: SearchResult[] = [];

    // Search services
    if (!type || type === 'service') {
      const { data: services } = await supabase
        .from('services')
        .select('id, name, slug, short_description')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,short_description.ilike.%${query}%,full_description.ilike.%${query}%`)
        .limit(limit);

      if (services) {
        results.push(...services.map(s => ({
          type: 'service' as const,
          id: s.id,
          title: s.name,
          slug: s.slug,
          description: s.short_description,
          url: `/services/${s.slug}`,
        })));
      }
    }

    // Search blog posts
    if (!type || type === 'blog') {
      const { data: blogs } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(limit);

      if (blogs) {
        results.push(...blogs.map(b => ({
          type: 'blog' as const,
          id: b.id,
          title: b.title,
          slug: b.slug,
          description: b.excerpt || '',
          url: `/blog/${b.slug}`,
        })));
      }
    }

    // Search case studies
    if (!type || type === 'case_study') {
      const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('id, title, slug, summary')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,summary.ilike.%${query}%,challenge.ilike.%${query}%,solution.ilike.%${query}%`)
        .limit(limit);

      if (caseStudies) {
        results.push(...caseStudies.map(c => ({
          type: 'case_study' as const,
          id: c.id,
          title: c.title,
          slug: c.slug,
          description: c.summary,
          url: `/case-studies/${c.slug}`,
        })));
      }
    }

    // Search FAQs
    if (!type || type === 'faq') {
      const { data: faqs } = await supabase
        .from('faqs')
        .select('id, question, answer, category')
        .or(`question.ilike.%${query}%,answer.ilike.%${query}%`)
        .limit(limit);

      if (faqs) {
        results.push(...faqs.map(f => ({
          type: 'faq' as const,
          id: f.id,
          title: f.question,
          description: f.answer.substring(0, 200) + '...',
          url: `/faq#${f.id}`,
        })));
      }
    }

    // Search team members
    if (!type || type === 'team_member') {
      const { data: teamMembers } = await supabase
        .from('team_members')
        .select('id, name, slug, role, bio')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,role.ilike.%${query}%,bio.ilike.%${query}%`)
        .limit(limit);

      if (teamMembers) {
        results.push(...teamMembers.map(t => ({
          type: 'team_member' as const,
          id: t.id,
          title: `${t.name} - ${t.role}`,
          slug: t.slug,
          description: t.bio?.substring(0, 200) + '...' || t.role,
          url: `/team/${t.slug}`,
        })));
      }
    }

    // Sort by relevance (simple: exact matches first, then partial)
    const sorted = results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === query.toLowerCase() ? 1 : 0;
      const bExact = b.title.toLowerCase() === query.toLowerCase() ? 1 : 0;
      
      if (aExact !== bExact) return bExact - aExact;
      
      const aStarts = a.title.toLowerCase().startsWith(query.toLowerCase()) ? 1 : 0;
      const bStarts = b.title.toLowerCase().startsWith(query.toLowerCase()) ? 1 : 0;
      
      return bStarts - aStarts;
    });

    // Limit total results
    const limited = sorted.slice(0, limit);

    return successResponse({
      query,
      total: limited.length,
      results: limited,
    });

  } catch (error: any) {
    console.error('Search error:', error);
    return errorResponse(error.message || 'Search failed', 500);
  }
}

// ============================================
// SEARCH SUGGESTIONS
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || query.trim().length < 2) {
      return successResponse({ suggestions: [] });
    }

    // Get search suggestions from services and popular terms
    const { data: services } = await supabase
      .from('services')
      .select('name')
      .ilike('name', `${query}%`)
      .limit(5);

    const { data: blogs } = await supabase
      .from('blog_posts')
      .select('title')
      .eq('status', 'published')
      .ilike('title', `${query}%`)
      .limit(5);

    const suggestions = [
      ...(services || []).map(s => s.name),
      ...(blogs || []).map(b => b.title),
    ].slice(0, 8); // Limit to 8 suggestions

    return successResponse({ suggestions });

  } catch (error: any) {
    console.error('Suggestions error:', error);
    return errorResponse(error.message || 'Failed to get suggestions', 500);
  }
}
