import { appendMetaCrossDomainParams } from '@/lib/meta/cross-domain';
import { appendUtmToUrl } from '@/lib/utm-tracking';

const LINKED_HOSTS = new Set([
  'fasttesters.com',
  'www.fasttesters.com',
  'app.fasttesters.com',
  'community.fasttesters.com',
]);

export function isLinkedFastTestersHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (LINKED_HOSTS.has(host)) return true;
  return host.endsWith('.fasttesters.com');
}

/** Append Meta attribution + UTM params when navigating to Fast Testers domains. */
export function appendCrossDomainParams(url: string): string {
  if (typeof window === 'undefined') return url;
  return appendUtmToUrl(appendMetaCrossDomainParams(url));
}

/** Decorate all external links to linked domains on click. */
export function initCrossDomainLinkDecorator(): () => void {
  if (typeof document === 'undefined') return () => {};

  const handler = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    if (!anchor.href || anchor.target === '_blank') return;

    try {
      const parsed = new URL(anchor.href);
      if (!isLinkedFastTestersHost(parsed.hostname)) return;
      if (parsed.hostname === window.location.hostname) return;
      anchor.href = appendCrossDomainParams(anchor.href);
    } catch {
      /* ignore */
    }
  };

  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
}
