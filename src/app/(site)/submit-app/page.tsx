import Page from '@/components/pages/submit-app';
import { PageSeoShell } from '@/components/page-seo-shell';
import { getSubmitAppFaqSchemaEntries } from '@/lib/faq-schema-entries';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/submit-app');

export default function RoutePage() {
  return (
    <PageSeoShell path="/submit-app" faq={getSubmitAppFaqSchemaEntries()}>
      <Page />
    </PageSeoShell>
  );
}
