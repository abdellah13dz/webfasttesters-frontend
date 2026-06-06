import { CONTACT_EMAIL } from '@/lib/contact';

/** Legal entity operating the Fast Testers website and payment processing. */
export const LEGAL_ENTITY_NAME = 'Hassil LLC';

/** Consumer-facing brand name. */
export const BRAND_NAME = 'Fast Testers';

export const SUPPORT_EMAIL = CONTACT_EMAIL;

/** Display format for customer service (matches WhatsApp business line). */
export const SUPPORT_PHONE_DISPLAY = '+213 549 17 93 03';

export const SUPPORT_PHONE_TEL = '+213549179303';

/**
 * Registered business address — must match the address on your Stripe account.
 * Set via NEXT_PUBLIC_BUSINESS_ADDRESS_* environment variables before going live.
 */
export const BUSINESS_ADDRESS = {
  line1: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE1 ?? '',
  line2: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE2 ?? '',
  city: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_CITY ?? '',
  state: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_STATE ?? '',
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL ?? '',
  country: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY ?? 'United States',
};

export function formatBusinessAddress(): string {
  const { line1, line2, city, state, postalCode, country } = BUSINESS_ADDRESS;
  const cityLine = [city, state, postalCode].filter(Boolean).join(', ');
  return [line1, line2, cityLine, country].filter(Boolean).join('\n');
}

export function hasBusinessAddress(): boolean {
  return Boolean(BUSINESS_ADDRESS.line1 && BUSINESS_ADDRESS.city);
}

export const STRIPE_URL = 'https://stripe.com';
