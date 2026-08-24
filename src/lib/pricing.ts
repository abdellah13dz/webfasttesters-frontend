export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string | null;
  features: string;
  popular: boolean;
  active: boolean;
}

export function formatPlanPrice(plan: Pick<PricingPlan, 'price' | 'currency'>): string {
  const price = typeof plan.price === 'number' && Number.isFinite(plan.price) ? plan.price : 15;
  const currency = plan.currency || 'USD';
  if (currency === 'USD') {
    const value = price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
    return `$${value}`;
  }
  return `${currency} ${price}`;
}

/** Correct stale CMS/API product facts without changing Google’s 12 testers / 14-day requirement. */
export function correctPlanFeatureCopy(feature: string): string {
  return feature
    .replace(/\b14 Professional Testers\b/gi, '15 Professional Testers')
    .replace(/\b14 Quality Testers\b/gi, '15 Quality Testers')
    .replace(/\b14-Day Testing Period\b/gi, '16-Day Testing Period')
    .replace(/\b14 Day Testing Period\b/gi, '16-Day Testing Period');
}

export function parsePlanFeatures(features: unknown): string[] {
  try {
    if (Array.isArray(features)) {
      return features.map(String).map(correctPlanFeatureCopy);
    }
    if (typeof features !== 'string' || !features.trim()) return [];
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed.map(String).map(correctPlanFeatureCopy) : [];
  } catch {
    return [];
  }
}

export function getPrimaryPlan(plans: PricingPlan[]): PricingPlan | null {
  if (plans.length === 0) return null;
  return plans.find((plan) => plan.popular) ?? plans[0];
}
