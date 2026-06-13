'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function RouteLoadingBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setActive(true);
    setProgress(12);

    timersRef.current.push(setTimeout(() => setProgress(55), 80));
    timersRef.current.push(setTimeout(() => setProgress(82), 220));
    timersRef.current.push(setTimeout(() => setProgress(100), 420));
    timersRef.current.push(
      setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, 620)
    );

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.45)] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
