import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const disallowPrivate = [
    '/admin/',
    '/api/',
    '/payment-success',
    '/login',
    '/signup',
    '/forgot-password',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPrivate,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowPrivate,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/images/', '/logo/', '/uploads/'],
      },
      // Explicit allow for major AI crawlers (retrieval / citation)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
