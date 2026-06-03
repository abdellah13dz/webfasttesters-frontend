'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { en } from './locales/en';
import { es } from './locales/es';
import { tr } from './locales/tr';
import { ar } from './locales/ar';
import { apiFetch } from '@/lib/api';

export type Language = 'en' | 'es' | 'tr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
}

const allTranslations: Record<Language, Record<string, string>> = { en, es, tr, ar };

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

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('ft-lang') as Language | null;
  if (saved && ['en', 'es', 'tr', 'ar'].includes(saved)) {
    return saved;
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(
          (['en', 'es', 'tr', 'ar'] as Language[]).map(async (locale) => {
            const res = await apiFetch(`/api/translations?locale=${locale}`);
            if (!res.ok) return [locale, {}] as const;
            const data = await res.json();
            return [locale, data.overrides || {}] as const;
          })
        );
        setOverrides(Object.fromEntries(results));
      } catch {
        // Locale files remain the source of truth when API is unavailable
      }
    })();
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ft-lang', lang);
  }, []);

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
