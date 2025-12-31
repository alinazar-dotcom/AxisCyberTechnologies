# 🚀 Next.js Migration Guide for Axis Cyber Technologies

## Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Migration Strategy](#migration-strategy)
3. [Step-by-Step Migration](#step-by-step-migration)
4. [SEO Enhancements](#seo-enhancements)
5. [Performance Optimizations](#performance-optimizations)
6. [Deployment](#deployment)
7. [Testing Checklist](#testing-checklist)

---

## 1. Current State Analysis

### **Current Architecture:**
- **Framework:** React 18+ with React Router v6
- **Routing:** Client-side routing (BrowserRouter)
- **Rendering:** Pure Client-Side Rendering (CSR)
- **Styling:** Tailwind CSS v4.0
- **Components:** 50+ React components
- **Pages:** 30+ routes

### **Current File Structure:**
```
/
├── App.tsx (Main routing component)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ... (10+ components)
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   └── ... (20+ pages)
├── styles/
│   └── globals.css
└── imports/ (Figma assets)
```

### **SEO Issues:**
❌ No server-side rendering
❌ No meta tags management
❌ No sitemap generation
❌ Poor initial page load performance
❌ No Open Graph/Twitter Card support
❌ JavaScript-dependent content

---

## 2. Migration Strategy

### **Recommended Approach: Next.js 14+ with App Router**

#### **Why App Router vs Pages Router?**
- ✅ Modern React Server Components
- ✅ Better performance with streaming
- ✅ Nested layouts
- ✅ Built-in loading & error states
- ✅ Future-proof (Next.js recommended approach)

#### **Migration Timeline:**
- **Phase 1:** Setup & Core Structure (2-3 days)
- **Phase 2:** Component Migration (3-5 days)
- **Phase 3:** SEO Implementation (2-3 days)
- **Phase 4:** Testing & Optimization (2-3 days)
- **Total:** 9-14 days

---

## 3. Step-by-Step Migration

### **PHASE 1: Project Setup**

#### **Step 1.1: Create New Next.js Project**

```bash
# Create new Next.js 14+ project
npx create-next-app@latest axis-cyber-nextjs

# During setup, choose:
✅ TypeScript: Yes
✅ ESLint: Yes
✅ Tailwind CSS: Yes
✅ src/ directory: Yes
✅ App Router: Yes
✅ Import alias: Yes (@/*)
```

#### **Step 1.2: Install Dependencies**

```bash
cd axis-cyber-nextjs

# Install required packages
npm install lucide-react react-slick recharts react-responsive-masonry motion framer-motion
npm install react-dnd react-dnd-html5-backend re-resizable
npm install sonner@2.0.3
npm install react-hook-form@7.55.0

# Install Next.js specific packages
npm install next-seo next-sitemap
```

#### **Step 1.3: Copy Existing Files**

```bash
# From your current project, copy:
/styles/globals.css → /src/app/globals.css
/imports/ → /public/imports/
```

---

### **PHASE 2: File Structure Conversion**

#### **New Next.js App Router Structure:**

```
axis-cyber-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          (Root layout - replaces App.tsx)
│   │   ├── page.tsx            (Homepage - was HomePage.tsx)
│   │   ├── globals.css
│   │   ├── about/
│   │   │   └── page.tsx        (AboutPage)
│   │   ├── services/
│   │   │   ├── page.tsx        (ServicesPage)
│   │   │   ├── ai-ml/
│   │   │   │   └── page.tsx    (AIMLPage)
│   │   │   ├── blockchain/
│   │   │   │   └── page.tsx
│   │   │   └── ... (all 12 service pages)
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   ├── financial-services/
│   │   │   │   └── page.tsx
│   │   │   └── ... (all 9 industry pages)
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── careers/
│   │   │   ├── page.tsx
│   │   │   └── apply/
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   ├── case-studies/
│   │   │   └── page.tsx
│   │   ├── leadership/
│   │   │   └── page.tsx
│   │   ├── story/
│   │   │   └── page.tsx
│   │   ├── press-kit/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── cookie-policy/
│   │       └── page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       └── ... (all existing components)
├── public/
│   └── imports/          (Figma assets)
└── next.config.js
```

---

### **PHASE 3: Core File Migrations**

#### **Step 3.1: Root Layout (app/layout.tsx)**

**Replace:** `/App.tsx`
**With:** `/src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    template: '%s | Axis Cyber Technologies'
  },
  description: 'We architect next-generation software ecosystems for forward-thinking enterprises. AI/ML, Blockchain, Cloud, and 24/7 global support.',
  keywords: ['software engineering', 'AI/ML', 'blockchain', 'cloud computing', 'cybersecurity', 'enterprise software'],
  authors: [{ name: 'Axis Cyber Technologies' }],
  creator: 'Axis Cyber Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axiscyber.tech',
    siteName: 'Axis Cyber Technologies',
    title: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    description: 'We architect next-generation software ecosystems for forward-thinking enterprises.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Axis Cyber Technologies'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    description: 'We architect next-generation software ecosystems for forward-thinking enterprises.',
    images: ['/twitter-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

#### **Step 3.2: Homepage (app/page.tsx)**

**Replace:** `/pages/HomePage.tsx`
**With:** `/src/app/page.tsx`

```tsx
import { Hero } from '@/components/Hero';
import { TrustedBy } from '@/components/TrustedBy';
import { Philosophy } from '@/components/Philosophy';
import { Services } from '@/components/Services';
import { TechGalaxy } from '@/components/TechGalaxy';
import { CaseStudies } from '@/components/CaseStudies';
import { CoreLogic } from '@/components/CoreLogic';
import { Industries } from '@/components/Industries';
import { InnovationLab } from '@/components/InnovationLab';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Philosophy />
      <Services />
      <TechGalaxy />
      <CaseStudies />
      <CoreLogic />
      <Industries />
      <InnovationLab />
      <CTASection />
    </>
  );
}
```

#### **Step 3.3: Update Header Component**

**Key Changes:**
- Replace `react-router-dom` imports with `next/link`
- Replace `<Link to="/path">` with `<Link href="/path">`
- Replace `useLocation()` with `usePathname()` from `next/navigation`

**Before (React Router):**
```tsx
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  return (
    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
      About
    </Link>
  );
}
```

**After (Next.js):**
```tsx
'use client'; // Required for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  return (
    <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
      About
    </Link>
  );
}
```

#### **Step 3.4: Update Footer Component**

Same changes as Header - replace React Router with Next.js Link:

```tsx
'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <Link href="/terms">Terms</Link>
      <Link href="/privacy">Privacy</Link>
      {/* ... */}
    </footer>
  );
}
```

---

### **PHASE 4: Page Migrations**

#### **Pattern for All Pages:**

Each page in `/pages/XxxPage.tsx` becomes `/app/xxx/page.tsx`

**Example: AboutPage Migration**

**Before:** `/pages/AboutPage.tsx`
```tsx
export function AboutPage() {
  return (
    <div>About content</div>
  );
}
```

**After:** `/src/app/about/page.tsx`
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Axis Cyber Technologies - next-generation software engineering with 100% success rate.',
  openGraph: {
    title: 'About Us | Axis Cyber Technologies',
    description: 'Learn about Axis Cyber Technologies - next-generation software engineering with 100% success rate.',
    url: 'https://axiscyber.tech/about',
  }
};

export default function AboutPage() {
  return (
    <div>About content</div>
  );
}
```

#### **Client Components vs Server Components**

**Use 'use client' when you need:**
- useState, useEffect, useRef
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Third-party libraries that use hooks

**Example:**
```tsx
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({});
  
  return <form>...</form>;
}
```

**Keep as Server Component when:**
- Static content
- No interactivity
- Data fetching
- SEO-critical content

---

### **PHASE 5: Handle Special Cases**

#### **5.1: Figma Assets Migration**

**Current:** `import imgA from "figma:asset/..."`
**Next.js:** Use Next.js Image component

```tsx
// Before
import imgA from "figma:asset/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png";
<img src={imgA} alt="..." />

// After - Move assets to /public/images/
import Image from 'next/image';
<Image 
  src="/images/76faf8f617b56e6f079c5a7ead8f927f5a5fee32.png" 
  alt="..."
  width={500}
  height={500}
  priority // for above-fold images
/>
```

#### **5.2: SVG Imports**

**Before:**
```tsx
import svgPaths from "./imports/svg-wg56ef214f";
```

**After:**
```tsx
// Move to /public/svg/
<svg>
  <use href="/svg/svg-wg56ef214f.svg#icon" />
</svg>

// OR import directly
import IconSvg from '@/public/svg/icon.svg';
<IconSvg />
```

#### **5.3: ImageWithFallback Component**

**Update to use Next.js Image:**

```tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ImageWithFallback({ 
  src, 
  fallbackSrc = '/placeholder.png',
  alt,
  width,
  height,
  ...props 
}: any) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
```

---

## 4. SEO Enhancements

### **4.1: Dynamic Meta Tags Per Page**

Every page should have custom metadata:

```tsx
// src/app/services/ai-ml/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI/ML Development Services | 100% Success Rate',
  description: 'Enterprise AI/ML solutions with TensorFlow, PyTorch, and cutting-edge deep learning. 24/7 global support.',
  keywords: ['AI development', 'machine learning', 'deep learning', 'TensorFlow', 'PyTorch'],
  openGraph: {
    title: 'AI/ML Development Services | Axis Cyber Technologies',
    description: 'Enterprise AI/ML solutions with TensorFlow, PyTorch, and cutting-edge deep learning.',
    url: 'https://axiscyber.tech/services/ai-ml',
    images: ['/og-ai-ml.png']
  }
};

export default function AIMLPage() {
  // ...
}
```

### **4.2: JSON-LD Structured Data**

Add structured data for better SEO:

```tsx
// src/app/page.tsx
import Script from 'next/script';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Axis Cyber Technologies',
    description: 'Next-generation software engineering company',
    url: 'https://axiscyber.tech',
    logo: 'https://axiscyber.tech/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['en', 'ur', 'ar']
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Lahore',
        addressCountry: 'PK',
        addressRegion: 'Punjab'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB'
      }
    ],
    sameAs: [
      'https://twitter.com/axiscyber',
      'https://linkedin.com/company/axiscyber',
      'https://github.com/axiscyber'
    ]
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### **4.3: Sitemap Generation**

**Install next-sitemap:**
```bash
npm install next-sitemap
```

**Create `next-sitemap.config.js`:**
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://axiscyber.tech',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
```

**Update `package.json`:**
```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

### **4.4: robots.txt**

**Create `public/robots.txt`:**
```
User-agent: *
Allow: /

Sitemap: https://axiscyber.tech/sitemap.xml
```

---

## 5. Performance Optimizations

### **5.1: Image Optimization**

**Use Next.js Image component everywhere:**

```tsx
import Image from 'next/image';

// Automatic optimization
<Image 
  src="/images/hero-bg.png"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // for above-fold images
  quality={90}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### **5.2: Font Optimization**

**Already included in layout.tsx:**
```tsx
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'] });

const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk-Bold.woff2',
  variable: '--font-space-grotesk',
  weight: '700',
});
```

### **5.3: Code Splitting**

**Use dynamic imports for heavy components:**

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const TechGalaxy = dynamic(() => import('@/components/TechGalaxy').then(mod => ({ default: mod.TechGalaxy })), {
  loading: () => <div>Loading...</div>,
  ssr: false // if component uses browser APIs
});
```

### **5.4: Route Groups for Layouts**

```
app/
├── (marketing)/
│   ├── layout.tsx      (Marketing-specific layout)
│   ├── page.tsx        (Homepage)
│   ├── about/
│   └── services/
└── (application)/
    ├── layout.tsx      (App-specific layout)
    └── dashboard/
```

---

## 6. Configuration Files

### **6.1: next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;
```

### **6.2: tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### **6.3: Tailwind Config**

**Update for Next.js:**
```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Your custom theme
    },
  },
  plugins: [],
}
```

---

## 7. Deployment

### **7.1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Features:**
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Edge network CDN
- ✅ Automatic preview deployments
- ✅ Built-in analytics

### **7.2: Alternative: Docker + AWS/Azure**

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 8. Testing Checklist

### **Pre-Deployment Testing:**

#### **Functionality:**
- [ ] All 30+ routes load correctly
- [ ] Navigation works (Header, Footer links)
- [ ] Forms submit properly (Contact, Careers)
- [ ] Interactive components work (hover states, animations)
- [ ] Mobile responsive on all pages
- [ ] All images load correctly

#### **SEO:**
- [ ] Meta tags appear on all pages
- [ ] Open Graph tags work (test with Facebook debugger)
- [ ] Twitter Cards work (test with Twitter validator)
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt is accessible
- [ ] JSON-LD structured data validates (Google Rich Results Test)
- [ ] Google Search Console verification
- [ ] Page titles are unique and descriptive

#### **Performance:**
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 95 (SEO)
- [ ] Lighthouse score > 95 (Accessibility)
- [ ] Images are optimized (WebP/AVIF)
- [ ] Fonts load efficiently
- [ ] No console errors in production

#### **Analytics:**
- [ ] Google Analytics installed
- [ ] Google Tag Manager configured
- [ ] Conversion tracking setup
- [ ] Event tracking works

---

## 9. Migration Checklist

### **Phase 1: Setup ✅**
- [ ] Create Next.js project
- [ ] Install all dependencies
- [ ] Copy globals.css
- [ ] Copy Figma assets to /public

### **Phase 2: Core Files ✅**
- [ ] Create root layout.tsx
- [ ] Create homepage page.tsx
- [ ] Migrate Header component
- [ ] Migrate Footer component
- [ ] Update all Link imports

### **Phase 3: Pages Migration ✅**
- [ ] About page
- [ ] Services main page
- [ ] All 12 service detail pages
- [ ] Industries main page
- [ ] All 9 industry detail pages
- [ ] Contact page
- [ ] Careers page
- [ ] Careers apply page
- [ ] Blog page
- [ ] Case studies page
- [ ] Leadership page
- [ ] Story page
- [ ] Press kit page
- [ ] Terms page
- [ ] Privacy page
- [ ] Cookie policy page

### **Phase 4: Components ✅**
- [ ] Hero
- [ ] TrustedBy
- [ ] Philosophy
- [ ] Services
- [ ] TechGalaxy
- [ ] CaseStudies
- [ ] CoreLogic
- [ ] Industries
- [ ] InnovationLab
- [ ] CTASection

### **Phase 5: SEO ✅**
- [ ] Add metadata to all pages
- [ ] Implement JSON-LD
- [ ] Generate sitemap
- [ ] Create robots.txt
- [ ] Add Open Graph images

### **Phase 6: Testing ✅**
- [ ] Run all tests from checklist above
- [ ] Fix any broken links
- [ ] Optimize performance
- [ ] Test on multiple devices

### **Phase 7: Deployment ✅**
- [ ] Deploy to Vercel/hosting
- [ ] Configure custom domain
- [ ] Setup SSL certificate
- [ ] Configure analytics

---

## 10. Key Benefits After Migration

### **SEO Improvements:**
✅ **Server-Side Rendering** - Content visible to search engines immediately
✅ **Meta Tags** - Proper title, description, Open Graph on every page
✅ **Structured Data** - Rich snippets in Google search
✅ **Sitemap** - Automatic XML sitemap generation
✅ **Performance** - Faster page loads = better SEO rankings

### **Performance Gains:**
✅ **Automatic Code Splitting** - Only load what's needed
✅ **Image Optimization** - Next.js Image component
✅ **Font Optimization** - Next.js Font system
✅ **Static Generation** - Pre-render pages at build time
✅ **Edge Caching** - CDN distribution worldwide

### **Developer Experience:**
✅ **File-Based Routing** - No more manual route config
✅ **TypeScript Support** - Better type safety
✅ **Fast Refresh** - Instant feedback during development
✅ **API Routes** - Built-in backend functionality
✅ **Better Error Handling** - error.tsx and loading.tsx

---

## 11. Common Pitfalls & Solutions

### **Issue 1: "use client" overuse**
❌ **Wrong:**
```tsx
'use client';
// Using for static content
export default function AboutPage() {
  return <div>Static content</div>;
}
```

✅ **Correct:**
```tsx
// No 'use client' needed for static content
export default function AboutPage() {
  return <div>Static content</div>;
}
```

### **Issue 2: Image imports**
❌ **Wrong:**
```tsx
import logo from './logo.png';
<img src={logo} />
```

✅ **Correct:**
```tsx
import Image from 'next/image';
<Image src="/logo.png" width={200} height={100} alt="Logo" />
```

### **Issue 3: Client-side navigation**
❌ **Wrong:**
```tsx
window.location.href = '/about';
```

✅ **Correct:**
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/about');
```

---

## 12. Resources

### **Official Documentation:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next SEO](https://github.com/garmeeh/next-seo)
- [Next Sitemap](https://github.com/iamvishnusankar/next-sitemap)

### **Learning Resources:**
- [Next.js Learn Course](https://nextjs.org/learn)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023)

### **Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## 13. Estimated Effort

| Phase | Time | Difficulty |
|-------|------|------------|
| Setup | 2-3 days | Easy |
| Component Migration | 3-5 days | Medium |
| SEO Implementation | 2-3 days | Easy |
| Testing & Optimization | 2-3 days | Medium |
| **Total** | **9-14 days** | **Medium** |

---

## 14. Success Metrics

After migration, you should see:

✅ **Lighthouse Performance:** 90+ (was 60-70)
✅ **Lighthouse SEO:** 95+ (was 70-80)
✅ **First Contentful Paint:** < 1.5s (was 3-4s)
✅ **Time to Interactive:** < 3s (was 6-8s)
✅ **Google Search Visibility:** +200-300% in 3-6 months
✅ **Organic Traffic:** +150-250% in 3-6 months

---

## Questions or Issues?

If you encounter any issues during migration, refer to:
1. Next.js documentation
2. Stack Overflow
3. Next.js Discord community
4. Vercel support (if using Vercel)

---

**Good luck with your migration!** 🚀

This will significantly improve your SEO, performance, and user experience.
