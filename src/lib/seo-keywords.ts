/**
 * Primary search phrases for Fast Testers (Google Play closed testing & app testing).
 * Deduplicated case-insensitively; used in meta keywords across the site.
 */
export const SITE_KEYWORDS = [
  'Google Play closed testing',
  'google play closed testing',
  'Google Play Closed Testing',
  'Google Play Closed Testing Service',
  'Start Closed Testing Today',
  'Closed Testing for Android Apps',
  'closed testing service',
  'Closed Testing Service',
  'closed test android app',
  'closed testing android',
  'play store closed testing',
  'Google Play Closed Test Support',
  '14 testers for Google Play',
  'Google Play 14 Testers',
  'google play 14 testers',
  '14 testers google play',
  '14 day testing google play',
  '14 day testing',
  '14-Day Closed Testing',
  '14-Day App Testing Support',
  'google play testing requirement 14 days',
  'Android app testing service',
  'android app testing',
  'Android App Testing Service',
  'Android App Testing Service for Developers Preparing for Google Play Release',
  'app testing service',
  'app testing service for google play',
  'App Testing for Google Play Store',
  'Google Play testing service',
  'google play testing service',
  'Google Play Testing Service',
  'mobile app testing',
  'Mobile App Testing Service',
  'Mobile App Testing for Developers',
  'software testing service',
  'qa testers for apps',
  'Google Play production access',
  'google play production access',
  'Google Play Production Access',
  'how to get google play production access',
  'Need testers for Google Play',
  'google play testers',
  'Google Play Tester Service',
  'google play test users',
  'android app testers',
  'Android App Testers',
  'Real Android Testers',
  'real android testers',
  'Real App Testers',
  'Real Android Testers for Your App',
  'app testers service',
  'Get Approved on Google Play',
  'Google Play App Approval',
  'Google Play Testing Requirements',
  'google play testing requirement',
  'google play compliance testing',
  'Google Play Compliance Testing',
  'android testing policy google play',
  'play store testing',
  'beta testing android app',
  'app beta testing',
  'app beta testing service',
  'google play app rejected testing',
  'Get Your App Ready for Launch',
  'Get Your App Tested Before Launch With Real Users and Detailed Feedback',
  'Meet Google Play 14-Day Testing Requirement With Real Android Testers',
  'Get real Android testers for your app with structured testing and feedback reports',
  'Support your Google Play Closed Testing requirements with real user testing sessions',
  'Test your app before launch and improve quality with detailed feedback from testers',
  'Get Google Play production access with 12 testers for 14 days',
  '15 quality testers for $15',
  'instant tester assignment',
  'testers assigned instantly',
  'google play 12 testers policy',
  'publish app on playstore',
  'google play console',
  'how to get testers',
  'fast testers',
  'quality testers',
] as const;

/** Comma-separated meta keywords string (max length safe for meta tag). */
export function keywordsToMetaString(
  keywords: readonly string[] = SITE_KEYWORDS,
  maxLength = 4000
): string {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const phrase of keywords) {
    if (phrase == null || typeof phrase !== 'string') continue;
    const trimmed = phrase.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(trimmed);
  }

  let result = unique.join(', ');
  if (result.length > maxLength) {
    result = result.slice(0, maxLength);
    const lastComma = result.lastIndexOf(', ');
    if (lastComma > 0) result = result.slice(0, lastComma);
  }
  return result;
}

/** Merge global keywords with page-specific phrases (deduped). */
export function mergeKeywords(...additional: Array<string | null | undefined>): string {
  const extras = additional.filter((s): s is string => typeof s === 'string' && s.trim().length > 0);
  return keywordsToMetaString([...SITE_KEYWORDS, ...extras]);
}

export const DEFAULT_KEYWORDS_META = keywordsToMetaString();
