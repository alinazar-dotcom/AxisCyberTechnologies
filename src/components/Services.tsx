import {
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
  ArrowRight,
  Gamepad2,
  Loader2,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const serviceStyleMap: { [key: string]: any } = {
  "AI & Machine Learning": {
    icon: Brain,
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
  },
  "Blockchain & Web3": {
    icon: Blocks,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
  },
  "Blockchain Development": {
    icon: Blocks,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
  },
  "Enterprise Software Engineering": {
    icon: Code2,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
  "Web Development": {
    icon: Code2,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
  "Cloud Infrastructure & DevOps": {
    icon: Cloud,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
  },
  "Cloud & DevOps": {
    icon: Cloud,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
  },
  "Mobile & Cross-Platform": {
    icon: Smartphone,
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
  },
  "Mobile App Development": {
    icon: Smartphone,
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
  },
  "3D, WebGL & Interactive": {
    icon: Layers,
    color: "purple",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  "Gaming & WebGL": {
    icon: Gamepad2,
    color: "purple",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  "Cybersecurity & Compliance": {
    icon: Shield,
    color: "red",
    gradient: "from-red-500 to-orange-600",
  },
  "Cybersecurity": {
    icon: Shield,
    color: "red",
    gradient: "from-red-500 to-orange-600",
  },
  "Data Engineering & Analytics": {
    icon: Database,
    color: "amber",
    gradient: "from-amber-500 to-yellow-600",
  },
  "Data Engineering": {
    icon: Database,
    color: "amber",
    gradient: "from-amber-500 to-yellow-600",
  },
  "API & Integration Services": {
    icon: Network,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
  },
  "API & Integration": {
    icon: Network,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
  },
  "Performance Optimization": {
    icon: Zap,
    color: "yellow",
    gradient: "from-yellow-500 to-amber-600",
  },
  "IoT & Edge Computing": {
    icon: Cpu,
    color: "indigo",
    gradient: "from-indigo-500 to-purple-600",
  },
  "Product Strategy & UX": {
    icon: Sparkles,
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
  },
  "Product & UX Design": {
    icon: Sparkles,
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
  },
  "Enterprise Software": {
    icon: Network,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
  }
};

const slugMap: { [key: string]: string } = {
  "AI & Machine Learning": "ai-ml",
  "Blockchain & Web3": "blockchain",
  "Blockchain Development": "blockchain",
  "Enterprise Software Engineering": "enterprise-software",
  "Web Development": "enterprise-software",
  "Enterprise Software": "enterprise-software",
  "Cloud Infrastructure & DevOps": "cloud-devops",
  "Cloud & DevOps": "cloud-devops",
  "Mobile & Cross-Platform": "mobile-apps",
  "Mobile App Development": "mobile-apps",
  "3D, WebGL & Interactive": "gaming-webgl",
  "Gaming & WebGL": "gaming-webgl",
  "Cybersecurity & Compliance": "cybersecurity",
  "Cybersecurity": "cybersecurity",
  "Data Engineering & Analytics": "data-engineering",
  "Data Engineering": "data-engineering",
  "API & Integration Services": "api-integration",
  "API & Integration": "api-integration",
  "Performance Optimization": "performance",
  "IoT & Edge Computing": "iot-edge",
  "Product Strategy & UX": "product-ux",
  "Product & UX Design": "product-ux",
};

const serviceOrder = [
  "AI & Machine Learning",
  "Blockchain & Web3",
  "Blockchain Development",
  "Enterprise Software Engineering",
  "Web Development",
  "Cloud & DevOps",
  "Mobile App Development",
  "Gaming & WebGL",
  "Cybersecurity & Compliance",
  "Cybersecurity",
  "Data Engineering & Analytics",
  "Data Engineering",
  "API & Integration Services",
  "Enterprise Software",
  "Performance Optimization",
  "IoT & Edge Computing",
  "Product Strategy & UX",
  "Product & UX Design",
];



export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fallbackServices = [
    {
      name: 'AI & Machine Learning',
      tagline: 'Intelligent systems powered by cutting-edge AI',
      short_description: 'Intelligent systems powered by cutting-edge AI and machine learning algorithms',
      features: ['Deep Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'],
      slug: 'ai-ml'
    },
    {
      name: 'Blockchain & Web3',
      tagline: 'Decentralized solutions for the future',
      short_description: 'Decentralized solutions using blockchain and smart contract technology',
      features: ['Smart Contracts', 'DApp Development', 'NFT Platforms', 'DeFi Solutions'],
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'Polygon'],
      slug: 'blockchain'
    },
    {
      name: 'Enterprise Software Engineering',
      tagline: 'Scalable solutions for complex businesses',
      short_description: 'Modern, scalable web applications built with cutting-edge technologies',
      features: ['Responsive Design', 'API Development', 'Real-time Features', 'E-commerce Solutions'],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      slug: 'enterprise-software'
    },
    {
      name: 'Cloud & DevOps',
      tagline: 'Automated infrastructure and scaling',
      short_description: 'Scalable cloud infrastructure and automated DevOps pipelines',
      features: ['Cloud Architecture', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code'],
      technologies: ['AWS', 'Azure', 'Kubernetes', 'Docker'],
      slug: 'cloud-devops'
    },
    {
      name: 'Cybersecurity',
      tagline: 'Enterprise-grade security protection',
      short_description: 'Enterprise-grade security solutions to protect your digital assets',
      features: ['Security Audits', 'Penetration Testing', 'Incident Response', 'Compliance Management'],
      technologies: ['SIEM Tools', 'Encryption', 'Zero Trust', 'Firewalls'],
      slug: 'cybersecurity'
    },
    {
      name: 'Mobile App Development',
      tagline: 'Native and cross-platform mobile apps',
      short_description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native iOS/Android', 'Cross-Platform Apps', 'App Store Optimization', 'Offline Functionality'],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      slug: 'mobile-apps'
    }
  ];

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true);

      if (fetchError) throw fetchError;

      let servicesToTransform = data;

      if (!data || data.length === 0) {
        servicesToTransform = fallbackServices;
      }

      const transformedData = servicesToTransform.map((service: any) => {
        const style = serviceStyleMap[service.name] || {
          icon: Sparkles,
          color: "violet",
          gradient: "from-violet-500 to-purple-600",
        };

        return {
          ...service,
          icon: style.icon,
          title: service.name,
          slug: slugMap[service.name] || service.slug,
          tagline: service.tagline || "Expert technology solutions",
          description: service.short_description || service.full_description,
          features: service.features || [],
          technologies: service.technologies || [],
          color: style.color,
          gradient: style.gradient,
        };
      });

      // Sort services based on the predefined order
      const sortedData = transformedData.sort((a, b) => {
        const indexA = serviceOrder.indexOf(a.title);
        const indexB = serviceOrder.indexOf(b.title);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });

      setServices(sortedData);
    } catch (err: any) {
      console.error("Error fetching services, using fallback:", err);

      const transformedFallback = fallbackServices.map((service: any) => {
        const style = serviceStyleMap[service.name] || {
          icon: Sparkles,
          color: "violet",
          gradient: "from-violet-500 to-purple-600",
        };

        return {
          ...service,
          icon: style.icon,
          title: service.name,
          slug: slugMap[service.name] || service.slug,
          tagline: service.tagline || "Expert technology solutions",
          description: service.short_description,
          features: service.features,
          technologies: service.technologies,
          color: style.color,
          gradient: style.gradient,
        };
      });

      setServices(transformedFallback);
      // Don't set error state to keep UI functional
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 blur-3xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin relative z-10" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white/[0.02] border border-red-500/30 rounded-2xl backdrop-blur-xl max-w-lg">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-white/60 mb-6 text-sm">{error}</p>
          <button
            onClick={() => fetchServices()}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const colorMap: any = {
    violet: {
      border: "border-violet-500/30",
      text: "text-violet-400",
      bg: "bg-violet-500/10",
      shadow: "rgba(139,92,246,0.4)",
    },
    cyan: {
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      shadow: "rgba(6,182,212,0.4)",
    },
    emerald: {
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      shadow: "rgba(16,185,129,0.4)",
    },
    blue: {
      border: "border-blue-500/30",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      shadow: "rgba(59,130,246,0.4)",
    },
    pink: {
      border: "border-pink-500/30",
      text: "text-pink-400",
      bg: "bg-pink-500/10",
      shadow: "rgba(236,72,153,0.4)",
    },
    purple: {
      border: "border-purple-500/30",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      shadow: "rgba(168,85,247,0.4)",
    },
    red: {
      border: "border-red-500/30",
      text: "text-red-400",
      bg: "bg-red-500/10",
      shadow: "rgba(239,68,68,0.4)",
    },
    amber: {
      border: "border-amber-500/30",
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      shadow: "rgba(245,158,11,0.4)",
    },
    teal: {
      border: "border-teal-500/30",
      text: "text-teal-400",
      bg: "bg-teal-500/10",
      shadow: "rgba(20,184,166,0.4)",
    },
    yellow: {
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      shadow: "rgba(234,179,8,0.4)",
    },
    indigo: {
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      shadow: "rgba(99,102,241,0.4)",
    },
    rose: {
      border: "border-rose-500/30",
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      shadow: "rgba(244,63,94,0.4)",
    },
  };

  return (
    <section
      id="expertise"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14] relative overflow-hidden"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/6 to-transparent rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/6 to-transparent rounded-full blur-[140px] animate-pulse"
          style={{
            animationDuration: "10s",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 border border-violet-500/20 rounded-full backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">
              Full-Spectrum Expertise
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Enterprise Solutions{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Across Every Domain
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed mb-6">
            From AI to blockchain, cloud to mobile—we deliver
            cutting-edge technology solutions that transform
            businesses and drive measurable results.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service: any, index: number) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const colors = colorMap[service.color];

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${isExpanded ? "md:col-span-2 lg:col-span-3" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animation: "fadeInUp 0.8s ease-out forwards",
                  animationDelay: `${(index % 6) * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Enhanced hover glow - covers whole card */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.shadow}, ${colors.shadow})`,
                  }}
                ></div>

                <div
                  className={`relative h-full p-6 md:p-8 bg-black/30 backdrop-blur-xl border-2 ${colors.border} rounded-2xl transition-all duration-700 hover:bg-black/40 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden`}
                  style={{
                    boxShadow: isHovered
                      ? `0 20px 60px ${colors.shadow}`
                      : "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  <div
                    className={`${isExpanded ? "md:flex md:gap-10" : "space-y-5"}`}
                  >
                    {/* Left Column - Main Info */}
                    <div
                      className={`${isExpanded ? "md:w-1/3" : "flex flex-col h-full"} space-y-5`}
                    >
                      {/* Icon and Title section - wrapped to allow flex-grow if needed, but space-y is enough */}
                      <div className="space-y-5 flex-grow">
                        {/* Icon */}
                        <div className="relative inline-block">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3
                            className={`text-xl md:text-2xl font-bold ${colors.text} transition-colors duration-500 mb-2`}
                          >
                            {service.title}
                          </h3>
                          <p className="text-xs md:text-sm text-white/60 font-semibold uppercase tracking-wide">
                            {service.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-white/70 leading-relaxed transition-colors duration-500">
                          {service.description}
                        </p>
                      </div>

                      {/* Expand/Collapse button - Pushed to bottom */}
                      <div className="mt-auto pt-4">
                        <button
                          className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg text-xs md:text-sm ${colors.text} font-semibold hover:bg-white/[0.08] transition-colors duration-300`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedIndex(
                              isExpanded ? null : index,
                            );
                          }}
                        >
                          {isExpanded
                            ? "Show Less"
                            : "View Details"}
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Expanded Details */}
                    {isExpanded && (
                      <div className="md:w-2/3 space-y-6 mt-6 md:mt-0">
                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wide">
                            Key Capabilities
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.features.map(
                              (feature: string, fIndex: number) => (
                                <div
                                  key={fIndex}
                                  className="flex items-start gap-3 text-sm text-white/70"
                                >
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`}
                                  ></div>
                                  <span className="leading-relaxed">
                                    {feature}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wide">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map(
                              (tech: string, tIndex: number) => (
                                <span
                                  key={tIndex}
                                  className={`px-3 py-1.5 ${colors.bg} border ${colors.border} rounded-lg text-xs font-semibold ${colors.text} backdrop-blur-sm`}
                                >
                                  {tech}
                                </span>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Learn More Links */}
                        <div className="pt-4">
                          <Link
                            to={`/services/${service.slug}`}
                            className={`group/link inline-flex items-center gap-2 px-5 py-3 ${colors.bg} border ${colors.border} rounded-lg text-sm ${colors.text} font-semibold hover:bg-white/[0.08] transition-all duration-300`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Learn More About {service.title}</span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-2xl overflow-hidden`}
                  >
                    <div
                      className={`absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l ${service.gradient}`}
                    ></div>
                    <div
                      className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b ${service.gradient}`}
                    ></div>
                  </div>

                  {/* Status indicator */}
                  <div
                    className={`absolute top-6 right-6 w-2 h-2 rounded-full ${colors.bg} ${isHovered ? "animate-pulse" : ""}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="relative mt-16 md:mt-20">
          {/* Subtle background glow */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-3xl"></div>
          </div>

          {/* Outer glow wrapper */}
          <div className="relative max-w-3xl mx-auto group">
            {/* Full card glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>

            {/* Glass card container */}
            <div className="relative p-8 md:p-10 bg-gradient-to-br from-black/50 via-[#0A0A14]/70 to-black/50 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-3xl overflow-hidden group-hover:border-purple-500/40 transition-all duration-500">
              {/* Inner glass layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.03] pointer-events-none"></div>

              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"></div>

              {/* Animated gradient orbs on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

              {/* Content */}
              <div className="relative text-center space-y-8">
                {/* Heading */}
                <h3 className="text-xl md:text-2xl text-white/90">
                  Don't see what you're looking for?{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                    We love custom challenges.
                  </span>
                </h3>

                {/* CTA Button */}
                <div>
                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[#00FFFF] via-[#DD00FF] to-[#FF0099] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,255,255,0.6),0_0_80px_rgba(221,0,255,0.5),0_0_100px_rgba(255,0,153,0.4)] hover:scale-105 active:scale-95"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] via-[#DD00FF] to-[#FF0099] animate-gradient-shift"></div>

                    {/* Shine sweep effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                    {/* Button content */}
                    <Sparkles className="relative w-5 h-5 text-black group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="relative text-black font-bold text-base md:text-lg">
                      Discuss Your <span className="font-black">Custom Project</span>
                    </span>
                    <Zap className="relative w-5 h-5 text-black group-hover/btn:-rotate-12 transition-transform duration-300" />
                  </a>
                </div>

                {/* Supporting text */}
                <p className="text-sm text-white/40 flex items-center justify-center gap-2">
                  <span className="text-base">🚀</span>
                  <span>24/7 availability across 4 global offices</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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

        @keyframes animate-gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}