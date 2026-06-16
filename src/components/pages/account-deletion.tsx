'use client';

import {
  UserX,
  Smartphone,
  Trash2,
  Database,
  Archive,
  Clock,
  Mail,
} from 'lucide-react';
import {
  PolicyPageShell,
  POLICY_FOOTER_LINKS,
  type PolicySection,
} from '@/components/legal/policy-page-shell';

const accountDeletionSections: PolicySection[] = [
  {
    kind: 'paragraphs',
    id: 'scope',
    icon: Smartphone,
    titleKey: 'accountDeletionPage.sections.scope.title',
    tocKey: 'accountDeletionPage.toc.scope',
    paragraphKeys: [
      'accountDeletionPage.sections.scope.p1',
      'accountDeletionPage.sections.scope.p2',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'howToDelete',
    icon: Mail,
    titleKey: 'accountDeletionPage.sections.howToDelete.title',
    tocKey: 'accountDeletionPage.toc.howToDelete',
    introKey: 'accountDeletionPage.sections.howToDelete.intro',
    bulletKeys: [
      'accountDeletionPage.sections.howToDelete.step1',
      'accountDeletionPage.sections.howToDelete.step2',
      'accountDeletionPage.sections.howToDelete.step3',
      'accountDeletionPage.sections.howToDelete.step4',
      'accountDeletionPage.sections.howToDelete.step5',
    ],
    paragraphKeys: ['accountDeletionPage.sections.howToDelete.p1'],
  },
  {
    kind: 'paragraphs',
    id: 'dataDeleted',
    icon: Trash2,
    titleKey: 'accountDeletionPage.sections.dataDeleted.title',
    tocKey: 'accountDeletionPage.toc.dataDeleted',
    introKey: 'accountDeletionPage.sections.dataDeleted.intro',
    bulletKeys: [
      'accountDeletionPage.sections.dataDeleted.item1',
      'accountDeletionPage.sections.dataDeleted.item2',
      'accountDeletionPage.sections.dataDeleted.item3',
      'accountDeletionPage.sections.dataDeleted.item4',
      'accountDeletionPage.sections.dataDeleted.item5',
      'accountDeletionPage.sections.dataDeleted.item6',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'dataRetained',
    icon: Archive,
    titleKey: 'accountDeletionPage.sections.dataRetained.title',
    tocKey: 'accountDeletionPage.toc.dataRetained',
    introKey: 'accountDeletionPage.sections.dataRetained.intro',
    bulletKeys: [
      'accountDeletionPage.sections.dataRetained.item1',
      'accountDeletionPage.sections.dataRetained.item2',
      'accountDeletionPage.sections.dataRetained.item3',
      'accountDeletionPage.sections.dataRetained.item4',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'retentionPeriod',
    icon: Clock,
    titleKey: 'accountDeletionPage.sections.retentionPeriod.title',
    tocKey: 'accountDeletionPage.toc.retentionPeriod',
    paragraphKeys: [
      'accountDeletionPage.sections.retentionPeriod.p1',
      'accountDeletionPage.sections.retentionPeriod.p2',
      'accountDeletionPage.sections.retentionPeriod.p3',
    ],
  },
  {
    kind: 'paragraphs',
    id: 'processingTime',
    icon: Database,
    titleKey: 'accountDeletionPage.sections.processingTime.title',
    tocKey: 'accountDeletionPage.toc.processingTime',
    paragraphKeys: [
      'accountDeletionPage.sections.processingTime.p1',
      'accountDeletionPage.sections.processingTime.p2',
      'accountDeletionPage.sections.processingTime.p3',
    ],
  },
];

export default function AccountDeletionPage() {
  return (
    <PolicyPageShell
      badgeIcon={UserX}
      badgeKey="accountDeletionPage.badge"
      titleKey="footer.accountDeletion"
      subtitleKey="accountDeletionPage.subtitle"
      lastUpdatedKey="accountDeletionPage.lastUpdated"
      lastUpdatedDateKey="accountDeletionPage.lastUpdatedDate"
      highlightPill={{ icon: Smartphone, labelKey: 'accountDeletionPage.appName' }}
      introKey="accountDeletionPage.introFull"
      tableOfContentsKey="accountDeletionPage.tableOfContents"
      sections={accountDeletionSections}
      contactTitleKey="accountDeletionPage.contact.title"
      contactDescriptionKey="accountDeletionPage.contact.description"
      backToHomeKey="accountDeletionPage.backToHome"
      showBusinessNotice={true}
      highlightBanner={{
        icon: Mail,
        titleKey: 'accountDeletionPage.highlight.title',
        descriptionKey: 'accountDeletionPage.highlight.description',
      }}
      footerLinks={[
        POLICY_FOOTER_LINKS.privacy,
        POLICY_FOOTER_LINKS.terms,
        POLICY_FOOTER_LINKS.cancellation,
      ]}
    />
  );
}
