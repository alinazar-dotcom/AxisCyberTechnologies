'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CaseStudy } from '../../hooks/useCaseStudies';
import { Loader2, X, Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface CaseStudyFormModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CaseStudyFormModal({ caseStudy, isOpen, onClose, onSuccess }: CaseStudyFormModalProps) {
  const isEdit = !!caseStudy;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client_name: '',
    client_logo_url: '',
    client_industry: '',
    project_description: '',
    challenge: '',
    solution: '',
    results: '',
    featured_image_url: '',
    gallery_images: [] as string[],
    technologies: [] as string[],
    team_size: [] as string[],
    services_provided: [] as string[],
    metrics: [] as { label: string; value: string }[],
    project_duration: '',
    project_url: '',
    repository_url: '',
    testimonial_id: '',
    status: 'draft' as 'draft' | 'published',
    featured: false,
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newService, setNewService] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [newMetric, setNewMetric] = useState({ label: '', value: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Load case study data if editing
  useEffect(() => {
    if (caseStudy) {
      setFormData({
        title: caseStudy.title || '',
        slug: caseStudy.slug || '',
        client_name: caseStudy.client_name || '',
        client_logo_url: caseStudy.client_logo_url || '',
        client_industry: caseStudy.client_industry || '',
        project_description: caseStudy.project_description || '',
        challenge: caseStudy.challenge || '',
        solution: caseStudy.solution || '',
        results: caseStudy.results || '',
        featured_image_url: caseStudy.featured_image_url || '',
        gallery_images: caseStudy.gallery_images || [],
        technologies: caseStudy.technologies || [],
        team_size: Array.isArray(caseStudy.team_size)
          ? (caseStudy.team_size as unknown as string[])
          : (caseStudy.team_size ? String(caseStudy.team_size).split(',').map(s => s.trim()).filter(Boolean) : []),
        services_provided: caseStudy.services_provided || [],
        metrics: caseStudy.metrics || [],
        project_duration: caseStudy.project_duration || '',
        project_url: caseStudy.project_url || '',
        repository_url: caseStudy.repository_url || '',
        testimonial_id: caseStudy.testimonial_id || '',
        status: caseStudy.status || 'draft',
        featured: caseStudy.featured || false,
      });
    } else {
      // Reset form for new case study
      setFormData({
        title: '',
        slug: '',
        client_name: '',
        client_logo_url: '',
        client_industry: '',
        project_description: '',
        challenge: '',
        solution: '',
        results: '',
        featured_image_url: '',
        gallery_images: [],
        technologies: [],
        team_size: [],
        services_provided: [],
        metrics: [],
        project_duration: '',
        project_url: '',
        repository_url: '',
        testimonial_id: '',
        status: 'draft',
        featured: false,
      });
    }
    setErrors({});
  }, [caseStudy, isOpen]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Client name is required';
    }
    if (!formData.client_industry.trim()) {
      newErrors.client_industry = 'Client industry is required';
    }
    if (!formData.project_description.trim()) {
      newErrors.project_description = 'Project description is required';
    }
    if (!formData.challenge.trim()) {
      newErrors.challenge = 'Challenge is required';
    }
    if (!formData.solution.trim()) {
      newErrors.solution = 'Solution is required';
    }
    if (!formData.results.trim()) {
      newErrors.results = 'Results are required';
    }
    if (!formData.project_duration.trim()) {
      newErrors.project_duration = 'Project duration is required';
    }
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    try {
      const metricsObject = formData.metrics.reduce<Record<string, string>>((acc, metric) => {
        const label = metric.label?.trim();
        if (label) {
          acc[label] = metric.value || '';
        }
        return acc;
      }, {});

      const dataToSave = {
        title: formData.title,
        slug: formData.slug,
        client_name: formData.client_name,
        client_logo: formData.client_logo_url || null,
        client_industry: formData.client_industry,
        summary: formData.project_description,
        challenge: formData.challenge,
        solution: formData.solution,
        results: formData.results,
        featured_image: formData.featured_image_url || null,
        gallery_images: formData.gallery_images,
        technologies: formData.technologies,
        team_size: formData.team_size.join(', ') || null,
        services: formData.services_provided,
        success_metrics: metricsObject,
        project_duration: formData.project_duration,
        project_url: formData.project_url || null,
        github_url: formData.repository_url || null,
        status: formData.status,
        is_featured: formData.featured,
      };

      let response;

      if (isEdit) {
        response = await supabase
          .from('case_studies')
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq('id', caseStudy!.id);
      } else {
        response = await supabase
          .from('case_studies')
          .insert([{
            ...dataToSave,
            display_order: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);
      }

      if (response.error) {
        console.error('Case study save error:', response.error);
        const message = response.error.message || 'Failed to save case study';
        setErrors({ submit: message });
        toast.error(message);
        return;
      }

      toast.success(isEdit ? 'Case study updated successfully!' : 'Case study created successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      const message = error.message || 'An error occurred';
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      });
      setNewTechnology('');
      if (errors.technologies) {
        setErrors({ ...errors, technologies: '' });
      }
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    });
  };

  const addService = () => {
    if (newService.trim() && !formData.services_provided.includes(newService.trim())) {
      setFormData({
        ...formData,
        services_provided: [...formData.services_provided, newService.trim()],
      });
      setNewService('');
    }
  };

  const removeService = (service: string) => {
    setFormData({
      ...formData,
      services_provided: formData.services_provided.filter(s => s !== service),
    });
  };

  const addTeamMember = () => {
    if (newTeamMember.trim() && !formData.team_size.includes(newTeamMember.trim())) {
      setFormData({
        ...formData,
        team_size: [...formData.team_size, newTeamMember.trim()],
      });
      setNewTeamMember('');
    }
  };

  const removeTeamMember = (member: string) => {
    setFormData({
      ...formData,
      team_size: formData.team_size.filter(m => m !== member),
    });
  };

  const addGalleryImage = () => {
    if (newGalleryImage.trim() && !formData.gallery_images.includes(newGalleryImage.trim())) {
      setFormData({
        ...formData,
        gallery_images: [...formData.gallery_images, newGalleryImage.trim()],
      });
      setNewGalleryImage('');
    }
  };

  const removeGalleryImage = (url: string) => {
    setFormData({
      ...formData,
      gallery_images: formData.gallery_images.filter(img => img !== url),
    });
  };

  const addMetric = () => {
    if (newMetric.label.trim() && newMetric.value.trim()) {
      setFormData({
        ...formData,
        metrics: [...formData.metrics, { ...newMetric }],
      });
      setNewMetric({ label: '', value: '' });
    }
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Case Study' : 'Create New Case Study'}
      size="2xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={saving} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="case-study-form" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Case Study' : 'Create Case Study'}</>
            )}
          </Button>
        </div>
      }
    >
      <form id="case-study-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
            {errors.submit}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Basic Information</h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-commerce Platform for Fashion Retailer"
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm">/case-studies/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="url-friendly-slug"
                className={`flex-1 px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
            </div>
            {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                placeholder="e.g., TechCorp Inc."
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.client_name ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.client_name && <p className="mt-1 text-sm text-red-400">{errors.client_name}</p>}
            </div>

            {/* Client Industry */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Client Industry *
              </label>
              <input
                type="text"
                value={formData.client_industry}
                onChange={(e) => setFormData({ ...formData, client_industry: e.target.value })}
                placeholder="e.g., E-commerce, Healthcare, Finance"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.client_industry ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.client_industry && <p className="mt-1 text-sm text-red-400">{errors.client_industry}</p>}
            </div>
          </div>

          {/* Client Logo URL */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Client Logo URL (Optional)
            </label>
            <input
              type="url"
              value={formData.client_logo_url}
              onChange={(e) => setFormData({ ...formData, client_logo_url: e.target.value })}
              placeholder="Paste logo URL from Media Library"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
          </div>

          {/* Project Duration */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Project Duration *
            </label>
            <input
              type="text"
              value={formData.project_duration}
              onChange={(e) => setFormData({ ...formData, project_duration: e.target.value })}
              placeholder="e.g., 3 months, 6 weeks, 1 year"
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.project_duration ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.project_duration && <p className="mt-1 text-sm text-red-400">{errors.project_duration}</p>}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Project Details</h3>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Project Description *
            </label>
            <textarea
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
              placeholder="Brief overview of the project (2-3 sentences)"
              rows={3}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.project_description ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.project_description && <p className="mt-1 text-sm text-red-400">{errors.project_description}</p>}
          </div>

          {/* Challenge */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Challenge *
            </label>
            <textarea
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="What problem or challenge did the client face?"
              rows={4}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.challenge ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.challenge && <p className="mt-1 text-sm text-red-400">{errors.challenge}</p>}
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Solution *
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="How did you solve the problem? What approach did you take?"
              rows={4}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.solution ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.solution && <p className="mt-1 text-sm text-red-400">{errors.solution}</p>}
          </div>

          {/* Results */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Results *
            </label>
            <textarea
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              placeholder="What were the outcomes? Impact on the client's business?"
              rows={4}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none resize-none transition-colors ${errors.results ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.results && <p className="mt-1 text-sm text-red-400">{errors.results}</p>}
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Key Metrics (Optional)</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newMetric.value}
              onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
              placeholder="e.g., 150%, $2M, 10x"
              className="w-32 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <input
              type="text"
              value={newMetric.label}
              onChange={(e) => setNewMetric({ ...newMetric, label: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMetric())}
              placeholder="e.g., Increase in Sales, Revenue Generated"
              className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <Button type="button" variant="secondary" onClick={addMetric}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {formData.metrics.map((metric, index) => (
              <div
                key={index}
                className="p-3 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 rounded-lg relative group"
              >
                <div className="text-xl font-black text-[var(--neon-green)]">
                  {metric.value}
                </div>
                <div className="text-xs text-white/60 pr-6">
                  {metric.label}
                </div>
                <button
                  type="button"
                  onClick={() => removeMetric(index)}
                  className="absolute top-2 right-2 p-1 rounded bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          {formData.metrics.length === 0 && (
            <p className="text-xs text-white/40">Add impressive metrics to showcase project impact</p>
          )}
        </div>

        {/* Technologies */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Technologies Used *</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              placeholder="e.g., React, Node.js, AWS"
              className={`flex-1 px-4 py-2 bg-black/40 border-2 rounded-lg text-white placeholder-white/40 focus:outline-none transition-colors ${errors.technologies ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            <Button type="button" variant="secondary" onClick={addTechnology}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
          {errors.technologies && <p className="text-sm text-red-400">{errors.technologies}</p>}

          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 rounded-lg text-sm text-[var(--neon-purple)] font-bold flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Services Provided */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Services Provided (Optional)</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
              placeholder="e.g., Web Development, UI/UX Design"
              className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <Button type="button" variant="secondary" onClick={addService}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.services_provided.map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-lg text-sm text-[var(--neon-cyan)] font-bold flex items-center gap-2"
              >
                {service}
                <button
                  type="button"
                  onClick={() => removeService(service)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Images</h3>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Featured Image URL (Optional)
            </label>
            <input
              type="url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
              placeholder="Paste image URL from Media Library"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            {formData.featured_image_url && (
              <div className="mt-2 rounded-xl overflow-hidden border-2 border-white/10">
                <img
                  src={formData.featured_image_url}
                  alt="Featured preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Gallery Images (Optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newGalleryImage}
                onChange={(e) => setNewGalleryImage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                placeholder="Paste image URL from Media Library"
                className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <Button type="button" variant="secondary" onClick={addGalleryImage}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>

            {formData.gallery_images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.gallery_images.map((url, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border-2 border-white/10">
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(url)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-white/40 flex items-center gap-2">
              <ImageIcon className="w-3 h-3" />
              Upload images in Media Library, then add URLs here
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Team Members (Optional)</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTeamMember}
              onChange={(e) => setNewTeamMember(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
              placeholder="e.g., John Smith, Sarah Johnson"
              className="flex-1 px-4 py-2 bg-black/40 border-2 border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <Button type="button" variant="secondary" onClick={addTeamMember}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.team_size.map((member) => (
              <span
                key={member}
                className="px-3 py-1 bg-white/5 border-2 border-white/20 rounded-lg text-sm text-white/70 font-bold flex items-center gap-2"
              >
                {member}
                <button
                  type="button"
                  onClick={() => removeTeamMember(member)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Links (Optional)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project URL */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Live Project URL
              </label>
              <input
                type="url"
                value={formData.project_url}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* Repository URL */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Repository URL
              </label>
              <input
                type="url"
                value={formData.repository_url}
                onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Testimonial ID */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Linked Testimonial ID
            </label>
            <input
              type="text"
              value={formData.testimonial_id}
              onChange={(e) => setFormData({ ...formData, testimonial_id: e.target.value })}
              placeholder="Enter testimonial ID to link"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <p className="mt-1 text-xs text-white/40">Link a testimonial from the same client</p>
          </div>
        </div>

        {/* Publishing */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Publishing</h3>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Draft */}
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'draft'
              ? 'bg-[var(--neon-orange)]/10 border-[var(--neon-orange)]/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Draft</span>
                <span className="text-xs text-white/60">Save for later</span>
              </div>
            </label>

            {/* Published */}
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'published'
              ? 'bg-[var(--neon-green)]/10 border-[var(--neon-green)]/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Published</span>
                <span className="text-xs text-white/60">Live now</span>
              </div>
            </label>
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-cyan)]/30 transition-all">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5"
            />
            <div>
              <span className="font-black text-white block">Featured Case Study</span>
              <span className="text-xs text-white/60">Show in featured section on homepage</span>
            </div>
          </label>
        </div>
      </form>
    </Modal>
  );
}
