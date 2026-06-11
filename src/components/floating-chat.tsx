'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, MessageSquare, Mail, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { CONTACT_MAILTO, WHATSAPP_URL } from '@/lib/contact';

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const { t, isRtl } = useLanguage();
  const { navigate } = useRouter();

  // Close popup on route change
  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Hide on mobile when footer is visible (so footer links stay clickable)
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

  // Close popup when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-floating-chat]')) {
        setIsOpen(false);
      }
    };

    // Delay to avoid immediate close from the toggle click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmailClick = () => {
    window.location.href = CONTACT_MAILTO;
    setIsOpen(false);
  };

  const handleFaqClick = () => {
    navigate('/faq');
    setIsOpen(false);
  };

  // On mobile, hide when footer is visible so footer links stay clickable
  const shouldHideMobile = footerVisible;

  return (
    <div
      data-floating-chat
      className={`fixed z-50 transition-all duration-300 safe-area-x pointer-events-none md:bottom-6 ${isRtl ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} ${shouldHideMobile ? 'bottom-4 opacity-0 md:opacity-100' : 'bottom-[var(--mobile-sticky-offset)]'}`}
    >
      {/* Popup — absolute so the closed card does not reserve layout space over page content */}
      <div
        className={`absolute bottom-full mb-3 w-[min(18rem,calc(100vw-1.5rem))] sm:w-80 transition-all duration-300 ease-out pointer-events-auto ${isRtl ? 'left-0' : 'right-0'} ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'pointer-events-none invisible opacity-0 translate-y-4 scale-95'
        }`}
        aria-hidden={!isOpen}
      >
        <Card className="w-full overflow-hidden border-border/60 bg-card/95 backdrop-blur-md shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 px-4 py-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                {t('chat.title')}
              </span>
            </div>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Options */}
          <div className="p-3 space-y-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <MessageSquare className="h-4 w-4 text-green-500" />
              </div>
              <span>{t('chat.whatsapp')}</span>
            </a>

            <button
              type="button"
              suppressHydrationWarning
              onClick={handleEmailClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <span>{t('chat.email')}</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={handleFaqClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                <HelpCircle className="h-4 w-4 text-amber-500" />
              </div>
              <span>{t('chat.faq')}</span>
            </button>
          </div>
        </Card>
      </div>

      {/* FAB Button */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 ${
          isOpen ? 'rotate-0' : ''
        }`}
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            {/* Pulse animation */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-30" />
          </>
        )}
      </button>
    </div>
  );
}
