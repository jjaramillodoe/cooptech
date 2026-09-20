import type { MetadataRoute } from 'next'

import { fallbackPages } from '@/data/pages'
import { getPageBySlug, getPrograms } from '@/lib/cms'
import { siteUrl } from '@/lib/env'

const pagePaths: Record<string, string> = {
  home: '/',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await getPrograms()
  const now = new Date()

  const pages = await Promise.all(
    fallbackPages.map(async (page) => {
      const live = await getPageBySlug(page.slug)
      const path = pagePaths[page.slug] ?? `/${page.slug}`
      return {
        url: path === '/' ? siteUrl : `${siteUrl}${path}`,
        lastModified: now,
        changeFrequency: page.slug === 'home' ? 'weekly' : 'monthly',
        priority: page.slug === 'home' ? 1 : live?.comingSoon ? 0.3 : 0.7,
      } satisfies MetadataRoute.Sitemap[number]
    }),
  )

  const programUrls = programs.map((program) => ({
    url: `${siteUrl}/programs/${program.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...pages, ...programUrls]
}
