import Page from '@/components/pages/referral-policy';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/referral-policy');

export default function RoutePage() {
  return (
    <PageSeoShell path="/referral-policy">
      <Page />
    </PageSeoShell>
  );
}
