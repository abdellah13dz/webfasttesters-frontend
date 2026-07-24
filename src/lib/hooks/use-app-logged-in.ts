'use client';

import { useEffect, useState } from 'react';
import { isAppLoggedIn } from '@/lib/app-session';

/**
 * Client-only: whether the visitor has an active app.fasttesters.com session
 * (via shared Domain=.fasttesters.com presence cookie). Starts false to avoid SSR mismatch.
 */
export function useAppLoggedIn(): boolean {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAppLoggedIn());

    const refresh = () => setLoggedIn(isAppLoggedIn());
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);

    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return loggedIn;
}
