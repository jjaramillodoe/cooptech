import 'dotenv/config'

import { getPayload } from 'payload'

import { pageSeo, programSeo } from '../src/data/seo'
import config from '../src/payload.config'

async function syncCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'pages' | 'programs',
  seoMap: Record<string, { title: string; description: string }>,
) {
  for (const [slug, seo] of Object.entries(seoMap)) {
    const existing = await payload.find({
      collection,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const doc = existing.docs[0]
    if (!doc) {
      console.log(`skip ${collection}/${slug} — not in CMS`)
      continue
    }

    const currentMeta =
      doc.meta && typeof doc.meta === 'object' ? (doc.meta as Record<string, unknown>) : {}

    await payload.update({
      collection,
      id: doc.id,
      data: {
        meta: {
          ...currentMeta,
          title: seo.title,
          description: seo.description,
        },
      },
    })
    console.log(`updated ${collection}/${slug} (${seo.title.length} / ${seo.description.length})`)
  }
}

async function main() {
  const payload = await getPayload({ config })
  await syncCollection(payload, 'pages', pageSeo)
  await syncCollection(payload, 'programs', programSeo)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
