'use client';

import { useRouter } from '@/lib/router';
import { APP_URL } from '@/lib/app-urls';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  Lightbulb,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  XCircle,
  AlertTriangle,
  Sparkles,
  ThumbsUp,
  Zap,
} from 'lucide-react';

const relatedPosts = [
  {
    id: 'how-to-find-beta-testers-for-android-apps',
    title: 'How to Find Beta Testers for Your Android App',
    readTime: '7 min read',
  },
  {
    id: 'google-play-closed-testing',
    title: 'Google Play Closed Testing Complete Guide',
    readTime: '10 min read',
  },
  {
    id: 'app-rejected-google-play',
    title: 'App Rejected by Google Play? Here\u2019s What to Do',
    readTime: '6 min read',
  },
];

export default function Blog12TestersPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate('/blog')}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            {t('common.backToBlog')}
          </button>

          {/* Category badges */}
          <div className="flex items-center gap-2 mb-4">
            <Badge className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-950/70 text-[10px] tracking-wider">
              {t('blog.categoryGooglePlay')}
            </Badge>
            <Badge className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-950/70 text-[10px] tracking-wider">
              {t('blog.categoryAppTesting')}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            Google Play \u2013{' '}
            <span className="text-blue-400">12 Testers</span> for 14 Days
          </h1>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              January 5, 2026
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              5 min read
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="size-3.5" />
              12.4K views
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src="/images/blog/blog-12-testers.png"
          alt="Google Play 12 Testers for 14 Days"
          className="w-full rounded-xl border border-border/50 mb-8"
        />
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose-custom space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-foreground/80 leading-relaxed">
              If you&apos;re a new Android developer trying to publish your first app on Google Play,
              you&apos;ve likely encountered the <strong className="text-foreground">&quot;12 testers for 14 days&quot;</strong> requirement.
              This policy, introduced by Google in late 2023, has become one of the most discussed topics
              in the Android developer community — and one of the biggest hurdles for new developers.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              In this article, we&apos;ll break down exactly what this requirement means, who it applies to,
              why Google implemented it, and most importantly, how you can meet it efficiently and get your
              app published.
            </p>
          </section>

          {/* What is the policy */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                1
              </div>
              What Is the &quot;12 Testers for 14 Days&quot; Policy?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The &quot;12 testers for 14 days&quot; policy is Google Play&apos;s requirement that new personal
              developer accounts must complete a closed testing phase before they can publish apps to
              production. Specifically, you need at least <strong className="text-foreground">12 unique testers</strong> who
              install and actively engage with your app for <strong className="text-foreground">14 consecutive days</strong> before
              you can apply for production access.
            </p>
            <Card className="mt-4 border-border bg-card/50">
              <CardContent className="p-5">
                <h4 className="text-sm font-semibold text-foreground mb-3">Key Requirements</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    Minimum 12 testers must join your closed testing track
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    Testers must install and actively use your app
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    The 14-day period must be consecutive with no gaps
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    Testers should provide genuine, meaningful feedback
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Who does it apply to */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                2
              </div>
              Who Does It Apply To?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This requirement applies specifically to <strong className="text-foreground">personal developer
              accounts created after November 13, 2023</strong>. If you created your Google Play developer
              account before this date, or if you have an organization account, you are not subject to
              this closed testing requirement.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="size-5 text-red-400" />
                    <span className="text-sm font-semibold text-foreground">NOT Required</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Organization accounts</li>
                    <li>Personal accounts created before Nov 13, 2023</li>
                    <li>Accounts that already have production access</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="size-5 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">Required</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Personal accounts created after Nov 13, 2023</li>
                    <li>New developers publishing their first app</li>
                    <li>Accounts with no previous production apps</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Google implemented it */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                3
              </div>
              Why Did Google Implement This?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Google introduced this requirement to combat the growing problem of spam and low-quality
              apps on the Play Store. Before this policy, anyone could pay $25 and instantly publish apps
              — leading to a flood of spam apps, clone apps, and low-effort submissions that cluttered
              the store and harmed the user experience.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The 14-day testing requirement serves as a quality filter:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                <span><strong className="text-foreground">Reduces spam:</strong> Spammers won&apos;t bother running 14-day tests for throwaway apps</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                <span><strong className="text-foreground">Improves quality:</strong> Apps get real user feedback before reaching the public</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                <span><strong className="text-foreground">Protects users:</strong> Users are less likely to encounter broken or malicious apps</span>
              </li>
            </ul>
          </section>

          {/* What counts as a tester */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                4
              </div>
              What Counts as a Tester?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not just anyone who downloads your app counts as a tester for Google Play&apos;s closed testing
              requirement. Google has specific criteria for what constitutes a valid tester:
            </p>
            <Card className="mt-4 border-border bg-card/50">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Real users with Google accounts</p>
                    <p className="text-xs text-muted-foreground">Testers must sign in with a valid Google account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Active engagement</p>
                    <p className="text-xs text-muted-foreground">They must install the app and use it meaningfully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Unique individuals</p>
                    <p className="text-xs text-muted-foreground">Each tester must be a different person (no duplicate accounts)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Consistent participation</p>
                    <p className="text-xs text-muted-foreground">Testers should remain active throughout the 14-day period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Common misconceptions */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                5
              </div>
              Common Misconceptions
            </h2>
            <div className="space-y-4">
              <Card className="border-red-900/30 bg-red-950/10">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Misconception: Emulators count as testers</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong className="text-foreground/80">Reality:</strong> Google can detect emulators and virtual devices. Testers should use real
                        Android devices. Using emulators may result in your testing period being invalidated.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-900/30 bg-red-950/10">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Misconception: Friends are good enough for testing</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong className="text-foreground/80">Reality:</strong> While friends can be testers, they often provide generic feedback like
                        &quot;it&apos;s nice&quot; or &quot;looks good.&quot; Google may flag low-quality or generic reviews.
                        Professional testers provide detailed, actionable feedback.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-900/30 bg-red-950/10">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Misconception: You only need exactly 12 testers</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong className="text-foreground/80">Reality:</strong> You need 12 testers who <em>stay active</em> for the full period.
                        If some testers drop off, you may fall below the threshold. We recommend 14+ testers
                        as a safety buffer.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to meet the requirement */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                6
              </div>
              How to Meet the Requirement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              There are several ways to find testers for your closed testing period. Here are your options:
            </p>
            <div className="mt-4 space-y-4">
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="size-5 text-blue-400" />
                    <h4 className="text-sm font-semibold text-foreground">Professional Testing Service (Recommended)</h4>
                    <Badge className="border-blue-800 bg-blue-950/50 text-blue-400 text-[10px]">
                      {t('common.guaranteed')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Services like Fast Testers provide 14 verified, professional testers who stay for
                    the full 14-day period. This is the most reliable option — with a 99.9% success rate
                    for production access. Starting at $15 per app.
                  </p>
                  <Button
                    className="mt-3 bg-blue-600 text-white hover:bg-blue-700 h-8 text-xs"
                    onClick={() => navigate(APP_URL)}
                  >
                    Get Professional Testers
                    <ArrowRight className="ml-1 size-3" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="size-5 text-muted-foreground" />
                    <h4 className="text-sm font-semibold text-foreground">Free Community Marketplace</h4>
                    <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
                      {t('common.free')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use developer forums and social media groups where developers can share their apps and community members
                    volunteer to test. It&apos;s free but has no guarantee that testers will stay for the
                    full period.
                  </p>

                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="size-5 text-muted-foreground" />
                    <h4 className="text-sm font-semibold text-foreground">Social Media &amp; Forums</h4>
                    <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
                      {t('common.free')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reddit (r/androiddev), Discord servers, and Facebook groups can be sources of testers.
                    However, response rates are typically low and testers often ghost after a few days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Free vs Professional comparison */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                7
              </div>
              Free vs Professional Testing
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Feature</th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">Free</th>
                    <th className="px-4 py-3 text-center font-medium text-blue-400">Professional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 text-foreground/80">Cost</td>
                    <td className="px-4 py-3 text-center text-foreground/80">$0</td>
                    <td className="px-4 py-3 text-center text-blue-400 font-medium">$15</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 text-foreground/80">Number of testers</td>
                    <td className="px-4 py-3 text-center text-foreground/80">Varies</td>
                    <td className="px-4 py-3 text-center text-blue-400 font-medium">14 guaranteed</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 text-foreground/80">Tester retention</td>
                    <td className="px-4 py-3 text-center text-foreground/80">Low</td>
                    <td className="px-4 py-3 text-center text-blue-400 font-medium">100%</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 text-foreground/80">Feedback quality</td>
                    <td className="px-4 py-3 text-center text-foreground/80">Basic</td>
                    <td className="px-4 py-3 text-center text-blue-400 font-medium">Professional</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3 text-foreground/80">Production guarantee</td>
                    <td className="px-4 py-3 text-center">
                      <XCircle className="mx-auto size-4 text-red-400/50" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckCircle2 className="mx-auto size-4 text-blue-400" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground/80">Time investment</td>
                    <td className="px-4 py-3 text-center text-foreground/80">5\u201310 hours</td>
                    <td className="px-4 py-3 text-center text-blue-400 font-medium">5 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tips for success */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <div className="flex size-7 items-center justify-center rounded-lg bg-blue-950/30 text-blue-400 text-xs">
                8
              </div>
              Tips for Success
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-950/30">
                  <Lightbulb className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Make sure your app is stable</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Test your app thoroughly before submitting it to the closed testing track. Crashes and
                    bugs will lead to negative feedback and may cause testers to stop using your app.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-950/30">
                  <MessageSquare className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Respond to tester feedback</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    When testers report issues or provide feedback, acknowledge it and fix problems quickly.
                    This shows Google that your testing is genuine and helps improve your app.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-950/30">
                  <Users className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Use more than 12 testers</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Always have a buffer above the 12-tester minimum. If a tester drops off, you could
                    fall below the threshold and need to restart the 14-day period. We recommend at least 14.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-950/30">
                  <Sparkles className="size-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Don&apos;t rush the process</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The 14-day period can&apos;t be sped up. Use this time wisely — collect feedback,
                    make improvements, and prepare your production release. The better your app is when
                    you launch, the more successful it will be.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section>
            <Card className="border-blue-800/30 bg-blue-950/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">{t('common.keyTakeaway')}</h3>
                <p className="text-foreground/80 leading-relaxed">
                  The &quot;12 testers for 14 days&quot; requirement is Google&apos;s quality gate for new developers.
                  While it adds time to the publishing process, it ensures better apps reach users.
                  Whether you choose free community testing or professional services, the key is having
                  <strong className="text-foreground"> reliable testers who stay active for the full period</strong>.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </article>

      {/* Author Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <Users className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Fast Testers Team</p>
              <p className="text-xs text-muted-foreground mt-0.5">Expert Guides &amp; Resources</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                We help Android developers navigate Google Play&apos;s closed testing requirements and
                get their apps published. With 1,500+ apps successfully launched, we know what it
                takes to meet Google&apos;s standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">{t('common.relatedArticles')}</h3>
          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer border-border bg-card/50 hover:border-blue-500/20 transition-colors"
                onClick={() => navigate(`/${post.id}`)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <BookOpen className="size-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.readTime}</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-card/50">
            <CardContent className="p-8 sm:p-10 text-center">
              <Shield className="mx-auto mb-5 size-10 text-blue-400" />
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get 14 Professional Testers for $15
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Skip the hassle and get guaranteed testers who stay for the full 14-day period.
                99.9% production access success rate.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(APP_URL)}
                >
                  Get Professional Testers
                  <ArrowRight className="ml-2 size-4" />
                </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
