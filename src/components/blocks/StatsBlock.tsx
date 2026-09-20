import type { StatsBlockData } from '@/types/content'

export function StatsBlock({ block }: { block: StatsBlockData }) {
  return (
    <section className="bg-navy-900 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.heading ? (
          <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">{block.heading}</h2>
        ) : null}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <div key={`${item.value}-${item.label}`} className="text-center">
              <p className="text-4xl font-bold text-blue-100 sm:text-5xl">{item.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
