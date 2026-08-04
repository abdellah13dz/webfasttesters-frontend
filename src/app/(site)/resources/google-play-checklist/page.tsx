import Page from '@/components/pages/google-play-checklist';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/resources/google-play-checklist');

export default function RoutePage() {
  return (
    <PageSeoShell path="/resources/google-play-checklist">
      <Page />
    </PageSeoShell>
  );
}
