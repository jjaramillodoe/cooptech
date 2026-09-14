import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('admissions', '/admissions')
}

export default async function AdmissionsPage() {
  const page = await getPageBySlug('admissions')
  if (!page) return null
  return <RenderBlocks blocks={page.layout} />
}
