'use client';

import { Shield, Star, CreditCard, Users } from 'lucide-react';
import { TrustpilotWidget } from '@/components/trustpilot/trustpilot-widget';
import { useLanguage } from '@/lib/i18n/context';
import { trackGa4Event } from '@/lib/ga4-events';
import { useRouter } from '@/lib/router';

export function HomeTrustBar() {
  const { t } = useLanguage();
  const { currentPath } = useRouter();

  const handleTrustpilotClick = () => {
    trackGa4Event('trustpilot_click', currentPath);
  };

  return (
    <div className="border-y border-border/40 bg-muted/30 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          <div onClick={handleTrustpilotClick} className="w-full max-w-xs sm:max-w-sm">
            <TrustpilotWidget className="w-full" align="center" />
          </div>

          <div className="hidden lg:block h-10 w-px bg-border/60" />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-400" />
              {t('homeTrust.stripeSecure')}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              {t('homeTrust.developers')}
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              {t('homeTrust.guarantee')}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              {t('homeTrust.rating')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
