import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, 'content-pages-large-namespaces.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

data.blog12Testers = {
  heroTitlePrefix: 'Google Play –',
  heroTitleHighlight: '12 Testers',
  heroTitleSuffix: 'for 14 Days',
  metaDate: 'January 5, 2026',
  metaReadTime: '5 min read',
  metaViews: '12.4K views',
  coverImageAlt: 'Google Play 12 Testers for 14 Days',
  introP1:
    "If you're a new Android developer trying to publish your first app on Google Play, you've likely encountered the \"12 testers for 14 days\" requirement. This policy, introduced by Google in late 2023, has become one of the most discussed topics in the Android developer community — and one of the biggest hurdles for new developers.",
  introP2:
    "In this article, we'll break down exactly what this requirement means, who it applies to, why Google implemented it, and most importantly, how you can meet it efficiently and get your app published.",
  section1Title: 'What Is the "12 Testers for 14 Days" Policy?',
  section1P1:
    'The "12 testers for 14 days" policy is Google Play\'s requirement that new personal developer accounts must complete a closed testing phase before they can publish apps to production. Specifically, you need at least 12 unique testers who install and actively engage with your app for 14 consecutive days before you can apply for production access.',
  keyRequirementsTitle: 'Key Requirements',
  keyRequirement1: 'Minimum 12 testers must join your closed testing track',
  keyRequirement2: 'Testers must install and actively use your app',
  keyRequirement3: 'The 14-day period must be consecutive with no gaps',
  keyRequirement4: 'Testers should provide genuine, meaningful feedback',
  section2Title: 'Who Does It Apply To?',
  section2P1:
    'This requirement applies specifically to personal developer accounts created after November 13, 2023. If you created your Google Play developer account before this date, or if you have an organization account, you are not subject to this closed testing requirement.',
  notRequiredLabel: 'NOT Required',
  notRequiredItem1: 'Organization accounts',
  notRequiredItem2: 'Personal accounts created before Nov 13, 2023',
  notRequiredItem3: 'Accounts that already have production access',
  requiredLabel: 'Required',
  requiredItem1: 'Personal accounts created after Nov 13, 2023',
  requiredItem2: 'New developers publishing their first app',
  requiredItem3: 'Accounts with no previous production apps',
  section3Title: 'Why Did Google Implement This?',
  section3P1:
    'Google introduced this requirement to combat the growing problem of spam and low-quality apps on the Play Store. Before this policy, anyone could pay $25 and instantly publish apps — leading to a flood of spam apps, clone apps, and low-effort submissions that cluttered the store and harmed the user experience.',
  section3P2: 'The 14-day testing requirement serves as a quality filter:',
  section3Benefit1Label: 'Reduces spam:',
  section3Benefit1Text: "Spammers won't bother running 14-day tests for throwaway apps",
  section3Benefit2Label: 'Improves quality:',
  section3Benefit2Text: 'Apps get real user feedback before reaching the public',
  section3Benefit3Label: 'Protects users:',
  section3Benefit3Text: 'Users are less likely to encounter broken or malicious apps',
  section4Title: 'What Counts as a Tester?',
  section4P1:
    "Not just anyone who downloads your app counts as a tester for Google Play's closed testing requirement. Google has specific criteria for what constitutes a valid tester:",
  testerCriteria1Title: 'Real users with Google accounts',
  testerCriteria1Description: 'Testers must sign in with a valid Google account',
  testerCriteria2Title: 'Active engagement',
  testerCriteria2Description: 'They must install the app and use it meaningfully',
  testerCriteria3Title: 'Unique individuals',
  testerCriteria3Description: 'Each tester must be a different person (no duplicate accounts)',
  testerCriteria4Title: 'Consistent participation',
  testerCriteria4Description: 'Testers should remain active throughout the 14-day period',
  section5Title: 'Common Misconceptions',
  misconception1Title: 'Misconception: Emulators count as testers',
  misconception1RealityLabel: 'Reality:',
  misconception1Reality:
    'Google can detect emulators and virtual devices. Testers should use real Android devices. Using emulators may result in your testing period being invalidated.',
  misconception2Title: 'Misconception: Friends are good enough for testing',
  misconception2RealityLabel: 'Reality:',
  misconception2Reality:
    'While friends can be testers, they often provide generic feedback like "it\'s nice" or "looks good." Google may flag low-quality or generic reviews. Professional testers provide detailed, actionable feedback.',
  misconception3Title: 'Misconception: You only need exactly 12 testers',
  misconception3RealityLabel: 'Reality:',
  misconception3Reality:
    'You need 12 testers who stay active for the full period. If some testers drop off, you may fall below the threshold. We recommend 14+ testers as a safety buffer.',
  section6Title: 'How to Meet the Requirement',
  section6P1:
    'There are several ways to find testers for your closed testing period. Here are your options:',
  option1Title: 'Professional Testing Service (Recommended)',
  option1Description:
    'Services like Fast Testers provide 14 verified, professional testers who stay for the full 14-day period. This is the most reliable option — with a 99.9% success rate for production access. Starting at $15 per app.',
  option1Cta: 'Get Professional Testers',
  option2Title: 'Free Community Marketplace',
  option2Description:
    "Use developer forums and social media groups where developers can share their apps and community members volunteer to test. It's free but has no guarantee that testers will stay for the full period.",
  option3Title: 'Social Media & Forums',
  option3Description:
    'Reddit (r/androiddev), Discord servers, and Facebook groups can be sources of testers. However, response rates are typically low and testers often ghost after a few days.',
  section7Title: 'Free vs Professional Testing',
  compareHeaderFeature: 'Feature',
  compareHeaderFree: 'Free',
  compareHeaderProfessional: 'Professional',
  compareRowCost: 'Cost',
  compareRowCostFree: '$0',
  compareRowCostProfessional: '$15',
  compareRowTesters: 'Number of testers',
  compareRowTestersFree: 'Varies',
  compareRowTestersProfessional: '14 guaranteed',
  compareRowRetention: 'Tester retention',
  compareRowRetentionFree: 'Low',
  compareRowRetentionProfessional: '100%',
  compareRowFeedback: 'Feedback quality',
  compareRowFeedbackFree: 'Basic',
  compareRowFeedbackProfessional: 'Professional',
  compareRowGuarantee: 'Production guarantee',
  compareRowTime: 'Time investment',
  compareRowTimeFree: '5–10 hours',
  compareRowTimeProfessional: '5 minutes',
  section8Title: 'Tips for Success',
  tip1Title: 'Make sure your app is stable',
  tip1Description:
    'Test your app thoroughly before submitting it to the closed testing track. Crashes and bugs will lead to negative feedback and may cause testers to stop using your app.',
  tip2Title: 'Respond to tester feedback',
  tip2Description:
    'When testers report issues or provide feedback, acknowledge it and fix problems quickly. This shows Google that your testing is genuine and helps improve your app.',
  tip3Title: 'Use more than 12 testers',
  tip3Description:
    'Always have a buffer above the 12-tester minimum. If a tester drops off, you could fall below the threshold and need to restart the 14-day period. We recommend at least 14.',
  tip4Title: "Don't rush the process",
  tip4Description:
    "The 14-day period can't be sped up. Use this time wisely — collect feedback, make improvements, and prepare your production release. The better your app is when you launch, the more successful it will be.",
  summaryText:
    'The "12 testers for 14 days" requirement is Google\'s quality gate for new developers. While it adds time to the publishing process, it ensures better apps reach users. Whether you choose free community testing or professional services, the key is having reliable testers who stay active for the full period.',
  authorName: 'Fast Testers Team',
  authorRole: 'Expert Guides & Resources',
  authorBio:
    "We help Android developers navigate Google Play's closed testing requirements and get their apps published. With 1,500+ apps successfully launched, we know what it takes to meet Google's standards.",
  relatedPost1Title: 'How to Find Beta Testers for Your Android App',
  relatedPost1ReadTime: '7 min read',
  relatedPost2Title: 'Google Play Closed Testing Complete Guide',
  relatedPost2ReadTime: '10 min read',
  relatedPost3Title: "App Rejected by Google Play? Here's What to Do",
  relatedPost3ReadTime: '6 min read',
  ctaTitle: 'Get 14 Professional Testers for $15',
  ctaDescription:
    'Skip the hassle and get guaranteed testers who stay for the full 14-day period. 99.9% production access success rate.',
  ctaButton: 'Get Professional Testers',
};

data.closedTesting = {
  heroBadgeGuide: 'Developer Guide',
  heroBadgeUpdated: 'Updated March 2026',
  heroTitlePrefix: 'Google Play Closed Testing:',
  heroTitleHighlight: 'Complete Guide 2026',
  heroDescription:
    'Every new personal Google Play developer account must pass closed testing before publishing an app. This guide explains everything you need to know about the requirement, how to set it up, and how to find reliable testers.',
  coverImageAlt: 'Google Play Closed Testing Complete Guide',
  tocTitle: 'Table of Contents',
  tocItem1: 'What is Closed Testing?',
  tocItem2: 'Internal vs Closed vs Open Testing',
  tocItem3: 'The 12+14 Requirement',
  tocItem4: 'Step-by-Step Setup Guide',
  tocItem5: 'Common Issues & Troubleshooting',
  tocItem6: 'Where to Find Testers',
  tocItem7: 'FAQ',
  overviewBadge: 'Overview',
  whatIsTitle: 'What is Closed Testing?',
  whatIsP1:
    'Closed testing is a mandatory phase for all new personal Google Play developer accounts. Before you can publish your app to the Google Play Store for all users, you must first run a closed testing period where a group of testers uses your app and provides feedback.',
  whatIsP2:
    'This requirement was introduced by Google to improve app quality on the Play Store and ensure that new developers are committed to building quality apps. The closed testing process helps identify bugs, usability issues, and other problems before an app reaches the general public.',
  whatIsP3:
    "During closed testing, your app is not publicly visible on the Play Store. Only testers you specifically invite can access and install your app. This creates a controlled environment where you can gather feedback without risking your app's public reputation.",
  comparisonBadge: 'Comparison',
  testingTypesTitle: 'Internal vs Closed vs Open Testing',
  testingTypesSubtitle:
    'Google Play offers three types of testing tracks. Understanding the differences is crucial for meeting the production access requirement.',
  requiredBadge: 'Required',
  labelWhoCanTest: 'Who Can Test',
  labelVisibility: 'Visibility',
  labelReviewProcess: 'Review Process',
  labelUseCase: 'Use Case',
  labelProductionAccess: 'Production Access',
  internalType: 'Internal Testing',
  internalWho: 'Up to 100 testers you choose by email',
  internalVisibility: 'Not visible on Play Store',
  internalReview: 'No Google review needed',
  internalUseCase: 'Quick internal QA before broader testing',
  internalRequirement: 'Not sufficient for production access',
  closedType: 'Closed Testing',
  closedWho: '12+ testers via email lists or Google Groups',
  closedVisibility: 'Not visible on Play Store',
  closedReview: 'Google reviews your app',
  closedUseCase: 'Required for new developer accounts',
  closedRequirement: '✓ Required for production access',
  openType: 'Open Testing',
  openWho: 'Anyone with the link can join',
  openVisibility: 'Listed on Play Store (optional)',
  openReview: 'Google reviews your app',
  openUseCase: 'Large-scale beta before production launch',
  openRequirement: 'Can also qualify for production access',
  coreRequirementBadge: 'The Core Requirement',
  requirementTitle: 'The 12+14 Requirement',
  requirementP1:
    'The closed testing requirement for new personal Google Play developer accounts can be summarized as the 12+14 rule:',
  requirement12Label: 'Testers Required',
  requirement12Description:
    'You must have at least 12 testers in your closed testing track. More is better — having 14+ provides a safety buffer.',
  requirement14Label: 'Consecutive Days',
  requirement14Description:
    'All 12+ testers must remain active for 14 consecutive days. Any gap in testing may reset the counter.',
  requirementP2:
    'This means you need to find at least 12 people who are willing to install your app, use it regularly, and provide feedback for two full weeks. For many developers — especially solo indie developers — this is the hardest part of getting their app on the Play Store.',
  requirementP3:
    'The testers must provide genuine, meaningful feedback. Google has systems to detect low-quality or fake reviews, and if your testers leave generic comments like "nice app" or "works great," your testing period may not count.',
  setupBadge: 'Setup Guide',
  setupTitle: 'Step-by-Step Setup Guide',
  setupSubtitle: 'Follow these steps to set up closed testing in your Google Play Console.',
  tipLabel: 'Tip:',
  setupStep1Title: 'Create a Google Play Developer Account',
  setupStep1Description:
    "Go to the Google Play Console and sign up for a developer account. There's a one-time $25 registration fee. Make sure your account is set up as a personal account (not organization) since the closed testing requirement applies to personal accounts.",
  setupStep1Tip:
    'Use a Gmail account you check regularly — Google will send important notifications about your testing status.',
  setupStep2Title: 'Create Your App Listing',
  setupStep2Description:
    "In the Play Console, create a new app and fill in all the required store listing information: app name, description, screenshots, feature graphic, content rating, and privacy policy. Your app doesn't need to be perfect yet, but it should be functional.",
  setupStep2Tip:
    'Make sure your privacy policy URL is accessible — a missing or broken privacy policy is one of the most common reasons for rejection.',
  setupStep3Title: 'Upload Your App to Closed Testing',
  setupStep3Description:
    'Navigate to Testing → Closed Testing in the Play Console. Create a new release and upload your app bundle (AAB) or APK. Fill in the release notes explaining what\'s in this version.',
  setupStep3Tip:
    "You can update your app during the testing period without resetting the 14-day counter, as long as you don't change the testing track.",
  setupStep4Title: 'Add Testers to Your Track',
  setupStep4Description:
    'In the Closed Testing section, add testers by creating email lists or Google Groups. You need at least 12 testers. This is where many developers get stuck — finding reliable testers who will actually stay for 14 days is challenging.',
  setupStep4Tip:
    'Consider using a professional testing service like Fast Testers to ensure you have reliable testers who won\'t ghost during the testing period.',
  setupStep5Title: 'Run the 14-Day Testing Period',
  setupStep5Description:
    'Once testers join your track and install your app, the 14-day testing period begins. All 12+ testers must remain active throughout the entire period. Monitor tester activity in the Play Console to ensure participation.',
  setupStep5Tip:
    'If a tester drops out, you may need to add a replacement. The 14-day period requires continuous testing — gaps can disqualify your testing period.',
  setupStep6Title: 'Apply for Production Access',
  setupStep6Description:
    'After successfully completing the 14-day closed testing period, you can apply for production access. Google will review your testing data and, if everything meets their requirements, grant you access to publish your app to all users on the Play Store.',
  setupStep6Tip:
    'Make sure your testers have provided genuine, meaningful feedback. Generic or suspicious reviews can lead to rejection even after completing the testing period.',
  troubleshootingBadge: 'Troubleshooting',
  issuesTitle: 'Common Issues & Troubleshooting',
  issuesSubtitle:
    'These are the most common problems developers face during closed testing, and how to solve them.',
  solutionLabel: 'Solution:',
  issue1Title: 'Not Enough Testers',
  issue1Description:
    "You need at least 12 testers, but finding that many reliable people is harder than it sounds. Friends drop off, Reddit testers ghost, and you're left scrambling.",
  issue1Solution: 'Use Fast Testers to get 14 guaranteed testers for $15.',
  issue2Title: "Testers Don't Stay for 14 Days",
  issue2Description:
    'Even if you find 12 testers initially, many will stop testing within a few days. The 14-day requirement means ALL testers must remain active throughout.',
  issue2Solution:
    'Professional testers are committed to the full period. We monitor and replace anyone who becomes inactive.',
  issue3Title: 'Low-Quality Reviews',
  issue3Description:
    'Google flags generic reviews like "good app" or "works fine" as low quality. Testers need to provide detailed, meaningful feedback about their experience.',
  issue3Solution:
    'Our testers provide detailed reviews covering usability, performance, bugs, and suggestions.',
  issue4Title: 'App Crashes During Testing',
  issue4Description:
    'If your app has critical bugs that cause crashes, testers may not be able to provide meaningful feedback. This can also affect your testing data quality.',
  issue4Solution:
    'Do thorough internal testing first, then use closed testing for real-world validation.',
  issue5Title: 'Testing Period Resets',
  issue5Description:
    'If too many testers drop off or if you make significant changes to your testing track, the 14-day counter might reset, forcing you to start over.',
  issue5Solution:
    "Having 14+ testers provides a buffer so drops don't affect your minimum requirement.",
  findingTestersBadge: 'Finding Testers',
  findingTestersTitle: 'Where to Find Testers',
  findingTestersSubtitle:
    'Finding reliable testers is the biggest challenge in closed testing. Here are your options, ranked by reliability:',
  rankBest: 'Best',
  rankGood: 'Good',
  rankOk: 'OK',
  rankRisky: 'Risky',
  testerOption1Title: 'Professional Testing Service (Fast Testers)',
  testerOption1Description:
    '$15 for 14 guaranteed testers who stay for the full period. Most reliable option — saves hours of coordination and comes with a production access guarantee.',
  testerOption2Title: 'Free Community Marketplace',
  testerOption2Description:
    "Fast Testers's free app lets you list your app and find volunteer testers. No cost, but testers may not stay for the full 14 days.",
  testerOption3Title: 'Reddit & Discord Communities',
  testerOption3Description:
    'Post on r/androiddev and Android Discord servers. Free but unreliable — expect high ghost rates and generic feedback.',
  testerOption4Title: 'Friends & Family',
  testerOption4Description:
    'Quick to set up, but they rarely provide honest feedback and almost never stay for the full 14 days. Not recommended as your primary testing group.',
  faq1Question: 'Who needs to do closed testing?',
  faq1Answer:
    'All new personal Google Play developer accounts created after a certain date must complete closed testing before they can publish apps to production. Organization accounts are exempt from this requirement.',
  faq2Question: 'How many testers do I need for closed testing?',
  faq2Answer:
    'You need a minimum of 12 testers in your closed testing track. They must all be active for 14 consecutive days. We recommend having 14+ testers as a safety buffer.',
  faq3Question: 'How long does closed testing take?',
  faq3Answer:
    'The minimum testing period is 14 consecutive days. All 12+ testers must remain active throughout this entire period. If there are gaps, the counter may reset.',
  faq4Question: 'Can I update my app during closed testing?',
  faq4Answer:
    "Yes, you can release updates to your app during the closed testing period. This won't reset the 14-day counter as long as you're updating within the same testing track.",
  faq5Question: 'What happens after closed testing is complete?',
  faq5Answer:
    'After successfully completing the 14-day testing period, you can apply for production access through the Google Play Console. Google will review your testing data and, if it meets their requirements, grant you access to publish your app.',
  faq6Question: 'Can I skip closed testing?',
  faq6Answer:
    'No, closed testing is mandatory for new personal developer accounts. You cannot publish to production without completing this requirement. The only exception is if you have an organization account.',
  faq7Question: 'What counts as "active" testing?',
  faq7Answer:
    'Google considers a tester active if they have installed your app and are using it regularly. Testers should provide meaningful interactions and feedback. Simply installing and never opening the app does not count.',
  faq8Question: 'Can I use emulators for testing?',
  faq8Answer:
    "Google prefers testers using real devices. While emulators technically work, testing on real devices provides more accurate results and is more likely to satisfy Google's quality requirements.",
  ctaTitle: 'Get Professional Testers for Closed Testing',
  ctaDescription:
    "Don't waste weeks struggling to find reliable testers. Get 14 professional testers assigned to your app within hours — guaranteed to meet Google Play's closed testing requirements.",
  ctaButton: 'Get Professional Testers for $15',
  ctaFootnote: 'One-time payment · 14 guaranteed testers · Production access guarantee',
};

data.guidePublish = {
  heroBadgeGuide: 'Step-by-Step Guide',
  heroBadgeUpdated: 'Updated April 2026',
  heroTitlePrefix: 'How to Publish an App on',
  heroTitleHighlight: 'Google Play Store',
  heroTitleYear: '(2026 Guide)',
  heroSubtitle: 'A straightforward, step-by-step guide to getting your Android app live on the Play Store.',
  timelineNewAccountsLabel: 'New Personal Accounts',
  timelineNewAccountsValue: '2–3 weeks',
  timelineOrganizationsLabel: 'Organizations',
  timelineOrganizationsValue: '3–7 days',
  alertTitle: 'New Personal Account? You Need Testers First.',
  alertDescription:
    'If your account was created after November 2023, you must run closed testing with 12+ testers for 14 days before publishing.',
  alertLink: 'Get testers now',
  coverImageAlt: 'How to Publish an App on Google Play Store',
  step1Title: 'Create a Google Play Developer Account',
  step1Timeline: '~15 minutes',
  step1Description:
    'Start by creating your Google Play Developer account. This is your gateway to publishing apps on the Play Store.',
  step1Detail1: 'Visit the Google Play Console and sign in with your Google account',
  step1Detail2: 'Pay the one-time $25 registration fee',
  step1Detail3: 'Complete your developer profile with your name and contact info',
  step1Detail4: 'Agree to the Developer Distribution Agreement',
  step1Tip:
    'Use the Google account you want permanently associated with your developer profile. You cannot change it later.',
  step1LinkLabel: 'Register at Google Play Console',
  step2Title: 'Set Up Your App Listing',
  step2Timeline: '~1-2 hours',
  step2Description:
    'Create your app in the Play Console and fill in all the essential listing information that users will see.',
  step2Detail1: 'Create a new app in the Play Console',
  step2Detail2: 'Add your app name (max 30 characters)',
  step2Detail3: 'Write a compelling short description (max 80 characters)',
  step2Detail4: 'Write a full description (max 4000 characters)',
  step2Detail5: 'Upload app icon (512x512 PNG), feature graphic (1024x500), and screenshots',
  step2Detail6: 'Select your app category and tags',
  step2Tip:
    'Invest time in your screenshots and feature graphic — they significantly impact your conversion rate. Use high-quality images showing real app functionality.',
  step3Title: 'Prepare Store Listing',
  step3Timeline: '~30-60 minutes',
  step3Description:
    'Complete the required questionnaires and declarations for your app to be eligible for distribution.',
  step3Detail1: 'Complete the Content Rating questionnaire (IARC) — required for all apps',
  step3Detail2: 'Fill out the Data Safety form — declare what user data your app collects',
  step3Detail3: 'Select your target audience and content settings',
  step3Detail4: 'Set pricing and distribution countries',
  step3Detail5: 'Add privacy policy URL (required if your app collects any data)',
  step3Tip:
    'Be accurate with the Data Safety form. Google can remove apps with incorrect declarations. When in doubt, declare that you collect the data.',
  step4Title: 'Set Up Closed Testing',
  step4Timeline: '14 days minimum',
  step4Description:
    'New personal accounts must run closed testing with at least 12 testers for 14 consecutive days before applying for production access.',
  step4Detail1: 'Create a closed testing track in the Play Console',
  step4Detail2: 'Upload your app bundle (AAB) or APK to the testing track',
  step4Detail3: 'Add testers via email lists or Google Groups',
  step4Detail4: 'Ensure at least 12 testers install and actively use your app',
  step4Detail5: 'Wait 14 consecutive days with testers remaining active',
  step4Detail6: 'Respond to tester feedback and address any reported issues',
  step4Tip:
    'Use our professional testing service to get 14 guaranteed testers who stay for the full period. This eliminates the risk of testers dropping off and having to restart.',
  step4LinkLabel: 'Get 14 Professional Testers',
  step5Title: 'Apply for Production Access',
  step5Timeline: '3-7 days review',
  step5Description:
    'After successfully completing closed testing, submit your app for review to gain production access.',
  step5Detail1: 'Go to the Production section in your Play Console',
  step5Detail2: 'Click "Start rollout to Production"',
  step5Detail3: 'Review and confirm your app details',
  step5Detail4: "Submit for Google's review process",
  step5Detail5: 'Wait for approval — typically 3-7 days for new accounts',
  step5Tip:
    'Make sure your closed testing data shows genuine engagement. Google reviews the quality of your testing period before granting production access.',
  step6Title: 'Publish Your App',
  step6Timeline: 'Immediate after approval',
  step6Description:
    'Once approved, your app is live on the Google Play Store for billions of users to discover and download.',
  step6Detail1: 'After approval, your app goes live on the Play Store',
  step6Detail2: 'Your app becomes searchable and discoverable',
  step6Detail3: 'You can now manage updates, track analytics, and respond to reviews',
  step6Detail4: 'Consider promoting your app through various channels',
  step6Tip:
    'The first 30 days after launch are critical. Monitor reviews closely, fix bugs quickly, and iterate based on user feedback to improve your ratings.',
  checklistHeading: 'What you need to do:',
  proTipLabel: 'Pro Tip',
  timelineHeading: 'Typical Timeline',
  ctaTitle: 'Need Testers? Get 14 Professional Testers for $15',
  ctaDescription:
    'Skip the hassle of finding testers yourself. Our professional testing service guarantees 14 testers who stay for the full 14-day period, with comprehensive feedback and a production access guarantee.',
  ctaButton: 'Get 14 Testers for $15',
  ctaFootnote: 'One-time payment · No subscriptions · 100% money-back guarantee',
};

writeFileSync(path, JSON.stringify(data, null, 2));
const counts = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, Object.keys(v).length]));
console.log('Namespace key counts:', counts);
console.log('Total:', Object.values(counts).reduce((a, b) => a + b, 0));
