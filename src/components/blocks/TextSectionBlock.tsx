import { Button } from '@/components/ui/Button'
import type { TextSectionBlockData } from '@/types/content'

export function TextSectionBlock({ block }: { block: TextSectionBlockData }) {
  const paragraphs = block.body.split(/\n\n+/).map((part) => part.trim()).filter(Boolean)

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {block.heading ? (
          <>
            <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
            <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
          </>
        ) : null}
        <div className={block.heading ? 'mt-6 space-y-4' : 'space-y-4'}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-base leading-7 text-ink-700">
              {paragraph}
            </p>
          ))}
        </div>
        {block.buttonHref && block.buttonLabel ? (
          <div className="mt-8">
            <Button href={block.buttonHref} variant="primary">
              {block.buttonLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
