'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProgramCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const slides = images.filter(Boolean)

  if (slides.length === 0) return null

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-fog-50 shadow-[0_10px_30px_rgba(26,39,68,0.06)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={slides[index]}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="object-cover"
          />
        </div>
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm hover:bg-white"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm hover:bg-white"
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
      {slides.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Program photos">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide}
              type="button"
              role="tab"
              aria-label={`Show photo ${slideIndex + 1}`}
              aria-selected={slideIndex === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ${
                slideIndex === index ? 'ring-2 ring-blue-600 ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setIndex(slideIndex)}
            >
              <Image src={slide} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
