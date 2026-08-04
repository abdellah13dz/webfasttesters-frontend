'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="article-table-scroll mb-6">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src || ''} alt={alt || ''} loading="lazy" />
  ),
};

interface MarkdownContentProps {
  content: string;
  className?: string;
  components?: Components;
}

/** GFM-enabled markdown renderer with scrollable tables for blog/CMS content. */
export function MarkdownContent({ content, className, components }: MarkdownContentProps) {
  return (
    <div className={cn('tiptap-editor-content blog-article-content', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...markdownComponents, ...components }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
