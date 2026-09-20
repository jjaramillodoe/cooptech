import { youtubeEmbedUrl } from '@/lib/youtube'
import type { VideoBlockData } from '@/types/content'

export function VideoBlock({ block }: { block: VideoBlockData }) {
  const embedUrl = youtubeEmbedUrl(block.url)

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {block.heading ? (
          <h2 className="mb-6 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
        ) : null}
        {embedUrl ? (
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-900">
            <iframe
              src={embedUrl}
              title={block.heading || block.caption || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : (
          <p className="rounded-2xl bg-fog-50 p-6 text-sm text-ink-700">This video URL could not be embedded.</p>
        )}
        {block.caption ? <p className="mt-3 text-sm text-ink-700">{block.caption}</p> : null}
      </div>
    </section>
  )
}
