'use client';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    DollarSign,
    Target,
    Zap,
    Award,
    ExternalLink,
    Github,
    Globe,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Link2,
    TrendingUp,
    Building2,
    Quote
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    summary: string; // mapped from short_description
    description: string; // mapped from full_description
    project_type: string; // mapped from category
    tags: string[];
    client_name?: string;
    client_industry?: string;
    completion_date?: string; // mapped from project_date
    project_duration?: string; // mapped from duration
    team_size?: string; // Note: DB schema says varchar, interface said number
    budget_range?: string;
    featured_image?: string; // mapped from featured_image_url
    gallery_images?: string[];
    project_url?: string; // mapped from live_url
    github_url?: string;
    technologies: string[];
    challenge?: string; // mapped from challenges
    solution?: string; // mapped from solutions
    results?: string;
    success_metrics?: any; // mapped from metrics
    testimonial?: string; // mapped from testimonial_text
    testimonial_author?: string;
    testimonial_role?: string;
    testimonial_avatar?: string; // mapped from testimonial_avatar_url
    views: number;
    status: string;
    services: string[];
    client_logo?: string;
}

interface RelatedCaseStudy {
    id: string;
    title: string;
    slug: string;
    summary: string;
    featured_image?: string;
    project_type: string;
    client_name?: string;
    project_duration?: string;
    team_size?: string;
}

export function CaseStudyDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
    const [relatedStudies, setRelatedStudies] = useState<RelatedCaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchCaseStudy();
        }
    }, [slug]);

    const fetchCaseStudy = async () => {
        setLoading(true);
        try {
            // Fetch main case study
            const { data: studyData, error: studyError } = await supabase
                .from('case_studies')
                .select('*')
                .eq('slug', slug)
                .single();

            if (studyError) throw studyError;
            if (!studyData) throw new Error('Case study not found');

            // Handle fallback for project_type
            const enhancedStudyData = {
                ...studyData,
                project_type: studyData.project_type || (studyData.services && studyData.services[0]) || 'Uncategorized',
                testimonial_avatar: studyData.testimonial_avatar || studyData.client_logo
            };

            setCaseStudy(enhancedStudyData);

            // Increment view count
            const currentViews = studyData.views || 0;
            await supabase
                .from('case_studies')
                .update({ views: currentViews + 1 })
                .eq('id', studyData.id);

            // Fetch related case studies (same industry or category, excluding current)
            const { data: relatedData } = await supabase
                .from('case_studies')
                .select('id, title, slug, summary, featured_image, project_type, client_name, project_duration, team_size')
                .eq('status', 'published')
                .neq('id', studyData.id)
                .or(`client_industry.eq.${studyData.client_industry},project_type.eq.${studyData.project_type}`)
                .limit(3);

            if (relatedData) {
                setRelatedStudies(relatedData);
            }

        } catch (err: any) {
            console.error('Error fetching case study:', err);
            setError(err.message || 'Failed to load case study');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = caseStudy?.title || '';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Helper to parse metrics if they are stored as JSONB
    const getMetrics = () => {
        if (!caseStudy?.success_metrics) return [];
        if (Array.isArray(caseStudy.success_metrics)) return caseStudy.success_metrics;
        if (typeof caseStudy.success_metrics === 'object') {
            return Object.entries(caseStudy.success_metrics).map(([label, value]) => ({
                label: label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                value: String(value)
            }));
        }
        return [];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-[#DD00FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Loading case study...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !caseStudy) {
        return (
            <div className="min-h-screen bg-[#05060A] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-10 h-10 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">Case Study Not Found</h2>
                        <p className="text-white/60 mb-6">{error}</p>
                        <Link to="/case-studies">
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Case Studies
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const metrics = getMetrics();

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

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Back Button */}
                <Link to="/case-studies">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:border-[#00FFFF] transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Case Studies
                    </button>
                </Link>

                {/* Category Badge */}
                {caseStudy.project_type && (
                    <div className="mb-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-[#00FFFF]/20 to-[#DD00FF]/20 border border-[#00FFFF]/30 rounded-lg text-sm font-bold text-[#00FFFF]">
                            {caseStudy.project_type}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                    {caseStudy.title}
                </h1>

                {/* Client & Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
                    {caseStudy.client_name && (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] rounded-full flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-white">{caseStudy.client_name}</p>
                                {caseStudy.client_industry && (
                                    <p className="text-xs text-white/60">{caseStudy.client_industry}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {caseStudy.completion_date && (
                        <div className="flex items-center gap-2 text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{new Date(caseStudy.completion_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long'
                            })}</span>
                        </div>
                    )}

                    {caseStudy.project_duration && (
                        <div className="flex items-center gap-2 text-white/60">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{caseStudy.project_duration}</span>
                        </div>
                    )}

                    {caseStudy.team_size && (
                        <div className="flex items-center gap-2 text-white/60">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{caseStudy.team_size} members</span>
                        </div>
                    )}

                    {/* Share Button */}
                    <div className="ml-auto relative">
                        <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all"
                        >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>

                        {showShareMenu && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0B0D14] border border-white/20 rounded-xl p-2 shadow-2xl z-20">
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    <Facebook className="w-4 h-4" />
                                    <span>Facebook</span>
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    <Twitter className="w-4 h-4" />
                                    <span>Twitter</span>
                                </button>
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span>LinkedIn</span>
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
                                >
                                    <Link2 className="w-4 h-4" />
                                    <span>Copy Link</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Featured Image */}
                {caseStudy.featured_image && (
                    <div className="relative group mb-12 overflow-hidden rounded-2xl">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative">
                            <img
                                src={caseStudy.featured_image}
                                alt={caseStudy.title}
                                className="w-full h-auto rounded-2xl"
                            />
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Short Description */}
                        {caseStudy.summary && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                    <p className="text-xl text-white/90 leading-relaxed">
                                        {caseStudy.summary}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Metrics/Results Grid */}
                        {metrics.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {metrics.map((metric: any, index: number) => (
                                    <div key={index} className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/20 to-[#DD00FF]/20 rounded-2xl blur-lg"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-6">
                                            <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-[#00FFFF]"></div>
                                            <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-[#00FFFF]"></div>

                                            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] mb-2">
                                                {metric.value || metric.metric}
                                            </div>
                                            <div className="font-bold text-white mb-1">{metric.label}</div>
                                            {metric.description && (
                                                <div className="text-sm text-white/60">{metric.description}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Full Description */}
                        {caseStudy.description && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                        <Target className="w-8 h-8 text-[#00FFFF]" />
                                        Project Overview
                                    </h2>
                                    <div className="text-white/80 leading-relaxed whitespace-pre-line">
                                        {caseStudy.description}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Challenges */}
                        {caseStudy.challenge && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#FF0099]/10 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#FF0099]/20 rounded-2xl p-8">
                                    <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                        <Target className="w-8 h-8 text-[#FF0099]" />
                                        Challenges
                                    </h2>
                                    <div className="text-white/80 leading-relaxed whitespace-pre-line">
                                        {caseStudy.challenge}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Solutions */}
                        {caseStudy.solution && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/10 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/20 rounded-2xl p-8">
                                    <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                        <Zap className="w-8 h-8 text-[#00FFFF]" />
                                        Solutions
                                    </h2>
                                    <div className="text-white/80 leading-relaxed whitespace-pre-line">
                                        {caseStudy.solution}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        {caseStudy.results && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#DD00FF]/10 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#DD00FF]/20 rounded-2xl p-8">
                                    <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                        <Award className="w-8 h-8 text-[#DD00FF]" />
                                        Results & Impact
                                    </h2>
                                    <div className="text-white/80 leading-relaxed whitespace-pre-line">
                                        {caseStudy.results}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {caseStudy.gallery_images && caseStudy.gallery_images.length > 0 && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-3xl font-black text-white mb-6">Project Gallery</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {caseStudy.gallery_images.map((image, index) => (
                                            <div key={index} className="relative group/img overflow-hidden rounded-xl">
                                                <div className="absolute -inset-px bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] rounded-xl opacity-0 group-hover/img:opacity-30 blur transition-opacity"></div>
                                                <img
                                                    src={image}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="relative w-full h-auto rounded-xl border border-white/10"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Client Testimonial */}
                        {caseStudy.testimonial && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-[#00FFFF]/10 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-[#00FFFF]/30 rounded-2xl p-8">
                                    <Quote className="w-12 h-12 text-[#00FFFF]/20 mb-4" />
                                    <blockquote className="text-xl text-white/90 italic leading-relaxed mb-6">
                                        "{caseStudy.testimonial}"
                                    </blockquote>

                                    {(caseStudy.testimonial_author || caseStudy.testimonial_role) && (
                                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#DD00FF] flex items-center justify-center overflow-hidden relative">
                                                {caseStudy.testimonial_avatar ? (
                                                    <img
                                                        src={caseStudy.testimonial_avatar}
                                                        alt={caseStudy.testimonial_author}
                                                        className="w-full h-full object-cover border-2 border-[#00FFFF]/30"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-xl font-black text-white">
                                                        {caseStudy.testimonial_author?.charAt(0) || 'C'}
                                                    </span>
                                                )}
                                                {/* Fallback for image error */}
                                                <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#00FFFF] to-[#DD00FF]">
                                                    <span className="text-xl font-black text-white">
                                                        {caseStudy.testimonial_author?.charAt(0) || 'C'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                {caseStudy.testimonial_author && (
                                                    <p className="font-black text-white">{caseStudy.testimonial_author}</p>
                                                )}
                                                {caseStudy.testimonial_role && (
                                                    <p className="text-sm text-white/60">{caseStudy.testimonial_role}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Technologies */}
                        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-black text-white mb-4">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-[#00FFFF]/20 to-[#DD00FF]/20 border border-[#00FFFF]/30 rounded-lg text-xs font-bold text-[#00FFFF]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Project Details */}
                        <div className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                            <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-black text-white mb-4">Project Details</h3>

                                <div className="space-y-4">
                                    {caseStudy.client_name && (
                                        <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                                            <Building2 className="w-5 h-5 text-[#00FFFF] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-white/60 mb-1">Client</p>
                                                <p className="font-bold text-white">{caseStudy.client_name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.project_duration && (
                                        <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                                            <Clock className="w-5 h-5 text-[#DD00FF] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-white/60 mb-1">Duration</p>
                                                <p className="font-bold text-white">{caseStudy.project_duration}</p>
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.team_size && (
                                        <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                                            <Users className="w-5 h-5 text-[#FF0099] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-white/60 mb-1">Team Size</p>
                                                <p className="font-bold text-white">{caseStudy.team_size} members</p>
                                            </div>
                                        </div>
                                    )}

                                    {caseStudy.budget_range && (
                                        <div className="flex items-start gap-3">
                                            <DollarSign className="w-5 h-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-white/60 mb-1">Budget</p>
                                                <p className="font-bold text-white">{caseStudy.budget_range}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Project Links */}
                        {(caseStudy.project_url || caseStudy.github_url) && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-black text-white mb-4">Project Links</h3>

                                    <div className="space-y-3">
                                        {caseStudy.project_url && (
                                            <a
                                                href={caseStudy.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-lg text-white/80 hover:border-[#00FFFF] hover:text-white transition-all group"
                                            >
                                                <Globe className="w-5 h-5 text-[#00FFFF]" />
                                                <span className="flex-1 font-bold">View Live Site</span>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        )}

                                        {caseStudy.github_url && (
                                            <a
                                                href={caseStudy.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-lg text-white/80 hover:border-[#DD00FF] hover:text-white transition-all group"
                                            >
                                                <Github className="w-5 h-5 text-white/60" />
                                                <span className="flex-1 font-bold">View on GitHub</span>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Services */}
                        {caseStudy.services && caseStudy.services.length > 0 && (
                            <div className="relative group">
                                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg"></div>
                                <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-black text-white mb-4">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.services.map((service, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-xs text-white/70 hover:border-[#DD00FF]/50 hover:text-white transition-all cursor-pointer"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Case Studies */}
                {relatedStudies.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-6 h-6 text-[#DD00FF]" />
                            <h2 className="text-3xl font-black text-white">Related Case Studies</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedStudies.map((study) => (
                                <Link key={study.id} to={`/case-studies/${study.slug}`}>
                                    <div className="relative group h-full">
                                        <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 group-hover:border-[#DD00FF]/30 rounded-2xl overflow-hidden h-full transition-all">
                                            {study.featured_image && (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={study.featured_image}
                                                        alt={study.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                {study.project_type && (
                                                    <span className="inline-block px-3 py-1 bg-[#00FFFF]/20 border border-[#00FFFF]/30 rounded-lg text-xs font-bold text-[#00FFFF] mb-3">
                                                        {study.project_type}
                                                    </span>
                                                )}
                                                <h3 className="font-black text-white mb-2 line-clamp-2 group-hover:text-[#00FFFF] transition-colors">
                                                    {study.title}
                                                </h3>
                                                {study.client_name && (
                                                    <p className="text-sm text-white/60 mb-3">{study.client_name}</p>
                                                )}
                                                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                                                    {study.summary}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-white/40">
                                                    {study.project_duration && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {study.project_duration}
                                                        </span>
                                                    )}
                                                    {study.team_size && (
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            {study.team_size} members
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-20">
                    <div className="relative group">
                        <div className="absolute -inset-px bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] rounded-2xl blur-xl opacity-30"></div>
                        <div className="relative bg-[#0B0D14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl font-black text-white mb-4">
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                                Let's discuss how we can help you achieve similar results for your business.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link to="/contact">
                                    <button className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/20 transition-all">
                                        Get Started
                                    </button>
                                </Link>
                                <Link to="/case-studies">
                                    <button className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:border-[#00FFFF] transition-all">
                                        View More Cases
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
