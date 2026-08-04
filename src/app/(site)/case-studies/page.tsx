import Page from '@/components/pages/case-studies';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/case-studies');

export default function RoutePage() {
  return (
    <PageSeoShell path="/case-studies">
      <Page />
    </PageSeoShell>
  );
}
