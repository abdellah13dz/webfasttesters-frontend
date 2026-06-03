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
  if (plan.currency === 'USD') {
    const value = plan.price % 1 === 0 ? plan.price.toFixed(0) : plan.price.toFixed(2);
    return `$${value}`;
  }
  return `${plan.currency} ${plan.price}`;
}

export function parsePlanFeatures(features: string): string[] {
  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function getPrimaryPlan(plans: PricingPlan[]): PricingPlan | null {
  if (plans.length === 0) return null;
  return plans.find((plan) => plan.popular) ?? plans[0];
}
