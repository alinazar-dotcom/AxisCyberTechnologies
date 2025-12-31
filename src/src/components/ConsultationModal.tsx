'use client';

import { useState } from 'react';
import { X, Calendar, Clock, DollarSign, Briefcase, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'AI/ML Solution',
  'Blockchain',
  'Cloud Infrastructure',
  'Cybersecurity',
  'Data Analytics',
  'IoT System',
  'API Development',
  'UI/UX Design',
  'Digital Transformation',
  'Other',
];

const BUDGET_RANGES = [
  'Under $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  'Over $250,000',
  'Not Sure',
];

const TIMELINES = [
  'ASAP (1-2 weeks)',
  '1 Month',
  '2-3 Months',
  '3-6 Months',
  '6+ Months',
  'Flexible',
];

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.project_type) return 'Please select a project type';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          project_type: formData.project_type,
          budget_range: formData.budget_range || null,
          timeline: formData.timeline || null,
          message: formData.message || null,
          status: 'pending'
        }])
        .select();

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          project_type: '',
          budget_range: '',
          timeline: '',
          message: '',
        });
        setSubmitStatus('idle');
        onClose();
      }, 3000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border-2 border-[var(--neon-purple)]/30 rounded-3xl shadow-[0_0_60px_rgba(221,0,255,0.3)] animate-fade-in-scale">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[var(--bg-secondary)]/95 backdrop-blur-xl border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[var(--neon-purple)]" />
              Book Free Consultation
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Get expert advice from our global team
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success State */}
          {submitStatus === 'success' && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-[var(--neon-green)] flex-shrink-0" />
              <div>
                <p className="font-bold text-[var(--neon-green)] text-lg">Consultation Booked!</p>
                <p className="text-sm text-white/70">We'll contact you within 24 hours to schedule.</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {submitStatus === 'error' && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--neon-red)]/10 border-2 border-[var(--neon-red)]/30 animate-fade-in">
              <AlertCircle className="w-6 h-6 text-[var(--neon-red)] flex-shrink-0" />
              <div>
                <p className="font-bold text-[var(--neon-red)]">Error</p>
                <p className="text-sm text-white/70">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consult-name" className="block text-sm font-bold text-white mb-2">
                Name <span className="text-[var(--neon-pink)]">*</span>
              </label>
              <input
                type="text"
                id="consult-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="consult-email" className="block text-sm font-bold text-white mb-2">
                Email <span className="text-[var(--neon-pink)]">*</span>
              </label>
              <input
                type="email"
                id="consult-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Company & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consult-company" className="block text-sm font-bold text-white mb-2">
                Company
              </label>
              <input
                type="text"
                id="consult-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label htmlFor="consult-phone" className="block text-sm font-bold text-white mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="consult-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="consult-project-type" className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[var(--neon-purple)]" />
              Project Type <span className="text-[var(--neon-pink)]">*</span>
            </label>
            <select
              id="consult-project-type"
              name="project_type"
              value={formData.project_type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
              required
            >
              <option value="">Select project type...</option>
              {PROJECT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Budget Range & Timeline */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consult-budget" className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[var(--neon-cyan)]" />
                Budget Range
              </label>
              <select
                id="consult-budget"
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
              >
                <option value="">Select budget...</option>
                {BUDGET_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="consult-timeline" className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--neon-green)]" />
                Timeline
              </label>
              <select
                id="consult-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300"
              >
                <option value="">Select timeline...</option>
                {TIMELINES.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="consult-message" className="block text-sm font-bold text-white mb-2">
              Project Details (Optional)
            </label>
            <textarea
              id="consult-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-purple)]/50 focus:outline-none transition-all duration-300 resize-none"
              placeholder="Tell us more about your project..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Booking...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Booked!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Book Consultation
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
