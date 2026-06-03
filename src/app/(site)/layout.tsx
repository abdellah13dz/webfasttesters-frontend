import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { SiteShell } from '@/components/layout/site-shell';
import { SiteJsonLd } from '@/components/site-json-ld';
import { buildMetadataForPath } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/';
  return buildMetadataForPath(pathname);
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteJsonLd />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
