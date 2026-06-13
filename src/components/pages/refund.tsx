'use client';

import {
  Shield,
  CheckCircle2,
  Mail,
  Clock,
  AlertTriangle,
  RefreshCw,
  RotateCcw,
  Ban,
  CreditCard,
} from 'lucide-react';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const refundSections: PolicySection[] = [
  {
    kind: 'paragraphs',
    id: 'cancellation',
    icon: Ban,
    titleKey: 'refundPolicyPage.sections.cancellation.title',
    tocKey: 'refundPolicyPage.toc.cancellation',
    paragraphKeys: [
      'refundPolicyPage.sections.cancellation.p1',
      'refundPolicyPage.sections.cancellation.p2',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'returnPolicy',
    icon: RotateCcw,
    titleKey: 'refundPolicyPage.sections.returnPolicy.title',
    tocKey: 'refundPolicyPage.toc.returnPolicy',
    paragraphKeys: [
      'refundPolicyPage.sections.returnPolicy.p1',
      'refundPolicyPage.sections.returnPolicy.p2',
      'refundPolicyPage.sections.returnPolicy.p3',
      'refundPolicyPage.sections.returnPolicy.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'eligibility',
    icon: CheckCircle2,
    titleKey: 'refundPolicyPage.eligibility.title',
    tocKey: 'refundPolicyPage.toc.eligibility',
    introKey: 'refundPolicyPage.eligibility.intro',
    bulletKeys: [
      'refundPolicyPage.eligibility.item1',
      'refundPolicyPage.eligibility.item2',
      'refundPolicyPage.eligibility.item3',
      'refundPolicyPage.eligibility.item4',
      'refundPolicyPage.eligibility.item5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'request',
    icon: Mail,
    titleKey: 'refundPolicyPage.request.title',
    tocKey: 'refundPolicyPage.toc.request',
    introKey: 'refundPolicyPage.request.intro',
    bulletKeys: [
      'refundPolicyPage.request.step1',
      'refundPolicyPage.request.step2',
      'refundPolicyPage.request.step3',
      'refundPolicyPage.request.step4',
    ],
  },
  {
    kind: 'items',
    id: 'timeline',
    icon: Clock,
    titleKey: 'refundPolicyPage.timeline.title',
    tocKey: 'refundPolicyPage.toc.timeline',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'refundPolicyPage.timeline.review.label',
        descriptionKey: 'refundPolicyPage.timeline.review.text',
      },
      {
        subtitleKey: 'refundPolicyPage.timeline.confirmation.label',
        descriptionKey: 'refundPolicyPage.timeline.confirmation.text',
      },
      {
        subtitleKey: 'refundPolicyPage.timeline.processing.label',
        descriptionKey: 'refundPolicyPage.timeline.processing.text',
      },
      {
        subtitleKey: 'refundPolicyPage.timeline.method.label',
        descriptionKey: 'refundPolicyPage.timeline.method.text',
      },
    ],
  },
  {
    kind: 'paragraphs',
    id: 'nonRefundable',
    icon: AlertTriangle,
    titleKey: 'refundPolicyPage.nonRefundable.title',
    tocKey: 'refundPolicyPage.toc.nonRefundable',
    introKey: 'refundPolicyPage.nonRefundable.intro',
    bulletKeys: [
      'refundPolicyPage.nonRefundable.item1',
      'refundPolicyPage.nonRefundable.item2',
      'refundPolicyPage.nonRefundable.item3',
      'refundPolicyPage.nonRefundable.item4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'chargebacks',
    icon: CreditCard,
    titleKey: 'refundPolicyPage.sections.chargebacks.title',
    tocKey: 'refundPolicyPage.toc.chargebacks',
    paragraphKeys: [
      'refundPolicyPage.sections.chargebacks.p1',
      'refundPolicyPage.sections.chargebacks.p2',
      'refundPolicyPage.sections.chargebacks.p3',
    ],
  },
];

export default function RefundPage() {
  return (
    <PolicyPageShell
      badgeIcon={Shield}
      badgeKey="refundPolicyPage.badge"
      titleKey="footer.refundPolicy"
      subtitleKey="refundPolicyPage.subtitle"
      lastUpdatedKey="refundPolicyPage.lastUpdated"
      lastUpdatedDateKey="refundPolicyPage.lastUpdatedDate"
      highlightPill={{ icon: CheckCircle2, labelKey: 'home.productionAccessGuarantee' }}
      introKey="refundPolicyPage.intro"
      tableOfContentsKey="refundPolicyPage.tableOfContents"
      sections={refundSections}
      contactTitleKey="refundPolicyPage.contact.title"
      contactDescriptionKey="refundPolicyPage.contact.description"
      backToHomeKey="refundPolicyPage.backToHome"
      highlightBanner={{
        icon: Shield,
        titleKey: 'home.productionAccessGuarantee',
        descriptionKey: 'refundPolicyPage.guaranteeHighlight',
      }}
      footerLinks={[
        POLICY_FOOTER_LINKS.terms,
        POLICY_FOOTER_LINKS.privacy,
        POLICY_FOOTER_LINKS.cancellation,
        POLICY_FOOTER_LINKS.cookie,
      ]}
    />
  );
}
