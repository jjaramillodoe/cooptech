'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, Phone, Search, X } from 'lucide-react'

import type { StaffCategory, StaffMember } from '@/types/staff'
import { staffCategoryLabels } from '@/types/staff'

const categories: StaffCategory[] = ['administration', 'faculty', 'guidance', 'support']

function displayName(member: StaffMember) {
  return `${member.lastName}, ${member.firstName}`
}

function matchesQuery(member: StaffMember, query: string) {
  const haystack = [
    member.firstName,
    member.lastName,
    `${member.lastName}, ${member.firstName}`,
    member.role,
    staffCategoryLabels[member.category],
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

export function StaffDirectory({ staff }: { staff: StaffMember[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<StaffCategory | 'all'>('all')
  const [selected, setSelected] = useState<StaffMember | null>(null)
  const normalized = query.trim().toLowerCase()

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  const grouped = useMemo(() => {
    const filtered = staff.filter((member) => {
      if (activeCategory !== 'all' && member.category !== activeCategory) return false
      return normalized ? matchesQuery(member, normalized) : true
    })
    return categories
      .map((category) => ({
        category,
        members: filtered
          .filter((member) => member.category === category)
          .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)),
      }))
      .filter((group) => group.members.length > 0)
  }, [activeCategory, normalized, staff])

  const resultCount = grouped.reduce((total, group) => total + group.members.length, 0)
  const isFiltered = Boolean(normalized) || activeCategory !== 'all'

  return (
    <div>
      <label className="relative mx-auto block max-w-xl">
        <span className="sr-only">Search staff by name, role, or department</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, role, or department"
          className="w-full rounded-full border border-fog-100 bg-white py-3 pl-11 pr-11 text-sm text-navy-900 outline-none ring-blue-500 placeholder:text-ink-500 focus:ring-2"
        />
        {query ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-500 hover:text-navy-900"
            aria-label="Clear search"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-fog-50 text-ink-700 hover:bg-blue-50'
          }`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              activeCategory === category ? 'bg-blue-600 text-white' : 'bg-fog-50 text-ink-700 hover:bg-blue-50'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {staffCategoryLabels[category]}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm italic text-ink-500" aria-live="polite">
        {isFiltered
          ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}${normalized ? ` for “${query.trim()}”` : ''}`
          : 'Select any name below for contact information'}
      </p>

      {grouped.length === 0 ? (
        <p className="mt-10 text-center text-ink-700">No staff members match that search.</p>
      ) : (
        grouped.map((group) => (
          <section key={group.category} className="mt-12 border-t border-fog-100 pt-8">
            <h2 className="text-2xl font-bold text-navy-900">{staffCategoryLabels[group.category]}</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-1 py-1.5 text-left text-sm text-ink-700 transition hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setSelected(member)}
                  >
                    <span className="font-medium">{displayName(member)}</span>
                    <span> - {member.role}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/40 p-4 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              {staffCategoryLabels[selected.category]}
            </p>
            <h3 id="staff-dialog-title" className="mt-1 text-2xl font-bold text-navy-900">
              {selected.firstName} {selected.lastName}
            </h3>
            <p className="mt-1 text-sm text-ink-700">{selected.role}</p>
            <div className="mt-5 space-y-2 text-sm text-ink-700">
              {selected.email ? (
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <a className="text-blue-600 underline" href={`mailto:${selected.email}`}>
                    {selected.email}
                  </a>
                </p>
              ) : null}
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <a href={`tel:${(selected.phone || '212-369-8800').replace(/[^\d]/g, '')}`}>
                  {selected.phone || 'Main office (212) 369-8800'}
                </a>
              </p>
              {!selected.email ? (
                <p className="text-ink-500">Call the main office to reach this staff member.</p>
              ) : null}
            </div>
            <button
              type="button"
              className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
