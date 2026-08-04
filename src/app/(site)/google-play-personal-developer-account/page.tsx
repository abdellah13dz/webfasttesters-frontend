import Page from '@/components/pages/seo-landing-page';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';
import { getSeoLandingPage } from '@/lib/seo-landing-pages';
import { notFound } from 'next/navigation';

export const metadata = createPageMetadata('/google-play-personal-developer-account');

export default function RoutePage() {
  const config = getSeoLandingPage('google-play-personal-developer-account');
  if (!config) notFound();
  return (
    <PageSeoShell path="/google-play-personal-developer-account" faq={config.faq}>
      <Page config={config} />
    </PageSeoShell>
  );
}
