import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function SEO({
  title = 'Axis Cyber Technologies | Next-Generation Software Engineering',
  description = 'Leading software engineering company specializing in AI, blockchain, cloud solutions, and custom software development. Operating 24/7 across global offices in Lahore, Dubai, Los Angeles, and London.',
  image = '/og-image.png',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axiscybertech.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: title,
    description,
    url: fullUrl,
    image: fullImage,
    ...(type === 'article' && {
      author: {
        '@type': 'Person',
        name: author || 'Axis Cyber Technologies',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Axis Cyber Technologies',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
    }),
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Axis Cyber Technologies" />
      
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@axiscybertech" />

      {/* Additional SEO */}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Axis Cyber Technologies" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Axis Cyber Technologies',
            description: 'Next-generation software engineering company',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            foundingDate: '2020',
            address: [
              {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressCountry: 'Pakistan',
              },
              {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressCountry: 'UAE',
              },
              {
                '@type': 'PostalAddress',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                addressCountry: 'USA',
              },
              {
                '@type': 'PostalAddress',
                addressLocality: 'London',
                addressCountry: 'UK',
              },
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'hello@axiscybertech.com',
              availableLanguage: ['English'],
            },
            sameAs: [
              'https://twitter.com/axiscybertech',
              'https://linkedin.com/company/axiscybertech',
              'https://github.com/axiscybertech',
            ],
          }),
        }}
      />
    </Head>
  );
}
