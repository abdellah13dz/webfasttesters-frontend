'use client';

import React, { useEffect, useState } from 'react';
import { fetchPublicPage } from '@/lib/cms';
import type { CmsPage } from '@/lib/cms';
import { CmsMarkdownPage } from '@/components/cms/cms-markdown-page';

interface UseCmsPageResult {
  page: CmsPage | null;
  loading: boolean;
  hasCmsContent: boolean;
}

export function useCmsPage(slug: string): UseCmsPageResult {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchPublicPage(slug);
      if (!cancelled) {
        setPage(data);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return {
    page,
    loading,
    hasCmsContent: !!page?.content?.trim(),
  };
}

export function CmsPageOrFallback({
  slug,
  badge,
  children,
}: {
  slug: string;
  badge?: string;
  children: React.ReactNode;
}) {
  const { page, loading, hasCmsContent } = useCmsPage(slug);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (hasCmsContent && page) {
    return <CmsMarkdownPage title={page.title} content={page.content} badge={badge} />;
  }

  return <>{children}</>;
}
