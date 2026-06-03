'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getPrimaryPlan, type PricingPlan } from '@/lib/pricing';

export function usePricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await apiFetch('/api/pricing');
        if (!res.ok) return;
        const data = (await res.json()) as PricingPlan[];
        if (!cancelled) setPlans(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPlans([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    plans,
    primaryPlan: getPrimaryPlan(plans),
    loading,
  };
}
