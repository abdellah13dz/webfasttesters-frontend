import { STRIPE_URL } from '@/lib/business';

type StripePoweredBadgeProps = {
  className?: string;
  label?: string;
};

/** Stripe brand attribution for checkout and footer disclosure. */
export function StripePoweredBadge({
  className = '',
  label = 'Powered by Stripe',
}: StripePoweredBadgeProps) {
  return (
    <a
      href={STRIPE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors ${className}`}
      aria-label={label}
    >
      <span>{label}</span>
      <svg
        viewBox="0 0 60 25"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-auto"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M59.64 14.28h-8.06c-.19 1.03-.98 1.68-2.04 1.68-1.41 0-2.31-1.08-2.31-2.81 0-1.74.9-2.81 2.32-2.81 1.06 0 1.84.65 2.03 1.67h4.04c-.26-2.88-2.7-4.7-6.07-4.7-4.17 0-6.53 2.81-6.53 6.84 0 4.03 2.36 6.84 6.53 6.84 3.37 0 5.81-1.82 6.07-4.71Zm-17.11.07h4.04V5.57h-4.04v8.78Zm0-11.3h4.04V.25h-4.04v2.8ZM34.65 14.35c0 4.03-2.36 6.84-6.53 6.84-4.17 0-6.53-2.81-6.53-6.84 0-4.03 2.36-6.84 6.53-6.84 4.17 0 6.53 2.81 6.53 6.84Zm-4.04 0c0-1.73-.9-2.81-2.31-2.81-1.41 0-2.31 1.08-2.31 2.81 0 1.73.9 2.81 2.31 2.81 1.41 0 2.31-1.08 2.31-2.81ZM13.48 14.35c0 4.03-2.36 6.84-6.53 6.84C2.78 21.19.42 18.38.42 14.35.42 10.32 2.78 7.51 6.95 7.51c4.17 0 6.53 2.81 6.53 6.84Zm-4.04 0c0-1.73-.9-2.81-2.31-2.81-1.41 0-2.31 1.08-2.31 2.81 0 1.73.9 2.81 2.31 2.81 1.41 0 2.31-1.08 2.31-2.81Z"
        />
      </svg>
    </a>
  );
}
