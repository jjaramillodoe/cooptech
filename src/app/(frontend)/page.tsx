import type { Metadata } from 'next'

import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock'
import { HomeHero } from '@/components/home/HomeHero'
import { Mission } from '@/components/home/Mission'
import { Partners } from '@/components/home/Partners'
import { ProgramDirectory } from '@/components/home/ProgramDirectory'
import { CmsPage } from '@/components/pages/CmsPage'
import { homeTestimonials } from '@/data/testimonials'
import { getPageBySlug, getPrograms } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'
import type { TestimonialsBlockData } from '@/types/content'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('home', '/')
}

function testimonialsFromPage(page: Awaited<ReturnType<typeof getPageBySlug>>): TestimonialsBlockData {
  const fromCms = page?.layout.find(
    (block): block is TestimonialsBlockData => block.blockType === 'testimonials',
  )
  return fromCms?.items.length ? fromCms : homeTestimonials
}

export default async function HomePage() {
  const [programs, page] = await Promise.all([getPrograms(), getPageBySlug('home')])

  return (
    <CmsPage page={page}>
      <HomeHero />
      <Mission />
      <ProgramDirectory programs={programs} />
      <TestimonialsBlock block={testimonialsFromPage(page)} />
      <Partners />
    </CmsPage>
  )
}
