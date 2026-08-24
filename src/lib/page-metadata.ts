import type { Metadata } from 'next';
import { BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { applyBlogSnippetOverride } from '@/lib/blog-snippet-overrides';
import {
  defaultSeo,
  pageSeoConfig,
  SITE_NAME,
  SITE_URL,
  type PageSeo,
} from '@/lib/seo';

function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function canonicalUrl(path: string): string {
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path}`;
}

function keywordsToArray(keywords: string): string[] {
  return keywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

function humanizePath(path: string): string {
  const segment = path.split('/').filter(Boolean).pop() || 'Page';
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function resolvePageSeo(path: string, override?: Partial<PageSeo>): PageSeo {
  const base = pageSeoConfig[path] ?? {
    ...defaultSeo,
    title: `${humanizePath(path)} - Fast Testers | Google Play App Testing`,
    description: defaultSeo.description,
    keywords: defaultSeo.keywords,
    ogImage: defaultSeo.ogImage,
    type: 'website' as const,
  };

  if (!override) return base;

  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(override).filter(([, v]) => v !== undefined && v !== '')
    ),
  } as PageSeo;
}

/** Convert internal SEO config to Next.js Metadata (SSR for Google & social crawlers). */
export function pageSeoToMetadata(path: string, seo: PageSeo): Metadata {
  const url = canonicalUrl(path);
  const ogImage = absoluteAssetUrl(seo.ogImage || BRAND_OG_IMAGE_PATH);
  const keywords = keywordsToArray(seo.keywords);

  const robots: Metadata['robots'] = seo.noindex
    ? { index: false, follow: false, nocache: true }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      };

  const openGraph: Metadata['openGraph'] =
    seo.type === 'article'
      ? {
          type: 'article',
          locale: 'en_US',
          alternateLocale: ['es_ES', 'tr_TR', 'ar'],
          url,
          siteName: SITE_NAME,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ],
          publishedTime: seo.publishedTime,
          modifiedTime: seo.modifiedTime,
          section: seo.section,
          tags: seo.tags,
          authors: [SITE_NAME],
        }
      : {
          type: 'website',
          locale: 'en_US',
          alternateLocale: ['es_ES', 'tr_TR', 'ar'],
          url,
          siteName: SITE_NAME,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ],
        };

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'x-default': url,
        // Locale UI is client-switched; prepare hreflang architecture without changing URLs.
        es: url,
        tr: url,
        ar: url,
      },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [ogImage],
      creator: '@fasttesters',
      site: '@fasttesters',
    },
    robots,
    category: 'technology',
    other: {
      'geo.region': 'US',
      'application-name': SITE_NAME,
    },
  };
}

export function buildMetadataForPath(
  path: string,
  override?: Partial<PageSeo>
): Metadata {
  return pageSeoToMetadata(path, resolvePageSeo(path, override));
}

/** Shorthand for static route page.tsx files */
export function createPageMetadata(path: string): Metadata {
  return buildMetadataForPath(path);
}

/** Build metadata for a CMS or dynamic blog article. */
export function buildBlogArticleMetadata(
  article: {
    slug: string;
    title: string;
    description: string;
    coverImage: string | null;
    category: string;
    createdAt: string;
    updatedAt?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  },
  keywords: string
): Metadata {
  const path = `/blog/${article.slug}`;
  const snippet = applyBlogSnippetOverride(
    article.slug,
    article.seoTitle?.trim() || `${article.title?.trim() || 'Article'} - Fast Testers Blog`,
    article.seoDescription?.trim() ||
      article.description?.trim() ||
      'Expert guide on Google Play testing and Android app publishing from Fast Testers.'
  );
  const title = snippet.title;
  const description = snippet.description;

  return buildMetadataForPath(path, {
    title,
    description,
    keywords,
    ogImage: article.coverImage || BRAND_OG_IMAGE_PATH,
    type: 'article',
    publishedTime: article.createdAt,
    modifiedTime: article.updatedAt || article.createdAt,
    section: article.category,
    tags: [article.category, 'Google Play', 'Android app testing'],
  });
}
