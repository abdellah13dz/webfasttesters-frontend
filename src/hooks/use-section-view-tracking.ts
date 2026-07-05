'use client';

import { useEffect, useRef } from 'react';
import { trackGa4Event, type Ga4EventName } from '@/lib/ga4-events';

/** Fire a GA4 view event once when a section enters the viewport. */
export function useSectionViewTracking(
  eventName: Ga4EventName,
  page: string,
  options: { threshold?: number; enabled?: boolean } = {}
): React.RefObject<HTMLElement | null> {
  const { threshold = 0.25, enabled = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackGa4Event(eventName, page);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eventName, page, enabled, threshold]);

  return ref;
}
