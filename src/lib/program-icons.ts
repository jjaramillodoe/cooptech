import { Briefcase, Car, ChefHat, Cpu, Hammer, HardHat, HeartPulse, Scissors, Zap } from 'lucide-react'

import type { ProgramCategory } from '@/types/content'

export const programIcons = {
  automotive: Car,
  construction: Hammer,
  culinary: ChefHat,
  electrical: Zap,
  health: HeartPulse,
  it: Cpu,
  styling: Scissors,
  wbl: Briefcase,
  osha: HardHat,
} as const satisfies Record<ProgramCategory, typeof Car>
