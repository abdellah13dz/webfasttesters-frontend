'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Quote, Star } from 'lucide-react';
import type { Review } from '@/lib/types/review';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

interface CaseStudyCardProps {
  review: Review;
  onReadMore?: () => void;
  readMoreLabel?: string;
  compact?: boolean;
  className?: string;
}

export function CaseStudyCard({
  review,
  onReadMore,
  readMoreLabel,
  compact = false,
  className = '',
}: CaseStudyCardProps) {
  const initials = review.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const resultText = review.result || review.role;

  if (compact) {
    return (
      <Card className={`card-hover bg-card/80 border-border/60 h-full flex flex-col ${className}`}>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h3 className="text-base font-bold text-foreground truncate">
              {review.appName || review.author}
            </h3>
            {review.category && (
              <Badge variant="secondary" className="text-xs shrink-0">
                {review.category}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{review.author}</p>

          {resultText && (
            <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 mb-3">
              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0" />
              <span className="text-sm font-semibold text-blue-400">{resultText}</span>
            </div>
          )}

          <div className="flex items-center gap-0.5 mb-4">
            <StarRating rating={review.rating} />
          </div>

          {onReadMore && readMoreLabel && (
            <button
              type="button"
              onClick={onReadMore}
              className="mt-auto flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
            >
              {readMoreLabel}
            </button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`border border-border bg-card/50 backdrop-blur-sm hover:border-blue-400/20 transition-all duration-300 group h-full ${className}`}
    >
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.author}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 font-semibold text-sm shrink-0 group-hover:bg-blue-500/20 transition-colors">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors truncate">
              {review.author}
            </h3>
            {review.appName && (
              <span className="text-xs text-muted-foreground truncate block mt-0.5">
                {review.appName}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {review.category && (
            <Badge variant="outline" className="text-xs border-blue-400/20 text-blue-400">
              {review.category}
            </Badge>
          )}
          {resultText && (
            <Badge variant="outline" className="text-xs border-emerald-400/20 text-emerald-500">
              <CheckCircle className="h-3 w-3 mr-0.5" />
              {resultText}
            </Badge>
          )}
        </div>

        <div className="flex-1 mb-4">
          <Quote className="h-4 w-4 text-blue-400/30 mb-2" />
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            {resultText ? (
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {resultText}
              </span>
            ) : (
              <span />
            )}
            <StarRating rating={review.rating} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
