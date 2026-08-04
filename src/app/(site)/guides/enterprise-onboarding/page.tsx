import Page from '@/components/pages/guide-enterprise';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/guides/enterprise-onboarding');

export default function RoutePage() {
  return (
    <PageSeoShell path="/guides/enterprise-onboarding">
      <Page />
    </PageSeoShell>
  );
}
