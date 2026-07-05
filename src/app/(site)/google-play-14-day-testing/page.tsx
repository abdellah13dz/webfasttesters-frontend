import Page from '@/components/pages/seo-landing-page';
import { getSeoLandingPage } from '@/lib/seo-landing-pages';
import { notFound } from 'next/navigation';

export default function RoutePage() {
  const config = getSeoLandingPage('google-play-14-day-testing');
  if (!config) notFound();
  return <Page config={config} />;
}
