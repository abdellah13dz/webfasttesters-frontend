export interface Review {
  id: string;
  text: string;
  author: string;
  role: string | null;
  link: string | null;
  avatarUrl: string | null;
  appLink: string | null;
  appName: string | null;
  category: string | null;
  result: string | null;
  rating: number;
  visible: boolean;
  featured: boolean;
  caseStudy: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchReviewsOptions {
  featured?: boolean;
  caseStudy?: boolean;
  excludeFeatured?: boolean;
  limit?: number;
}
