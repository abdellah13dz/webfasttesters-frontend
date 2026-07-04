import { hasAnalyticsConsent } from '@/lib/analytics-consent';
import { setMetaConsentChecker } from './track';

setMetaConsentChecker({ hasConsent: hasAnalyticsConsent });

export * from './track';
export type * from './types';
