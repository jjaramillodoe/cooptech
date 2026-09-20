import type { Metadata } from 'next'

import { CmsPage } from '@/components/pages/CmsPage'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('about', '/about')
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  return <CmsPage page={page} />
}
