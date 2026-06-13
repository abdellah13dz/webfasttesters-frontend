'use client';

import {
  FileText,
  Gavel,
  DollarSign,
  CreditCard,
  UserCheck,
  Ban,
  Settings,
  AlertOctagon,
} from 'lucide-react';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const referralSections: PolicySection[] = [
  {
    kind: 'paragraphs',
    id: 'binding',
    icon: Gavel,
    titleKey: 'referralPolicyPage.sections.binding.title',
    tocKey: 'referralPolicyPage.sections.binding.title',
    paragraphKeys: [
      'referralPolicyPage.sections.binding.p1',
      'referralPolicyPage.sections.binding.p2',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'commission',
    icon: DollarSign,
    titleKey: 'referralPolicyPage.sections.commission.title',
    tocKey: 'referralPolicyPage.sections.commission.title',
    bulletKeys: [
      'referralPolicyPage.sections.commission.p1',
      'referralPolicyPage.sections.commission.p2',
      'referralPolicyPage.sections.commission.p3',
      'referralPolicyPage.sections.commission.p4',
      'referralPolicyPage.sections.commission.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'payout',
    icon: CreditCard,
    titleKey: 'referralPolicyPage.sections.payout.title',
    tocKey: 'referralPolicyPage.sections.payout.title',
    bulletKeys: [
      'referralPolicyPage.sections.payout.p1',
      'referralPolicyPage.sections.payout.p2',
      'referralPolicyPage.sections.payout.p3',
      'referralPolicyPage.sections.payout.p4',
      'referralPolicyPage.sections.payout.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'eligibility',
    icon: UserCheck,
    titleKey: 'referralPolicyPage.sections.eligibility.title',
    tocKey: 'referralPolicyPage.sections.eligibility.title',
    bulletKeys: [
      'referralPolicyPage.sections.eligibility.p1',
      'referralPolicyPage.sections.eligibility.p2',
      'referralPolicyPage.sections.eligibility.p3',
      'referralPolicyPage.sections.eligibility.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'prohibited',
    icon: Ban,
    titleKey: 'referralPolicyPage.sections.prohibited.title',
    tocKey: 'referralPolicyPage.sections.prohibited.title',
    introKey: 'referralPolicyPage.sections.prohibited.p1',
    bulletKeys: [
      'referralPolicyPage.sections.prohibited.item1',
      'referralPolicyPage.sections.prohibited.item2',
      'referralPolicyPage.sections.prohibited.item3',
      'referralPolicyPage.sections.prohibited.item4',
      'referralPolicyPage.sections.prohibited.item5',
      'referralPolicyPage.sections.prohibited.item6',
      'referralPolicyPage.sections.prohibited.item7',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'modifications',
    icon: Settings,
    titleKey: 'referralPolicyPage.sections.modifications.title',
    tocKey: 'referralPolicyPage.sections.modifications.title',
    paragraphKeys: [
      'referralPolicyPage.sections.modifications.p1',
      'referralPolicyPage.sections.modifications.p2',
      'referralPolicyPage.sections.modifications.p3',
      'referralPolicyPage.sections.modifications.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'termination',
    icon: AlertOctagon,
    titleKey: 'referralPolicyPage.sections.termination.title',
    tocKey: 'referralPolicyPage.sections.termination.title',
    bulletKeys: [
      'referralPolicyPage.sections.termination.p1',
      'referralPolicyPage.sections.termination.p2',
      'referralPolicyPage.sections.termination.p3',
      'referralPolicyPage.sections.termination.p4',
      'referralPolicyPage.sections.termination.p5',
    ],
  },
];

export default function ReferralPolicyPage() {
  return (
    <PolicyPageShell
      badgeIcon={FileText}
      badgeKey="referralPolicyPage.badge"
      titleKey="footer.referralPolicy"
      subtitleKey="referralPolicyPage.subtitle"
      lastUpdatedKey="referralPolicyPage.lastUpdated"
      lastUpdatedDateKey="referralPolicyPage.lastUpdatedDate"
      introKey="referralPolicyPage.intro"
      tableOfContentsKey="referralPolicyPage.tableOfContents"
      sections={referralSections}
      contactTitleKey="referralPolicyPage.contact.title"
      contactDescriptionKey="referralPolicyPage.contact.description"
      backToHomeKey="referralPolicyPage.backToHome"
      footerLinks={[
        { labelKey: 'footer.affiliateProgram', path: '/app-testing-referral-program' },
        POLICY_FOOTER_LINKS.terms,
        POLICY_FOOTER_LINKS.privacy,
        POLICY_FOOTER_LINKS.refund,
      ]}
    />
  );
}
