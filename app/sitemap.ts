import { MetadataRoute } from 'next';
import { classesData } from '@/lib/data';
import { siteConfig } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;

  const staticRoutes = [
    '/',
    '/classes',
    '/career-counselling',
    '/workshops',
    '/venue',
    '/schedule',
    '/ai-activity-plan',
    '/contact',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));

  const classRoutes = classesData.map((classInfo) => ({
    url: `${siteUrl}/classes/${classInfo.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...classRoutes];
}
