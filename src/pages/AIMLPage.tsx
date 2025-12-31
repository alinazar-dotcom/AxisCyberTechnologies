import { Brain, Zap, TrendingUp, Shield, Code, Sparkles, ArrowRight, CheckCircle2, Star, Users, Trophy, Target, Boxes, Network, Cpu, GitBranch, Database, CloudCog, Rocket, Eye, MessageSquare, BarChart3, Play, FileCode, Bot, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AIMLPage() {
  const capabilities = [
    {
      icon: Brain,
      title: 'Custom ML Model Development',
      description: 'End-to-end machine learning solutions tailored to your business needs, from data preprocessing to model deployment.',
      features: ['Neural Networks', 'Deep Learning', 'Transfer Learning', 'Model Fine-tuning']
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      description: 'Advanced text analysis, sentiment detection, and language understanding for intelligent automation.',
      features: ['Chatbots & Virtual Assistants', 'Sentiment Analysis', 'Text Classification', 'Named Entity Recognition']
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      description: 'Image and video analysis powered by state-of-the-art deep learning architectures.',
      features: ['Object Detection', 'Facial Recognition', 'OCR & Document Processing', 'Medical Image Analysis']
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast trends, behaviors, and outcomes with advanced statistical models and ML algorithms.',
      features: ['Time Series Forecasting', 'Churn Prediction', 'Demand Forecasting', 'Risk Assessment']
    },
    {
      icon: Bot,
      title: 'Generative AI & LLMs',
      description: 'Harness the power of GPT-4, Claude, and custom language models for intelligent content generation.',
      features: ['LLM Integration', 'RAG Systems', 'Fine-tuned Models', 'Prompt Engineering']
    },
    {
      icon: GitBranch,
      title: 'MLOps & Automation',
      description: 'Production-ready ML pipelines with automated training, monitoring, and continuous deployment.',
      features: ['CI/CD for ML', 'Model Monitoring', 'A/B Testing', 'Auto-scaling Infrastructure']
    }
  ];

  const techStack = [
    { name: 'TensorFlow', category: 'Framework' },
    { name: 'PyTorch', category: 'Framework' },
    { name: 'OpenAI', category: 'LLM' },
    { name: 'Anthropic', category: 'LLM' },
    { name: 'Hugging Face', category: 'Platform' },
    { name: 'LangChain', category: 'Framework' },
    { name: 'scikit-learn', category: 'Library' },
    { name: 'Keras', category: 'Framework' },
    { name: 'AWS SageMaker', category: 'Cloud' },
    { name: 'Google Cloud AI', category: 'Cloud' },
    { name: 'Azure ML', category: 'Cloud' },
    { name: 'MLflow', category: 'MLOps' }
  ];

  const industries = [
    { icon: BarChart3, name: 'Finance & Banking', description: 'Fraud detection, risk assessment, algorithmic trading' },
    { icon: Target, name: 'Healthcare', description: 'Diagnostic systems, patient monitoring, drug discovery' },
    { icon: Users, name: 'E-commerce', description: 'Personalization, demand forecasting, dynamic pricing' },
    { icon: Globe, name: 'Manufacturing', description: 'Quality control, predictive maintenance, supply chain optimization' }
  ];

  const caseStudies = [
    {
      title: 'E-commerce Recommendation Engine',
      client: 'Global Retail Chain',
      metric: '34% increase in conversions',
      description: 'Built a real-time personalization engine using collaborative filtering and deep learning.',
      tech: ['TensorFlow', 'Python', 'Redis', 'AWS']
    },
    {
      title: 'Fraud Detection System',
      client: 'FinTech Platform',
      metric: '98.7% accuracy',
      description: 'Deployed ML-based fraud detection reducing false positives by 65%.',
      tech: ['PyTorch', 'XGBoost', 'Kafka', 'PostgreSQL']
    },
    {
      title: 'Medical Image Analysis',
      client: 'Healthcare Provider',
      metric: '40% faster diagnoses',
      description: 'Developed computer vision models for automated X-ray and MRI analysis.',
      tech: ['OpenCV', 'TensorFlow', 'Flask', 'Docker']
    }
  ];

  const process = [
    { step: '01', title: 'Discovery & Planning', description: 'Understanding your business goals, data landscape, and success metrics.' },
    { step: '02', title: 'Data Engineering', description: 'Data collection, cleaning, preprocessing, and feature engineering.' },
    { step: '03', title: 'Model Development', description: 'Training, validation, and optimization of ML models.' },
    { step: '04', title: 'Deployment & Integration', description: 'Production deployment with monitoring and continuous improvement.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full backdrop-blur-md mb-6">
              <Brain className="w-4 h-4 text-violet-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">AI & Machine Learning</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Intelligent Solutions That{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Transform Businesses
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              From predictive analytics to generative AI, we build production-ready machine learning solutions 
              that deliver measurable ROI and competitive advantage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your AI Project</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Play className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Case Studies</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
                <div className="text-sm text-white/60">AI Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-white/60">Project Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">45%</div>
                <div className="text-sm text-white/60">Avg Cost Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Full-Spectrum{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                AI/ML Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-violet-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-violet-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-violet-400 group-hover:text-white transition-colors duration-500 mb-3">
                      {capability.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
                      {capability.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {capability.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
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

      {/* Tech Stack Section */}
      <section className="py-16 md:py-24 bg-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-violet-500/5 to-transparent rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered By The{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Best Technologies
              </span>
            </h2>
            <p className="text-white/60">Industry-leading frameworks and platforms for production-grade AI</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300 text-center"
              >
                <div className="text-white font-semibold mb-1">{tech.name}</div>
                <div className="text-xs text-white/50">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A proven methodology that turns your data into intelligent systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-violet-500/20 rounded-xl hover:bg-white/[0.04] hover:border-violet-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-violet-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries We{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Transform
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-violet-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-sm text-white/60">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Real Results,{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Real Impact
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-violet-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-violet-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-violet-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs text-violet-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build the Future with{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Intelligent AI?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Let's discuss how AI & machine learning can transform your business. 
              Our experts are ready to turn your vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Get Started Today</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">Explore All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
