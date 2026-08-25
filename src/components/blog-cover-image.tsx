'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  BLOG_IMAGE_SIZES,
  IMAGE_QUALITY,
  canUseNextImage,
  resolveBlogImageSrc,
} from '@/lib/blog-image';
import { cn } from '@/lib/utils';

type FillProps = {
  fill?: true;
  width?: never;
  height?: never;
};

type IntrinsicProps = {
  fill: false;
  width: number;
  height: number;
};

type BlogCoverImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
} & (FillProps | IntrinsicProps | { fill?: boolean; width?: number; height?: number });

function NativeImg({
  src,
  alt,
  className,
  priority,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn(fill && 'absolute inset-0 h-full w-full', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
    />
  );
}

export function BlogCoverImage({
  src,
  alt,
  className,
  priority = false,
  sizes,
  fill = true,
  width,
  height,
}: BlogCoverImageProps) {
  const resolved = resolveBlogImageSrc(src);
  const [failed, setFailed] = useState(false);
  const useOptimizer = !failed && canUseNextImage(resolved);
  const resolvedSizes = sizes ?? (fill ? BLOG_IMAGE_SIZES.hero : BLOG_IMAGE_SIZES.inline);

  if (!useOptimizer) {
    return (
      <NativeImg
        src={resolved}
        alt={alt}
        className={className}
        priority={priority}
        fill={Boolean(fill)}
      />
    );
  }

  if (fill || width == null || height == null) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={resolvedSizes}
        quality={IMAGE_QUALITY}
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      sizes={resolvedSizes}
      quality={IMAGE_QUALITY}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={{ width: '100%', height: 'auto' }}
      onError={() => setFailed(true)}
    />
  );
}

/** Full-width static blog hero (local `/images/blog/*.png`). */
export function StaticBlogCover({ src, alt }: { src: string; alt: string }) {
  return (
    <BlogCoverImage
      src={src}
      alt={alt}
      fill={false}
      width={1280}
      height={720}
      sizes={BLOG_IMAGE_SIZES.inline}
      priority
      className="mb-8 h-auto w-full rounded-xl border border-border/50"
    />
  );
}
