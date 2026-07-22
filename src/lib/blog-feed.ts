import { blogArticlePath, type ApiArticle } from '@/lib/blog';
import { resolvePageSeo } from '@/lib/page-metadata';
import { SITE_URL } from '@/lib/site-url';

export interface BlogFeedItem {
  slug: string;
  title: string;
  description: string;
  url: string;
  datePublished: string;
  category?: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822Date(isoDate: string): string {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime())
    ? new Date().toUTCString()
    : date.toUTCString();
}

export function toBlogFeedItems(articles: ApiArticle[]): BlogFeedItem[] {
  return articles
    .map((article) => ({
      slug: article.slug,
      title: article.seoTitle?.trim() || article.title?.trim() || 'Blog post',
      description: article.seoDescription?.trim() || article.description?.trim() || '',
      url: `${SITE_URL}${blogArticlePath(article.slug)}`,
      datePublished: article.createdAt,
      category: article.category,
    }))
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    );
}

export function buildBlogRssXml(items: BlogFeedItem[]): string {
  const seo = resolvePageSeo('/blog');
  const feedUrl = `${SITE_URL}/blog/feed.xml`;
  const blogUrl = `${SITE_URL}/blog`;

  const channelItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRfc822Date(item.datePublished)}</pubDate>
      ${item.category ? `<category>${escapeXml(item.category)}</category>` : ''}
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml('Fast Testers Blog')}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(seo.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822Date(items[0]?.datePublished || new Date().toISOString())}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${escapeXml(`${SITE_URL}/images/blog/blog-12-testers.png`)}</url>
      <title>${escapeXml('Fast Testers Blog')}</title>
      <link>${escapeXml(blogUrl)}</link>
    </image>
${channelItems}
  </channel>
</rss>`;
}
