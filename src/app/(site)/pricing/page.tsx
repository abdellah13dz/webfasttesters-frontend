import Page from '@/components/pages/pricing';
import { PageSeoShell } from '@/components/page-seo-shell';
import { getPricingFaqSchemaEntries } from '@/lib/faq-schema-entries';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/pricing');

export default function RoutePage() {
  return (
    <PageSeoShell path="/pricing" faq={getPricingFaqSchemaEntries()}>
      <Page />
    </PageSeoShell>
  );
}
