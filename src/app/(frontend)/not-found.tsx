import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Coop Tech' },
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">404</p>
      <h1 className="mt-3 text-4xl font-bold text-navy-900">This page is not on the course map</h1>
      <p className="mt-4 text-ink-700">
        The page you requested is not part of the Coop Tech site. Return home or browse programs.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/" variant="primary">
          Back home
        </Button>
        <Button href="/programs" variant="ghost">
          View programs
        </Button>
      </div>
    </section>
  )
}
