export function getMetaPixelId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  return id || undefined;
}

export function isMetaPixelConfigured(): boolean {
  return Boolean(getMetaPixelId());
}

/** Base URL for CAPI proxy (no trailing slash). */
export function getMetaCapiProxyUrl(): string {
  const override = process.env.NEXT_PUBLIC_META_CAPI_PROXY_URL?.trim();
  if (override) return override;
  return '/api/meta/events';
}

/** Domains that share this pixel for cross-domain attribution. */
export const META_LINKED_DOMAINS = [
  'fasttesters.com',
  'www.fasttesters.com',
  'app.fasttesters.com',
] as const;
