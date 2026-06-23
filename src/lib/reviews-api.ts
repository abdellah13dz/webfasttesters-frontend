import { apiFetch } from '@/lib/api';
import type { FetchReviewsOptions, Review } from '@/lib/types/review';

export async function fetchPublicReviews(options: FetchReviewsOptions = {}): Promise<Review[]> {
  const params = new URLSearchParams();
  if (options.featured) params.set('featured', 'true');
  if (options.caseStudy) params.set('caseStudy', 'true');
  if (options.excludeFeatured) params.set('excludeFeatured', 'true');
  if (options.limit) params.set('limit', String(options.limit));

  const query = params.toString();
  const res = await apiFetch(`/api/reviews${query ? `?${query}` : ''}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
