import { headers } from 'next/headers';
import {
  getSchemasForPath,
  type BlogListArticle,
} from '@/lib/structured-data-schemas';

interface SiteJsonLdProps {
  /** Override pathname when set in a page (e.g. dynamic blog slug metadata). */
  path?: string;
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

export async function SiteJsonLd({
  path: pathProp,
  article,
  blogArticles,
}: SiteJsonLdProps = {}) {
  const headersList = await headers();
  const path = pathProp ?? headersList.get('x-pathname') ?? '/';
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
