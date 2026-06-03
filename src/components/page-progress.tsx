'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/lib/router';

export function PageProgress() {
  const [progress, setProgress] = useState(0);
  const { currentPath } = useRouter();
  const isAdmin = currentPath.startsWith('/admin');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isAdmin) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Calculate initial progress after content renders
    const timer = setTimeout(updateProgress, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, [isAdmin, currentPath]);

  if (isAdmin) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-blue-500 transition-[width] duration-150 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
