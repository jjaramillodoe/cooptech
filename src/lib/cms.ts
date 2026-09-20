import { getPayload } from 'payload'

import { fallbackAnnouncements } from '@/data/announcements'
import { fallbackBanner } from '@/data/banner'
import { fallbackNavigation } from '@/data/navigation'
import { fallbackPages } from '@/data/pages'
import { fallbackPrograms } from '@/data/programs'
import { pageSeo, programSeo } from '@/data/seo'
import { fallbackStaff } from '@/data/staff'
import { mediaUrl } from '@/lib/media'
import type {
  AccordionBlockData,
  Announcement,
  ArticleBlockData,
  BannerData,
  BannerIcon,
  BannerTone,
  CTABannerBlockData,
  FeatureGridBlockData,
  GalleryBlockData,
  HeroBlockData,
  ImageTextGridBlockData,
  FooterColumn,
  LayoutBlock,
  NavChild,
  NavItem,
  NavigationData,
  PageData,
  Program,
  ProgramCategory,
  QuoteBlockData,
  FeatureGridIcon,
  SeoMeta,
  SplitSectionBlockData,
  StatsBlockData,
  ContactCardIcon,
  ContactCardsBlockData,
  LogoStripBlockData,
  TestimonialRating,
  TestimonialsBlockData,
  TextSectionBlockData,
  VideoBlockData,
} from '@/types/content'
import type { StaffCategory, StaffMember } from '@/types/staff'

type CmsNavLink = {
  label?: string | null
  href?: string | null
}

type CmsNavItem = CmsNavLink & {
  children?: CmsNavLink[] | null
}

type CmsFooterColumn = {
  heading?: string | null
  links?: CmsNavLink[] | null
}

async function getCms() {
  const { default: config } = await import('@payload-config')
  return getPayload({ config })
}

function mapNavLink(link: CmsNavLink): NavChild {
  return {
    label: link.label || '',
    href: link.href || '/',
  }
}

function mapMeta(
  raw: unknown,
  fallback?: SeoMeta,
  extras: { title?: string; description?: string; image?: string } = {},
): SeoMeta | undefined {
  const meta = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
  const title = (typeof meta.title === 'string' && meta.title) || fallback?.title || extras.title || ''
  const description =
    (typeof meta.description === 'string' && meta.description) ||
    fallback?.description ||
    extras.description ||
    ''
  const image =
    mediaUrl(meta.image as never) ||
    (typeof meta.image === 'string' ? meta.image : undefined) ||
    fallback?.image ||
    extras.image
  if (!title && !description) return fallback
  return { title, description, image }
}

function mapProgram(doc: Record<string, unknown>): Program {
  const requirements = Array.isArray(doc.requirements)
    ? doc.requirements.map((item: { item?: string }) => item.item || '').filter(Boolean)
    : []
  const certifications = Array.isArray(doc.certifications)
    ? doc.certifications.map((item: { name?: string }) => item.name || '').filter(Boolean)
    : []
  const courses = Array.isArray(doc.courses)
    ? doc.courses.map((course: { title?: string; description?: string }) => ({
        title: course.title || '',
        description: course.description || '',
      }))
    : []
  const campuses = Array.isArray(doc.campuses)
    ? doc.campuses.map((item: { name?: string }) => item.name || '').filter(Boolean)
    : []
  const slug = String(doc.slug ?? '')
  const imageUrl = mediaUrl(doc.image as never, typeof doc.fallbackImage === 'string' ? doc.fallbackImage : undefined)
  const gallery = Array.isArray(doc.gallery)
    ? doc.gallery
        .map((item: { image?: unknown; fallbackImage?: string }) =>
          mediaUrl(item.image as never, item.fallbackImage),
        )
        .filter((url): url is string => Boolean(url))
    : []

  return {
    id: String(doc.id ?? doc.slug),
    title: String(doc.title ?? ''),
    slug,
    category: doc.category as ProgramCategory,
    summary: String(doc.summary ?? ''),
    intro: typeof doc.intro === 'string' && doc.intro ? doc.intro : undefined,
    duration: doc.duration ? String(doc.duration) : undefined,
    schedule: doc.schedule ? String(doc.schedule) : undefined,
    imageUrl,
    gallery: gallery.length > 0 ? gallery : imageUrl ? [imageUrl] : [],
    requirements,
    certifications,
    courses,
    campuses,
    meta: mapMeta(doc.meta, programSeo[slug], {
      title: String(doc.title ?? ''),
      description: String(doc.summary ?? ''),
      image: imageUrl,
    }),
  }
}

function mapBlock(block: Record<string, unknown>): LayoutBlock | null {
  const type = block.blockType

  if (type === 'hero') {
    return {
      blockType: 'hero',
      eyebrow: block.eyebrow ? String(block.eyebrow) : undefined,
      heading: String(block.heading ?? ''),
      subheading: block.subheading ? String(block.subheading) : undefined,
      primaryLabel: block.primaryLabel ? String(block.primaryLabel) : undefined,
      primaryHref: block.primaryHref ? String(block.primaryHref) : undefined,
      secondaryLabel: block.secondaryLabel ? String(block.secondaryLabel) : undefined,
      secondaryHref: block.secondaryHref ? String(block.secondaryHref) : undefined,
      imageUrl: mediaUrl(
        block.image as never,
        typeof block.fallbackImage === 'string' ? block.fallbackImage : undefined,
      ),
    } satisfies HeroBlockData
  }

  if (type === 'imageTextGrid') {
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => ({
          title: String(item.title ?? ''),
          body: String(item.body ?? ''),
          href: item.href ? String(item.href) : undefined,
          imageUrl: mediaUrl(
            item.image as never,
            typeof item.fallbackImage === 'string' ? item.fallbackImage : undefined,
          ),
        }))
      : []
    return {
      blockType: 'imageTextGrid',
      heading: block.heading ? String(block.heading) : undefined,
      intro: block.intro ? String(block.intro) : undefined,
      items,
    } satisfies ImageTextGridBlockData
  }

  if (type === 'accordion') {
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => ({
          question: String(item.question ?? ''),
          answer: String(item.answer ?? ''),
        }))
      : []
    return {
      blockType: 'accordion',
      heading: block.heading ? String(block.heading) : undefined,
      items,
    } satisfies AccordionBlockData
  }

  if (type === 'article') {
    const sections = Array.isArray(block.sections)
      ? block.sections.map((section: Record<string, unknown>) => ({
          heading: section.heading ? String(section.heading) : undefined,
          body: String(section.body ?? ''),
        }))
      : []
    const document = block.document as { url?: string } | string | number | null | undefined
    return {
      blockType: 'article',
      heading: String(block.heading ?? ''),
      imageUrl: mediaUrl(
        block.image as never,
        typeof block.fallbackImage === 'string' ? block.fallbackImage : undefined,
      ),
      imageAlt: block.imageAlt ? String(block.imageAlt) : undefined,
      documentUrl: mediaUrl(document as never),
      documentLabel: block.documentLabel ? String(block.documentLabel) : undefined,
      sections,
    } satisfies ArticleBlockData
  }

  if (type === 'ctaBanner') {
    return {
      blockType: 'ctaBanner',
      heading: String(block.heading ?? ''),
      body: block.body ? String(block.body) : undefined,
      buttonLabel: block.buttonLabel ? String(block.buttonLabel) : undefined,
      buttonHref: block.buttonHref ? String(block.buttonHref) : undefined,
    } satisfies CTABannerBlockData
  }

  if (type === 'textSection') {
    return {
      blockType: 'textSection',
      heading: block.heading ? String(block.heading) : undefined,
      body: String(block.body ?? ''),
      buttonLabel: block.buttonLabel ? String(block.buttonLabel) : undefined,
      buttonHref: block.buttonHref ? String(block.buttonHref) : undefined,
    } satisfies TextSectionBlockData
  }

  if (type === 'stats') {
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => ({
          value: String(item.value ?? ''),
          label: String(item.label ?? ''),
        }))
      : []
    return {
      blockType: 'stats',
      heading: block.heading ? String(block.heading) : undefined,
      items,
    } satisfies StatsBlockData
  }

  if (type === 'featureGrid') {
    const icons: FeatureGridIcon[] = [
      'graduation-cap',
      'users',
      'award',
      'book',
      'calendar',
      'clock',
      'building',
      'map-pin',
      'phone',
      'mail',
      'heart',
      'check',
      'star',
    ]
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => {
          const icon = item.icon ? String(item.icon) : undefined
          return {
            icon: icon && icons.includes(icon as FeatureGridIcon) ? (icon as FeatureGridIcon) : undefined,
            title: String(item.title ?? ''),
            body: String(item.body ?? ''),
            href: item.href ? String(item.href) : undefined,
            linkLabel: item.linkLabel ? String(item.linkLabel) : undefined,
          }
        })
      : []
    return {
      blockType: 'featureGrid',
      heading: block.heading ? String(block.heading) : undefined,
      intro: block.intro ? String(block.intro) : undefined,
      items,
    } satisfies FeatureGridBlockData
  }

  if (type === 'splitSection') {
    return {
      blockType: 'splitSection',
      imagePosition: block.imagePosition === 'right' ? 'right' : 'left',
      eyebrow: block.eyebrow ? String(block.eyebrow) : undefined,
      heading: String(block.heading ?? ''),
      body: String(block.body ?? ''),
      buttonLabel: block.buttonLabel ? String(block.buttonLabel) : undefined,
      buttonHref: block.buttonHref ? String(block.buttonHref) : undefined,
      imageUrl: mediaUrl(
        block.image as never,
        typeof block.fallbackImage === 'string' ? block.fallbackImage : undefined,
      ),
      imageAlt: block.imageAlt ? String(block.imageAlt) : undefined,
    } satisfies SplitSectionBlockData
  }

  if (type === 'quote') {
    return {
      blockType: 'quote',
      quote: String(block.quote ?? ''),
      attribution: block.attribution ? String(block.attribution) : undefined,
      role: block.role ? String(block.role) : undefined,
    } satisfies QuoteBlockData
  }

  if (type === 'gallery') {
    const images = Array.isArray(block.images)
      ? block.images.map((item: Record<string, unknown>) => ({
          imageUrl: mediaUrl(
            item.image as never,
            typeof item.fallbackImage === 'string' ? item.fallbackImage : undefined,
          ),
          alt: item.alt ? String(item.alt) : undefined,
          caption: item.caption ? String(item.caption) : undefined,
        }))
      : []
    return {
      blockType: 'gallery',
      heading: block.heading ? String(block.heading) : undefined,
      images,
    } satisfies GalleryBlockData
  }

  if (type === 'video') {
    return {
      blockType: 'video',
      heading: block.heading ? String(block.heading) : undefined,
      url: String(block.url ?? ''),
      caption: block.caption ? String(block.caption) : undefined,
    } satisfies VideoBlockData
  }

  if (type === 'testimonials') {
    const ratings: TestimonialRating[] = ['5', '4.5', '4', '3.5', '3']
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => {
          const rating = item.rating ? String(item.rating) : undefined
          return {
            authorName: String(item.authorName ?? ''),
            authorRole: item.authorRole ? String(item.authorRole) : undefined,
            authorCompany: item.authorCompany ? String(item.authorCompany) : undefined,
            rating: rating && ratings.includes(rating as TestimonialRating) ? (rating as TestimonialRating) : undefined,
            quote: String(item.quote ?? ''),
            imageUrl: mediaUrl(
              item.image as never,
              typeof item.fallbackImage === 'string' ? item.fallbackImage : undefined,
            ),
            imageAlt: item.imageAlt ? String(item.imageAlt) : undefined,
          }
        })
      : []
    return {
      blockType: 'testimonials',
      eyebrow: block.eyebrow ? String(block.eyebrow) : undefined,
      heading: block.heading ? String(block.heading) : undefined,
      intro: block.intro ? String(block.intro) : undefined,
      buttonLabel: block.buttonLabel ? String(block.buttonLabel) : undefined,
      buttonHref: block.buttonHref ? String(block.buttonHref) : undefined,
      items,
    } satisfies TestimonialsBlockData
  }

  if (type === 'logoStrip') {
    const logos = Array.isArray(block.logos)
      ? block.logos.map((item: Record<string, unknown>) => ({
          name: String(item.name ?? ''),
          imageUrl: mediaUrl(
            item.image as never,
            typeof item.fallbackImage === 'string' ? item.fallbackImage : undefined,
          ),
          href: item.href ? String(item.href) : undefined,
        }))
      : []
    return {
      blockType: 'logoStrip',
      eyebrow: block.eyebrow ? String(block.eyebrow) : undefined,
      heading: block.heading ? String(block.heading) : undefined,
      intro: block.intro ? String(block.intro) : undefined,
      logos,
    } satisfies LogoStripBlockData
  }

  if (type === 'contactCards') {
    const icons: ContactCardIcon[] = ['mail', 'phone', 'map-pin', 'clock', 'building', 'globe']
    const items = Array.isArray(block.items)
      ? block.items.map((item: Record<string, unknown>) => {
          const icon = item.icon ? String(item.icon) : undefined
          return {
            icon: icon && icons.includes(icon as ContactCardIcon) ? (icon as ContactCardIcon) : undefined,
            label: String(item.label ?? ''),
            value: String(item.value ?? ''),
            href: item.href ? String(item.href) : undefined,
          }
        })
      : []
    return {
      blockType: 'contactCards',
      heading: block.heading ? String(block.heading) : undefined,
      intro: block.intro ? String(block.intro) : undefined,
      items,
    } satisfies ContactCardsBlockData
  }

  return null
}

function mapPage(doc: Record<string, unknown>): PageData {
  const layout = Array.isArray(doc.layout)
    ? doc.layout.map((block) => mapBlock(block as Record<string, unknown>)).filter((block): block is LayoutBlock => Boolean(block))
    : []
  const slug = String(doc.slug ?? '')

  return {
    title: String(doc.title ?? ''),
    slug,
    excerpt: doc.excerpt ? String(doc.excerpt) : undefined,
    comingSoon: Boolean(doc.comingSoon),
    comingSoonMessage: doc.comingSoonMessage ? String(doc.comingSoonMessage) : undefined,
    layout,
    meta: mapMeta(doc.meta, pageSeo[slug], {
      title: String(doc.title ?? ''),
      description: doc.excerpt ? String(doc.excerpt) : undefined,
    }),
  }
}

function sortPrograms(programs: Program[]) {
  const order = fallbackPrograms.map((program) => program.slug)
  return [...programs].sort((a, b) => {
    const aIndex = order.indexOf(a.slug)
    const bIndex = order.indexOf(b.slug)
    return (aIndex === -1 ? order.length : aIndex) - (bIndex === -1 ? order.length : bIndex)
  })
}

export async function getPrograms(): Promise<Program[]> {
  try {
    const payload = await getCms()
    const result = await payload.find({
      collection: 'programs',
      limit: 50,
      sort: 'title',
      depth: 1,
    })
    if (result.docs.length > 0) {
      const fromCms = result.docs.map((doc) => mapProgram(doc as unknown as Record<string, unknown>))
      const slugs = new Set(fromCms.map((program) => program.slug))
      const missing = fallbackPrograms.filter((program) => !slugs.has(program.slug))
      return sortPrograms([...fromCms, ...missing])
    }
  } catch {
    // CMS unavailable — use authored fallback content
  }
  return fallbackPrograms
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const payload = await getCms()
    const result = await payload.find({
      collection: 'programs',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    if (result.docs[0]) {
      return mapProgram(result.docs[0] as unknown as Record<string, unknown>)
    }
  } catch {
    // CMS unavailable
  }
  return fallbackPrograms.find((program) => program.slug === slug) ?? null
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    const payload = await getCms()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    if (result.docs[0]) {
      return mapPage(result.docs[0] as unknown as Record<string, unknown>)
    }
  } catch {
    // CMS unavailable
  }
  return fallbackPages.find((page) => page.slug === slug) ?? null
}

export async function getNavigation(): Promise<NavigationData> {
  try {
    const payload = await getCms()
    const nav = await payload.findGlobal({
      slug: 'navigation',
      depth: 1,
    })
    const header: NavItem[] = Array.isArray(nav.header)
      ? nav.header.map((item: CmsNavItem) => ({
          label: item.label || '',
          href: item.href || '/',
          children: item.children?.map(mapNavLink),
        }))
      : []
    const footer: FooterColumn[] = Array.isArray(nav.footer)
      ? nav.footer.map((column: CmsFooterColumn) => ({
          heading: column.heading || '',
          links: column.links?.map(mapNavLink) || [],
        }))
      : []
    if (header.length > 0) {
      const hasLink = (href: string) =>
        header.some((item) => item.href === href || item.children?.some((child) => child.href === href))
      const footerHasStaff = footer.some((column) => column.links.some((link) => link.href === '/staff'))
      if (
        !hasLink('/principals-message') ||
        !hasLink('/staff') ||
        !hasLink('/programs/osha') ||
        !hasLink('/programs/work-based-learning')
      ) {
        return {
          header: fallbackNavigation.header,
          footer: footerHasStaff ? footer : fallbackNavigation.footer,
        }
      }
      return { header, footer: footerHasStaff ? footer : fallbackNavigation.footer }
    }
  } catch {
    // CMS unavailable
  }
  return fallbackNavigation
}

function mapStaff(doc: Record<string, unknown>): StaffMember {
  return {
    id: String(doc.id ?? `${doc.lastName}-${doc.firstName}`),
    firstName: String(doc.firstName ?? ''),
    lastName: String(doc.lastName ?? ''),
    role: String(doc.role ?? ''),
    category: doc.category as StaffCategory,
    email: doc.email ? String(doc.email) : undefined,
    phone: doc.phone ? String(doc.phone) : undefined,
  }
}

export async function getStaff(): Promise<StaffMember[]> {
  try {
    const payload = await getCms()
    const result = await payload.find({
      collection: 'staff',
      limit: 200,
      sort: 'lastName',
    })
    if (result.docs.length > 0) {
      return result.docs.map((doc) => mapStaff(doc as unknown as Record<string, unknown>))
    }
  } catch {
    // CMS unavailable — use authored fallback content
  }
  return fallbackStaff
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const payload = await getCms()
    const result = await payload.find({
      collection: 'announcements',
      where: { active: { equals: true } },
      limit: 20,
      sort: '-startsAt',
    })
    if (result.docs.length > 0) {
      return result.docs.map((doc) => ({
        id: String(doc.id),
        title: String(doc.title),
        kind: doc.kind as Announcement['kind'],
        body: String(doc.body),
        href: doc.href ? String(doc.href) : undefined,
        linkLabel: doc.linkLabel ? String(doc.linkLabel) : undefined,
        active: Boolean(doc.active),
        pinToBanner: Boolean(doc.pinToBanner),
      }))
    }
  } catch {
    // CMS unavailable
  }
  return fallbackAnnouncements
}

function isWithinWindow(startsAt?: string | null, endsAt?: string | null) {
  const now = Date.now()
  if (startsAt && new Date(startsAt).getTime() > now) return false
  if (endsAt && new Date(endsAt).getTime() < now) return false
  return true
}

export async function getBanner(): Promise<BannerData | null> {
  try {
    const payload = await getCms()
    const banner = await payload.findGlobal({
      slug: 'banner',
      depth: 0,
    })
    if (banner.heading && banner.body) {
      const data: BannerData = {
        active: Boolean(banner.active),
        tone: (banner.tone as BannerTone) || 'info',
        icon: (banner.icon as BannerIcon) || 'graduation-cap',
        heading: String(banner.heading),
        body: String(banner.body),
        email: banner.email ? String(banner.email) : undefined,
        linkHref: banner.linkHref ? String(banner.linkHref) : undefined,
        linkLabel: banner.linkLabel ? String(banner.linkLabel) : undefined,
        startsAt: banner.startsAt ? String(banner.startsAt) : undefined,
        endsAt: banner.endsAt ? String(banner.endsAt) : undefined,
      }
      if (data.active && isWithinWindow(data.startsAt, data.endsAt)) {
        return data
      }
      return null
    }
  } catch {
    // CMS unavailable
  }

  if (fallbackBanner.active && isWithinWindow(fallbackBanner.startsAt, fallbackBanner.endsAt)) {
    return fallbackBanner
  }
  return null
}
