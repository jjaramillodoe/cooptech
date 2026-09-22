import { ProgramIconCard } from '@/components/home/ProgramIconCard'
import { programIcons } from '@/lib/program-icons'
import type { Program } from '@/types/content'

export function ProgramDirectory({ programs }: { programs: Program[] }) {
  return (
    <section className="blob-field px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">Explore Our Programs</h2>
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-700">
            Discover comprehensive technical education programs designed to launch your career
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={
                programs.length % 3 === 1 && index === programs.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:max-w-md lg:col-span-1 lg:col-start-2 lg:max-w-none' : ''
              }
            >
              <ProgramIconCard
                title={program.title}
                body={program.summary}
                href={`/programs/${program.slug}`}
                icon={programIcons[program.category]}
                imageUrl={program.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
