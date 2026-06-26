'use client';

import { useMemo } from 'react';
import { prepareHtmlArticleForDisplay } from '@/lib/article-content';
import { cn } from '@/lib/utils';

interface ArticleHtmlBodyProps {
  html: string;
  className?: string;
}

export function ArticleHtmlBody({ html, className }: ArticleHtmlBodyProps) {
  const prepared = useMemo(() => prepareHtmlArticleForDisplay(html), [html]);

  return (
    <div
      className={cn(
        'article-html-preview',
        prepared.hasEmbeddedStyles && 'article-html-preview--styled',
        !prepared.hasEmbeddedStyles && 'tiptap-editor-content blog-article-content',
        className
      )}
    >
      {prepared.styles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <div
        className="article-html-preview-body"
        dangerouslySetInnerHTML={{ __html: prepared.bodyHtml }}
      />
    </div>
  );
}
