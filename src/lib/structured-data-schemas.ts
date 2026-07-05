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
      'Fast Testers is a professional Google Play Closed Testing service. Get production access with 12 testers for 14 days — 15 quality testers for $15, assigned instantly.',
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
      'Google Play Closed Testing service — 15 quality testers for $15, assigned instantly after app submission.',
  };
}

export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Fast Testers - Google Play Closed Testing Service',
    description:
      'Get Google Play production access with 12 testers for 14 days. Professional Google Play Closed Testing service: 15 quality testers for $15 with production access.',
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
    name: 'Google Play Closed Testing Service',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    serviceType: 'Google Play Closed Testing',
    description:
      'Professional Google Play Closed Testing service. Get production access with 12 testers for 14 days — 15 quality testers for $15, assigned instantly after submission.',
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
    question: 'Will Google accept this?',
    answer:
      'Yes. Fast Testers provides real Android users who install your app through Google Play closed testing — exactly what Google requires for the 14-day, 12-tester production access rule.',
  },
  {
    question: 'Are testers real?',
    answer:
      'Yes. Every tester is a real person with a genuine Android device and Google account. They install your app from the Play Store closed testing track.',
  },
  {
    question: 'Do testers install my app?',
    answer:
      'Yes. Testers join your closed testing track and install your app from Google Play — the same flow Google monitors when reviewing your production access request.',
  },
  {
    question: 'Can I publish immediately?',
    answer:
      'You must complete 14 consecutive days of closed testing with at least 12 testers before requesting production access. Fast Testers assigns testers in about one hour.',
  },
  {
    question: 'Do I need to invite testers?',
    answer:
      'No manual recruiting. Submit your closed testing link after payment and professional testers are assigned automatically.',
  },
  {
    question: 'What if production is rejected?',
    answer:
      'Fast Testers includes a production access guarantee with a full refund if your app does not achieve production access after our testing period.',
  },
  {
    question: 'What is the Google Play 12 testers for 14 days policy?',
    answer:
      'Google Play requires at least 12 real users to test your app for 14 consecutive days before personal developer accounts (created after November 13, 2023) can request production access.',
  },
  {
    question: 'How does Fast Testers work?',
    answer:
      'Pay $15, submit your Google Play closed testing link, and testers are assigned instantly. Complete the 14-day closed testing period, then apply for production access.',
  },
  {
    question: 'How fast do testers start?',
    answer:
      'Testers are assigned instantly after you submit your app for closed testing. They begin installing and testing your app immediately.',
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
  dateModified?: string;
  section?: string;
  keywords?: string;
}) {
  const imageUrl = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${SITE_URL}${options.image}`
    : `${SITE_URL}${BRAND_OG_IMAGE_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: options.description,
    image: imageUrl,
    author: { '@type': 'Organization', name: 'Fast Testers', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Fast Testers',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}${BRAND_LOGO_PATH}` },
    },
    datePublished: options.datePublished || new Date().toISOString(),
    dateModified: options.dateModified || options.datePublished || new Date().toISOString(),
    ...(options.section ? { articleSection: options.section } : {}),
    ...(options.keywords ? { keywords: options.keywords } : {}),
    inLanguage: 'en',
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${options.path}` },
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
    dateModified?: string;
    section?: string;
    keywords?: string;
  },
  blogArticles?: BlogListArticle[]
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
  } else if (seo.type === 'article' && path.startsWith('/blog/')) {
    schemas.push(
      getArticleSchema({
        path,
        title: seo.title.split(' - ')[0] || seo.title,
        description: seo.description,
        image: seo.ogImage,
        datePublished: seo.publishedTime,
        dateModified: seo.modifiedTime,
        section: seo.section,
        keywords: seo.keywords,
      })
    );
  }

  return schemas;
}
