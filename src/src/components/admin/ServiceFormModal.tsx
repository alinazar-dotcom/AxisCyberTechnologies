'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Service } from '../../hooks/useServices';
import { Loader2, Plus, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

interface ServiceFormModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Icon options
const iconOptions = [
  'Brain', 'Blocks', 'Code2', 'Cloud', 'Smartphone', 'Layers',
  'Shield', 'Database', 'Sparkles', 'Zap', 'Cpu', 'Network'
];

// Color theme options
const colorOptions = [
  { value: 'violet', label: 'Violet', color: 'var(--neon-purple)' },
  { value: 'cyan', label: 'Cyan', color: 'var(--neon-cyan)' },
  { value: 'emerald', label: 'Emerald', color: 'var(--neon-green)' },
  { value: 'blue', label: 'Blue', color: '#3b82f6' },
  { value: 'pink', label: 'Pink', color: 'var(--neon-pink)' },
  { value: 'purple', label: 'Purple', color: '#a855f7' },
  { value: 'red', label: 'Red', color: '#ef4444' },
  { value: 'amber', label: 'Amber', color: 'var(--neon-orange)' },
  { value: 'teal', label: 'Teal', color: '#14b8a6' },
  { value: 'yellow', label: 'Yellow', color: '#eab308' },
  { value: 'indigo', label: 'Indigo', color: '#6366f1' },
  { value: 'rose', label: 'Rose', color: '#f43f5e' },
];

export function ServiceFormModal({ service, isOpen, onClose, onSuccess }: ServiceFormModalProps) {
  const isEdit = !!service;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    full_description: '',
    icon_name: 'Code2',
    color_theme: 'violet',
    is_featured: false,
    is_active: true,
    display_order: 1,
    projects_completed: 0,
    happy_clients: '50+',
    success_rate: 100,
    avg_delivery_time: '4-6 weeks',
    technologies: [] as string[],
    key_features: [] as string[],
    tagline: '',
    process_steps: [] as { title: string; description: string }[],
    use_cases: [] as string[],
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [useCaseInput, setUseCaseInput] = useState('');
  const [stepInput, setStepInput] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.key_features.includes(featureInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        key_features: [...prev.key_features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      key_features: prev.key_features.filter((f) => f !== feature),
    }));
  };

  const addUseCase = () => {
    if (useCaseInput.trim() && !formData.use_cases.includes(useCaseInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        use_cases: [...prev.use_cases, useCaseInput.trim()],
      }));
      setUseCaseInput('');
    }
  };

  const removeUseCase = (uc: string) => {
    setFormData((prev) => ({
      ...prev,
      use_cases: prev.use_cases.filter((u) => u !== uc),
    }));
  };

  const addStep = () => {
    if (stepInput.title.trim() && stepInput.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        process_steps: [...prev.process_steps, { ...stepInput }],
      }));
      setStepInput({ title: '', description: '' });
    }
  };

  const removeStep = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      process_steps: prev.process_steps.filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required';
    }
    if (!formData.full_description.trim()) {
      newErrors.full_description = 'Full description is required';
    }
    if (formData.projects_completed < 0) {
      newErrors.projects_completed = 'Must be 0 or greater';
    }
    if (formData.success_rate < 0 || formData.success_rate > 100) {
      newErrors.success_rate = 'Must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Load service data if editing
  useEffect(() => {
    if (service) {
      // Normalize process_steps if it comes as an object (from old data/fallback)
      let normalizedSteps: { title: string; description: string }[] = [];
      if (Array.isArray(service.process_steps)) {
        normalizedSteps = service.process_steps;
      } else if (typeof service.process_steps === 'object' && service.process_steps !== null) {
        normalizedSteps = Object.entries(service.process_steps)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([_, val]: [string, any]) => ({
            title: val.title || '',
            description: val.description || ''
          }));
      }

      setFormData({
        name: service.name || '',
        slug: service.slug || '',
        short_description: service.short_description || '',
        full_description: service.full_description || '',
        tagline: service.tagline || '',
        icon_name: service.icon_name || 'Code2',
        color_theme: service.color_theme || 'violet',
        is_featured: service.is_featured || false,
        is_active: service.is_active !== false,
        display_order: service.display_order || 1,
        projects_completed: service.projects_completed || 0,
        happy_clients: (service as any).happy_clients || '50+',
        success_rate: service.success_rate || 100,
        avg_delivery_time: service.avg_delivery_time || '4-6 weeks',
        technologies: service.technologies || [],
        key_features: service.key_features || [],
        process_steps: normalizedSteps,
        use_cases: service.use_cases || [],
      });
    } else {
      // Reset form for new service
      setFormData({
        name: '',
        slug: '',
        short_description: '',
        full_description: '',
        tagline: '',
        icon_name: 'Code2',
        color_theme: 'violet',
        is_featured: false,
        is_active: true,
        display_order: 1,
        projects_completed: 0,
        happy_clients: '50+',
        success_rate: 100,
        avg_delivery_time: '4-6 weeks',
        technologies: [],
        key_features: [],
        process_steps: [],
        use_cases: [],
      });
    }
    setErrors({});
  }, [service, isOpen]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSaving(true);

    try {
      // Map form data to DB schema
      const serviceData = {
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        full_description: formData.full_description,
        icon: formData.icon_name, // DB column is 'icon', form is 'icon_name'
        color: formData.color_theme, // DB column is 'color', form is 'color_theme'
        is_featured: formData.is_featured,
        is_active: formData.is_active,
        display_order: formData.display_order,
        projects_completed: formData.projects_completed,
        happy_clients: formData.happy_clients,
        success_rate: formData.success_rate,
        // avg_delivery_time: formData.avg_delivery_time, // Check if this column exists in DB, assuming yes or ignore if not
        technologies: formData.technologies,
        features: formData.key_features, // DB column is 'features', form is 'key_features'
        tagline: formData.tagline,
        process_steps: formData.process_steps,
        use_cases: formData.use_cases,
      };

      let error;

      if (isEdit && service) {
        // Update existing service
        const { error: updateError } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', service.id);
        error = updateError;
      } else {
        // Create new service
        const { error: insertError } = await supabase
          .from('services')
          .insert([serviceData]);
        error = insertError;
      }

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving service:', error);
      setErrors({ submit: error.message || 'An error occurred' });
      toast.error(error.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Service' : 'Add New Service'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
            {errors.submit}
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Basic Information</h3>

          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., AI & Machine Learning"
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., ai-ml"
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
            <p className="mt-1 text-xs text-white/40">Auto-generated from name. You can customize it.</p>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g., Intelligent systems powered by cutting-edge AI"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Short Description * (For cards)
            </label>
            <textarea
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Brief description for service cards..."
              rows={2}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors resize-none ${errors.short_description ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.short_description && <p className="mt-1 text-sm text-red-400">{errors.short_description}</p>}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Full Description * (For expanded view)
            </label>
            <textarea
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="Detailed description when service is expanded..."
              rows={4}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors resize-none ${errors.full_description ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.full_description && <p className="mt-1 text-sm text-red-400">{errors.full_description}</p>}
          </div>
        </div>

        {/* Visual Settings */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Visual Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Icon Picker */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Icon
              </label>
              <select
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Theme */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Color Theme
              </label>
              <select
                value={formData.color_theme}
                onChange={(e) => setFormData({ ...formData, color_theme: e.target.value })}
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Technologies & Tools</h3>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Add Technologies
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="e.g., React, Node.js..."
                className="flex-1 px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <Button type="button" onClick={addTechnology} variant="secondary">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Technologies List */}
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 rounded-lg text-sm text-[var(--neon-cyan)] font-bold"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Key Features</h3>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Add Key Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="e.g., Custom ML Model Development"
                className="flex-1 px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <Button type="button" onClick={addFeature} variant="secondary">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Features List */}
            {formData.key_features.length > 0 && (
              <div className="space-y-2 mt-3">
                {formData.key_features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 bg-black/40 border border-white/10 rounded-lg"
                  >
                    <span className="text-sm text-white/80">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Use Cases (Benefits) */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Use Cases / Benefits</h3>

          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Add Use Cases
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={useCaseInput}
                onChange={(e) => setUseCaseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUseCase())}
                placeholder="e.g., Fraud Detection"
                className="flex-1 px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <Button type="button" onClick={addUseCase} variant="secondary">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Use Cases List */}
            {formData.use_cases.length > 0 && (
              <div className="space-y-2 mt-3">
                {formData.use_cases.map((uc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-2 bg-black/40 border border-white/10 rounded-lg"
                  >
                    <span className="text-sm text-white/80">{uc}</span>
                    <button
                      type="button"
                      onClick={() => removeUseCase(uc)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Process Steps</h3>

          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={stepInput.title}
                onChange={(e) => setStepInput({ ...stepInput, title: e.target.value })}
                placeholder="Step Title (e.g., Discovery)"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
              <input
                type="text"
                value={stepInput.description}
                onChange={(e) => setStepInput({ ...stepInput, description: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
                placeholder="Step Description"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
            <Button type="button" onClick={addStep} variant="secondary" className="w-full">
              Add Step
            </Button>
          </div>

          {/* Steps List */}
          {formData.process_steps.length > 0 && (
            <div className="space-y-3 mt-3">
              {formData.process_steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-4 bg-black/40 border border-white/10 rounded-xl"
                >
                  <div>
                    <div className="font-bold text-white mb-1">
                      <span className="text-[var(--neon-cyan)] mr-2">{idx + 1}.</span>
                      {step.title}
                    </div>
                    <div className="text-sm text-white/70">{step.description}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="text-white/40 hover:text-red-400 transition-colors mt-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Statistics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Projects Completed */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Projects Completed
              </label>
              <input
                type="number"
                value={formData.projects_completed}
                onChange={(e) => setFormData({ ...formData, projects_completed: parseInt(e.target.value) || 0 })}
                min="0"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white focus:outline-none transition-colors ${errors.projects_completed ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.projects_completed && <p className="mt-1 text-sm text-red-400">{errors.projects_completed}</p>}
            </div>

            {/* Happy Clients */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Happy Clients
              </label>
              <input
                type="text"
                value={formData.happy_clients}
                onChange={(e) => setFormData({ ...formData, happy_clients: e.target.value })}
                placeholder="e.g., 50+"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* Success Rate */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Success Rate (%)
              </label>
              <input
                type="number"
                value={formData.success_rate}
                onChange={(e) => setFormData({ ...formData, success_rate: parseInt(e.target.value) || 0 })}
                min="0"
                max="100"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white focus:outline-none transition-colors ${errors.success_rate ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.success_rate && <p className="mt-1 text-sm text-red-400">{errors.success_rate}</p>}
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                min="1"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Avg Delivery Time */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Average Delivery Time
            </label>
            <input
              type="text"
              value={formData.avg_delivery_time}
              onChange={(e) => setFormData({ ...formData, avg_delivery_time: e.target.value })}
              placeholder="e.g., 4-6 weeks"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Settings</h3>

          <div className="flex flex-col gap-3">
            {/* Featured */}
            <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-orange)]/30 transition-colors">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-white/30 bg-black/40 checked:bg-[var(--neon-orange)] checked:border-[var(--neon-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-orange)]/50"
              />
              <div>
                <span className="font-bold text-white">Featured Service</span>
                <p className="text-sm text-white/60">Display prominently on homepage</p>
              </div>
            </label>

            {/* Active */}
            <label className="flex items-center gap-3 p-4 bg-black/40 border-2 border-white/10 rounded-xl cursor-pointer hover:border-[var(--neon-green)]/30 transition-colors">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-white/30 bg-black/40 checked:bg-[var(--neon-green)] checked:border-[var(--neon-green)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-green)]/50"
              />
              <div>
                <span className="font-bold text-white">Active</span>
                <p className="text-sm text-white/60">Show service on public website</p>
              </div>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t-2 border-white/10">
          <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Service' : 'Create Service'}</>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
