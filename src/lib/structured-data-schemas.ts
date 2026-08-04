import { BRAND_LOGO_PATH, BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { LEGAL_ENTITY_NAME, BUSINESS_ADDRESS } from '@/lib/business';
import { CONTACT_EMAIL, SOCIAL_PROFILES, WHATSAPP_PHONE_E164 } from '@/lib/contact';
import {
  getFullFaqSchemaEntries,
  getHomeFaqSchemaEntries,
} from '@/lib/faq-schema-entries';
import { resolvePageSeo } from '@/lib/page-metadata';
import { SITE_URL, type PageSeo } from '@/lib/seo';
import {
  FAST_TESTERS_TUTORIAL_THUMB,
  FAST_TESTERS_TUTORIAL_URL,
  FAST_TESTERS_TUTORIAL_VIDEO_ID,
} from '@/lib/tutorial-video';

function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fast Testers',
    alternateName: ['FastTesters', 'fasttesters.com'],
    legalName: LEGAL_ENTITY_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    description:
      'Fast Testers is a professional Google Play Closed Testing service operated by Hassil LLC. Android developers use Fast Testers to assign 15 real testers (meeting Google’s minimum of 12) for 14 consecutive days of closed testing before requesting production access — one-time $15 per app.',
    slogan: 'Google Play Closed Testing — 15 testers for $15',
    foundingDate: '2023',
    brand: {
      '@type': 'Brand',
      name: 'Fast Testers',
      url: SITE_URL,
      logo: `${SITE_URL}${BRAND_LOGO_PATH}`,
    },
    knowsAbout: [
      'Google Play Closed Testing',
      'Google Play production access',
      'Google Play Console',
      'Android app testing',
      'Closed testing tracks',
      'Internal testing',
      'Open testing',
      'Beta testing',
      'Android QA',
      'App publishing',
      'Google Play policy compliance',
      '12 testers for 14 days requirement',
    ],
    sameAs: [...SOCIAL_PROFILES],
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [BUSINESS_ADDRESS.line1, BUSINESS_ADDRESS.line2]
        .filter(Boolean)
        .join(', '),
      addressLocality: BUSINESS_ADDRESS.city,
      addressRegion: BUSINESS_ADDRESS.state,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        telephone: WHATSAPP_PHONE_E164,
        availableLanguage: ['English', 'Spanish', 'Turkish', 'Arabic'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Fast Testers',
    alternateName: ['FastTesters', 'fasttesters.com'],
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en', 'es', 'tr', 'ar'],
    description:
      'Google Play Closed Testing knowledge hub and service — 15 quality testers for $15, assigned after app submission, helping Android developers meet the 12-tester, 14-day production access requirement.',
    about: [
      { '@type': 'Thing', name: 'Google Play Closed Testing' },
      { '@type': 'Thing', name: 'Android app publishing' },
      { '@type': 'Thing', name: 'Production access' },
    ],
  };
}

export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/#product`,
    name: 'Fast Testers - Google Play Closed Testing Service',
    description:
      'Get Google Play production access with 12 testers for 14 days. Professional Google Play Closed Testing service: 15 quality testers for $15 with production access.',
    brand: { '@type': 'Brand', name: 'Fast Testers' },
    image: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    sku: 'FT-CLOSED-TESTING-15',
    category: 'Software Testing Service',
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/pricing`,
      priceCurrency: 'USD',
      price: '15.00',
      priceValidUntil: priceValidUntil(),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      description:
        'One-time $15 per app — 14-day testing with professional testers and production access support.',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1500',
      reviewCount: '850',
    },
  };
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: 'Google Play Closed Testing Service',
    alternateName: 'Fast Testers Closed Testing',
    provider: { '@id': `${SITE_URL}/#organization` },
    brand: { '@type': 'Brand', name: 'Fast Testers' },
    areaServed: 'Worldwide',
    serviceType: 'Google Play Closed Testing',
    category: 'Software Testing Service',
    audience: {
      '@type': 'Audience',
      audienceType: 'Android developers seeking Google Play production access',
    },
    description:
      'Professional Google Play Closed Testing service by Fast Testers. Assigns 15 real Android testers (covers Google’s minimum of 12) for 14 consecutive days of closed testing so developers can request production access — $15 one-time per app.',
    termsOfService: `${SITE_URL}/terms-and-conditions`,
    offers: {
      '@type': 'Offer',
      price: '15',
      priceCurrency: 'USD',
      priceValidUntil: priceValidUntil(),
      url: `${SITE_URL}/pricing`,
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getFaqSchema(entries: { question: string; answer: string }[] = getFullFaqSchemaEntries()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export function getHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Complete Google Play Closed Testing with Fast Testers',
    description:
      'Four steps to meet Google Play’s 12-tester, 14-day closed testing requirement and request production access.',
    totalTime: 'P14D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '15',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Pay $15',
        text: 'Complete your secure payment via Stripe. One-time fee, no subscriptions, no hidden costs.',
        url: `${SITE_URL}/pricing`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Submit Your App',
        text: "Share your app's testing link from Google Play Console. We handle the rest — no technical setup needed.",
        url: `${SITE_URL}/submit-app`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Testers Start Instantly',
        text: '15 quality testers are assigned instantly after submission. They install, test, and engage with your app daily.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Production Access',
        text: 'After the required closed testing period, apply for production access. Fast Testers has a 99.9% success rate with a production access guarantee.',
      },
    ],
  };
}

export function getVideoObjectSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Fast Testers — Google Play Closed Testing Tutorial',
    description:
      'Watch how Fast Testers helps Android developers meet the Google Play 12-tester, 14-day closed testing requirement.',
    thumbnailUrl: [FAST_TESTERS_TUTORIAL_THUMB],
    uploadDate: '2024-01-01T00:00:00Z',
    contentUrl: FAST_TESTERS_TUTORIAL_URL,
    embedUrl: `https://www.youtube-nocookie.com/embed/${FAST_TESTERS_TUTORIAL_VIDEO_ID}`,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function getBreadcrumbSchema(path: string, seo?: PageSeo) {
  const resolved = seo ?? resolvePageSeo(path);
  const crumbs: { name: string; url: string }[] = [{ name: 'Home', url: SITE_URL }];

  if (path !== '/') {
    if (path.startsWith('/guides/')) {
      crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
    } else if (path.startsWith('/blog/')) {
      crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
    } else if (path.startsWith('/resources/')) {
      crumbs.push({ name: 'Resources', url: `${SITE_URL}/resources/google-play-checklist` });
    }
    const pageName =
      resolved.title.split(' - ')[0]?.split(' | ')[0]?.trim() || humanizePath(path);
    crumbs.push({ name: pageName, url: `${SITE_URL}${path}` });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function getArticleSchema(options: {
  path: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  keywords?: string;
  schemaType?: 'BlogPosting' | 'Article';
}) {
  const imageUrl = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${SITE_URL}${options.image}`
    : `${SITE_URL}${BRAND_OG_IMAGE_PATH}`;

  const pageUrl = `${SITE_URL}${options.path}`;
  const schemaType = options.schemaType || 'BlogPosting';

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${pageUrl}#article`,
    headline: options.title,
    description: options.description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fast Testers',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fast Testers',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${BRAND_LOGO_PATH}`,
      },
    },
    datePublished: options.datePublished || new Date().toISOString(),
    dateModified: options.dateModified || options.datePublished || new Date().toISOString(),
    ...(options.section ? { articleSection: options.section } : {}),
    ...(options.keywords ? { keywords: options.keywords } : {}),
    inLanguage: 'en',
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p'],
    },
  };
}

export function getBlogCollectionSchema() {
  const seo = resolvePageSeo('/blog');
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Fast Testers Blog',
    description: seo.description,
    url: `${SITE_URL}/blog`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Google Play app testing and Android publishing',
    },
  };
}

export interface BlogListArticle {
  title: string;
  slug: string;
  description: string;
  datePublished?: string;
}

export function getBlogItemListSchema(articles: BlogListArticle[]) {
  const seo = resolvePageSeo('/blog');

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/blog#itemlist`,
    name: 'Fast Testers Blog — Google Play Testing Guides',
    description: seo.description,
    numberOfItems: articles.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: article.title,
      url: `${SITE_URL}/blog/${article.slug}`,
      item: {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        url: `${SITE_URL}/blog/${article.slug}`,
        ...(article.datePublished ? { datePublished: article.datePublished } : {}),
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  };
}

export function getWebPageSchema(path: string, seo?: PageSeo, pageType?: string) {
  const resolved = seo ?? resolvePageSeo(path);
  // FAQPage is emitted separately via getFaqSchema — keep WebPage here to avoid duplicate types.
  const type =
    pageType ||
    (path === '/contact-us'
      ? 'ContactPage'
      : path === '/about-us'
        ? 'AboutPage'
        : path === '/blog'
          ? 'CollectionPage'
          : 'WebPage');

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${SITE_URL}${path === '/' ? '' : path}#webpage`,
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    name: resolved.title,
    description: resolved.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'Google Play Closed Testing',
      description:
        'Google Play closed testing is the track Android developers use to meet tester and duration requirements before requesting production access.',
    },
    mentions: [
      { '@type': 'Thing', name: 'Google Play Console' },
      { '@type': 'Thing', name: 'Production access' },
      { '@type': 'Organization', name: 'Fast Testers' },
    ],
    inLanguage: 'en',
    isAccessibleForFree: true,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

function humanizePath(path: string): string {
  const segment = path.split('/').filter(Boolean).pop() || 'Page';
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const VIDEO_PATHS = new Set(['/', '/how-it-works', '/submit-app', '/sample-app']);
const PRODUCT_PATHS = new Set([
  '/',
  '/pricing',
  '/submit-app',
  '/android-app-testers',
  '/google-play-testing-service',
]);

export function getSchemasForPath(
  path: string,
  article?: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    section?: string;
    keywords?: string;
  },
  blogArticles?: BlogListArticle[],
  faqEntries?: { question: string; answer: string }[]
): object[] {
  const seo = resolvePageSeo(path);
  const schemas: object[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getWebPageSchema(path, seo),
  ];

  if (PRODUCT_PATHS.has(path)) {
    schemas.push(getProductSchema(), getServiceSchema());
  }

  if (path === '/faq') {
    schemas.push(getFaqSchema(getFullFaqSchemaEntries()));
  } else if (path === '/') {
    schemas.push(getFaqSchema(getHomeFaqSchemaEntries()));
  } else if (faqEntries?.length) {
    schemas.push(getFaqSchema(faqEntries));
  }

  if (path === '/how-it-works') {
    schemas.push(getHowToSchema());
  }

  if (VIDEO_PATHS.has(path)) {
    schemas.push(getVideoObjectSchema());
  }

  if (path === '/blog') {
    schemas.push(getBlogCollectionSchema());
    if (blogArticles?.length) {
      schemas.push(getBlogItemListSchema(blogArticles));
    }
  }

  if (path !== '/') {
    schemas.push(getBreadcrumbSchema(path, seo));
  }

  if (article) {
    schemas.push(
      getArticleSchema({
        path,
        title: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        section: article.section,
        keywords: article.keywords,
      })
    );
  } else if (seo.type === 'article' && (path.startsWith('/blog/') || path.startsWith('/guides/'))) {
    schemas.push(
      getArticleSchema({
        path,
        title: seo.title.split(' - ')[0]?.split(' | ')[0]?.trim() || seo.title,
        description: seo.description,
        image: seo.ogImage,
        datePublished: seo.publishedTime,
        dateModified: seo.modifiedTime,
        section: seo.section,
        keywords: seo.keywords,
        schemaType: path.startsWith('/blog/') ? 'BlogPosting' : 'Article',
      })
    );
  } else if (seo.type === 'article' && !path.startsWith('/blog/')) {
    // SEO landing / guide pages marked as articles
    schemas.push(
      getArticleSchema({
        path,
        title: seo.title.split(' - ')[0]?.split(' | ')[0]?.trim() || seo.title,
        description: seo.description,
        image: seo.ogImage,
        datePublished: seo.publishedTime,
        dateModified: seo.modifiedTime,
        section: seo.section || 'Google Play Testing',
        keywords: seo.keywords,
        schemaType: 'Article',
      })
    );
  }

  return schemas;
}
