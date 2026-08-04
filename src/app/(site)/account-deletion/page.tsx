import Page from '@/components/pages/account-deletion';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/account-deletion');

export default function RoutePage() {
  return (
    <PageSeoShell path="/account-deletion">
      <Page />
    </PageSeoShell>
  );
}
