import type { Metadata } from 'next'

import { CmsPage } from '@/components/pages/CmsPage'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('principals-message', '/principals-message')
}

export default async function PrincipalsMessagePage() {
  const page = await getPageBySlug('principals-message')
  return <CmsPage page={page} />
}
