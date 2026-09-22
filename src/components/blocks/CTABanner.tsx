import { ApplyButton, Button } from '@/components/ui/Button'
import { ADMISSIONS_PORTAL_URL, isPortalHref } from '@/lib/admissions'
import type { CTABannerBlockData } from '@/types/content'

export function CTABanner({ block }: { block: CTABannerBlockData }) {
  return (
    <section className="bg-blue-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
          {block.body ? <p className="mt-3 text-base leading-7 text-ink-700">{block.body}</p> : null}
        </div>
        {block.buttonHref && block.buttonLabel ? (
          block.buttonHref === '/admissions' || isPortalHref(block.buttonHref, ADMISSIONS_PORTAL_URL) ? (
            <ApplyButton className="shrink-0">{block.buttonLabel}</ApplyButton>
          ) : (
            <Button href={block.buttonHref} variant="primary" className="shrink-0">
              {block.buttonLabel}
            </Button>
          )
        ) : null}
      </div>
    </section>
  )
}
