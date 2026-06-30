import type { MetadataRoute } from 'next';
import { BRAND_ICONS } from '@/lib/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fast Testers - Professional App Testing Service',
    short_name: 'Fast Testers',
    description:
      'Google Play Closed Testing service — get production access with 12 testers for 14 days. 15 quality testers for $15, assigned instantly. 99.9% success rate.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    icons: [
      {
        src: BRAND_ICONS.android192,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: BRAND_ICONS.android512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: BRAND_ICONS.android512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'developer-tools'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
  };
}
