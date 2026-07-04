import { getFbc, getFbp } from './cookies';

/**
 * Append Meta attribution params when navigating to another FastTesters domain.
 * Preserves _fbp/_fbc across fasttesters.com ↔ app.fasttesters.com.
 */
export function appendMetaCrossDomainParams(url: string): string {
  if (typeof window === 'undefined') return url;

  let parsed: URL;
  try {
    parsed = new URL(url, window.location.origin);
  } catch {
    return url;
  }

  const host = parsed.hostname.toLowerCase();
  const isLinkedDomain =
    host === 'fasttesters.com' ||
    host === 'www.fasttesters.com' ||
    host === 'app.fasttesters.com' ||
    host.endsWith('.fasttesters.com');

  if (!isLinkedDomain) return url;

  const fbp = getFbp();
  const fbc = getFbc();

  if (fbp && !parsed.searchParams.has('_fbp')) {
    parsed.searchParams.set('_fbp', fbp);
  }
  if (fbc && !parsed.searchParams.has('_fbc')) {
    parsed.searchParams.set('_fbc', fbc);
  }

  return parsed.toString();
}

/** Restore _fbc from cross-domain URL params on app landing. */
export function captureMetaParamsFromUrl(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const fbc = params.get('_fbc');
  const fbp = params.get('_fbp');

  if (fbc) {
    try {
      sessionStorage.setItem('ft_meta_fbclid', fbc);
    } catch {
      /* ignore */
    }
  }

  if (fbp) {
    try {
      const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `_fbp=${encodeURIComponent(fbp)}; path=/; expires=${expires}; SameSite=Lax`;
    } catch {
      /* ignore */
    }
  }
}
