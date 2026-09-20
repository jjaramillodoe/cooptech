import type { Metadata } from 'next'

import { CmsPage } from '@/components/pages/CmsPage'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('admissions', '/admissions')
}

export default async function AdmissionsPage() {
  const page = await getPageBySlug('admissions')
  return <CmsPage page={page} />
}
