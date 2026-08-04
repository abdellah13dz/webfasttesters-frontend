'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { pageSeoConfig, defaultSeo, SITE_URL, SITE_NAME, type PageSeo } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/page-metadata';
import { fetchSiteSettings } from '@/lib/site-settings';
import { localizePageSeo, ogLocaleForLanguage } from '@/lib/seo-i18n';
import type { Language } from '@/lib/i18n/context';

function getOrCreateMeta(attr: string, attrValue: string): HTMLMetaElement {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  return el as HTMLMetaElement;
}

function getOrCreateLink(rel: string, id: string): HTMLLinkElement {
  let el = document.getElementById(id) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.id = id;
    document.head.appendChild(el);
  }
  return el;
}

function updateMetaContent(attr: string, attrValue: string, content: string) {
  getOrCreateMeta(attr, attrValue).setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  updateMetaContent('property', property, content);
}

function updateMetaName(name: string, content: string) {
  updateMetaContent('name', name, content);
}

function setCanonicalUrl(url: string) {
  const existing = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
  );
  if (existing.length === 0) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    el.id = 'seo-canonical';
    el.setAttribute('href', url);
    document.head.appendChild(el);
    return;
  }
  existing[0].setAttribute('href', url);
  // Google treats multiple canonicals as a conflict — keep only one.
  for (let i = 1; i < existing.length; i++) {
    existing[i].remove();
  }
}

function setNoIndex(noindex: boolean) {
  const el = getOrCreateMeta('name', 'robots');
  el.setAttribute(
    'content',
    noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
}

/** Apply SEO tags in the browser (client navigations & CMS overrides). */
export function applyClientSeo(
  seo: PageSeo,
  path: string,
  language: Language,
  siteUrl: string = SITE_URL
) {
  const fullUrl = `${siteUrl}${path}`;
  const ogImageUrl = seo.ogImage.startsWith('http')
    ? seo.ogImage
    : `${siteUrl}${seo.ogImage.startsWith('/') ? seo.ogImage : `/${seo.ogImage}`}`;

  document.title = seo.title;
  updateMetaName('description', seo.description);
  updateMetaName('keywords', seo.keywords);
  updateMetaName('author', SITE_NAME);
  updateMetaProperty('og:title', seo.title);
  updateMetaProperty('og:description', seo.description);
  updateMetaProperty('og:image', ogImageUrl);
  updateMetaProperty('og:image:alt', seo.title);
  updateMetaProperty('og:url', fullUrl);
  updateMetaProperty('og:type', seo.type);
  updateMetaProperty('og:site_name', SITE_NAME);
  updateMetaProperty('og:locale', ogLocaleForLanguage(language));
  updateMetaName('twitter:card', 'summary_large_image');
  updateMetaName('twitter:title', seo.title);
  updateMetaName('twitter:description', seo.description);
  updateMetaName('twitter:image', ogImageUrl);
  updateMetaName('twitter:site', '@fasttesters');
  updateMetaName('twitter:creator', '@fasttesters');
  setCanonicalUrl(fullUrl);
  setNoIndex(!!seo.noindex);

  document.documentElement.lang = language;
}

function mergeSeo(base: PageSeo, override?: Partial<PageSeo>): PageSeo {
  if (!override) return base;
  return {
    ...base,
    ...Object.fromEntries(Object.entries(override).filter(([, v]) => v !== undefined && v !== '')),
  } as PageSeo;
}

export function useSeo(): PageSeo | null {
  const { currentPath } = useRouter();
  const { language } = useLanguage();
  const [dynamicSeo, setDynamicSeo] = useState<{
    siteUrl: string;
    overrides: Record<string, Partial<PageSeo>>;
    defaults: Partial<PageSeo>;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const settings = await fetchSiteSettings();
      if (!settings) return;
      setDynamicSeo({
        siteUrl: settings.defaultSeo.siteUrl,
        overrides: settings.pageSeoOverrides || {},
        defaults: {
          title: settings.defaultSeo.title,
          description: settings.defaultSeo.description,
          keywords: settings.defaultSeo.keywords,
          ogImage: settings.defaultSeo.ogImage,
          type: 'website',
        },
      });
    })();
  }, []);

  const isDynamicBlog =
    currentPath.startsWith('/blog/') &&
    currentPath !== '/blog' &&
    !pageSeoConfig[currentPath];

  const baseSeo = mergeSeo(defaultSeo, dynamicSeo?.defaults);
  const pathSeo = pageSeoConfig[currentPath]
    ? mergeSeo(baseSeo, pageSeoConfig[currentPath])
    : isDynamicBlog
      ? baseSeo
      : resolvePageSeo(currentPath);
  const seo = localizePageSeo(
    currentPath,
    mergeSeo(pathSeo, dynamicSeo?.overrides[currentPath]),
    language
  );

  useEffect(() => {
    if (isDynamicBlog) return;
    applyClientSeo(seo, currentPath, language, dynamicSeo?.siteUrl || SITE_URL);
  }, [seo, currentPath, language, dynamicSeo, isDynamicBlog]);

  return isDynamicBlog ? null : seo;
}
