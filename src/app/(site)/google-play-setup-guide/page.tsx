import Page from '@/components/pages/setup-guide';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/google-play-setup-guide');

export default function RoutePage() {
  return (
    <PageSeoShell path="/google-play-setup-guide">
      <Page />
    </PageSeoShell>
  );
}
