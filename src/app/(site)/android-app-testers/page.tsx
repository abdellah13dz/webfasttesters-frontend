import Page from '@/components/pages/android-app-testers';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/android-app-testers');

export default function RoutePage() {
  return (
    <PageSeoShell path="/android-app-testers">
      <Page />
    </PageSeoShell>
  );
}
