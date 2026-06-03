'use client';

import { useEffect, useState } from 'react';
import { fetchSiteSettings, type SiteNavigation } from '@/lib/site-settings';
import { FALLBACK_NAVIGATION } from '@/lib/navigation';

export function useSiteNavigation(): SiteNavigation {
  const [navigation, setNavigation] = useState<SiteNavigation>(FALLBACK_NAVIGATION);

  useEffect(() => {
    (async () => {
      const settings = await fetchSiteSettings();
      if (settings?.navigation) {
        setNavigation(settings.navigation);
      }
    })();
  }, []);

  return navigation;
}
