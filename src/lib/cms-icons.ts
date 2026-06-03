import type { LucideIcon } from 'lucide-react';
import {
  HelpCircle,
  Smartphone,
  Users,
  CreditCard,
  Shield,
  Clock,
  CheckCircle2,
  Globe,
  Lock,
  Sparkles,
  Zap,
  Bug,
  LayoutDashboard,
  Gift,
  BarChart3,
  Mail,
  Code,
  Rocket,
  Headphones,
  MessageSquare,
  Activity,
  AlertTriangle,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  HelpCircle,
  Smartphone,
  Users,
  CreditCard,
  Shield,
  Clock,
  CheckCircle2,
  Globe,
  Lock,
  Sparkles,
  Zap,
  Bug,
  LayoutDashboard,
  Gift,
  BarChart3,
  Mail,
  Code,
  Rocket,
  Headphones,
  MessageSquare,
  Activity,
  AlertTriangle,
};

export function getCmsIcon(name?: string | null): LucideIcon {
  if (!name) return HelpCircle;
  return iconMap[name] || HelpCircle;
}
