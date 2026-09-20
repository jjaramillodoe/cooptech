import 'dotenv/config'

import { getPayload } from 'payload'

import { homeTestimonials } from '../src/data/testimonials'
import config from '../src/payload.config'

const testimonialsBlock = {
  blockType: 'testimonials' as const,
  eyebrow: homeTestimonials.eyebrow,
  heading: homeTestimonials.heading,
  intro: homeTestimonials.intro,
  buttonLabel: homeTestimonials.buttonLabel,
  buttonHref: homeTestimonials.buttonHref,
  items: homeTestimonials.items.map((item) => ({
    authorName: item.authorName,
    authorRole: item.authorRole,
    authorCompany: item.authorCompany,
    rating: item.rating,
    quote: item.quote,
    fallbackImage: item.imageUrl,
    imageAlt: item.imageAlt,
  })),
}

async function main() {
  const payload = await getPayload({ config })

  for (const slug of ['home', 'about'] as const) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`skip pages/${slug} — not in CMS`)
      continue
    }

    const layout = Array.isArray(doc.layout) ? [...doc.layout] : []
    const index = layout.findIndex((block) => (block as { blockType?: string }).blockType === 'testimonials')
    if (index >= 0) {
      layout[index] = testimonialsBlock
    } else {
      layout.push(testimonialsBlock)
    }

    await payload.update({
      collection: 'pages',
      id: doc.id,
      data: { layout },
    })
    console.log(`updated pages/${slug} testimonials (${homeTestimonials.items.length} reviews)`)
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
