import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Trash2,
    Eye,
    Calendar,
    Clock,
    Github,
    Globe,
    Plus,
    X,
    Target,
    Zap,
    Award,
    CheckCircle,
    Star,
    Heart,
    Share2,
    ExternalLink,
    Loader2,
    LayoutGrid
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { ConfirmationModal } from '../src/components/ui/ConfirmationModal';

interface ProjectData {
    id: string;
    title: string;
    slug: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string;
    project_type: string;
    services: string[];
    client_name: string;
    completion_date: string;
    project_duration: string;
    team_size: string;
    status: 'draft' | 'published' | 'archived';
    featured_image: string;
    gallery_images: string[];
    project_url: string;
    github_url: string;
    technologies: string[];
    testimonial: string;
    testimonial_author: string;
    testimonial_role: string;
    views: number;
    likes: number;
    is_featured: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}

const categories = [
    'Web Development',
    'Mobile Apps',
    'AI/ML',
    'Blockchain',
    'Cloud Solutions',
    'Cybersecurity',
    'IoT',
    'DevOps',
    'E-commerce',
    'Healthcare',
    'Fintech',
    'Other'
];

const techOptions = [
    'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python',
    'TensorFlow', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'Docker',
    'Kubernetes', 'React Native', 'Flutter', 'Swift', 'Kotlin',
    'Solidity', 'Ethereum', 'Blockchain', 'Machine Learning', 'AI',
    'GraphQL', 'TypeScript', 'JavaScript', 'PHP', 'Laravel'
];

export default function AdminPortfolioDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        action: () => Promise<void>;
    }>({
        isOpen: false,
        title: '',
        message: '',
        action: async () => { },
    });

    const [formData, setFormData] = useState<ProjectData>({
        id: '',
        title: '',
        slug: '',
        summary: '',
        challenge: '',
        solution: '',
        results: '',
        project_type: '',
        services: [],
        client_name: '',
        completion_date: '',
        project_duration: '',
        team_size: '',
        status: 'draft',
        featured_image: '',
        gallery_images: [],
        project_url: '',
        github_url: '',
        technologies: [],
        testimonial: '',
        testimonial_author: '',
        testimonial_role: '',
        views: 0,
        likes: 0,
        is_featured: false,
        display_order: 0,
        created_at: '',
        updated_at: ''
    });

    const [newService, setNewService] = useState('');
    const [newGalleryImage, setNewGalleryImage] = useState('');

    useEffect(() => {
        if (!isNew && id) {
            fetchProject();
        }
    }, [id, isNew]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('case_studies')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    id: data.id || '',
                    title: data.title || '',
                    slug: data.slug || '',
                    summary: data.summary || '',
                    challenge: data.challenge || '',
                    solution: data.solution || '',
                    results: data.results || '',
                    project_type: data.project_type || '',
                    services: Array.isArray(data.services) ? data.services : [],
                    client_name: data.client_name || '',
                    completion_date: data.completion_date || '',
                    project_duration: data.project_duration || '',
                    team_size: data.team_size || '',
                    status: data.status || 'draft',
                    featured_image: data.featured_image || '',
                    gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : [],
                    project_url: data.project_url || '',
                    github_url: data.github_url || '',
                    technologies: Array.isArray(data.technologies) ? data.technologies : [],
                    testimonial: data.testimonial || '',
                    testimonial_author: data.testimonial_author || '',
                    testimonial_role: data.testimonial_role || '',
                    views: data.views || 0,
                    likes: data.likes || 0,
                    is_featured: data.is_featured || false,
                    display_order: data.display_order || 0,
                    created_at: data.created_at || '',
                    updated_at: data.updated_at || ''
                });
            }
        } catch (error: any) {
            console.error('Error fetching project:', error);
            toast.error(error.message || 'Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title.trim()) {
            toast.error('Please enter a project title');
            return;
        }

        toast.promise(
            (async () => {
                const dataToSave = {
                    ...formData,
                    completion_date: formData.completion_date || null,
                    updated_at: new Date().toISOString()
                };

                const { id: _, created_at: __, ...updateData } = dataToSave;

                let result;
                if (isNew) {
                    result = await supabase
                        .from('case_studies')
                        .insert([{ ...updateData, created_at: new Date().toISOString() }])
                        .select()
                        .single();
                } else {
                    result = await supabase
                        .from('case_studies')
                        .update(updateData)
                        .eq('id', id)
                        .select()
                        .single();
                }

                if (result.error) throw result.error;

                if (isNew && result.data) {
                    navigate(`/admin/portfolio/${result.data.id}`);
                } else {
                    fetchProject();
                }
            })(),
            {
                loading: 'Saving project...',
                success: isNew ? 'Project created successfully!' : 'Project updated successfully!',
                error: (err: any) => err.message || 'Failed to save project',
            }
        );
    };

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Project',
            message: 'Are you sure you want to delete this project? This action cannot be undone.',
            action: async () => {
                toast.promise(
                    (async () => {
                        const { error } = await supabase
                            .from('case_studies')
                            .delete()
                            .eq('id', id);

                        if (error) throw error;
                        navigate('/admin/portfolio');
                    })(),
                    {
                        loading: 'Deleting project...',
                        success: 'Project deleted successfully!',
                        error: (err: any) => err.message || 'Failed to delete project',
                    }
                );
            },
        });
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: isNew ? generateSlug(title) : prev.slug
        }));
    };

    const addService = () => {
        if (newService.trim() && !formData.services.includes(newService.trim())) {
            setFormData(prev => ({
                ...prev,
                services: [...prev.services, newService.trim()]
            }));
            setNewService('');
        }
    };

    const removeService = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter(s => s !== service)
        }));
    };

    const addGalleryImage = () => {
        if (newGalleryImage.trim() && !formData.gallery_images.includes(newGalleryImage.trim())) {
            setFormData(prev => ({
                ...prev,
                gallery_images: [...prev.gallery_images, newGalleryImage.trim()]
            }));
            setNewGalleryImage('');
        }
    };

    const removeGalleryImage = (imageUrl: string) => {
        setFormData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.filter(img => img !== imageUrl)
        }));
    };

    const toggleTechnology = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.includes(tech)
                ? prev.technologies.filter(t => t !== tech)
                : [...prev.technologies, tech]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05060A] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#00FFFF] animate-spin mx-auto mb-4" />
                    <p className="text-white/60 font-black tracking-widest uppercase">Loading Project...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05060A] pt-24 pb-20 relative overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#DD00FF] rounded-full blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#00FFFF] rounded-full blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <Link to="/admin/portfolio">
                                <button className="p-2.5 bg-white/5 hover:bg-white/10 border-2 border-white/10 rounded-xl transition-all hover:border-[#00FFFF]/50 group">
                                    <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-[#00FFFF]" />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-black text-white">
                                    {isNew ? 'New Portfolio Project' : 'Edit Project'}
                                </h1>
                                <p className="text-white/60 font-bold uppercase tracking-wider text-xs mt-1">
                                    {isNew ? 'Create a new showcase' : `ID: ${formData.id}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {!isNew && (
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/20 transition-all font-black"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                </button>
                            )}

                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-black rounded-xl hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                <span>Save Project</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {!isNew && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#00FFFF]"></div>
                                <div className="flex items-center justify-between mb-2">
                                    <Eye className="w-5 h-5 text-[#00FFFF]" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Views</span>
                                </div>
                                <div className="text-2xl font-black text-white">{formData.views.toLocaleString()}</div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF0099]"></div>
                                <div className="flex items-center justify-between mb-2">
                                    <Heart className="w-5 h-5 text-[#FF0099]" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Likes</span>
                                </div>
                                <div className="text-2xl font-black text-white">{(formData.likes || 0).toLocaleString()}</div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#DD00FF]"></div>
                                <div className="flex items-center justify-between mb-2">
                                    <Star className="w-5 h-5 text-[#DD00FF]" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Featured</span>
                                </div>
                                <div className="text-2xl font-black text-white">{formData.is_featured ? 'YES' : 'NO'}</div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF9D]"></div>
                                <div className="flex items-center justify-between mb-2">
                                    <CheckCircle className="w-5 h-5 text-[#00FF9D]" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Status</span>
                                </div>
                                <div className="text-2xl font-black text-white uppercase">{formData.status}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Information */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <LayoutGrid className="w-6 h-6 text-[#00FFFF]" />
                                Basic Information
                            </h2>

                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="e.g., AI-Powered Logistics Optimization"
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                        URL Slug
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/30 font-bold">/portfolio/</span>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                            placeholder="project-slug"
                                            className="flex-1 px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                {/* Summary */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                        Summary / Short Description *
                                    </label>
                                    <textarea
                                        value={formData.summary}
                                        onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                                        placeholder="A high-impact summary of the project..."
                                        rows={4}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold resize-none"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.project_type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_type: e.target.value }))}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold appearance-none"
                                    >
                                        <option value="" className="bg-[#0B0D14]">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className="bg-[#0B0D14]">{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Case Study Sections */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <Target className="w-6 h-6 text-[#FF0099]" />
                                Case Study Details
                            </h2>

                            <div className="space-y-8">
                                {/* Challenges */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Target className="w-4 h-4 text-[#FF0099]" />
                                        The Challenge
                                    </label>
                                    <textarea
                                        value={formData.challenge}
                                        onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                                        placeholder="What was the main problem?"
                                        rows={5}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#FF0099]/50 focus:outline-none transition-all font-bold resize-none"
                                    />
                                </div>

                                {/* Solutions */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-[#00FFFF]" />
                                        Our Solution
                                    </label>
                                    <textarea
                                        value={formData.solution}
                                        onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                                        placeholder="How did we solve it? (Supports HTML)"
                                        rows={8}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold resize-none font-mono text-sm"
                                    />
                                </div>

                                {/* Results */}
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Award className="w-4 h-4 text-[#DD00FF]" />
                                        The Results
                                    </label>
                                    <textarea
                                        value={formData.results}
                                        onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                                        placeholder="What was the impact?"
                                        rows={5}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#DD00FF]/50 focus:outline-none transition-all font-bold resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gradient-to-br from-[#00FFFF]/5 to-[#DD00FF]/5 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <Share2 className="w-6 h-6 text-[#00FFFF]" />
                                Client Testimonial
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                        Testimonial Text
                                    </label>
                                    <textarea
                                        value={formData.testimonial}
                                        onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                                        placeholder="What did the client say?"
                                        rows={4}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold resize-none italic"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                            Author Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.testimonial_author}
                                            onChange={(e) => setFormData(prev => ({ ...prev, testimonial_author: e.target.value }))}
                                            placeholder="e.g., Sarah Johnson"
                                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-black text-white/60 mb-2 uppercase tracking-wider">
                                            Author Role
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.testimonial_role}
                                            onChange={(e) => setFormData(prev => ({ ...prev, testimonial_role: e.target.value }))}
                                            placeholder="e.g., CTO at TechCorp"
                                            className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <LayoutGrid className="w-6 h-6 text-[#DD00FF]" />
                                Project Gallery
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={newGalleryImage}
                                        onChange={(e) => setNewGalleryImage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addGalleryImage()}
                                        placeholder="Paste image URL..."
                                        className="flex-1 px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#DD00FF]/50 focus:outline-none transition-all font-bold"
                                    />
                                    <button
                                        onClick={addGalleryImage}
                                        className="px-6 py-4 bg-[#DD00FF] text-white font-black rounded-2xl hover:shadow-[0_0_20px_rgba(221,0,255,0.4)] transition-all"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {formData.gallery_images.map((img, idx) => (
                                        <div key={idx} className="relative group rounded-2xl overflow-hidden border-2 border-white/10 aspect-video">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeGalleryImage(img)}
                                                className="absolute top-2 right-2 p-2 bg-red-500 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.gallery_images.length === 0 && (
                                        <div className="col-span-full py-12 text-center border-2 border-dashed border-white/10 rounded-2xl text-white/20 font-black uppercase tracking-widest">
                                            No Gallery Images
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Metadata */}
                    <div className="space-y-8">
                        {/* Status & Visibility */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Status & Visibility</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold appearance-none"
                                    >
                                        <option value="draft" className="bg-[#0B0D14]">Draft</option>
                                        <option value="published" className="bg-[#0B0D14]">Published</option>
                                        <option value="archived" className="bg-[#0B0D14]">Archived</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 border-2 border-white/10 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <Star className={`w-5 h-5 ${formData.is_featured ? 'text-[#FFD700] fill-[#FFD700]' : 'text-white/20'}`} />
                                        <span className="font-black text-white">Featured Project</span>
                                    </div>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, is_featured: !prev.is_featured }))}
                                        className={`w-12 h-6 rounded-full transition-all relative ${formData.is_featured ? 'bg-[#00FFFF]' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.display_order}
                                        onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Project Info</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Client Name</label>
                                    <input
                                        type="text"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                        placeholder="e.g., Global Tech"
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Completion Date</label>
                                    <input
                                        type="date"
                                        value={formData.completion_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.project_duration}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_duration: e.target.value }))}
                                        placeholder="e.g., 6 Months"
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest">Team Size</label>
                                    <input
                                        type="text"
                                        value={formData.team_size}
                                        onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                                        placeholder="e.g., 5 Developers"
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Featured Image</h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={formData.featured_image}
                                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                                    placeholder="Paste main image URL..."
                                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                />
                                {formData.featured_image && (
                                    <div className="rounded-2xl overflow-hidden border-2 border-white/10 aspect-video">
                                        <img src={formData.featured_image} alt="Featured" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Project Links</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest flex items-center gap-2">
                                        <Globe className="w-3 h-3 text-[#00FFFF]" />
                                        Live URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.project_url}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-widest flex items-center gap-2">
                                        <Github className="w-3 h-3 text-white/60" />
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                                        placeholder="https://github.com/..."
                                        className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Technologies</h2>

                            <div className="flex flex-wrap gap-2">
                                {techOptions.map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => toggleTechnology(tech)}
                                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all border-2 ${formData.technologies.includes(tech)
                                            ? 'bg-[#00FFFF]/20 border-[#00FFFF] text-[#00FFFF]'
                                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                                            }`}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Services/Tags */}
                        <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8">
                            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider text-sm">Services Provided</h2>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newService}
                                        onChange={(e) => setNewService(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addService()}
                                        placeholder="Add service..."
                                        className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:border-[#00FFFF]/50 focus:outline-none transition-all font-bold text-sm"
                                    />
                                    <button
                                        onClick={addService}
                                        className="p-3 bg-[#00FFFF] text-black font-black rounded-xl hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {formData.services.map(service => (
                                        <span
                                            key={service}
                                            className="px-3 py-1.5 bg-white/5 border-2 border-white/10 rounded-xl text-xs font-black text-white/70 flex items-center gap-2"
                                        >
                                            {service}
                                            <button onClick={() => removeService(service)} className="hover:text-red-400">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-12 pt-8 border-t-2 border-white/10 flex items-center justify-between">
                    <Link to="/admin/portfolio">
                        <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white/70 hover:border-[#00FFFF] hover:text-white transition-all font-black">
                            <X className="w-5 h-5" />
                            Cancel Changes
                        </button>
                    </Link>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-[#00FFFF] to-[#DD00FF] text-white font-black rounded-2xl hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all disabled:opacity-50"
                    >
                        <Save className="w-6 h-6" />
                        <span>Save Project</span>
                    </button>
                </div>
            </div>
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
                variant="danger"
            />
        </div>
    );
}
