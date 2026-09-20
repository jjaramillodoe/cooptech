import type { Metadata } from 'next'

import { HomeHero } from '@/components/home/HomeHero'
import { Mission } from '@/components/home/Mission'
import { Partners } from '@/components/home/Partners'
import { ProgramDirectory } from '@/components/home/ProgramDirectory'
import { CmsPage } from '@/components/pages/CmsPage'
import { getPageBySlug, getPrograms } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('home', '/')
}

export default async function HomePage() {
  const [programs, page] = await Promise.all([getPrograms(), getPageBySlug('home')])

  return (
    <CmsPage page={page}>
      <HomeHero />
      <Mission />
      <ProgramDirectory programs={programs} />
      <Partners />
    </CmsPage>
  )
}
