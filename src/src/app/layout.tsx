import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../styles/globals.scss';
import { HeaderSimple } from '@/components/HeaderSimple';
import { Footer } from '@/components/Footer';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Default metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://axiscyber.tech'),
  title: {
    default: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    template: '%s | Axis Cyber Technologies'
  },
  description: 'We architect next-generation software ecosystems for forward-thinking enterprises. AI/ML, Blockchain, Cloud, Cybersecurity, and 24/7 global support with 100% success rate.',
  keywords: [
    'software engineering',
    'AI development',
    'machine learning',
    'blockchain development',
    'cloud computing',
    'DevOps',
    'cybersecurity',
    'enterprise software',
    'full-stack development',
    'mobile app development',
    'gaming development',
    'WebGL',
    'data engineering',
    'API integration',
    'performance optimization',
    'IoT development',
    'edge computing',
    'product design',
    'UX design',
    'software consulting'
  ],
  authors: [{ name: 'Axis Cyber Technologies', url: 'https://axiscyber.tech' }],
  creator: 'Axis Cyber Technologies',
  publisher: 'Axis Cyber Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axiscyber.tech',
    siteName: 'Axis Cyber Technologies',
    title: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    description: 'We architect next-generation software ecosystems for forward-thinking enterprises with 100% success rate.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Axis Cyber Technologies - Next-Generation Software Engineering',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    description: 'We architect next-generation software ecosystems for forward-thinking enterprises with 100% success rate.',
    images: ['/twitter-image.png'],
    creator: '@axiscybertech',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code-here',
    yandex: 'your-yandex-verification-code-here',
    other: {
      bing: 'your-bing-verification-code-here',
    },
  },
  alternates: {
    canonical: 'https://axiscyber.tech',
  },
  category: 'technology',
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05060A' },
    { media: '(prefers-color-scheme: light)', color: '#05060A' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Additional meta tags */}
        <meta name="application-name" content="Axis Cyber Technologies" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Axis Cyber" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#DD00FF" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden antialiased`}
        suppressHydrationWarning
      >
        {/* Analytics tracking */}
        <AnalyticsProvider />

        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-[var(--neon-purple)] focus:to-[var(--neon-cyan)] focus:text-white focus:rounded-2xl focus:font-black"
        >
          Skip to main content
        </a>

        <HeaderSimple />

        <main id="main-content">
          {children}
        </main>

        <Footer />

        {/* Background effects - Global neon ambiance */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--neon-purple)] rounded-full blur-[140px] opacity-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full blur-[140px] opacity-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
        </div>
      </body>
    </html>
  );
}