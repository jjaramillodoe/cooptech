import type { Metadata } from 'next'

import { ProgramFilters } from '@/components/programs/ProgramFilters'
import { getPrograms } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('programs', '/programs')
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <div className="bg-white">
      <section className="blob-field py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold text-navy-900 sm:text-5xl">Explore Our Programs</h1>
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-700">
            Discover comprehensive technical education programs designed to launch your career
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ProgramFilters programs={programs} />
      </section>
    </div>
  )
}
