import { Clock } from 'lucide-react'

import { Button } from '@/components/ui/Button'

type ComingSoonProps = {
  title: string
  message?: string
}

export function ComingSoon({ title, message }: ComingSoonProps) {
  return (
    <section className="blob-field px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Clock className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Coming soon</p>
        <h1 className="mt-3 text-4xl font-bold text-navy-900 sm:text-5xl">{title}</h1>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-blue-600" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-ink-700">
          {message || 'This page is being updated. Please check back soon, or contact admissions if you need help now.'}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
