import { BrandLogo } from '@/components/brand-logo';

type PageLoadingVariant = 'page' | 'inline' | 'minimal';

type PageLoadingProps = {
  variant?: PageLoadingVariant;
  label?: string;
  className?: string;
};

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce-dot-1" />
      <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce-dot-2" />
      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce-dot-3" />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-2xl space-y-4" aria-hidden="true">
      <div className="h-8 w-2/3 rounded-lg bg-muted animate-pulse" />
      <div className="h-4 w-full rounded-md bg-muted/80 animate-pulse" />
      <div className="h-4 w-5/6 rounded-md bg-muted/80 animate-pulse [animation-delay:120ms]" />
      <div className="h-4 w-4/6 rounded-md bg-muted/70 animate-pulse [animation-delay:240ms]" />
      <div className="pt-2 grid gap-3 sm:grid-cols-2">
        <div className="h-24 rounded-xl bg-muted/70 animate-pulse [animation-delay:180ms]" />
        <div className="h-24 rounded-xl bg-muted/70 animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function LoadingLogo() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-blue-500/20 animate-pulse-ring" />
      <span className="absolute inset-2 rounded-full border border-blue-500/15 animate-pulse-ring-delayed" />
      <span className="absolute inset-4 rounded-full border border-cyan-400/10 animate-pulse-ring-slow" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 animate-glow-pulse">
        <BrandLogo size="lg" priority />
      </div>
    </div>
  );
}

export function PageLoading({ variant = 'page', label, className = '' }: PageLoadingProps) {
  if (variant === 'minimal') {
    return (
      <div
        className={`flex items-center justify-center gap-3 py-12 ${className}`}
        role="status"
        aria-live="polite"
        aria-label={label ?? 'Loading'}
      >
        <LoadingDots />
        {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`flex min-h-[50vh] flex-col items-center justify-center gap-10 px-4 py-16 ${className}`}
        role="status"
        aria-live="polite"
        aria-label={label ?? 'Loading page'}
      >
        <LoadingLogo />
        <LoadingSkeleton />
        <LoadingDots />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 py-20 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Loading page'}
    >
      <LoadingLogo />

      <div className="flex w-full max-w-xs flex-col items-center gap-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 animate-page-loader-bar" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {label ?? 'Loading page…'}
        </p>
        <LoadingDots />
      </div>
    </div>
  );
}
