import { getPublicApiBase } from '@/lib/api';

export const DEFAULT_BLOG_IMAGE = '/images/blog/default.png';

/** Widths that match next.config `images.deviceSizes` for `/_next/image?w=`. */
export const HTML_IMAGE_WIDTH = 1080;
export const IMAGE_QUALITY = 75;

export const BLOG_IMAGE_SIZES = {
  hero: '(max-width: 1280px) 100vw, 1280px',
  featured: '(max-width: 1024px) 100vw, 1024px',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px',
  inline: '(max-width: 768px) 100vw, 768px',
} as const;

const SKIP_OPTIMIZER_EXT = /\.(gif|svg|svgz)(?:$|\?)/i;

function hostnameAllowed(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return true;
  if (host === 'fasttesters.com' || host === 'www.fasttesters.com') return true;
  if (host === 'webapi.fasttesters.com') return true;
  if (host.endsWith('.fasttesters.com')) return true;
  if (host.endsWith('.r2.dev')) return true;
  if (host.endsWith('.r2.cloudflarestorage.com')) return true;
  return false;
}

/** Turn CMS `/uploads/...` paths into an absolute API URL next/image can fetch. */
export function resolveBlogImageSrc(src?: string | null): string {
  const raw = (src || '').trim();
  if (!raw) return DEFAULT_BLOG_IMAGE;

  if (raw.startsWith('data:') || raw.startsWith('blob:') || raw.startsWith('/_next/image')) {
    return raw;
  }

  const withProtocol = raw.startsWith('//') ? `https:${raw}` : raw;

  if (withProtocol.startsWith('/uploads/') || withProtocol === '/uploads') {
    return `${getPublicApiBase()}${withProtocol}`;
  }

  return withProtocol;
}

export function canUseNextImage(src?: string | null): boolean {
  const resolved = resolveBlogImageSrc(src);
  if (!resolved || resolved.startsWith('data:') || resolved.startsWith('blob:')) return false;
  if (resolved.startsWith('/_next/image')) return false;
  if (SKIP_OPTIMIZER_EXT.test(resolved)) return false;

  if (resolved.startsWith('/')) {
    return !resolved.startsWith('/uploads/');
  }

  try {
    const url = new URL(resolved);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    return hostnameAllowed(url.hostname);
  } catch {
    return false;
  }
}

/** Rewrite a raster src through the Next.js optimizer for CMS HTML `<img>` tags. */
export function toOptimizedHtmlSrc(src: string, width = HTML_IMAGE_WIDTH): string {
  const resolved = resolveBlogImageSrc(src);
  if (resolved.startsWith('/_next/image')) return resolved;
  if (!canUseNextImage(resolved)) return resolved;
  return `/_next/image?url=${encodeURIComponent(resolved)}&w=${width}&q=${IMAGE_QUALITY}`;
}

function applyImgPerfAttributes(img: Element): void {
  if (!img.getAttribute('alt')) img.setAttribute('alt', '');
  img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
  img.setAttribute('decoding', 'async');
  if (!img.getAttribute('fetchpriority')) {
    img.setAttribute('fetchpriority', 'low');
  }
}

const HTML_SRCSET_WIDTHS = [640, 960, 1080] as const;

function optimizeImgElement(img: Element): void {
  const raw =
    img.getAttribute('src') ||
    img.getAttribute('data-src') ||
    img.getAttribute('data-lazy-src') ||
    '';

  img.removeAttribute('data-src');
  img.removeAttribute('data-srcset');
  img.removeAttribute('data-lazy-src');

  if (raw) {
    const resolved = resolveBlogImageSrc(raw);
    if (canUseNextImage(resolved)) {
      img.setAttribute('src', toOptimizedHtmlSrc(resolved, HTML_IMAGE_WIDTH));
      img.setAttribute(
        'srcset',
        HTML_SRCSET_WIDTHS.map((width) => `${toOptimizedHtmlSrc(resolved, width)} ${width}w`).join(
          ', '
        )
      );
      img.setAttribute('sizes', BLOG_IMAGE_SIZES.inline);
    } else {
      img.setAttribute('src', resolved);
      img.removeAttribute('srcset');
    }
  }

  applyImgPerfAttributes(img);
}

function optimizeArticleHtmlImagesRegex(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (_full, attrs: string) => {
    const srcMatch = attrs.match(/\b(?:src|data-src)\s*=\s*("([^"]*)"|'([^']*)')/i);
    const src = srcMatch?.[2] ?? srcMatch?.[3] ?? '';
    let nextAttrs = attrs
      .replace(/\s(?:srcset|sizes|data-src|data-srcset|data-lazy-src)\s*=\s*("[^"]*"|'[^']*')/gi, '')
      .replace(/\bsrc\s*=\s*("[^"]*"|'[^']*')/i, '');

    if (src) {
      const resolved = resolveBlogImageSrc(src);
      if (canUseNextImage(resolved)) {
        const srcset = HTML_SRCSET_WIDTHS.map(
          (width) => `${toOptimizedHtmlSrc(resolved, width)} ${width}w`
        ).join(', ');
        nextAttrs = ` src="${toOptimizedHtmlSrc(resolved, HTML_IMAGE_WIDTH)}" srcset="${srcset}" sizes="${BLOG_IMAGE_SIZES.inline}"${nextAttrs}`;
      } else {
        nextAttrs = ` src="${resolved}"${nextAttrs}`;
      }
    }
    if (!/\bloading\s*=/i.test(nextAttrs)) nextAttrs += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(nextAttrs)) nextAttrs += ' decoding="async"';
    if (!/\bfetchpriority\s*=/i.test(nextAttrs)) nextAttrs += ' fetchpriority="low"';
    if (!/\balt\s*=/i.test(nextAttrs)) nextAttrs += ' alt=""';

    return `<img${nextAttrs}>`;
  });
}

export function optimizeArticleImagesInDocument(root: ParentNode): void {
  root.querySelectorAll('img').forEach(optimizeImgElement);
}

/** Resize + lazy-load raster images inside CMS HTML bodies. */
export function optimizeArticleHtmlImages(html: string): string {
  if (!html) return html;

  if (typeof DOMParser === 'undefined') {
    return optimizeArticleHtmlImagesRegex(html);
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  optimizeArticleImagesInDocument(doc.body);
  return doc.body.innerHTML;
}
