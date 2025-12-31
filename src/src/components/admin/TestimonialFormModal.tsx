'use client';

import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Testimonial } from '../../hooks/useTestimonials';
import { Loader2, Star } from 'lucide-react';

interface TestimonialFormModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TestimonialFormModal({ testimonial, isOpen, onClose, onSuccess }: TestimonialFormModalProps) {
  const isEdit = !!testimonial;

  const [formData, setFormData] = useState({
    client_name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    project_title: '',
    service_provided: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
    avatar_url: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Load testimonial data if editing
  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name || '',
        position: testimonial.position || '',
        company: testimonial.company || '',
        content: testimonial.content || '',
        rating: testimonial.rating || 5,
        project_title: testimonial.project_title || '',
        service_provided: testimonial.service_provided || '',
        status: testimonial.status || 'pending',
        avatar_url: testimonial.avatar_url || (testimonial as any).client_avatar || '',
      });
    } else {
      // Reset form for new testimonial
      setFormData({
        client_name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        project_title: '',
        service_provided: '',
        status: 'pending',
        avatar_url: '',
      });
    }
    setErrors({});
  }, [testimonial, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Client name is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Testimonial content is required';
    }
    if (formData.content.trim().length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
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
      const { supabase } = await import('../../lib/supabase');

      const payload = {
        client_name: formData.client_name,
        client_role: formData.position,
        client_company: formData.company,
        client_avatar: formData.avatar_url,
        content: formData.content,
        rating: formData.rating,
        service_provided: formData.service_provided,
        status: (formData.status === 'approved' ? 'published' : formData.status === 'rejected' ? 'archived' : 'draft'),
      };

      let error;
      if (isEdit) {
        const { error: updateError } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', testimonial!.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('testimonials')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Testimonial save error:', error);
      setErrors({ submit: error.message || 'An error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const StarRating = () => {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className="transition-all hover:scale-110"
          >
            <Star
              className={`w-8 h-8 transition-all ${star <= formData.rating
                ? 'fill-[var(--neon-orange)] text-[var(--neon-orange)]'
                : 'text-white/20 hover:text-white/40'
                }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-black text-white/70">
          {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
        </span>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={saving} className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
            Cancel
          </Button>
          <Button type="submit" variant="primary" form="testimonial-form" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Testimonial' : 'Create Testimonial'}</>
            )}
          </Button>
        </div>
      }
    >
      <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
            {errors.submit}
          </div>
        )}

        {/* Client Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white">Client Information</h3>

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
                placeholder="e.g., John Smith"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.client_name ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.client_name && <p className="mt-1 text-sm text-red-400">{errors.client_name}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g., CEO"
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.position ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.position && <p className="mt-1 text-sm text-red-400">{errors.position}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Tech Innovations Inc."
                className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors ${errors.company ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                  }`}
              />
              {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
            </div>


          </div>

          {/* Avatar URL (Optional) */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Avatar URL (Optional)
            </label>
            <input
              type="url"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
            />
            <p className="mt-1 text-xs text-white/40">Leave empty to use default avatar</p>
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Testimonial Content</h3>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-2">
              Testimonial *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What did the client say about your work? (Minimum 20 characters)"
              rows={5}
              className={`w-full px-4 py-3 bg-black/40 border-2 rounded-xl text-white placeholder-white/40 focus:outline-none transition-colors resize-none ${errors.content ? 'border-red-500/50' : 'border-white/10 focus:border-[var(--neon-purple)]/50'
                }`}
            />
            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
            <p className="mt-1 text-xs text-white/40">
              {formData.content.length} characters
            </p>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-bold text-white/70 mb-3">
              Rating *
            </label>
            <StarRating />
            {errors.rating && <p className="mt-2 text-sm text-red-400">{errors.rating}</p>}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Project Details (Optional)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.project_title}
                onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                placeholder="e.g., E-commerce Platform Development"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>

            {/* Service Provided */}
            <div>
              <label className="block text-sm font-bold text-white/70 mb-2">
                Service Provided
              </label>
              <input
                type="text"
                value={formData.service_provided}
                onChange={(e) => setFormData({ ...formData, service_provided: e.target.value })}
                placeholder="e.g., Full-Stack Development"
                className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-4 pt-6 border-t-2 border-white/10">
          <h3 className="text-lg font-black text-white">Status</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Pending */}
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'pending'
              ? 'bg-[var(--neon-orange)]/10 border-[var(--neon-orange)]/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="pending"
                checked={formData.status === 'pending'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Pending</span>
                <span className="text-xs text-white/60">Awaiting review</span>
              </div>
            </label>

            {/* Approved */}
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'approved'
              ? 'bg-[var(--neon-green)]/10 border-[var(--neon-green)]/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="approved"
                checked={formData.status === 'approved'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Approved</span>
                <span className="text-xs text-white/60">Show on website</span>
              </div>
            </label>

            {/* Rejected */}
            <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.status === 'rejected'
              ? 'bg-red-500/10 border-red-500/50'
              : 'bg-black/40 border-white/10 hover:border-white/30'
              }`}>
              <input
                type="radio"
                name="status"
                value="rejected"
                checked={formData.status === 'rejected'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-5 h-5"
              />
              <div>
                <span className="font-black text-white block">Rejected</span>
                <span className="text-xs text-white/60">Hide from website</span>
              </div>
            </label>
          </div>
        </div>

      </form>
    </Modal>
  );
}
