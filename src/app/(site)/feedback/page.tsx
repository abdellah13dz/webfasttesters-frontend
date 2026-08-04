import Page from '@/components/pages/feedback';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/feedback');

export default function RoutePage() {
  return (
    <PageSeoShell path="/feedback">
      <Page />
    </PageSeoShell>
  );
}
