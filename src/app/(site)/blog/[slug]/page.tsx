import type { Metadata } from 'next';
import BlogArticlePage from '@/components/pages/blog-article';
import { apiUrl } from '@/lib/api';
import { buildMetadataForPath } from '@/lib/page-metadata';
import { BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import type { ApiArticle } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const res = await fetch(apiUrl('/api/articles'), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const articles = (await res.json()) as ApiArticle[];
    return articles.find((a) => a.slug === slug && a.status === 'published') ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/blog/${slug}`;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return buildMetadataForPath(path, {
      title: 'Article Not Found - Fast Testers',
      description: 'The requested blog article could not be found.',
      noindex: true,
    });
  }

  const title =
    article.seoTitle?.trim() ||
    `${article.title} - Fast Testers Blog`;
  const description =
    article.seoDescription?.trim() ||
    article.description ||
    'Expert guide on Google Play testing and Android app publishing from Fast Testers.';

  return buildMetadataForPath(path, {
    title,
    description: description.slice(0, 160),
    keywords: `${article.category}, google play testing, android app testing, fast testers, ${article.title}`,
    ogImage: article.coverImage || BRAND_OG_IMAGE_PATH,
    type: 'article',
  });
}

export default function BlogSlugPage() {
  return <BlogArticlePage />;
}
