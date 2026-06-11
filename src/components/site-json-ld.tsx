import { headers } from 'next/headers';
import {
  getSchemasForPath,
  type BlogListArticle,
} from '@/lib/structured-data-schemas';

interface JsonLdProps {
  path: string;
  article?: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    section?: string;
    keywords?: string;
  };
  blogArticles?: BlogListArticle[];
}

/** Sync JSON-LD renderer — safe for ISR/static pages (no headers/cookies). */
export function JsonLdForPath({ path, article, blogArticles }: JsonLdProps) {
  const schemas = getSchemasForPath(path, article, blogArticles);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

interface SiteJsonLdProps {
  /** Override pathname when set in a page (e.g. dynamic blog slug metadata). */
  path?: string;
  article?: JsonLdProps['article'];
  blogArticles?: BlogListArticle[];
}

/** Layout helper — reads pathname from middleware header when path not passed. */
export async function SiteJsonLd({
  path: pathProp,
  article,
  blogArticles,
}: SiteJsonLdProps = {}) {
  if (pathProp) {
    return (
      <JsonLdForPath
        path={pathProp}
        article={article}
        blogArticles={blogArticles}
      />
    );
  }

  const headersList = await headers();
  const path = headersList.get('x-pathname') ?? '/';

  return (
    <JsonLdForPath path={path} article={article} blogArticles={blogArticles} />
  );
}
