import { useState, useEffect } from 'react';
import { Code2, Cpu, Zap, GitBranch, Database, Network, Server, Lock, Cloud, Layers, Workflow, Radio, Activity, TrendingUp, Shield, Gauge } from 'lucide-react';

const codeSnippets = [
  {
    code: `// AI Model Orchestration
class ModelPipeline {
  async process(data) {
    const embeddings = await this.embed(data);
    const predictions = await this.predict(embeddings);
    return this.postprocess(predictions);
  }
}`,
    title: 'AI/ML Pipeline',
    subtitle: 'Neural Network Processing',
    icon: 'cpu',
    color: 'cyan',
    nodes: [
      { icon: 'database', label: 'Training Data', sublabel: '10TB Dataset', color: 'cyan', position: { top: '18%', left: '18%' }, activity: 85 },
      { icon: 'cpu', label: 'Neural Network', sublabel: '50M Parameters', color: 'magenta', position: { top: '18%', right: '18%' }, activity: 95 },
      { icon: 'layers', label: 'Feature Extraction', sublabel: '128 Dimensions', color: 'orange', position: { bottom: '22%', left: '22%' }, activity: 78 },
      { icon: 'zap', label: 'Inference Engine', sublabel: 'Real-time', color: 'cyan', position: { bottom: '22%', right: '22%' }, activity: 92 },
      { icon: 'cpu', label: 'AI Core', sublabel: 'GPU Accelerated', color: 'magenta', position: { top: '50%', left: '50%' }, activity: 100 }
    ],
    stats: [
      { label: 'Accuracy', value: '99.2%', color: 'cyan', icon: 'gauge' },
      { label: 'Training Time', value: '<2hrs', color: 'magenta', icon: 'activity' },
      { label: 'Inference', value: '15ms', color: 'orange', icon: 'zap' },
      { label: 'Models', value: '50+', color: 'cyan', icon: 'trendingup' }
    ],
    particleSpeed: 3,
    particleColor: 'rgba(0,229,255,0.9)',
    description: 'Deep learning models with transformer architecture processing millions of data points per second'
  },
  {
    code: `// Blockchain Smart Contract
contract SecureVault {
  mapping(address => uint256) balances;
  
  function deposit() external payable {
    balances[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);
  }
}`,
    title: 'Smart Contracts',
    subtitle: 'Blockchain Architecture',
    icon: 'database',
    color: 'magenta',
    nodes: [
      { icon: 'lock', label: 'Cryptography', sublabel: 'SHA-256', color: 'cyan', position: { top: '18%', left: '18%' }, activity: 90 },
      { icon: 'database', label: 'Distributed Ledger', sublabel: '1000+ Nodes', color: 'magenta', position: { top: '18%', right: '18%' }, activity: 88 },
      { icon: 'gitbranch', label: 'Consensus', sublabel: 'PoS', color: 'orange', position: { bottom: '22%', left: '22%' }, activity: 82 },
      { icon: 'server', label: 'Validator Nodes', sublabel: 'Distributed', color: 'cyan', position: { bottom: '22%', right: '22%' }, activity: 94 },
      { icon: 'network', label: 'Blockchain', sublabel: 'Immutable', color: 'magenta', position: { top: '50%', left: '50%' }, activity: 100 }
    ],
    stats: [
      { label: 'Transactions', value: '10K/s', color: 'cyan', icon: 'activity' },
      { label: 'Security', value: '256-bit', color: 'magenta', icon: 'shield' },
      { label: 'Finality', value: '<3s', color: 'orange', icon: 'zap' },
      { label: 'Uptime', value: '99.99%', color: 'cyan', icon: 'trendingup' }
    ],
    particleSpeed: 4,
    particleColor: 'rgba(185,0,255,0.9)',
    description: 'Decentralized ledger technology with cryptographic security ensuring immutable transaction records'
  },
  {
    code: `// Microservice Architecture
const ServiceMesh = {
  gateway: 'api-gateway',
  services: ['auth', 'data', 'ml'],
  
  async route(request) {
    return await this.loadBalance(request);
  }
}`,
    title: 'Microservices',
    subtitle: 'Distributed Systems',
    icon: 'network',
    color: 'orange',
    nodes: [
      { icon: 'server', label: 'Auth Service', sublabel: 'OAuth 2.0', color: 'cyan', position: { top: '18%', left: '18%' }, activity: 87 },
      { icon: 'database', label: 'Data Service', sublabel: 'PostgreSQL', color: 'magenta', position: { top: '18%', right: '18%' }, activity: 91 },
      { icon: 'cpu', label: 'ML Service', sublabel: 'TensorFlow', color: 'orange', position: { bottom: '22%', left: '22%' }, activity: 83 },
      { icon: 'cloud', label: 'Cache Layer', sublabel: 'Redis', color: 'cyan', position: { bottom: '22%', right: '22%' }, activity: 96 },
      { icon: 'workflow', label: 'API Gateway', sublabel: 'Load Balanced', color: 'magenta', position: { top: '50%', left: '50%' }, activity: 100 }
    ],
    stats: [
      { label: 'Services', value: '50+', color: 'cyan', icon: 'activity' },
      { label: 'Load Time', value: '<100ms', color: 'magenta', icon: 'zap' },
      { label: 'Requests/s', value: '100K', color: 'orange', icon: 'trendingup' },
      { label: 'Availability', value: '99.9%', color: 'cyan', icon: 'gauge' }
    ],
    particleSpeed: 2.5,
    particleColor: 'rgba(255,122,0,0.9)',
    description: 'Scalable microservice mesh with auto-discovery, load balancing, and fault tolerance'
  },
  {
    code: `// Real-time WebSocket Handler
io.on('connection', (socket) => {
  socket.on('update', async (data) => {
    const result = await processStream(data);
    socket.broadcast.emit('sync', result);
  });
});`,
    title: 'Real-time Systems',
    subtitle: 'Event-Driven Architecture',
    icon: 'zap',
    color: 'cyan',
    nodes: [
      { icon: 'radio', label: 'WebSocket', sublabel: 'Bidirectional', color: 'cyan', position: { top: '18%', left: '18%' }, activity: 98 },
      { icon: 'zap', label: 'Event Stream', sublabel: 'Kafka', color: 'magenta', position: { top: '18%', right: '18%' }, activity: 93 },
      { icon: 'database', label: 'State Sync', sublabel: 'CRDT', color: 'orange', position: { bottom: '22%', left: '22%' }, activity: 86 },
      { icon: 'network', label: 'Pub/Sub', sublabel: 'Redis Streams', color: 'cyan', position: { bottom: '22%', right: '22%' }, activity: 95 },
      { icon: 'zap', label: 'Real-time Core', sublabel: 'Sub-10ms', color: 'magenta', position: { top: '50%', left: '50%' }, activity: 100 }
    ],
    stats: [
      { label: 'Latency', value: '<10ms', color: 'cyan', icon: 'zap' },
      { label: 'Concurrent', value: '1M+', color: 'magenta', icon: 'activity' },
      { label: 'Throughput', value: '500K/s', color: 'orange', icon: 'trendingup' },
      { label: 'Sync Time', value: '<50ms', color: 'cyan', icon: 'gauge' }
    ],
    particleSpeed: 2,
    particleColor: 'rgba(0,255,255,1)',
    description: 'Ultra-low latency event streaming with conflict-free replicated data types for real-time synchronization'
  }
];

export function CoreLogic() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    if (charIndex < codeSnippets[currentSnippet].code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(codeSnippets[currentSnippet].code.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        handleSnippetChange((currentSnippet + 1) % codeSnippets.length);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSnippet]);

  const handleSnippetChange = (newIndex: number) => {
    setIsTransitioning(true);
    setHoveredNode(null);
    setTimeout(() => {
      setCurrentSnippet(newIndex);
      setCharIndex(0);
      setDisplayedCode('');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 500);
  };

  const getIcon = (iconName: string) => {
    const icons: any = {
      cpu: Cpu, database: Database, network: Network, zap: Zap, code: Code2,
      gitbranch: GitBranch, server: Server, lock: Lock, cloud: Cloud, layers: Layers,
      workflow: Workflow, radio: Radio, activity: Activity, trendingup: TrendingUp,
      shield: Shield, gauge: Gauge
    };
    return icons[iconName] || Code2;
  };

  const CurrentIcon = getIcon(codeSnippets[currentSnippet].icon);
  const currentData = codeSnippets[currentSnippet];

  return (
    <section className="py-12 md:py-20 lg:py-[120px] relative overflow-hidden bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-cyan)]/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-magenta)]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[var(--accent-orange)]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Enhanced grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* ENHANCED HEADER */}
        <div className="text-center space-y-5 md:space-y-7 mb-10 md:mb-14 lg:mb-20">
          {/* PREMIUM ANIMATED BADGE */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[var(--accent-magenta)]/20 via-[var(--accent-cyan)]/15 to-[var(--accent-magenta)]/20 border-2 border-[var(--accent-magenta)]/50 rounded-full shadow-lg shadow-[var(--accent-magenta)]/25 hover:shadow-xl hover:shadow-[var(--accent-magenta)]/35 transition-all duration-700 group cursor-pointer relative overflow-hidden backdrop-blur-sm">
            {/* Triple shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-100 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/20 to-transparent pointer-events-none"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(90deg, var(--accent-magenta), var(--accent-cyan), var(--accent-magenta))',
              backgroundSize: '200% 100%',
              animation: 'borderFlow 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              padding: '2px',
            }}></div>
            
            <Code2 className="w-4 h-4 text-[var(--accent-cyan)] animate-pulse" style={{filter: 'drop-shadow(0 0 6px var(--accent-cyan))'}} />
            <span className="text-white text-xs md:text-sm font-black tracking-widest uppercase relative z-10" style={{textShadow: '0 0 10px rgba(0,229,255,0.5)'}}>
              ⚡ ENGINEERING EXCELLENCE
            </span>
            <Zap className="w-4 h-4 text-[var(--accent-magenta)] animate-pulse" style={{filter: 'drop-shadow(0 0 6px var(--accent-magenta))', animationDelay: '0.3s'}} />
          </div>
          
          {/* GRADIENT TITLE */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black">
              <span className="bg-gradient-to-r from-[var(--accent-cyan)] via-white to-[var(--accent-magenta)] bg-clip-text text-transparent" style={{
                backgroundSize: '200% auto',
                animation: 'gradientShift 4s ease-in-out infinite'
              }}>
                The Core Logic Behind Innovation
              </span>
            </h2>
            
            {/* Enhanced decorative underline */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
              <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-full shadow-lg shadow-[var(--accent-cyan)]/50 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-[var(--accent-magenta)] shadow-lg shadow-[var(--accent-magenta)]" style={{animation: 'pulse 2s ease-in-out infinite'}}></div>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--accent-magenta)] via-[var(--accent-cyan)] to-transparent rounded-full shadow-lg shadow-[var(--accent-magenta)]/50 animate-pulse"></div>
            </div>
          </div>
          
          <p className="max-w-3xl mx-auto text-sm md:text-base lg:text-lg text-white/85 leading-relaxed mt-6">
            From <span className="text-[var(--accent-cyan)] font-semibold">algorithms</span> to <span className="text-[var(--accent-magenta)] font-semibold">architectures</span>, every system we build is engineered 
            with <span className="text-[var(--accent-orange)] font-semibold">precision</span>, scalability, and performance at its core.
          </p>
        </div>

        {/* ENHANCED DYNAMIC STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          {currentData.stats.map((stat, index) => {
            const colorMap: any = {
              cyan: 'var(--accent-cyan)',
              magenta: 'var(--accent-magenta)',
              orange: 'var(--accent-orange)'
            };
            const shadowMap: any = {
              cyan: 'rgba(0,229,255,0.25)',
              magenta: 'rgba(185,0,255,0.25)',
              orange: 'rgba(255,122,0,0.25)'
            };
            const StatIcon = getIcon(stat.icon);
            
            return (
              <div 
                key={`${currentSnippet}-${index}`}
                className={`group relative p-5 md:p-6 rounded-xl border-2 bg-gradient-to-br from-[#0D0D1A]/95 to-[#0A0A14]/90 backdrop-blur-sm hover:scale-105 transition-all duration-700 overflow-hidden cursor-pointer ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{
                  borderColor: colorMap[stat.color],
                  boxShadow: `0 0 25px ${shadowMap[stat.color]}`,
                  transitionDelay: `${index * 60}ms`
                }}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${colorMap[stat.color]} 90deg, transparent 180deg)`,
                  animation: 'rotateBorder 4s linear infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                }}></div>
                
                {/* Corner accent */}
                <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity">
                  <StatIcon className="w-6 h-6" style={{color: colorMap[stat.color]}} />
                </div>
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <StatIcon className="w-4 h-4 opacity-70" style={{color: colorMap[stat.color]}} />
                    <div className="text-xs md:text-sm text-white/60 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                  <div 
                    className="text-3xl md:text-4xl font-black transition-all duration-500"
                    style={{
                      color: colorMap[stat.color],
                      textShadow: `0 0 20px ${shadowMap[stat.color]}`
                    }}
                  >
                    {stat.value}
                  </div>
                  
                  {/* Mini progress bar */}
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: '75%',
                        background: `linear-gradient(90deg, ${colorMap[stat.color]}, ${colorMap[stat.color]}80)`,
                        boxShadow: `0 0 10px ${shadowMap[stat.color]}`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left - PREMIUM Code Block */}
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent-cyan)]/30 via-[var(--accent-magenta)]/25 to-[var(--accent-cyan)]/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60 group-hover:opacity-100"></div>
            
            <div className="relative bg-[#0D0D1A]/95 backdrop-blur-md rounded-2xl border-2 border-[var(--accent-cyan)]/50 overflow-hidden shadow-2xl shadow-[var(--accent-cyan)]/20 hover:shadow-[var(--accent-cyan)]/30 transition-all duration-700">
              {/* Enhanced Terminal header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#0A0A14]/98 border-b-2 border-[var(--accent-cyan)]/30 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg shadow-red-500/70 animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{animationDuration: '3s'}}></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/70 animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg shadow-green-500/70 animate-pulse hover:scale-125 transition-transform cursor-pointer" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                  </div>
                  <span className="text-xs text-white/70 font-semibold font-mono">core-logic.js</span>
                </div>
                
                {/* Enhanced snippet indicator */}
                <div 
                  className={`flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-magenta)]/15 border border-[var(--accent-cyan)]/40 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-500 ${
                    isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}
                >
                  <CurrentIcon className="w-4 h-4 text-[var(--accent-cyan)]" style={{
                    filter: 'drop-shadow(0 0 4px var(--accent-cyan))'
                  }} />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-[var(--accent-cyan)] font-bold leading-none">{currentData.title}</span>
                    <span className="text-[10px] text-white/50 leading-none mt-0.5">{currentData.subtitle}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Code content */}
              <div className="relative p-6 md:p-8 font-mono text-xs md:text-sm min-h-[340px] bg-gradient-to-br from-[#0A0A14]/50 to-[#0D0D1A]/50">
                {/* Line numbers */}
                <div className="absolute left-6 top-6 md:left-8 md:top-8 flex flex-col text-white/25 select-none font-medium" style={{
                  lineHeight: '1.5rem'
                }}>
                  {displayedCode.split('\n').map((_, i) => (
                    <div key={i} className="text-xs hover:text-white/40 transition-colors h-6">{String(i + 1).padStart(2, '0')}</div>
                  ))}
                </div>
                
                <pre className="text-white/90 overflow-x-auto pl-12 relative z-10" style={{
                  lineHeight: '1.5rem'
                }}>
                  <code style={{ whiteSpace: 'pre' }}>
                    {displayedCode}
                  </code>
                  <span className="inline-block w-2 h-5 bg-[var(--accent-cyan)] animate-pulse ml-1 shadow-lg shadow-[var(--accent-cyan)]" style={{verticalAlign: 'text-top'}}></span>
                </pre>
                
                {/* Typing indicator */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 rounded-lg backdrop-blur-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <span className="text-[10px] text-white/60">Processing...</span>
                </div>
              </div>

              {/* Enhanced Progress indicators */}
              <div className="flex gap-3 px-6 md:px-8 pb-6 bg-gradient-to-t from-[#0A0A14]/80 to-transparent pt-4">
                {codeSnippets.map((snippet, i) => (
                  <div
                    key={i}
                    className={`group/indicator relative h-2.5 flex-1 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                      i === currentSnippet ? 'bg-[var(--accent-cyan)]' : 'bg-[#1A1A2E] hover:bg-[#252540]'
                    }`}
                    onClick={() => handleSnippetChange(i)}
                    style={{
                      boxShadow: i === currentSnippet ? '0 0 15px rgba(0,229,255,0.6)' : 'none'
                    }}
                  >
                    {/* Active indicator animations */}
                    {i === currentSnippet && (
                      <div className="absolute inset-0 bg-[var(--accent-cyan)] opacity-50 animate-ping"></div>
                    )}
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-[#0A0A14]/95 border border-[var(--accent-cyan)]/40 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover/indicator:opacity-100 transition-all duration-300 pointer-events-none z-20 backdrop-blur-md shadow-xl">
                      <div className="font-semibold text-[var(--accent-cyan)]">{snippet.title}</div>
                      <div className="text-[10px] text-white/60 mt-0.5">{snippet.subtitle}</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--accent-cyan)]/40"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - PREMIUM DYNAMIC System Visualization */}
          <div className="relative h-[450px] md:h-[550px] lg:h-[600px] group">
            {/* Outer glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-[var(--accent-magenta)]/30 via-[var(--accent-cyan)]/25 to-[var(--accent-magenta)]/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60 group-hover:opacity-100"></div>
            
            <div className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-magenta)]/50 bg-[#0D0D1A]/95 backdrop-blur-md overflow-hidden shadow-2xl shadow-[var(--accent-magenta)]/20 hover:shadow-[var(--accent-magenta)]/30 transition-all duration-700">
              {/* Header info bar */}
              <div className="absolute top-0 left-0 right-0 px-5 py-3 bg-[#0A0A14]/95 border-b border-[var(--accent-magenta)]/30 backdrop-blur-sm z-20 flex items-center justify-between">
                <div className={`flex items-center gap-2 transition-all duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <Activity className="w-4 h-4 text-[var(--accent-magenta)] animate-pulse" />
                  <span className="text-xs text-white/80 font-semibold">{currentData.title} Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-[10px] text-white/60">ACTIVE</span>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pt-14 pb-24">
                {/* Dynamic network visualization */}
                <div className="relative w-full h-full p-8 md:p-12">
                  {/* Enhanced Dynamic Nodes */}
                  {currentData.nodes.map((node, index) => {
                    const NodeIcon = getIcon(node.icon);
                    const colorMap: any = {
                      cyan: 'var(--accent-cyan)',
                      magenta: 'var(--accent-magenta)',
                      orange: 'var(--accent-orange)'
                    };
                    const shadowMap: any = {
                      cyan: 'rgba(0,229,255,0.6)',
                      magenta: 'rgba(185,0,255,0.6)',
                      orange: 'rgba(255,122,0,0.6)'
                    };
                    
                    const isCenter = node.position.top === '50%' && node.position.left === '50%';
                    const isHovered = hoveredNode === index;
                    const size = isCenter ? 'w-24 h-24' : 'w-20 h-20';
                    const iconSize = isCenter ? 'w-9 h-9' : 'w-6 h-6';
                    const borderWidth = isCenter ? '3px' : '2.5px';
                    
                    // Calculate position styles
                    const positionStyles: any = {};
                    if (node.position.top) positionStyles.top = node.position.top;
                    if (node.position.bottom) positionStyles.bottom = node.position.bottom;
                    if (node.position.left) positionStyles.left = node.position.left;
                    if (node.position.right) positionStyles.right = node.position.right;
                    
                    return (
                      <div
                        key={`${currentSnippet}-node-${index}`}
                        className={`absolute group/node cursor-pointer transition-all duration-700 ease-out ${
                          isTransitioning ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                        }`}
                        style={{
                          ...positionStyles,
                          transform: isCenter 
                            ? `translate(-50%, -50%) ${isTransitioning ? 'scale(0.5) rotate(180deg)' : isHovered ? 'scale(1.15) rotate(0deg)' : 'scale(1) rotate(0deg)'}` 
                            : isTransitioning ? 'scale(0.5) rotate(180deg)' : isHovered ? 'scale(1.15) rotate(0deg)' : 'scale(1) rotate(0deg)',
                          transitionDelay: `${index * 80}ms`,
                          zIndex: isHovered ? 30 : isCenter ? 20 : 10
                        }}
                        onMouseEnter={() => setHoveredNode(index)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div
                          className={`relative ${size} rounded-full flex items-center justify-center transition-all duration-500`}
                          style={{
                            backgroundColor: `${colorMap[node.color]}30`,
                            border: `${borderWidth} solid ${colorMap[node.color]}`,
                            boxShadow: `0 0 ${isCenter ? '40px' : '30px'} ${shadowMap[node.color]}`
                          }}
                        >
                          <NodeIcon 
                            className={`${iconSize} transition-all duration-500 ${isHovered ? 'rotate-180 scale-110' : ''}`} 
                            style={{ 
                              color: colorMap[node.color],
                              filter: `drop-shadow(0 0 6px ${shadowMap[node.color]})`
                            }} 
                          />
                          
                          {/* Multiple animated rings */}
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{
                              backgroundColor: `${colorMap[node.color]}20`,
                              animationDelay: `${index * 0.3}s`,
                              animationDuration: '2s'
                            }}
                          ></div>
                          <div
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              backgroundColor: `${colorMap[node.color]}15`,
                              animationDelay: `${index * 0.3 + 0.5}s`,
                              animationDuration: '3s'
                            }}
                          ></div>
                          
                          {/* Rotating outer ring */}
                          {isCenter && (
                            <div className="absolute inset-[-10px] rounded-full opacity-50" style={{
                              background: `conic-gradient(from 0deg, ${colorMap[node.color]}, transparent, ${colorMap[node.color]})`,
                              animation: 'rotateBorder 3s linear infinite'
                            }}></div>
                          )}
                          
                          {/* Activity indicator */}
                          <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#0A0A14]/90 border rounded-full text-[9px] font-bold" style={{
                            borderColor: colorMap[node.color],
                            color: colorMap[node.color],
                            boxShadow: `0 0 10px ${shadowMap[node.color]}`
                          }}>
                            {node.activity}%
                          </div>
                        </div>
                        
                        {/* Enhanced tooltip with details */}
                        <div 
                          className={`absolute ${isCenter ? 'top-full mt-6' : 'top-full mt-3'} left-1/2 -translate-x-1/2 transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          }`}
                          style={{ zIndex: 40 }}
                        >
                          <div className="px-4 py-2.5 bg-[#0A0A14]/98 border-2 rounded-xl text-xs backdrop-blur-md shadow-2xl min-w-[140px]"
                            style={{
                              borderColor: `${colorMap[node.color]}70`,
                              boxShadow: `0 0 20px ${shadowMap[node.color]}`
                            }}
                          >
                            <div className="font-bold text-white mb-1">{node.label}</div>
                            <div className="text-[10px] mb-2" style={{color: colorMap[node.color]}}>{node.sublabel}</div>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                              <Activity className="w-3 h-3" />
                              <span>Activity: {node.activity}%</span>
                            </div>
                            {/* Arrow pointing up */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent" style={{
                              borderBottomColor: `${colorMap[node.color]}70`,
                              borderLeftWidth: '6px',
                              borderRightWidth: '6px',
                              borderBottomWidth: '6px'
                            }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Enhanced Connecting lines */}
                  <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <defs>
                      <linearGradient id={`lineGradient1-${currentSnippet}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id={`lineGradient2-${currentSnippet}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-magenta)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--accent-magenta)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--accent-magenta)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <line x1="18%" y1="18%" x2="50%" y2="50%" stroke={`url(#lineGradient1-${currentSnippet})`} strokeWidth="3">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </line>
                    <line x1="82%" y1="18%" x2="50%" y2="50%" stroke={`url(#lineGradient2-${currentSnippet})`} strokeWidth="3">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    <line x1="22%" y1="78%" x2="50%" y2="50%" stroke={`url(#lineGradient1-${currentSnippet})`} strokeWidth="3">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="78%" y1="78%" x2="50%" y2="50%" stroke={`url(#lineGradient2-${currentSnippet})`} strokeWidth="3">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </line>
                  </svg>

                  {/* Enhanced particle system */}
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={`${currentSnippet}-particle-${i}`}
                      className={`absolute w-2.5 h-2.5 rounded-full shadow-xl pointer-events-none transition-opacity duration-500 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{
                        top: '50%',
                        left: '50%',
                        background: currentData.particleColor,
                        boxShadow: `0 0 15px ${currentData.particleColor}`,
                        animation: `flowParticle${i % 4 + 1} ${currentData.particleSpeed}s ease-in-out infinite`,
                        animationDelay: `${i * 0.25}s`,
                      }}
                    >
                      {/* Particle trail */}
                      <div className="absolute inset-0 rounded-full animate-ping" style={{
                        background: currentData.particleColor,
                        opacity: 0.4
                      }}></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom info panel */}
              <div 
                className={`absolute bottom-0 left-0 right-0 px-5 py-4 bg-[#0A0A14]/95 border-t border-[var(--accent-magenta)]/30 backdrop-blur-sm transition-all duration-700 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <p className="text-white/85 text-xs md:text-sm font-medium mb-1 text-center leading-relaxed">
                  {currentData.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] text-white/50 mt-2">
                  {currentData.nodes.slice(0, 4).map((n, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <span>·</span>}
                      {n.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced custom animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes flowParticle1 {
          0% { top: 50%; left: 50%; opacity: 0; transform: scale(0); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 0.9; }
          100% { top: 18%; left: 18%; opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes flowParticle2 {
          0% { top: 50%; left: 50%; opacity: 0; transform: scale(0); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 0.9; }
          100% { top: 18%; left: 82%; opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes flowParticle3 {
          0% { top: 50%; left: 50%; opacity: 0; transform: scale(0); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 0.9; }
          100% { top: 78%; left: 22%; opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes flowParticle4 {
          0% { top: 50%; left: 50%; opacity: 0; transform: scale(0); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 0.9; }
          100% { top: 78%; left: 78%; opacity: 0; transform: scale(0.5); }
        }
      `}</style>
    </section>
  );
}