import { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CaseStudiesSkeleton } from './CaseStudiesSkeleton';
import { Link } from 'react-router-dom';

interface DynamicCaseStudiesProps {
  industry?: string;
  service?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export function DynamicCaseStudies({ 
  industry, 
  service, 
  limit = 3, 
  title = "Proven Track Record",
  subtitle = "Real-world impact delivered through innovation"
}: DynamicCaseStudiesProps) {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, [industry, service, limit]);

  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true })
        .limit(limit);

      if (industry) {
        query = query.eq('client_industry', industry);
      }

      if (service) {
        query = query.contains('services', [service]);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (data) {
        const transformedData = data.map((study, index) => {
          // Map colors based on index for variety
          const colors = ['#FF0099', '#00FFFF', '#DD00FF'];
          const color = colors[index % 3];

          // Extract a primary metric from success_metrics JSONB
          let metric = 'Success';
          if (study.success_metrics) {
            const keys = Object.keys(study.success_metrics);
            if (keys.length > 0) {
              metric = study.success_metrics[keys[0]];
            }
          }

          return {
            ...study,
            displayMetric: metric,
            displayColor: color
          };
        });
        setCaseStudies(transformedData);
      }
    } catch (err: any) {
      console.error('Error fetching case studies:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CaseStudiesSkeleton />;
  }

  if (error || caseStudies.length === 0) {
    return null; // Don't show section if there's an error or no matching case studies
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title.split(' ').map((word, i) => (
              i === title.split(' ').length - 1 ? (
                <span key={i} className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : word + ' '
            ))}
          </h2>
          {subtitle && <p className="text-lg text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((study, index) => {
            const neonColor = study.displayColor;
            const neonRgba = neonColor === '#FF0099' ? 'rgba(255,0,153,1)' : neonColor === '#00FFFF' ? 'rgba(0,255,255,1)' : 'rgba(221,0,255,1)';

            return (
              <div
                key={study.id}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-cyan-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-500"
                style={{
                  borderColor: `${neonColor}40`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5" style={{ color: neonColor }} />
                  <span className="text-2xl font-bold text-white">{study.displayMetric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client_name}</p>
                <p className="text-sm text-white/70 mb-6 line-clamp-3">{study.summary}</p>

                <div className="flex flex-wrap gap-2">
                  {(study.technologies || []).slice(0, 4).map((tech: string, tIndex: number) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400"
                      style={{
                        borderColor: `${neonColor}40`,
                        color: neonColor
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-sm transition-all duration-300"
                    style={{ color: neonColor }}
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/case-studies"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
            <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View All Case Studies</span>
            <ArrowRight className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
