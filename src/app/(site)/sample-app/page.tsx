import Page from '@/components/pages/sample-app';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/sample-app');

export default function RoutePage() {
  return (
    <PageSeoShell path="/sample-app">
      <Page />
    </PageSeoShell>
  );
}
