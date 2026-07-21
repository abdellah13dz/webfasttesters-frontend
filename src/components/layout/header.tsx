'use client';

import React, { useState } from 'react';
import { useRouter } from '@/lib/router';
import { useAnalytics } from '@/lib/analytics';
import { APP_LOGIN_URL } from '@/lib/app-urls';
import { BrandLogo } from '@/components/brand-logo';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, X, ChevronDown, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSiteNavigation } from '@/lib/hooks/use-site-navigation';
import { resolveNavLabel } from '@/lib/navigation';
import { getCmsIcon } from '@/lib/cms-icons';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';

const languages = [
  { code: 'en' as const, flag: '🇺🇸', label: 'English', shortLabel: 'EN' },
  { code: 'es' as const, flag: '🇪🇸', label: 'Español', shortLabel: 'ES' },
  { code: 'tr' as const, flag: '🇹🇷', label: 'Türkçe', shortLabel: 'TR' },
  { code: 'ar' as const, flag: '🇸🇦', label: 'العربية', shortLabel: 'AR' },
];

export function Header() {
  const { currentPath, navigate } = useRouter();
  const { trackCta } = useAnalytics();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, isRtl } = useLanguage();
  const navigation = useSiteNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sheetSide = isRtl ? 'left' : 'right';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    document.body.classList.add('mobile-nav-open');
    return () => document.body.classList.remove('mobile-nav-open');
  }, [mobileOpen]);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleGetStarted = () => {
    trackCta('signup', undefined, 'signup_click');
    goToGetStartedPricing(currentPath, navigate);
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (currentPath === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/');
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="relative w-full shadow-sm min-w-0 max-w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 safe-area-top safe-area-x">
      <div className="mx-auto flex h-14 sm:h-16 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={handleLogoClick}
          className="flex min-w-0 items-center gap-2 text-foreground hover:opacity-80 transition-opacity shrink"
        >
          <BrandLogo size="lg" priority />
          <span className="truncate text-base bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent font-bold sm:text-lg max-w-[9rem] min-[400px]:max-w-none">{t('header.brandName')}</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.headerMain.map((link) => (
            <button
              type="button"
              suppressHydrationWarning
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                currentPath === link.path
                  ? 'text-blue-500 bg-blue-500/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {resolveNavLabel(link, t)}
            </button>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" suppressHydrationWarning className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                {t('header.resources')}
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              {navigation.headerResources.map((link) => (
                <DropdownMenuItem
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className="cursor-pointer"
                >
                  {resolveNavLabel(link, t)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" suppressHydrationWarning className="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                <Globe className="h-4 w-4" />
                {currentLang.shortLabel}
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-card border-border">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer ${language === lang.code ? 'bg-blue-500/10 text-blue-500' : ''}`}
                >
                  {lang.flag} {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { trackCta('login', undefined, 'login_click'); handleNav(APP_LOGIN_URL); }}
            className="text-muted-foreground hover:text-foreground"
          >
            {t('header.login')}
          </Button>
          <Button
            size="sm"
            onClick={handleGetStarted}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            {t('header.getStarted')}
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Theme Toggle - Mobile */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={sheetSide} className="w-[min(85vw,20rem)] max-w-sm bg-background border-border p-0 safe-area-top safe-area-bottom [&>button]:hidden">
              <SheetTitle className="sr-only">{t('header.menu')}</SheetTitle>
              <div className="flex flex-col h-full max-h-[100dvh]">
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    
                    <BrandLogo size="sm" />
                    <span className="text-base font-bold">{t('header.brandName')}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <nav className="flex flex-col px-3 py-2">
                    {/* Main Navigation */}
                    {navigation.headerMain.map((link) => (
                      <button
                        type="button"
                        suppressHydrationWarning
                        key={link.path}
                        onClick={() => handleNav(link.path)}
                        className={`min-h-11 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          currentPath === link.path
                            ? 'text-blue-500 bg-blue-500/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {resolveNavLabel(link, t)}
                      </button>
                    ))}

                    {/* Resources Section - Collapsible */}
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setResourcesOpen(!resourcesOpen)}
                      className="flex min-h-11 items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      {t('header.resources')}
                      <ChevronDown className={`h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {resourcesOpen && (
                      <div className="pl-3 border-l-2 border-border ml-3 space-y-0.5 mb-1">
                        {navigation.headerResources.map((link) => (
                          <button
                            type="button"
                            suppressHydrationWarning
                            key={link.path}
                            onClick={() => handleNav(link.path)}
                            className={`min-h-10 w-full px-3 py-2 text-sm rounded-lg text-left transition-colors cursor-pointer ${
                              currentPath === link.path
                                ? 'text-blue-500 bg-blue-500/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                          >
                            {resolveNavLabel(link, t)}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Support Section */}
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('footer.support')}
                      </div>
                      {navigation.headerSupport.map((link) => {
                        const Icon = getCmsIcon(link.icon);
                        return (
                        <button
                          type="button"
                          suppressHydrationWarning
                          key={link.path}
                          onClick={() => handleNav(link.path)}
                          className={`flex min-h-11 items-center gap-2.5 w-full px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                            currentPath === link.path
                              ? 'text-blue-500 bg-blue-500/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {resolveNavLabel(link, t)}
                        </button>
                        );
                      })}
                    </div>

                    {/* Language Section */}
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('header.language')}
                      </div>
                      <div className="grid grid-cols-2 gap-1 px-1">
                        {languages.map((lang) => (
                          <button
                            type="button"
                            suppressHydrationWarning
                            key={lang.code}
                            onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                            className={`px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                              language === lang.code
                                ? 'text-blue-500 bg-blue-500/10 font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                          >
                            {lang.flag} {lang.shortLabel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="mt-3 pt-3 border-t border-border/40 space-y-2 px-1 pb-2">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => { trackCta('login', undefined, 'login_click'); handleNav(APP_LOGIN_URL); }}
                        className="min-h-11 w-full px-3 py-2.5 text-sm font-medium rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                      >
                        {t('header.login')}
                      </button>
                      <Button
                        onClick={handleGetStarted}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                      >
                        {t('header.getStarted')}
                      </Button>
                    </div>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
