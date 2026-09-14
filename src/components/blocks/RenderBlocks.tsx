import { AccordionBlock } from '@/components/blocks/AccordionBlock'
import { ArticleBlock } from '@/components/blocks/ArticleBlock'
import { CTABanner } from '@/components/blocks/CTABanner'
import { Hero } from '@/components/blocks/Hero'
import { ImageTextGrid } from '@/components/blocks/ImageTextGrid'
import type { LayoutBlock } from '@/types/content'

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`
        switch (block.blockType) {
          case 'hero':
            return <Hero key={key} block={block} />
          case 'article':
            return <ArticleBlock key={key} block={block} />
          case 'imageTextGrid':
            return <ImageTextGrid key={key} block={block} />
          case 'accordion':
            return <AccordionBlock key={key} block={block} />
          case 'ctaBanner':
            return <CTABanner key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
