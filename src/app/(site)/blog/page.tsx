import type { Metadata } from 'next';
import Page from '@/components/pages/blog';
import { JsonLdForPath } from '@/components/site-json-ld';
import { fetchPublishedArticles } from '@/lib/blog';
import { buildMetadataForPath } from '@/lib/page-metadata';
import { SITE_URL } from '@/lib/site-url';

export const metadata: Metadata = {
  ...buildMetadataForPath('/blog'),
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      'application/rss+xml': `${SITE_URL}/blog/feed.xml`,
    },
  },
};

export const revalidate = 3600;

export default async function RoutePage() {
  const articles = await fetchPublishedArticles();
  const blogArticles = articles.map((article) => ({
    slug: article.slug,
    title: article.seoTitle?.trim() || article.title?.trim() || 'Blog',
    description: article.seoDescription?.trim() || article.description?.trim() || '',
    datePublished: article.createdAt,
  }));

  return (
    <>
      <JsonLdForPath path="/blog" blogArticles={blogArticles} />
      <Page initialArticles={articles} />
    </>
  );
}
