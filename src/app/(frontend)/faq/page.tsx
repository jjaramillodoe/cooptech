import type { Metadata } from 'next'

import { AccordionBlock } from '@/components/blocks/AccordionBlock'
import { fallbackFaq } from '@/data/faq'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'
import type { AccordionBlockData } from '@/types/content'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('faq', '/faq')
}

function accordionSections(layout: { blockType: string }[] | undefined): AccordionBlockData[] {
  const sections = layout?.filter((block): block is AccordionBlockData => block.blockType === 'accordion')
  return sections && sections.length > 0 ? sections : fallbackFaq
}

export default async function FaqPage() {
  const page = await getPageBySlug('faq')
  const sections = accordionSections(page?.layout)

  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-bold text-blue-600 sm:text-5xl">Frequently Asked Questions</h1>
        <div className="mt-10">
          {sections.map((block) => (
            <AccordionBlock key={block.heading || block.items[0]?.question} block={block} variant="flush" />
          ))}
        </div>
      </div>
    </section>
  )
}
