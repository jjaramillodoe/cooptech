'use client'

import { useMemo, useState } from 'react'
import classNames from 'classnames'

import { ProgramCard } from '@/components/programs/ProgramCard'
import type { Program, ProgramCategory } from '@/types/content'

const filters: { label: string; value: 'all' | ProgramCategory }[] = [
  { label: 'All programs', value: 'all' },
  { label: 'Automotive', value: 'automotive' },
  { label: 'Construction', value: 'construction' },
  { label: 'Culinary', value: 'culinary' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Health', value: 'health' },
  { label: 'IT', value: 'it' },
  { label: 'Styling', value: 'styling' },
  { label: 'Work-Based Learning', value: 'wbl' },
  { label: 'OSHA', value: 'osha' },
]

export function ProgramFilters({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState<(typeof filters)[number]['value']>('all')

  const visible = useMemo(
    () => (active === 'all' ? programs : programs.filter((program) => program.category === active)),
    [active, programs],
  )

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter programs by career area"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const selected = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={selected}
              className={classNames(
                'rounded-full px-4 py-2 text-sm font-medium transition duration-200',
                selected
                  ? 'bg-blue-600 text-white'
                  : 'border border-fog-100 bg-white text-ink-700 hover:border-blue-600 hover:text-blue-700',
              )}
              onClick={() => setActive(filter.value)}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-sm text-ink-500" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'program' : 'programs'}
      </p>
      {visible.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-navy-900/20 bg-white p-8 text-ink-700">
          No programs match this filter yet. Check back after the CMS is updated.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  )
}
