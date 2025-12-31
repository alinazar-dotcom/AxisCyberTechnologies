import { FileText, Sparkles, ArrowRight, CheckCircle2, Rocket, Shield, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InsurancePage() {
  const solutions = [
    {
      title: 'Underwriting Automation',
      description: 'AI-powered underwriting and risk assessment platforms.',
      features: ['Automated Underwriting', 'Risk Scoring', 'Document Processing', 'Policy Generation']
    },
    {
      title: 'Claims Processing AI',
      description: 'Intelligent claims processing and adjudication systems.',
      features: ['Claims Automation', 'Fraud Detection', 'Damage Assessment', 'Settlement Processing']
    },
    {
      title: 'Fraud Detection',
      description: 'ML-based fraud detection and prevention systems.',
      features: ['Pattern Recognition', 'Anomaly Detection', 'Network Analysis', 'Risk Modeling']
    },
    {
      title: 'Catastrophe Modeling',
      description: 'Advanced modeling for natural disasters and catastrophic events.',
      features: ['Risk Modeling', 'Loss Estimation', 'Scenario Analysis', 'Portfolio Management']
    },
    {
      title: 'Actuarial Analytics',
      description: 'Data analytics and predictive modeling for actuarial science.',
      features: ['Predictive Modeling', 'Pricing Optimization', 'Reserve Analysis', 'Risk Assessment']
    },
    {
      title: 'Customer Portals',
      description: 'Digital-first customer experience and self-service portals.',
      features: ['Policy Management', 'Claims Submission', 'Document Upload', 'Mobile Apps']
    }
  ];

  const metrics = [
    { value: '39+', label: 'Projects', icon: Rocket },
    { value: '14', label: 'Insurers', icon: Shield },
    { value: '80%', label: 'Faster Claims', icon: Clock },
    { value: '$100M+', label: 'Fraud Prevented', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-full backdrop-blur-md mb-6">
              <FileText className="w-4 h-4 text-teal-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Insurance & Risk Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Intelligent{' '}
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                Insurance
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              Building AI-powered underwriting, claims processing, and fraud detection platforms that process claims 80% faster across 14 insurers preventing $100M+ in fraud.
            </p>

            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Modernize Your Insurance</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-teal-400 mb-3 mx-auto" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-sm text-white/60">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                InsurTech Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="p-6 md:p-8 bg-white/[0.02] border-2 border-teal-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-teal-400/40 transition-all duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-teal-400 mb-3">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                  {solution.description}
                </p>
                <div className="space-y-2">
                  {solution.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Insurance?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">
            Build AI-powered insurance platforms that reduce costs and improve customer experience.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Start Your Project</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
