import Image from 'next/image'

import type { GalleryBlockData } from '@/types/content'

export function GalleryBlock({ block }: { block: GalleryBlockData }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.heading ? (
          <h2 className="mb-8 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.images.map((item, index) => (
            <figure key={`${item.imageUrl}-${index}`} className="overflow-hidden rounded-2xl bg-fog-100">
              {item.imageUrl ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || item.caption || block.heading || 'Gallery image'}
                    fill
                    sizes="(min-width: 1024px) 20rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {item.caption ? (
                <figcaption className="px-4 py-3 text-sm text-ink-700">{item.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
