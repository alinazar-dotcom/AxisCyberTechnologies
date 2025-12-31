'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Zap, Shield, Code, Database, Cloud, Brain, Smartphone, LineChart, Lock, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { supabase } from '@/lib/supabase';

// Services list matching your 12 core services
const SERVICES = [
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: Brain },
  { id: 'web-dev', label: 'Web Development', icon: Code },
  { id: 'mobile-dev', label: 'Mobile Development', icon: Smartphone },
  { id: 'cloud-devops', label: 'Cloud & DevOps', icon: Cloud },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'blockchain', label: 'Blockchain', icon: Lock },
  { id: 'data-analytics', label: 'Data Analytics', icon: LineChart },
  { id: 'iot', label: 'IoT Solutions', icon: Cpu },
  { id: 'api-integration', label: 'API Integration', icon: Database },
  { id: 'ui-ux', label: 'UI/UX Design', icon: Sparkles },
  { id: 'digital-transformation', label: 'Digital Transformation', icon: Zap },
  { id: 'consulting', label: 'Technical Consulting', icon: Globe },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    services: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.message.trim()) return 'Message is required';
    if (formData.services.length === 0) return 'Please select at least one service';
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
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          message: formData.message,
          services: formData.services,
          status: 'new'
        }])
        .select();

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        services: [],
      });
      setTouched({});

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Header Section */}
      <div className="container-padding mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-sm font-bold text-[var(--neon-purple)]">24/7 Global Support</span>
          </div>
          
          <h1 className="mb-6">
            <GradientText gradient="purple-cyan">
              Let's Build Something Extraordinary
            </GradientText>
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Connect with our team of experts across Lahore, Dubai, Los Angeles, and London. 
            We're ready to transform your vision into reality.
          </p>
        </div>
      </div>

      <div className="container-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Global Offices Card */}
            <div className="card-neon-purple p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-[var(--neon-purple)]" />
                Global Offices
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--neon-pink)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Lahore, Pakistan</p>
                    <p className="text-sm text-[var(--text-muted)]">Asia/Karachi (PKT)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--neon-cyan)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Dubai, UAE</p>
                    <p className="text-sm text-[var(--text-muted)]">Asia/Dubai (GST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--neon-purple)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Los Angeles, USA</p>
                    <p className="text-sm text-[var(--text-muted)]">America/Los_Angeles (PST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--neon-green)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">London, UK</p>
                    <p className="text-sm text-[var(--text-muted)]">Europe/London (GMT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="card-neon-cyan p-6">
              <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <a href="mailto:contact@axiscyber.tech" className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                  <span>contact@axiscyber.tech</span>
                </a>

                <a href="tel:+923001234567" className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                  <span>+92 300 123 4567</span>
                </a>
              </div>
            </div>

            {/* Success Rate Badge */}
            <div className="card-neon-pink p-6 text-center">
              <div className="text-5xl font-black mb-2">
                <GradientText gradient="pink-cyan">100%</GradientText>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Client Satisfaction Rate
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 text-[var(--neon-pink)]" />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card-neon p-8 space-y-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                    Name <span className="text-[var(--neon-pink)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                    Email <span className="text-[var(--neon-pink)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Company & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <label className="block text-sm font-bold text-white mb-3">
                  Services Interested In <span className="text-[var(--neon-pink)]">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES.map((service) => {
                    const Icon = service.icon;
                    const isSelected = formData.services.includes(service.id);
                    
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceToggle(service.id)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300
                          ${isSelected 
                            ? 'bg-[var(--neon-purple)]/20 border-2 border-[var(--neon-purple)]/60 text-[var(--neon-purple)] shadow-[0_0_20px_rgba(221,0,255,0.3)]' 
                            : 'bg-black/40 border-2 border-white/10 text-white/70 hover:border-white/30'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs truncate">{service.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                  Message <span className="text-[var(--neon-pink)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-white/40 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-[var(--neon-green)] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--neon-green)]">Message Sent Successfully!</p>
                    <p className="text-sm text-white/70">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--neon-red)]/10 border-2 border-[var(--neon-red)]/30 animate-fade-in">
                  <AlertCircle className="w-6 h-6 text-[var(--neon-red)] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[var(--neon-red)]">Error</p>
                    <p className="text-sm text-white/70">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
