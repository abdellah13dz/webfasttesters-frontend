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

export const defaultSeo: PageSeo = {
  title: 'Fast Testers - Get 12 Testers for Google Play in 48 Hours',
  description:
    'Fast Testers helps Android developers meet Google Play 12-tester requirement in 48 hours. Real testers, fast production access, and guaranteed approval.',
  keywords: DEFAULT_KEYWORDS_META,
  ogImage: BRAND_OG_IMAGE_PATH,
  type: 'website',
};

export const pageSeoConfig: Record<string, PageSeo> = {
  '/': {
    title: 'Fast Testers - Get 12 Testers for Google Play in 48 Hours',
    description:
      'Meet Google Play 12-tester requirement fast. Real Android testers, production access in 48 hours, and guaranteed approval. Trusted by 1,500+ developers.',
    keywords: mergeKeywords(
      'fast app testing',
      '12 testers policy',
      'beta testers',
      'Get 12 Testers for Google Play in 48 Hours'
    ),
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/how-it-works': {
    title: 'How It Works - Fast Testers | Simple 3-Step App Testing Process',
    description:
      'Submit your app, get matched with 12+ real Android testers, and achieve Google Play production access in just 48 hours. See our simple process.',
    keywords: mergeKeywords('how app testing works', 'google play testing process', '12 testers process'),
    ogImage: '/images/illustrations/how-it-works.png',
    type: 'website',
  },

  '/pricing': {
    title: 'Pricing - Fast Testers | $15/App Testing for Google Play Compliance',
    description:
      'Simple pricing at $15 per app. Get 12+ real testers, 14-day testing period, detailed reports, and Google Play production access guaranteed.',
    keywords: mergeKeywords('app testing pricing', 'google play testing cost', '$15 app testing'),
    ogImage: BRAND_OG_IMAGE_PATH,
    type: 'website',
  },

  '/faq': {
    title: 'FAQ - Fast Testers | Common Questions About Google Play Testing',
    description:
      'Answers to common questions about Google Play 12-tester requirement, our testing process, pricing, and how to get production access quickly.',
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
      'Android App Testers - Fast Testers | Real Testers for Google Play Compliance',
    description:
      'Get real Android app testers who help you meet Google Play 12-tester requirement. Professional testers with devices, feedback, and 48-hour delivery.',
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
      'Submit Your App - Fast Testers | Start Google Play Testing Today',
    description:
      'Submit your Android app for testing with Fast Testers. Get matched with 12+ real testers, receive detailed feedback, and achieve production access.',
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
};
