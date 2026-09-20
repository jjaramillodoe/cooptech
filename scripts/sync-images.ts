import 'dotenv/config'

import { getPayload } from 'payload'

import { fallbackPages } from '../src/data/pages'
import { fallbackPrograms } from '../src/data/programs'
import config from '../src/payload.config'
import type { LayoutBlock } from '../src/types/content'

function applyImages(cmsBlock: Record<string, unknown>, source: LayoutBlock) {
  if (source.blockType === 'hero' || source.blockType === 'article' || source.blockType === 'splitSection') {
    return { ...cmsBlock, fallbackImage: source.imageUrl || undefined }
  }
  if (source.blockType === 'imageTextGrid' && Array.isArray(cmsBlock.items)) {
    return {
      ...cmsBlock,
      items: cmsBlock.items.map((item, index) => ({
        ...(item as Record<string, unknown>),
        fallbackImage: source.items[index]?.imageUrl || (item as { fallbackImage?: string }).fallbackImage,
      })),
    }
  }
  if (source.blockType === 'testimonials' && Array.isArray(cmsBlock.items)) {
    return {
      ...cmsBlock,
      items: cmsBlock.items.map((item, index) => ({
        ...(item as Record<string, unknown>),
        fallbackImage: source.items[index]?.imageUrl || (item as { fallbackImage?: string }).fallbackImage,
      })),
    }
  }
  return cmsBlock
}

async function main() {
  const payload = await getPayload({ config })

  for (const program of fallbackPrograms) {
    const existing = await payload.find({
      collection: 'programs',
      where: { slug: { equals: program.slug } },
      limit: 1,
    })
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`skip programs/${program.slug}`)
      continue
    }

    await payload.update({
      collection: 'programs',
      id: doc.id,
      data: {
        fallbackImage: program.imageUrl,
        gallery: (program.gallery ?? []).map((url) => ({ fallbackImage: url })),
      },
    })
    console.log(`updated programs/${program.slug} (${program.gallery?.length ?? 0} photos)`)
  }

  for (const page of fallbackPages.filter((item) =>
    ['home', 'about', 'principals-message'].includes(item.slug),
  )) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
    })
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`skip pages/${page.slug}`)
      continue
    }

    const currentLayout = Array.isArray(doc.layout) ? doc.layout : []
    const used = new Map<string, number>()
    const fallbackByType = new Map<string, LayoutBlock[]>()
    for (const block of page.layout) {
      const list = fallbackByType.get(block.blockType) ?? []
      list.push(block)
      fallbackByType.set(block.blockType, list)
    }

    const layout = currentLayout.map((block) => {
      const typed = block as Record<string, unknown>
      const type = String(typed.blockType || '')
      const index = used.get(type) ?? 0
      used.set(type, index + 1)
      const source = (fallbackByType.get(type) ?? [])[index]
      if (!source) return block
      return applyImages(typed, source)
    })

    await payload.update({
      collection: 'pages',
      id: doc.id,
      data: { layout },
    })
    console.log(`updated pages/${page.slug} images`)
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
