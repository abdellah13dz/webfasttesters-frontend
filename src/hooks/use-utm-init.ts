'use client';

import { useEffect } from 'react';
import { captureUtmFromUrl } from '@/lib/utm-tracking';
import { initCrossDomainLinkDecorator } from '@/lib/cross-domain';

/** Initialize UTM capture and cross-domain link decoration once per session. */
export function useUtmInit(): void {
  useEffect(() => {
    captureUtmFromUrl();
    return initCrossDomainLinkDecorator();
  }, []);
}
