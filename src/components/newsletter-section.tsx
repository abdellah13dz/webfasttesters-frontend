'use client';

import React, { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { useAnalytics, trackGa4Event } from '@/lib/analytics';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterSectionProps {
  /** Optional heading override; defaults to t('newsletter.title') */
  title?: string;
  /** Optional description override; defaults to t('newsletter.description') */
  description?: string;
  /** Variant: "card" wraps in a Card with gradient bg; "inline" is bare (for footer etc.) */
  variant?: 'card' | 'inline';
  /** Full-width homepage layout (matches bottom CTA section) */
  wide?: boolean;
  /** Extra class names for the wrapper */
  className?: string;
}

export function NewsletterSection({
  title,
  description,
  variant = 'card',
  wide = false,
  className = '',
}: NewsletterSectionProps) {
  const { t } = useLanguage();
  const { currentPath } = useRouter();
  const { trackForm } = useAnalytics();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage(t('newsletter.invalidEmail'));
      return;
    }

    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage(t('newsletter.invalidEmail'));
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await apiFetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(t('newsletter.success'));
        setEmail('');
        trackGa4Event('newsletter_signup', currentPath);
        trackForm('newsletter_signup');
      } else if (res.status === 409) {
        setStatus('error');
        setMessage(t('newsletter.alreadySubscribed'));
      } else {
        setStatus('error');
        setMessage(data.error || t('newsletter.invalidEmail'));
      }
    } catch {
      setStatus('error');
      setMessage(t('newsletter.invalidEmail'));
    }
  };

  /* ─── Inline variant (footer) ─────────────────────────────────────── */
  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <Mail className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-foreground">
              {title || t('newsletter.title')}
            </span>
          </div>

          {status === 'success' ? (
            <div className="flex items-center gap-1.5 text-sm text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span>{message}</span>
            </div>
          ) : (
            <div className="flex w-full sm:w-auto items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={t('newsletter.placeholder')}
                autoComplete="email"
                data-lpignore="true"
                data-1p-ignore
                suppressHydrationWarning
                className="h-9 w-full sm:w-56 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="h-9 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 shrink-0"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('newsletter.subscribe')
                )}
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-1.5 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>
    );
  }

  /* ─── Card variant (pages) ─────────────────────────────────────────── */
  return (
    <Card
      className={`relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-card ${wide ? 'w-full rounded-2xl' : ''} ${className}`}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        {wide && (
          <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />
        )}
      </div>

      <CardContent className={`text-center ${wide ? 'p-8 sm:p-12 lg:p-16' : 'p-6 sm:p-8'}`}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Mail className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">{t('newsletter.title')}</span>
        </div>

        <h3 className={`font-bold text-foreground mb-2 ${wide ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {title || t('newsletter.title')}
        </h3>

        <p className={`text-muted-foreground mx-auto mb-6 leading-relaxed ${wide ? 'max-w-2xl text-base sm:text-lg' : 'max-w-md text-sm sm:text-base'}`}>
          {description || t('newsletter.description')}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 mx-auto ${wide ? 'max-w-xl w-full' : 'max-w-md'}`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder={t('newsletter.placeholder')}
              autoComplete="email"
              data-lpignore="true"
              data-1p-ignore
              suppressHydrationWarning
              className={`h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors ${
                status === 'error'
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                  : 'border-border focus:border-blue-500/50 focus:ring-blue-500/30'
              }`}
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className={`h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 shrink-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all ${wide ? 'sm:min-w-[140px]' : ''}`}
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t('newsletter.subscribe')
              )}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-1.5 mt-3 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{message}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
