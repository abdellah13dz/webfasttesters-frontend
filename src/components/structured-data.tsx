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
      'Fast Testers is a Google Play Closed Testing service. Google requires 12 testers for 14 consecutive days; Fast Testers provides 15 testers for 16 days for $15. Google decides production access.',
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: ['English', 'Spanish', 'Turkish', 'Arabic'],
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
      'Google Play Closed Testing service: 15 testers for 16 days for $15, covering Google’s 12 testers / 14 consecutive days. Google decides production access.',
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
        'One-time payment of $15 per app. 15 testers for 16 days, covering Google’s 14 consecutive days. Google decides production access.',
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
        'The process is simple: Pay $15, submit your Google Play closed testing link, and 15 quality testers are assigned instantly. They test your app for 16 days (covering Google’s 14 consecutive days), then you can apply for production access. Google decides approval.',
    },
    {
      question: "What's the difference between free and paid testing?",
      answer:
        'Free testing means finding testers on your own through forums and social media, which takes longer with no guarantee. Our Google Play Closed Testing service ($15) provides 15 quality testers assigned instantly. Google decides production access; refund terms are on the refund policy page.',
    },
    {
      question: 'What if my app gets rejected?',
      answer:
        'If you do not reach production after our 16-day managed testing period as defined in our refund policy, you can request a refund. Google alone decides approval. We do not quote an unverified success rate.',
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
