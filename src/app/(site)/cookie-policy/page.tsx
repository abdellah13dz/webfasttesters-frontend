import Page from '@/components/pages/cookie-policy';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/cookie-policy');

export default function RoutePage() {
  return (
    <PageSeoShell path="/cookie-policy">
      <Page />
    </PageSeoShell>
  );
}
