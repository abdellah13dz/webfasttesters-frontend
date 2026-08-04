import Page from '@/components/pages/about-us';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/about-us');

export default function RoutePage() {
  return (
    <PageSeoShell path="/about-us">
      <Page />
    </PageSeoShell>
  );
}
