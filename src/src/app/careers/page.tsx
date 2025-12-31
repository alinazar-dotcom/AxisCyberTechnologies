'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  Users,
  Rocket,
  Heart,
  TrendingUp,
  Zap
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
  is_featured: boolean;
  application_count: number;
  created_at: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, selectedDepartment, selectedLocation]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs?is_active=true');
      const result = await response.json();

      if (result.success) {
        setJobs(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    setFilteredJobs(filtered);
  };

  // Get unique departments and locations
  const departments = ['all', ...Array.from(new Set(jobs.map(j => j.department)))];
  const locations = ['all', 'Remote', 'Lahore', 'Dubai', 'Los Angeles', 'London'];

  const benefits = [
    { icon: <Rocket className="w-6 h-6" />, title: 'Cutting-Edge Tech', description: 'Work with AI, blockchain, cloud' },
    { icon: <Users className="w-6 h-6" />, title: 'Global Team', description: '4 offices across 3 continents' },
    { icon: <Heart className="w-6 h-6" />, title: 'Work-Life Balance', description: 'Flexible hours & remote options' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Career Growth', description: 'Learning budget & mentorship' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
            <span className="text-sm font-bold text-[var(--neon-purple)]">JOIN OUR TEAM</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Build The <GradientText>Future</GradientText> With Us
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Join a team of world-class engineers, designers, and innovators building next-generation software solutions. We operate 24/7 across our global offices in Lahore, Dubai, Los Angeles, and London.
          </p>

          <div className="flex items-center justify-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[var(--neon-cyan)]" />
              <span className="font-bold">{jobs.length} Open Positions</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30"></div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--neon-purple)]" />
              <span className="font-bold">4 Global Offices</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-2 border-white/10 rounded-2xl hover:border-[var(--neon-purple)]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border-2 border-[var(--neon-purple)]/30 flex items-center justify-center text-[var(--neon-purple)] mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/60">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, department..."
                className="w-full pl-12 pr-4 py-4 bg-black/40 border-2 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-4 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
            >
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-[var(--bg-secondary)] text-white">
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-4 bg-black/40 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--neon-purple)]/30 transition-all"
            >
              {locations.map(loc => (
                <option key={loc} value={loc} className="bg-[var(--bg-secondary)] text-white">
                  {loc === 'all' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-white/50">
            Showing <span className="text-[var(--neon-purple)] font-bold">{filteredJobs.length}</span> of {jobs.length} positions
          </p>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin mb-4"></div>
            <p className="text-white/60">Loading opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No positions found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.slug}`}
                className="block group"
              >
                <div className={`p-8 rounded-2xl border-2 transition-all ${
                  job.is_featured
                    ? 'bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-cyan)]/10 border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)]/50 shadow-[0_0_30px_rgba(221,0,255,0.2)]'
                    : 'bg-black/20 border-white/10 hover:border-[var(--neon-purple)]/30 hover:bg-black/40'
                }`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl font-black text-white group-hover:text-[var(--neon-purple)] transition-colors">
                          {job.title}
                        </h2>
                        {job.is_featured && (
                          <span className="px-3 py-1 bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/50 rounded-full text-xs font-bold text-[var(--neon-purple)] uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 mb-4 line-clamp-2">{job.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-[var(--neon-purple)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Briefcase className="w-4 h-4 text-[var(--neon-cyan)]" />
                      <span className="font-semibold">{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-4 h-4 text-[var(--neon-purple)]" />
                      <span className="font-semibold">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4 text-[var(--neon-pink)]" />
                      <span className="font-semibold">{job.employment_type}</span>
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center gap-2 text-white/60">
                        <DollarSign className="w-4 h-4 text-[var(--neon-green)]" />
                        <span className="font-semibold">{job.salary_range}</span>
                      </div>
                    )}
                    <div className="ml-auto px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs font-bold text-white/80">{job.experience_level}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 p-12 bg-gradient-to-br from-[var(--neon-purple)]/10 to-[var(--neon-cyan)]/10 border-2 border-[var(--neon-purple)]/30 rounded-3xl text-center">
          <Zap className="w-16 h-16 text-[var(--neon-purple)] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@axiscybertech.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl font-bold text-white hover:shadow-[0_0_30px_var(--glow-purple)] transition-all"
          >
            <Heart className="w-5 h-5" />
            Send General Application
          </a>
        </div>
      </div>
    </div>
  );
}
