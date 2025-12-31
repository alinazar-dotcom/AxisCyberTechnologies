import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axiscybertech.com';

  // Static routes
  const staticRoutes = [
    '',
    '/services',
    '/about',
    '/blog',
    '/careers',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? 'daily' : 'weekly' as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes
  try {
    // Services
    const servicesRes = await fetch(`${baseUrl}/api/services`);
    const servicesData = await servicesRes.json();
    const serviceRoutes = servicesData.success && servicesData.data
      ? servicesData.data.map((service: any) => ({
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: new Date(service.updated_at || service.created_at),
          changeFrequency: 'monthly' as 'monthly',
          priority: 0.7,
        }))
      : [];

    // Blog Posts
    const blogRes = await fetch(`${baseUrl}/api/blog?status=published`);
    const blogData = await blogRes.json();
    const blogRoutes = blogData.success && blogData.data
      ? blogData.data.map((post: any) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_date || post.published_date),
          changeFrequency: 'weekly' as 'weekly',
          priority: 0.6,
        }))
      : [];

    // Jobs
    const jobsRes = await fetch(`${baseUrl}/api/jobs?is_active=true`);
    const jobsData = await jobsRes.json();
    const jobRoutes = jobsData.success && jobsData.data
      ? jobsData.data.map((job: any) => ({
          url: `${baseUrl}/careers/${job.slug}`,
          lastModified: new Date(job.updated_at || job.created_at),
          changeFrequency: 'weekly' as 'weekly',
          priority: 0.5,
        }))
      : [];

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...jobRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
