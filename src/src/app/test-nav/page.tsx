'use client';

import { Smartphone, Tablet, Monitor, Tv } from 'lucide-react';
import { useState } from 'react';

export default function TestNavPage() {
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  // Update width on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      setCurrentWidth(window.innerWidth);
      const handleResize = () => setCurrentWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  const breakpoints = [
    { name: 'iPhone SE', width: 320, icon: Smartphone, color: 'var(--neon-pink)' },
    { name: 'iPhone 12/13', width: 375, icon: Smartphone, color: 'var(--neon-pink)' },
    { name: 'Small Mobile', width: 640, icon: Smartphone, color: 'var(--neon-cyan)' },
    { name: 'Tablet', width: 768, icon: Tablet, color: 'var(--neon-purple)' },
    { name: 'iPad Pro', width: 1024, icon: Tablet, color: 'var(--neon-purple)' },
    { name: 'Small Desktop', width: 1280, icon: Monitor, color: 'var(--neon-green)' },
    { name: 'Desktop', width: 1536, icon: Monitor, color: 'var(--neon-green)' },
    { name: 'Large Desktop', width: 1920, icon: Tv, color: 'var(--neon-orange)' },
  ];

  const getCurrentBreakpoint = () => {
    if (currentWidth < 640) return 'Mobile';
    if (currentWidth < 768) return 'Small Mobile';
    if (currentWidth < 1024) return 'Tablet';
    if (currentWidth < 1280) return 'Small Desktop';
    if (currentWidth < 1536) return 'Medium Desktop';
    return 'Large Desktop';
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            🧭 Navigation Test Page
          </h1>
          <p className="text-lg text-white/70 mb-6">
            Test the navigation responsiveness at different screen sizes
          </p>

          {/* Current Screen Info */}
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-black/40 backdrop-blur-xl border-2 border-[var(--neon-cyan)]/30 rounded-2xl">
            <div>
              <div className="text-sm text-white/60">Current Width</div>
              <div className="text-3xl font-black text-[var(--neon-cyan)]">{currentWidth}px</div>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div>
              <div className="text-sm text-white/60">Breakpoint</div>
              <div className="text-2xl font-black text-white">{getCurrentBreakpoint()}</div>
            </div>
          </div>
        </div>

        {/* Breakpoint Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">📱 Test These Breakpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {breakpoints.map((bp, index) => {
              const Icon = bp.icon;
              const isActive = currentWidth === bp.width || (currentWidth >= bp.width - 20 && currentWidth <= bp.width + 20);

              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 ${isActive
                      ? 'bg-black/60 border-[var(--neon-cyan)]/50 shadow-neon-cyan-lg scale-105'
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                    }`}
                >
                  <Icon
                    className="w-8 h-8 mb-3"
                    style={{ color: bp.color }}
                  />
                  <h3 className="text-lg font-black text-white mb-1">{bp.name}</h3>
                  <p className="text-sm text-white/60">{bp.width}px</p>
                  {isActive && (
                    <div className="mt-3 px-3 py-1 bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]/50 rounded-full text-xs text-[var(--neon-cyan)] font-black inline-block">
                      ACTIVE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Testing Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">✅ Navigation Checklist</h2>
          <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Checks */}
              <div>
                <h3 className="text-lg font-black text-[var(--neon-pink)] mb-4">📱 Mobile (&lt; 1024px)</h3>
                <div className="space-y-2">
                  {[
                    'Logo is compact and readable',
                    'Menu button is visible',
                    'Tapping menu button opens menu',
                    'Mobile menu is full width',
                    'All menu items are tappable',
                    'Body scroll is locked',
                    'Can close menu with backdrop tap',
                    'Active page is highlighted',
                    'Touch feedback on tap',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-[var(--neon-pink)]/30 mt-0.5 shrink-0"></div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Checks */}
              <div>
                <h3 className="text-lg font-black text-[var(--neon-green)] mb-4">💻 Desktop (≥ 1024px)</h3>
                <div className="space-y-2">
                  {[
                    'All nav items visible',
                    'No text overflow or cutoff',
                    'Hover effects work',
                    'Resources dropdown appears',
                    'Contact button is clickable',
                    'Active page is highlighted',
                    'Icons are properly sized',
                    'Spacing looks balanced',
                    'No horizontal scroll',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-[var(--neon-green)]/30 mt-0.5 shrink-0"></div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specific Breakpoint Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">🎯 Critical Breakpoints</h2>
          <div className="space-y-4">
            {/* 1024px */}
            <div className="bg-black/40 backdrop-blur-xl border-2 border-[var(--neon-purple)]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="w-6 h-6 text-[var(--neon-purple)]" />
                <h3 className="text-xl font-black text-white">1024px - Small Desktop (Critical!)</h3>
              </div>
              <p className="text-white/70 mb-3">
                This is the most critical breakpoint where mobile switches to desktop nav.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>✅ Desktop navigation should appear</div>
                <div>✅ Nav items should fit without overflow</div>
                <div>✅ "More" text shown instead of "Resources"</div>
                <div>✅ "Contact" text shown instead of "Contact Us"</div>
                <div>✅ Icons should be smaller (14px)</div>
              </div>
            </div>

            {/* 375px */}
            <div className="bg-black/40 backdrop-blur-xl border-2 border-[var(--neon-cyan)]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-6 h-6 text-[var(--neon-cyan)]" />
                <h3 className="text-xl font-black text-white">375px - iPhone 12/13/14</h3>
              </div>
              <p className="text-white/70 mb-3">
                Most common mobile size. Navigation should be perfect here.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div>✅ Logo should be 44x44px</div>
                <div>✅ Menu button should be easily tappable</div>
                <div>✅ Mobile menu should look spacious</div>
                <div>✅ All text should be readable</div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">📋 How to Test</h2>
          <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-6 md:p-8">
            <div className="space-y-4 text-white/80">
              <div>
                <h3 className="font-black text-white mb-2">1. Desktop Testing</h3>
                <p className="text-sm mb-2">Open Chrome DevTools (F12) → Toggle device toolbar (Cmd/Ctrl + Shift + M)</p>
                <p className="text-sm">Resize the viewport to each breakpoint width and check the navigation.</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-black text-white mb-2">2. Mobile Testing</h3>
                <p className="text-sm mb-2">Use Chrome DevTools device emulator:</p>
                <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                  <li>iPhone SE (375x667)</li>
                  <li>iPhone 12/13 (390x844)</li>
                  <li>iPad (768x1024)</li>
                  <li>iPad Pro (1024x1366)</li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-black text-white mb-2">3. Real Device Testing</h3>
                <p className="text-sm">Test on your actual phone/tablet for the best results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Browser Testing */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6">🌐 Browser Compatibility</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Chrome', status: 'Optimized', color: 'var(--neon-green)' },
              { name: 'Safari', status: 'Tested', color: 'var(--neon-cyan)' },
              { name: 'Firefox', status: 'Tested', color: 'var(--neon-purple)' },
              { name: 'Edge', status: 'Optimized', color: 'var(--neon-green)' },
            ].map((browser, i) => (
              <div
                key={i}
                className="p-6 bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl text-center hover:border-white/20 transition-colors duration-300"
              >
                <h3 className="font-black text-white mb-2">{browser.name}</h3>
                <div
                  className="text-sm font-black"
                  style={{ color: browser.color }}
                >
                  {browser.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl text-white font-black transition-all duration-300 hover:-translate-y-1"
          >
            ← Back to Homepage
          </a>
          <a
            href="/test-design"
            className="px-6 py-3 bg-black/50 backdrop-blur-xl border-2 border-[var(--neon-cyan)]/30 rounded-xl text-white font-black transition-all duration-300 hover:border-[var(--neon-cyan)]/50"
          >
            Test Design System →
          </a>
        </div>

      </div>
    </div>
  );
}
