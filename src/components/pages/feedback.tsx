'use client';

import { apiFetch } from '@/lib/api';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '@/lib/router';
import { useLanguage } from '@/lib/i18n/context';
import { useAnalytics } from '@/lib/analytics';
import { trackMetaLead } from '@/lib/meta';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  ThumbsUp,
  ArrowLeft,
  Send,
  Shield,
  MessageSquareHeart,
  CheckCircle2,
  Heart,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function FeedbackPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const { trackForm } = useAnalytics();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const maxChars = 1000;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.querySelector('script[src*="recaptcha"]')) {
      setRecaptchaLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY) return null;
    try {
      if (!window.grecaptcha || !recaptchaLoaded) return null;
      return await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            resolve(await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'feedback_form' }));
          } catch (err) {
            reject(err);
          }
        });
      });
    } catch {
      return null;
    }
  }, [recaptchaLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const recaptchaToken = await getRecaptchaToken();
      if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
        setSubmitError(t('feedback.submitError'));
        setSubmitting(false);
        return;
      }

      const response = await apiFetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          message: message.trim(),
          ...(recaptchaToken ? { recaptchaToken } : {}),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 403 && errorData.error?.includes('reCAPTCHA')) {
          setSubmitError(t('feedback.spamError'));
          return;
        }
        setSubmitError(errorData.error || t('feedback.submitError'));
        return;
      }

      trackForm('feedback_form', { rating });
      trackMetaLead('Feedback Form', {
        customData: { content_name: 'Feedback Form', rating: String(rating) },
      });
      setSubmitted(true);
    } catch {
      setSubmitError(t('feedback.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingLabel = (r: number) => {
    switch (r) {
      case 1:
        return t('feedback.ratingPoor');
      case 2:
        return t('feedback.ratingFair');
      case 3:
        return t('feedback.ratingGood');
      case 4:
        return t('feedback.ratingVeryGood');
      case 5:
        return t('feedback.ratingExcellent');
      default:
        return '';
    }
  };

  const displayRating = hoverRating || rating;

  const trustCards = [
    {
      icon: Heart,
      title: t('feedback.weListen'),
      description: t('feedback.weListenDesc'),
    },
    {
      icon: Sparkles,
      title: t('feedback.weImprove'),
      description: t('feedback.weImproveDesc'),
    },
    {
      icon: ThumbsUp,
      title: t('feedback.weAppreciate'),
      description: t('feedback.weAppreciateDesc'),
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/8" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              {/* Confetti celebration */}
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute animate-confetti text-lg"
                    style={{
                      left: `${15 + i * 10}%`,
                      top: '-20px',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    {['✨', '⭐', '🎉', '💫'][i % 4]}
                  </span>
                ))}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 mx-auto mb-6 animate-glow-pulse">
                  <CheckCircle2 className="h-10 w-10 text-blue-400" />
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('feedback.thankYou').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('feedback.thankYou').split(' ').slice(-1)[0].replace(/[!?]$/, '')}</span>{t('feedback.thankYou').match(/[!?]$/)?.[0] || ''}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('feedback.thankYouDesc')}
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('feedback.backToHome')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-blue-500/3 to-cyan-500/5" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Floating star decorations */}
        <div className="absolute top-16 left-[12%] animate-float opacity-15">
          <Star className="h-6 w-6 text-amber-400" />
        </div>
        <div className="absolute top-28 right-[18%] animate-float-delayed opacity-10">
          <Star className="h-4 w-4 text-amber-400" />
        </div>
        <div className="absolute bottom-20 left-[30%] animate-float-slow opacity-12">
          <Star className="h-5 w-5 text-amber-400" />
        </div>
        <div className="absolute top-36 left-[65%] animate-float opacity-10">
          <Star className="h-3 w-3 text-blue-400" />
        </div>
        <div className="absolute bottom-12 right-[40%] animate-float-delayed opacity-8">
          <Star className="h-7 w-7 text-cyan-400" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text on left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/10"
              >
                <MessageSquareHeart className="mr-1 h-3 w-3" />
                {t('feedback.badge')}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('feedback.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-400">{t('feedback.title').split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                {t('feedback.subtitle')}
              </p>
            </div>
            {/* Illustration on right */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <img
                src="/images/illustrations/feedback.png"
                alt="Feedback"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Card className="relative z-0 border-border/50 bg-card/50 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-xl">{t('feedback.shareExperience')}</CardTitle>
              <CardDescription>
                {t('feedback.shareExperienceDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Star Rating */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">{t('feedback.ratingQuestion')}</Label>
                  <div
                    className="flex items-center gap-1"
                    role="radiogroup"
                    aria-label={t('feedback.ratingQuestion')}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={rating === star}
                        aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="relative z-10 p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                      >
                        <Star
                          className={`h-10 w-10 pointer-events-none transition-all duration-200 ${
                            star <= displayRating
                              ? 'fill-blue-400 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.5)]'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      </button>
                    ))}
                    {displayRating > 0 && (
                      <span className="ml-3 text-sm font-medium text-blue-400">
                        {getRatingLabel(displayRating)}
                      </span>
                    )}
                  </div>
                  {rating === 0 && (
                    <p className="text-xs text-muted-foreground">{t('feedback.clickToRate')}</p>
                  )}
                </div>

                <Separator className="opacity-50" />

                {/* Feedback Text */}
                <div className="space-y-3">
                  <Label htmlFor="feedback-message" className="text-sm font-medium">
                    {t('feedback.tellUsMore')}
                  </Label>
                  <Textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => {
                      if (e.target.value.length <= maxChars) {
                        setMessage(e.target.value);
                      }
                    }}
                    placeholder={t('feedback.tellUsMorePlaceholder')}
                    rows={6}
                    style={{ minHeight: '160px' }}
                    className="relative z-10 bg-muted/30 border-border/50 resize-none dark:bg-muted/30"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {t('feedback.shareAsMuch')}
                    </p>
                    <p
                      className={`text-xs ${
                        message.length >= maxChars
                          ? 'text-red-400'
                          : message.length >= maxChars * 0.9
                          ? 'text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {message.length}/{maxChars}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                {submitError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={rating === 0 || submitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? t('feedback.submitting') : t('feedback.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Anonymous Note */}
          <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                {t('feedback.anonymousNote')}
              </p>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('feedback.backToHome')}
            </button>
          </div>

          {/* Why Feedback Matters */}
          <AnimatedSection delay={200}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {trustCards.map((item) => (
                <div
                  key={item.title}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/30 p-4 text-center transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover-scale"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
      </section>
    </div>
  );
}
