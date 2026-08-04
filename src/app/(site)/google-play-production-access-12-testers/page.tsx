import Page from '@/components/pages/production-access';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/google-play-production-access-12-testers');

export default function RoutePage() {
  return (
    <PageSeoShell path="/google-play-production-access-12-testers">
      <Page />
    </PageSeoShell>
  );
}
