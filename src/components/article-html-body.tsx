'use client';

import { useMemo } from 'react';
import { prepareHtmlArticleForDisplay } from '@/lib/article-content';
import { cn } from '@/lib/utils';

interface ArticleHtmlBodyProps {
  html: string;
  className?: string;
  /** Match admin preview chrome on the public article page */
  variant?: 'default' | 'surface';
}

export function ArticleHtmlBody({ html, className, variant = 'default' }: ArticleHtmlBodyProps) {
  const prepared = useMemo(() => prepareHtmlArticleForDisplay(html), [html]);

  const content = (
    <>
      {prepared.styles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <div
        className="article-html-preview-body"
        dangerouslySetInnerHTML={{ __html: prepared.bodyHtml }}
      />
    </>
  );

  if (variant === 'surface') {
    return (
      <div className={cn('article-html-surface', className)}>
        <div
          className={cn(
            'article-html-preview tiptap-editor-content blog-article-content',
            prepared.hasEmbeddedStyles && 'article-html-preview--styled'
          )}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'article-html-preview tiptap-editor-content blog-article-content',
        prepared.hasEmbeddedStyles && 'article-html-preview--styled',
        className
      )}
    >
      {content}
    </div>
  );
}
