import { SiteShell } from '@/components/layout/site-shell';

/**
 * Static shell — metadata and JSON-LD are provided per-page so routes can be
 * statically generated / ISR'd (critical for TTFB and crawl efficiency).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
