import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('principals-message', '/principals-message')
}

export default async function PrincipalsMessagePage() {
  const page = await getPageBySlug('principals-message')
  if (!page) return null
  return <RenderBlocks blocks={page.layout} />
}
