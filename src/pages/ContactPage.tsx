import { Mail, Phone, MapPin, Send, Clock, Globe, MessageCircle, Linkedin, Twitter, Github, Calendar, ArrowRight, CheckCircle2, Sparkles, Users, Zap, Building2, HeadphonesIcon, Rocket, Star, Award, Target } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendContactNotification, sendContactAutoReply } from '../lib/email';
import { ConsultationModal } from '../components/ConsultationModal';
import { useSiteSettings } from '../src/hooks/useSiteSettings';

export function ContactPage() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          services: formData.service ? [formData.service] : [],
          status: 'new'
        }]);

      if (submitError) throw submitError;

      // Send emails
      await Promise.all([
        sendContactNotification({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          services: formData.service ? [formData.service] : [],
          budget: formData.budget
        }),
        sendContactAutoReply({
          name: formData.name,
          email: formData.email
        })
      ]);

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
          timeline: ''
        });
      }, 3000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: settings?.contact_email || 'hello@axiscyber.tech',
      secondary: 'Response within 2 hours',
      href: `mailto:${settings?.contact_email || 'hello@axiscyber.tech'}`,
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#DD00FF]',
      glowColor: 'rgba(255, 0, 153, 0.4)'
    },
    {
      icon: Phone,
      title: 'Call Us',
      primary: settings?.phone_primary || '+92 42 1234 5678',
      secondary: 'Available 24/7 globally',
      href: `tel:${(settings?.phone_primary || '+924212345678').replace(/\s+/g, '').replace(/[()\-]/g, '')}`,
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00E5FF]',
      glowColor: 'rgba(0, 255, 255, 0.4)'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: settings?.company_address || 'DHA Phase 5, Main Boulevard',
      secondary: 'Lahore Headquarters',
      href: '#offices',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00E58C]',
      glowColor: 'rgba(0, 255, 157, 0.4)'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Chat with our team',
      secondary: 'Instant responses 24/7',
      href: '#chat',
      color: '#FFD700',
      gradient: 'from-[#FFD700] to-[#FFC700]',
      glowColor: 'rgba(255, 215, 0, 0.4)'
    }
  ];

  const offices = [
    {
      city: 'Lahore',
      country: 'Pakistan',
      address: settings?.office_lahore || 'DHA Phase 5, Main Boulevard',
      zip: '54000',
      phone: '+92 42 1234 5678',
      email: 'lahore@axiscyber.tech',
      isHQ: true,
      timezone: 'PKT (UTC+5)',
      hours: '24/7 Available',
      color: '#FF0099',
      gradient: 'from-[#FF0099] to-[#DD00FF]'
    },
    {
      city: 'Dubai',
      country: 'United Arab Emirates',
      address: settings?.office_dubai || 'Dubai Silicon Oasis, DDP Building A',
      zip: '341041',
      phone: '+971 4 1234 567',
      email: 'dubai@axiscyber.tech',
      isHQ: false,
      timezone: 'GST (UTC+4)',
      hours: '24/7 Available',
      color: '#00FFFF',
      gradient: 'from-[#00FFFF] to-[#00E5FF]'
    },
    {
      city: 'Los Angeles',
      country: 'United States',
      address: settings?.office_los_angeles || '350 S Grand Ave, Suite 1700',
      zip: 'CA 90071',
      phone: '+1 (310) 555-0123',
      email: 'la@axiscyber.tech',
      isHQ: false,
      timezone: 'PST (UTC-8)',
      hours: '24/7 Available',
      color: '#00FF9D',
      gradient: 'from-[#00FF9D] to-[#00E58C]'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: settings?.office_london || '1 Canada Square, Canary Wharf',
      zip: 'E14 5AB',
      phone: '+44 20 7946 0958',
      email: 'london@axiscyber.tech',
      isHQ: false,
      timezone: 'GMT (UTC+0)',
      hours: '24/7 Available',
      color: '#B900FF',
      gradient: 'from-[#B900FF] to-[#9D00E5]'
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A typical web application takes 3-6 months, while smaller projects can be completed in 4-8 weeks. We provide detailed timelines during our initial consultation with 100% on-time delivery guaranteed.'
    },
    {
      question: 'What is your pricing model?',
      answer: 'We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. Pricing depends on project scope, technology stack, and timeline. Contact us for a custom quote with transparent pricing.'
    },
    {
      question: 'Do you sign NDAs?',
      answer: 'Absolutely. We understand the importance of confidentiality and are happy to sign NDAs before discussing your project details. Your intellectual property is always protected with bank-grade security measures.'
    },
    {
      question: 'What industries do you serve?',
      answer: 'We work across 9+ industries including fintech, healthcare, e-commerce, logistics, education, entertainment, manufacturing, real estate, and more. Our diverse experience allows us to bring best practices from various sectors with 100% success rate.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive 24/7 maintenance and support packages. This includes bug fixes, updates, monitoring, and feature enhancements to ensure your application continues to perform optimally across all time zones.'
    },
    {
      question: 'Can you work with our existing team?',
      answer: 'Definitely. We excel at collaborating with in-house teams and can provide staff augmentation, dedicated developers, or full project ownership based on your needs. Our global team integrates seamlessly with your workflow.'
    }
  ];

  const services = [
    'AI & Machine Learning',
    'Blockchain & Web3',
    'Enterprise Software Engineering',
    'Cloud & DevOps',
    'Mobile App Development',
    'Gaming & WebGL',
    'Cybersecurity & Compliance',
    'Data Engineering & Analytics',
    'API & Integration Services',
    'Performance Optimization',
    'IoT & Edge Computing',
    'Product Strategy & UX',
    'Custom Solutions'
  ];

  const budgetRanges = [
    'Under $50K',
    '$50K - $100K',
    '$100K - $250K',
    '$250K - $500K',
    '$500K+'
  ];

  const timelines = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Flexible'
  ];

  const whyContactUs = [
    {
      icon: Zap,
      title: '2-Hour Response',
      description: 'Average response time of 2 hours or less',
      stat: '< 2h'
    },
    {
      icon: Award,
      title: '100% Success Rate',
      description: 'All projects delivered successfully',
      stat: '100%'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock support across time zones',
      stat: '24/7'
    },
    {
      icon: Users,
      title: '1900+ Clients',
      description: 'Trusted by businesses worldwide',
      stat: '1900+'
    }
  ];

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[900px] h-[900px] bg-[#FF0099]/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-[#00FFFF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-[#DD00FF]/8 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#FF0099]/10 to-[#00FFFF]/10 border-2 border-white/[0.15] rounded-full mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,153,0.2)]">
            <MessageCircle className="w-4 h-4 text-[#FF0099] animate-pulse" />
            <span className="text-white text-sm font-bold tracking-wide uppercase">Get in Touch</span>
            <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-tight">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent animate-gradient">
              Amazing Together
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Have a project in mind? We'd love to hear about it. Our team of experts is ready to turn your vision into reality with <span className="text-[#00FFFF] font-bold">100% success rate</span>.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] bg-clip-text text-transparent mb-1">&lt; 2h</div>
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Response Time</div>
            </div>
            <div className="w-px h-10 bg-white/[0.1]"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent mb-1">24/7</div>
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Global Support</div>
            </div>
            <div className="w-px h-10 bg-white/[0.1]"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#00FF9D] to-[#00E58C] bg-clip-text text-transparent mb-1">100%</div>
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Contact Methods - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20 md:mb-24">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-500 hover:scale-105 overflow-hidden"
                style={{
                  boxShadow: `0 0 0 rgba(255, 0, 153, 0)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${item.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 0, 153, 0)';
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon with glow */}
                <div className="relative z-10">
                  <div className={`inline-flex w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    style={{ boxShadow: `0 10px 30px ${item.glowColor}` }}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-white mb-2">{item.title}</h3>
                  <p className={`text-sm md:text-base font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-1`}>
                    {item.primary}
                  </p>
                  <p className="text-xs text-white/60">{item.secondary}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Why Contact Us */}
        <div className="mb-20 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {whyContactUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0099]/5 to-[#00FFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#00FFFF] mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#FF0099] to-[#DD00FF] bg-clip-text text-transparent mb-2">
                      {item.stat}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-white/70">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-32">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="relative group p-8 md:p-10 lg:p-12 bg-white/[0.02] border-2 border-white/[0.15] rounded-3xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0099]/5 via-[#DD00FF]/5 to-[#00FFFF]/5 opacity-50"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF0099] to-[#DD00FF] flex items-center justify-center shadow-lg"
                    style={{ boxShadow: '0 10px 30px rgba(255, 0, 153, 0.4)' }}
                  >
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white">Start Your Project</h2>
                </div>
                <p className="text-white/70 mb-10 text-sm md:text-base">Fill out the form below and we'll get back to you within <span className="text-[#00FFFF] font-bold">2 hours</span>.</p>

                {isSubmitted ? (
                  <div className="py-16 text-center">
                    <div className="relative inline-flex w-24 h-24 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D] to-[#00E58C] rounded-full animate-ping opacity-20"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-r from-[#00FF9D] to-[#00E58C] rounded-full flex items-center justify-center shadow-2xl"
                        style={{ boxShadow: '0 20px 60px rgba(0, 255, 157, 0.4)' }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Message Sent Successfully!</h3>
                    <p className="text-white/70 max-w-md mx-auto text-sm md:text-base">
                      Thank you for reaching out. Our team will review your message and get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Full Name <span className="text-[#FF0099]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0099]/50 focus:bg-white/[0.06] transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Email Address <span className="text-[#FF0099]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFFF]/50 focus:bg-white/[0.06] transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* Company & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/50 focus:bg-white/[0.06] transition-all duration-300"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF9D]/50 focus:bg-white/[0.06] transition-all duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Service Interested In <span className="text-[#FF0099]">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white focus:outline-none focus:border-[#FF0099]/50 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23FFFFFF' stroke-opacity='0.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '3rem'
                          }}
                        >
                          <option value="" style={{ background: '#0A0A14', color: '#ffffff' }}>Select a service</option>
                          {services.map((service, idx) => (
                            <option key={idx} value={service} style={{ background: '#0A0A14', color: '#ffffff' }}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white focus:outline-none focus:border-[#00FFFF]/50 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23FFFFFF' stroke-opacity='0.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            paddingRight: '3rem'
                          }}
                        >
                          <option value="" style={{ background: '#0A0A14', color: '#ffffff' }}>Select budget range</option>
                          {budgetRanges.map((range, idx) => (
                            <option key={idx} value={range} style={{ background: '#0A0A14', color: '#ffffff' }}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Project Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white focus:outline-none focus:border-[#DD00FF]/50 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23FFFFFF' stroke-opacity='0.5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '3rem'
                        }}
                      >
                        <option value="" style={{ background: '#0A0A14', color: '#ffffff' }}>When do you need this?</option>
                        {timelines.map((time, idx) => (
                          <option key={idx} value={time} style={{ background: '#0A0A14', color: '#ffffff' }}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Project Details <span className="text-[#FF0099]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3.5 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF9D]/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-5 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2 border-[#00FFFF]/30"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      {isSubmitting ? (
                        <>
                          <div className="relative w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="relative text-[#05060A] text-lg font-black tracking-wide">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="relative w-6 h-6 text-[#05060A]" />
                          <span className="relative text-[#05060A] text-lg font-black tracking-wide">Send Message</span>
                          <ArrowRight className="relative w-6 h-6 text-[#05060A] group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-white/50 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      <span className="block mt-1 text-[#00FFFF]">Your data is protected with bank-grade security.</span>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">

            {/* Why Contact Us */}
            <div className="relative group p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl overflow-hidden hover:border-white/[0.2] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF0099]/5 to-[#DD00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF0099] to-[#DD00FF] items-center justify-center mb-4 shadow-lg"
                  style={{ boxShadow: '0 10px 30px rgba(255, 0, 153, 0.4)' }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-5">Why Choose Us?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Free initial consultation & NDA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">24/7 global support coverage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">2-hour average response time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">100% project success rate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Custom project proposals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FFFF] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Transparent pricing & timeline</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Hours */}
            <div className="relative group p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl overflow-hidden hover:border-white/[0.2] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#00E58C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00FF9D] to-[#00E58C] items-center justify-center shadow-lg"
                    style={{ boxShadow: '0 10px 30px rgba(0, 255, 157, 0.4)' }}
                  >
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-3 py-1.5 bg-[#00FF9D]/20 border-2 border-[#00FF9D]/30 rounded-full">
                    <span className="text-xs font-black text-[#00FF9D]">24/7</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-5">Always Available</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">Round-the-Clock Support</p>
                      <p className="text-xs text-white/60">Our global team ensures 24/7 coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">Multi-Timezone Coverage</p>
                      <p className="text-xs text-white/60">Offices in Lahore, Dubai, LA & London</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white mb-1">Rapid Response Time</p>
                      <p className="text-xs text-white/60">Average response within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="relative group p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl overflow-hidden hover:border-white/[0.2] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00FFFF] to-[#00E5FF] items-center justify-center mb-4 shadow-lg"
                  style={{ boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)' }}
                >
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-5">Follow Us</h3>
                <div className="flex gap-3">
                  <a href={settings?.linkedin_url || '#linkedin'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl flex items-center justify-center hover:bg-[#FF0099]/20 hover:border-[#FF0099]/30 transition-all duration-300 group/social">
                    <Linkedin className="w-5 h-5 text-white/70 group-hover/social:text-[#FF0099] transition-colors duration-300" />
                  </a>
                  <a href={settings?.twitter_url || '#twitter'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl flex items-center justify-center hover:bg-[#00FFFF]/20 hover:border-[#00FFFF]/30 transition-all duration-300 group/social">
                    <Twitter className="w-5 h-5 text-white/70 group-hover/social:text-[#00FFFF] transition-colors duration-300" />
                  </a>
                  <a href={settings?.github_url || '#github'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/[0.04] border-2 border-white/[0.12] rounded-xl flex items-center justify-center hover:bg-[#00FF9D]/20 hover:border-[#00FF9D]/30 transition-all duration-300 group/social">
                    <Github className="w-5 h-5 text-white/70 group-hover/social:text-[#00FF9D] transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global Offices */}
        <div className="mb-20 md:mb-32" id="offices">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Our <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Global Offices</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              We're here to serve you <span className="text-[#00FFFF] font-bold">24/7</span> across multiple time zones with <span className="text-[#FF0099] font-bold">100% availability</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-500 overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${office.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {office.isHQ && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#FF0099]/20 border-2 border-[#FF0099]/30 rounded-lg text-xs font-black text-[#FF0099] shadow-lg">
                    HQ
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`inline-flex w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${office.gradient} items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">{office.city}</h3>
                  <p className="text-sm font-bold text-white/60 mb-4">{office.country}</p>

                  <div className="space-y-2 text-sm text-white/70 mb-5 pb-5 border-b-2 border-white/[0.08]">
                    <p>{office.address}</p>
                    <p>{office.zip}</p>
                  </div>

                  <div className="space-y-3">
                    <a href={`tel:${office.phone}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group/link">
                      <Phone className="w-4 h-4 text-[#00FFFF]" />
                      <span className="group-hover/link:text-[#00FFFF]">{office.phone}</span>
                    </a>
                    <a href={`mailto:${office.email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors group/link">
                      <Mail className="w-4 h-4 text-[#FF0099]" />
                      <span className="group-hover/link:text-[#FF0099]">{office.email}</span>
                    </a>
                    <div className="flex items-start gap-3 text-sm">
                      <Clock className="w-4 h-4 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-white/80">{office.hours}</div>
                        <div className="text-[#00FF9D] text-xs font-bold">{office.timezone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-[#00FF9D] to-[#00E58C] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Quick answers to common questions about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.12] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#00E58C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <h3 className="text-base md:text-lg font-black text-white mb-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed pl-8 md:pl-9">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Sections */}
        <div className="space-y-8">

          {/* Schedule Call CTA */}
          <div className="relative group text-center p-10 md:p-14 lg:p-20 bg-white/[0.02] border-2 border-white/[0.15] rounded-[2rem] overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF0099]/5 via-[#DD00FF]/5 to-[#00FFFF]/5"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,0,153,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,255,255,0.3), transparent 50%)' }}
            ></div>

            <div className="relative z-10">
              <div className="inline-flex w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-[#FF0099] via-[#DD00FF] to-[#00FFFF] items-center justify-center mb-8 shadow-2xl animate-pulse"
                style={{ boxShadow: '0 20px 60px rgba(255,0,153,0.4)' }}
              >
                <Calendar className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                Prefer to Schedule a <span className="bg-gradient-to-r from-[#FF0099] via-[#DD00FF] to-[#00FFFF] bg-clip-text text-transparent">Call?</span>
              </h2>

              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Book a <span className="text-[#00FFFF] font-bold">free 30-minute consultation</span> with our team to discuss your project in detail. Available 24/7 across all time zones.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF0099] to-[#DD00FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,0,153,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#FF0099]/30"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <Calendar className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative text-white text-lg font-black tracking-wide">Schedule a Call</span>
                  <ArrowRight className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <Link
                  to="/services"
                  className="px-10 py-5 bg-white/[0.04] border-2 border-white/[0.15] text-white rounded-2xl text-lg font-bold hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300 inline-flex items-center gap-3"
                >
                  <Target className="w-6 h-6" />
                  <span>View Our Services</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Success Rate Banner */}
          <div className="relative group p-8 md:p-10 bg-gradient-to-r from-[#00FF9D]/10 via-[#00E58C]/10 to-[#00CC7A]/10 border-2 border-[#00FF9D]/20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/5 to-[#00E58C]/5"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#00FF9D] to-[#00E58C] flex items-center justify-center shadow-2xl"
                  style={{ boxShadow: '0 20px 60px rgba(0, 255, 157, 0.4)' }}
                >
                  <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00FF9D] to-[#00E58C] bg-clip-text text-transparent mb-1">100% Success Rate</div>
                  <p className="text-sm md:text-base text-white/70">All projects delivered successfully with client satisfaction</p>
                </div>
              </div>
              <Link
                to="/case-studies"
                className="shrink-0 px-8 py-4 bg-gradient-to-r from-[#00FF9D] to-[#00E58C] rounded-2xl text-white font-black hover:shadow-[0_20px_40px_rgba(0,255,157,0.4)] transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-3 border-2 border-white/[0.2]"
              >
                <Star className="w-5 h-5" />
                <span>View Success Stories</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
