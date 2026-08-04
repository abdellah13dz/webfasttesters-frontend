import Page from '@/components/pages/how-it-works';
import { PageSeoShell } from '@/components/page-seo-shell';
import { getHowItWorksFaqSchemaEntries } from '@/lib/faq-schema-entries';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/how-it-works');

export default function RoutePage() {
  return (
    <PageSeoShell path="/how-it-works" faq={getHowItWorksFaqSchemaEntries()}>
      <Page />
    </PageSeoShell>
  );
}
