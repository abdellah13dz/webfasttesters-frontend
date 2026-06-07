'use client';

import {
  Ban,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  UserX,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const cancellationSections: PolicySection[] = [
  {
    kind: 'paragraphs',
    id: 'noSubscriptions',
    icon: CreditCard,
    titleKey: 'cancellationPolicyPage.sections.noSubscriptions.title',
    tocKey: 'cancellationPolicyPage.toc.noSubscriptions',
    paragraphKeys: [
      'cancellationPolicyPage.sections.noSubscriptions.p1',
      'cancellationPolicyPage.sections.noSubscriptions.p2',
      'cancellationPolicyPage.sections.noSubscriptions.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'beforeTesting',
    icon: Clock,
    titleKey: 'cancellationPolicyPage.sections.beforeTesting.title',
    tocKey: 'cancellationPolicyPage.toc.beforeTesting',
    paragraphKeys: [
      'cancellationPolicyPage.sections.beforeTesting.p1',
      'cancellationPolicyPage.sections.beforeTesting.p2',
      'cancellationPolicyPage.sections.beforeTesting.p3',
      'cancellationPolicyPage.sections.beforeTesting.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'cannotCancel',
    icon: Ban,
    titleKey: 'cancellationPolicyPage.sections.cannotCancel.title',
    tocKey: 'cancellationPolicyPage.toc.cannotCancel',
    bulletKeys: [
      'cancellationPolicyPage.sections.cannotCancel.p1',
      'cancellationPolicyPage.sections.cannotCancel.p2',
      'cancellationPolicyPage.sections.cannotCancel.p3',
      'cancellationPolicyPage.sections.cannotCancel.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'vsRefunds',
    icon: RefreshCw,
    titleKey: 'cancellationPolicyPage.sections.vsRefunds.title',
    tocKey: 'cancellationPolicyPage.toc.vsRefunds',
    paragraphKeys: [
      'cancellationPolicyPage.sections.vsRefunds.p1',
      'cancellationPolicyPage.sections.vsRefunds.p2',
      'cancellationPolicyPage.sections.vsRefunds.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'accountClosure',
    icon: UserX,
    titleKey: 'cancellationPolicyPage.sections.accountClosure.title',
    tocKey: 'cancellationPolicyPage.toc.accountClosure',
    paragraphKeys: [
      'cancellationPolicyPage.sections.accountClosure.p1',
      'cancellationPolicyPage.sections.accountClosure.p2',
      'cancellationPolicyPage.sections.accountClosure.p3',
      'cancellationPolicyPage.sections.accountClosure.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'chargebacks',
    icon: AlertTriangle,
    titleKey: 'cancellationPolicyPage.sections.chargebacks.title',
    tocKey: 'cancellationPolicyPage.toc.chargebacks',
    paragraphKeys: [
      'cancellationPolicyPage.sections.chargebacks.p1',
      'cancellationPolicyPage.sections.chargebacks.p2',
      'cancellationPolicyPage.sections.chargebacks.p3',
    ],
  },
];

export default function CancellationPolicyPage() {
  const { t } = useLanguage();

  return (
    <PolicyPageShell
      badgeIcon={Ban}
      badgeKey="cancellationPolicyPage.badge"
      titleKey="footer.cancellationPolicy"
      subtitleKey="cancellationPolicyPage.subtitle"
      lastUpdatedKey="cancellationPolicyPage.lastUpdated"
      lastUpdatedDateKey="cancellationPolicyPage.lastUpdatedDate"
      highlightPill={{ icon: CheckCircle2, labelKey: 'cancellationPolicyPage.noSubscriptions' }}
      introKey="cancellationPolicyPage.introFull"
      tableOfContentsKey="cancellationPolicyPage.tableOfContents"
      sections={cancellationSections}
      contactTitleKey="cancellationPolicyPage.contact.title"
      contactDescriptionKey="cancellationPolicyPage.contact.description"
      backToHomeKey="cancellationPolicyPage.backToHome"
      showBusinessNotice={false}
      footerLinks={[
        POLICY_FOOTER_LINKS.terms,
        POLICY_FOOTER_LINKS.privacy,
        POLICY_FOOTER_LINKS.refund,
      ]}
    />
  );
}
