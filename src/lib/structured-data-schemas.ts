import { BRAND_LOGO_PATH, BRAND_OG_IMAGE_PATH } from '@/lib/brand';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '@/lib/contact';
import { resolvePageSeo } from '@/lib/page-metadata';
import { SITE_URL, type PageSeo } from '@/lib/seo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fast Testers',
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO_PATH}`,
    image: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    description:
      'Fast Testers helps Android developers meet the Google Play 12-tester requirement in 48 hours with real testers and guaranteed production access.',
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: ['English', 'Spanish', 'Turkish', 'Arabic'],
      areaServed: 'Worldwide',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Fast Testers',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en', 'es', 'tr', 'ar'],
    description:
      'Professional Google Play app testing service — 12 real Android testers in 48 hours.',
  };
}

export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Fast Testers - Google Play App Testing Service',
    description:
      'Get 12+ real Android testers for your app. Meet Google Play 12-tester requirement in 48 hours with guaranteed production access.',
    brand: { '@type': 'Brand', name: 'Fast Testers' },
    image: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/pricing`,
      priceCurrency: 'USD',
      price: '15.00',
      availability: 'https://schema.org/InStock',
      description:
        'One-time $15 per app — 14-day testing with professional testers and production access support.',
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
    name: 'Google Play 12-Tester Compliance Testing',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    serviceType: 'Manual Android app beta testing',
    description:
      'Meet Google Play closed testing and production access requirements with vetted real human testers—manual testing on real devices, feedback reports, and a production access guarantee.',
    offers: {
      '@type': 'Offer',
      price: '15',
      priceCurrency: 'USD',
      url: `${SITE_URL}/pricing`,
    },
  };
}

const FAQ_ENTRIES = [
  {
    question: 'What is the Google Play 12 testers for 14 days policy?',
    answer:
      'Google Play requires at least 12 real users to test your app for 14 consecutive days before personal developer accounts (created after November 13, 2023) can request production access.',
  },
  {
    question: 'How does Fast Testers work?',
    answer:
      'Pay $15, submit your Google Play closed testing link, and we assign real human testers (manual testing on real devices—no bots). Complete the 14-day period, then apply for production access.',
  },
  {
    question: 'What if my app is rejected after testing?',
    answer:
      'Fast Testers offers a production access guarantee with a full refund if your app does not achieve production access after our testing period.',
  },
  {
    question: 'How fast do testers start?',
    answer:
      'Testers are typically assigned within 6 hours of payment and begin installing and testing your app immediately.',
  },
  {
    question: 'Can I test multiple Android apps?',
    answer:
      'Yes. Each app requires a separate $15 order. Volume discounts are available for teams testing five or more apps.',
  },
];

export function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export function getBreadcrumbSchema(path: string, seo?: PageSeo) {
  const resolved = seo ?? resolvePageSeo(path);
  const crumbs: { name: string; url: string }[] = [{ name: 'Home', url: SITE_URL }];

  if (path !== '/') {
    if (path.startsWith('/guides/')) {
      crumbs.push({ name: 'Guides', url: `${SITE_URL}/guides` });
    } else if (path.startsWith('/blog/')) {
      crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
    }
    const pageName = resolved.title.split(' - ')[0] || humanizePath(path);
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    image: options.image
      ? options.image.startsWith('http')
        ? options.image
        : `${SITE_URL}${options.image}`
      : `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    author: { '@type': 'Organization', name: 'Fast Testers', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Fast Testers',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}${BRAND_LOGO_PATH}` },
    },
    datePublished: options.datePublished || new Date().toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${options.path}` },
  };
}

export function getWebPageSchema(path: string, seo?: PageSeo) {
  const resolved = seo ?? resolvePageSeo(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name: resolved.title,
    description: resolved.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Thing', name: 'Google Play app testing' },
  };
}

function humanizePath(path: string): string {
  const segment = path.split('/').filter(Boolean).pop() || 'Page';
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getSchemasForPath(
  path: string,
  article?: {
    title: string;
    description: string;
    image?: string;
    datePublished?: string;
  }
): object[] {
  const seo = resolvePageSeo(path);
  const schemas: object[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getWebPageSchema(path, seo),
  ];

  if (path === '/' || path === '/pricing') {
    schemas.push(getProductSchema(), getServiceSchema());
  }

  if (path === '/faq') {
    schemas.push(getFaqSchema());
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
      })
    );
  } else if (seo.type === 'article' && path.startsWith('/blog/')) {
    schemas.push(
      getArticleSchema({
        path,
        title: seo.title.split(' - ')[0] || seo.title,
        description: seo.description,
        image: seo.ogImage,
      })
    );
  }

  return schemas;
}
