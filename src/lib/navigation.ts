import type { SiteNavigation, NavLink, NavSection } from '@/lib/site-settings';

export const FALLBACK_NAVIGATION: SiteNavigation = {
  headerMain: [
    { labelKey: 'header.howItWorks', path: '/how-it-works' },
    { labelKey: 'header.reviews', path: '/reviews' },
    { labelKey: 'header.pricing', path: '/pricing' },
    { labelKey: 'header.blog', path: '/blog' },
  ],
  headerResources: [
    { labelKey: 'header.compare', path: '/compare' },
    { labelKey: 'header.caseStudies', path: '/case-studies' },
    { labelKey: 'header.androidTesters', path: '/android-app-testers' },
    { labelKey: 'header.betaTestersGuide', path: '/blog/how-to-find-beta-testers-for-android-apps' },
    { labelKey: 'header.googlePlayClosedTesting', path: '/blog/google-play-closed-testing' },
    { labelKey: 'header.appRejected', path: '/blog/app-rejected-google-play' },
    { labelKey: 'header.multiLanguageTesting', path: '/blog/multi-language-app-testing' },
    { labelKey: 'header.setupGuide', path: '/google-play-setup-guide' },
    { labelKey: 'header.productionAccess', path: '/google-play-production-access-12-testers' },
  ],
  headerSupport: [
    { labelKey: 'footer.helpCenter', path: '/support', icon: 'Headphones' },
    { labelKey: 'footer.contactUs', path: '/contact-us', icon: 'Mail' },
    { labelKey: 'footer.feedback', path: '/feedback', icon: 'MessageSquare' },
    { labelKey: 'footer.status', path: '/status', icon: 'Activity' },
    { labelKey: 'footer.appRejected', path: '/blog/app-rejected-google-play', icon: 'AlertTriangle' },
  ],
  footerSections: [
    {
      titleKey: 'footer.company',
      links: [
        { labelKey: 'footer.aboutUs', path: '/about-us' },
        { labelKey: 'footer.reviews', path: '/reviews' },
        { labelKey: 'footer.caseStudies', path: '/case-studies' },
        { labelKey: 'footer.partners', path: '/partners' },
        { labelKey: 'footer.blog', path: '/blog' },
        { labelKey: 'footer.changelog', path: '/changelog' },
      ],
    },
    {
      titleKey: 'footer.product',
      links: [
        { labelKey: 'footer.howItWorks', path: '/how-it-works' },
        { labelKey: 'footer.pricing', path: '/pricing' },
        { labelKey: 'footer.compare', path: '/compare' },
        { labelKey: 'footer.submitApp', path: '/submit-app' },
        { labelKey: 'footer.affiliateProgram', path: '/app-testing-referral-program' },
      ],
    },
    {
      titleKey: 'footer.resources',
      links: [
        { labelKey: 'footer.faq', path: '/faq' },
        { labelKey: 'footer.androidTesters', path: '/android-app-testers' },
        { labelKey: 'footer.googlePlayGuide', path: '/blog/publish-app-google-play' },
        { labelKey: 'footer.enterpriseGuide', path: '/guides/enterprise-onboarding' },
      ],
    },
    {
      titleKey: 'footer.support',
      links: [
        { labelKey: 'footer.helpCenter', path: '/support' },
        { labelKey: 'footer.contactUs', path: '/contact-us' },
        { labelKey: 'footer.feedback', path: '/feedback' },
        { labelKey: 'footer.status', path: '/status' },
        { labelKey: 'footer.appRejected', path: '/blog/app-rejected-google-play' },
      ],
    },
  ],
  footerLegal: [
    { labelKey: 'footer.termsAndConditions', path: '/terms-and-conditions' },
    { labelKey: 'footer.privacyPolicy', path: '/privacy-policy' },
    { labelKey: 'footer.cookiePolicy', path: '/cookie-policy' },
    { labelKey: 'footer.refundPolicy', path: '/refund-policy' },
    { labelKey: 'footer.cancellationPolicy', path: '/cancellation-policy' },
    { labelKey: 'footer.accountDeletion', path: '/account-deletion' },
    { labelKey: 'footer.referralPolicy', path: '/referral-policy' },
  ],
};

export function resolveNavLabel(
  link: NavLink,
  t: (key: string) => string
): string {
  if (link.label?.trim()) return link.label;
  if (link.labelKey) return t(link.labelKey);
  return link.path;
}

export function resolveSectionTitle(
  section: NavSection,
  t: (key: string) => string
): string {
  if (section.title?.trim()) return section.title;
  if (section.titleKey) return t(section.titleKey);
  return '';
}
