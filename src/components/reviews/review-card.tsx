'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, ExternalLink, Smartphone, ShieldCheck, Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import type { Review } from '@/lib/types/review';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

function AuthorAvatar({ author, avatarUrl }: { author: string; avatarUrl: string | null }) {
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={author}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-white font-semibold text-sm shrink-0 shadow-md shadow-blue-500/20">
      {initials}
    </div>
  );
}

function isVerified(review: Review): boolean {
  return review.rating >= 4;
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) === 1 ? '' : 's'} ago`;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className = '' }: ReviewCardProps) {
  const { t } = useLanguage();

  return (
    <Card
      className={`border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group gradient-border overflow-hidden hover-scale h-full ${className}`}
    >
      <CardContent className="relative p-5 sm:p-6 flex flex-col h-full z-10">
        <Quote className="h-5 w-5 text-blue-400/30 mb-3" />

        <div className="flex items-center gap-2 flex-wrap">
          <StarRating rating={review.rating} />
          {isVerified(review) && (
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] px-1.5 py-0 h-5 gap-0.5"
            >
              <ShieldCheck className="h-3 w-3" />
              {t('reviews.verifiedReviewer')}
            </Badge>
          )}
        </div>

        <p className="text-foreground/80 text-sm leading-relaxed mt-4 flex-1">
          &ldquo;{review.text}&rdquo;
        </p>

        {review.appName && (
          <div className="mt-3">
            <Badge
              variant="secondary"
              className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            >
              <Smartphone className="h-3 w-3 mr-1" />
              {review.appName}
            </Badge>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <AuthorAvatar author={review.author} avatarUrl={review.avatarUrl} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <div className="text-foreground text-sm font-medium truncate">
                  {review.author}
                </div>
                {review.link && (
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              {review.role && (
                <span className="text-muted-foreground text-xs truncate block">
                  {review.role}
                </span>
              )}
              <div className="text-muted-foreground/60 text-[11px] mt-0.5">
                {formatRelativeDate(review.createdAt)}
              </div>
            </div>
          </div>
          {review.appLink && (
            <a
              href={review.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 rounded-lg bg-blue-500/5 border border-blue-500/10 px-3 py-2 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group/app"
            >
              <Smartphone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 truncate">
                {review.appName || 'View App'}
              </span>
              <ExternalLink className="h-3 w-3 text-blue-400/50 group-hover/app:text-blue-400 shrink-0 ml-auto" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
