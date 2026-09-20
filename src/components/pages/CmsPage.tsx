import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ComingSoon } from '@/components/pages/ComingSoon'
import type { PageData } from '@/types/content'

type CmsPageProps = {
  page: PageData | null
  children?: React.ReactNode
}

export function CmsPage({ page, children }: CmsPageProps) {
  if (page?.comingSoon) {
    return <ComingSoon title={page.title} message={page.comingSoonMessage} />
  }

  if (children) return children

  if (page) return <RenderBlocks blocks={page.layout} />

  return null
}
