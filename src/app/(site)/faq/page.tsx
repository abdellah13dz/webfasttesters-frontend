import Page from '@/components/pages/faq';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/faq');

export default function RoutePage() {
  return (
    <PageSeoShell path="/faq">
      <Page />
    </PageSeoShell>
  );
}
