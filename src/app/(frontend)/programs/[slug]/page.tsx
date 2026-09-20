import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProgramDetail } from '@/components/programs/ProgramDetail'
import { getProgramBySlug, getPrograms } from '@/lib/cms'
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
  const [program, programs] = await Promise.all([getProgramBySlug(slug), getPrograms()])

  if (!program) notFound()

  const related = programs.filter((item) => item.slug !== program.slug).slice(0, 3)

  return <ProgramDetail program={program} related={related} />
}
