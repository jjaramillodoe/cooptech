import { AccordionBlock } from '@/components/blocks/AccordionBlock'
import { ArticleBlock } from '@/components/blocks/ArticleBlock'
import { ContactCardsBlock } from '@/components/blocks/ContactCardsBlock'
import { CTABanner } from '@/components/blocks/CTABanner'
import { FeatureGridBlock } from '@/components/blocks/FeatureGridBlock'
import { GalleryBlock } from '@/components/blocks/GalleryBlock'
import { Hero } from '@/components/blocks/Hero'
import { ImageTextGrid } from '@/components/blocks/ImageTextGrid'
import { LogoStripBlock } from '@/components/blocks/LogoStripBlock'
import { QuoteBlock } from '@/components/blocks/QuoteBlock'
import { SplitSectionBlock } from '@/components/blocks/SplitSectionBlock'
import { StatsBlock } from '@/components/blocks/StatsBlock'
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock'
import { TextSectionBlock } from '@/components/blocks/TextSectionBlock'
import { VideoBlock } from '@/components/blocks/VideoBlock'
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
          case 'textSection':
            return <TextSectionBlock key={key} block={block} />
          case 'stats':
            return <StatsBlock key={key} block={block} />
          case 'featureGrid':
            return <FeatureGridBlock key={key} block={block} />
          case 'splitSection':
            return <SplitSectionBlock key={key} block={block} />
          case 'quote':
            return <QuoteBlock key={key} block={block} />
          case 'gallery':
            return <GalleryBlock key={key} block={block} />
          case 'video':
            return <VideoBlock key={key} block={block} />
          case 'testimonials':
            return <TestimonialsBlock key={key} block={block} />
          case 'logoStrip':
            return <LogoStripBlock key={key} block={block} />
          case 'contactCards':
            return <ContactCardsBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
