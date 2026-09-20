import Image from 'next/image'

import type { LogoStripBlockData } from '@/types/content'

export function LogoStripBlock({ block }: { block: LogoStripBlockData }) {
  const logos = block.logos.filter((logo) => logo.imageUrl)
  if (logos.length === 0) return null

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {block.eyebrow || block.heading || block.intro ? (
          <div className="mx-auto max-w-2xl text-center">
            {block.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{block.eyebrow}</p>
            ) : null}
            {block.heading ? (
              <>
                <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
                <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              </>
            ) : null}
            {block.intro ? <p className="mt-4 text-base leading-7 text-ink-700">{block.intro}</p> : null}
          </div>
        ) : null}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {logos.map((logo) => {
            const image = (
              <span className="flex h-24 w-40 items-center justify-center rounded-2xl border border-ink-900/10 bg-fog-50 px-4">
                <Image
                  src={logo.imageUrl!}
                  alt={logo.name}
                  width={140}
                  height={72}
                  className="max-h-14 w-auto object-contain"
                />
              </span>
            )

            return (
              <li key={logo.name}>
                {logo.href ? (
                  <a href={logo.href} className="block transition hover:-translate-y-0.5" target={logo.href.startsWith('http') ? '_blank' : undefined} rel={logo.href.startsWith('http') ? 'noreferrer' : undefined}>
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
