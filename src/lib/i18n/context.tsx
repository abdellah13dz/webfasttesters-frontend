'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { en } from './locales/en';
import { es } from './locales/es';
import { tr } from './locales/tr';
import { ar } from './locales/ar';
import { contentPagesEn, contentPagesEs, contentPagesTr, contentPagesAr } from './locales/content-pages';
import {
  closedTestingGuideEn,
  closedTestingGuideEs,
  closedTestingGuideTr,
  closedTestingGuideAr,
} from './locales/closed-testing-guide';
import { legalPagesEn, legalPagesEs, legalPagesTr, legalPagesAr } from './locales/legal-pages';
import { seoTranslations } from './seo-translations';
import { apiFetch } from '@/lib/api';

export type Language = 'en' | 'es' | 'tr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
}

const allTranslations: Record<Language, Record<string, string>> = {
  en: { ...en, ...contentPagesEn, ...legalPagesEn, ...closedTestingGuideEn, ...seoTranslations.en },
  es: { ...es, ...contentPagesEs, ...legalPagesEs, ...closedTestingGuideEs, ...seoTranslations.es },
  tr: { ...tr, ...contentPagesTr, ...legalPagesTr, ...closedTestingGuideTr, ...seoTranslations.tr },
  ar: { ...ar, ...contentPagesAr, ...legalPagesAr, ...closedTestingGuideAr, ...seoTranslations.ar },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isRtl: false,
  dir: 'ltr',
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function getTranslation(
  lang: Language,
  key: string,
  overrides: Record<string, Record<string, string>>
): string {
  if (overrides[lang]?.[key]) {
    return overrides[lang][key];
  }
  if (allTranslations[lang]?.[key]) {
    return allTranslations[lang][key];
  }
  if (allTranslations.en?.[key]) {
    return allTranslations.en[key];
  }
  return key;
}

const TRANSLATIONS_CACHE_KEY = 'ft_tr_overrides_v1';
const TRANSLATIONS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

async function loadLocaleOverrides(locale: Language): Promise<Record<string, string>> {
  try {
    const res = await apiFetch(`/api/translations?locale=${locale}`);
    if (!res.ok) return {};
    const data = await res.json();
    return data.overrides || {};
  } catch {
    return {};
  }
}

function readTranslationsCache(): Record<string, Record<string, string>> | null {
  try {
    const raw = sessionStorage.getItem(TRANSLATIONS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: Record<string, Record<string, string>> };
    if (Date.now() - parsed.at > TRANSLATIONS_CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeTranslationsCache(data: Record<string, Record<string, string>>): void {
  try {
    sessionStorage.setItem(
      TRANSLATIONS_CACHE_KEY,
      JSON.stringify({ at: Date.now(), data })
    );
  } catch {
    // ignore quota errors
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    const saved = localStorage.getItem('ft-lang') as Language | null;
    if (saved && ['en', 'es', 'tr', 'ar'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const cached = readTranslationsCache();
    if (cached) {
      setOverrides(cached);
    }

    (async () => {
      try {
        if (cached?.[language]) {
          return;
        }
        const localeOverrides = await loadLocaleOverrides(language);
        setOverrides((prev) => {
          const next = { ...prev, [language]: localeOverrides };
          writeTranslationsCache(next);
          return next;
        });
      } catch {
        // Locale files remain the source of truth when API is unavailable
      }
    })();
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ft-lang', lang);
    if (overrides[lang]) return;
    void loadLocaleOverrides(lang)
      .then((localeOverrides) => {
        setOverrides((prev) => {
          const next = { ...prev, [lang]: localeOverrides };
          writeTranslationsCache(next);
          return next;
        });
      })
      .catch(() => {
        // Locale files remain the source of truth when API is unavailable
      });
  }, [overrides]);

  const t = useCallback((key: string): string => {
    return getTranslation(language, key, overrides);
  }, [language, overrides]);

  const isRtl = language === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}
