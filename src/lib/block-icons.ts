import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
  type LucideIcon,
} from 'lucide-react'

import type { FeatureGridIcon } from '@/types/content'

export const blockIconOptions = [
  { label: 'Graduation cap', value: 'graduation-cap' },
  { label: 'Users', value: 'users' },
  { label: 'Award', value: 'award' },
  { label: 'Book', value: 'book' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Clock', value: 'clock' },
  { label: 'Building', value: 'building' },
  { label: 'Map pin', value: 'map-pin' },
  { label: 'Phone', value: 'phone' },
  { label: 'Mail', value: 'mail' },
  { label: 'Heart', value: 'heart' },
  { label: 'Check', value: 'check' },
  { label: 'Star', value: 'star' },
] as const

export type BlockIconName = FeatureGridIcon

export const blockIcons: Record<BlockIconName, LucideIcon> = {
  'graduation-cap': GraduationCap,
  users: Users,
  award: Award,
  book: BookOpen,
  calendar: Calendar,
  clock: Clock,
  building: Building2,
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  heart: HeartPulse,
  check: CheckCircle,
  star: Star,
}

export function getBlockIcon(name?: string): LucideIcon {
  if (name && name in blockIcons) return blockIcons[name as BlockIconName]
  return GraduationCap
}
