import Page from '@/components/pages/contact-us';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/contact-us');

export default function RoutePage() {
  return (
    <PageSeoShell path="/contact-us">
      <Page />
    </PageSeoShell>
  );
}
