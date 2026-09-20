import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

import type { Program } from '@/types/content'

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(26,39,68,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(26,39,68,0.1)]">
      {program.imageUrl ? (
        <div className="relative aspect-[16/10] bg-fog-100">
          <Image
            src={program.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-bold text-navy-900">{program.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-700">{program.summary}</p>
        {program.duration ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {program.duration}
          </p>
        ) : null}
        <Link
          href={`/programs/${program.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
        >
          Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
