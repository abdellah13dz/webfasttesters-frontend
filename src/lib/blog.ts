export function blogArticlePath(slug: string): string {
  return `/blog/${slug}`;
}

export interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
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
    content: article.content,
    featured: article.featured,
  };
}
