import {
  ArrowRight,
  Target,
  Rocket,
  Award,
  Zap,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Code,
  Cpu,
  Database,
  Layers,
} from "lucide-react";
import { useState } from "react";

export function Philosophy() {
  const [hoveredPrinciple, setHoveredPrinciple] = useState<
    number | null
  >(null);

  const principles = [
    {
      icon: Target,
      title: "Precision Engineering",
      description:
        "Every line of code architected for performance, scalability, and maintainability. We build systems that stand the test of time.",
      color: "violet",
      gradient: "from-violet-500 to-purple-600",
      stat: "99.9%",
      statLabel: "Code Accuracy",
    },
    {
      icon: Rocket,
      title: "Innovation First",
      description:
        "Embracing cutting-edge technologies and methodologies to deliver solutions that give you a competitive advantage.",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      stat: "500+",
      statLabel: "Projects Delivered",
    },
    {
      icon: Award,
      title: "Enterprise Quality",
      description:
        "Production-tested, battle-hardened code that meets the highest industry standards for security and reliability.",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      stat: "24/7",
      statLabel: "Expert Support",
    },
  ];

  const metrics = [
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: TrendingUp,
      color: "violet",
    },
    {
      value: "<50ms",
      label: "Response Time",
      icon: Zap,
      color: "cyan",
    },
    {
      value: "10M+",
      label: "Active Users",
      icon: CheckCircle2,
      color: "emerald",
    },
  ];

  const techStack = [
    { icon: Code, label: "Clean Code", color: "violet" },
    { icon: Cpu, label: "High Performance", color: "cyan" },
    {
      icon: Database,
      label: "Scalable Data",
      color: "emerald",
    },
    { icon: Layers, label: "Modern Stack", color: "amber" },
  ];

  return (
    <section
      id="philosophy"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14]"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/6 to-transparent rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/6 to-transparent rounded-full blur-[140px] animate-pulse"
          style={{
            animationDuration: "7s",
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
              Our Philosophy
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Engineering Excellence,{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Delivered at Scale
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
            We combine technical mastery with creative
            problem-solving to build software that doesn't just
            work—it excels. Every project is an opportunity to
            push boundaries.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const isHovered = hoveredPrinciple === index;

            const colorMap: any = {
              violet: {
                border: "border-violet-500/30",
                shadow: "rgba(139,92,246,0.3)",
                text: "text-violet-400",
              },
              cyan: {
                border: "border-cyan-500/30",
                shadow: "rgba(6,182,212,0.3)",
                text: "text-cyan-400",
              },
              emerald: {
                border: "border-emerald-500/30",
                shadow: "rgba(16,185,129,0.3)",
                text: "text-emerald-400",
              },
            };
            const colors = colorMap[principle.color];

            return (
              <div
                key={index}
                className={`group relative p-8 md:p-10 bg-white/[0.02] border-2 ${colors.border} rounded-2xl backdrop-blur-sm transition-all duration-700 hover:bg-white/[0.04] hover:border-white/[0.15] hover:scale-105 cursor-pointer overflow-hidden`}
                style={{
                  animation: "fadeInUp 0.8s ease-out forwards",
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                  boxShadow: isHovered
                    ? `0 20px 60px ${colors.shadow}`
                    : "0 10px 30px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={() => setHoveredPrinciple(index)}
                onMouseLeave={() => setHoveredPrinciple(null)}
              >
                {/* Subtle glow on hover - fixed to stay inside card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-2xl`}
                ></div>

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${principle.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3
                      className={`text-xl md:text-2xl font-bold ${colors.text} group-hover:text-white transition-colors duration-500`}
                    >
                      {principle.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
                      {principle.description}
                    </p>
                  </div>

                  {/* Stat */}
                  <div className="pt-4 border-t border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-500">
                    <div
                      className={`text-3xl md:text-4xl font-black ${colors.text} mb-1`}
                    >
                      {principle.stat}
                    </div>
                    <div className="text-xs md:text-sm text-white/60 font-semibold uppercase tracking-wide">
                      {principle.statLabel}
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none  overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l ${principle.gradient}`}
                  ></div>
                  <div
                    className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b ${principle.gradient}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics Bar */}
        <div className="mb-16 md:mb-20">
          <div className="relative p-8 md:p-10 bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const colorMap: any = {
                  violet: {
                    text: "text-violet-400",
                    bg: "from-violet-500/15 to-violet-600/15",
                  },
                  cyan: {
                    text: "text-cyan-400",
                    bg: "from-cyan-500/15 to-cyan-600/15",
                  },
                  emerald: {
                    text: "text-emerald-400",
                    bg: "from-emerald-500/15 to-emerald-600/15",
                  },
                };
                const colors = colorMap[metric.color];

                return (
                  <div
                    key={index}
                    className="text-center group cursor-pointer"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon
                        className={`w-7 h-7 ${colors.text}`}
                      />
                    </div>
                    <div
                      className={`text-3xl md:text-4xl font-black ${colors.text} mb-2 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {metric.value}
                    </div>
                    <div className="text-sm md:text-base text-white/70 font-semibold group-hover:text-white/90 transition-colors duration-300">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech Stack Highlights */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Built on{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Modern Foundations
              </span>
            </h3>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
              We leverage the latest technologies and best
              practices to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {techStack.map((item, index) => {
              const Icon = item.icon;
              const colorMap: any = {
                violet: {
                  gradient: "from-violet-500 to-purple-600",
                  text: "text-violet-400",
                  glow: "rgba(139,92,246,0.4)",
                  border: "border-violet-500/30",
                },
                cyan: {
                  gradient: "from-cyan-500 to-blue-600",
                  text: "text-cyan-400",
                  glow: "rgba(6,182,212,0.4)",
                  border: "border-cyan-500/30",
                },
                emerald: {
                  gradient: "from-emerald-500 to-teal-600",
                  text: "text-emerald-400",
                  glow: "rgba(16,185,129,0.4)",
                  border: "border-emerald-500/30",
                },
                amber: {
                  gradient: "from-amber-500 to-orange-600",
                  text: "text-amber-400",
                  glow: "rgba(245,158,11,0.4)",
                  border: "border-amber-500/30",
                },
              };
              const colors = colorMap[item.color];

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: "fadeInUp 0.8s ease-out forwards",
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  {/* Enhanced glow effect on hover - covers whole card */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.glow}, ${colors.glow})`,
                    }}
                  ></div>

                  {/* Glass morphism card with overflow hidden */}
                  <div
                    className={`relative p-6 md:p-8 bg-black/30 backdrop-blur-xl border-2 ${colors.border} rounded-2xl transition-all duration-500 hover:bg-black/40 hover:border-white/20 hover:scale-105 hover:-translate-y-1 cursor-pointer text-center overflow-hidden`}
                    style={{
                      boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${colors.gradient} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        style={{
                          boxShadow: `0 0 20px ${colors.glow}`,
                        }}
                      >
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div
                        className={`text-sm md:text-base font-bold ${colors.text} transition-colors duration-300`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#expertise"
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Content */}
            <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="relative text-white font-semibold">
              Explore Our Expertise
            </span>
            <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </a>
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
      `}</style>
    </section>
  );
}