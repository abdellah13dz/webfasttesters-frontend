'use client';

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

interface UseStickyAsideResult {
  containerRef: RefObject<HTMLDivElement | null>;
  asideRef: RefObject<HTMLElement | null>;
  style: CSSProperties;
}

function getHeaderOffset(): number {
  const header = document.querySelector('header');
  return (header?.getBoundingClientRect().height ?? 64) + 16;
}

export function useStickyAside(): UseStickyAsideResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const container = containerRef.current;
    const aside = asideRef.current;
    if (!container || !aside) return;

    let raf = 0;

    const update = () => {
      if (window.innerWidth < 1024) {
        setStyle({});
        return;
      }

      const topOffset = getHeaderOffset();
      const containerRect = container.getBoundingClientRect();
      const asideWidth = aside.offsetWidth;
      const asideHeight = aside.offsetHeight;
      const left = containerRect.left;

      if (containerRect.top > topOffset) {
        setStyle({ position: 'relative', top: 0, left: 0, width: asideWidth });
        return;
      }

      if (containerRect.bottom - topOffset <= asideHeight) {
        setStyle({
          position: 'absolute',
          top: container.offsetHeight - asideHeight,
          left: 0,
          width: asideWidth,
        });
        return;
      }

      setStyle({
        position: 'fixed',
        top: topOffset,
        left,
        width: asideWidth,
        zIndex: 30,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { containerRef, asideRef, style };
}
