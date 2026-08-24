import type { MetadataRoute } from 'next';
import { fetchPublishedArticles } from '@/lib/blog';
import { BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { pageSeoConfig } from '@/lib/seo';
import { SITE_URL } from '@/lib/site-url';

/**
 * Indexable static routes only.
 * Do NOT include URLs that permanently redirect (wastes crawl budget).
 */
const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/pricing', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/how-it-works', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/free-testers', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/android-app-testers', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/reviews', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/compare', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog/google-play-12-testers-policy', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/blog/how-to-find-beta-testers-for-android-apps', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog/google-play-closed-testing', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog/app-rejected-google-play', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog/multi-language-app-testing', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog/publish-app-google-play', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/google-play-12-testers', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/google-play-14-day-testing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/google-play-personal-developer-account', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/google-play-testing-service', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/android-closed-testing', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/resources/google-play-checklist', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/google-play-production-access-12-testers', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/google-play-setup-guide', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/guides/enterprise-onboarding', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/support', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/contact-us', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/app-testing-referral-program', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/partners', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/changelog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/status', priority: 0.5, changeFrequency: 'daily' },
  { path: '/feedback', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/terms-and-conditions', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/cookie-policy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/refund-policy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/cancellation-policy', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/account-deletion', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/referral-policy', priority: 0.4, changeFrequency: 'monthly' },
];

const STATIC_BLOG_SLUGS = new Set([
  'google-play-12-testers-policy',
  'how-to-find-beta-testers-for-android-apps',
  'google-play-closed-testing',
  'app-rejected-google-play',
  'multi-language-app-testing',
  'publish-app-google-play',
]);

function absoluteImage(path?: string): string {
  const img = path || BRAND_OG_IMAGE_PATH;
  if (img.startsWith('http')) return img;
  return `${SITE_URL}${img.startsWith('/') ? img : `/${img}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => {
      const seoKey = path === '' ? '/' : path;
      const ogImage = pageSeoConfig[seoKey]?.ogImage;
      return {
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        images: [absoluteImage(ogImage)],
      };
    }
  );

  const articles = await fetchPublishedArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.createdAt ? new Date(article.createdAt) : now,
    changeFrequency: 'monthly' as const,
    priority: article.featured ? 0.8 : 0.7,
    images: [absoluteImage(article.coverImage || undefined)],
  }));

  const dedupedArticles = articleEntries.filter((entry) => {
    const slug = entry.url.replace(`${baseUrl}/blog/`, '');
    return !STATIC_BLOG_SLUGS.has(slug);
  });

  return [...staticEntries, ...dedupedArticles];
}
