import type { SiteNavigation, NavLink, NavSection } from '@/lib/site-settings';
import { COMMUNITY_URL } from '@/lib/app-urls';

const FREE_TESTERS_PATH = '/free-testers';

const COMMUNITY_HEADER_LINK: NavLink = {
  labelKey: 'header.freeTestersCommunity',
  path: FREE_TESTERS_PATH,
};

const COMMUNITY_FOOTER_LINK: NavLink = {
  labelKey: 'footer.freeTestersCommunity',
  path: FREE_TESTERS_PATH,
};

/** Blog URLs that duplicate money/requirement landings. */
const RESOURCE_PATH_ALIASES: Record<string, string> = {
  '/blog/google-play-12-testers-policy': '/google-play-12-testers',
  [COMMUNITY_URL]: FREE_TESTERS_PATH,
};

const HEADER_SEO_RESOURCE_LINKS: NavLink[] = [
  { labelKey: 'header.twelveTesters', path: '/google-play-12-testers' },
  { labelKey: 'header.fourteenDayTesting', path: '/google-play-14-day-testing' },
  { labelKey: 'header.testingService', path: '/google-play-testing-service' },
  { labelKey: 'header.androidTesters', path: '/android-app-testers' },
  { labelKey: 'header.productionAccess', path: '/google-play-production-access-12-testers' },
  { labelKey: 'header.checklist', path: '/resources/google-play-checklist' },
];

const FOOTER_SEO_RESOURCE_LINKS: NavLink[] = [
  { labelKey: 'footer.twelveTesters', path: '/google-play-12-testers' },
  { labelKey: 'footer.fourteenDayTesting', path: '/google-play-14-day-testing' },
  { labelKey: 'footer.testingService', path: '/google-play-testing-service' },
  { labelKey: 'footer.androidTesters', path: '/android-app-testers' },
  { labelKey: 'footer.productionAccess', path: '/google-play-production-access-12-testers' },
  { labelKey: 'footer.checklist', path: '/resources/google-play-checklist' },
];

function isCommunityLink(link: NavLink): boolean {
  return (
    link.path === COMMUNITY_URL ||
    link.path === FREE_TESTERS_PATH ||
    link.labelKey === 'header.freeTestersCommunity' ||
    link.labelKey === 'footer.freeTestersCommunity'
  );
}

function insertLinkAfter(links: NavLink[], link: NavLink, afterPath: string): NavLink[] {
  if (links.some(isCommunityLink)) return links;
  const index = links.findIndex((item) => item.path === afterPath);
  if (index === -1) return [...links, link];
  return [...links.slice(0, index + 1), link, ...links.slice(index + 1)];
}

function isProductFooterSection(section: NavSection): boolean {
  if (section.titleKey === 'footer.product') return true;
  return section.links.some(
    (link) => link.path === '/submit-app' || link.labelKey === 'footer.submitApp'
  );
}

export function isResourcesFooterSection(section: NavSection): boolean {
  if (section.titleKey === 'footer.resources') return true;
  if (
    section.titleKey === 'footer.product' ||
    section.titleKey === 'footer.company' ||
    section.titleKey === 'footer.support'
  ) {
    return false;
  }
  return section.links.some(
    (link) =>
      link.path === '/faq' ||
      link.path === '/blog/google-play-12-testers-policy' ||
      link.path === '/google-play-12-testers'
  );
}

function normalizeResourcePath(path: string): string {
  return RESOURCE_PATH_ALIASES[path] ?? path;
}

/**
 * CMS nav can omit SEO landings or still point at cannibalizing blog URLs.
 * Always expose the money/requirement pages; keep extra CMS links after them.
 */
function upsertSeoResourceLinks(links: NavLink[], seoLinks: NavLink[]): NavLink[] {
  const seoPaths = new Set(seoLinks.map((link) => link.path));
  const rest = links
    .map((link) => {
      const path = normalizeResourcePath(link.path);
      if (path === link.path) return link;
      return { path };
    })
    .filter((link) => !seoPaths.has(normalizeResourcePath(link.path)));

  const insertAfterPaths = ['/case-studies', '/compare', '/faq'];
  let insertAt = 0;
  for (const after of insertAfterPaths) {
    const index = rest.findIndex((link) => link.path === after);
    if (index !== -1) {
      insertAt = index + 1;
      break;
    }
  }

  return [...rest.slice(0, insertAt), ...seoLinks, ...rest.slice(insertAt)];
}

function remapCommunityPath(links: NavLink[]): NavLink[] {
  return links.map((link) =>
    link.path === COMMUNITY_URL ? { ...link, path: FREE_TESTERS_PATH } : link
  );
}

/** Ensures community + SEO landing links exist when older DB navigation is loaded. */
export function mergeSiteNavigation(stored: SiteNavigation): SiteNavigation {
  return {
    ...stored,
    headerMain: insertLinkAfter(
      remapCommunityPath(stored.headerMain ?? []),
      COMMUNITY_HEADER_LINK,
      '/blog'
    ),
    headerResources: upsertSeoResourceLinks(
      stored.headerResources ?? [],
      HEADER_SEO_RESOURCE_LINKS
    ),
    footerSections: (stored.footerSections ?? []).map((section) => {
      if (isProductFooterSection(section)) {
        return {
          ...section,
          links: insertLinkAfter(
            remapCommunityPath(section.links ?? []),
            COMMUNITY_FOOTER_LINK,
            '/submit-app'
          ),
        };
      }
      if (isResourcesFooterSection(section)) {
        return {
          ...section,
          links: upsertSeoResourceLinks(section.links ?? [], FOOTER_SEO_RESOURCE_LINKS),
        };
      }
      return section;
    }),
  };
}

export const FALLBACK_NAVIGATION: SiteNavigation = mergeSiteNavigation({
  headerMain: [
    { labelKey: 'header.howItWorks', path: '/how-it-works' },
    { labelKey: 'header.reviews', path: '/reviews' },
    { labelKey: 'header.pricing', path: '/pricing' },
    { labelKey: 'header.blog', path: '/blog' },
    { labelKey: 'header.freeTestersCommunity', path: '/free-testers' },
  ],
  headerResources: [
    { labelKey: 'header.compare', path: '/compare' },
    { labelKey: 'header.caseStudies', path: '/case-studies' },
    { labelKey: 'header.googlePlayClosedTesting', path: '/blog/google-play-closed-testing' },
    { labelKey: 'header.appRejected', path: '/blog/app-rejected-google-play' },
    { labelKey: 'header.setupGuide', path: '/google-play-setup-guide' },
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
        { labelKey: 'footer.freeTestersCommunity', path: '/free-testers' },
        { labelKey: 'footer.affiliateProgram', path: '/app-testing-referral-program' },
      ],
    },
    {
      titleKey: 'footer.resources',
      links: [
        { labelKey: 'footer.faq', path: '/faq' },
        { label: 'Closed Testing Guide', path: '/blog/google-play-closed-testing' },
        { labelKey: 'footer.appRejected', path: '/blog/app-rejected-google-play' },
        { labelKey: 'footer.setupGuide', path: '/google-play-setup-guide' },
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
});

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
