'use client';

import { useState } from 'react';
import { Download, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from '@/lib/router';
import { goToGetStartedPricing } from '@/lib/pricing-navigation';
import { useAnalytics } from '@/lib/analytics';
import { trackGa4Event } from '@/lib/ga4-events';
import { useLanguage } from '@/lib/i18n/context';
import { downloadChecklistPdf } from '@/lib/checklist-pdf';

const CHECKLIST_ITEM_KEYS = [
  'checklist.item1',
  'checklist.item2',
  'checklist.item3',
  'checklist.item4',
  'checklist.item5',
  'checklist.item6',
  'checklist.item7',
  'checklist.item8',
  'checklist.item9',
  'checklist.item10',
  'checklist.item11',
  'checklist.item12',
  'checklist.item13',
  'checklist.item14',
] as const;

export default function GooglePlayChecklistPage() {
  const { navigate, currentPath } = useRouter();
  const { trackCta } = useAnalytics();
  const { t, isRtl } = useLanguage();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    trackGa4Event('checklist_download', currentPath);

    try {
      await downloadChecklistPdf({
        title: t('checklist.title'),
        description: t('checklist.description'),
        items: CHECKLIST_ITEM_KEYS.map((key) => t(key)),
        sectionSetup: t('checklist.pdfSectionSetup'),
        sectionTesting: t('checklist.pdfSectionTesting'),
        sectionLaunch: t('checklist.pdfSectionLaunch'),
        ctaTitle: t('checklist.pdfCtaTitle'),
        ctaBody: t('checklist.pdfCtaBody'),
        footerTagline: t('checklist.pdfFooterTagline'),
        filename: t('checklist.pdfFilename'),
        isRtl,
      });
    } catch {
      /* silent — avoid breaking UX */
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('checklist.title')}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('checklist.description')}</p>
        </div>

        <Card className="border-blue-500/20 mb-8">
          <CardContent className="p-6 sm:p-8">
            <ol className="space-y-4">
              {CHECKLIST_ITEM_KEYS.map((key, idx) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400">
                    {idx + 1}
                  </span>
                  <span className="text-foreground/90 pt-0.5">{t(key)}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            disabled={downloading}
            className="flex-1 h-11"
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {downloading ? t('checklist.downloading') : t('checklist.download')}
          </Button>
          <Button
            onClick={() => { trackCta('hero_cta', undefined, 'signup_click'); goToGetStartedPricing(currentPath, navigate); }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-11"
          >
            {t('croHero.cta')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            {t('checklist.skipTitle')}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{t('checklist.skipDescription')}</p>
          <Button variant="link" className="p-0 h-auto text-blue-400" onClick={() => navigate('/google-play-12-testers')}>
            {t('checklist.guideLink')}
          </Button>
        </div>
      </div>
    </div>
  );
}
