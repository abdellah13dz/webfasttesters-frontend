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
  const category = article.category?.trim() || 'APP TESTING';
  return mergeKeywords(
    CATEGORY_KEYWORDS[category] || category,
    article.title?.trim() || '',
    article.seoTitle?.trim() || ''
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
  updatedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export function mapApiArticle(article: ApiArticle) {
  return {
    slug: article.slug,
    title: article.title?.trim() || 'Untitled',
    description: article.description?.trim() || '',
    date: new Date(article.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: article.readTime?.trim() || '',
    categories: [article.category?.trim() || 'APP TESTING'],
    image: article.coverImage || '/images/blog/default.png',
    content: article.content ?? '',
    featured: Boolean(article.featured),
  };
}

/** Score topical similarity for related-article recommendations. */
export function scoreArticleRelatedness(
  current: Pick<ApiArticle, 'slug' | 'category' | 'title' | 'featured'>,
  candidate: Pick<ApiArticle, 'slug' | 'category' | 'title' | 'featured'>
): number {
  if (current.slug === candidate.slug) return -1;
  const tokens = new Set(
    `${current.slug} ${current.title || ''}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 3)
  );
  const cand = `${candidate.slug} ${candidate.title || ''}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 3);
  let score = 0;
  for (const t of cand) if (tokens.has(t)) score += 2;
  if (current.category && current.category === candidate.category) score += 6;
  if (candidate.featured) score += 1;
  return score;
}

/** Pick the best related articles for sidebar / end-of-post modules. */
export function pickRelatedArticles(
  current: ApiArticle,
  pool: ApiArticle[],
  limit = 6
): ApiArticle[] {
  return pool
    .filter((a) => a.slug !== current.slug && a.status === 'published')
    .map((a) => ({ a, score: scoreArticleRelatedness(current, a) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.a.slug.localeCompare(y.a.slug))
    .slice(0, limit)
    .map((x) => x.a);
}
