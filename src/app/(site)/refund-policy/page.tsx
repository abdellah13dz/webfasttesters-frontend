import Page from '@/components/pages/refund';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/refund-policy');

export default function RoutePage() {
  return (
    <PageSeoShell path="/refund-policy">
      <Page />
    </PageSeoShell>
  );
}
