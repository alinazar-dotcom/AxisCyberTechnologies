import { ArrowLeft, Upload, FileText, Link as LinkIcon, Github, Linkedin, Globe, CheckCircle2, AlertCircle, Briefcase, User, Mail, Phone, MapPin, Code, GraduationCap, Calendar, DollarSign, Send, Sparkles, Heart, Loader2, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { sendJobApplicationNotification, sendJobApplicationAutoReply } from '../lib/email';

export function CareersApplyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);

  // Get position from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const jobIdFromUrl = queryParams.get('jobId') || '';
  const jobTitleFromUrl = queryParams.get('jobTitle') || '';

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',

    // Professional Information
    jobId: jobIdFromUrl,
    position: jobTitleFromUrl,
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    websiteUrl: '',

    // Experience
    currentRole: '',
    currentCompany: '',
    yearsOfExperience: '',
    expectedSalary: '',
    noticePeriod: '',

    // Education
    highestDegree: '',
    fieldOfStudy: '',
    university: '',

    // Additional
    coverLetter: '',
    howDidYouHear: '',
    startDate: '',

    // Files (we'll store file names)
    resumeFile: null as File | null,
    portfolioFile: null as File | null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setIsLoadingPositions(true);
      const { data, error: fetchError } = await supabase
        .from('career_listings')
        .select('id, title')
        .eq('is_active', true)
        .order('title');

      if (fetchError) throw fetchError;
      if (data) setPositions(data);
    } catch (err) {
      console.error('Error fetching positions:', err);
    } finally {
      setIsLoadingPositions(false);
    }
  };

  useEffect(() => {
    if (jobIdFromUrl && jobTitleFromUrl) {
      setFormData(prev => ({ ...prev, jobId: jobIdFromUrl, position: jobTitleFromUrl }));
    }
  }, [jobIdFromUrl, jobTitleFromUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'position') {
      const selectedJob = positions.find(p => p.title === value);
      setFormData(prev => ({
        ...prev,
        position: value,
        jobId: selectedJob ? selectedJob.id : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.position) newErrors.position = 'Please select a position';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.resumeFile) newErrors.resumeFile = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Note: In a real production app, you would upload files to Supabase Storage first
      // and get the public URLs. For now, we'll use placeholder URLs.
      const resumeUrl = `https://placeholder.storage/resumes/${formData.resumeFile?.name}`;
      const portfolioUrl = formData.portfolioFile ? `https://placeholder.storage/portfolios/${formData.portfolioFile.name}` : formData.portfolioUrl;

      const { error: submitError } = await supabase
        .from('job_applications')
        .insert([{
          job_id: formData.jobId || null,
          applicant_name: `${formData.firstName} ${formData.lastName}`,
          applicant_email: formData.email,
          applicant_phone: formData.phone,
          applicant_location: formData.location,
          resume_url: resumeUrl,
          cover_letter: formData.coverLetter,
          portfolio_url: portfolioUrl,
          linkedin_url: formData.linkedinUrl,
          github_url: formData.githubUrl,
          years_experience: parseInt(formData.yearsOfExperience) || 0,
          applicant_current_role: formData.currentRole,
          applicant_current_company: formData.currentCompany,
          expected_salary: formData.expectedSalary,
          availability: formData.noticePeriod,
          status: 'new'
        }]);

      if (submitError) throw submitError;

      // Send email notifications
      try {
        const applicantName = `${formData.firstName} ${formData.lastName}`;

        // 1. Notify Admin
        await sendJobApplicationNotification({
          jobTitle: formData.position,
          applicantName,
          applicantEmail: formData.email,
          applicantPhone: formData.phone,
          resumeUrl: resumeUrl,
          coverLetter: formData.coverLetter,
          yearsExperience: parseInt(formData.yearsOfExperience) || 0
        });

        // 2. Send Auto-reply to Applicant
        await sendJobApplicationAutoReply({
          applicantName,
          applicantEmail: formData.email,
          jobTitle: formData.position
        });
      } catch (emailErr) {
        // We don't want to fail the whole submission if emails fail
        console.error('Email notification error:', emailErr);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#05060A] relative overflow-hidden flex items-center justify-center">
        {/* Ultra-premium neon background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#00FF9D] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF9D]/20 to-[#00FFFF]/20 border-2 border-[#00FF9D]/30 backdrop-blur-xl"
            style={{ boxShadow: '0 0 60px rgba(0,255,157,0.4)' }}
          >
            <CheckCircle2 className="w-12 h-12 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 20px #00FF9D80)' }} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Application <span className="bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,157,0.5)]">Submitted!</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Thank you for applying to <span className="text-white font-black">{formData.position}</span>!
            We've received your application and our team will review it shortly with 100% care and attention.
          </p>

          <div className="p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-3xl mb-10 text-left">
            <h3 className="text-xl md:text-2xl font-black text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              What Happens Next?
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DD00FF]/20 to-[#B900FF]/20 border-2 border-[#DD00FF]/30 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(221,0,255,0.3)' }}
                >
                  <span className="text-sm font-black text-[#DD00FF]">1</span>
                </div>
                <div>
                  <p className="text-base font-black text-white mb-1">Confirmation Email</p>
                  <p className="text-sm text-white/70">You'll receive a confirmation email within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FFFF]/20 to-[#00E5FF]/20 border-2 border-[#00FFFF]/30 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(0,255,255,0.3)' }}
                >
                  <span className="text-sm font-black text-[#00FFFF]">2</span>
                </div>
                <div>
                  <p className="text-base font-black text-white mb-1">Application Review</p>
                  <p className="text-sm text-white/70">Our hiring team will review your application (3-5 business days)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9D]/20 to-[#00FFFF]/20 border-2 border-[#00FF9D]/30 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(0,255,157,0.3)' }}
                >
                  <span className="text-sm font-black text-[#00FF9D]">3</span>
                </div>
                <div>
                  <p className="text-base font-black text-white mb-1">Interview Invitation</p>
                  <p className="text-sm text-white/70">If selected, we'll reach out to schedule an interview</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/careers"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#00FF9D] to-[#00FFFF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,157,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FF9D]/30"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="relative text-[#05060A] text-lg font-black tracking-wide">Back to Careers</span>
            </Link>
            <Link
              to="/"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-xl border-2 border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-1"
            >
              <span className="relative text-white text-lg font-black tracking-wide">Go to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060A] relative overflow-hidden">
      {/* Ultra-premium neon background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#DD00FF] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#00FFFF] rounded-full blur-[120px] opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-[#FF0099] rounded-full blur-[140px] opacity-15"></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DD00FF] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">

        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200 text-[#00FFFF]" />
            <span className="text-base font-black">Back to Careers</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border-2 border-[#DD00FF]/30 rounded-full mb-8 backdrop-blur-sm">
            <Briefcase className="w-5 h-5 text-[#DD00FF]" />
            <span className="text-white font-black tracking-wide">Job Application</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Apply for <span className="bg-gradient-to-r from-[#DD00FF] via-[#00FFFF] to-[#00FF9D] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(221,0,255,0.5)]">Your Dream Role</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            We're excited to learn more about you! Please fill out the application form below and we'll get back to you soon with 100% commitment.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">

          {/* Personal Information */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <User className="w-7 h-7 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  First Name <span className="text-[#FF0099]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 bg-white/[0.04] border-2 ${errors.firstName ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black`}
                  placeholder="John"
                />
                {errors.firstName && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Last Name <span className="text-[#FF0099]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 bg-white/[0.04] border-2 ${errors.lastName ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Email Address <span className="text-[#FF0099]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 ${errors.email ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black`}
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Phone Number <span className="text-[#FF0099]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 ${errors.phone ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black`}
                    placeholder="+92 300 1234567"
                  />
                </div>
                {errors.phone && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-black text-white mb-2">
                  Current Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                    placeholder="Lahore, Pakistan"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Position & Professional Links */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-[#00FFFF]" style={{ filter: 'drop-shadow(0 0 15px #00FFFF80)' }} />
              Position & Professional Links
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  Position Applying For <span className="text-[#FF0099]">*</span>
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 bg-white/[0.04] border-2 ${errors.position ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer font-black`}
                >
                  <option value="" className="bg-[#0A0A14] text-white">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.title} className="bg-[#0A0A14] text-white">
                      {pos.title}
                    </option>
                  ))}
                </select>
                {errors.position && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.position}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-black text-white mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-black text-white mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-black text-white mb-2">
                    Portfolio URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-black text-white mb-2">
                    Personal Website
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFFF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#00FF9D]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Code className="w-7 h-7 text-[#00FF9D]" style={{ filter: 'drop-shadow(0 0 15px #00FF9D80)' }} />
              Professional Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  Current Role / Last Position
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF9D]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                  placeholder="Senior Full-Stack Developer"
                />
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Current / Last Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF9D]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Years of Experience <span className="text-[#FF0099]">*</span>
                </label>
                <select
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 bg-white/[0.04] border-2 ${errors.yearsOfExperience ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl text-white focus:outline-none focus:border-[#00FF9D]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer font-black`}
                >
                  <option value="" className="bg-[#0A0A14] text-white">Select experience</option>
                  <option value="0-1" className="bg-[#0A0A14] text-white">Less than 1 year</option>
                  <option value="1-3" className="bg-[#0A0A14] text-white">1-3 years</option>
                  <option value="3-5" className="bg-[#0A0A14] text-white">3-5 years</option>
                  <option value="5-8" className="bg-[#0A0A14] text-white">5-8 years</option>
                  <option value="8+" className="bg-[#0A0A14] text-white">8+ years</option>
                </select>
                {errors.yearsOfExperience && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.yearsOfExperience}</p>}
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Expected Salary (Annual)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF9D]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                    placeholder="$80,000 - $120,000"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-black text-white mb-2">
                  Notice Period / Availability
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-[#00FF9D]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer font-black"
                >
                  <option value="" className="bg-[#0A0A14] text-white">Select notice period</option>
                  <option value="immediate" className="bg-[#0A0A14] text-white">Immediate</option>
                  <option value="2-weeks" className="bg-[#0A0A14] text-white">2 weeks</option>
                  <option value="1-month" className="bg-[#0A0A14] text-white">1 month</option>
                  <option value="2-months" className="bg-[#0A0A14] text-white">2 months</option>
                  <option value="3-months" className="bg-[#0A0A14] text-white">3 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#FF7A00]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-[#FF7A00]" style={{ filter: 'drop-shadow(0 0 15px #FF7A0080)' }} />
              Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  Highest Degree
                </label>
                <select
                  name="highestDegree"
                  value={formData.highestDegree}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-[#FF7A00]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer font-black"
                >
                  <option value="" className="bg-[#0A0A14] text-white">Select degree</option>
                  <option value="high-school" className="bg-[#0A0A14] text-white">High School</option>
                  <option value="associate" className="bg-[#0A0A14] text-white">Associate Degree</option>
                  <option value="bachelor" className="bg-[#0A0A14] text-white">Bachelor's Degree</option>
                  <option value="master" className="bg-[#0A0A14] text-white">Master's Degree</option>
                  <option value="phd" className="bg-[#0A0A14] text-white">Ph.D.</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF7A00]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                  placeholder="Computer Science"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-black text-white mb-2">
                  University / Institution
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF7A00]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                  placeholder="University Name"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#FF0099]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <FileText className="w-7 h-7 text-[#FF0099]" style={{ filter: 'drop-shadow(0 0 15px #FF009980)' }} />
              Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  Resume / CV <span className="text-[#FF0099]">*</span>
                </label>
                <div className={`relative border-2 border-dashed ${errors.resumeFile ? 'border-[#FF0099]/50' : 'border-white/[0.08]'} rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-300 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04]`}>
                  <input
                    type="file"
                    id="resumeFile"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resumeFile')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-white/40 mx-auto mb-3" />
                    {formData.resumeFile ? (
                      <div>
                        <p className="text-base text-white font-black mb-1">{formData.resumeFile.name}</p>
                        <p className="text-sm text-[#00FF9D] font-black">File selected ✓</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-base text-white font-black mb-1">Upload Resume</p>
                        <p className="text-sm text-white/60">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
                {errors.resumeFile && <p className="error-message mt-2 text-sm text-[#FF0099] font-black">{errors.resumeFile}</p>}
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Portfolio / Work Samples
                </label>
                <div className="relative border-2 border-dashed border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-300 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04]">
                  <input
                    type="file"
                    id="portfolioFile"
                    accept=".pdf,.zip"
                    onChange={(e) => handleFileChange(e, 'portfolioFile')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-white/40 mx-auto mb-3" />
                    {formData.portfolioFile ? (
                      <div>
                        <p className="text-base text-white font-black mb-1">{formData.portfolioFile.name}</p>
                        <p className="text-sm text-[#00FF9D] font-black">File selected ✓</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-base text-white font-black mb-1">Upload Portfolio</p>
                        <p className="text-sm text-white/60">PDF, ZIP (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-8 p-8 md:p-10 bg-black/40 backdrop-blur-xl border-2 border-[#DD00FF]/20 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Heart className="w-7 h-7 text-[#DD00FF]" style={{ filter: 'drop-shadow(0 0 15px #DD00FF80)' }} />
              Additional Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-base font-black text-white mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 resize-none font-black"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                />
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer font-black"
                >
                  <option value="" className="bg-[#0A0A14] text-white">Select an option</option>
                  <option value="linkedin" className="bg-[#0A0A14] text-white">LinkedIn</option>
                  <option value="job-board" className="bg-[#0A0A14] text-white">Job Board</option>
                  <option value="company-website" className="bg-[#0A0A14] text-white">Company Website</option>
                  <option value="referral" className="bg-[#0A0A14] text-white">Employee Referral</option>
                  <option value="social-media" className="bg-[#0A0A14] text-white">Social Media</option>
                  <option value="other" className="bg-[#0A0A14] text-white">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-black text-white mb-2">
                  Preferred Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-5 py-4 bg-white/[0.04] border-2 border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-[#DD00FF]/40 focus:bg-white/[0.06] transition-all duration-300 font-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative p-10 md:p-12 bg-black/60 backdrop-blur-xl border-2 border-[#00FFFF]/30 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 via-[#DD00FF]/10 to-[#00FF9D]/10"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <p className="text-base text-white/80 mb-2 font-black">
                  <span className="text-[#FF0099]">*</span> Required fields
                </p>
                <p className="text-sm text-white/60 font-black">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-[#00FFFF] to-[#00E5FF] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,255,255,0.5)] hover:-translate-y-1 active:translate-y-0 border-2 border-[#00FFFF]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none whitespace-nowrap"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                {isSubmitting ? (
                  <>
                    <div className="relative w-6 h-6 border-2 border-[#05060A]/30 border-t-[#05060A] rounded-full animate-spin" />
                    <span className="relative text-[#05060A] text-lg font-black tracking-wide">Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="relative text-[#05060A] text-lg font-black tracking-wide">Submit Application</span>
                    <Send className="relative w-6 h-6 text-[#05060A]" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
