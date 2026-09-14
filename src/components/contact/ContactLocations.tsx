'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Phone } from 'lucide-react'
import classNames from 'classnames'

import type { ReactNode } from 'react'

import type { Campus } from '@/types/content'

const CampusMap = dynamic(() => import('@/components/contact/CampusMap').then((mod) => mod.CampusMap), {
  ssr: false,
  loading: () => (
    <div className="h-[24rem] w-full animate-pulse rounded-2xl border border-fog-100 bg-fog-50 sm:h-[32rem]" />
  ),
})

export function ContactLocations({
  token,
  campuses,
  children,
}: {
  token: string
  campuses: Campus[]
  children: ReactNode
}) {
  const [selectedId, setSelectedId] = useState(campuses[0]?.id ?? '')

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-navy-900">Locations</h2>
        <p className="mt-2 text-sm text-ink-700">Select a campus to move the map.</p>
      </div>
      {token ? (
        <div className="mt-6 w-full" aria-label="Map of Coop Tech campus locations">
          <CampusMap token={token} campuses={campuses} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-fog-100 bg-white p-5 text-sm text-ink-500">
          Add a Mapbox token to show the campus map.
        </p>
      )}

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">{children}</div>
        <ul className="space-y-3 lg:col-span-7">
          {campuses.map((campus) => {
            const selected = campus.id === selectedId
            return (
              <li key={campus.id}>
                <button
                  type="button"
                  className={classNames(
                    'w-full rounded-2xl border p-5 text-left transition',
                    selected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-fog-100 bg-white hover:border-blue-200 hover:bg-blue-50/50',
                  )}
                  onClick={() => setSelectedId(campus.id)}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{campus.borough}</p>
                  <h3 className="mt-1 text-xl font-bold text-navy-900">{campus.name}</h3>
                  <p className="mt-2 flex items-start gap-2 text-sm text-ink-700">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" />
                    {campus.address}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-ink-700">
                    <Phone className="h-4 w-4 text-navy-700" aria-hidden="true" />
                    <a href={`tel:${campus.phone.replace(/[^\d]/g, '')}`} onClick={(event) => event.stopPropagation()}>
                      {campus.phone}
                    </a>
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
