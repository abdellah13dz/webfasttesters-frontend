import Page from '@/components/pages/referral-program';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/app-testing-referral-program');

export default function RoutePage() {
  return (
    <PageSeoShell path="/app-testing-referral-program">
      <Page />
    </PageSeoShell>
  );
}
