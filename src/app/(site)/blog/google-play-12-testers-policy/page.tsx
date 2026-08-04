import { notFound } from 'next/navigation';
import BlogArticlePage from '@/components/pages/blog-article';
import { JsonLdForPath } from '@/components/site-json-ld';
import {
  blogArticleKeywords,
  fetchArticleBySlug,
  fetchPublishedArticleSummaries,
  pickRelatedArticles,
} from '@/lib/blog';
import { buildBlogArticleMetadata } from '@/lib/page-metadata';

const SLUG = 'google-play-12-testers-policy';

/** ISR: keep expanded CMS content fresh without full redeploys */
export const revalidate = 3600;

export async function generateMetadata() {
  const article = await fetchArticleBySlug(SLUG);
  if (!article) {
    return buildBlogArticleMetadata(
      {
        slug: SLUG,
        title: 'Google Play 12 Testers Policy',
        description:
          "Complete guide to Google Play's 12-testers-for-14-days closed testing policy.",
        coverImage: null,
        category: 'GOOGLE PLAY',
        createdAt: new Date().toISOString(),
      },
      'google play 12 testers policy, 12 testers 14 days, closed testing'
    );
  }
  return buildBlogArticleMetadata(article, blogArticleKeywords(article));
}

/**
 * Serve the expanded CMS article at the stable URL.
 * Preserves slug/URL equity while using the authority-expanded database content.
 */
export default async function RoutePage() {
  const article = await fetchArticleBySlug(SLUG);
  if (!article) notFound();

  const allArticles = await fetchPublishedArticleSummaries();
  const relatedArticles = pickRelatedArticles(article, allArticles, 6);

  const path = `/blog/${SLUG}`;
  const title = article.seoTitle?.trim() || article.title;
  const description =
    article.seoDescription?.trim() ||
    article.description ||
    "Complete guide to Google Play's 12-testers-for-14-days closed testing policy.";

  return (
    <>
      <JsonLdForPath
        path={path}
        article={{
          title,
          description,
          image: article.coverImage || undefined,
          datePublished: article.createdAt,
          dateModified: article.createdAt,
          section: article.category,
          keywords: blogArticleKeywords(article),
        }}
      />
      <BlogArticlePage
        slug={SLUG}
        initialArticle={article}
        initialRelated={relatedArticles}
      />
    </>
  );
}
