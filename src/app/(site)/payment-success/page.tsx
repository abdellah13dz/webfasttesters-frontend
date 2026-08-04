import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { PaymentSuccessPage } from '@/components/pages/payment-success';
import { PageSeoShell } from '@/components/page-seo-shell';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata = createPageMetadata('/payment-success');

function PaymentSuccessFallback() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
        <p className="text-sm text-muted-foreground">Confirming your payment...</p>
      </div>
    </section>
  );
}

export default function RoutePage() {
  return (
    <PageSeoShell path="/payment-success">
      <Suspense fallback={<PaymentSuccessFallback />}>
        <PaymentSuccessPage />
      </Suspense>
    </PageSeoShell>
  );
}
