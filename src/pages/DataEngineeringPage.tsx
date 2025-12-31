import { Database, BarChart3, Workflow, Zap, Sparkles, ArrowRight, CheckCircle2, Trophy, Rocket, Globe, TrendingUp, Code2, Cpu, Share2, GitBranch, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DataEngineeringPage() {
  const capabilities = [
    {
      icon: Database,
      title: 'Data Pipeline Architecture',
      description: 'Build scalable ETL/ELT pipelines for processing terabytes of data.',
      features: ['Real-Time Streaming', 'Batch Processing', 'Data Orchestration', 'Pipeline Monitoring']
    },
    {
      icon: BarChart3,
      title: 'Data Warehousing',
      description: 'Modern data warehouse solutions for analytics and business intelligence.',
      features: ['Snowflake', 'BigQuery', 'Redshift', 'Data Modeling']
    },
    {
      icon: Workflow,
      title: 'Data Integration',
      description: 'Connect and unify data from multiple sources into a single source of truth.',
      features: ['API Integration', 'CDC Pipelines', 'Data Sync', 'Schema Mapping']
    },
    {
      icon: GitBranch,
      title: 'Data Quality & Governance',
      description: 'Ensure data accuracy, consistency, and compliance across your organization.',
      features: ['Data Validation', 'Quality Metrics', 'Lineage Tracking', 'Compliance']
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Stream processing for instant insights and real-time decision making.',
      features: ['Kafka Streams', 'Flink', 'Spark Streaming', 'Event Processing']
    },
    {
      icon: Share2,
      title: 'Data Lake Architecture',
      description: 'Centralized repositories storing structured and unstructured data at scale.',
      features: ['S3 Data Lakes', 'Delta Lake', 'Data Catalog', 'Partitioning']
    }
  ];

  const metrics = [
    { value: '10PB+', label: 'Data Processed' },
    { value: '100%', label: 'Data Accuracy' },
    { value: '<1s', label: 'Query Latency' },
    { value: '99.9%', label: 'Pipeline Uptime' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full backdrop-blur-md mb-6">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Data Engineering</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Build Scalable{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Data Platforms
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Transform raw data into actionable insights with modern data engineering solutions. 
              From pipelines to warehouses, we build infrastructure that scales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
                <Rocket className="relative w-5 h-5 text-white" />
                <span className="relative text-white font-semibold">Build Your Data Platform</span>
                <ArrowRight className="relative w-5 h-5 text-white" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 max-w-4xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              End-to-End{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Data Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-blue-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-blue-400/40 transition-all duration-500">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-400 group-hover:text-white transition-colors duration-500 mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                      {capability.description}
                    </p>
                    <div className="space-y-2">
                      {capability.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Your Data?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10">
              Let's build a data platform that drives your business forward.
            </p>
            <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
              <Sparkles className="relative w-5 h-5 text-white" />
              <span className="relative text-white font-semibold">Start Your Project</span>
              <ArrowRight className="relative w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
