import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import { setMetaConsentChecker } from '@meta-tracking/track';

setMetaConsentChecker({ hasConsent: hasAnalyticsConsent });

export * from '@meta-tracking/track';
