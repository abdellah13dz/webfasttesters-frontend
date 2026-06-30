'use client';

import { useEffect, useMemo } from 'react';
import { SITE_URL, pageSeoConfig } from '@/lib/seo';
import { CONTACT_EMAIL, SOCIAL_PROFILES } from '@/lib/contact';
import { BRAND_LOGO_PATH, BRAND_OG_IMAGE_PATH } from '@/lib/brand';

interface StructuredDataProps {
  currentPath: string;
}


function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fast Testers',
    url: SITE_URL,
    logo: `${SITE_URL}${BRAND_LOGO_PATH}`,
    description:
      'Fast Testers is a professional Google Play Closed Testing service. Get production access with 12 testers for 14 days — 15 quality testers for $15, assigned instantly.',
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: ['English', 'Spanish', 'Turkish', 'Arabic'],
      responseTime: 'PT2H',
    },
  };
}

// Product schema — for home and pricing pages
function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Fast Testers - Google Play Closed Testing Service',
    description:
      'Get Google Play production access with 12 testers for 14 days. Professional Google Play Closed Testing service: 15 quality testers for $15 with production access.',
    brand: {
      '@type': 'Brand',
      name: 'Fast Testers',
    },
    image: `${SITE_URL}${BRAND_OG_IMAGE_PATH}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/pricing`,
      priceCurrency: 'USD',
      price: '15.00',
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split('T')[0],
      availability: 'https://schema.org/InStock',
      description:
        'One-time payment of $15 per app. Google Play Closed Testing service with 15 quality testers and a 14-day testing period.',
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

// FAQPage schema — for the FAQ page
function getFaqSchema() {
  const faqEntries = [
    {
      question: 'What is 12 testers for 14 days policy by Google Play?',
      answer:
        "Google Play's policy requires at least 12 real users testing your app for 14 consecutive days before you can publish to production. This policy applies to personal accounts created after November 13, 2023. The testers must be real people who actively engage with your app — not bots or fake accounts.",
    },
    {
      question: 'How does Fast Testers work?',
      answer:
        'The process is simple: Pay $15, submit your Google Play closed testing link, and 15 quality testers are assigned instantly. They test your app for 14 days, then you can apply for production access.',
    },
    {
      question: "What's the difference between free and paid testing?",
      answer:
        'Free testing means finding testers on your own through forums and social media, which takes longer with no guarantee. Our Google Play Closed Testing service ($15) provides 15 quality testers assigned instantly with a production access guarantee.',
    },
    {
      question: 'What if my app gets rejected?',
      answer:
        'We offer a production access guarantee. If Google rejects your app after our testing period, we will refund your payment in full. We stand behind our service with a 99.9% success rate.',
    },
    {
      question: 'How quickly do testers start testing?',
      answer:
        'Testers are assigned instantly after you submit your app for Google Play Closed Testing. They start installing and testing your app right away.',
    },
    {
      question: 'Can I test multiple apps?',
      answer:
        'Yes, you can submit multiple apps for testing. Each app requires a separate payment of $15. We also offer volume discounts for developers who need to test 5 or more apps.',
    },
    {
      question: 'What languages do testers support?',
      answer:
        'We support 30+ languages including English, Spanish, German, Vietnamese, Portuguese, French, Japanese, Korean, Chinese, Hindi, Arabic, and many more.',
    },
    {
      question: 'Is my app data secure?',
      answer:
        'Yes, absolutely. We use encrypted connections (SSL/TLS) for all data transfers. We never share your app data with third parties.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

// BreadcrumbList schema — based on current path
function getBreadcrumbSchema(path: string) {
  const crumbs: { name: string; url: string }[] = [
    { name: 'Home', url: SITE_URL },
  ];

  if (path === '/') {
    // Only home — just one crumb
  } else if (path.startsWith('/guides/')) {
    crumbs.push({ name: 'Guides', url: `${SITE_URL}/guides` });
    const guideName =
      pageSeoConfig[path]?.title?.split(' - ')[0] || 'Guide';
    crumbs.push({ name: guideName, url: `${SITE_URL}${path}` });
  } else if (path.startsWith('/blog/')) {
    crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
    const articleName =
      pageSeoConfig[path]?.title?.split(' - ')[0] || 'Article';
    crumbs.push({ name: articleName, url: `${SITE_URL}${path}` });
  } else {
    const pageName =
      pageSeoConfig[path]?.title?.split(' - ')[0] || 'Page';
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

export function StructuredData({ currentPath }: StructuredDataProps) {
  const schemas = useMemo(() => {
    const result: object[] = [];

    // Always include Organization schema
    result.push(getOrganizationSchema());

    // Product schema for home and pricing
    if (currentPath === '/' || currentPath === '/pricing') {
      result.push(getProductSchema());
    }

    // FAQ schema for FAQ page
    if (currentPath === '/faq') {
      result.push(getFaqSchema());
    }

    // Breadcrumb schema for all non-home pages
    if (currentPath !== '/') {
      result.push(getBreadcrumbSchema(currentPath));
    }

    return result;
  }, [currentPath]);

  useEffect(() => {
    const attr = 'data-ft-structured-data';

    const removeExisting = () => {
      document.head.querySelectorAll(`script[${attr}]`).forEach((el) => {
        if (el.isConnected) {
          el.remove();
        }
      });
    };

    removeExisting();

    schemas.forEach((schema) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute(attr, '');
      el.text = JSON.stringify(schema);
      document.head.appendChild(el);
    });

    return removeExisting;
  }, [schemas]);

  return null;
}
