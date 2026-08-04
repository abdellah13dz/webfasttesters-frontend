import HomePage from '@/components/pages/home';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/');

export default function RoutePage() {
  return (
    <PageSeoShell path="/">
      <HomePage />
    </PageSeoShell>
  );
}
