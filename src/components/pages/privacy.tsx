'use client';

import {
  Shield,
  UserCheck,
  Eye,
  Database,
  Lock,
  Cookie,
  Building2,
  Scale,
  Globe,
  Clock,
  Baby,
  CreditCard,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { CmsPageOrFallback } from '@/lib/hooks/use-cms-page';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const privacySections: PolicySection[] = [
  {
    kind: 'items',
    id: 'whoWeAre',
    icon: Building2,
    titleKey: 'privacyPolicy.sections.whoWeAre.title',
    tocKey: 'privacyPolicy.toc.whoWeAre',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.whoWeAre.dataController.subtitle',
        descriptionKey: 'privacyPolicy.sections.whoWeAre.dataController.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.whoWeAre.scope.subtitle',
        descriptionKey: 'privacyPolicy.sections.whoWeAre.scope.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'informationWeCollect',
    icon: Database,
    titleKey: 'privacyPolicy.sections.informationWeCollect.title',
    tocKey: 'privacyPolicy.toc.informationWeCollect',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.personalInfo.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.personalInfo.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.appTestingData.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.appTestingData.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.informationWeCollect.usageData.subtitle',
        descriptionKey: 'privacyPolicy.sections.informationWeCollect.usageData.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'howWeUse',
    icon: Eye,
    titleKey: 'privacyPolicy.sections.howWeUse.title',
    tocKey: 'privacyPolicy.toc.howWeUse',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.provideServices.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.provideServices.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.improveServices.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.improveServices.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.howWeUse.communication.subtitle',
        descriptionKey: 'privacyPolicy.sections.howWeUse.communication.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'dataSharing',
    icon: UserCheck,
    titleKey: 'privacyPolicy.sections.dataSharing.title',
    tocKey: 'privacyPolicy.toc.dataSharing',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.noSelling.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.noSelling.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.testers.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.testers.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.serviceProviders.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.serviceProviders.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.stripe.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.stripe.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSharing.legalRequirements.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSharing.legalRequirements.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'legalBasis',
    icon: Scale,
    titleKey: 'privacyPolicy.sections.legalBasis.title',
    tocKey: 'privacyPolicy.toc.legalBasis',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.contract.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.contract.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.legitimateInterests.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.legitimateInterests.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.legalObligation.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.legalObligation.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.legalBasis.consent.subtitle',
        descriptionKey: 'privacyPolicy.sections.legalBasis.consent.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'dataSecurity',
    icon: Lock,
    titleKey: 'privacyPolicy.sections.dataSecurity.title',
    tocKey: 'privacyPolicy.toc.dataSecurity',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.encryption.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.encryption.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.secureServers.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.secureServers.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataSecurity.regularAudits.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataSecurity.regularAudits.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'yourRights',
    icon: Shield,
    titleKey: 'privacyPolicy.sections.yourRights.title',
    tocKey: 'privacyPolicy.toc.yourRights',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.access.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.access.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.delete.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.delete.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.modify.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.modify.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.portability.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.portability.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.object.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.object.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.restrict.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.restrict.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.yourRights.complain.subtitle',
        descriptionKey: 'privacyPolicy.sections.yourRights.complain.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'dataRetention',
    icon: Clock,
    titleKey: 'privacyPolicy.sections.dataRetention.title',
    tocKey: 'privacyPolicy.toc.dataRetention',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.account.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.account.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.transactions.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.transactions.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.testing.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.testing.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.dataRetention.support.subtitle',
        descriptionKey: 'privacyPolicy.sections.dataRetention.support.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'internationalTransfers',
    icon: Globe,
    titleKey: 'privacyPolicy.sections.internationalTransfers.title',
    tocKey: 'privacyPolicy.toc.internationalTransfers',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.internationalTransfers.global.subtitle',
        descriptionKey: 'privacyPolicy.sections.internationalTransfers.global.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.internationalTransfers.safeguards.subtitle',
        descriptionKey: 'privacyPolicy.sections.internationalTransfers.safeguards.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'childrenPrivacy',
    icon: Baby,
    titleKey: 'privacyPolicy.sections.childrenPrivacy.title',
    tocKey: 'privacyPolicy.toc.childrenPrivacy',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.childrenPrivacy.ageRestriction.subtitle',
        descriptionKey: 'privacyPolicy.sections.childrenPrivacy.ageRestriction.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.childrenPrivacy.parentalContact.subtitle',
        descriptionKey: 'privacyPolicy.sections.childrenPrivacy.parentalContact.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'ccpa',
    icon: CreditCard,
    titleKey: 'privacyPolicy.sections.ccpa.title',
    tocKey: 'privacyPolicy.toc.ccpa',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToKnow.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToKnow.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToDelete.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToDelete.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.rightToOptOut.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.rightToOptOut.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.ccpa.nonDiscrimination.subtitle',
        descriptionKey: 'privacyPolicy.sections.ccpa.nonDiscrimination.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'cookies',
    icon: Cookie,
    titleKey: 'privacyPolicy.sections.cookies.title',
    tocKey: 'privacyPolicy.toc.cookies',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.cookies.essentialOnly.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.essentialOnly.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.cookies.analytics.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.analytics.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.cookies.management.subtitle',
        descriptionKey: 'privacyPolicy.sections.cookies.management.description',
      },
    ],
  },
  {
    kind: 'items',
    id: 'changes',
    icon: RefreshCw,
    titleKey: 'privacyPolicy.sections.changes.title',
    tocKey: 'privacyPolicy.toc.changes',
    nestedCards: true,
    items: [
      {
        subtitleKey: 'privacyPolicy.sections.changes.updates.subtitle',
        descriptionKey: 'privacyPolicy.sections.changes.updates.description',
      },
      {
        subtitleKey: 'privacyPolicy.sections.changes.materialChanges.subtitle',
        descriptionKey: 'privacyPolicy.sections.changes.materialChanges.description',
      },
    ],
  },
];

function PrivacyPageContent() {
  return (
    <PolicyPageShell
      badgeIcon={Shield}
      badgeKey="privacyPolicy.badge"
      titleKey="footer.privacyPolicy"
      subtitleKey="privacyPolicy.subtitle"
      lastUpdatedKey="privacyPolicy.lastUpdated"
      lastUpdatedDateKey="privacyPolicy.lastUpdatedDate"
      highlightPill={{ icon: Shield, labelKey: 'privacyPolicy.gdprCompliant' }}
      introKey="privacyPolicy.intro"
      tableOfContentsKey="privacyPolicy.tableOfContents"
      sections={privacySections}
      contactTitleKey="privacyPolicy.contact.title"
      contactDescriptionKey="privacyPolicy.contact.description"
      backToHomeKey="privacyPolicy.backToHome"
      highlightBanner={{
        icon: CreditCard,
        titleKey: 'privacyPolicy.stripeHighlight.title',
        descriptionKey: 'privacyPolicy.stripeHighlight.description',
      }}
      footerLinks={[
        POLICY_FOOTER_LINKS.terms,
        POLICY_FOOTER_LINKS.refund,
        POLICY_FOOTER_LINKS.cancellation,
        POLICY_FOOTER_LINKS.cookie,
      ]}
    />
  );
}

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <CmsPageOrFallback slug="privacy-policy" badge={t('privacyPolicy.cmsBadge')}>
      <PrivacyPageContent />
    </CmsPageOrFallback>
  );
}
