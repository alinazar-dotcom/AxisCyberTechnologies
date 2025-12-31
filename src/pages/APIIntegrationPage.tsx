import { Plug, Zap, Network, Share2, Sparkles, ArrowRight, CheckCircle2, Rocket, Code2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function APIIntegrationPage() {
  const capabilities = [
    { icon: Plug, title: 'RESTful API Development', features: ['OpenAPI/Swagger', 'Versioning', 'Rate Limiting', 'Documentation'] },
    { icon: Network, title: 'GraphQL APIs', features: ['Schema Design', 'Real-time Subscriptions', 'Query Optimization', 'Federation'] },
    { icon: Share2, title: 'Third-Party Integrations', features: ['Payment Gateways', 'CRM Systems', 'Marketing Tools', 'Analytics'] },
    { icon: Zap, title: 'Microservices Architecture', features: ['Service Mesh', 'API Gateway', 'Load Balancing', 'Circuit Breakers'] },
    { icon: Code2, title: 'Webhook Systems', features: ['Event Delivery', 'Retry Logic', 'Payload Validation', 'Security'] },
    { icon: LinkIcon, title: 'API Management', features: ['Kong', 'Apigee', 'AWS API Gateway', 'Monitoring'] }
  ];

  const metrics = [
    { value: '99.99%', label: 'API Uptime' },
    { value: '<50ms', label: 'Response Time' },
    { value: '10M+', label: 'API Calls/Day' },
    { value: '100%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md mb-6">
              <Plug className="w-4 h-4 text-cyan-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">API Integration</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Seamless{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                API Integration
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto">
              Connect your systems with robust, scalable APIs. From design to deployment, we build integrations that work.
            </p>
            <Link to="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1">
              <Rocket className="relative w-5 h-5 text-white" />
              <span className="relative text-white font-semibold">Build Your API</span>
              <ArrowRight className="relative w-5 h-5 text-white" />
            </Link>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{m.value}</div>
                  <div className="text-sm text-white/60">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Complete{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                API Solutions
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div key={idx} className="group p-6 md:p-8 bg-white/[0.02] border-2 border-cyan-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-500">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 group-hover:text-white mb-3">{cap.title}</h3>
                  <div className="space-y-2">
                    {cap.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Connect Your Systems?
            </span>
          </h2>
          <p className="text-lg text-white/70 mb-10">Build powerful integrations that scale with your business.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Start Integration</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
