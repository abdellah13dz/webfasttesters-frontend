import Page from '@/components/pages/reviews';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/reviews');

export default function RoutePage() {
  return (
    <PageSeoShell path="/reviews">
      <Page />
    </PageSeoShell>
  );
}
