import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProgramCarousel } from '@/components/programs/ProgramCarousel'
import { ProgramCopy } from '@/components/programs/ProgramCopy'
import { Button } from '@/components/ui/Button'
import { getProgramBySlug, getPrograms } from '@/lib/cms'
import { programIcons } from '@/lib/program-icons'
import { programMetadata } from '@/lib/seo'

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const programs = await getPrograms()
  return programs.map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  return programMetadata(slug)
}

export default async function ProgramDetailPage({ params }: Params) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program) notFound()

  const Icon = programIcons[program.category]
  const images = program.gallery?.length
    ? program.gallery
    : program.imageUrl
      ? [program.imageUrl]
      : []

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="text-3xl font-bold text-blue-600 sm:text-4xl">{program.title}</h1>
        </header>

        {program.intro ? (
          <div className="mt-8">
            <ProgramCopy text={program.intro} />
          </div>
        ) : null}

        <ProgramCarousel images={images} alt={program.title} />

        <div className="mt-10 space-y-10">
          {program.courses.map((course, index) => (
            <section key={course.title || `course-${index}`}>
              {course.title ? (
                <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">{course.title}</h2>
              ) : null}
              <div className={course.title ? 'mt-3' : undefined}>
                <ProgramCopy text={course.description} />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/admissions" variant="primary">
            Apply Now
          </Button>
          <Button href="/programs" variant="secondary">
            All programs
          </Button>
        </div>
      </div>
    </article>
  )
}
