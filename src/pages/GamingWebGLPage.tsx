import { Gamepad2, Zap, Layers, Cpu, Sparkles, ArrowRight, CheckCircle2, Trophy, Rocket, Globe, TrendingUp, Box, Palette, Code2, Target, Users, Wifi, Radio, Joystick } from 'lucide-react';
import { Link } from 'react-router-dom';

export function GamingWebGLPage() {
  const capabilities = [
    {
      icon: Gamepad2,
      title: '3D Game Development',
      description: 'Immersive 3D games with stunning graphics, physics simulation, and engaging gameplay.',
      features: ['Unity & Unreal Engine', 'Custom Game Engines', 'Physics Integration', 'Advanced Rendering']
    },
    {
      icon: Globe,
      title: 'WebGL & Browser Games',
      description: 'High-performance browser-based games using WebGL, Three.js, and modern web technologies.',
      features: ['Three.js', 'Babylon.js', 'WebGL Shaders', 'Cross-Browser Support']
    },
    {
      icon: Cpu,
      title: 'Real-Time Multiplayer',
      description: 'Scalable multiplayer infrastructure with low-latency networking and state synchronization.',
      features: ['WebSocket Servers', 'P2P Networking', 'Matchmaking Systems', 'Anti-Cheat']
    },
    {
      icon: Box,
      title: 'Interactive 3D Experiences',
      description: 'Product configurators, virtual showrooms, and interactive visualizations.',
      features: ['Product Configurators', 'Virtual Tours', 'AR/VR Experiences', 'Data Visualization']
    },
    {
      icon: Palette,
      title: 'Graphics & Animation',
      description: 'Stunning visual effects, particle systems, and character animations.',
      features: ['Shader Programming', 'Particle Effects', 'Character Rigging', 'Motion Capture']
    },
    {
      icon: Target,
      title: 'Game Mechanics Design',
      description: 'Engaging game mechanics, progression systems, and player retention features.',
      features: ['Level Design', 'Reward Systems', 'In-App Purchases', 'Analytics Integration']
    }
  ];

  const platforms = [
    {
      name: 'PC & Console',
      description: 'AAA and indie games for Windows, macOS, PlayStation, Xbox',
      technologies: ['Unity', 'Unreal Engine', 'C#', 'C++'],
      icon: Gamepad2
    },
    {
      name: 'Mobile Gaming',
      description: 'iOS and Android games with touch-optimized controls',
      technologies: ['Unity Mobile', 'Cocos2d', 'React Native', 'Native SDKs'],
      icon: Joystick
    },
    {
      name: 'Web & Browser',
      description: 'WebGL-powered games playable in any modern browser',
      technologies: ['Three.js', 'Babylon.js', 'PixiJS', 'WebGL'],
      icon: Globe
    },
    {
      name: 'VR & AR',
      description: 'Immersive virtual and augmented reality experiences',
      technologies: ['Unity XR', 'WebXR', 'ARKit', 'ARCore'],
      icon: Box
    }
  ];

  const features = [
    { icon: Zap, title: '60 FPS Performance', description: 'Optimized rendering for smooth gameplay' },
    { icon: Users, title: 'Multiplayer Ready', description: 'Scalable real-time multiplayer systems' },
    { icon: Wifi, title: 'Cross-Platform', description: 'Build once, deploy everywhere' },
    { icon: TrendingUp, title: 'Monetization', description: 'In-app purchases, ads, and subscriptions' }
  ];

  const gameTypes = [
    {
      title: 'Action & Adventure',
      description: 'Fast-paced games with exploration, combat, and storytelling',
      examples: ['Platformers', 'Shooters', 'RPGs', 'Survival Games']
    },
    {
      title: 'Puzzle & Strategy',
      description: 'Brain-teasing puzzles and strategic gameplay',
      examples: ['Match-3 Games', 'Tower Defense', 'Card Games', 'Board Games']
    },
    {
      title: 'Simulation & Sandbox',
      description: 'Open-world games and realistic simulations',
      examples: ['City Builders', 'Flight Simulators', 'Farming Games', 'Life Simulations']
    },
    {
      title: 'Multiplayer & Social',
      description: 'Games designed for social interaction and competition',
      examples: ['Battle Royale', 'MMOs', 'Party Games', 'Competitive eSports']
    }
  ];

  const webGLUses = [
    {
      title: 'Product Visualization',
      description: 'Interactive 3D product configurators for e-commerce',
      icon: Box
    },
    {
      title: 'Virtual Showrooms',
      description: 'Immersive virtual spaces for real estate and retail',
      icon: Globe
    },
    {
      title: 'Data Visualization',
      description: '3D charts, graphs, and interactive data exploration',
      icon: TrendingUp
    },
    {
      title: 'Educational Simulations',
      description: 'Interactive learning experiences and training tools',
      icon: Target
    }
  ];

  const caseStudies = [
    {
      title: 'Multiplayer Battle Royale',
      client: 'Gaming Studio',
      metric: '100K+ Players',
      description: 'Built a cross-platform battle royale game with 100-player matches, custom physics, and anti-cheat systems.',
      tech: ['Unity', 'Photon', 'C#', 'AWS GameLift']
    },
    {
      title: 'WebGL Product Configurator',
      client: 'Furniture Retailer',
      metric: '300% Sales Boost',
      description: 'Created interactive 3D configurator allowing customers to customize furniture in real-time with photorealistic rendering.',
      tech: ['Three.js', 'React', 'WebGL', 'GLSL Shaders']
    },
    {
      title: 'Mobile Puzzle Game',
      client: 'Casual Games Publisher',
      metric: '10M+ Downloads',
      description: 'Developed addictive match-3 puzzle game with 500+ levels, power-ups, and social features.',
      tech: ['Unity', 'C#', 'Firebase', 'AdMob']
    }
  ];

  const techStack = {
    engines: [
      { name: 'Unity', category: 'Game Engine' },
      { name: 'Unreal Engine', category: 'Game Engine' },
      { name: 'Godot', category: 'Game Engine' },
      { name: 'Custom Engines', category: 'Proprietary' }
    ],
    web: [
      { name: 'Three.js', category: 'WebGL' },
      { name: 'Babylon.js', category: 'WebGL' },
      { name: 'PixiJS', category: '2D Rendering' },
      { name: 'GLSL Shaders', category: 'Graphics' }
    ],
    languages: [
      { name: 'C#', category: 'Unity' },
      { name: 'C++', category: 'Unreal' },
      { name: 'JavaScript', category: 'Web' },
      { name: 'TypeScript', category: 'Web' }
    ],
    tools: [
      { name: 'Blender', category: '3D Modeling' },
      { name: 'Maya', category: '3D Animation' },
      { name: 'Substance Painter', category: 'Texturing' },
      { name: 'Git LFS', category: 'Version Control' }
    ]
  };

  const process = [
    { step: '01', title: 'Concept & Design', description: 'Game design document, mechanics design, and art direction.' },
    { step: '02', title: 'Prototyping', description: 'Rapid prototyping to test core gameplay mechanics and fun factor.' },
    { step: '03', title: 'Production', description: 'Full development with iterative testing and polish.' },
    { step: '04', title: 'Launch & LiveOps', description: 'Release, marketing support, and ongoing content updates.' }
  ];

  const metrics = [
    { value: '150+', label: 'Games Developed' },
    { value: '100%', label: 'Project Success Rate' },
    { value: '100M+', label: 'Total Players' },
    { value: '4.5★', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full backdrop-blur-md mb-6">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Game Development & WebGL</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Immersive Games &{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                3D Experiences
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              From AAA games to WebGL experiences, we create engaging interactive content 
              with stunning graphics, smooth performance, and addictive gameplay.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your Game Project</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Trophy className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Our Games</span>
              </Link>
            </div>

            {/* Stats */}
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

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-indigo-500/20 rounded-xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Complete{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Gaming Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-indigo-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-indigo-400 group-hover:text-white transition-colors duration-500 mb-3">
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
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
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

      {/* Platforms */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multi-Platform{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Game Development
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-indigo-500/20 rounded-xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-sm text-white/60 mb-4">{platform.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.technologies.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-xs text-indigo-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Game Types */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Game{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Genres & Types
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {gameTypes.map((type, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border border-indigo-500/20 rounded-xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-sm text-white/70 mb-5">{type.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {type.examples.map((example, eIndex) => (
                    <div key={eIndex} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WebGL Use Cases */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WebGL{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
            <p className="text-white/60">Beyond gaming: Interactive 3D experiences for business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {webGLUses.map((use, index) => {
              const Icon = use.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-indigo-500/20 rounded-xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{use.title}</h3>
                  <p className="text-sm text-white/60">{use.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Gaming{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Game Engines */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-indigo-400" />
                Game Engines
              </h3>
              <div className="space-y-3">
                {techStack.engines.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Technologies */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Web Technologies
              </h3>
              <div className="space-y-3">
                {techStack.web.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                Languages
              </h3>
              <div className="space-y-3">
                {techStack.languages.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-400" />
                Tools
              </h3>
              <div className="space-y-3">
                {techStack.tools.map((tech, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300">
                    <div className="text-white font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-white/50">{tech.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#0A0A14] relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-indigo-500/20 rounded-xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-indigo-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Game Projects
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-indigo-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-indigo-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-indigo-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400"
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0D0D1A] to-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Your Game?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              From concept to launch, we'll help you create engaging games and interactive experiences 
              that captivate your audience. Let's make something amazing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Sparkles className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your Project</span>
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
