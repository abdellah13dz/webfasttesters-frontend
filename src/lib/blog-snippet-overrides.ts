/**
 * Title/description overrides for blogs that already have Search Console
 * impressions but weak CTR. Applied to metadata only — do not rewrite bodies.
 */
export interface BlogSnippetOverride {
  title: string;
  description: string;
}

export const BLOG_SNIPPET_OVERRIDES: Record<string, BlogSnippetOverride> = {
  'google-play-closed-testing-requirements-2026': {
    title: 'Google Play Closed Testing Requirements: 12 Testers for 14 Days',
    description:
      'Personal Play accounts after 13 Nov 2023 need 12 testers for 14 consecutive days. See what counts toward production access — and what does not.',
  },
  'internal-testing-vs-production-release': {
    title: 'Internal Testing Does Not Unlock Google Play Production Access',
    description:
      'Google Play internal testing is for early QA. It does not meet the 12 testers / 14-day closed-testing rule. Use closed testing to apply for production.',
  },
  'google-play-approval-time': {
    title: 'Google Play Approval Time: How Long Review Takes After Closed Testing',
    description:
      'Play review timing after you apply for production. Personal accounts still need 12 testers for 14 consecutive days of closed testing first.',
  },
  'how-to-create-an-internal-testing-track': {
    title: 'How to Create a Google Play Internal Testing Track (It Does Not Count for Production)',
    description:
      'Set up Play Console internal testing for QA. Internal testers do not satisfy closed testing or production access. See the 12 testers / 14 days rule.',
  },
  'where-to-find-real-android-app-testers': {
    title: 'Where to Find Real Android App Testers for Google Play Closed Testing',
    description:
      'Need real testers for Google Play closed testing? Compare DIY, groups, and a $15 service that assigns 15 testers for 16 days.',
  },
  'google-play-personal-account-vs-organization-account': {
    title: 'Google Play Personal vs Organization Account: Who Needs 12 Testers',
    description:
      'Personal developer accounts created after 13 Nov 2023 usually need 12 testers for 14 days of closed testing. Organization accounts follow different rules.',
  },
};

export function applyBlogSnippetOverride(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): { title: string; description: string } {
  const override = BLOG_SNIPPET_OVERRIDES[slug];
  if (!override) {
    return {
      title: fallbackTitle,
      description: fallbackDescription.slice(0, 160),
    };
  }
  return {
    title: override.title,
    description: override.description.slice(0, 160),
  };
}

export function isInternalTestingArticle(slug: string): boolean {
  return slug.includes('internal-testing') || slug.includes('internal-test-track');
}

/** Supporting vs-groups posts that should point up to the /compare hub. */
const VS_GROUPS_COMPARE_SLUGS = new Set([
  'fast-testers-vs-facebook-groups',
  'fast-testers-vs-telegram-communities',
  'fast-testers-vs-reddit-testers',
  'google-groups-not-working',
  'how-to-use-google-groups-for-closed-testing',
]);

export function isVsGroupsCompareArticle(slug: string): boolean {
  return VS_GROUPS_COMPARE_SLUGS.has(slug);
}
