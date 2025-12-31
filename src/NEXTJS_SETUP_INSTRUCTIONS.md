# 🚀 Next.js Migration Setup Instructions

## ✅ What Has Been Created

I've successfully created the **complete Next.js project structure** with:

### **Core Files:**
- ✅ `/next.config.js` - Next.js configuration
- ✅ `/package.json` - Dependencies
- ✅ `/tsconfig.json` - TypeScript configuration
- ✅ `/tailwind.config.ts` - Tailwind CSS with neon colors
- ✅ `/postcss.config.js` - PostCSS configuration

### **CSS Theme System:**
- ✅ `/src/styles/globals.scss` - Complete CSS theme system
  - **58 CSS custom properties (variables)**
  - All neon colors (#DD00FF, #00FFFF, #FF0099, #00FF9D, #FF7A00)
  - Typography system (Space Grotesk + Inter)
  - Spacing scale (xs to 5xl)
  - Border radius, transitions
  - Typography system
  - 15+ animations
  - Utility classes
  - Scrollbar styling
  - Selection styling
  
- ✅ `/CSS_VARIABLES_REFERENCE.md` - Complete variable documentation

### **Next.js App Structure:**
- ✅ `/src/app/layout.tsx` - Root layout with SEO metadata
- ✅ `/src/app/page.tsx` - Homepage with JSON-LD structured data

---

## 📦 Installation Steps

### **Step 1: Install Dependencies**

```bash
npm install
```

This will install:
- Next.js 14+
- React 18+
- TypeScript
- **SCSS/Sass** ✅
- Tailwind CSS
- Lucide React (icons)
- Motion/Framer Motion (animations)
- All other dependencies

### **Step 2: Migrate Components**

You need to move your components from the old structure to the new Next.js structure:

#### **Components to Migrate:**

```bash
# Copy these components to /src/components/
- Header.tsx
- Footer.tsx
- Hero.tsx
- TrustedBy.tsx
- Philosophy.tsx
- Services.tsx
- TechGalaxy.tsx
- CaseStudies.tsx
- CoreLogic.tsx
- Industries.tsx
- InnovationLab.tsx
- CTASection.tsx
```

#### **Key Changes for Components:**

**1. Update React Router imports → Next.js Link**

```tsx
// OLD (React Router)
import { Link } from 'react-router-dom';
<Link to="/about">About</Link>

// NEW (Next.js)
import Link from 'next/link';
<Link href="/about">About</Link>
```

**2. Add 'use client' directive if component has:**
- `useState`, `useEffect`, `useRef`
- Event handlers (`onClick`, `onChange`)
- Browser APIs

```tsx
'use client';

import { useState } from 'react';

export function MyComponent() {
  const [state, setState] = useState();
  // ...
}
```

**3. Update useLocation → usePathname**

```tsx
// OLD
import { useLocation } from 'react-router-dom';
const location = useLocation();
const isActive = location.pathname === '/about';

// NEW
'use client';
import { usePathname } from 'next/navigation';
const pathname = usePathname();
const isActive = pathname === '/about';
```

### **Step 3: Create Page Routes**

Create these page files in `/src/app/`:

```
src/app/
├── page.tsx (Home - already created)
├── about/page.tsx
├── services/
│   ├── page.tsx
│   ├── ai-ml/page.tsx
│   ├── blockchain/page.tsx
│   ├── enterprise-software/page.tsx
│   ├── cloud-devops/page.tsx
│   ├── mobile-apps/page.tsx
│   ├── gaming-webgl/page.tsx
│   ├── cybersecurity/page.tsx
│   ├── data-engineering/page.tsx
│   ├── api-integration/page.tsx
│   ├── performance/page.tsx
│   ├── iot-edge/page.tsx
│   └── product-ux/page.tsx
├── industries/
│   ├── page.tsx
│   ├── financial-services/page.tsx
│   ├── blockchain/page.tsx
│   ├── healthcare/page.tsx
│   ├── defense-aerospace/page.tsx
│   ├── energy-utilities/page.tsx
│   ├── telecommunications/page.tsx
│   ├── supply-chain/page.tsx
│   ├── manufacturing/page.tsx
│   └── insurance/page.tsx
├── contact/page.tsx
├── careers/
│   ├── page.tsx
│   └── apply/page.tsx
├── blog/page.tsx
├── case-studies/page.tsx
├── leadership/page.tsx
├── story/page.tsx
├── press-kit/page.tsx
├── terms/page.tsx
├── privacy/page.tsx
└── cookie-policy/page.tsx
```

#### **Page Template:**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Axis Cyber Technologies...',
  openGraph: {
    title: 'About Us | Axis Cyber Technologies',
    description: 'Learn about Axis Cyber Technologies...',
    url: 'https://axiscyber.tech/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

### **Step 4: Move Assets**

```bash
# Move Figma imports to public folder
/imports/* → /public/imports/*

# Update image imports in components
import imgA from "figma:asset/..." 
# becomes
<Image src="/imports/..." width={500} height={500} alt="..." />
```

### **Step 5: Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Using CSS Variables in Components

### **Method 1: CSS Variables (Recommended)**

All theme variables are available as CSS custom properties:

```tsx
// In any component
<div className="bg-[var(--neon-purple)]">...</div>
<p className="text-[var(--text-secondary)]">...</p>
<div className="p-[var(--spacing-xl)]">...</div>
```

### **Method 2: Tailwind Classes**

```tsx
<div className="bg-neon-purple">...</div>
<p className="text-neon-cyan">...</p>
<div className="shadow-neon-purple-lg">...</div>
```

### **Method 3: Utility Classes**

Pre-built utility classes from globals.scss:

```tsx
<div className="card-neon">Ultra-premium card</div>
<h1 className="gradient-text-cyber">Gradient heading</h1>
<div className="neon-glow-purple">Glowing element</div>
<a className="footer-link">Animated link</a>
```

### **Method 4: Inline Styles**

```tsx
<div style={{
  backgroundColor: 'var(--bg-card)',
  border: `2px solid var(--border-purple)`,
  borderRadius: 'var(--radius-2xl)',
  padding: 'var(--spacing-xl)',
  boxShadow: `0 0 30px var(--glow-purple)`,
}}>
  Content
</div>
```

---

## 🎯 Key CSS Variables Available

### **Colors:**
```css
--neon-purple: #DD00FF;
--neon-cyan: #00FFFF;
--neon-pink: #FF0099;
--neon-green: #00FF9D;
--neon-orange: #FF7A00;

--bg-primary: #05060A;
--text-primary: #FFFFFF;
```

### **Spacing:**
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

### **Typography:**
```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Space Grotesk', sans-serif;
--font-mono: 'Fira Code', monospace;
```

### **Effects:**
```css
--glow-purple: rgba(221, 0, 255, 0.3);
--glow-purple-intense: rgba(221, 0, 255, 0.6);
--border-purple: rgba(221, 0, 255, 0.3);
```

**📚 Full Reference:** See `/CSS_VARIABLES_REFERENCE.md` for all 58 variables!

---

## ✅ Migration Checklist

### **Phase 1: Core Setup** ✅
- [x] Created Next.js config
- [x] Created SCSS variables
- [x] Created global styles
- [x] Created root layout
- [x] Created homepage
- [x] Configured TypeScript
- [x] Configured Tailwind

### **Phase 2: Components** (In Progress)
- [ ] Migrate Header component
- [ ] Migrate Footer component
- [ ] Migrate Hero component
- [ ] Migrate all homepage components
- [ ] Update all Link imports
- [ ] Add 'use client' where needed

### **Phase 3: Pages** (Todo)
- [ ] Create all page routes
- [ ] Add metadata to each page
- [ ] Add JSON-LD structured data
- [ ] Migrate page content

### **Phase 4: Assets** (Todo)
- [ ] Move Figma imports to /public
- [ ] Update image imports
- [ ] Optimize images with Next.js Image

### **Phase 5: SEO** (Todo)
- [ ] Generate sitemap
- [ ] Create robots.txt
- [ ] Add Open Graph images
- [ ] Test meta tags

### **Phase 6: Testing** (Todo)
- [ ] Test all routes
- [ ] Test responsive design
- [ ] Run Lighthouse audit
- [ ] Fix any issues

---

## 🚀 Build & Deploy

### **Build for Production:**

```bash
npm run build
```

### **Start Production Server:**

```bash
npm run start
```

### **Deploy to Vercel (Recommended):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## 📊 Expected Performance

After complete migration:

| Metric | Target |
|--------|--------|
| **Lighthouse Performance** | 90+ |
| **Lighthouse SEO** | 95+ |
| **Lighthouse Accessibility** | 95+ |
| **First Contentful Paint** | < 1.5s |
| **Time to Interactive** | < 3s |

---

## 🆘 Troubleshooting

### **Issue: SCSS not compiling**
```bash
npm install sass --save-dev
```

### **Issue: Tailwind classes not working**
Check `tailwind.config.ts` content paths include your files.

### **Issue: Components not rendering**
Make sure to add `'use client'` for interactive components.

### **Issue: Images not loading**
Update paths from `import` to `/public/` folder.

---

## 📚 Next Steps

1. **Migrate Header & Footer** (most important - used on all pages)
2. **Migrate remaining homepage components**
3. **Create all page routes**
4. **Test and optimize**
5. **Deploy to production**

---

## 🎉 What You Get

✅ **Full SEO optimization** with meta tags, Open Graph, Twitter Cards
✅ **SCSS theming system** with comprehensive variables and mixins
✅ **Server-side rendering** for better performance and SEO
✅ **Image optimization** with Next.js Image component
✅ **Font optimization** with Next.js Font system
✅ **Automatic code splitting** for faster page loads
✅ **Built-in sitemap generation**
✅ **Production-ready** configuration

---

**Need help?** Refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [SCSS Documentation](https://sass-lang.com/documentation)
- `/NEXTJS_MIGRATION_GUIDE.md` for detailed migration instructions

Good luck! 🚀
