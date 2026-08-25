'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogCoverImage } from '@/components/blog-cover-image';
import { BLOG_IMAGE_SIZES } from '@/lib/blog-image';
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
    <BlogCoverImage
      src={typeof src === 'string' ? src : ''}
      alt={alt || ''}
      fill={false}
      width={1200}
      height={800}
      sizes={BLOG_IMAGE_SIZES.inline}
      className="h-auto w-full rounded-lg"
    />
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
