'use client'

import { Button } from '@/components/ui/Button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-bold text-navy-900">Something went wrong</h1>
      <p className="mt-4 text-ink-700">The page could not be loaded. Try again or return to the homepage.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button type="button" variant="primary" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="ghost">
          Back home
        </Button>
      </div>
    </section>
  )
}
