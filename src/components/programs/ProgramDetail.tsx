import Link from 'next/link'
import { Award, Calendar, Clock, MapPin } from 'lucide-react'

import { ProgramCarousel } from '@/components/programs/ProgramCarousel'
import { ProgramCopy } from '@/components/programs/ProgramCopy'
import { ProgramIconCard } from '@/components/home/ProgramIconCard'
import { Button } from '@/components/ui/Button'
import { programIcons } from '@/lib/program-icons'
import type { Program } from '@/types/content'

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">{label}</p>
        <p className="mt-1 text-sm leading-6 text-navy-900">{value}</p>
      </div>
    </div>
  )
}

export function ProgramDetail({
  program,
  related,
}: {
  program: Program
  related: Program[]
}) {
  const Icon = programIcons[program.category]
  const images = program.gallery?.length
    ? program.gallery
    : program.imageUrl
      ? [program.imageUrl]
      : []

  return (
    <article className="bg-white">
      <section className="blob-field px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/programs" className="font-medium text-blue-600 hover:underline">
                  Programs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy-900">{program.title}</li>
            </ol>
          </nav>

          <header className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold text-navy-900 sm:text-5xl">{program.title}</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-ink-700">{program.summary}</p>
            </div>
          </header>

          <ul className="mt-8 flex flex-wrap gap-3">
            {program.duration ? (
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm">
                <Clock className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {program.duration}
              </li>
            ) : null}
            {program.schedule ? (
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm">
                <Calendar className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {program.schedule}
              </li>
            ) : null}
            {program.campuses.length ? (
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm">
                <MapPin className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {program.campuses.length} {program.campuses.length === 1 ? 'campus' : 'campuses'}
              </li>
            ) : null}
            {program.certifications.length ? (
              <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm">
                <Award className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {program.certifications.length}{' '}
                {program.certifications.length === 1 ? 'certification' : 'certifications'}
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-16">
        <div>
          <ProgramCarousel images={images} alt={program.title} />

          {program.intro ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-navy-900">Program overview</h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              <div className="mt-5">
                <ProgramCopy text={program.intro} />
              </div>
            </section>
          ) : null}

          {program.courses.length ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900">What you will learn</h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              <div className="mt-6 space-y-5">
                {program.courses.map((course, index) => (
                  <section
                    key={course.title || `course-${index}`}
                    className="rounded-2xl border border-ink-900/10 bg-fog-50 p-6"
                  >
                    {course.title ? (
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-navy-900">{course.title}</h3>
                      </div>
                    ) : null}
                    <div className={course.title ? 'mt-4' : undefined}>
                      <ProgramCopy text={course.description} />
                    </div>
                  </section>
                ))}
              </div>
            </section>
          ) : null}

          {program.requirements.length ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900">Who can enroll</h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
              <ul className="mt-6 space-y-3">
                {program.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-ink-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:pt-0">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[0_10px_30px_rgba(26,39,68,0.06)] lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-navy-900">Program facts</h2>
            <div className="mt-5 space-y-5">
              {program.duration ? <Fact icon={Clock} label="Duration" value={program.duration} /> : null}
              {program.schedule ? <Fact icon={Calendar} label="Schedule" value={program.schedule} /> : null}
              {program.campuses.length ? (
                <Fact icon={MapPin} label="Campuses" value={program.campuses.join(', ')} />
              ) : null}
            </div>

            {program.certifications.length ? (
              <div className="mt-6 border-t border-ink-900/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Certifications
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {program.certifications.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium leading-5 text-blue-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 border-t border-ink-900/10 pt-6">
              <Button href="/admissions" variant="primary">
                Apply now
              </Button>
              <Button href="/programs" variant="ghost">
                All programs
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="bg-fog-50 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">More programs</h2>
            <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProgramIconCard
                  key={item.id}
                  title={item.title}
                  body={item.summary}
                  href={`/programs/${item.slug}`}
                  icon={programIcons[item.category]}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-blue-50 px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-navy-900">Ready to join this shop?</h2>
            <p className="mt-3 text-base leading-7 text-ink-700">
              Shared-instruction and post-graduate students ages 17–21 can apply for a half-day CTE
              session at Coop Tech.
            </p>
          </div>
          <Button href="/admissions" variant="primary" className="shrink-0">
            Start your application
          </Button>
        </div>
      </section>
    </article>
  )
}
