'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { GradientText } from '@/components/ui/GradientText';

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
  benefits: string[];
  is_featured: boolean;
  application_count: number;
  created_at: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    portfolio_url: '',
    resume_url: '',
    cover_letter: '',
    years_of_experience: '',
    current_location: '',
    available_from: '',
    expected_salary: '',
  });

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${slug}`);
      const result = await response.json();

      if (result.success) {
        setJob(result.data);
      } else {
        setError('Job not found');
      }
    } catch (err) {
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: job?.id,
          ...formData,
          years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Application submitted successfully!',
        });
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          linkedin_url: '',
          portfolio_url: '',
          resume_url: '',
          cover_letter: '',
          years_of_experience: '',
          current_location: '',
          available_from: '',
          expected_salary: '',
        });
        
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit application',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[var(--neon-purple)] animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">{error || 'Job not found'}</h1>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl font-bold text-white hover:shadow-[0_0_30px_var(--glow-purple)] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20">
      <div className="container-custom max-w-5xl">
        {/* Back Button */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--neon-purple)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to All Jobs</span>
        </Link>

        {/* Job Header */}
        <div className={`p-8 rounded-2xl border-2 mb-12 ${
          job.is_featured
            ? 'bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-cyan)]/10 border-[var(--neon-purple)]/30'
            : 'bg-black/20 border-white/10'
        }`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-black text-white">
                  {job.title}
                </h1>
                {job.is_featured && (
                  <Star className="w-8 h-8 text-[var(--neon-purple)] fill-[var(--neon-purple)]" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Briefcase className="w-5 h-5 text-[var(--neon-cyan)]" />
                  <span className="font-bold">{job.department}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5 text-[var(--neon-purple)]" />
                  <span className="font-bold">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-5 h-5 text-[var(--neon-pink)]" />
                  <span className="font-bold">{job.employment_type}</span>
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-2 text-white/80">
                    <DollarSign className="w-5 h-5 text-[var(--neon-green)]" />
                    <span className="font-bold">{job.salary_range}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/50 rounded-lg text-sm font-bold text-[var(--neon-purple)]">
                  {job.experience_level} Level
                </span>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{job.application_count} applicants</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Status */}
        {submitStatus.type && (
          <div
            className={`p-6 rounded-xl border-2 mb-8 flex items-center gap-4 ${
              submitStatus.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {submitStatus.type === 'success' ? (
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-lg">{submitStatus.message}</p>
              {submitStatus.type === 'success' && (
                <p className="text-sm mt-1 opacity-80">
                  We'll review your application and get back to you within 3-5 business days.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-black text-white mb-4">About the Role</h2>
              <p className="text-white/70 leading-relaxed">{job.description}</p>
            </section>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--neon-cyan)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--neon-purple)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Nice to Have */}
            {job.nice_to_have && job.nice_to_have.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.nice_to_have.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-[var(--neon-pink)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--neon-green)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-6 bg-black/40 border-2 border-[var(--neon-purple)]/30 rounded-2xl">
                <h3 className="text-2xl font-black text-white mb-6">Apply for this Position</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Portfolio / Website
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Resume URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.resume_url}
                      onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="Google Drive, Dropbox, or personal site"
                    />
                    <p className="text-xs text-white/50 mt-1">Upload your resume to Google Drive or Dropbox and share the link</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.years_of_experience}
                      onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      rows={4}
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all resize-none"
                      placeholder="Tell us why you're perfect for this role..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl font-bold text-white hover:shadow-[0_0_30px_var(--glow-purple)] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/50 text-center">
                    By applying, you agree to our privacy policy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
