import Page from '@/components/pages/status';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/status');

export default function RoutePage() {
  return (
    <PageSeoShell path="/status">
      <Page />
    </PageSeoShell>
  );
}
