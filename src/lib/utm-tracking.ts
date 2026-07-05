const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'campaign',
] as const;

export type UtmParam = (typeof UTM_PARAMS)[number];

export type UtmData = Partial<Record<UtmParam, string>>;

const STORAGE_KEY = 'ft_utm';
const COOKIE_KEY = 'ft_utm';
const COOKIE_MAX_AGE_DAYS = 90;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

export function parseUtmFromSearch(search: string): UtmData {
  const params = new URLSearchParams(search);
  const data: UtmData = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) data[key] = value;
  }
  return data;
}

export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return {};

  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (fromStorage) {
      const parsed = JSON.parse(fromStorage) as UtmData;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }

  try {
    const fromCookie = readCookie(COOKIE_KEY);
    if (fromCookie) {
      const parsed = JSON.parse(fromCookie) as UtmData;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }

  return {};
}

export function storeUtm(data: UtmData): void {
  if (typeof window === 'undefined') return;
  if (Object.keys(data).length === 0) return;

  const existing = getStoredUtm();
  const merged = { ...existing, ...data };
  const serialized = JSON.stringify(merged);

  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    /* ignore */
  }

  try {
    writeCookie(COOKIE_KEY, serialized);
  } catch {
    /* ignore */
  }
}

/** Capture UTM params from current URL and persist to cookie + localStorage. */
export function captureUtmFromUrl(): UtmData {
  if (typeof window === 'undefined') return {};
  const incoming = parseUtmFromSearch(window.location.search);
  if (Object.keys(incoming).length > 0) {
    storeUtm(incoming);
  }
  return getStoredUtm();
}

/** Restore UTM from cross-domain URL params (app landing). */
export function captureUtmFromCrossDomainUrl(): void {
  if (typeof window === 'undefined') return;
  captureUtmFromUrl();
}

export function appendUtmToUrl(url: string): string {
  if (typeof window === 'undefined') return url;

  const utm = getStoredUtm();
  if (Object.keys(utm).length === 0) return url;

  let parsed: URL;
  try {
    parsed = new URL(url, window.location.origin);
  } catch {
    return url;
  }

  for (const [key, value] of Object.entries(utm)) {
    if (value && !parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, value);
    }
  }

  return parsed.toString();
}

export function utmToMetadata(): Record<string, string> {
  const utm = getStoredUtm();
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(utm)) {
    if (value) out[key] = value;
  }
  return out;
}
