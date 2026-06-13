'use client';

import {
  FileText,
  Scale,
  Users,
  CreditCard,
  Shield,
  Brain,
  AlertTriangle,
  Ban,
  Gavel,
  Building2,
  UserCheck,
  XCircle,
  Truck,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const termsSections: PolicySection[] = [
  {
    kind: 'paragraphs',
    id: 'about',
    icon: Building2,
    titleKey: 'termsPolicy.sections.about.title',
    tocKey: 'termsPolicy.toc.about',
    paragraphKeys: [
      'termsPolicy.sections.about.p1',
      'termsPolicy.sections.about.p2',
      'termsPolicy.sections.about.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'agreement',
    icon: Scale,
    titleKey: 'termsPolicy.sections.agreement.title',
    tocKey: 'termsPolicy.toc.agreement',
    paragraphKeys: [
      'termsPolicy.sections.agreement.p1',
      'termsPolicy.sections.agreement.p2',
      'termsPolicy.sections.agreement.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'definitions',
    icon: FileText,
    titleKey: 'termsPolicy.sections.definitions.title',
    tocKey: 'termsPolicy.toc.definitions',
    bulletKeys: [
      'termsPolicy.sections.definitions.p1',
      'termsPolicy.sections.definitions.p2',
      'termsPolicy.sections.definitions.p3',
      'termsPolicy.sections.definitions.p4',
      'termsPolicy.sections.definitions.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'services',
    icon: Users,
    titleKey: 'termsPolicy.sections.services.title',
    tocKey: 'termsPolicy.toc.services',
    paragraphKeys: [
      'termsPolicy.sections.services.p1',
      'termsPolicy.sections.services.p2',
      'termsPolicy.sections.services.p3',
      'termsPolicy.sections.services.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'eligibility',
    icon: UserCheck,
    titleKey: 'termsPolicy.sections.eligibility.title',
    tocKey: 'termsPolicy.toc.eligibility',
    paragraphKeys: [
      'termsPolicy.sections.eligibility.p1',
      'termsPolicy.sections.eligibility.p2',
      'termsPolicy.sections.eligibility.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'userAccounts',
    icon: Users,
    titleKey: 'termsPolicy.sections.userAccounts.title',
    tocKey: 'termsPolicy.toc.userAccounts',
    paragraphKeys: [
      'termsPolicy.sections.userAccounts.p1',
      'termsPolicy.sections.userAccounts.p2',
      'termsPolicy.sections.userAccounts.p3',
      'termsPolicy.sections.userAccounts.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'acceptableUse',
    icon: XCircle,
    titleKey: 'termsPolicy.sections.acceptableUse.title',
    tocKey: 'termsPolicy.toc.acceptableUse',
    bulletKeys: [
      'termsPolicy.sections.acceptableUse.p1',
      'termsPolicy.sections.acceptableUse.p2',
      'termsPolicy.sections.acceptableUse.p3',
      'termsPolicy.sections.acceptableUse.p4',
      'termsPolicy.sections.acceptableUse.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'orderFulfillment',
    icon: Truck,
    titleKey: 'termsPolicy.sections.orderFulfillment.title',
    tocKey: 'termsPolicy.toc.orderFulfillment',
    paragraphKeys: [
      'termsPolicy.sections.orderFulfillment.p1',
      'termsPolicy.sections.orderFulfillment.p2',
      'termsPolicy.sections.orderFulfillment.p3',
      'termsPolicy.sections.orderFulfillment.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'payment',
    icon: CreditCard,
    titleKey: 'termsPolicy.sections.payment.title',
    tocKey: 'termsPolicy.toc.payment',
    bulletKeys: [
      'termsPolicy.sections.payment.p1',
      'termsPolicy.sections.payment.p2',
      'termsPolicy.sections.payment.p3',
      'termsPolicy.sections.payment.p4',
      'termsPolicy.sections.payment.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'cancellation',
    icon: Ban,
    titleKey: 'termsPolicy.sections.cancellation.title',
    tocKey: 'termsPolicy.toc.cancellation',
    paragraphKeys: [
      'termsPolicy.sections.cancellation.p1',
      'termsPolicy.sections.cancellation.p2',
      'termsPolicy.sections.cancellation.p3',
      'termsPolicy.sections.cancellation.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'guarantee',
    icon: Shield,
    titleKey: 'termsPolicy.sections.guarantee.title',
    tocKey: 'termsPolicy.toc.guarantee',
    paragraphKeys: [
      'termsPolicy.sections.guarantee.p1',
      'termsPolicy.sections.guarantee.p2',
      'termsPolicy.sections.guarantee.p3',
      'termsPolicy.sections.guarantee.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'intellectualProperty',
    icon: Brain,
    titleKey: 'termsPolicy.sections.intellectualProperty.title',
    tocKey: 'termsPolicy.toc.intellectualProperty',
    paragraphKeys: [
      'termsPolicy.sections.intellectualProperty.p1',
      'termsPolicy.sections.intellectualProperty.p2',
      'termsPolicy.sections.intellectualProperty.p3',
      'termsPolicy.sections.intellectualProperty.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'liability',
    icon: AlertTriangle,
    titleKey: 'termsPolicy.sections.liability.title',
    tocKey: 'termsPolicy.toc.liability',
    bulletKeys: [
      'termsPolicy.sections.liability.p1',
      'termsPolicy.sections.liability.p2',
      'termsPolicy.sections.liability.p3',
      'termsPolicy.sections.liability.p4',
      'termsPolicy.sections.liability.p5',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'indemnification',
    icon: Handshake,
    titleKey: 'termsPolicy.sections.indemnification.title',
    tocKey: 'termsPolicy.toc.indemnification',
    paragraphKeys: [
      'termsPolicy.sections.indemnification.p1',
      'termsPolicy.sections.indemnification.p2',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'disclaimer',
    icon: AlertTriangle,
    titleKey: 'termsPolicy.sections.disclaimer.title',
    tocKey: 'termsPolicy.toc.disclaimer',
    paragraphKeys: [
      'termsPolicy.sections.disclaimer.p1',
      'termsPolicy.sections.disclaimer.p2',
      'termsPolicy.sections.disclaimer.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'termination',
    icon: Ban,
    titleKey: 'termsPolicy.sections.termination.title',
    tocKey: 'termsPolicy.toc.termination',
    paragraphKeys: [
      'termsPolicy.sections.termination.p1',
      'termsPolicy.sections.termination.p2',
      'termsPolicy.sections.termination.p3',
      'termsPolicy.sections.termination.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'disputeResolution',
    icon: Gavel,
    titleKey: 'termsPolicy.sections.disputeResolution.title',
    tocKey: 'termsPolicy.toc.disputeResolution',
    paragraphKeys: [
      'termsPolicy.sections.disputeResolution.p1',
      'termsPolicy.sections.disputeResolution.p2',
      'termsPolicy.sections.disputeResolution.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'governingLaw',
    icon: Gavel,
    titleKey: 'termsPolicy.sections.governingLaw.title',
    tocKey: 'termsPolicy.toc.governingLaw',
    paragraphKeys: [
      'termsPolicy.sections.governingLaw.p1',
      'termsPolicy.sections.governingLaw.p2',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'legalRestrictions',
    icon: AlertTriangle,
    titleKey: 'termsPolicy.sections.legalRestrictions.title',
    tocKey: 'termsPolicy.toc.legalRestrictions',
    paragraphKeys: [
      'termsPolicy.sections.legalRestrictions.p1',
      'termsPolicy.sections.legalRestrictions.p2',
      'termsPolicy.sections.legalRestrictions.p3',
      'termsPolicy.sections.legalRestrictions.p4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'generalProvisions',
    icon: FileText,
    titleKey: 'termsPolicy.sections.generalProvisions.title',
    tocKey: 'termsPolicy.toc.generalProvisions',
    bulletKeys: [
      'termsPolicy.sections.generalProvisions.p1',
      'termsPolicy.sections.generalProvisions.p2',
      'termsPolicy.sections.generalProvisions.p3',
      'termsPolicy.sections.generalProvisions.p4',
    ],
  },
];

function TermsPageContent() {
  return (
    <PolicyPageShell
      badgeIcon={FileText}
      badgeKey="termsPolicy.badge"
      titleKey="footer.termsAndConditions"
      subtitleKey="termsPolicy.subtitle"
      lastUpdatedKey="termsPolicy.lastUpdated"
      lastUpdatedDateKey="termsPolicy.lastUpdatedDate"
      introKey="termsPolicy.intro"
      tableOfContentsKey="termsPolicy.tableOfContents"
      sections={termsSections}
      contactTitleKey="termsPolicy.contact.title"
      contactDescriptionKey="termsPolicy.contact.description"
      backToHomeKey="termsPolicy.backToHome"
      highlightBanner={{
        icon: CheckCircle2,
        titleKey: 'termsPolicy.serviceHighlight.title',
        descriptionKey: 'termsPolicy.serviceHighlight.description',
      }}
      footerLinks={[
        POLICY_FOOTER_LINKS.privacy,
        POLICY_FOOTER_LINKS.refund,
        POLICY_FOOTER_LINKS.cancellation,
        POLICY_FOOTER_LINKS.cookie,
      ]}
    />
  );
}

export default function TermsPage() {
  return <TermsPageContent />;
}
