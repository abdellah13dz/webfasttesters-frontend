'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Hide on mobile when footer is visible so footer links stay clickable
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // On mobile, hide when footer is visible
  const shouldHideMobile = footerVisible;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed z-40 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/40 safe-area-x md:bottom-6 md:left-6 md:z-50 ${shouldHideMobile ? 'bottom-4 left-3 opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'bottom-[var(--mobile-sticky-offset)] left-3 sm:left-4'} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
