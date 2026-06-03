'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/layout/header';
import { AnnouncementBanner } from '@/components/announcement-banner';

export function FixedSiteHeader() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const update = () => {
      const banner = bannerRef.current;
      if (!banner) {
        setHeaderTop(0);
        return;
      }
      const bottom = banner.getBoundingClientRect().bottom;
      setHeaderTop(Math.max(0, bottom));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const banner = bannerRef.current;
    const observer = banner ? new ResizeObserver(update) : null;
    if (banner && observer) observer.observe(banner);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={bannerRef}>
        <AnnouncementBanner />
      </div>
      {/* In-flow placeholder so content is not hidden under the fixed header */}
      <div
        className="h-14 sm:h-16 shrink-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed inset-x-0 start-0 end-0 z-50 w-full max-w-[100vw] transition-[top] duration-150 ease-out safe-area-x"
        style={{ top: headerTop }}
      >
        <Header />
      </div>
    </>
  );
}
