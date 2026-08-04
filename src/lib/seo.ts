import { SITE_URL, SITE_NAME } from './site-url';
import { BRAND_OG_IMAGE_PATH } from './brand';
import { DEFAULT_KEYWORDS_META, mergeKeywords } from './seo-keywords';

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  type: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export { SITE_URL, SITE_NAME };
export { SITE_KEYWORDS, DEFAULT_KEYWORDS_META, mergeKeywords } from './seo-keywords';

/** Canonical site-wide SEO title and description (Google Play Closed Testing service). */
export const SEO_DEFAULT_TITLE =
  'Fast Testers | Google Play Closed Testing Service — 12 Testers for 14 Days';

export const SEO_DEFAULT_DESCRIPTION =
  'Get Google Play production access with 12 testers for 14 days! Professional Google Play Closed Testing service: 15 quality testers for $15 with production access. Trusted by 1,500+ developers.';

export const defaultSeo: PageSeo = {
  title: SEO_DEFAULT_TITLE,
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS_META,
  ogImage: BRAND_OG_IMAGE_PATH,
  type: 'website',
};

export const pageSeoConfig: Record<string, PageSeo> = {
  '/': {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    keywords: mergeKeywords(
      'Google Play Closed Testing service',
      '12 testers for 14 days',
      '15 quality testers for $15',
      'google play production access'
    ),
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/how-it-works': {
    title: 'How Fast Testers Works | Google Play Closed Testing in 4 Steps',
    description:
      'Pay $15, submit your closed testing link, get 15 testers assigned instantly, and complete Google’s 14-day requirement. See the exact process.',
    keywords: mergeKeywords('how app testing works', 'google play testing process', '12 testers process'),
    ogImage: '/images/illustrations/how-it-works.png',
    type: 'website',
  },

  '/pricing': {
    title: 'Pricing — $15 Google Play Closed Testing | Fast Testers',
    description:
      'One-time $15 per app: 15 quality testers, ~1-hour assignment, 14-day closed testing coverage, and a production access guarantee. No subscription.',
    keywords: mergeKeywords('app testing pricing', 'google play testing cost', '$15 app testing'),
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/faq': {
    title: 'FAQ | Google Play 12 Testers, Pricing & Production Access',
    description:
      'Answers on the 12-tester / 14-day rule, tester quality, refunds, languages, and how Fast Testers gets apps ready for Google Play production access.',
    keywords: mergeKeywords('google play testing FAQ', '12 testers questions', 'production access FAQ'),
    ogImage: '/images/illustrations/support-center.png',
    type: 'website',
  },

  '/about-us': {
    title: 'About Us - Fast Testers | Helping Developers Meet Google Play Standards',
    description:
      'Learn about Fast Testers mission to help Android developers navigate Google Play testing requirements and achieve production access faster.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/team-testers.png',
    type: 'website',
  },

  '/reviews': {
    title: 'Reviews - Fast Testers | Trusted by 1,500+ Android Developers',
    description:
      'Read verified reviews from developers who used Fast Testers to meet Google Play 12-tester requirement. 4.9/5 average rating across 1,500+ users.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/support': {
    title: 'Support Center - Fast Testers | Help & Resources for App Testing',
    description:
      'Get help with Google Play testing requirements. Browse our knowledge base, guides, and contact our support team for fast assistance.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/support-center.png',
    type: 'website',
  },

  '/contact-us': {
    title: 'Contact Us - Fast Testers | Get in Touch for App Testing Help',
    description:
      'Contact the Fast Testers team for help with Google Play testing requirements, account questions, or partnership inquiries. We respond within 2 hours.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/contact-us.png',
    type: 'website',
  },

  '/feedback': {
    title: 'Feedback - Fast Testers | Share Your Experience & Suggestions',
    description:
      'Share your feedback about Fast Testers. Help us improve our app testing service and make it easier for developers to meet Google Play requirements.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/feedback.png',
    type: 'website',
  },

  '/terms-and-conditions': {
    title: 'Terms and Conditions - Fast Testers | Service Agreement',
    description:
      'Read the Fast Testers terms and conditions covering our app testing service, user responsibilities, payment terms, and Google Play compliance services.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/privacy-policy': {
    title: 'Privacy Policy - Fast Testers | Data Protection & Privacy',
    description:
      'Learn how Fast Testers handles your data, protects your privacy, and ensures security for your app testing information and personal details.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/refund-policy': {
    title: 'Refund Policy - Fast Testers | Money-Back Guarantee',
    description:
      'Fast Testers offers a full refund if your app does not achieve Google Play production access. Read our transparent refund policy and guarantee terms.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/cancellation-policy': {
    title: 'Cancellation Policy - Fast Testers | Order & Account Cancellation',
    description:
      'Learn how to cancel orders and close your Fast Testers account. One-time payments only — no subscriptions. Full refund available before testing begins.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/account-deletion': {
    title: 'Account Deletion - Fast Testers | Delete Your Account & Data',
    description:
      'Request deletion of your Fast Testers account and personal data from our website or Android app. Learn what data is deleted, retained, and how long processing takes.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/app-testing-referral-program': {
    title:
      'Referral Program - Fast Testers | Earn Rewards for Referring Developers',
    description:
      'Join the Fast Testers referral program and earn rewards for every developer you refer. Help others meet Google Play testing requirements and get paid.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/success-approved.png',
    type: 'website',
  },

  '/referral-policy': {
    title: 'Referral Policy - Fast Testers | Referral Program Terms & Conditions',
    description:
      'Read the Fast Testers referral program policy covering eligibility, reward structure, payout terms, and conditions for referring new developers.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/blog': {
    title: 'Blog - Fast Testers | Google Play Testing Guides & Android Insights',
    description:
      'Expert guides on Google Play 12-tester policy, Android app testing best practices, and production access tips. Stay updated with Fast Testers blog.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/blog/blog-12-testers.png',
    type: 'website',
  },

  '/guides/publish-app-google-play': {
    title:
      'How to Publish an App on Google Play - Fast Testers | Complete Guide',
    description:
      'Step-by-step guide to publish your Android app on Google Play, including 12-tester requirement, closed testing, and production access walkthrough.',
    keywords: mergeKeywords('publish app google play', 'play store developer setup'),
    ogImage: '/images/blog/guide-publish.png',
    type: 'article',
  },

  '/guides/enterprise-onboarding': {
    title:
      'Enterprise Onboarding Guide - Fast Testers | Bulk App Testing Setup',
    description:
      'Complete enterprise onboarding guide for teams with multiple apps. Learn how to set up bulk testing, manage testers, and streamline Google Play compliance.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/blog/guide-publish.png',
    type: 'article',
  },

  '/blog/google-play-12-testers-policy': {
    title:
      'Google Play 12-Testers Policy Explained - Fast Testers | Complete Guide',
    description:
      'Everything you need to know about Google Play 12-tester policy: requirements, timelines, exemptions, and how to meet the standard quickly.',
    keywords: mergeKeywords('google play 12 testers policy', '12 tester requirement explained'),
    ogImage: '/images/blog/blog-12-testers.png',
    type: 'article',
  },

  '/blog/how-to-find-beta-testers-for-android-apps': {
    title:
      'How to Find Beta Testers for Android Apps - Fast Testers | Expert Guide',
    description:
      'Struggling to find beta testers? Learn proven strategies to recruit Android beta testers and meet Google Play 12-tester requirement fast and reliably.',
    keywords: mergeKeywords('find beta testers', 'recruit app testers', 'android beta testers guide'),
    ogImage: '/images/blog/beta-testers.png',
    type: 'article',
  },

  '/blog/google-play-closed-testing': {
    title:
      'Google Play Closed Testing - Fast Testers | Complete Closed Testing Guide',
    description:
      'Master Google Play closed testing with our complete guide. Learn requirements, setup steps, tester management, and how to graduate to production access.',
    keywords: mergeKeywords('closed testing guide', 'play store closed test setup'),
    ogImage: '/images/blog/closed-testing.png',
    type: 'article',
  },

  '/blog/app-rejected-google-play': {
    title:
      'App Rejected by Google Play? - Fast Testers | Fix Rejections Fast',
    description:
      'Your app was rejected by Google Play? Learn common rejection reasons and how Fast Testers helps you fix issues and get approved for production access.',
    keywords: mergeKeywords('app rejected google play', 'fix app rejection', 'play store rejected'),
    ogImage: '/images/illustrations/app-rejected.png',
    type: 'article',
  },

  '/blog/multi-language-app-testing': {
    title:
      'Multi-Language App Testing - Fast Testers | Global Testing Coverage',
    description:
      'Test your Android app across multiple languages and regions. Fast Testers provides multi-language testing to ensure Google Play compliance worldwide.',
    keywords: mergeKeywords('multi-language app testing', 'localization testing', 'international app testers'),
    ogImage: '/images/blog/multi-language.png',
    type: 'article',
  },

  '/blog/publish-app-google-play': {
    title:
      'How to Publish an App on Google Play - Fast Testers | Complete Guide',
    description:
      'Step-by-step guide to publish your Android app on Google Play, including 12-tester requirement, closed testing, and production access walkthrough.',
    keywords: mergeKeywords('publish app google play', 'play store developer setup'),
    ogImage: '/images/blog/guide-publish.png',
    type: 'article',
  },

  '/android-app-testers': {
    title:
      'Android App Testers - Fast Testers | Google Play Closed Testing Service',
    description:
      'Google Play Closed Testing service with real Android testers assigned instantly. 15 quality testers for $15 — meet the 12-tester, 14-day requirement with production access.',
    keywords: mergeKeywords('hire android testers', 'real app testers google play'),
    ogImage: '/images/illustrations/app-testing.png',
    type: 'website',
  },

  '/how-to-find-beta-testers-for-android-apps': {
    title:
      'How to Find Beta Testers for Android Apps - Fast Testers | Expert Guide',
    description:
      'Struggling to find beta testers? Learn proven strategies to recruit Android beta testers and meet Google Play 12-tester requirement fast and reliably.',
    keywords: mergeKeywords('find beta testers', 'recruit app testers', 'android beta testers guide'),
    ogImage: '/images/blog/beta-testers.png',
    type: 'article',
  },

  '/google-play-production-access-12-testers': {
    title:
      'Google Play Production Access with 12 Testers - Fast Testers | Guide',
    description:
      'Achieve Google Play production access by meeting the 12-tester requirement. Our guide covers the exact steps to move from closed testing to production.',
    keywords: mergeKeywords(
      'google play production access guide',
      '12 testers production',
      '14 testers production access'
    ),
    ogImage: '/images/illustrations/success-approved.png',
    type: 'article',
  },

  '/google-play-closed-testing': {
    title:
      'Google Play Closed Testing - Fast Testers | Complete Closed Testing Guide',
    description:
      'Master Google Play closed testing with our complete guide. Learn requirements, setup steps, tester management, and how to graduate to production access.',
    keywords: mergeKeywords('closed testing guide', 'play store closed test setup'),
    ogImage: '/images/blog/closed-testing.png',
    type: 'article',
  },

  '/app-rejected-google-play': {
    title:
      'App Rejected by Google Play? - Fast Testers | Fix Rejections Fast',
    description:
      'Your app was rejected by Google Play? Learn common rejection reasons and how Fast Testers helps you fix issues and get approved for production access.',
    keywords: mergeKeywords('app rejected google play', 'fix app rejection', 'play store rejected'),
    ogImage: '/images/illustrations/app-rejected.png',
    type: 'website',
  },

  '/multi-language-app-testing': {
    title:
      'Multi-Language App Testing - Fast Testers | Global Testing Coverage',
    description:
      'Test your Android app across multiple languages and regions. Fast Testers provides multi-language testing to ensure Google Play compliance worldwide.',
    keywords: mergeKeywords('multi-language app testing', 'localization testing', 'international app testers'),
    ogImage: '/images/blog/multi-language.png',
    type: 'article',
  },

  '/google-play-setup-guide': {
    title:
      'Google Play Setup Guide - Fast Testers | Complete Developer Setup',
    description:
      'Complete guide to setting up your Google Play Developer account, configuring closed testing, and preparing your app for the 12-tester requirement.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/blog/guide-publish.png',
    type: 'article',
  },

  '/google-play-12-testers': {
    title: 'Google Play 12 Testers Requirement — Complete Guide | Fast Testers',
    description:
      'Google Play requires 12 testers for 14 days before production access. Learn the exact requirement and how Fast Testers assigns real testers in ~1 hour.',
    keywords: mergeKeywords('google play 12 testers', '12 testers requirement'),
    ogImage: '/images/illustrations/app-testing.png',
    type: 'article',
  },

  '/google-play-14-day-testing': {
    title: 'Google Play 14 Day Testing Requirement — Full Guide | Fast Testers',
    description:
      'Understand Google Play\'s mandatory 14-day closed testing period and how to complete it with 12+ real testers.',
    keywords: mergeKeywords('google play 14 day testing', '14 day closed testing'),
    ogImage: '/images/blog/closed-testing.png',
    type: 'article',
  },

  '/google-play-personal-developer-account': {
    title: 'Google Play Personal Developer Account Testing Rules | Fast Testers',
    description:
      'New personal Google Play developer accounts must complete 12 testers for 14 days before production.',
    keywords: mergeKeywords('personal developer account google play', 'play console personal account'),
    ogImage: '/images/blog/guide-publish.png',
    type: 'article',
  },

  '/google-play-testing-service': {
    title: 'Google Play Testing Service — Professional Closed Testing | Fast Testers',
    description:
      'Professional Google Play testing service: 15 real Android testers, production access guarantee. One-time $15.',
    keywords: mergeKeywords('google play testing service', 'professional app testers'),
    ogImage: '/images/illustrations/app-testing.png',
    type: 'website',
  },

  '/google-play-requirement': {
    title: 'Google Play Requirement for New Developers — 2026 Guide | Fast Testers',
    description:
      'All Google Play requirements for new personal developer accounts: 12 testers, 14 days, closed testing, production access.',
    keywords: mergeKeywords('google play requirement', 'play store publishing requirements'),
    ogImage: '/images/illustrations/success-approved.png',
    type: 'article',
  },

  '/android-closed-testing': {
    title: 'Android Closed Testing — Complete Guide for Google Play | Fast Testers',
    description:
      'Learn Android closed testing on Google Play: setup, tester management, and how to graduate to production.',
    keywords: mergeKeywords('android closed testing', 'google play closed test'),
    ogImage: '/images/blog/closed-testing.png',
    type: 'article',
  },

  '/resources/google-play-checklist': {
    title: 'Google Play Publishing Checklist (Free PDF) | Fast Testers',
    description:
      'Free Google Play publishing checklist: closed testing, 12 testers, 14 days, production access steps for indie developers.',
    keywords: mergeKeywords('google play checklist', 'play store publishing checklist'),
    ogImage: '/images/blog/guide-publish.png',
    type: 'website',
  },

  '/sample-app': {
    title:
      'Sample App - Fast Testers | Try Our Demo App Testing Experience',
    description:
      'Try the Fast Testers sample app to see how our testing process works. Experience real tester feedback, bug reports, and Google Play compliance testing.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/app-testing.png',
    type: 'website',
  },

  '/submit-app': {
    title:
      'Submit Your App - Fast Testers | Start Google Play Closed Testing Today',
    description:
      'Submit your app for Google Play Closed Testing. Testers are assigned instantly after submission — 15 quality testers for $15 with production access guarantee.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/app-testing.png',
    type: 'website',
  },

  '/partners': {
    title:
      'Partners - Fast Testers | Partner With Us for App Testing Solutions',
    description:
      'Partner with Fast Testers to offer app testing services to your clients. Integration options, affiliate programs, and co-branded solutions available.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/status': {
    title: 'System Status - Fast Testers | Service Uptime & Performance',
    description:
      'Check Fast Testers system status, uptime monitoring, and service health. Real-time updates on our app testing platform availability and performance.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/status-monitoring.png',
    type: 'website',
  },

  '/changelog': {
    title:
      'Changelog - Fast Testers | Platform Updates & New Features',
    description:
      'Stay updated with Fast Testers platform changes, new features, and improvements. See our latest releases and upcoming enhancements for app testing.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/compare': {
    title:
      'Compare - Fast Testers vs Competitors | App Testing Service Comparison',
    description:
      'Compare Fast Testers with other app testing services. See pricing, speed, tester quality, and features side by side. Save up to 80% with Fast Testers.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/case-studies': {
    title:
      'Case Studies - Fast Testers | Developer Success Stories & Results',
    description:
      'Read real success stories from developers who achieved Google Play production access using Fast Testers. See metrics, timelines, and measurable results.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: '/images/illustrations/success-approved.png',
    type: 'website',
  },

  '/cookie-policy': {
    title: 'Cookie Policy - Fast Testers | Cookie Usage & Consent',
    description:
      'Learn how Fast Testers uses cookies, what types we use, and how to manage your cookie preferences for our app testing platform.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/login': {
    title: 'Login - Fast Testers Developer Dashboard',
    description: 'Sign in to your Fast Testers account to manage app testing orders and track Google Play compliance progress.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
    noindex: true,
  },

  '/signup': {
    title: 'Sign Up - Fast Testers | Create Your Developer Account',
    description: 'Create a Fast Testers account to submit apps for Google Play 12-tester testing and track production access progress.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
    noindex: true,
  },

  '/forgot-password': {
    title: 'Reset Password - Fast Testers',
    description: 'Reset your Fast Testers account password to regain access to your app testing dashboard.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
    noindex: true,
  },

  '/payment-success': {
    title: 'Payment Successful - Fast Testers',
    description: 'Your payment was successful. Redirecting you to submit your app for Google Play closed testing.',
    keywords: DEFAULT_KEYWORDS_META,
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
    noindex: true,
  },
};
