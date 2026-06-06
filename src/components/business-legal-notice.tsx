'use client';

import { useLanguage } from '@/lib/i18n/context';
import {
  BRAND_NAME,
  LEGAL_ENTITY_NAME,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  formatBusinessAddress,
  hasBusinessAddress,
} from '@/lib/business';
import { CONTACT_MAILTO } from '@/lib/contact';
import { StripePoweredBadge } from '@/components/stripe-powered-badge';
import { Mail, MapPin, Phone } from 'lucide-react';

type BusinessLegalNoticeProps = {
  variant?: 'footer' | 'compact';
};

export function BusinessLegalNotice({ variant = 'footer' }: BusinessLegalNoticeProps) {
  const { t } = useLanguage();
  const address = formatBusinessAddress();

  const operatedBy = t('legal.operatedBy')
    .replace('{brand}', BRAND_NAME)
    .replace('{entity}', LEGAL_ENTITY_NAME);

  if (variant === 'compact') {
    return (
      <div className="space-y-2 text-xs text-muted-foreground">
        <p>{operatedBy}</p>
        <StripePoweredBadge label={t('legal.poweredByStripe')} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-xs text-muted-foreground">
      <div className="space-y-2">
        <p className="font-medium text-foreground/80">{t('legal.ownershipTitle')}</p>
        <p>{operatedBy}</p>
        <p>{t('legal.servicesDescription')}</p>
        <StripePoweredBadge label={t('legal.poweredByStripe')} className="pt-1" />
      </div>

      <div className="space-y-2">
        <p className="font-medium text-foreground/80">{t('legal.customerServiceTitle')}</p>
        <div className="flex items-start gap-2">
          <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <a href={CONTACT_MAILTO} className="hover:text-blue-500 transition-colors">
            {SUPPORT_EMAIL}
          </a>
        </div>
        <div className="flex items-start gap-2">
          <Phone className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="hover:text-blue-500 transition-colors">
            {SUPPORT_PHONE_DISPLAY}
          </a>
        </div>
        <p>{t('legal.responseTime')}</p>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-foreground/80">{t('legal.businessAddressTitle')}</p>
        {hasBusinessAddress() ? (
          <div className="flex items-start gap-2 whitespace-pre-line">
            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>{address}</span>
          </div>
        ) : (
          <p>{t('legal.addressOnRequest')}</p>
        )}
      </div>
    </div>
  );
}
