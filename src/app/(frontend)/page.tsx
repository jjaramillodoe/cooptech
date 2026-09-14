import type { Metadata } from 'next'

import { HomeHero } from '@/components/home/HomeHero'
import { Mission } from '@/components/home/Mission'
import { Partners } from '@/components/home/Partners'
import { ProgramDirectory } from '@/components/home/ProgramDirectory'
import { getPrograms } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('home', '/')
}

export default async function HomePage() {
  const programs = await getPrograms()

  return (
    <>
      <HomeHero />
      <Mission />
      <ProgramDirectory programs={programs} />
      <Partners />
    </>
  )
}
