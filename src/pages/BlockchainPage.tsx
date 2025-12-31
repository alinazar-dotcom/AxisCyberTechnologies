import { Blocks, Shield, Coins, Lock, Zap, Sparkles, ArrowRight, CheckCircle2, Trophy, Target, Users, Rocket, GitBranch, Database, Globe, TrendingUp, Wallet, Code2, Network, FileCode, Server, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlockchainPage() {
  const capabilities = [
    {
      icon: Code2,
      title: 'Smart Contract Development',
      description: 'Secure, audited smart contracts built with industry best practices for maximum reliability.',
      features: ['ERC-20/721/1155 Tokens', 'Custom Contract Logic', 'Gas Optimization', 'Security Audits']
    },
    {
      icon: Coins,
      title: 'DeFi Protocol Architecture',
      description: 'Build decentralized finance platforms with liquidity pools, staking, and yield farming.',
      features: ['AMM & DEX Development', 'Yield Farming Protocols', 'Liquidity Mining', 'Governance Tokens']
    },
    {
      icon: Eye,
      title: 'NFT Platforms & Marketplaces',
      description: 'End-to-end NFT solutions from minting to marketplace integration and royalty systems.',
      features: ['NFT Minting Platforms', 'Marketplace Development', 'Royalty Systems', 'Metadata Management']
    },
    {
      icon: Users,
      title: 'DAO & Governance',
      description: 'Decentralized autonomous organizations with on-chain voting and treasury management.',
      features: ['Governance Frameworks', 'Voting Mechanisms', 'Treasury Management', 'Proposal Systems']
    },
    {
      icon: Wallet,
      title: 'Web3 Wallet Integration',
      description: 'Seamless wallet connectivity with MetaMask, WalletConnect, and major Web3 providers.',
      features: ['Multi-Wallet Support', 'Transaction Signing', 'Chain Switching', 'Balance Management']
    },
    {
      icon: Network,
      title: 'Layer 2 & Scaling Solutions',
      description: 'Implement high-performance Layer 2 solutions for reduced gas fees and faster transactions.',
      features: ['Polygon Integration', 'Arbitrum & Optimism', 'zkSync & StarkNet', 'Cross-chain Bridges']
    }
  ];

  const blockchains = [
    { name: 'Ethereum', category: 'Layer 1' },
    { name: 'Solana', category: 'Layer 1' },
    { name: 'Polygon', category: 'Layer 2' },
    { name: 'Binance Smart Chain', category: 'Layer 1' },
    { name: 'Arbitrum', category: 'Layer 2' },
    { name: 'Optimism', category: 'Layer 2' },
    { name: 'Avalanche', category: 'Layer 1' },
    { name: 'Polkadot', category: 'Layer 0' },
    { name: 'Cosmos', category: 'Layer 0' },
    { name: 'Near Protocol', category: 'Layer 1' },
    { name: 'Aptos', category: 'Layer 1' },
    { name: 'Sui', category: 'Layer 1' }
  ];

  const techStack = [
    { name: 'Solidity', category: 'Language' },
    { name: 'Rust', category: 'Language' },
    { name: 'Hardhat', category: 'Framework' },
    { name: 'Foundry', category: 'Framework' },
    { name: 'Truffle', category: 'Framework' },
    { name: 'Web3.js', category: 'Library' },
    { name: 'Ethers.js', category: 'Library' },
    { name: 'Wagmi', category: 'Library' },
    { name: 'RainbowKit', category: 'UI Library' },
    { name: 'The Graph', category: 'Indexing' },
    { name: 'IPFS', category: 'Storage' },
    { name: 'Chainlink', category: 'Oracles' }
  ];

  const useCases = [
    { icon: Coins, name: 'DeFi Platforms', description: 'Decentralized exchanges, lending, and staking protocols' },
    { icon: Eye, name: 'NFT Ecosystems', description: 'Digital collectibles, gaming assets, and marketplaces' },
    { icon: Shield, name: 'Supply Chain', description: 'Transparent tracking and provenance verification' },
    { icon: Globe, name: 'Identity Solutions', description: 'Decentralized identity and credential verification' }
  ];

  const caseStudies = [
    {
      title: 'DeFi Yield Aggregator',
      client: 'DeFi Protocol',
      metric: '$120M TVL',
      description: 'Built automated yield optimization protocol with cross-chain support and advanced strategies.',
      tech: ['Solidity', 'Hardhat', 'Chainlink', 'The Graph']
    },
    {
      title: 'NFT Marketplace Platform',
      client: 'Digital Art Platform',
      metric: '500K+ NFTs Minted',
      description: 'Developed full-stack NFT marketplace with lazy minting and royalty management.',
      tech: ['Solidity', 'React', 'IPFS', 'Polygon']
    },
    {
      title: 'Multi-chain DAO Platform',
      client: 'Governance Protocol',
      metric: '50K+ Active Voters',
      description: 'Created comprehensive DAO infrastructure with on-chain voting and treasury management.',
      tech: ['Solidity', 'Snapshot', 'Gnosis Safe', 'Aragon']
    }
  ];

  const process = [
    { step: '01', title: 'Architecture & Design', description: 'Smart contract architecture, tokenomics, and security planning.' },
    { step: '02', title: 'Development & Testing', description: 'Contract development with comprehensive unit and integration tests.' },
    { step: '03', title: 'Security Audit', description: 'Professional security audits and vulnerability assessments.' },
    { step: '04', title: 'Deployment & Support', description: 'Mainnet deployment with ongoing monitoring and maintenance.' }
  ];

  const securityFeatures = [
    { icon: Shield, title: 'Security First', description: 'Multi-layer security audits and best practices' },
    { icon: Lock, title: 'Encrypted', description: 'End-to-end encryption for all transactions' },
    { icon: Eye, title: 'Transparent', description: 'Open-source and verifiable on-chain' },
    { icon: Zap, title: 'Optimized', description: 'Gas-efficient and high-performance contracts' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-[150px]"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md mb-6">
              <Blocks className="w-4 h-4 text-cyan-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Blockchain & Web3</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Building the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Decentralized Future
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
              From smart contracts to full DeFi ecosystems, we architect secure, scalable blockchain solutions 
              that redefine trust and transparency.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <Rocket className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-white font-semibold">Start Your Web3 Project</span>
                <ArrowRight className="relative w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/case-studies"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-[var(--accent-cyan)]/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/10 to-transparent"></div>
                <Trophy className="relative w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                <span className="relative text-[var(--text-secondary)] group-hover:text-white font-semibold transition-colors duration-300">View Case Studies</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">85+</div>
                <div className="text-sm text-white/60">Blockchain Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.5B+</div>
                <div className="text-sm text-white/60">Total Value Locked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-white/60">Security Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0A0A14] to-[#0D0D1A]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-6 bg-white/[0.02] border border-cyan-500/20 rounded-xl hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-300">
                  <Icon className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Core Capabilities</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Complete{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Web3 Development
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 md:p-8 bg-white/[0.02] border-2 border-cyan-500/20 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-500"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-cyan-400 group-hover:text-white transition-colors duration-500 mb-3">
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
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
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

      {/* Supported Blockchains */}
      <section className="py-16 md:py-24 bg-[#0A0A14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Multi-Chain{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-white/60">Supporting all major blockchain networks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {blockchains.map((blockchain, index) => (
              <div
                key={index}
                className="group p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                <div className="text-white font-semibold mb-1">{blockchain.name}</div>
                <div className="text-xs text-white/50">{blockchain.category}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Development Stack
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 text-center"
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From concept to mainnet deployment with security at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                )}

                <div className="relative p-6 bg-white/[0.02] border-2 border-cyan-500/20 rounded-xl hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-cyan-500/20 mb-4">{phase.step}</div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-[#0A0A14]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real-World{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{useCase.name}</h3>
                  <p className="text-sm text-white/60">{useCase.description}</p>
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
              Proven{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Track Record
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-white/[0.02] border-2 border-cyan-500/20 rounded-2xl hover:bg-white/[0.04] hover:border-cyan-400/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-cyan-400" />
                  <span className="text-2xl font-bold text-white">{study.metric}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-sm text-white/50 mb-4">{study.client}</p>
                <p className="text-sm text-white/70 mb-6">{study.description}</p>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build on{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                The Blockchain?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              Whether it's DeFi, NFTs, or custom smart contracts, our blockchain experts 
              will bring your Web3 vision to life with security and scalability.
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
