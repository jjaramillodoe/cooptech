import { getContactIcon } from '@/lib/block-icons'
import type { ContactCardsBlockData } from '@/types/content'

export function ContactCardsBlock({ block }: { block: ContactCardsBlockData }) {
  if (block.items.length === 0) return null

  return (
    <section className="bg-fog-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.heading || block.intro ? (
          <div className="mx-auto max-w-2xl text-center">
            {block.heading ? (
              <>
                <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
                <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              </>
            ) : null}
            {block.intro ? <p className="mt-4 text-base leading-7 text-ink-700">{block.intro}</p> : null}
          </div>
        ) : null}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => {
            const Icon = getContactIcon(item.icon)
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">{item.label}</p>
                <p className="mt-2 text-lg font-bold text-navy-900">{item.value}</p>
              </>
            )

            return item.href ? (
              <a
                key={`${item.label}-${item.value}`}
                href={item.href}
                className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(26,39,68,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(26,39,68,0.1)]"
              >
                {inner}
              </a>
            ) : (
              <article
                key={`${item.label}-${item.value}`}
                className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(26,39,68,0.06)]"
              >
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
