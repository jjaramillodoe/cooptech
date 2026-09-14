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
    <div className="relative mt-8 overflow-hidden rounded-lg bg-fog-50">
      <div className="relative aspect-[16/7] w-full">
        <Image
          src={slides[index]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="object-cover"
        />
      </div>
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy-900 shadow-sm hover:bg-white"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy-900 shadow-sm hover:bg-white"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Program photos">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide}
                type="button"
                role="tab"
                aria-label={`Show photo ${slideIndex + 1}`}
                aria-selected={slideIndex === index}
                className={`h-2.5 w-2.5 rounded-full ${
                  slideIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
