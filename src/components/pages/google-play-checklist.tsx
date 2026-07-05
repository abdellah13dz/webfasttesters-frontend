'use client';

import { Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useAnalytics } from '@/lib/analytics';
import { trackGa4Event } from '@/lib/ga4-events';

const CHECKLIST_ITEMS = [
  'Create Google Play Developer account ($25 one-time fee)',
  'Prepare privacy policy URL hosted on your domain',
  'Complete IARC content rating questionnaire',
  'Upload signed AAB to Closed testing track (not internal)',
  'Add store listing: title, description, screenshots, feature graphic',
  'Fill out Data safety form accurately',
  'Generate closed testing opt-in URL from Play Console',
  'Recruit minimum 12 testers (15 recommended for buffer)',
  'Verify testers installed app from Play Store link',
  'Monitor tester count daily for 14 consecutive days',
  'Fix crashes and ANRs before production request',
  'Screenshot Play Console testing metrics on day 14',
  'Apply for production access with testing evidence',
  'Promote tested build to production track after approval',
];

export default function GooglePlayChecklistPage() {
  const { navigate, currentPath } = useRouter();
  const { trackCta } = useAnalytics();

  const handleDownload = () => {
    trackGa4Event('checklist_download', currentPath);
    window.print();
  };

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 print:py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 print:mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Google Play Publishing Checklist</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Free checklist for indie developers publishing their first Android app. Covers closed testing, 12 testers, 14 days, and production access.
          </p>
        </div>

        <Card className="border-blue-500/20 mb-8 print:border-none print:shadow-none">
          <CardContent className="p-6 sm:p-8">
            <ol className="space-y-4">
              {CHECKLIST_ITEMS.map((item, idx) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400">
                    {idx + 1}
                  </span>
                  <span className="text-foreground/90 pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <Button onClick={handleDownload} variant="outline" className="flex-1 h-11">
            <Download className="h-4 w-4 mr-2" />
            Download / Print PDF
          </Button>
          <Button
            onClick={() => { trackCta('hero_cta', undefined, 'signup_click'); navigate(APP_URL); }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-11"
          >
            Start Closed Testing
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-6 print:hidden">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            Skip the hardest step
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Steps 8–10 are where most developers get stuck. Fast Testers assigns 15 real testers in ~1 hour for a one-time $15 fee.
          </p>
          <Button variant="link" className="p-0 h-auto text-blue-400" onClick={() => navigate('/google-play-12-testers')}>
            Read the 12 testers guide →
          </Button>
        </div>
      </div>
    </div>
  );
}
