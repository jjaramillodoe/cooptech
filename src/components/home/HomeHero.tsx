import Image from 'next/image'

import { Logo } from '@/components/brand/Logo'
import { siteImages } from '@/data/site-images'

export function HomeHero() {
  return (
    <section className="blob-field overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy-900 shadow-2xl">
        <div className="relative aspect-[16/8] min-h-[280px] w-full">
          <Image
            src={siteImages.main}
            alt="Students and programs at the School of Cooperative Technical Education"
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white/95 px-8 py-5 shadow-xl sm:px-12">
            <Logo href="/" priority className="h-14 w-auto sm:h-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
