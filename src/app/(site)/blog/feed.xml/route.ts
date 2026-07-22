import { fetchPublishedArticles, BLOG_REVALIDATE_SECONDS } from '@/lib/blog';
import { buildBlogRssXml, toBlogFeedItems } from '@/lib/blog-feed';

export const revalidate = BLOG_REVALIDATE_SECONDS;

export async function GET() {
  const articles = await fetchPublishedArticles();
  const xml = buildBlogRssXml(toBlogFeedItems(articles));

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
