import Page from '@/components/pages/partners';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/partners');

export default function RoutePage() {
  return (
    <PageSeoShell path="/partners">
      <Page />
    </PageSeoShell>
  );
}
