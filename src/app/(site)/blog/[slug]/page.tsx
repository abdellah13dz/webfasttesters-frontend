import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticlePage from '@/components/pages/blog-article';
import { JsonLdForPath } from '@/components/site-json-ld';
import {
  blogArticleKeywords,
  fetchArticleBySlug,
  fetchPublishedArticleSummaries,
  pickRelatedArticles,
} from '@/lib/blog';
import { buildBlogArticleMetadata, buildMetadataForPath } from '@/lib/page-metadata';

type Props = { params: Promise<{ slug: string }> };

/** ISR: re-fetch articles from API every hour */
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return buildMetadataForPath(`/blog/${slug}`, {
      title: 'Article Not Found - Fast Testers',
      description: 'The requested blog article could not be found.',
      noindex: true,
    });
  }

  return buildBlogArticleMetadata(article, blogArticleKeywords(article));
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await fetchPublishedArticleSummaries();
  const relatedArticles = pickRelatedArticles(article, allArticles, 6);

  const path = `/blog/${slug}`;
  const title = article.seoTitle?.trim() || article.title;
  const description =
    article.seoDescription?.trim() ||
    article.description ||
    'Expert guide on Google Play testing and Android app publishing from Fast Testers.';

  return (
    <>
      <JsonLdForPath
        path={path}
        article={{
          title,
          description,
          image: article.coverImage || undefined,
          datePublished: article.createdAt,
          dateModified: article.updatedAt || article.createdAt,
          section: article.category,
          keywords: blogArticleKeywords(article),
        }}
      />
      <BlogArticlePage
        slug={slug}
        initialArticle={article}
        initialRelated={relatedArticles}
      />
    </>
  );
}
