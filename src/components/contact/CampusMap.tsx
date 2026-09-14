'use client'

import { useEffect, useRef } from 'react'

import type { Campus } from '@/types/content'

type CampusMapProps = {
  token: string
  campuses: Campus[]
  selectedId: string
  onSelect: (id: string) => void
}

export function CampusMap({ token, campuses, selectedId, onSelect }: CampusMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('mapbox-gl').Map | null>(null)
  const markersRef = useRef<import('mapbox-gl').Marker[]>([])
  const onSelectRef = useRef(onSelect)
  const selectedIdRef = useRef(selectedId)
  const hasFlown = useRef(false)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    selectedIdRef.current = selectedId
    const map = mapRef.current
    const campus = campuses.find((item) => item.id === selectedId)
    if (!map || !campus) return
    if (!hasFlown.current) {
      hasFlown.current = true
      return
    }
    map.flyTo({ center: [campus.lng, campus.lat], zoom: 13, essential: true })
    markersRef.current.forEach((marker, index) => {
      const isSelected = campuses[index]?.id === selectedId
      marker.getElement().querySelectorAll('svg path')[1]?.setAttribute('fill', isSelected ? '#1547b0' : '#2f6fed')
    })
  }, [campuses, selectedId])

  useEffect(() => {
    if (!containerRef.current || !token) return
    let cancelled = false

    async function setup() {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')
      if (cancelled || !containerRef.current) return

      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-73.94, 40.72],
        zoom: 9.4,
      })
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      mapRef.current = map

      const bounds = new mapboxgl.LngLatBounds()
      markersRef.current = campuses.map((campus) => {
        bounds.extend([campus.lng, campus.lat])
        const marker = new mapboxgl.Marker({
          color: campus.id === selectedIdRef.current ? '#1547b0' : '#2f6fed',
        })
          .setLngLat([campus.lng, campus.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 28 }).setHTML(
              `<strong>${campus.name}</strong><br/><span>${campus.address}</span>`,
            ),
          )
          .addTo(map)
        marker.getElement().style.cursor = 'pointer'
        marker.getElement().addEventListener('click', () => onSelectRef.current(campus.id))
        return marker
      })

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 56, maxZoom: 12, duration: 0 })
      }
    }

    void setup()

    return () => {
      cancelled = true
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [campuses, token])

  return (
    <div
      ref={containerRef}
      className="h-[24rem] w-full overflow-hidden rounded-2xl border border-fog-100 bg-fog-50 sm:h-[32rem]"
      aria-label="Map of Coop Tech campus locations"
    />
  )
}
