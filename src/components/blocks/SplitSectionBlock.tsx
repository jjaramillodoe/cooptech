import Image from 'next/image'
import classNames from 'classnames'

import { Button } from '@/components/ui/Button'
import type { SplitSectionBlockData } from '@/types/content'

export function SplitSectionBlock({ block }: { block: SplitSectionBlockData }) {
  const imageFirst = block.imagePosition !== 'right'

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className={classNames(!imageFirst && 'lg:order-2')}>
          {block.imageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-fog-100">
              <Image
                src={block.imageUrl}
                alt={block.imageAlt || block.heading}
                fill
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-2xl bg-fog-100" />
          )}
        </div>
        <div className={classNames(!imageFirst && 'lg:order-1')}>
          {block.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{block.eyebrow}</p>
          ) : null}
          <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
          <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
          <p className="mt-6 text-base leading-7 text-ink-700">{block.body}</p>
          {block.buttonHref && block.buttonLabel ? (
            <div className="mt-8">
              <Button href={block.buttonHref} variant="primary">
                {block.buttonLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
