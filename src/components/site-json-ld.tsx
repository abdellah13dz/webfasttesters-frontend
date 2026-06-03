import { headers } from 'next/headers';
import { getSchemasForPath } from '@/lib/structured-data-schemas';

interface SiteJsonLdProps {
  /** Override pathname when set in a page (e.g. dynamic blog slug metadata). */
  path?: string;
  article?: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
  };
}

export async function SiteJsonLd({ path: pathProp, article }: SiteJsonLdProps = {}) {
  const headersList = await headers();
  const path = pathProp ?? headersList.get('x-pathname') ?? '/';
  const schemas = getSchemasForPath(path, article);

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
