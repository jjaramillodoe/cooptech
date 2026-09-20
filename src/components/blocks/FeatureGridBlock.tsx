import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { getBlockIcon } from '@/lib/block-icons'
import type { FeatureGridBlockData } from '@/types/content'

export function FeatureGridBlock({ block }: { block: FeatureGridBlockData }) {
  return (
    <section className="bg-fog-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.heading ? (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
            {block.intro ? <p className="mt-4 text-base leading-7 text-ink-700">{block.intro}</p> : null}
          </div>
        ) : null}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => {
            const Icon = getBlockIcon(item.icon)
            const card = (
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(26,39,68,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-700">{item.body}</p>
                {item.href ? (
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    {item.linkLabel || 'Learn More'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </article>
            )

            return item.href ? (
              <Link key={item.title} href={item.href} className="block h-full transition hover:-translate-y-0.5">
                {card}
              </Link>
            ) : (
              <div key={item.title}>{card}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
