import { CONTACT_EMAIL, WHATSAPP_PHONE_E164 } from '@/lib/contact';

/** Legal entity operating the Fast Testers website and payment processing. */
export const LEGAL_ENTITY_NAME = 'Hassil LLC';

/** Consumer-facing brand name. */
export const BRAND_NAME = 'Fast Testers';

export const SUPPORT_EMAIL = CONTACT_EMAIL;

/** Display format for customer service (matches WhatsApp business line). */
export const SUPPORT_PHONE_DISPLAY = '+213 549 17 93 03';

export const SUPPORT_PHONE_TEL = WHATSAPP_PHONE_E164;

/**
 * Registered business address — must match the address on your Stripe account.
 * Set via NEXT_PUBLIC_BUSINESS_ADDRESS_* environment variables before going live.
 */
export const BUSINESS_ADDRESS = {
  line1: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE1 ?? '30 N Gould St Ste N',
  line2: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE2 ?? '',
  city: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_CITY ?? 'Sheridan',
  state: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_STATE ?? 'WY',
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_POSTAL ?? '82801',
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
