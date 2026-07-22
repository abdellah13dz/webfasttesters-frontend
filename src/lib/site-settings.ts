import { apiFetch } from './api';
import type { PageSeo } from './seo';

export interface AnnouncementBannerSetting {
  enabled: boolean;
  message: string;
  ctaText: string;
  ctaLink: string;
}

export interface HeroStatsSetting {
  heroCount: number;
  successRate: number;
  appsCount: number;
  countriesCount: number;
}

export interface DefaultSeoSetting {
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface NavLink {
  labelKey?: string;
  label?: string;
  path: string;
  icon?: string;
}

export interface NavSection {
  titleKey?: string;
  title?: string;
  links: NavLink[];
}

export interface SiteNavigation {
  headerMain: NavLink[];
  headerResources: NavLink[];
  headerSupport: NavLink[];
  footerSections: NavSection[];
  footerLegal: NavLink[];
}

export interface SiteSettings {
  announcementBanner: AnnouncementBannerSetting;
  heroStats: HeroStatsSetting;
  defaultSeo: DefaultSeoSetting;
  pageSeoOverrides: Record<string, Partial<PageSeo>>;
  navigation?: SiteNavigation;
}

export const DEFAULT_ANNOUNCEMENT_BANNER: AnnouncementBannerSetting = {
  enabled: true,
  message: '🚀 Limited time: Get 14 professional testers for just $15/app — 99.9% success rate!',
  ctaText: 'Get Started →',
  ctaLink: 'https://app.fasttesters.com/',
};

export const DEFAULT_HERO_STATS: HeroStatsSetting = {
  heroCount: 2900,
  successRate: 99,
  appsCount: 1500,
  countriesCount: 120,
};

let cachedSettings: SiteSettings | null = null;
let cacheTime = 0;
const CACHE_MS = 15 * 60 * 1000;
const SITE_SETTINGS_SESSION_KEY = 'ft_site_settings_v1';

function readSessionSiteSettings(): SiteSettings | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SITE_SETTINGS_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: SiteSettings };
    if (Date.now() - parsed.at > CACHE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeSessionSiteSettings(data: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SITE_SETTINGS_SESSION_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // ignore
  }
}

export async function fetchSiteSettings(force = false): Promise<SiteSettings | null> {
  if (!force && cachedSettings && Date.now() - cacheTime < CACHE_MS) {
    return cachedSettings;
  }

  if (!force && typeof window !== 'undefined') {
    const sessionCached = readSessionSiteSettings();
    if (sessionCached) {
      cachedSettings = sessionCached;
      cacheTime = Date.now();
      return sessionCached;
    }
  }

  try {
    const res = await apiFetch('/api/site-settings');
    if (!res.ok) return null;
    const data = await res.json();
    cachedSettings = data;
    cacheTime = Date.now();
    writeSessionSiteSettings(data);
    return data;
  } catch {
    return null;
  }
}

export function invalidateSiteSettingsCache() {
  cachedSettings = null;
  cacheTime = 0;
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(SITE_SETTINGS_SESSION_KEY);
    } catch {
      // ignore
    }
  }
}

export function pageSeoFromCmsPage(page: {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogImage?: string | null;
}): Partial<PageSeo> {
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || undefined,
    keywords: page.seoKeywords || undefined,
    ogImage: page.ogImage || undefined,
    type: 'website',
  };
}
