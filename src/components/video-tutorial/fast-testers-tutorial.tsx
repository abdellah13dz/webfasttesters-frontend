'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/lib/i18n/context';
import { useRouter } from '@/lib/router';
import { trackGa4Event } from '@/lib/ga4-events';
import {
  FAST_TESTERS_TUTORIAL_EMBED,
  FAST_TESTERS_TUTORIAL_THUMB,
  FAST_TESTERS_TUTORIAL_URL,
  FAST_TESTERS_TUTORIAL_VIDEO_ID,
} from '@/lib/tutorial-video';
import { cn } from '@/lib/utils';

type FastTestersTutorialVariant = 'embed' | 'section' | 'cta';

interface FastTestersTutorialProps {
  variant?: FastTestersTutorialVariant;
  analyticsLocation?: string;
  className?: string;
}

function TutorialPlayerDialog({
  open,
  onOpenChange,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden border-border/60 bg-card">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
          <DialogTitle className="text-base sm:text-lg pr-8">{title}</DialogTitle>
        </DialogHeader>
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black">
            <iframe
              src={`${FAST_TESTERS_TUTORIAL_EMBED}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TutorialThumbnail({
  activated,
  onActivate,
  title,
  className,
  priority = false,
}: {
  activated: boolean;
  onActivate: () => void;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  if (activated) {
    return (
      <div className={cn('relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-black shadow-xl', className)}>
        <iframe
          src={`${FAST_TESTERS_TUTORIAL_EMBED}?rel=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label={title}
      className={cn(
        'group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-black shadow-xl',
        className
      )}
    >
      <Image
        src={FAST_TESTERS_TUTORIAL_THUMB}
        alt={title}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 560px"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform group-hover:scale-105 sm:h-16 sm:w-16">
        <Play className="h-6 w-6 ms-1 sm:h-7 sm:w-7" />
      </span>
    </button>
  );
}

export function FastTestersTutorial({
  variant = 'embed',
  analyticsLocation = 'tutorial_video',
  className = '',
}: FastTestersTutorialProps) {
  const { t } = useLanguage();
  const { currentPath } = useRouter();
  const [activated, setActivated] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const title = t('tutorialVideo.title');
  const description = t('tutorialVideo.description');
  const ctaLabel = t('tutorialVideo.viewTutorial');

  const trackClick = () => {
    trackGa4Event('youtube_click', currentPath, {
      location: analyticsLocation,
      video_id: FAST_TESTERS_TUTORIAL_VIDEO_ID,
    });
  };

  const activateVideo = () => {
    trackClick();
    setActivated(true);
  };

  const openDialog = () => {
    trackClick();
    setDialogOpen(true);
  };

  const openOnYouTube = () => {
    trackClick();
    window.open(FAST_TESTERS_TUTORIAL_URL, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'cta') {
    return (
      <>
        <Card className={cn('border-border/60 bg-card/80 overflow-hidden', className)}>
          <CardContent className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 sm:p-5">
            <button
              type="button"
              onClick={openDialog}
              className="group relative h-28 w-full sm:h-24 sm:w-40 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-black"
              aria-label={title}
            >
              <Image
                src={FAST_TESTERS_TUTORIAL_THUMB}
                alt={title}
                fill
                sizes="160px"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                <Play className="h-4 w-4 ms-0.5" />
              </span>
            </button>
            <div className="flex-1 min-w-0 text-center sm:text-start">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            <Button
              type="button"
              onClick={openDialog}
              className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white gap-2"
            >
              {ctaLabel}
              <Play className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <TutorialPlayerDialog open={dialogOpen} onOpenChange={setDialogOpen} title={title} />
      </>
    );
  }

  if (variant === 'section') {
    return (
      <section className={cn('relative', className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-start">
              <p className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-2">
                {t('tutorialVideo.badge')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{title}</h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={openOnYouTube}
                className="border-border/60 gap-2"
              >
                {ctaLabel}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <TutorialThumbnail
              activated={activated}
              onActivate={activateVideo}
              title={title}
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={cn('relative mx-auto w-full max-w-xl lg:max-w-none', className)}>
      <TutorialThumbnail
        activated={activated}
        onActivate={activateVideo}
        title={title}
        priority
      />
    </div>
  );
}
