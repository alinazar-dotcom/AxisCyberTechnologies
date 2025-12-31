'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Zap,
  Rocket,
  Shield,
  Clock,
  DollarSign,
  Brain,
  Blocks,
  Code2,
  Cloud,
  Smartphone,
  Layers,
  Database,
  Cpu,
  Network,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  Blocks,
  Code2,
  Cloud,
  Smartphone,
  Layers,
  Shield,
  Database,
  Sparkles,
  Zap,
  Cpu,
  Network,
};

interface Service {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  long_description?: string;
  icon_name: string;
  color: string;
  features: string[];
  technologies: string[];
  use_cases: string[];
  deliverables: string[];
  success_rate: number;
  avg_project_duration?: string;
  starting_price?: string;
  featured: boolean;
  display_order?: number;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/services/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setService(data.data);

          // Fetch related services
          const relatedResponse = await fetch(`/api/services?limit=3&sortBy=display_order&sortOrder=asc`);
          const relatedData = await relatedResponse.json();

          if (relatedData.success) {
            // Filter out current service and get 3 others
            const filtered = relatedData.data.filter((s: Service) => s.slug !== slug).slice(0, 3);
            setRelatedServices(filtered);
          }
        } else {
          setError('Service not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[var(--neon-purple)]/30 border-t-[var(--neon-purple)] rounded-full animate-spin mb-4"></div>
          <p className="text-white/60 font-black">Loading service...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-24 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Service Not Found</h1>
          <p className="text-white/60 mb-6">{error || 'The service you\'re looking for doesn\'t exist.'}</p>
          <Link href="/#services">
            <Button variant="primary">
              <ArrowLeft className="w-5 h-5" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon_name] || Sparkles;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--neon-cyan)]/10 to-transparent rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--neon-purple)] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Back to Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-start gap-6 mb-6">
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border-2"
              style={{
                backgroundColor: `${service.color}15`,
                borderColor: `${service.color}40`,
              }}
            >
              <Icon
                className="w-10 h-10"
                style={{ color: service.color }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-[var(--neon-cyan)] font-bold mb-4">
                {service.tagline}
              </p>
              <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)]/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[var(--neon-green)]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[var(--neon-green)]">{service.success_rate}%</p>
                <p className="text-sm text-white/60">Success Rate</p>
              </div>
            </div>

            {service.avg_project_duration && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[var(--neon-cyan)]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--neon-cyan)]">{service.avg_project_duration}</p>
                  <p className="text-sm text-white/60">Avg Duration</p>
                </div>
              </div>
            )}

            {service.starting_price && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--neon-purple)]/10 border-2 border-[var(--neon-purple)]/30 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[var(--neon-purple)]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--neon-purple)]">{service.starting_price}</p>
                  <p className="text-sm text-white/60">Starting From</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Long Description */}
        {service.long_description && (
          <div className="mb-16 p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[var(--neon-purple)]" />
              What We Offer
            </h2>
            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
              {service.long_description}
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Features */}
          {service.features.length > 0 && (
            <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--neon-green)]" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--neon-green)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {service.technologies.length > 0 && (
            <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[var(--neon-cyan)]" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[var(--neon-cyan)]/10 border-2 border-[var(--neon-cyan)]/30 rounded-lg text-sm text-[var(--neon-cyan)] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {service.use_cases.length > 0 && (
            <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[var(--neon-purple)]" />
                Use Cases
              </h3>
              <ul className="space-y-3">
                {service.use_cases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[var(--neon-purple)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deliverables */}
          {service.deliverables.length > 0 && (
            <div className="p-8 bg-white/[0.02] border-2 border-white/10 rounded-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[var(--neon-orange)]" />
                Deliverables
              </h3>
              <ul className="space-y-3">
                {service.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--neon-orange)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="relative p-12 text-center bg-gradient-to-br from-[var(--neon-purple)]/10 via-[var(--neon-cyan)]/5 to-[var(--neon-pink)]/10 border-2 border-[var(--neon-purple)]/30 rounded-3xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/5 via-transparent to-[var(--neon-cyan)]/5"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's discuss how {service.title} can transform your business
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <Zap className="w-5 h-5" />
                  Get Started Now
                </Button>
              </Link>
              <Link href="/#services">
                <Button variant="secondary" size="lg">
                  <ArrowLeft className="w-5 h-5" />
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Related Services
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = iconMap[relatedService.icon_name] || Sparkles;

                return (
                  <Link
                    key={relatedService.id}
                    href={`/services/${relatedService.slug}`}
                    className="group p-6 bg-white/[0.02] border-2 border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-[var(--neon-purple)]/30 transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2"
                      style={{
                        backgroundColor: `${relatedService.color}15`,
                        borderColor: `${relatedService.color}40`,
                      }}
                    >
                      <RelatedIcon
                        className="w-6 h-6"
                        style={{ color: relatedService.color }}
                      />
                    </div>

                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-[var(--neon-purple)] transition-colors">
                      {relatedService.title}
                    </h3>

                    <p className="text-sm text-white/60 mb-4">
                      {relatedService.tagline}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--neon-purple)] text-sm font-bold">
                      Learn More
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
