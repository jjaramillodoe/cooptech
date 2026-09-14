import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('about', '/about')
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  if (!page) return null
  return <RenderBlocks blocks={page.layout} />
}
