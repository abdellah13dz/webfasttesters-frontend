const FBCLID_KEY = 'ft_meta_fbclid';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getFbp(): string | null {
  return readCookie('_fbp');
}

export function getFbc(): string | null {
  const fromCookie = readCookie('_fbc');
  if (fromCookie) return fromCookie;

  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(FBCLID_KEY);
    if (stored) return stored;
  } catch {
    /* ignore */
  }

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbclid) return null;

  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  try {
    sessionStorage.setItem(FBCLID_KEY, fbc);
  } catch {
    /* ignore */
  }
  return fbc;
}

/** Persist fbclid from landing URLs for cross-page attribution. */
export function captureFbclidFromUrl(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (!fbclid) return;
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  try {
    sessionStorage.setItem(FBCLID_KEY, fbc);
  } catch {
    /* ignore */
  }
}
