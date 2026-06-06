import type { Language } from '@/lib/i18n/context';
import { seoTranslations } from '@/lib/i18n/seo-translations';
import type { PageSeo } from '@/lib/seo';

/** Maps route paths to translation key prefixes (seo.{prefix}Title / seo.{prefix}Description). */
export const PAGE_SEO_I18N_KEYS: Record<string, string> = {
  '/': 'home',
  '/how-it-works': 'howItWorks',
  '/pricing': 'pricing',
  '/faq': 'faq',
  '/about-us': 'aboutUs',
  '/reviews': 'reviews',
  '/support': 'support',
  '/contact-us': 'contactUs',
  '/feedback': 'feedback',
  '/terms-and-conditions': 'termsAndConditions',
  '/privacy-policy': 'privacyPolicy',
  '/refund-policy': 'refundPolicy',
  '/app-testing-referral-program': 'referralProgram',
  '/referral-policy': 'referralPolicy',
  '/blog': 'blog',
  '/guides/publish-app-google-play': 'publishAppGooglePlay',
  '/guides/enterprise-onboarding': 'enterpriseOnboarding',
  '/blog/google-play-12-testers-policy': 'blog12TestersPolicy',
  '/android-app-testers': 'androidAppTesters',
  '/how-to-find-beta-testers-for-android-apps': 'betaTestersGuide',
  '/google-play-production-access-12-testers': 'productionAccess12Testers',
  '/google-play-closed-testing': 'closedTesting',
  '/app-rejected-google-play': 'appRejected',
  '/multi-language-app-testing': 'multiLanguageTesting',
  '/google-play-setup-guide': 'setupGuide',
  '/sample-app': 'sampleApp',
  '/submit-app': 'submitApp',
  '/partners': 'partners',
  '/status': 'status',
  '/changelog': 'changelog',
  '/compare': 'compare',
  '/case-studies': 'caseStudies',
  '/cookie-policy': 'cookiePolicy',
  '/login': 'login',
  '/signup': 'signup',
  '/forgot-password': 'forgotPassword',
};

function getSeoString(lang: Language, key: string): string | undefined {
  const value = seoTranslations[lang]?.[key];
  if (value) return value;
  return seoTranslations.en[key];
}

export function localizePageSeo(
  path: string,
  seo: PageSeo,
  language: Language
): PageSeo {
  const prefix = PAGE_SEO_I18N_KEYS[path] ?? 'default';
  const title = getSeoString(language, `seo.${prefix}Title`);
  const description = getSeoString(language, `seo.${prefix}Description`);

  return {
    ...seo,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}

export function ogLocaleForLanguage(language: Language): string {
  switch (language) {
    case 'ar':
      return 'ar_SA';
    case 'es':
      return 'es_ES';
    case 'tr':
      return 'tr_TR';
    default:
      return 'en_US';
  }
}
