'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { trackMetaViewContent } from '@/lib/meta';

const VIEW_CONTENT_PAGES: Record<string, string> = {
  '/pricing': 'Pricing',
  '/services': 'Services',
  '/submit-app': 'Submit App',
  '/about': 'About',
  '/faq': 'FAQ',
  '/blog': 'Blog',
  '/documentation': 'Documentation',
  '/how-it-works': 'How It Works',
  '/contact-us': 'Contact',
};

/** Fire ViewContent on meaningful marketing pages. */
export function useMetaPageEvents() {
  const { currentPath } = useRouter();

  useEffect(() => {
    const normalized = currentPath.split('?')[0] || '/';
    const contentName = VIEW_CONTENT_PAGES[normalized];
    if (contentName) {
      trackMetaViewContent(contentName);
    }
  }, [currentPath]);
}
