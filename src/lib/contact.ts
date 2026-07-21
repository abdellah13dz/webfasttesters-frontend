/** Public contact channels for the marketing site */

/** WhatsApp business line — used for wa.me links and displayed support phone */
export const WHATSAPP_PHONE_E164 = '+213674799807';

/** Default pre-filled message for marketing-site WhatsApp CTAs */
export const DEFAULT_WHATSAPP_MESSAGE =
  'Hi Fast Testers, I have a question about Google Play closed testing.';

export function getWhatsAppUrl(text?: string): string {
  const digits = WHATSAPP_PHONE_E164.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  const msg = (text ?? DEFAULT_WHATSAPP_MESSAGE).trim();
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export const WHATSAPP_URL = getWhatsAppUrl();

export const CONTACT_EMAIL = 'contact@fasttesters.com';

export const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61570546142568';

export const INSTAGRAM_URL = 'https://www.instagram.com/testers.12/';

export const YOUTUBE_URL = 'https://www.youtube.com/@FastTesters';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const SOCIAL_PROFILES = [FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL] as const;
