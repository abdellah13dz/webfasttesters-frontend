import Link from 'next/link';
import { buildMetadataForPath } from '@/lib/page-metadata';

export const metadata = buildMetadataForPath('/404', {
  title: 'Page Not Found - Fast Testers',
  description:
    'The page you requested could not be found. Browse Fast Testers guides on Google Play closed testing, pricing, and production access.',
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-2 text-sm font-medium text-blue-500">404</p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mb-8 text-muted-foreground">
        This URL does not exist or may have moved. Try one of these popular pages instead.
      </p>
      <nav aria-label="Helpful links" className="flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/" className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600">
          Home
        </Link>
        <Link href="/pricing" className="rounded-md border border-border px-4 py-2 hover:bg-muted">
          Pricing
        </Link>
        <Link href="/how-it-works" className="rounded-md border border-border px-4 py-2 hover:bg-muted">
          How it works
        </Link>
        <Link href="/blog" className="rounded-md border border-border px-4 py-2 hover:bg-muted">
          Blog
        </Link>
        <Link href="/faq" className="rounded-md border border-border px-4 py-2 hover:bg-muted">
          FAQ
        </Link>
      </nav>
    </div>
  );
}
