export type MetaStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'AddPaymentInfo'
  | 'InitiateCheckout'
  | 'Purchase';

export type MetaCustomEvent =
  | 'Login'
  | 'SubmitClosedTesting'
  | 'FeedbackReportViewed'
  | 'QuestionnaireCompleted';

export type MetaEventName = MetaStandardEvent | MetaCustomEvent;

export interface MetaUserDataInput {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  externalId?: string | null;
}

export interface MetaTrackOptions {
  eventId?: string;
  userData?: MetaUserDataInput;
  customData?: Record<string, string | number | boolean | null | undefined>;
  /** Skip server-side CAPI mirror (e.g. when server fires authoritatively). */
  serverMirror?: boolean;
}

export interface MetaCapiProxyPayload {
  eventName: MetaEventName;
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: 'website';
  userData?: MetaUserDataInput;
  customData?: Record<string, string | number | boolean | null | undefined>;
  fbp?: string | null;
  fbc?: string | null;
}

export interface MetaConsentChecker {
  hasConsent: () => boolean;
}

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

export type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: FbqFunction;
};
