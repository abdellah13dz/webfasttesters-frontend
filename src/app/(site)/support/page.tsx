import Page from '@/components/pages/support';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/support');

export default function RoutePage() {
  return (
    <PageSeoShell path="/support">
      <Page />
    </PageSeoShell>
  );
}
