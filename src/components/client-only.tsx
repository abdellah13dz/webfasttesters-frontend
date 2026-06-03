'use client';

import { useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/**
 * Renders children only after mount so password-manager / form-filler extensions
 * cannot inject attributes (e.g. fdprocessedid) before React hydrates.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
