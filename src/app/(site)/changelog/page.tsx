import Page from '@/components/pages/changelog';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/changelog');

export default function RoutePage() {
  return (
    <PageSeoShell path="/changelog">
      <Page />
    </PageSeoShell>
  );
}
