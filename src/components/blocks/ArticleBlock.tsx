import Image from 'next/image'
import { FileText } from 'lucide-react'

import type { ArticleBlockData } from '@/types/content'

export function ArticleBlock({ block }: { block: ArticleBlockData }) {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl font-bold text-blue-600 sm:text-5xl">{block.heading}</h1>

        <div className="relative mt-6">
          {block.imageUrl ? (
            <div className="relative aspect-[16/7] overflow-hidden rounded-sm bg-fog-100">
              <Image
                src={block.imageUrl}
                alt={block.imageAlt || block.heading}
                fill
                priority
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          {block.documentUrl ? (
            <a
              href={block.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -right-1 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700 sm:-right-3"
              aria-label={block.documentLabel || 'Download PDF'}
            >
              <FileText className="h-6 w-6" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="bg-fog-50 px-5 py-8 sm:px-10 sm:py-10">
          {block.sections.map((section) => (
            <section key={`${section.heading ?? ''}-${section.body.slice(0, 24)}`} className="not-first:mt-8">
              {section.heading ? (
                <h2 className="mb-3 text-2xl font-bold text-ink-900">{section.heading}</h2>
              ) : null}
              <p className="text-base leading-8 text-ink-700">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
