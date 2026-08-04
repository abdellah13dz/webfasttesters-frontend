import { JsonLdForPath } from '@/components/site-json-ld';
import type { BlogListArticle } from '@/lib/structured-data-schemas';

interface PageSeoShellProps {
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
  faq?: { question: string; answer: string }[];
  children: React.ReactNode;
}

/** Wraps a page with server-rendered JSON-LD for the given path. */
export function PageSeoShell({
  path,
  article,
  blogArticles,
  faq,
  children,
}: PageSeoShellProps) {
  return (
    <>
      <JsonLdForPath
        path={path}
        article={article}
        blogArticles={blogArticles}
        faq={faq}
      />
      {children}
    </>
  );
}
