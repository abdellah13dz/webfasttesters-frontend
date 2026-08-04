import Page from '@/components/pages/cancellation-policy';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/cancellation-policy');

export default function RoutePage() {
  return (
    <PageSeoShell path="/cancellation-policy">
      <Page />
    </PageSeoShell>
  );
}
