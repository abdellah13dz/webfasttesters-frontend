import Page from '@/components/pages/seo-landing-page';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';
import { getSeoLandingPage } from '@/lib/seo-landing-pages';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata('/google-play-12-testers');

export default function RoutePage() {
  const config = getSeoLandingPage('google-play-12-testers');
  if (!config) notFound();
  return (
    <PageSeoShell path="/google-play-12-testers" faq={config.faq}>
      <Page config={config} />
    </PageSeoShell>
  );
}
