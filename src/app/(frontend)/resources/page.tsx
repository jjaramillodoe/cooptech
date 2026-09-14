import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getAnnouncements, getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('resources', '/resources')
}

export default async function ResourcesPage() {
  const [page, announcements] = await Promise.all([getPageBySlug('resources'), getAnnouncements()])

  return (
    <>
      {page ? <RenderBlocks blocks={page.layout} /> : null}
      <section className="bg-fog-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-navy-900">Alerts, events, and calendar</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {announcements.map((item) => (
              <article key={item.id} className="rounded-2xl border border-fog-100 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                  {item.kind}
                </p>
                <h3 className="mt-2 text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
