'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, StarHalf } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/Button'
import type { TestimonialItem, TestimonialsBlockData } from '@/types/content'

function StarRating({ rating }: { rating?: string }) {
  if (!rating) return null
  const value = Number.parseFloat(rating)
  if (Number.isNaN(value) || value <= 0) return null
  const fullStars = Math.min(5, Math.floor(value))
  const hasHalf = value % 1 !== 0 && fullStars < 5

  return (
    <div className="flex gap-0.5 text-blue-600" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
      {hasHalf ? <StarHalf className="h-4 w-4 fill-current" aria-hidden="true" /> : null}
    </div>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const hasImage = Boolean(item.imageUrl)

  return (
    <article
      data-card
      className="w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[0_10px_30px_rgba(26,39,68,0.06)] sm:w-[calc(50%-12px)]"
    >
      <div className={hasImage ? 'grid grid-cols-1 lg:grid-cols-2' : ''}>
        {hasImage ? (
          <div className="relative aspect-[4/3] bg-fog-100 lg:aspect-auto lg:min-h-full">
            <Image
              src={item.imageUrl!}
              alt={item.imageAlt || item.authorName}
              fill
              sizes="(min-width: 1024px) 16rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-between gap-4 p-6">
          <div>
            <p className="text-sm font-semibold text-navy-900">{item.authorName}</p>
            {item.authorRole || item.authorCompany ? (
              <p className="mt-1 text-sm text-ink-700">
                {item.authorRole}
                {item.authorCompany ? (
                  <span className="font-medium text-navy-900">
                    {item.authorRole ? ' at ' : ''}
                    {item.authorCompany}
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>
          <hr className="border-ink-900/10" />
          <StarRating rating={item.rating} />
          <p className="text-base leading-7 text-ink-700">“{item.quote}”</p>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsBlock({ block }: { block: TestimonialsBlockData }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const items = block.items ?? []
  if (items.length === 0) return null

  function scrollBy(direction: number) {
    const scroller = scrollRef.current
    if (!scroller) return
    const card = scroller.querySelector('[data-card]')
    if (!card) return
    scroller.scrollBy({ left: direction * (card.clientWidth + 24), behavior: 'smooth' })
  }

  return (
    <section className="bg-fog-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            {block.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{block.eyebrow}</p>
            ) : null}
            {block.heading ? (
              <>
                <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
                <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              </>
            ) : null}
            {block.intro ? <p className="mt-4 text-base leading-7 text-ink-700">{block.intro}</p> : null}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {block.buttonHref && block.buttonLabel ? (
              <Button href={block.buttonHref} variant="ghost">
                {block.buttonLabel}
              </Button>
            ) : null}
            {items.length > 1 ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-navy-900 transition hover:border-blue-600 hover:text-blue-700"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 bg-white text-navy-900 transition hover:border-blue-600 hover:text-blue-700"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <TestimonialCard key={`${item.authorName}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
