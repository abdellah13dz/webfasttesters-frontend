import { fetchPublishedArticles } from '@/lib/blog';
import { buildBlogRssXml, toBlogFeedItems } from '@/lib/blog-feed';

export const revalidate = 300;

export async function GET() {
  const articles = await fetchPublishedArticles();
  const xml = buildBlogRssXml(toBlogFeedItems(articles));

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
