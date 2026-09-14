import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import type { HeroBlockData } from '@/types/content'

export function Hero({ block }: { block: HeroBlockData }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {block.imageUrl ? (
        <Image
          src={block.imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-blue-800/40" />
      <div className="relative mx-auto flex min-h-[22rem] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
        {block.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">{block.eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{block.heading}</h1>
        {block.subheading ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{block.subheading}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {block.primaryHref && block.primaryLabel ? (
            <Button href={block.primaryHref} variant="primary">
              {block.primaryLabel}
            </Button>
          ) : null}
          {block.secondaryHref && block.secondaryLabel ? (
            <Button href={block.secondaryHref} variant="secondary">
              {block.secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
