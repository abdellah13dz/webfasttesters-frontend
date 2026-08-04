import Page from '@/components/pages/privacy';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/privacy-policy');

export default function RoutePage() {
  return (
    <PageSeoShell path="/privacy-policy">
      <Page />
    </PageSeoShell>
  );
}
