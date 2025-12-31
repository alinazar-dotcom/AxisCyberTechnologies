import type { Metadata } from 'next';
import Script from 'next/script';
import { Hero } from '@/components/Hero';
import { TrustedBy } from '@/components/TrustedBy';
import { Philosophy } from '@/components/Philosophy';
import { ServicesDynamic } from '@/components/ServicesDynamic';
import { TechGalaxy } from '@/components/TechGalaxy';
import { CaseStudiesDynamic } from '@/components/CaseStudiesDynamic';
import { CoreLogic } from '@/components/CoreLogic';
import { Industries } from '@/components/Industries';
import { InnovationLab } from '@/components/InnovationLab';
import { TestimonialsDynamic } from '@/components/TestimonialsDynamic';
import { TeamDynamic } from '@/components/TeamDynamic';
import { BlogDynamic } from '@/components/BlogDynamic';
import { GlobalOffices } from '@/components/GlobalOffices';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Axis Cyber Technologies - Engineering the future, building the impossible. Next-generation software ecosystems with AI/ML, Blockchain, Cloud, and 24/7 support across 4 global offices.',
  openGraph: {
    title: 'Axis Cyber Technologies | Next-Generation Software Engineering',
    description: 'Engineering the future, building the impossible. 100% success rate across all 12 services.',
    url: 'https://axiscyber.tech',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: 'https://axiscyber.tech',
  },
};

export default function HomePage() {
  // JSON-LD Structured Data for Homepage
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://axiscyber.tech/#organization',
    name: 'Axis Cyber Technologies',
    alternateName: 'Axis Cyber',
    url: 'https://axiscyber.tech',
    logo: {
      '@type': 'ImageObject',
      url: 'https://axiscyber.tech/logo.png',
      width: 512,
      height: 512,
    },
    description: 'Next-generation software engineering company specializing in AI/ML, Blockchain, Cloud, and enterprise solutions with 100% success rate.',
    foundingDate: '2020',
    slogan: 'Engineering the Future. Building the Impossible.',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 150,
    },
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
        name: 'Headquarters'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
        name: 'Middle East Office'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'California',
        addressCountry: 'US',
        name: 'North America Office'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB',
        name: 'Europe Office'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Urdu', 'Arabic'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        availableLanguage: ['English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      }
    ],
    sameAs: [
      'https://twitter.com/axiscybertech',
      'https://linkedin.com/company/axiscybertech',
      'https://github.com/axiscybertech',
      'https://facebook.com/axiscybertech',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI/ML Development',
            description: 'Enterprise AI and Machine Learning solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Blockchain Development',
            description: 'Web3, Smart Contracts, and Blockchain solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud & DevOps',
            description: 'Cloud infrastructure and DevOps automation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cybersecurity',
            description: 'Enterprise-grade security solutions'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://axiscyber.tech/#website',
    url: 'https://axiscyber.tech',
    name: 'Axis Cyber Technologies',
    description: 'Next-generation software engineering company',
    publisher: {
      '@id': 'https://axiscyber.tech/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://axiscyber.tech/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />

      {/* Page Content */}
      <Hero />
      <TrustedBy />
      <Philosophy />
      <ServicesDynamic />
      <TechGalaxy />
      <CaseStudiesDynamic />
      <CoreLogic />
      <Industries />
      <InnovationLab />
      <TestimonialsDynamic />
      <TeamDynamic />
      <BlogDynamic />
      <GlobalOffices />
      <CTASection />
    </>
  );
}