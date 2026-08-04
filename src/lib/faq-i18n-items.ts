import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Clock,
  CreditCard,
  UserCheck,
  Calendar,
  Shield,
  Globe,
  Scale,
  RefreshCw,
  Layers,
  HeartHandshake,
  Smartphone,
  CheckCircle2,
  Lock,
  HelpCircle,
} from 'lucide-react';

export const HOME_FAQ_COUNT = 16;

export type FaqI18nItemDef = {
  id: string;
  questionKey: string;
  answerKey: string;
  icon: LucideIcon;
};

const homeFaqIcons: LucideIcon[] = [
  Users,
  Clock,
  CreditCard,
  UserCheck,
  Calendar,
  Shield,
  Globe,
  Scale,
  RefreshCw,
  Layers,
  HeartHandshake,
  CheckCircle2,
  UserCheck,
  Shield,
  Smartphone,
  CreditCard,
];

export function getHomeFaqI18nItems(): FaqI18nItemDef[] {
  return Array.from({ length: HOME_FAQ_COUNT }, (_, index) => {
    const i = index + 1;
    return {
      id: `home-faq-${i}`,
      questionKey: `homeFaq.fallback${i}Q`,
      answerKey: `homeFaq.fallback${i}A`,
      icon: homeFaqIcons[index] ?? HelpCircle,
    };
  });
}

/** Extra topics on the full FAQ page (beyond the home section list). */
export const supplementalFaqI18nItems: FaqI18nItemDef[] = [
  {
    id: 'faq-policy',
    questionKey: 'faq.q1',
    answerKey: 'faq.a1',
    icon: Smartphone,
  },
  {
    id: 'faq-how-it-works',
    questionKey: 'faq.q2',
    answerKey: 'faq.a2',
    icon: Users,
  },
  {
    id: 'faq-multiple-apps',
    questionKey: 'faq.q6',
    answerKey: 'faq.a6',
    icon: CheckCircle2,
  },
  {
    id: 'faq-data-security',
    questionKey: 'faq.q8',
    answerKey: 'faq.a8',
    icon: Lock,
  },
];

export function getFullFaqI18nItems(): FaqI18nItemDef[] {
  return [...getHomeFaqI18nItems(), ...supplementalFaqI18nItems];
}
