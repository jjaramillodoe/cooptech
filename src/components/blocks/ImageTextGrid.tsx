import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { ImageTextGridBlockData } from '@/types/content'

export function ImageTextGrid({ block }: { block: ImageTextGridBlockData }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.heading ? <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2> : null}
        {block.intro ? <p className="mt-3 max-w-2xl text-base leading-7 text-ink-700">{block.intro}</p> : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => {
            const inner = (
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-700">{item.body}</p>
                {item.href ? (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            )

            const cardClass =
              'group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(26,39,68,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(26,39,68,0.1)]'

            if (item.href) {
              return (
                <Link key={item.title} href={item.href} className={cardClass}>
                  {inner}
                </Link>
              )
            }

            return (
              <article key={item.title} className={cardClass}>
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
