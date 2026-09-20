import type { Metadata } from 'next'

import { pageSeo, programSeo } from '@/data/seo'
import { getPageBySlug, getProgramBySlug } from '@/lib/cms'
import { siteUrl } from '@/lib/env'
import type { SeoMeta } from '@/types/content'

export function toMetadata(seo: SeoMeta | undefined, path: string): Metadata {
  const fallback = pageSeo.home
  const title = seo?.title || fallback.title
  const description = seo?.description || fallback.description
  const image = seo?.image || fallback.image || '/og-image.png'
  const url = path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Coop Tech',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export async function pageMetadata(slug: string, path: string): Promise<Metadata> {
  const page = await getPageBySlug(slug)
  const metadata = toMetadata(page?.meta ?? pageSeo[slug], path)
  if (page?.comingSoon) {
    return { ...metadata, robots: { index: false, follow: true } }
  }
  return metadata
}

export async function programMetadata(slug: string): Promise<Metadata> {
  const program = await getProgramBySlug(slug)
  if (!program) {
    return {
      title: { absolute: 'Program not found | Coop Tech' },
      robots: { index: false, follow: true },
    }
  }
  return toMetadata(
    program.meta ??
      programSeo[slug] ?? {
        title: program.title,
        description: program.summary,
        image: program.imageUrl,
      },
    `/programs/${slug}`,
  )
}
