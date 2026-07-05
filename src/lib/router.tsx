'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';
import { isExternalUrl } from '@/lib/app-urls';
import { appendCrossDomainParams } from '@/lib/cross-domain';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const nextRouter = useNextRouter();

  const navigate = useCallback(
    (path: string) => {
      if (isExternalUrl(path)) {
        window.location.assign(appendCrossDomainParams(path));
        return;
      }
      if (pathname === path) {
        return;
      }
      nextRouter.push(path);
      window.scrollTo(0, 0);
    },
    [nextRouter, pathname]
  );

  return (
    <RouterContext.Provider value={{ currentPath: pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}
