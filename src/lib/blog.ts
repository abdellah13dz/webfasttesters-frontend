import { apiUrl } from '@/lib/api';
import { mergeKeywords } from '@/lib/seo-keywords';

/** ISR / server fetch cache for public CMS reads (seconds). */
export const BLOG_REVALIDATE_SECONDS = 3600;

export function blogArticlePath(slug: string): string {
  return `/blog/${slug}`;
}

const CATEGORY_KEYWORDS: Record<string, string> = {
  'GOOGLE PLAY':
    'google play 12 testers policy, google play closed testing, play store testing requirements',
  'APP TESTING': 'android app testing, app testing service, google play app testing',
  'BETA TESTING': 'beta testers android, find beta testers, android beta testing',
  'CLOSED TESTING': 'google play closed testing, closed test android app, play store closed testing',
  'APP REJECTION': 'app rejected google play, fix app rejection, google play rejection',
  INTERNATIONAL: 'multi-language app testing, localization testing, international app testers',
  PUBLISHING: 'publish app google play, google play production access, play store publishing',
};

export function blogArticleKeywords(article: ApiArticle): string {
  return mergeKeywords(
    CATEGORY_KEYWORDS[article.category] || article.category,
    article.title,
    article.seoTitle || ''
  );
}

export async function fetchPublishedArticles(): Promise<ApiArticle[]> {
  return fetchPublishedArticleSummaries();
}

export async function fetchPublishedArticleSummaries(): Promise<ApiArticle[]> {
  try {
    const res = await fetch(apiUrl('/api/articles'), {
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const articles = (await res.json()) as ApiArticle[];
    return articles.filter((a) => a.status === 'published');
  } catch {
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const res = await fetch(apiUrl(`/api/articles?slug=${encodeURIComponent(slug)}`), {
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const articles = (await res.json()) as ApiArticle[];
    const article = articles.find((a) => a.slug === slug && a.status === 'published');
    return article ?? null;
  } catch {
    return null;
  }
}

export interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  coverImage: string | null;
  category: string;
  status: string;
  readTime: string;
  featured: boolean;
  createdAt: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export function mapApiArticle(article: ApiArticle) {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: new Date(article.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: article.readTime,
    categories: [article.category],
    image: article.coverImage || '/images/blog/default.png',
    content: article.content ?? '',
    featured: article.featured,
  };
}
