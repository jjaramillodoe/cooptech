import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/components/brand/Logo'
import { siteImages } from '@/data/site-images'

export function HomeHero() {
  return (
    <section className="blob-field overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="relative aspect-[16/8] min-h-[280px] w-full bg-navy-900">
          <Image
            src={siteImages.main}
            alt="Students and programs at the School of Cooperative Technical Education"
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy-900/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white/95 px-8 py-5 shadow-xl sm:px-12">
              <Logo href="/" priority className="h-14 w-auto sm:h-20" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">New York City</p>
            <p className="mt-2 max-w-xl text-lg font-semibold leading-7 text-navy-900">
              Half-day career and technical education for students ages 17–21.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore programs
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-ink-900/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:border-blue-600 hover:text-blue-700"
            >
              About Coop
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
