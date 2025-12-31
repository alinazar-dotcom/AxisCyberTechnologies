'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

export default function TestOverflowPage() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [overflowingElements, setOverflowingElements] = useState<string[]>([]);

  useEffect(() => {
    const checkOverflow = () => {
      const width = window.innerWidth;
      const bodyW = document.body.scrollWidth;
      setWindowWidth(width);
      setBodyWidth(bodyW);
      setHasOverflow(bodyW > width);

      // Find elements causing overflow
      const elements = document.querySelectorAll('*');
      const overflowing: string[] = [];
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > width || rect.left < 0) {
          const tag = el.tagName.toLowerCase();
          const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
          const id = el.id ? `#${el.id}` : '';
          const selector = `${tag}${id}${classes}`;
          if (!overflowing.includes(selector)) {
            overflowing.push(selector);
          }
        }
      });
      
      setOverflowingElements(overflowing.slice(0, 10)); // Show max 10
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    // Re-check after a delay to catch dynamic elements
    const timeout = setTimeout(checkOverflow, 1000);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
      clearTimeout(timeout);
    };
  }, []);

  const criticalWidths = [
    { width: 1024, label: 'Small Desktop (Critical!)' },
    { width: 1280, label: 'Medium Desktop' },
    { width: 1366, label: 'Common Laptop' },
    { width: 1440, label: 'MacBook Pro' },
    { width: 1536, label: 'Large Desktop' },
    { width: 1920, label: 'Full HD' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            🔍 Overflow Detection
          </h1>
          <p className="text-lg text-white/70">
            Check for horizontal overflow issues
          </p>
        </div>

        {/* Overflow Status */}
        <div className={`mb-12 p-8 rounded-3xl border-2 ${
          hasOverflow 
            ? 'bg-red-500/10 border-red-500/50' 
            : 'bg-green-500/10 border-green-500/50'
        }`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            {hasOverflow ? (
              <>
                <X className="w-12 h-12 text-red-500" />
                <h2 className="text-3xl font-black text-red-500">OVERFLOW DETECTED!</h2>
              </>
            ) : (
              <>
                <Check className="w-12 h-12 text-green-500" />
                <h2 className="text-3xl font-black text-green-500">NO OVERFLOW ✓</h2>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black/40 p-6 rounded-2xl">
              <div className="text-sm text-white/60 mb-2">Window Width</div>
              <div className="text-4xl font-black text-white">{windowWidth}px</div>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl">
              <div className="text-sm text-white/60 mb-2">Body Width</div>
              <div className={`text-4xl font-black ${hasOverflow ? 'text-red-500' : 'text-green-500'}`}>
                {bodyWidth}px
              </div>
            </div>
          </div>

          {hasOverflow && (
            <div className="bg-black/60 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-black text-white">Overflow by: {bodyWidth - windowWidth}px</h3>
              </div>
              <p className="text-white/70 text-sm">
                The page is {bodyWidth - windowWidth}px wider than the viewport. This causes horizontal scrolling.
              </p>
            </div>
          )}
        </div>

        {/* Overflowing Elements */}
        {overflowingElements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Elements Causing Overflow
            </h2>
            <div className="bg-black/40 backdrop-blur-xl border-2 border-red-500/30 rounded-2xl p-6">
              <div className="space-y-2">
                {overflowingElements.map((selector, i) => (
                  <div key={i} className="bg-black/60 p-4 rounded-xl font-mono text-sm text-red-400">
                    {selector}
                  </div>
                ))}
              </div>
              {overflowingElements.length === 10 && (
                <p className="text-xs text-white/40 mt-4">Showing first 10 elements. There may be more.</p>
              )}
            </div>
          </section>
        )}

        {/* Critical Widths Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Test at Critical Widths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalWidths.map((item, i) => {
              const isCurrentWidth = Math.abs(windowWidth - item.width) < 50;
              const isProblemWidth = item.width === 1024 || item.width === 1280;
              
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isCurrentWidth
                      ? 'bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)]/50 scale-105'
                      : isProblemWidth
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-black/40 border-white/10'
                  }`}
                >
                  <div className={`text-2xl font-black mb-2 ${
                    isCurrentWidth ? 'text-[var(--neon-cyan)]' : 'text-white'
                  }`}>
                    {item.width}px
                  </div>
                  <div className="text-sm text-white/70 mb-2">{item.label}</div>
                  {isProblemWidth && (
                    <div className="text-xs text-yellow-500 font-black">⚠️ CRITICAL</div>
                  )}
                  {isCurrentWidth && (
                    <div className="text-xs text-[var(--neon-cyan)] font-black mt-2">CURRENT WIDTH</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Header Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Header Navigation Test</h2>
          <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8">
            <div className="space-y-4 text-white/80">
              <h3 className="font-black text-white text-lg mb-4">Check These Items:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-black text-[var(--neon-purple)]">At 1024px:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Logo is compact</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Nav items are small</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Text is xs/11px</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Icons are 12-14px</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Shows "More" not "Resources"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Shows "Contact" not "Contact Us"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>No horizontal scroll</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-black text-[var(--neon-green)]">At 1920px:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Logo is larger</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Nav items spacious</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Full text labels</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Icons are 16px</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Shows "Resources"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Shows "Contact Us"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-white/20 mt-0.5 shrink-0"></div>
                      <span>Balanced layout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6">How to Fix Overflow</h2>
          <div className="bg-black/40 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8">
            <div className="space-y-4 text-white/80 text-sm">
              <div>
                <h3 className="font-black text-white mb-2">1. Reduce Padding</h3>
                <p>Decrease px values in nav items, buttons, and container</p>
              </div>
              <div>
                <h3 className="font-black text-white mb-2">2. Reduce Font Sizes</h3>
                <p>Use smaller text sizes at critical breakpoints (1024px-1280px)</p>
              </div>
              <div>
                <h3 className="font-black text-white mb-2">3. Reduce Icon Sizes</h3>
                <p>Make icons smaller (12px-14px) at small desktop sizes</p>
              </div>
              <div>
                <h3 className="font-black text-white mb-2">4. Reduce Gaps</h3>
                <p>Minimize gap between nav items (gap-0 or gap-0.5)</p>
              </div>
              <div>
                <h3 className="font-black text-white mb-2">5. Shorter Text</h3>
                <p>Use abbreviated labels ("More" vs "Resources", "Contact" vs "Contact Us")</p>
              </div>
              <div>
                <h3 className="font-black text-white mb-2">6. Add overflow-hidden</h3>
                <p>Add overflow-hidden to header to prevent visual overflow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-12 flex justify-center gap-4">
          <a href="/" className="px-6 py-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl text-white font-black">
            ← Back to Homepage
          </a>
        </div>

      </div>
    </div>
  );
}
