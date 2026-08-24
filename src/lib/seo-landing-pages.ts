export interface SeoLandingFaq {
  question: string;
  answer: string;
}

export interface SeoLandingPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  /** Citation-friendly bullets for AI Overviews / LLM extraction */
  keyTakeaways?: string[];
  /** ISO date for editorial freshness signal */
  lastReviewed?: string;
  sections: { heading: string; body: string }[];
  faq: SeoLandingFaq[];
  relatedSlugs: string[];
  ogImage?: string;
  /** Override default hero CTA (Start Closed Testing → app). */
  heroCta?: { label: string; href: string };
  heroSecondaryCta?: { label: string; href: string };
}

const SHARED_CTA = `
## Ready to Start Closed Testing?

Fast Testers assigns **15 real Android testers for 16 days** for a **one-time $15 payment** (Google’s minimum is 12 testers for 14 consecutive days). Then apply for production access — Google decides approval.

[Start Closed Testing →](https://app.fasttesters.com/)
`;

const DEFAULT_LAST_REVIEWED = '2026-08-04';

function withAiDefaults(
  config: Omit<SeoLandingPageConfig, 'keyTakeaways' | 'lastReviewed'> & {
    keyTakeaways?: string[];
    lastReviewed?: string;
  }
): SeoLandingPageConfig {
  return {
    ...config,
    lastReviewed: config.lastReviewed || DEFAULT_LAST_REVIEWED,
    keyTakeaways: config.keyTakeaways?.length
      ? config.keyTakeaways
      : [
          'Google Play often requires at least 12 real testers for 14 consecutive days of closed testing before production access (personal accounts after Nov 13, 2023).',
          'Fast Testers assigns 15 real Android testers for 16 days for a one-time $15 fee, covering Google’s 12 testers / 14 consecutive days requirement.',
          'Google alone decides production approval; Fast Testers provides managed testing coverage and refund terms on the refund policy page.',
        ],
  };
}

function section(heading: string, body: string) {
  return { heading, body: body.trim() };
}

export const SEO_LANDING_PAGES: Record<string, SeoLandingPageConfig> = {
  'google-play-12-testers': {
    slug: 'google-play-12-testers',
    title: 'Google Play 12 Testers Requirement — Complete Guide | Fast Testers',
    metaDescription:
      'Google Play requires 12 testers for 14 days before production access. Learn the exact requirement, how to meet it, and how Fast Testers assigns real testers in ~1 hour.',
    keywords: ['google play 12 testers', '12 testers requirement', 'play store testers'],
    h1: 'Google Play 12 Testers Requirement: Complete 2026 Guide',
    intro:
      'Personal developer accounts created after November 2023 must run closed testing with at least **12 testers for 14 consecutive days** before Google allows a production access request. This guide explains what counts, what does not, and the fastest compliant path.',
    sections: [
      section('Why Google requires 12 testers', `
Google introduced the 12-tester rule to reduce spam and low-quality apps on the Play Store. The requirement applies to **personal developer accounts** that have not yet earned production access. Google tracks whether real users install your app from the **closed testing track** and remain active during the testing window.

The rule is not optional. Developers who skip closed testing or use fake installs risk rejection, account flags, or delayed production access. Fast Testers exists specifically to help indie developers meet this requirement without spending weeks recruiting friends, posting on Reddit, or buying unreliable "install" services that Google can detect.`),
      section('What counts as a valid tester', `
A valid tester must:

- Use a **real Google account** (not emulators or farm accounts)
- **Install your app from Google Play** via your closed testing opt-in link
- Remain in the testing track for the **full 14-day period**
- Actually open and use the app (Google monitors engagement signals)

Testers who uninstall immediately, never opt in, or join via sideloaded APKs **do not** satisfy the requirement. That is why professional closed testing services use real Android users who understand the Play Console flow.`),
      section('The 14-day timeline explained', `
The 14 days must be **consecutive**. If testers drop below 12 at any point, the clock may reset depending on your Play Console status. Plan for **15 testers** to absorb drop-off — Fast Testers assigns 15 for a $15 one-time fee so you maintain buffer above the minimum.

Typical timeline:

1. **Day 0** — Publish to closed testing, share opt-in link, testers join
2. **Days 1–14** — Active testing period; monitor Play Console dashboard
3. **Day 15+** — Request production access from Play Console
4. **Review** — Google evaluates app quality, policy compliance, and testing history

Most developers who follow this flow receive production access within days if the app meets policy guidelines.`),
      section('How to recruit 12 testers yourself', `
Manual recruitment options include friends and family, developer communities, Discord servers, Reddit (r/AndroidClosedTesting), and beta testing platforms. Each approach has trade-offs:

| Method | Pros | Cons |
|--------|------|------|
| Friends & family | Free | Often ghost; may not use app |
| Reddit / Discord | Large pool | Unreliable; high dropout |
| Beta platforms | Structured | Slow; may not meet Play rules |
| Fast Testers | Instant; real installs | One-time $15 fee |

If you choose manual recruitment, create a clear onboarding email, send reminders on days 3, 7, and 12, and verify installs in Play Console → Testing → Closed testing → Testers.`),
      section('Common mistakes that fail the 12-tester check', `
- Publishing to **internal testing only** (does not satisfy production requirement)
- Using **open testing** before closed testing is complete
- Testers installing from **APK sideload** instead of Play Store link
- Dropping below 12 testers mid-period due to no follow-up
- Requesting production access **before** 14 days complete
- Using incentivized install farms (high ban risk)

Avoid these pitfalls by using Play Console's closed testing track exclusively and verifying tester count daily.`),
      section('Fast Testers vs doing it yourself', `
Fast Testers is a **one-time $15 per app** service — no subscription. After payment you submit your closed testing link; **testers are assigned in about one hour**. You receive dashboard tracking and reports. Google decides production access; refund terms are on the refund policy page.

Compare:

- **DIY**: 1–3 weeks recruiting, 40–60% dropout, stress monitoring Play Console
- **Fast Testers**: ~1 hour to start, 15 real testers for 16 days, $15 one-time

For developers who value speed and certainty, professional closed testing pays for itself in saved time and avoided resubmissions.`),
      section('Step-by-step: meet the 12-tester rule today', `
1. Create a **Google Play Developer account** (if you have not already)
2. Upload your app to the **Closed testing** track (not internal)
3. Generate the **opt-in URL** from Play Console
4. Sign up at [app.fasttesters.com](https://app.fasttesters.com/) and pay $15
5. Submit your opt-in link — testers join within ~1 hour
6. Wait **14 consecutive days** while monitoring progress
7. Request **production access** from Play Console

Need help with Play Console setup? See our [Google Play Setup Guide](/google-play-setup-guide) and [Closed Testing Guide](/google-play-closed-testing).`),
      section('12 testers / 14 days vs Fast Testers 15 / 16', `
Google’s rule is **12 testers for 14 consecutive days**. Fast Testers is a **separate product**: **15 testers for 16 days for $15**. The extra testers and extra days are a buffer so one dropout or a missed day is less likely to reset Google’s clock.

That buffer is not a different Google policy. After the cycle, **you** apply for production access in Play Console. **Google decides** approval. Refund terms are on the [refund policy](/refund-policy) page.`),
      section('Ready to Start Closed Testing?', SHARED_CTA),
    ],
    faq: [
      { question: 'Does Google strictly enforce 12 testers?', answer: 'Yes for new personal developer accounts. Production access requests are blocked until the closed testing criteria are met.' },
      { question: 'Why does Fast Testers use 15 testers for 16 days if Google requires 12 for 14?', answer: 'Google’s minimum is 12 testers for 14 consecutive days. Fast Testers assigns 15 testers for 16 days so drop-off and a missed day are less likely to reset the clock. Google still decides production access.' },
      { question: 'Can I use the same testers for multiple apps?', answer: 'Each app needs its own closed testing track and tester participation. Testers can join multiple tracks but each app requires independent 14-day periods.' },
      { question: 'What if I only have 10 testers on day 14?', answer: 'You must maintain at least 12 throughout the period. Drop below 12 and you may need to restart the clock.' },
      { question: 'Are Fast Testers testers real?', answer: 'Yes. Real people, real Android devices, real Play Store installs via your closed testing link.' },
    ],
    relatedSlugs: ['google-play-14-day-testing', 'google-play-closed-testing', 'google-play-production-access-12-testers'],
    ogImage: '/images/illustrations/app-testing.png',
  },

  'google-play-14-day-testing': {
    slug: 'google-play-14-day-testing',
    title: 'Google Play 14 Day Testing Requirement — Full Guide | Fast Testers',
    metaDescription:
      'Understand Google Play\'s mandatory 14-day closed testing period: timeline, rules, monitoring, and how to complete it with 12+ real testers fast.',
    keywords: ['google play 14 day testing', '14 day closed testing', 'play store testing period'],
    h1: 'Google Play 14-Day Testing Requirement Explained',
    intro:
      'Alongside the 12-tester minimum, Google requires **14 consecutive days** of closed testing before personal accounts can request production access. This page covers the full timeline, how Google verifies compliance, and strategies to finish without delays.',
    sections: [
      section('What the 14-day rule means', `
The testing period starts when your closed testing track has the minimum number of opted-in testers actively enrolled. Google expects continuous testing activity over **14 calendar days** — not business days. Weekends count. Holidays count.

During this window Google evaluates:

- Tester opt-in and install rates
- Retention on the testing track
- App stability signals (crashes, ANRs)
- Policy alignment of your store listing and build

The 14-day rule works together with the 12-tester rule. Both must be satisfied.`),
      section('When does the clock start?', `
The clock effectively starts once:

1. Your app is published to **closed testing** (review approved)
2. At least **12 testers** have opted in via your link
3. Testers have **installed** the app from Play Store

Play Console shows testing metrics under **Release → Testing → Closed testing**. Check "Testers" and "Installs" tabs daily. Fast Testers dashboard mirrors this progress so you do not need to guess.`),
      section('Monitoring progress during 14 days', `
Best practices for the testing period:

- **Day 1**: Confirm 12+ installs; fix any broken opt-in links
- **Day 3**: Check crash reports in Play Console → Android vitals
- **Day 7**: Mid-point review; push bugfix release if needed
- **Day 10**: Remind testers (if self-managed); verify count ≥12
- **Day 14**: Screenshot metrics; prepare production access request
- **Day 15**: Submit production access application

With Fast Testers, professional testers maintain engagement throughout the period, reducing dropout that resets your timeline.`),
      section('Can you shorten the 14 days?', `
**No.** Google does not offer waivers for personal developer accounts. Promotional programs, enterprise accounts, or legacy accounts may have different rules, but new indie developers must complete the full period.

Attempting to request production access early results in automatic rejection of the request. Plan your launch marketing **after** day 14, not before.`),
      section('What happens after 14 days?', `
Once testing is complete:

1. Open Play Console → **Production** → **Apply for production access**
2. Answer Google's questionnaire about testing
3. Wait for review (typically 1–7 days)
4. Upon approval, promote release to production track

If rejected for policy reasons, fix issues and resubmit — your completed testing period still counts.`),
      section('Pair 14 days with instant tester assignment', `
The longest part of DIY testing is **waiting for testers to join**. Fast Testers removes that bottleneck: **15 testers assigned in ~1 hour** for $15 one-time. You still wait the mandatory 14 days, but you start the clock immediately instead of losing 1–3 weeks to recruitment.

Related guides: [12 Testers Requirement](/google-play-12-testers) · [Production Access](/google-play-production-access-12-testers) · [Personal Developer Account](/google-play-personal-developer-account)`),
      section('Ready to Start Closed Testing?', SHARED_CTA),
    ],
    faq: [
      { question: 'Do weekends count toward the 14 days?', answer: 'Yes. The period is 14 consecutive calendar days.' },
      { question: 'Can I pause testing and resume later?', answer: 'No. Continuous closed testing with 12+ testers is required.' },
      { question: 'What if my app crashes during testing?', answer: 'Fix and upload a new release to the same closed track. Testers should update; the 14-day period continues.' },
    ],
    relatedSlugs: ['google-play-12-testers', 'google-play-personal-developer-account', 'google-play-testing-service'],
    ogImage: '/images/blog/closed-testing.png',
  },

  'google-play-personal-developer-account': {
    slug: 'google-play-personal-developer-account',
    title: 'Google Play Personal Developer Account Testing Rules | Fast Testers',
    metaDescription:
      'New personal Google Play developer accounts must complete 12 testers for 14 days before production. Learn account types, rules, and the fastest path to publish.',
    keywords: ['personal developer account google play', 'play console personal account', 'new developer account testing'],
    h1: 'Google Play Personal Developer Account: Testing Rules & Requirements',
    intro:
      'If you registered a **personal** Google Play Developer account after November 13, 2023, Google requires closed testing before you can publish to production. Organization accounts follow different rules. This guide focuses on personal accounts — the majority of indie Android developers.',
    sections: [
      section('Personal vs organization accounts', `
| Feature | Personal Account | Organization Account |
|---------|------------------|----------------------|
| Registration cost | $25 one-time | $25 one-time |
| 12 tester / 14 day rule | **Yes** (new accounts) | Typically no |
| D-U-N-S / verification | Not required | May be required |
| Best for | Indie devs, solo founders | Companies, agencies |

Check your account type in Play Console → **Settings → Developer account**. If you see production access gated behind "Complete testing requirements," you are on the personal testing track.`),
      section('Why Google tightened personal account rules', `
Spam apps, malware, and low-effort clones flooded the Play Store. Google responded by forcing new personal developers to prove real user testing before wide release. The policy improves store quality while creating friction for legitimate developers — unless you plan for closed testing from day one.`),
      section('Complete checklist for personal accounts', `
1. Pay $25 and verify identity
2. Create app listing (store assets, privacy policy)
3. Upload AAB to **Closed testing** track
4. Complete content rating questionnaire
5. Recruit **12+ testers** for **14 days**
6. Apply for **production access**
7. Promote release to production

Missing any step blocks publishing. Fast Testers handles steps 5–6 with guaranteed support.`),
      section('Production access application tips', `
When applying for production access, Google asks:

- How many testers participated
- How long testing ran
- What feedback you received
- What changes you made

Keep screenshots from Play Console testing dashboard. Fast Testers provides reports documenting tester activity you can reference.`),
      section('Upgrade to organization account?', `
Switching account types is not trivial. Most indie developers stay on personal accounts and complete closed testing once per app. At $15/app with Fast Testers, upgrading account type is rarely cost-effective compared to compliant testing.`),
      section('Ready to Start Closed Testing?', SHARED_CTA),
    ],
    faq: [
      { question: 'Do old personal accounts need 12 testers?', answer: 'Accounts created before the policy change may already have production access. New apps on new accounts follow current rules.' },
      { question: 'Can I publish to internal testing only?', answer: 'Internal testing does not satisfy the production access requirement for new personal accounts.' },
    ],
    relatedSlugs: ['google-play-personal-developer-account', 'google-play-12-testers', 'google-play-testing-service'],
    ogImage: '/images/blog/guide-publish.png',
  },

  'google-play-testing-service': {
    slug: 'google-play-testing-service',
    title: 'Google Play Testing Service — Professional Closed Testing | Fast Testers',
    metaDescription:
      'Professional Google Play testing service: 15 real Android testers for 16 days for $15, covering Google’s 12 testers / 14 consecutive days. Google decides production access.',
    keywords: ['google play testing service', 'professional app testers', 'closed testing service'],
    h1: 'Google Play Testing Service for Android Developers',
    intro:
      'Fast Testers is a specialized **Google Play testing service** built for the 12-tester, 14-day closed testing requirement. Unlike generic QA agencies, we focus exclusively on Play Console compliance for indie and small-team developers.',
    sections: [
      section('What our testing service includes', `
Every $15 order includes:

- **15 professional Android testers** (buffer above 12 minimum)
- Assignment within **~1 hour** of submitting your closed testing link
- **16-day** active testing period on real devices
- **Dashboard** with progress, installs, and timeline
- **Reports** documenting testing activity
- **Refund policy** if Play rejects after a completed test (Google decides production access)
- **Email support** with typical replies in 1–2 business days

No subscription. No hidden fees. One payment per app.`),
      section('Who uses Fast Testers', `
- First-time Play Store publishers
- Indie game developers
- SaaS and utility app builders
- Agencies publishing client apps
- Developers rejected for insufficient testing
- Non-English markets needing reliable testers

Rated **4.6★ on Trustpilot**. Google decides production access; refund terms are on the refund policy page.`),
      section('How we differ from freelancers and Fiverr gigs', `
Many marketplace gigs offer "10 installs" via unreliable methods. Fast Testers testers:

- Join via official **Play Store closed testing link**
- Use diverse Android devices and regions
- Understand testing expectations
- Stay engaged for the full period

We are Google Play policy-aware, not generic install sellers.`),
      section('Enterprise and multi-app pricing', `
Testing multiple apps? Contact us for volume pricing on 5+ apps. Enterprise onboarding guide available at [/guides/enterprise-onboarding](/guides/enterprise-onboarding).`),
      section('Ready to Start Closed Testing?', SHARED_CTA),
    ],
    faq: [
      { question: 'Is this against Google Play policy?', answer: 'No. Closed testing with invited external testers is explicitly supported by Google.' },
      { question: 'How fast do testers start?', answer: 'Typically within one hour after you submit your closed testing opt-in link.' },
    ],
    relatedSlugs: ['android-closed-testing', 'android-app-testers', 'google-play-closed-testing'],
    ogImage: '/images/illustrations/app-testing.png',
  },

  'android-closed-testing': {
    slug: 'android-closed-testing',
    title: 'Android Closed Testing — Complete Guide for Google Play | Fast Testers',
    metaDescription:
      'Learn Android closed testing on Google Play: setup, tester management, 14-day rules, and how to graduate to production with real testers.',
    keywords: ['android closed testing', 'closed testing android app', 'google play closed test'],
    h1: 'Android Closed Testing: The Complete Google Play Guide',
    intro:
      '**Closed testing** is the Google Play track where you invite a limited set of testers via email or link before public release. For new developers, it is not optional — it is the gateway to production access.',
    sections: [
      section('Closed vs internal vs open testing', `
| Track | Testers | Visibility | Counts for production? |
|-------|---------|------------|-------------------------|
| Internal | Up to 100 team | Hidden | **No** |
| Closed | Invited users | Hidden | **Yes** |
| Open | Anyone can join | Public beta | No (different path) |

Use **closed testing** for the 12/14 requirement.`),
      section('Setting up closed testing in Play Console', `
1. Play Console → Your app → **Testing → Closed testing**
2. Create a new release → upload AAB
3. Add release notes → **Review and roll out**
4. Copy **opt-in URL** from Testers tab
5. Share link with testers (or submit to Fast Testers)

Allow 1–24 hours for Google review of your first closed release.`),
      section('Managing testers effectively', `
- Maintain **15+** enrolled to absorb dropout
- Send welcome email with opt-in instructions
- Monitor install count daily
- Push updates only when necessary mid-period
- Never share APK directly — always use Play link

Fast Testers automates recruitment and retention.`),
      section('Graduating to production', `
After 14 days with 12+ testers:

1. Play Console → **Production** → **Apply for access**
2. Complete questionnaire
3. Wait for approval email
4. Create production release from tested build

If denied, read rejection reason, fix, and reapply — testing period remains valid.`),
      section('Ready to Start Closed Testing?', SHARED_CTA),
    ],
    faq: [
      { question: 'Can closed testers see my unfinished app?', answer: 'Yes, invited testers can install and use the app. Use closed testing before your public marketing launch.' },
      { question: 'How many closed testing tracks can I have?', answer: 'Multiple tracks are supported (e.g., alpha, beta). Ensure testers join the track tied to your production access application.' },
    ],
    relatedSlugs: ['google-play-closed-testing', 'google-play-12-testers', 'google-play-testing-service'],
    ogImage: '/images/blog/closed-testing.png',
  },

  'free-testers': {
    slug: 'free-testers',
    title: 'Free Android Testers Community | Fast Testers',
    metaDescription:
      'Join the free Fast Testers community for peer Android testers. Free is slower and has no guarantee. Need 12 testers for 14 days now? Paid closed testing is 15 testers for 16 days for $15.',
    keywords: ['free android testers', 'free google play testers', 'tester community', 'google groups testers'],
    h1: 'Free Android Testers for Google Play Closed Testing',
    intro:
      'Looking for **free testers**? Join the Fast Testers peer community. Developers help each other opt into closed testing. It is **$0**, slower, and **not guaranteed**. If you need Google’s **12 testers for 14 consecutive days** on a deadline, the paid package assigns **15 real testers for 16 days for $15**.',
    keyTakeaways: [
      'The free community is a peer group at community.fasttesters.com — not a managed 12 testers / 14 days package.',
      'Free recruiting (Facebook, Telegram, Reddit, Google Groups) often fails because testers drop off during the 14-day window.',
      'Fast Testers paid closed testing is 15 testers for 16 days for $15 one-time. Google decides production access.',
    ],
    heroCta: { label: 'Join the free tester community', href: 'https://community.fasttesters.com/' },
    heroSecondaryCta: { label: 'Start closed testing — $15', href: 'https://app.fasttesters.com/' },
    sections: [
      section('What the free community is', `
The [Fast Testers community](https://community.fasttesters.com/) is a **peer tester group**. You can ask other Android developers to join your closed-testing opt-in link, and you can test their apps in return.

It is the right path if you have time, can coordinate installs yourself, and accept that testers may drop below 12 during the 14 consecutive days.`),
      section('What the free community is not', `
- It is **not** the $15 managed package (15 testers / 16 days).
- It does **not** guarantee Google’s 12 testers / 14 consecutive days requirement.
- It does **not** replace Play Console closed testing — testers still must install from your **closed testing** opt-in link. Internal testing does not count.

Google still decides production access either way.`),
      section('Free groups vs paid closed testing', `
Facebook groups, Telegram channels, Reddit threads, and Google Groups are the usual DIY options. They can work. They often do not — because people uninstall, forget, or never opt in.

| Path | Cost | Speed | 12 testers / 14 days |
|---|---|---|---|
| Free community / groups | $0 | Slow, unpredictable | You manage it |
| Fast Testers paid | $15 one-time | Testers assigned in about an hour | 15 testers for 16 days |

For a side-by-side of DIY, Fiverr, and groups, see [Compare](/compare).`),
      section('If you need testers now', `
Personal Play accounts created after 13 November 2023 typically must complete **12 testers for 14 consecutive days** of **closed testing** before applying for production.

[Start closed testing — $15](https://app.fasttesters.com/) · [Google’s 12 testers / 14 days rule](/google-play-12-testers)`),
    ],
    faq: [
      {
        question: 'Is the community really free?',
        answer: 'Yes. community.fasttesters.com is a peer group. There is no fee to join. There is also no managed tester assignment or refund-backed coverage.',
      },
      {
        question: 'Will free testers meet Google’s 12 / 14 rule?',
        answer: 'Only if you keep at least 12 real testers active on the closed testing track for 14 consecutive days. The community does not promise that. The $15 package assigns 15 testers for 16 days so you have a buffer.',
      },
      {
        question: 'Should I use Facebook or Telegram tester groups instead?',
        answer: 'You can. Those groups have the same drop-off risk. Compare them with paid testing on /compare. Join the Fast Testers community if you want a free peer option first.',
      },
    ],
    relatedSlugs: ['compare', 'google-play-12-testers', 'android-app-testers'],
    ogImage: '/images/illustrations/app-testing.png',
  },
};

export function getSeoLandingPage(slug: string): SeoLandingPageConfig | undefined {
  const config = SEO_LANDING_PAGES[slug];
  return config ? withAiDefaults(config) : undefined;
}

export function getAllSeoLandingSlugs(): string[] {
  return Object.keys(SEO_LANDING_PAGES);
}
