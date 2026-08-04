import Page from '@/components/pages/seo-landing-page';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';
import { getSeoLandingPage } from '@/lib/seo-landing-pages';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata('/android-closed-testing');

export default function RoutePage() {
  const config = getSeoLandingPage('android-closed-testing');
  if (!config) notFound();
  return (
    <PageSeoShell path="/android-closed-testing" faq={config.faq}>
      <Page config={config} />
    </PageSeoShell>
  );
}
