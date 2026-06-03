'use client';

import React from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { LanguageProvider, useLanguage } from '@/lib/i18n/context';
import { StructuredData } from '@/components/structured-data';

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { dir } = useLanguage();
  const { currentPath } = useRouter();

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <StructuredData currentPath={currentPath} />
      {children}
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AdminShellInner>{children}</AdminShellInner>
      </RouterProvider>
    </LanguageProvider>
  );
}
