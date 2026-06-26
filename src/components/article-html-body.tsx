'use client';

import { useMemo } from 'react';
import { sanitizeHtmlArticleForTheme } from '@/lib/article-content';
import { cn } from '@/lib/utils';

interface ArticleHtmlBodyProps {
  html: string;
  className?: string;
}

export function ArticleHtmlBody({ html, className }: ArticleHtmlBodyProps) {
  const themedHtml = useMemo(() => sanitizeHtmlArticleForTheme(html), [html]);

  return (
    <div
      className={cn(
        'tiptap-editor-content blog-article-content article-html-preview',
        className
      )}
      dangerouslySetInnerHTML={{ __html: themedHtml }}
    />
  );
}
