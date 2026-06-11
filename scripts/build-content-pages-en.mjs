/**
 * Builds content-pages/en.ts from structured namespace data.
 * Run: node scripts/build-content-pages-en.mjs
 */
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/lib/i18n/locales/content-pages/en.ts');

const en = {};

function add(ns, entries) {
  for (const [k, v] of Object.entries(entries)) {
    en[`${ns}.${k}`] = v;
  }
}

// ─── androidAppTesters ───
add('androidAppTesters', {
  heroBadge: 'Android App Testing',
  heroTitlePrefix: 'Android App Testers Who Actually',
  heroTitleShowUp: 'Show Up',
  heroTitleStayFor: '14 Days',
  heroTitle: 'Android App Testers Who Actually Show Up & Stay for 14 Days',
  heroDescription:
    'Stop scrambling to find testers on Reddit, Discord, or among friends. Get 14 verified Android app testers assigned to your app within hours — real people, real devices, real feedback.',
  ctaGetTesters: 'Get 14 Android Testers for $15',
  ctaLearnClosedTesting: 'Learn About Closed Testing',
  challengeBadge: 'The Challenge',
  challengeTitle: 'The Android Developer Challenge',
  challengeSubtitle:
    "Every new Android developer faces the same frustrating cycle when trying to meet Google Play's testing requirements.",
  challenge1Title: 'Google Play Requires 12+ Testers for 14 Days',
  challenge1Desc:
    'New personal developer accounts must run closed testing with at least 12 testers for 14 consecutive days before publishing. Finding and managing that many reliable testers is a major hurdle.',
  challenge2Title: "Friends Don't Provide Real Feedback",
  challenge2Desc:
    'Your friends and family will install your app and say "it\'s great!" — but they won\'t find the bugs or give you the honest, detailed feedback you need to improve your app and pass review.',
  challenge3Title: 'Reddit & Discord Testers Ghost',
  challenge3Desc:
    "You spend hours posting on Reddit and Discord, and testers initially seem interested. But within days, they stop responding, leave the testing track, and you're back to square one.",
  challenge4Title: 'Managing Testers Manually Takes Too Much Time',
  challenge4Desc:
    "Coordinating with testers, sending reminders, tracking who's still active, and collecting feedback — it's a full-time job that takes you away from actually building your app.",
  whatYouGetBadge: 'What You Get',
  whatYouGetTitle: 'Everything You Need to Pass Closed Testing',
  feature1Title: '14 Verified Testers',
  feature1Desc:
    'We assign 14 professional testers to your app — more than the 12 minimum required by Google Play. This buffer ensures you always meet the requirement even if a few testers drop off.',
  feature2Title: 'Real Devices',
  feature2Desc:
    'Our testers use real Android devices — not emulators. This means you get feedback from actual hardware with real network conditions, screen sizes, and Android versions.',
  feature3Title: 'Genuine Feedback',
  feature3Desc:
    'Each tester provides detailed, constructive feedback about your app\'s usability, performance, and bugs. No generic "looks good" reviews — real insights that help you improve.',
  feature4Title: '14-Day Continuity',
  feature4Desc:
    'Our testers stay active for the full 14-day period required by Google Play. We monitor participation daily and replace any testers who become inactive to ensure continuous coverage.',
  feature5Title: 'Comprehensive Reports',
  feature5Desc:
    'Receive detailed testing reports including bug reports, UX feedback, device-specific issues, and screenshots. Everything you need to improve your app and pass Google Play review.',
  comparisonBadge: 'Comparison',
  comparisonTitle: 'Why Professional Testers Beat Free Options',
  comparisonSubtitle: "Free testers cost you time, and time is money. Here's the honest comparison.",
  tableFeature: 'Feature',
  tableFreeTesters: 'Free Testers',
  tableProfessionalTesters: 'Professional Testers',
  compare1: 'Testers actually show up',
  compare2: 'Stay for full 14 days',
  compare3: 'Provide detailed feedback',
  compare4: 'Real device testing',
  compare4Free: 'sometimes',
  compare5: 'Bug reports with screenshots',
  compare6: 'Active monitoring & replacement',
  compare7: 'Guaranteed production access',
  compare8: 'Time to set up',
  compare8Free: '5+ hours',
  compare8Pro: '5 minutes',
  compare9: 'Ongoing management',
  compare9Free: 'You handle it',
  compare9Pro: 'We handle it',
  statAppsPublished: '1,500+',
  statAppsPublishedLabel: 'Apps Published',
  statSuccessRate: '99.9%',
  statSuccessRateLabel: 'Success Rate',
  statStartTime: '6 Hours',
  statAvgStartTime: 'Average Start Time',
  ctaTitle: 'Ready to Get Your App Published?',
  ctaDescription:
    'Stop wasting weeks chasing unreliable testers. Get 14 verified Android app testers assigned to your app within hours. Professional testing, guaranteed results, and production access — all for just $15.',
  ctaFootnote: 'One-time payment · No subscriptions · 100% money-back guarantee',
});

// ─── multiLanguage ───
const languages = [
  ['Vietnamese', 'VI'], ['German', 'DE'], ['Russian', 'RU'], ['Portuguese', 'PT'], ['Spanish', 'ES'],
  ['French', 'FR'], ['Turkish', 'TR'], ['Thai', 'TH'], ['Polish', 'PL'], ['Japanese', 'JA'],
  ['Korean', 'KO'], ['Italian', 'IT'], ['Dutch', 'NL'], ['Hindi', 'HI'], ['Arabic', 'AR'],
  ['Indonesian', 'ID'], ['Malay', 'MS'], ['Ukrainian', 'UK'], ['Czech', 'CS'], ['Romanian', 'RO'],
];
const ml = {
  heroBadge: 'International Testing',
  heroTitlePrefix: 'Get 12+ Testers for 14 Days for',
  heroTitleHighlight: 'International Apps',
  heroTitle: 'Get 12+ Testers for 14 Days for International Apps',
  heroDescription:
    "Google Play Console closed testing for international apps. Production access guaranteed in any language. We provide native-speaking testers who understand your app's target market.",
  ctaGetInternationalTesters: 'Get International Testers',
  ctaLearnClosedTesting: 'Learn About Closed Testing',
  coverImageAlt: 'Multi-Language App Testing Guide',
  languagesBadge: '30+ Languages Supported',
  languagesTitle: 'Supported Languages',
  languagesSubtitle:
    'We provide native-speaking testers for all major languages. Here are some of our most popular options, plus 20+ more.',
  languagesFooter: "Don't see your language? Contact us — we support 30+ languages and can add more on request.",
  howItWorksBadge: 'How It Works',
  howItWorksTitle: 'How It Works for International Apps',
  step1Title: 'Submit Your App',
  step1Description:
    "Share your app's Play Store link and specify the language(s) you need testers for. We support 30+ languages and can provide testers who are native speakers.",
  step2Title: 'Language-Matched Testers',
  step2Description:
    "We assign professional testers who speak your app's target language natively. This ensures feedback is relevant and reviews are written in the correct language.",
  step3Title: 'Testing Begins',
  step3Description:
    "Within 6 hours, your assigned testers will start using your app. They'll test all features, navigate through your app in their native language, and provide detailed feedback.",
  step4Title: 'Production Access',
  step4Description:
    "After the 14-day testing period, you'll have everything you need for production access — regardless of your app's language.",
  whyItMattersBadge: 'Why It Matters',
  whyItMattersTitle: 'Why Language Matters for Testing',
  whyItMattersSubtitle:
    "Getting the language right isn't just about translation — it's about providing a testing experience that reflects how real users will interact with your app.",
  benefit1Title: 'Reviews in the Right Language',
  benefit1Desc:
    'Google Play expects reviews from testers to be in the language your app targets. If your app is in German but reviews are in English, it can raise red flags and lead to rejection.',
  benefit2Title: 'Cultural Context Matters',
  benefit2Desc:
    'A tester who speaks the language natively understands cultural nuances, common UI patterns in their region, and can identify localization issues that a non-native speaker would miss.',
  benefit3Title: 'Localized Device Testing',
  benefit3Desc:
    'Our testers use devices set to their native language and region. This means they can catch issues with date formats, currency symbols, text direction (RTL languages), and more.',
  benefit4Title: 'Global App Market',
  benefit4Desc:
    'The Google Play Store is global. If your app targets users in specific countries, having testers from those regions gives you a significant advantage in understanding your market.',
  statLanguages: '30+',
  statLanguagesLabel: 'Languages Supported',
  statCountries: '50+',
  statCountriesLabel: 'Countries Covered',
  statSuccessRate: '99.9%',
  statSuccessRateLabel: 'Success Rate',
  ctaTitle: 'Get International Testers',
  ctaDescription:
    'Whether your app is in Vietnamese, German, Russian, or any other language — we have native-speaking testers ready to help you get production access on Google Play.',
  ctaButton: 'Get International Testers for $15',
  ctaFootnote: 'One-time payment · 30+ languages · Native-speaking testers',
};
languages.forEach(([name, code], i) => {
  ml[`language${i + 1}Name`] = name;
  ml[`language${i + 1}Code`] = code;
});
add('multiLanguage', ml);

// ─── productionAccess ───
add('productionAccess', {
  heroBadgeTesters: '12 testers for 14 days',
  heroBadgePrice: '$15 one-time',
  heroBadgeApproval: '99% approval rate',
  heroTitlePrefix: 'Get Google Play',
  heroTitleHighlight: 'Production Access',
  heroTitle: 'Get Google Play Production Access',
  heroSubtitle: 'Google Play Closed Testing $15 | 12 Testers for Production Access',
  heroDescription:
    "New Google Play developer accounts require closed testing before publishing. We provide 14 verified testers who stay for 16 days — guaranteed to meet Google Play's requirements and get your app to production.",
  ctaGetProductionAccess: 'Get Production Access for $15',
  ctaLearnClosedTesting: 'Learn About Closed Testing',
  understandingBadge: 'Understanding the Requirement',
  whatIsTitle: 'What is Production Access?',
  whatIsP1:
    'Since 2024, Google Play requires all new personal developer accounts to complete a closed testing phase before they can publish apps to production. This means you need at least 12 testers who actively test your app for 14 consecutive days.',
  whatIsP2:
    'Only after successfully completing this testing period can you apply for production access and publish your app to the Google Play Store for all users to download.',
  requirementsTitle: 'Google Play Requirements',
  requirement1: 'New personal accounts must complete closed testing',
  requirement2: 'Minimum 12 testers required',
  requirement3: 'Testing must last 14 consecutive days',
  requirement4: 'Testers must provide genuine feedback',
  requirement5: 'Low-quality reviews may be flagged',
  howItWorksBadge: 'How It Works',
  howItWorksTitle: 'Get Production Access in 4 Simple Steps',
  step1Label: 'Step 1',
  step1Title: 'Pay $15',
  step1Description:
    'Make a one-time payment of $15. No subscriptions, no hidden fees. Just a simple, upfront payment for professional testing services.',
  step2Label: 'Step 2',
  step2Title: 'Submit Your App',
  step2Description:
    "Share your app's Play Store link or APK with us. We'll set everything up on our end and get your testing track configured.",
  step3Label: 'Step 3',
  step3Title: '14 Testers Start',
  step3Description:
    "Within 6 hours, 14 professional testers will be assigned to your app. They'll install your app and begin the 14-day testing period.",
  step4Label: 'Step 4',
  step4Title: 'Production Access',
  step4Description:
    "After the testing period completes successfully, you'll be eligible for production access on Google Play. We guarantee it — or your money back.",
  whatsIncludedBadge: "What's Included",
  whatsIncludedTitle: 'Everything You Need for Production Access',
  include1Title: '14 Professional Testers',
  include1Desc:
    "More than double the required 12 testers. This buffer ensures you always meet Google Play's requirements, even if some testers become inactive.",
  include2Title: '16-Day Testing Period',
  include2Desc:
    'We run testing for 16 days — 2 days beyond the 14-day requirement. This extra buffer ensures there are no gaps in your testing continuity.',
  include3Title: 'Production Access Guarantee',
  include3Desc:
    "If your app doesn't get production access after our testing period, we'll run another round of testing for free. That's how confident we are in our service.",
  include4Title: 'Comprehensive Reports',
  include4Desc:
    'Get detailed testing reports including bug reports, usability feedback, device compatibility notes, and suggestions for improvement.',
  include5Title: '24/7 Support',
  include5Desc:
    'Our support team is available around the clock to answer your questions, troubleshoot issues, and ensure your testing runs smoothly.',
  stat1Value: '99.9%',
  stat1Label: 'Success Rate',
  stat1Desc: 'Apps get production access',
  stat2Value: '6 Hours',
  stat2Label: 'Start Time',
  stat2Desc: 'Average time to begin testing',
  stat3Value: '1,500+',
  stat3Label: 'Apps Published',
  stat3Desc: 'Successfully launched on Play Store',
  ctaTitle: 'Get Production Access for $15',
  ctaDescription:
    "Stop struggling with Google Play's closed testing requirements. Get 14 professional testers, 16 days of testing, and a guaranteed path to production access — all for a one-time payment of $15.",
  ctaFootnote: 'One-time payment · No subscriptions · 100% money-back guarantee',
});

// ─── referralProgram ───
add('referralProgram', {
  heroTitlePrefix: 'App Testing Referral Program —',
  heroTitleHighlight: 'Earn 20% Commission',
  heroTitle: 'App Testing Referral Program — Earn 20% Commission',
  heroTagline: 'Share a link, get 20% of every sale',
  heroDescription:
    'Recommend Fast Testers to fellow developers. When they purchase, you earn 20% of their first order. No caps, no approvals, paid out fast.',
  ctaGetReferralLink: 'Get your referral link',
  ctaReadTerms: 'Read the terms',
  dashboardBadge: 'Your Dashboard Preview',
  dashboardTitle: 'Track Your Earnings',
  dashboardSubtitle: 'See your referral performance at a glance',
  dashboardCardTitle: 'Referral Dashboard',
  statTotalEarned: 'Total Earned',
  statTotalEarnedValue: '$847.20',
  statReferrals: 'Referrals',
  statReferralsValue: '47 signups',
  statConverted: 'Converted',
  statConvertedValue: '12 (25.5%)',
  statBalance: 'Balance',
  statBalanceValue: '$64.20',
  chartMonthStart: 'Jan',
  chartMonthEnd: 'Dec',
  howItWorksTitle: 'How It Works',
  howItWorksHighlight: 'Works',
  howItWorksSubtitle: 'Three simple steps to start earning',
  step1Title: 'Get your referral link',
  step1Description:
    'Sign in to your dashboard and copy your unique referral link. It takes just 10 seconds.',
  step2Title: 'Share with developers',
  step2Description:
    'Share your link on social media, in communities, or directly with fellow developers who need testing.',
  step3Title: 'Earn 20% when they purchase',
  step3Description:
    'When someone signs up through your link and makes their first purchase, you earn 20% of their order value.',
  benefitsTitle: 'Why Join?',
  benefitsHighlight: 'Join?',
  benefitsSubtitle: 'Benefits that make our referral program stand out',
  benefit1Title: 'Free to join',
  benefit1Desc: 'No fees, no minimum audience size required',
  benefit2Title: 'No minimum audience',
  benefit2Desc: 'Whether you have 10 followers or 10,000, you can participate',
  benefit3Title: 'Activate in 10 seconds',
  benefit3Desc: 'Just sign in, grab your link, and start sharing immediately',
  benefit4Title: 'No caps on earnings',
  benefit4Desc: 'Earn unlimited commissions — the more you refer, the more you earn',
  whoItsForTitle: 'Who Is This For?',
  whoItsForHighlight: 'For?',
  whoItsForSubtitle: 'Perfect for anyone who connects with app developers',
  audience1Title: 'YouTubers',
  audience1Desc: 'Share in video descriptions or community posts',
  audience2Title: 'Community Builders',
  audience2Desc: 'Share in Discord, Slack, or Facebook groups',
  audience3Title: 'No-Code Agencies',
  audience3Desc: 'Recommend to clients who need app testing',
  audience4Title: 'Developers',
  audience4Desc: 'Share with colleagues and fellow developers',
  ctaTitle: 'Ready to Start Earning?',
  ctaDescription:
    'Join our referral program today and earn 20% commission on every developer you refer. No caps, no minimums — just simple, fast earnings.',
});

// ─── setupGuide ───
const sg = {
  heroBadge: 'Setup Guide',
  heroBadgeUpdated: 'Updated March 2026',
  heroTitlePrefix: 'Google Play Console',
  heroTitleHighlight: 'Setup Guide',
  heroTitle: 'Google Play Console Setup Guide',
  heroDescription:
    "A complete step-by-step guide to setting up your Google Play Developer account, configuring closed testing, and getting your app published. Follow these steps and you'll be on the Play Store in no time.",
  stepLabel: 'Step',
  weHelpHereBadge: 'We Help Here',
  tipsHeading: 'Tips',
  mistakesHeading: 'Common Mistakes',
  step4HighlightTitle: "Need Testers? We've Got You Covered",
  step4HighlightDescription:
    'Step 4 is where most developers get stuck. Finding 12+ reliable testers who stay for 14 days is harder than it sounds. Let us handle it — get 14 professional testers for just $15.',
  ctaGetTesters: 'Get 14 Professional Testers for $15',
  ctaFreeTesterOptions: 'Free Tester Options',
  quickRefTitle: 'Quick Reference',
  quickRefSubtitle: 'Everything you need at a glance.',
  quickRefFee: '$25',
  quickRefFeeLabel: 'Developer Account Fee',
  quickRefTesters: '12+',
  quickRefTestersLabel: 'Testers Required',
  quickRefDays: '14',
  quickRefDaysLabel: 'Days of Testing',
  ctaTitle: 'Ready to Set Up Your App?',
  ctaDescription:
    "Follow this guide step by step, and when you get to Step 4, let us handle the testers. 14 professional testers for $15 — it's the easiest part of the process.",
  ctaFootnote: 'One-time payment · 14 guaranteed testers · Production access guarantee',
};
const setupSteps = [
  {
    title: 'Create Google Play Developer Account',
    subtitle: '$25 one-time fee',
    description:
      "Visit the Google Play Console and sign up for a developer account. You'll need a Google account and a one-time $25 registration fee. Fill in your developer profile, including your developer name and contact information.",
    tips: [
      'Use a Gmail account you check regularly — Google sends important notifications',
      "Choose your developer name carefully — it's visible to users on the Play Store",
      'Personal accounts require closed testing; organization accounts do not',
    ],
    mistakes: [
      "Using an email you don't check regularly",
      "Choosing a developer name you might want to change later (it's hard to change)",
      'Setting up as a personal account when you have an organization',
    ],
  },
  {
    title: 'Set Up Your App Listing',
    subtitle: 'Store listing information',
    description:
      'Create a new app in the Play Console and fill in all required store listing information. This includes your app name, short and full descriptions, screenshots, feature graphic, app icon, content rating, and privacy policy URL.',
    tips: [
      'Your privacy policy URL must be accessible — a broken or missing URL is a common rejection reason',
      'Screenshots should represent actual app functionality, not mockups',
      'Write descriptions that accurately describe what your app does',
      'Complete the content rating questionnaire honestly',
    ],
    mistakes: [
      'Using placeholder screenshots or descriptions',
      'Forgetting to add a privacy policy URL',
      'Inaccurate content rating that gets flagged later',
      'Copying descriptions from other apps',
    ],
  },
  {
    title: 'Configure Closed Testing',
    subtitle: 'Set up your testing track',
    description:
      'Navigate to Testing → Closed Testing in the Play Console. Create a new testing track and upload your app bundle (AAB) or APK. Fill in the release notes and configure your testing settings.',
    tips: [
      'Use Android App Bundle (AAB) instead of APK for smaller download sizes',
      "Write clear release notes explaining what's in this version",
      'You can update your app during testing without resetting the 14-day counter',
      "Make sure your app is functional — don't upload a half-finished product",
    ],
    mistakes: [
      'Uploading a debug build instead of a release build',
      'Forgetting to sign your app with your production keystore',
      'Not testing the uploaded build yourself first',
    ],
  },
  {
    title: 'Add Testers',
    subtitle: 'This is where we help',
    description:
      'In the Closed Testing section, add testers by creating email lists or Google Groups. You need at least 12 testers who will stay active for 14 consecutive days. This is the step where most developers get stuck — finding reliable testers is challenging.',
    tips: [
      'Use Fast Testers to get 14 guaranteed professional testers for $15',
      'If using free methods, recruit significantly more than 12 to account for drop-offs',
      'Send welcome emails to your testers explaining what you need from them',
      'Consider offering incentives for testers who stay the full period',
    ],
    mistakes: [
      "Only adding 12 testers with no buffer — you'll likely fall short",
      'Not communicating with testers about expectations',
      "Relying only on friends and family who won't provide honest feedback",
      'Waiting too long to add testers after uploading your app',
    ],
  },
  {
    title: 'Run 14-Day Testing Period',
    subtitle: 'Monitor and maintain participation',
    description:
      'Once testers join and install your app, the 14-day testing period begins. Monitor tester activity in the Play Console to ensure all testers remain active throughout the period. You can release updates during this time without resetting the counter.',
    tips: [
      'Check tester activity daily in the Play Console',
      'If testers become inactive, add replacements immediately',
      'Release updates if testers find bugs — this shows active development',
      'Engage with tester feedback and respond to their concerns',
    ],
    mistakes: [
      'Not monitoring tester activity — you may not realize testers have dropped off',
      'Ignoring tester feedback instead of addressing their concerns',
      'Making major changes to your testing track that could reset the counter',
      'Not releasing updates for bugs that testers report',
    ],
  },
  {
    title: 'Apply for Production Access',
    subtitle: 'The final step',
    description:
      "After successfully completing the 14-day testing period, you can apply for production access through the Play Console. Google will review your testing data, app quality, and tester feedback. If everything meets their requirements, you'll be granted access to publish your app.",
    tips: [
      'Make sure your app listing is complete and accurate before applying',
      'Review all tester feedback and address any major issues',
      'Ensure your privacy policy and content rating are up to date',
      "Be patient — Google's review process can take a few days",
    ],
    mistakes: [
      'Applying before the 14-day period is truly complete',
      'Not addressing critical bugs reported by testers',
      'Having incomplete store listing information',
      'Submitting with low-quality or suspicious tester reviews',
    ],
  },
];
setupSteps.forEach((step, i) => {
  const n = i + 1;
  sg[`step${n}Title`] = step.title;
  sg[`step${n}Subtitle`] = step.subtitle;
  sg[`step${n}Description`] = step.description;
  step.tips.forEach((tip, j) => { sg[`step${n}Tip${j + 1}`] = tip; });
  step.mistakes.forEach((m, j) => { sg[`step${n}Mistake${j + 1}`] = m; });
});
add('setupGuide', sg);

// ─── guideEnterprise ───
add('guideEnterprise', {
  heroBadge: 'Enterprise',
  heroBadgeSetup: '< 10 min setup',
  heroTitlePrefix: 'Agency & Enterprise',
  heroTitleHighlight: 'Onboarding Guide',
  heroTitle: 'Agency & Enterprise Onboarding Guide',
  heroDescription:
    "Everything your agency or company needs to start using Fast Testers for your clients' apps.",
  heroTimelineSteps: '3 simple steps',
  heroTimelineSetup: '< 10 min setup',
  alertTitle: 'Launching multiple client apps?',
  alertText:
    'Book a 30-Minute Call with our founder to discuss your agency needs and get set up quickly.',
  alertLink: 'Book a call →',
  ctaGetStarted: 'Get Started Now',
  ctaBookCall: 'Book a 30-Minute Call',
  gettingStartedBadge: 'Getting Started',
  stepsTitle: 'Onboard in 3 Simple Steps',
  stepsHighlight: '3 Simple Steps',
  step1Title: 'Create Your Account',
  step1Description: 'Sign up and set up your agency or company profile in minutes.',
  step1Detail1: 'Create your Fast Testers account',
  step1Detail2: 'Set up your agency profile with company details',
  step1Detail3: 'Configure billing and notification preferences',
  step1Detail4: 'Invite team members to your workspace',
  step2Title: 'Add Client Apps',
  step2Description: 'Submit multiple apps and let volume pricing work in your favor.',
  step2Detail1: 'Submit your first client app in under 2 minutes',
  step2Detail2: 'Add as many apps as you need — no limits',
  step2Detail3: 'Volume pricing applies when you submit 5+ apps',
  step2Detail4: 'Each app gets its own testing track and dashboard',
  step3Title: 'Track Progress',
  step3Description:
    'Monitor all client apps from a single dashboard with manual testing reports from real testers.',
  step3Detail1: 'View all client apps on a unified dashboard',
  step3Detail2: 'Track testing progress, tester counts, and status in real-time',
  step3Detail3: 'Download detailed human-tester reports for each client app',
  step3Detail4: 'Receive notifications when testing milestones are reached',
  benefitsBadge: 'Why Agencies Choose Us',
  benefitsTitle: 'Built for Agencies',
  benefitsHighlight: 'Agencies',
  benefitsSubtitle: 'We understand the unique needs of agencies managing multiple client apps.',
  benefit1Title: 'White-Label Reports',
  benefit1Desc:
    "Download professional testing reports branded with your agency's logo and colors. Present them directly to your clients as your own work.",
  benefit2Title: 'Volume Pricing',
  benefit2Desc:
    'The more apps you submit, the less you pay per app. Volume discounts start at just 5 apps, with custom pricing for 10+ apps.',
  benefit3Title: 'Priority Support',
  benefit3Desc:
    'Skip the queue with priority access to our support team. Get faster responses and dedicated assistance for any issues with your client apps.',
  benefit4Title: 'Dedicated Account Manager',
  benefit4Desc:
    'For agencies with 10+ apps, get a dedicated account manager who understands your business needs and ensures smooth onboarding for every client.',
  pricingBadge: 'Agency Pricing',
  pricingTitle: 'Volume Discounts',
  pricingHighlight: 'Discounts',
  pricingSubtitle: 'The more apps you test, the more you save. Volume pricing starts at 5 apps.',
  tier1Range: '1–4 apps',
  tier1Price: '$15',
  tier1PriceNote: 'per app',
  tier1Feature1: '14 professional testers per app',
  tier1Feature2: '16-day testing period',
  tier1Feature3: 'Production access guarantee',
  tier1Feature4: 'Standard support',
  tier2Range: '5–9 apps',
  tier2Price: '$12',
  tier2PriceNote: 'per app',
  tier2Feature1: 'Everything in the standard plan',
  tier2Feature2: '20% volume discount',
  tier2Feature3: 'Priority support',
  tier2Feature4: 'White-label reports',
  tier2Badge: 'Most Popular',
  tier3Range: '10+ apps',
  tier3Price: 'Custom',
  tier3PriceNote: 'contact us',
  tier3Feature1: 'Everything in volume plan',
  tier3Feature2: 'Custom pricing',
  tier3Feature3: 'Dedicated account manager',
  tier3Feature4: 'Agency dashboard',
  tier3Feature5: 'SLA guarantees',
  tier3Cta: 'Contact Sales',
  tierCta: 'Get Started',
  ctaTitle: 'Ready to Scale Your Agency?',
  ctaDescription:
    'Join hundreds of agencies who trust Fast Testers to handle their client app testing. Get started in under 10 minutes, or book a call to discuss your specific needs.',
});

// ─── partners ───
add('partners', {
  heroBadge: 'Our Partners',
  heroTitlePrefix: 'Trusted by Leading',
  heroTitleHighlight: 'Companies & Developers',
  heroTitle: 'Trusted by Leading Companies & Developers',
  heroDescription:
    'We partner with industry leaders to support manual, human-led Google Play closed testing—real Android testers who install and use your app, never bots.',
  techPartnersBadge: 'Technology Partners',
  techPartnersTitle: 'Integrated with the Tools You Love',
  techPartnersSubtitle:
    'Tools many developers already use alongside our manual testing service—from Play Console setup to team notifications.',
  partner1Name: 'Google Play Console',
  partner1Description:
    'Manage closed testing tracks and production rollout steps in Play Console while Fast Testers supplies real human testers—not bots or scripts.',
  partner1Category: 'Integration Partner',
  partner2Name: 'Firebase',
  partner2Description:
    'Optional crash and performance insights your team can review alongside feedback from our manual testers on real Android devices.',
  partner2Category: 'Developer Tools',
  partner3Name: 'Android Studio',
  partner3Description:
    'Native integration with Android Studio development tools, enabling direct plugin support for test configuration and deployment.',
  partner3Category: 'Development Tools',
  partner4Name: 'GitHub',
  partner4Description:
    'Coordinate releases and testing milestones with your team. Our closed-testing service remains manual testing by real people.',
  partner4Category: 'Workflow Integration',
  partner5Name: 'Slack',
  partner5Description:
    'Real-time team notifications for test results, reviewer feedback, and production access milestones directly in your channels.',
  partner5Category: 'Team Notifications',
  partner6Name: 'Stripe',
  partner6Description:
    'Secure payment processing for subscription management, invoicing, and seamless billing integration for enterprise clients.',
  partner6Category: 'Payment Processing',
  becomePartnerBadge: 'Become a Partner',
  becomePartnerTitle: 'Why Partner with Fast Testers?',
  becomePartnerSubtitle:
    'Join our growing ecosystem and unlock exclusive benefits designed to help your business thrive.',
  benefitCoMarketing: 'Co-Marketing Opportunities',
  benefitCoMarketingDesc:
    'Get featured in our blog, newsletter, and social channels. Joint campaigns and case studies help you reach thousands of Android developers.',
  benefitApiAccess: 'API & Integration Access',
  benefitApiAccessDesc:
    'Early access to our API and webhook integrations. Build custom workflows that connect Fast Testers testing into your platform or agency tools.',
  benefitRevenue: 'Revenue Sharing',
  benefitRevenueDesc:
    'Earn competitive commissions on every client you refer. Volume partners receive enhanced revenue share and dedicated payout support.',
  benefitPrioritySupport: 'Priority Partner Support',
  benefitPrioritySupportDesc:
    'Skip the queue with a dedicated partner support channel. Faster response times and a named contact for integration and billing questions.',
  testimonialsBadge: 'Partner Testimonials',
  testimonialsTitle: 'What Our Partners Say',
  testimonialsSubtitle:
    'Hear from the companies who have grown alongside us through our partnership program.',
  testimonial1Quote:
    'Fast Testers transformed how we deliver Google Play compliance to our clients. White-label reports and guaranteed testers let us focus on building apps, not chasing beta users.',
  testimonial1Author: 'Sarah Chen',
  testimonial1Role: 'Head of Mobile',
  testimonial1Company: 'DevStack Solutions',
  testimonial2Quote:
    'We integrated Fast Testers into our agency workflow in a day. Our clients get production access faster, and we look like heroes with professional testing reports.',
  testimonial2Author: 'Marcus Rivera',
  testimonial2Role: 'Founder',
  testimonial2Company: 'MobileFirst Inc.',
  testimonial3Quote:
    'The partner program pays for itself. Co-marketing exposure brought us new clients, and the revenue share on referrals is a steady secondary income stream.',
  testimonial3Author: 'Emily Nakamura',
  testimonial3Role: 'Partnerships Lead',
  testimonial3Company: 'AppVenture Labs',
  ctaTitle: 'Interested in Partnering?',
  ctaDescription:
    "We're always looking for innovative companies to join our ecosystem. Let's build something great together.",
  ctaGetInTouch: 'Get in Touch',
  ctaViewTiers: 'View Partnership Tiers',
});

// ─── changelog ───
add('changelog', {
  whatsNewBadge: "What's New",
  title: 'Changelog',
  subtitle: "See what's new in Fast Testers. We're constantly improving our platform.",
  newFeature: 'New Feature',
  improvement: 'Improvement',
  bugFix: 'Bug Fix',
  stayUpdatedBadge: 'Stay Updated',
  neverMissUpdate: 'Never Miss an Update',
  newsletterDesc:
    'Subscribe to our newsletter and be the first to know about new features, improvements, and platform updates.',
  getStartedNow: 'Get Started Now',
  entry1Date: 'March 2026',
  entry1Version: 'v2.4.0',
  entry1Title: 'Enhanced Dashboard Analytics',
  entry1Description:
    'Completely redesigned dashboard with advanced analytics, real-time charts, and deeper insights into your testing progress. Track tester engagement, daily activity, and completion rates at a glance.',
  entry2Date: 'February 2026',
  entry2Version: 'v2.3.0',
  entry2Title: 'Multi-Language Testing Support',
  entry2Description:
    'Now supporting 30+ languages for app testing. Your app can be tested by native speakers across the globe, ensuring your localization meets the highest standards before production launch.',
  entry3Date: 'January 2026',
  entry3Version: 'v2.2.0',
  entry3Title: 'Faster Tester Assignment',
  entry3Description:
    "We've reduced tester assignment time from 12 hours to just 6 hours. Our improved matching algorithm ensures the right testers are assigned to your app faster than ever.",
  entry4Date: 'December 2025',
  entry4Version: 'v2.1.0',
  entry4Title: 'Affiliate Program Launch',
  entry4Description:
    'Introducing the Fast Testers Affiliate Program! Earn commissions by referring other developers. Share your unique link and get rewarded for every successful referral.',
  entry5Date: 'November 2025',
  entry5Version: 'v2.0.0',
  entry5Title: 'New Dashboard Experience',
  entry5Description:
    'A complete overhaul of the user dashboard with a modern, intuitive design. Navigate your testing projects, view reports, and manage your account with ease.',
  entry6Date: 'October 2025',
  entry6Version: 'v1.5.0',
  entry6Title: 'Bug Fixes & Performance',
  entry6Description:
    'Fixed critical bugs affecting report generation and email notifications. Improved page load times by 40% and enhanced overall platform stability.',
});

// ─── status ───
add('status', {
  title: 'Service Status',
  subtitle: 'Monitor the operational status of all Fast Testers services in real-time.',
  allSystemsOperational: 'All Systems Operational',
  statusMonitoringAlt: 'Status Monitoring',
  lastCheckedPrefix: 'Last checked:',
  operational: 'Operational',
  operationalServices: 'Operational Services',
  serviceColumn: 'Service',
  statusColumn: 'Status',
  uptime: 'Uptime',
  '30dayUptime': '30-Day Uptime',
  appTesting: 'App Testing Service',
  testerAssignment: 'Tester Assignment Engine',
  dashboard: 'Dashboard & Analytics',
  payments: 'Payment Processing',
  email: 'Email Notifications',
  api: 'API Services',
  recentIncidents: 'Recent Incidents',
  scheduledMaintenance: 'Scheduled Maintenance',
  noMaintenance: 'No scheduled maintenance at this time.',
  resolved: 'Resolved',
  scheduled: 'Scheduled',
  investigating: 'Investigating',
  incidentDuration: 'Duration',
  incident1Title: 'Brief API Latency',
  incident1Date: 'Feb 28, 2026',
  incident1Status: 'Resolved',
  incident1Duration: '15 minutes',
  incident1Description:
    'Some API requests experienced higher than normal latency. Root cause identified and resolved.',
  incident2Title: 'Payment Gateway Maintenance',
  incident2Date: 'Feb 15, 2026',
  incident2Status: 'Scheduled',
  incident2Duration: '30 minutes',
  incident2Description:
    'Scheduled maintenance for payment gateway upgrade. All services remained available.',
  incident3Title: 'Dashboard Loading Slow',
  incident3Date: 'Jan 22, 2026',
  incident3Status: 'Resolved',
  incident3Duration: '45 minutes',
  incident3Description:
    'Dashboard pages experienced slow loading times due to database optimization. Issue resolved.',
});

// Import large namespaces from JSON file (appRejected, betaTesters, blog12Testers, closedTesting, guidePublish)
// These are embedded below via dynamic import from sibling extraction

const largeNamespaces = JSON.parse(
  readFileSync(join(__dirname, 'content-pages-large-namespaces.json'), 'utf8')
);

for (const [ns, entries] of Object.entries(largeNamespaces)) {
  add(ns, entries);
}

// Generate TypeScript file
const sections = [
  ['androidAppTesters', 'ANDROID APP TESTERS'],
  ['multiLanguage', 'MULTI-LANGUAGE APP TESTING'],
  ['productionAccess', 'PRODUCTION ACCESS'],
  ['referralProgram', 'REFERRAL PROGRAM'],
  ['setupGuide', 'SETUP GUIDE'],
  ['guideEnterprise', 'ENTERPRISE ONBOARDING GUIDE'],
  ['partners', 'PARTNERS'],
  ['changelog', 'CHANGELOG'],
  ['status', 'STATUS'],
  ['appRejected', 'APP REJECTED'],
  ['betaTesters', 'BETA TESTERS GUIDE'],
  ['blog12Testers', 'BLOG: 12 TESTERS POLICY'],
  ['closedTesting', 'CLOSED TESTING GUIDE'],
  ['guidePublish', 'GUIDE: PUBLISH ON GOOGLE PLAY'],
];

let ts = `export const contentPagesEn: Record<string, string> = {\n`;

for (const [ns, label] of sections) {
  const prefix = `${ns}.`;
  const keys = Object.keys(en).filter((k) => k.startsWith(prefix)).sort();
  if (keys.length === 0) continue;
  ts += `\n  // ═══════════════════════════════════════════════════════════════════════\n`;
  ts += `  // ${label}\n`;
  ts += `  // ═══════════════════════════════════════════════════════════════════════\n`;
  for (const key of keys) {
    const val = JSON.stringify(en[key]);
    ts += `  '${key}': ${val},\n`;
  }
}

ts += `};\n`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ts, 'utf8');
console.log('Written:', outPath);
console.log('Total keys:', Object.keys(en).length);
