import type { Metadata } from 'next';
import { AboutPageContent } from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us | Axis Cyber Technologies',
  description: 'Established in 2012, Axis Cyber Technologies delivers next-generation software solutions with 100% success rate across 4 global offices. 500+ projects delivered worldwide.',
  openGraph: {
    title: 'About Axis Cyber Technologies | 100% Success Rate Since 2012',
    description: '500+ projects delivered with 100% success across all 12 specialized services from our global offices in Lahore, Dubai, Los Angeles, and London.',
    url: 'https://axiscyber.tech/about',
    images: ['/og-about.png'],
  },
  alternates: {
    canonical: 'https://axiscyber.tech/about',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
