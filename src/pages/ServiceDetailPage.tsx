import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    Brain, Zap, TrendingUp, Shield, Code, Sparkles, ArrowRight, CheckCircle2,
    Star, Users, Trophy, Target, Boxes, Network, Cpu, GitBranch, Database,
    CloudCog, Rocket, Eye, MessageSquare, BarChart3, Play, FileCode, Bot, Globe,
    Loader2, Smartphone, Cloud, Gamepad2, Link as LinkIcon, Server, Layers,
    Layout, Activity, Lock
} from 'lucide-react';

// Map icons string names to Lucide components
const iconMap: { [key: string]: any } = {
    Brain, Zap, TrendingUp, Shield, Code, Sparkles, ArrowRight, CheckCircle2,
    Star, Users, Trophy, Target, Boxes, Network, Cpu, GitBranch, Database,
    CloudCog, Rocket, Eye, MessageSquare, BarChart3, Play, FileCode, Bot, Globe,
    Smartphone, Cloud, Gamepad2, 'link': LinkIcon, Server, Layers, Layout, Activity, Lock,
    'brain-circuit': Brain, 'shield-check': Shield, 'database': Database, 'building': Boxes,
    'palette': Layout, 'gamepad': Gamepad2, 'zap': Zap, 'smartphone': Smartphone, 'cloud': Cloud
};

interface ServiceData {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    short_description: string;
    full_description: string;
    icon: string;
    color: string;
    features: string[];
    technologies: string[];
    use_cases: string[];
    process_steps: any;
    case_study_ids: string[];
    success_rate: number;
    projects_completed: number;
}

interface CaseStudy {
    id: string;
    title: string;
    client_name: string;
    summary: string;
    technologies: string[];
    slug: string;
    success_metrics: any;
}

export function ServiceDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceData | null>(null);
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchServiceData() {
            if (!slug) return;

            try {
                setLoading(true);
                setError(null);

                // Fetch service details
                const { data: serviceData, error: serviceError } = await supabase
                    .from('services')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (serviceError) throw serviceError;
                if (!serviceData) throw new Error('Service not found');

                setService(serviceData);

                // Fetch related case studies if any
                if (serviceData.case_study_ids && serviceData.case_study_ids.length > 0) {
                    const { data: studiesData, error: studiesError } = await supabase
                        .from('case_studies')
                        .select('id, title, client_name, summary, technologies, slug, success_metrics')
                        .in('id', serviceData.case_study_ids)
                        .eq('status', 'published')
                        .limit(3);

                    if (!studiesError && studiesData) {
                        setCaseStudies(studiesData);
                    }
                } else {
                    // Fallback: fetch case studies that match the service name in their services array or project_type
                    const { data: studiesData, error: studiesError } = await supabase
                        .from('case_studies')
                        .select('id, title, client_name, summary, technologies, slug, success_metrics')
                        .eq('status', 'published')
                        .contains('services', [serviceData.name])
                        .limit(3);

                    if (!studiesError && studiesData) {
                        setCaseStudies(studiesData);
                    }
                }

            } catch (err: any) {
                console.error('Error fetching service:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchServiceData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                <p className="text-white/60 mb-8">The service you are looking for does not exist or has been moved.</p>
                <Link
                    to="/services"
                    className="px-6 py-3 bg-violet-600 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
                >
                    Back to Services
                </Link>
            </div>
        );
    }

    const ServiceIcon = iconMap[service.icon] || Sparkles;
    const themeColor = service.color || '#8B5CF6'; // Default to violet if no color

    // Parse process steps
    const processSteps = Array.isArray(service.process_steps)
        ? service.process_steps
        : typeof service.process_steps === 'object' && service.process_steps !== null
            ? Object.entries(service.process_steps)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([key, val]: [string, any]) => ({
                    step: val.title || `Step ${key}`,
                    description: val.description,
                    title: val.title || `Step ${key}`
                }))
            : [];

    // Format process steps for display
    const formattedProcess = processSteps.map((step: any, index: number) => ({
        step: `0${index + 1}`,
        title: step.title || step.step,
        description: step.description || step.desc
    }));

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
                        style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
                    ></div>
                    <div
                        className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
                        style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
                    ></div>
                </div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 border rounded-full backdrop-blur-md mb-6"
                            style={{
                                borderColor: `${themeColor}33`,
                                background: `linear-gradient(to right, ${themeColor}1a, ${themeColor}0d)`
                            }}
                        >
                            <ServiceIcon className="w-4 h-4" style={{ color: themeColor }} />
                            <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">{service.name}</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {service.tagline || service.name}
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
                            {service.full_description || service.short_description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                                style={{
                                    background: `linear-gradient(to right, ${themeColor}, ${themeColor}dd)`,
                                    boxShadow: `0 20px 40px ${themeColor}4d`
                                }}
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                                <span className="relative text-white font-semibold">Start Your Project</span>
                                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/case-studies"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0"
                                style={{ borderColor: `${themeColor}4d` }}
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                <Play className="relative w-5 h-5 text-white/80 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                                <span className="relative text-white/80 group-hover:text-white font-semibold transition-colors duration-300">View Case Studies</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 md:gap-8 mt-16 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{service.projects_completed}+</div>
                                <div className="text-sm text-white/60">Projects Delivered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{service.success_rate}%</div>
                                <div className="text-sm text-white/60">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                                <div className="text-sm text-white/60">Happy Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities/Features Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14] relative">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
                    <div className="text-center mb-12 md:mb-16">
                        <div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 border rounded-full backdrop-blur-md mb-6"
                            style={{
                                borderColor: `${themeColor}33`,
                                background: `linear-gradient(to right, ${themeColor}1a, ${themeColor}0d)`
                            }}
                        >
                            <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
                            <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Comprehensive{' '}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                {service.name}
                            </span>{' '}
                            Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {service.features && service.features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.05] rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500"
                                style={{
                                    borderColor: 'rgba(255,255,255,0.05)',
                                }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute -inset-2 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"
                                    style={{ background: `linear-gradient(to bottom right, ${themeColor}33, transparent)` }}
                                ></div>

                                <div className="relative">
                                    {/* Icon */}
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"
                                        style={{ background: `linear-gradient(to bottom right, ${themeColor}, ${themeColor}aa)` }}
                                    >
                                        <CheckCircle2 className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[var(--text-primary)] transition-colors duration-500"
                                    >
                                        {feature}
                                    </h3>

                                    {/* Description - using generic description since DB only has feature strings */}
                                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                                        Professional {feature.toLowerCase()} services designed to scale with your business needs.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-16 md:py-24 bg-[#0A0A14] relative overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[160px] opacity-10"
                        style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
                    ></div>
                </div>

                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Powered By The{' '}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                Best Technologies
                            </span>
                        </h2>
                        <p className="text-white/60">Industry-leading frameworks and platforms we use</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {service.technologies && service.technologies.map((tech, index) => (
                            <div
                                key={index}
                                className="group p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] transition-all duration-300 text-center"
                                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                            >
                                <div className="text-white font-semibold mb-1">{tech}</div>
                                <div className="text-xs text-white/50">Technology</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Our{' '}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                Development Process
                            </span>
                        </h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            A proven methodology that turns your requirements into reality
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {formattedProcess.map((phase, index) => (
                            <div key={index} className="relative group">
                                {/* Connection line */}
                                {index < formattedProcess.length - 1 && (
                                    <div
                                        className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r to-transparent"
                                        style={{ from: `${themeColor}4d` }}
                                    ></div>
                                )}

                                <div
                                    className="relative p-6 bg-white/[0.02] border-2 rounded-xl hover:bg-white/[0.04] transition-all duration-500 h-full"
                                    style={{ borderColor: `${themeColor}33` }}
                                >
                                    {/* Step number */}
                                    <div
                                        className="text-6xl font-bold mb-4 opacity-20"
                                        style={{ color: themeColor }}
                                    >
                                        {phase.step}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases / Industries Section */}
            {service.use_cases && service.use_cases.length > 0 && (
                <section className="py-16 md:py-24 bg-[#0A0A14]">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Industries &{' '}
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                    Use Cases
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.use_cases.map((useCase, index) => (
                                <div
                                    key={index}
                                    className="group p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] transition-all duration-300"
                                >
                                    <Target className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ color: themeColor }} />
                                    <h3 className="text-lg font-bold text-white mb-2">{useCase}</h3>
                                    <p className="text-sm text-white/60">Tailored solutions for {useCase} applications.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Case Studies Section */}
            {caseStudies.length > 0 && (
                <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                Real Results,{' '}
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                    Real Impact
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {caseStudies.map((study, index) => (
                                <Link
                                    to={`/case-studies/${study.slug}`}
                                    key={index}
                                    className="group p-6 md:p-8 bg-white/[0.02] border-2 rounded-2xl hover:bg-white/[0.04] transition-all duration-500 block"
                                    style={{ borderColor: `${themeColor}33` }}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <Trophy className="w-5 h-5" style={{ color: themeColor }} />
                                        <span className="text-xl font-bold text-white">
                                            {study.success_metrics ? Object.values(study.success_metrics)[0] as string : 'Success Story'}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--text-primary)] transition-colors">{study.title}</h3>
                                    <p className="text-sm text-white/50 mb-4">{study.client_name}</p>
                                    <p className="text-sm text-white/70 mb-6 line-clamp-3">{study.summary}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {study.technologies && study.technologies.slice(0, 3).map((tech, tIndex) => (
                                            <span
                                                key={tIndex}
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                to="/case-studies"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0"
                                style={{ borderColor: `${themeColor}4d` }}
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View All Case Studies</span>
                                <ArrowRight className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
                        style={{ background: `radial-gradient(circle, ${themeColor}, transparent)` }}
                    ></div>
                </div>

                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to Build the Future with{' '}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #fff)` }}>
                                {service.name}?
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                            Let's discuss how our {service.name.toLowerCase()} services can transform your business.
                            Our experts are ready to turn your vision into reality.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                                style={{
                                    background: `linear-gradient(to right, ${themeColor}, ${themeColor}dd)`,
                                    boxShadow: `0 20px 40px ${themeColor}4d`
                                }}
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                                <span className="relative text-white font-semibold">Get Started Today</span>
                                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/services"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 active:translate-y-0"
                                style={{ borderColor: `${themeColor}4d` }}
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">Explore All Services</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
