import type { QuoteBlockData } from '@/types/content'

export function QuoteBlock({ block }: { block: QuoteBlockData }) {
  return (
    <section className="bg-fog-50 py-16">
      <blockquote className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-2xl font-semibold leading-9 text-navy-900 sm:text-3xl">“{block.quote}”</p>
        {block.attribution || block.role ? (
          <footer className="mt-6 text-sm font-medium text-ink-700">
            {block.attribution ? <cite className="not-italic font-semibold text-navy-900">{block.attribution}</cite> : null}
            {block.attribution && block.role ? <span> · </span> : null}
            {block.role ? <span>{block.role}</span> : null}
          </footer>
        ) : null}
      </blockquote>
    </section>
  )
}
