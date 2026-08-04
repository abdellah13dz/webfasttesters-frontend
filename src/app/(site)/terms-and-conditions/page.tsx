import Page from '@/components/pages/terms';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/terms-and-conditions');

export default function RoutePage() {
  return (
    <PageSeoShell path="/terms-and-conditions">
      <Page />
    </PageSeoShell>
  );
}
