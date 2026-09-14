import 'dotenv/config'

import { getPayload } from 'payload'

import { fallbackAnnouncements } from './data/announcements'
import { fallbackBanner } from './data/banner'
import { fallbackNavigation } from './data/navigation'
import { fallbackPages } from './data/pages'
import { fallbackPrograms } from './data/programs'
import { fallbackStaff } from './data/staff'
import config from './payload.config'
import type { LayoutBlock } from './types/content'

function toLayout(blocks: LayoutBlock[]) {
  return blocks.map((block) => {
    if (block.blockType === 'hero') {
      return {
        blockType: 'hero' as const,
        eyebrow: block.eyebrow,
        heading: block.heading,
        subheading: block.subheading,
        primaryLabel: block.primaryLabel,
        primaryHref: block.primaryHref,
        secondaryLabel: block.secondaryLabel,
        secondaryHref: block.secondaryHref,
        fallbackImage: block.imageUrl,
      }
    }
    if (block.blockType === 'imageTextGrid') {
      return {
        blockType: 'imageTextGrid' as const,
        heading: block.heading,
        intro: block.intro,
        items: block.items.map((item) => ({
          title: item.title,
          body: item.body,
          href: item.href,
          fallbackImage: item.imageUrl,
        })),
      }
    }
    if (block.blockType === 'accordion') {
      return {
        blockType: 'accordion' as const,
        heading: block.heading,
        items: block.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      }
    }
    if (block.blockType === 'article') {
      return {
        blockType: 'article' as const,
        heading: block.heading,
        fallbackImage: block.imageUrl,
        imageAlt: block.imageAlt,
        documentLabel: block.documentLabel,
        sections: block.sections,
      }
    }
    return {
      blockType: 'ctaBanner' as const,
      heading: block.heading,
      body: block.body,
      buttonLabel: block.buttonLabel,
      buttonHref: block.buttonHref,
    }
  })
}

async function seed() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      header: fallbackNavigation.header,
      footer: fallbackNavigation.footer,
    },
  })

  await payload.updateGlobal({
    slug: 'banner',
    data: fallbackBanner,
  })

  for (const program of fallbackPrograms) {
    const existing = await payload.find({
      collection: 'programs',
      where: { slug: { equals: program.slug } },
      limit: 1,
    })
    const data = {
      title: program.title,
      slug: program.slug,
      category: program.category,
      summary: program.summary,
      intro: program.intro,
      duration: program.duration,
      schedule: program.schedule,
      fallbackImage: program.imageUrl,
      gallery: (program.gallery ?? []).map((url) => ({ fallbackImage: url })),
      requirements: program.requirements.map((item) => ({ item })),
      certifications: program.certifications.map((name) => ({ name })),
      courses: program.courses.map((course) => ({
        title: course.title || undefined,
        description: course.description,
      })),
      campuses: program.campuses.map((name) => ({ name })),
      meta: {
        title: program.meta?.title || program.title,
        description: program.meta?.description || program.summary,
      },
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'programs',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'programs', data })
    }
  }

  for (const page of fallbackPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })
    const data = {
      title: page.title,
      slug: page.slug,
      excerpt: page.excerpt,
      layout: toLayout(page.layout),
      meta: {
        title: page.meta?.title || page.title,
        description: page.meta?.description || page.excerpt,
      },
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'pages', data })
    }
  }

  for (const member of fallbackStaff) {
    const existing = await payload.find({
      collection: 'staff',
      where: {
        and: [
          { lastName: { equals: member.lastName } },
          { firstName: { equals: member.firstName } },
        ],
      },
      limit: 1,
    })
    const data = {
      lastName: member.lastName,
      firstName: member.firstName,
      role: member.role,
      category: member.category,
      email: member.email,
      phone: member.phone,
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'staff',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'staff', data })
    }
  }

  for (const announcement of fallbackAnnouncements) {
    const existing = await payload.find({
      collection: 'announcements',
      where: { title: { equals: announcement.title } },
      limit: 1,
    })
    const data = {
      title: announcement.title,
      kind: announcement.kind,
      body: announcement.body,
      href: announcement.href,
      linkLabel: announcement.linkLabel,
      active: announcement.active,
      pinToBanner: announcement.pinToBanner,
    }
    if (existing.docs[0]) {
      await payload.update({
        collection: 'announcements',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'announcements', data })
    }
  }

  payload.logger.info('Coop Tech content seeded.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
