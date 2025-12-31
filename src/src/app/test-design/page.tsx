'use client';

import { Zap, Sparkles, Code, Rocket } from 'lucide-react';

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            🎨 Design System Test
          </h1>
          <p className="text-xl text-white/70">
            If you see neon colors and effects, the system works!
          </p>
        </div>

        {/* Color Swatches */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">1. Neon Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="w-full h-32 bg-[var(--neon-purple)] rounded-2xl mb-2 shadow-neon-purple-lg"></div>
              <p className="text-sm text-white/80 text-center font-black">Purple</p>
              <p className="text-xs text-white/60 text-center">#DD00FF</p>
            </div>
            <div>
              <div className="w-full h-32 bg-[var(--neon-cyan)] rounded-2xl mb-2 shadow-neon-cyan-lg"></div>
              <p className="text-sm text-white/80 text-center font-black">Cyan</p>
              <p className="text-xs text-white/60 text-center">#00FFFF</p>
            </div>
            <div>
              <div className="w-full h-32 bg-[var(--neon-pink)] rounded-2xl mb-2 shadow-neon-pink-lg"></div>
              <p className="text-sm text-white/80 text-center font-black">Pink</p>
              <p className="text-xs text-white/60 text-center">#FF0099</p>
            </div>
            <div>
              <div className="w-full h-32 bg-[var(--neon-green)] rounded-2xl mb-2 shadow-neon-green-lg"></div>
              <p className="text-sm text-white/80 text-center font-black">Green</p>
              <p className="text-xs text-white/60 text-center">#00FF9D</p>
            </div>
            <div>
              <div className="w-full h-32 bg-[var(--neon-orange)] rounded-2xl mb-2"></div>
              <p className="text-sm text-white/80 text-center font-black">Orange</p>
              <p className="text-xs text-white/60 text-center">#FF7A00</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">2. Typography</h2>
          <div className="space-y-4 bg-black/40 p-8 rounded-3xl border-2 border-white/10">
            <h1 className="text-5xl font-black text-white">H1 - Space Grotesk Black</h1>
            <h2 className="text-4xl font-black text-white">H2 - Space Grotesk Black</h2>
            <h3 className="text-3xl font-black text-white">H3 - Space Grotesk Bold</h3>
            <p className="text-lg text-white/80">Body text - Inter Regular (this should be clean and professional)</p>
          </div>
        </section>

        {/* Gradient Text */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">3. Gradient Effects</h2>
          <div className="space-y-6">
            <p className="gradient-text-cyber text-6xl font-black">
              Neon Cyber Gradient
            </p>
            <p className="gradient-text-fire text-6xl font-black">
              Fire Gradient
            </p>
          </div>
        </section>

        {/* Cards with Hover Effects */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">4. Interactive Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, color: 'var(--neon-purple)', label: 'Purple Card' },
              { icon: Sparkles, color: 'var(--neon-cyan)', label: 'Cyan Card' },
              { icon: Code, color: 'var(--neon-pink)', label: 'Pink Card' },
              { icon: Rocket, color: 'var(--neon-green)', label: 'Green Card' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{
                    borderColor: `${item.color}40`,
                    boxShadow: `0 0 30px ${item.color}20`
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle at center, ${item.color}30, transparent 70%)` }}
                  ></div>
                  <div className="relative z-10">
                    <Icon
                      className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500"
                      style={{ color: item.color }}
                    />
                    <h3 className="text-xl font-black text-white mb-2">{item.label}</h3>
                    <p className="text-sm text-white/60">Hover me!</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">5. Stats Display (100%)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '100%', label: 'Success Rate', color: 'var(--neon-purple)' },
              { value: '100%', label: 'Client Satisfaction', color: 'var(--neon-cyan)' },
              { value: '100%', label: 'On-Time Delivery', color: 'var(--neon-pink)' },
              { value: '100%', label: 'Security Standards', color: 'var(--neon-green)' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-8 bg-black/40 backdrop-blur-xl border-2 rounded-3xl text-center"
                style={{
                  borderColor: `${stat.color}40`,
                  boxShadow: `0 0 30px ${stat.color}20`
                }}
              >
                <div
                  className="text-5xl font-black mb-2"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}80`
                  }}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-white/70 font-black">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">6. Buttons & CTAs</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-2xl text-white font-black text-lg transition-all duration-300 hover:shadow-neon-purple-xl hover:-translate-y-1">
              Primary CTA
            </button>
            <button className="px-8 py-4 bg-black/50 backdrop-blur-xl border-2 border-[var(--neon-cyan)]/30 rounded-2xl text-white font-black text-lg transition-all duration-300 hover:border-[var(--neon-cyan)]/50 hover:shadow-neon-cyan-lg">
              Secondary CTA
            </button>
            <button className="px-8 py-4 bg-black/50 backdrop-blur-xl border-2 border-[var(--neon-pink)]/30 rounded-2xl text-white font-black text-lg transition-all duration-300 hover:border-[var(--neon-pink)]/50">
              Tertiary CTA
            </button>
          </div>
        </section>

        {/* Animations */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6">7. Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-black/40 border-2 border-[var(--neon-purple)]/30 rounded-3xl">
              <div className="w-20 h-20 bg-[var(--neon-purple)] rounded-full animate-pulse mb-4 mx-auto"></div>
              <p className="text-center text-white/80 font-black">Pulse</p>
            </div>
            <div className="p-8 bg-black/40 border-2 border-[var(--neon-cyan)]/30 rounded-3xl">
              <div className="w-20 h-20 bg-[var(--neon-cyan)] rounded-full animate-spin-slow mb-4 mx-auto"></div>
              <p className="text-center text-white/80 font-black">Spin</p>
            </div>
            <div className="p-8 bg-black/40 border-2 border-[var(--neon-pink)]/30 rounded-3xl">
              <div className="w-20 h-20 bg-[var(--neon-pink)] rounded-full animate-float mb-4 mx-auto"></div>
              <p className="text-center text-white/80 font-black">Float</p>
            </div>
          </div>
        </section>

        {/* Status Indicator */}
        <section className="mb-16">
          <div className="p-12 bg-black/60 backdrop-blur-xl border-2 border-[var(--neon-green)]/50 rounded-3xl text-center">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-4xl font-black text-white mb-4">
              If You See This Correctly
            </h2>
            <p className="text-xl text-white/80 mb-6">
              Your design system is working perfectly!
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--neon-green)]/20 border-2 border-[var(--neon-green)]/50 rounded-full">
              <div className="w-3 h-3 bg-[var(--neon-green)] rounded-full animate-pulse"></div>
              <span className="text-[var(--neon-green)] font-black">SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h2 className="text-3xl font-black text-white mb-6">✅ Visual Checklist</h2>
          <div className="bg-black/40 p-8 rounded-3xl border-2 border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Colors are bright and neon (not dull or missing)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Background is very dark (#05060A)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Headings use Space Grotesk (geometric font)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Gradient text effects are visible</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Cards glow on hover</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">All stats show "100%"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--neon-green)] flex items-center justify-center text-black font-black text-xs">✓</div>
                <p className="text-white/80">Animations are smooth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <a href="/" className="px-8 py-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-2xl text-white font-black transition-all duration-300 hover:-translate-y-1">
            ← Back to Homepage
          </a>
          <a href="/about" className="px-8 py-4 bg-black/50 backdrop-blur-xl border-2 border-[var(--neon-cyan)]/30 rounded-2xl text-white font-black transition-all duration-300 hover:border-[var(--neon-cyan)]/50">
            Test About Page →
          </a>
        </div>

      </div>
    </div>
  );
}
