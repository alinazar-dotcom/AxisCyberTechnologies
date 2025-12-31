# Axis Cyber Technologies - Complete Brand Identity Guide
## Version 2.0 | Ultra-Premium Neon Cyberpunk Edition

---

## 📋 Table of Contents
1. [Brand Overview](#brand-overview)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [Visual Effects](#visual-effects)
7. [Animation System](#animation-system)
8. [Iconography](#iconography)
9. [Brand Voice & Messaging](#brand-voice--messaging)
10. [Company Information](#company-information)
11. [Design Philosophy](#design-philosophy)
12. [Code Examples](#code-examples)

---

## 🎯 Brand Overview

### **Company Name:** Axis Cyber Technologies

### **Tagline:** 
"Engineering the Future. Building the Impossible."

### **Brand Personality:**
- **Cutting-Edge**: Pioneering next-generation technology solutions
- **Premium**: Ultra-high-end, enterprise-grade quality
- **Futuristic**: Cyberpunk-inspired, neon aesthetic
- **Global**: 24/7 operations across 4 continents
- **Innovative**: First-movers in AI/ML, Blockchain, Web3
- **Reliable**: 98% success rate, 500+ projects delivered

### **Design Philosophy:**
"Ultra-Premium Neon Cyberpunk" - A sophisticated blend of dark, mysterious backgrounds with vibrant, glowing neon accents. Think Blade Runner meets Silicon Valley.

### **Founded:** 2012

### **Company Timeline:**
- **2012**: Founded in Lahore, Pakistan
- **2014-2017**: Early growth phase
- **2018-2020**: Global expansion
- **2021-2023**: AI/ML and Blockchain divisions launched
- **2024-2025**: 13 years of continuous innovation

---

## 🎨 Color Palette

### **Primary Brand Colors**

#### **Neon Accent Colors (Primary)**
```css
--accent-cyan: #00E5FF      /* Electric Cyan - Primary accent */
--accent-magenta: #B900FF   /* Neon Purple/Magenta - Secondary accent */
--accent-orange: #FF7A00    /* Neon Orange - Tertiary accent */
--accent-success: #00FF9D   /* Neon Green - Success states */
```

**Usage:**
- Cyan: Primary CTAs, links, active states, main highlights
- Magenta: Secondary accents, hover states, decorative elements
- Orange: Tertiary accents, warnings, special highlights
- Green: Success messages, status indicators, online badges

#### **Enhanced Neon Variants**
```css
--cyan-primary: #00E5FF
--cyan-secondary: #00B8D4
--magenta-primary: #B900FF
--magenta-secondary: #9500D1
--orange-primary: #FF7A00
--orange-secondary: #E66A00
```

#### **Hot Pink & Electric Variants** (Ultra-Premium Enhancement)
```css
--hot-pink: #FF0099        /* Hot Pink - Ultra-premium accents */
--electric-cyan: #00FFFF   /* Electric Cyan - Enhanced glow */
--neon-purple: #DD00FF     /* Neon Purple - Vibrant highlights */
```

### **Background Colors (Ultra-Dark)**

```css
--bg-primary: #0B0D14      /* Main background - Deep space black */
--bg-secondary: #12161E    /* Secondary sections */
--bg-elevated: #1A1F2E     /* Cards, elevated elements */
--bg-card: #151923         /* Card backgrounds */
```

**Additional Background Shades:**
```css
--bg-ultra-dark: #05060A   /* Darkest - Hero sections */
--bg-dark-alt: #0A0A14     /* Alternate dark - Visual contrast */
--bg-section: #12132A      /* Section backgrounds */
```

### **Text Colors**

```css
--text-primary: #FFFFFF    /* Primary text - Pure white */
--text-secondary: #B8C5D6  /* Secondary text - Light gray-blue */
--text-muted: #7B8BA3      /* Muted text - Medium gray-blue */
```

**Usage Guide:**
- Primary (100%): Headlines, important text
- Secondary (70-80%): Body text, descriptions
- Muted (50-60%): Subtle text, captions, metadata

### **Border Colors**

```css
--border-subtle: rgba(0, 229, 255, 0.08)    /* 8% opacity */
--border-medium: rgba(0, 229, 255, 0.15)    /* 15% opacity */
--border-strong: rgba(0, 229, 255, 0.25)    /* 25% opacity */
```

**Enhanced Border Opacities:**
- Inactive: 8-10%
- Hover: 12-15%
- Active: 30-50%
- Focus: 40-60%

### **Color Usage Rules**

#### **Gradients (Primary Pattern)**
```css
/* Triple gradient (most common) */
background: linear-gradient(to right, 
  var(--accent-cyan), 
  var(--accent-magenta), 
  var(--accent-orange)
);

/* Dual gradient (secondary) */
background: linear-gradient(to right, 
  var(--accent-cyan), 
  var(--accent-magenta)
);

/* Subtle background gradient */
background: linear-gradient(to right, 
  rgba(0,229,255,0.1), 
  rgba(185,0,255,0.1), 
  rgba(255,122,0,0.1)
);
```

#### **Glow Effects**
```css
/* Standard glow */
box-shadow: 0 0 20px rgba(0,229,255,0.3);

/* Enhanced glow */
box-shadow: 0 0 40px rgba(0,229,255,0.5), 0 0 80px rgba(185,0,255,0.3);

/* Multi-layer glow */
box-shadow: 
  0 0 15px rgba(139,92,246,0.8),
  0 0 30px rgba(139,92,246,0.5),
  0 0 60px rgba(139,92,246,0.2);
```

#### **Drop Shadows**
```css
/* Text shadow with glow */
text-shadow: 0 0 30px rgba(0,229,255,0.4);
drop-shadow: 0 0 20px rgba(139,92,246,0.6);

/* Icon shadow */
filter: drop-shadow(0 0 10px rgba(0,229,255,0.8));
```

### **Opacity Scale**

**Background Opacities:**
- Ultra subtle: 2-3%
- Subtle: 4-6%
- Light: 8-10%
- Medium: 15-20%
- Strong: 25-30%
- Intense: 40-50%

**Border Opacities:**
- Default: 8%
- Hover: 15%
- Active: 30-40%
- Focus: 50%

**Glow Opacities:**
- Subtle: 20-30%
- Medium: 40-50%
- Strong: 60-80%
- Intense: 100%

---

## ✍️ Typography System

### **Font Families**

#### **Primary Fonts**
```css
/* Headings */
font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body Text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Font Sources:**
- Google Fonts or local fallbacks
- Always include system font fallbacks

### **Heading Scale**

#### **H1 - Hero Headlines**
```css
/* Mobile */
font-size: 2rem;          /* 32px */
line-height: 1.1;
font-weight: 700;

/* Tablet (768px+) */
font-size: 3.5rem;        /* 56px */

/* Desktop (1024px+) */
font-size: 4.5rem;        /* 72px */
```

**Usage:** Main hero headlines, primary page titles

#### **H2 - Section Headers**
```css
/* Mobile */
font-size: 1.75rem;       /* 28px */
line-height: 1.2;
font-weight: 700;

/* Tablet (768px+) */
font-size: 2.5rem;        /* 40px */

/* Desktop (1024px+) */
font-size: 3rem;          /* 48px */
```

**Usage:** Section titles, major headings

#### **H3 - Subsection Headers**
```css
/* Mobile */
font-size: 1.5rem;        /* 24px */
line-height: 1.3;
font-weight: 600;

/* Tablet (768px+) */
font-size: 1.75rem;       /* 28px */

/* Desktop (1024px+) */
font-size: 2rem;          /* 32px */
```

**Usage:** Card titles, subsection headers

#### **H4 - Card Titles**
```css
/* Mobile */
font-size: 1.25rem;       /* 20px */
line-height: 1.4;
font-weight: 600;

/* Tablet (768px+) */
font-size: 1.375rem;      /* 22px */

/* Desktop (1024px+) */
font-size: 1.5rem;        /* 24px */
```

**Usage:** Card titles, smaller headings

### **Body Text Scale**

#### **Paragraph Text**
```css
/* Mobile */
font-size: 1rem;          /* 16px */
line-height: 1.7;

/* Tablet (768px+) */
font-size: 1.0625rem;     /* 17px */

/* Desktop (1024px+) */
font-size: 1.125rem;      /* 18px */
```

#### **Small Text**
```css
font-size: 0.875rem;      /* 14px */
line-height: 1.5;
```

#### **Extra Small / Captions**
```css
font-size: 0.75rem;       /* 12px */
line-height: 1.4;
```

### **Font Weights**

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

**Usage Guide:**
- **Black (900)**: Primary CTAs, hero headlines
- **Bold (700)**: H1, H2, important emphasis
- **Semibold (600)**: H3, H4, card titles
- **Medium (500)**: Navigation, buttons
- **Normal (400)**: Body text

### **Letter Spacing**

```css
/* Tight - Headlines */
letter-spacing: -0.02em;

/* Normal - Body */
letter-spacing: 0;

/* Wide - Small caps, labels */
letter-spacing: 0.05em;

/* Extra wide - Tech labels */
letter-spacing: 0.3em;
```

### **Text Effects**

#### **Gradient Text**
```css
.gradient-text {
  background: linear-gradient(to right, 
    var(--accent-cyan), 
    var(--accent-magenta), 
    var(--accent-orange)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

#### **Glowing Text**
```css
.glow-text {
  text-shadow: 0 0 30px rgba(0,229,255,0.5);
}

.glow-text-strong {
  text-shadow: 
    0 0 20px rgba(0,229,255,0.8),
    0 0 40px rgba(0,229,255,0.5),
    0 0 60px rgba(0,229,255,0.2);
}
```

---

## 📐 Spacing & Layout

### **Spacing Scale (Tailwind/rem based)**

```css
/* Base spacing unit: 0.25rem (4px) */

--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### **Layout Widths**

```css
/* Container max-widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;    /* Primary container */
--container-3xl: 1600px;    /* Max width */
```

**Primary Container:**
```css
max-width: 1440px;
margin: 0 auto;
padding: 0 1rem;           /* Mobile */
padding: 0 1.5rem;         /* Tablet: 768px+ */
padding: 0 3rem;           /* Desktop: 1024px+ */
```

### **Section Spacing**

```css
/* Vertical section padding */

/* Mobile */
padding-top: 5rem;         /* 80px */
padding-bottom: 5rem;

/* Tablet (768px+) */
padding-top: 7rem;         /* 112px */
padding-bottom: 7rem;

/* Desktop (1024px+) */
padding-top: 8rem;         /* 128px */
padding-bottom: 8rem;
```

### **Grid Systems**

#### **Standard Grid**
```css
display: grid;
grid-template-columns: 1fr;                    /* Mobile */
grid-template-columns: repeat(2, 1fr);         /* Tablet: 768px+ */
grid-template-columns: repeat(3, 1fr);         /* Desktop: 1024px+ */
grid-template-columns: repeat(4, 1fr);         /* Large: 1280px+ */
gap: 1.5rem;                                   /* 24px */
```

#### **Card Grid (Most Common)**
```css
/* Services, features, etc. */
grid-template-columns: 1fr;                    /* Mobile */
grid-template-columns: repeat(2, 1fr);         /* Tablet: 640px+ */
grid-template-columns: repeat(3, 1fr);         /* Desktop: 1024px+ */
gap: 2rem;                                     /* 32px */
```

### **Border Radius Scale**

```css
--radius-sm: 0.5rem;       /* 8px - Small elements */
--radius-md: 0.75rem;      /* 12px - Buttons, inputs */
--radius-lg: 1rem;         /* 16px - Cards */
--radius-xl: 1.25rem;      /* 20px - Large cards */
--radius-2xl: 1.5rem;      /* 24px - Sections */
--radius-3xl: 2rem;        /* 32px - Hero sections */
--radius-full: 9999px;     /* Fully rounded */
```

### **Responsive Breakpoints**

```css
/* Tailwind defaults */
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

**Usage:**
- **Mobile-first**: Start with mobile, add larger breakpoints
- **sm (640px+)**: Large phones, small tablets
- **md (768px+)**: Tablets
- **lg (1024px+)**: Desktop, laptops
- **xl (1280px+)**: Large desktop
- **2xl (1536px+)**: Extra large screens

---

## 🎨 Component Patterns

### **1. Buttons**

#### **Primary CTA Button (Gradient)**
```jsx
<button className="relative px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] text-white rounded-xl hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] transition-all duration-700 font-bold hover:scale-105 group">
  <span>Button Text</span>
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
```

**Features:**
- Gradient background (cyan → magenta)
- 12px border radius (rounded-xl)
- Glow shadow on hover
- Scale transform (1.05x)
- Icon animation
- 700ms transitions

#### **Secondary Button (Outlined)**
```jsx
<button className="px-8 py-4 border-2 border-[var(--accent-cyan)]/30 bg-white/[0.03] text-white rounded-xl hover:border-[var(--accent-cyan)] hover:bg-white/[0.08] transition-all duration-300 font-semibold">
  Button Text
</button>
```

**Features:**
- 2px border with 30% opacity
- Subtle background (3% white)
- Hover: brighter border + background
- No scale transform
- 300ms transitions

#### **Tertiary/Ghost Button**
```jsx
<button className="px-6 py-3 text-[var(--accent-cyan)] hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-300">
  Button Text
</button>
```

### **2. Cards**

#### **Standard Card**
```jsx
<div className="p-6 md:p-8 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 group">
  {/* Card content */}
</div>
```

**Specifications:**
- **Background**: 2-3% white opacity
- **Border**: 2px solid, 8% white opacity
- **Border Radius**: 16px (rounded-2xl)
- **Padding**: 24px mobile, 32px desktop
- **Hover**: Brighten background + border
- **Transition**: 300ms

#### **Premium Card (Enhanced Glow)**
```jsx
<div className="relative p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-2 border-[var(--accent-cyan)]/30 rounded-2xl overflow-hidden group hover:border-[var(--accent-cyan)]/50 transition-all duration-500">
  {/* Glow effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-magenta)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {/* Content */}
  <div className="relative z-10">
    {/* Card content */}
  </div>
</div>
```

**Features:**
- Gradient background
- Colored border (cyan)
- Hover glow overlay
- Relative/absolute positioning

#### **Active/Selected Card**
```jsx
<div className="p-8 bg-gradient-to-r from-[var(--accent-cyan)]/20 via-[var(--accent-magenta)]/20 to-[var(--accent-orange)]/20 border-2 border-[var(--accent-cyan)]/50 rounded-2xl shadow-lg shadow-[var(--accent-cyan)]/20">
  {/* Active card content */}
</div>
```

**Features:**
- Triple gradient background (20% opacity)
- Stronger border (50%)
- Box shadow with glow
- No hover state needed

### **3. Badges**

#### **Status Badge**
```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-magenta)]/10 border border-[var(--accent-cyan)]/30 rounded-full backdrop-blur-xl">
  <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></div>
  <span className="text-sm font-bold text-[var(--accent-cyan)]">Badge Text</span>
</div>
```

**Features:**
- Fully rounded (rounded-full)
- Gradient background
- Pulsing dot indicator
- Backdrop blur
- Small text (14px)

#### **HQ Badge (Headquarters)**
```jsx
<div className="px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded text-xs font-bold text-violet-400">
  HQ
</div>
```

### **4. Navigation Items**

#### **Active Navigation**
```jsx
<Link className="relative px-4 py-2 rounded-xl text-white bg-gradient-to-r from-violet-600/25 via-cyan-600/25 to-emerald-600/25 border-2 border-violet-500/40 transition-all duration-300">
  <span className="relative flex items-center gap-2">
    <Icon className="w-4 h-4 text-violet-400" />
    Nav Item
  </span>
  
  {/* Active indicator */}
  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"></div>
</Link>
```

**Features:**
- Gradient background (25% opacity)
- 2px gradient border (40% opacity)
- Icon with glow
- Bottom indicator (3px height)
- Double-layer glow

### **5. Forms**

#### **Input Field**
```jsx
<input 
  type="text"
  className="w-full px-4 py-3 bg-white/[0.03] border-2 border-white/[0.08] rounded-xl text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)]/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-all duration-300"
  placeholder="Placeholder text"
/>
```

**Features:**
- Subtle background (3%)
- 2px border
- Focus: Colored border + ring
- Smooth transitions

#### **Textarea**
```jsx
<textarea 
  rows="6"
  className="w-full px-4 py-3 bg-white/[0.03] border-2 border-white/[0.08] rounded-xl text-white placeholder:text-white/40 focus:border-[var(--accent-cyan)]/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-all duration-300 resize-none"
  placeholder="Placeholder text"
></textarea>
```

### **6. Dropdown Menus**

#### **Premium Dropdown**
```jsx
<div className="relative bg-gradient-to-br from-[#0D0D1A] via-[#12132A] to-[#0D0D1A] backdrop-blur-2xl border-2 border-violet-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/30">
  {/* Top glow line */}
  <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500/80 to-transparent"></div>
  
  {/* Menu items */}
  <div className="p-4 space-y-2">
    {/* Items */}
  </div>
  
  {/* Bottom glow line */}
  <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
</div>
```

---

## ✨ Visual Effects

### **1. Glow Effects**

#### **Standard Box Glow**
```css
box-shadow: 0 0 20px rgba(0,229,255,0.3);
```

#### **Enhanced Multi-Layer Glow**
```css
box-shadow: 
  0 0 15px rgba(139,92,246,0.8),
  0 0 30px rgba(139,92,246,0.5),
  0 0 60px rgba(139,92,246,0.2);
```

#### **Intense CTA Glow**
```css
box-shadow: 
  0 0 40px rgba(0,229,255,0.5),
  0 0 80px rgba(185,0,255,0.3);
```

#### **Inner Glow (Inset)**
```css
box-shadow: inset 0 0 20px rgba(0,229,255,0.2);
```

### **2. Border Styles**

#### **Gradient Border (Simple)**
```jsx
<div className="border-2 border-[var(--accent-cyan)]/30 rounded-xl">
  Content
</div>
```

#### **Gradient Border (Advanced)**
```jsx
<div className="p-[2px] bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600 rounded-2xl">
  <div className="bg-[#12132A] rounded-2xl p-8">
    Content
  </div>
</div>
```

**How it works:**
1. Outer div has gradient background + 2px padding
2. Inner div has solid background + matches border radius

#### **Animated Gradient Border**
```jsx
<div className="relative rounded-2xl overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-600 to-emerald-600 animate-gradient-x"></div>
  <div className="relative bg-[#12132A] rounded-2xl m-[2px] p-8">
    Content
  </div>
</div>
```

### **3. Background Effects**

#### **Grid Pattern**
```jsx
<div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
```

#### **Scan Lines**
```jsx
<div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,229,255,0.5)_50%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite] opacity-[0.03]"></div>
```

#### **Floating Gradient Orbs**
```jsx
<div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-cyan)]/8 rounded-full blur-[120px] animate-pulse"></div>
```

#### **Ambient Glow Overlay**
```jsx
<div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"></div>
```

### **4. Glass Morphism**

```jsx
<div className="backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08]">
  Content
</div>
```

**Key properties:**
- `backdrop-blur-xl` or `backdrop-blur-2xl`
- `bg-white/[0.02]` to `bg-white/[0.06]`
- Subtle border

### **5. Shimmer/Shine Effects**

#### **Button Shimmer**
```jsx
<button className="relative overflow-hidden group">
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
  <span className="relative">Button Text</span>
</button>
```

#### **Card Shimmer**
```jsx
<div className="relative overflow-hidden group">
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  <div className="relative">Content</div>
</div>
```

### **6. Hover Transformations**

```css
/* Scale up */
.hover-scale {
  transition: transform 300ms;
}
.hover-scale:hover {
  transform: scale(1.05);
}

/* Lift effect */
.hover-lift {
  transition: transform 300ms;
}
.hover-lift:hover {
  transform: translateY(-8px);
}

/* Combined */
.hover-both {
  transition: all 300ms;
}
.hover-both:hover {
  transform: scale(1.05) translateY(-4px);
}
```

---

## 🎬 Animation System

### **Keyframe Animations**

#### **1. Pulse (Glow)**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

#### **2. Spin (Rotation)**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

animation: spin 30s linear infinite;
```

#### **3. Float (Vertical)**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

animation: float 6s ease-in-out infinite;
```

#### **4. Scroll (Horizontal Marquee)**
```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

animation: scroll 35s linear infinite;
```

#### **5. Scan (Vertical)**
```css
@keyframes scan {
  0%, 100% { transform: translateY(-100%); }
  50% { transform: translateY(200%); }
}

animation: scan 4s ease-in-out infinite;
```

#### **6. Shimmer**
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

animation: shimmer 2s ease-in-out;
```

#### **7. Fade In/Out**
```css
@keyframes fadeInOut {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

animation: fadeInOut 8s ease-in-out infinite;
```

#### **8. Gradient Animation**
```css
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

background-size: 200% 200%;
animation: gradient-x 3s ease infinite;
```

#### **9. Orbit (Circular)**
```css
@keyframes orbit {
  0% { transform: rotate(0deg) translateX(100px); }
  100% { transform: rotate(360deg) translateX(100px); }
}

animation: orbit 10s linear infinite;
```

### **Transition Timings**

```css
/* Fast - UI feedback */
transition-duration: 150ms;

/* Standard - Most interactions */
transition-duration: 300ms;

/* Smooth - Cards, hover effects */
transition-duration: 500ms;

/* Slow - Complex animations */
transition-duration: 700ms;

/* Very slow - Special effects */
transition-duration: 1000ms;
```

### **Easing Functions**

```css
/* Default ease */
transition-timing-function: ease;

/* Ease in out - Smooth start and end */
transition-timing-function: ease-in-out;

/* Cubic bezier - Custom */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Linear - Constant speed */
transition-timing-function: linear;
```

### **Animation Delays**

```css
/* Staggered animations */
animation-delay: 0ms;    /* First item */
animation-delay: 100ms;  /* Second item */
animation-delay: 200ms;  /* Third item */
```

---

## 🎯 Iconography

### **Icon Library:** Lucide React

```bash
npm install lucide-react
```

### **Common Icons**

#### **Navigation & UI**
- `Home` - Home page
- `Building2` - About/Company
- `Layers` - Services
- `Briefcase` - Case studies
- `BookOpen` - Blog
- `Users` - Careers/Team
- `Mail` - Contact
- `Menu` - Mobile menu
- `X` - Close
- `ChevronDown` - Dropdown indicator
- `ArrowRight` - Forward action

#### **Technology & Features**
- `Zap` - Speed, power, energy
- `Cpu` - AI/ML, Computing
- `Code2` - Development
- `Rocket` - Innovation, launch
- `Shield` - Security
- `Globe` - Global, worldwide
- `Cloud` - Cloud computing
- `Database` - Data, storage
- `Network` - Connectivity

#### **Actions**
- `Sparkles` - Premium, special
- `Search` - Search functionality
- `Download` - Downloads
- `Upload` - Uploads
- `Share2` - Social sharing
- `Copy` - Copy to clipboard
- `Check` - Success, confirmation
- `AlertCircle` - Warning, alert

#### **Status**
- `Activity` - Live status
- `Clock` - Time, 24/7
- `TrendingUp` - Growth, success
- `Star` - Rating, featured

### **Icon Sizing**

```jsx
/* Small - 16px */
<Icon className="w-4 h-4" />

/* Medium - 20px */
<Icon className="w-5 h-5" />

/* Large - 24px */
<Icon className="w-6 h-6" />

/* Extra Large - 32px */
<Icon className="w-8 h-8" />

/* Hero - 48px */
<Icon className="w-12 h-12" />
```

### **Icon Colors & Effects**

```jsx
/* Primary color */
<Icon className="text-[var(--accent-cyan)]" />

/* With glow */
<Icon className="text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />

/* Hover scale */
<Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />

/* Rotate on hover */
<Icon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />

/* Translate on hover */
<Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
```

---

## 💬 Brand Voice & Messaging

### **Tone of Voice**

**Primary Characteristics:**
1. **Confident** - We know our craft
2. **Forward-thinking** - Future-focused language
3. **Professional** - Enterprise-grade terminology
4. **Exciting** - Energy and enthusiasm
5. **Accessible** - Clear, understandable
6. **Technical** - Accurate tech terminology

### **Writing Style**

**Do's:**
- Use active voice
- Be concise and clear
- Use strong action verbs
- Lead with benefits
- Include technical specifics
- Show expertise

**Don'ts:**
- Avoid jargon overload
- Don't be overly casual
- Avoid passive voice
- Don't make unfounded claims
- Avoid clichés

### **Key Messaging**

#### **Primary Tagline:**
"Engineering the Future. Building the Impossible."

#### **Secondary Taglines:**
- "Next-Generation Software Engineering"
- "Transform Visionary Ideas into Production-Ready Solutions"
- "Where Innovation Meets Execution"
- "Building Tomorrow's Technology Today"

#### **Value Propositions:**
1. **Cutting-Edge Expertise** - "We architect next-generation software ecosystems for forward-thinking enterprises"
2. **Proven Track Record** - "500+ projects delivered, 98% success rate"
3. **Global Reach** - "24/7 operations across 4 global offices"
4. **Full-Stack Excellence** - "AI/ML, Blockchain, Cloud, Mobile, Web3, Gaming"
5. **Enterprise-Grade** - "Production-ready solutions built to scale"

### **Brand Promises**

1. **Innovation First** - Always using cutting-edge technology
2. **Quality & Security** - Enterprise-grade standards
3. **24/7 Support** - Always available globally
4. **Transparency** - Clear communication throughout
5. **On-Time Delivery** - Meeting deadlines consistently

### **Headlines Formula**

**Pattern 1: Action + Benefit**
- "Transform Your Business with AI-Powered Solutions"
- "Scale Your Platform with Enterprise Cloud Infrastructure"

**Pattern 2: Challenge + Solution**
- "Complex System? We Build It."
- "Need Blockchain? We've Got You."

**Pattern 3: Bold Statement**
- "Engineering the Future"
- "Building the Impossible"
- "Where Innovation Happens"

### **Call-to-Action (CTA) Options**

**Primary CTAs:**
- "Start Your Project"
- "Get Started"
- "Build With Us"
- "Let's Talk"

**Secondary CTAs:**
- "Explore Our Work"
- "View Case Studies"
- "See Our Services"
- "Learn More"
- "Read Documentation"

**Exploratory CTAs:**
- "Discover How"
- "See What's Possible"
- "Explore Solutions"

---

## 🏢 Company Information

### **Official Company Name**
Axis Cyber Technologies

### **Legal Entity**
Axis Cyber Technologies (Private) Limited

### **Founded**
2012

### **Headquarters**
Lahore, Pakistan

### **Global Offices**

#### **1. Lahore, Pakistan (HQ)**
- **Status:** Headquarters
- **Address:** [Specific address]
- **Timezone:** PKT (UTC+5)
- **Focus:** Development center, Operations

#### **2. Dubai, UAE**
- **Status:** Regional Office
- **Address:** [Specific address]
- **Timezone:** GST (UTC+4)
- **Focus:** Middle East operations, Client relations

#### **3. Los Angeles, USA**
- **Status:** Regional Office
- **Address:** [Specific address]
- **Timezone:** PST/PDT (UTC-8/-7)
- **Focus:** North American market, Partnerships

#### **4. London, UK**
- **Status:** Regional Office
- **Address:** [Specific address]
- **Timezone:** GMT/BST (UTC+0/+1)
- **Focus:** European operations, Enterprise clients

### **Operating Model**
- **24/7 Operations** - Round-the-clock development and support
- **Follow-the-Sun** - Work handed off between time zones
- **Global Team** - 100+ engineers across 4 continents

### **Company Statistics**

#### **Projects & Delivery**
- **500+** Projects Delivered
- **98%** Success Rate
- **150+** Happy Clients
- **13 Years** of Experience (2012-2025)

#### **Technical Capabilities**
- **6 Core Services:** AI/ML, Blockchain, Full-Stack, Cloud/DevOps, Mobile, Gaming/WebGL
- **50+** Technologies mastered
- **24/7** Expert support

#### **Team & Culture**
- **100+** Expert engineers
- **20+** Countries represented
- **15+** Average years of experience
- **4** Global offices

### **Contact Information**

**General Inquiries:**
- Email: hello@axiscyber.tech
- Email: info@axiscyber.tech

**Business Development:**
- Email: business@axiscyber.tech
- Email: partnerships@axiscyber.tech

**Careers:**
- Email: careers@axiscyber.tech
- Email: hr@axiscyber.tech

**Support:**
- Email: support@axiscyber.tech
- Available: 24/7/365

**Phone:**
- Main: +92 42 1234 5678 (Pakistan HQ)
- Available: 24/7 globally

**Social Media:**
- LinkedIn: /company/axis-cyber-technologies
- Twitter/X: @AxisCyberTech
- GitHub: /AxisCyberTech
- Discord: community server

### **Certifications & Compliance**
- ISO 27001 (Information Security)
- SOC 2 Type II
- GDPR Compliant
- HIPAA Ready
- PCI DSS (for fintech projects)

---

## 🎨 Design Philosophy

### **Core Principles**

#### **1. Ultra-Premium Quality**
Every pixel, every interaction must feel premium and expensive. This isn't a startup MVP - this is enterprise software for Fortune 500 companies.

#### **2. Neon Cyberpunk Aesthetic**
Dark, mysterious backgrounds with vibrant, glowing neon accents. Think Blade Runner, Ghost in the Shell, Cyberpunk 2077 meets modern enterprise software.

#### **3. Performance First**
Animations and effects must be performant. Use CSS transforms and opacity for smooth 60fps animations.

#### **4. Accessibility Matters**
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation
- Screen reader support
- Focus states on all interactive elements

#### **5. Mobile-First Responsive**
Design for mobile first, enhance for desktop. Every element must work beautifully on all screen sizes.

#### **6. Consistency is Key**
Use the same patterns, spacing, colors throughout. Users should feel like they're in one cohesive product.

### **Visual Hierarchy**

**Level 1 (Highest Importance):**
- Hero headlines
- Primary CTAs
- Key statistics
- Active/selected states

**Level 2 (High Importance):**
- Section headers
- Card titles
- Navigation items
- Secondary CTAs

**Level 3 (Medium Importance):**
- Body text
- Card descriptions
- Icons
- Labels

**Level 4 (Low Importance):**
- Metadata
- Captions
- Timestamps
- Decorative elements

### **Interaction Design**

#### **Hover States**
- Always provide visual feedback
- 300ms standard transition
- Scale, glow, or color change
- Icon animations on buttons

#### **Focus States**
- Visible keyboard focus
- Colored ring or glow
- Matches brand colors

#### **Active States**
- Gradient backgrounds (20-30% opacity)
- Stronger borders (40-50% opacity)
- Glow effects
- Bottom/side indicators

#### **Loading States**
- Skeleton screens
- Pulse animations
- Spinners with brand colors
- Progress indicators

#### **Empty States**
- Clear messaging
- Helpful iconography
- CTA to take action
- Encouraging tone

### **Design Patterns to Follow**

#### **Always Use:**
1. Glass morphism for elevated surfaces
2. Gradient borders for premium elements
3. Multi-layer glows for important elements
4. Grid patterns for technical sections
5. Scan lines for cyber aesthetic
6. Pulsing dots for status indicators
7. Gradient text for special emphasis
8. Shimmer effects on CTAs

#### **Never Use:**
1. Pure black backgrounds (use deep blues/grays)
2. Harsh pure white borders
3. Single flat colors for important elements
4. Default system shadows
5. Comic Sans or similar casual fonts
6. Emoji in professional content (unless specified)

---

## 💻 Code Examples

### **1. Premium Section Template**

```jsx
export function PremiumSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#05060A] via-[#0A0A14] to-[#05060A] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Floating orb */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px]"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-16 md:py-24 lg:py-32">
        
        {/* Section header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-magenta)]/10 border border-[var(--accent-cyan)]/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span className="text-sm font-bold text-[var(--accent-cyan)]">Badge Text</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Section <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Headline</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Section description goes here with clear value proposition.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards go here */}
        </div>

      </div>
    </section>
  );
}
```

### **2. Premium Card Component**

```jsx
export function PremiumCard({ icon: Icon, title, description, color = 'cyan' }) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    violet: 'from-violet-500 to-purple-600',
    emerald: 'from-emerald-500 to-teal-600',
  };

  return (
    <div className="group relative p-8 bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-magenta)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-6 shadow-lg shadow-${color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
```

### **3. Gradient Button Component**

```jsx
export function GradientButton({ children, href, onClick, icon: Icon }) {
  const Component = href ? Link : 'button';
  
  return (
    <Component
      to={href}
      onClick={onClick}
      className="relative group px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] text-white rounded-xl font-bold overflow-hidden hover:shadow-[0_0_40px_rgba(0,229,255,0.5),0_0_80px_rgba(185,0,255,0.3)] transition-all duration-700 hover:scale-105"
    >
      {/* Animated background layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-magenta)] to-[var(--accent-orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"></div>
      
      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />}
        {children}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </Component>
  );
}
```

### **4. Status Badge Component**

```jsx
export function StatusBadge({ status = 'active', text, showDot = true }) {
  const statusColors = {
    active: 'cyan',
    warning: 'orange',
    success: 'emerald',
    error: 'red'
  };

  const color = statusColors[status];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-500/30 rounded-full backdrop-blur-xl`}>
      {showDot && (
        <div className="relative">
          <div className={`w-2 h-2 rounded-full bg-${color}-400 animate-pulse`}></div>
          <div className={`absolute inset-0 w-2 h-2 rounded-full bg-${color}-400 animate-ping`}></div>
        </div>
      )}
      <span className={`text-sm font-bold text-${color}-400`}>{text}</span>
    </div>
  );
}
```

### **5. Navigation Link Component**

```jsx
export function NavLink({ to, icon: Icon, children, isActive }) {
  return (
    <Link
      to={to}
      className={`relative group/nav px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
        isActive 
          ? 'text-white' 
          : 'text-white/70 hover:text-white'
      }`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-violet-600/30 via-cyan-600/30 to-emerald-600/30 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 blur-xl ${isActive ? 'opacity-60' : ''}`}></div>
      
      {/* Background */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-violet-600/25 via-cyan-600/25 to-emerald-600/25 border-2 border-violet-500/40 shadow-lg shadow-violet-500/20' 
          : 'bg-white/[0.04] border border-white/[0.08] group-hover/nav:bg-white/[0.08] group-hover/nav:border-white/[0.15]'
      }`}></div>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        <Icon className={`w-4 h-4 transition-all duration-300 ${
          isActive 
            ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' 
            : 'text-white/50 group-hover/nav:text-white group-hover/nav:scale-110'
        }`} />
        {children}
      </span>
      
      {/* Active indicator */}
      {isActive && (
        <>
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"></div>
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 rounded-full blur-md"></div>
        </>
      )}
    </Link>
  );
}
```

---

## 📝 Quick Reference Cheatsheet

### **Colors**
```
Cyan: #00E5FF
Magenta: #B900FF
Orange: #FF7A00
Hot Pink: #FF0099
Electric Cyan: #00FFFF
Neon Purple: #DD00FF
Success Green: #00FF9D
```

### **Backgrounds**
```
Ultra-dark: #05060A
Primary: #0B0D14
Secondary: #12161E
Elevated: #1A1F2E
Section Alt: #12132A
```

### **Common Patterns**

**Card:**
```jsx
bg-white/[0.02] border-2 border-white/[0.08] rounded-2xl p-8
hover:bg-white/[0.06] hover:border-white/[0.15]
```

**Button:**
```jsx
px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] 
text-white rounded-xl font-bold hover:scale-105 transition-all duration-300
```

**Badge:**
```jsx
px-4 py-2 bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 
rounded-full text-sm font-bold text-[var(--accent-cyan)]
```

**Section:**
```jsx
py-16 md:py-24 lg:py-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12
```

---

## 🚀 Implementation Guidelines

### **For New Products/Pages:**

1. **Start with the color palette** - Use CSS variables
2. **Follow the typography system** - Import fonts correctly
3. **Use component patterns** - Copy proven patterns
4. **Add visual effects** - Glows, gradients, glass morphism
5. **Implement animations** - Smooth, performant transitions
6. **Test responsiveness** - Mobile-first approach
7. **Maintain consistency** - Same spacing, colors, effects

### **Quality Checklist:**

- [ ] Uses correct brand colors from palette
- [ ] Typography follows scale (Space Grotesk + Inter)
- [ ] Spacing matches system (4px increments)
- [ ] Cards have proper glass morphism
- [ ] Buttons have hover effects
- [ ] Animations are smooth (60fps)
- [ ] Responsive on all breakpoints
- [ ] Glow effects are multi-layered
- [ ] Borders use proper opacity
- [ ] Icons from Lucide React
- [ ] Focus states are visible
- [ ] Loading states exist
- [ ] Empty states are handled

### **Common Mistakes to Avoid:**

❌ Using flat colors without gradients
❌ Forgetting hover states
❌ Using default shadows
❌ Inconsistent spacing
❌ Missing responsive breakpoints
❌ Single-layer glows
❌ Harsh borders (100% opacity)
❌ Forgetting backdrop blur
❌ No focus indicators
❌ Inconsistent border radius

---

## 📚 Resources

### **Design Tools:**
- Figma - Primary design tool
- Adobe XD - Alternative
- Tailwind CSS - Utility framework

### **Font Resources:**
- Google Fonts (Space Grotesk, Inter)
- Font weight range: 300-900

### **Icon Library:**
- Lucide React - Primary icon set
- Heroicons - Alternative

### **Color Tools:**
- Coolors.co - Palette generation
- contrast-ratio.com - Accessibility checking

### **Animation References:**
- Framer Motion docs
- CSS Tricks animations

---

## 📞 Questions & Support

For questions about brand guidelines:
- **Email:** design@axiscyber.tech
- **Internal:** Design team channel

For technical implementation:
- **Email:** dev@axiscyber.tech
- **Docs:** Internal component library

---

**Last Updated:** November 2024
**Version:** 2.0 - Ultra-Premium Neon Cyberpunk Edition
**Maintained by:** Axis Cyber Technologies Design Team

---

## 🎯 TL;DR - Essential Information

**Colors:** Cyan #00E5FF, Magenta #B900FF, Orange #FF7A00 on dark backgrounds
**Fonts:** Space Grotesk (headings), Inter (body)
**Style:** Ultra-premium neon cyberpunk with glows, gradients, glass morphism
**Company:** Founded 2012, HQ in Lahore, 4 global offices, 24/7 operations
**Services:** AI/ML, Blockchain, Full-Stack, Cloud, Mobile, Gaming
**Stats:** 500+ projects, 98% success, 13 years experience
**Tone:** Professional, confident, futuristic, innovative

**Copy this document to maintain brand consistency across all Axis Cyber products!**
