import Page from '@/components/pages/compare';
import { PageSeoShell } from '@/components/page-seo-shell';
import { getCompareFaqSchemaEntries } from '@/lib/faq-schema-entries';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/compare');

export default function RoutePage() {
  return (
    <PageSeoShell path="/compare" faq={getCompareFaqSchemaEntries()}>
      <Page />
    </PageSeoShell>
  );
}
