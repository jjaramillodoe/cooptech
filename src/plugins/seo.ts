import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { pageSeo, programSeo } from '../data/seo'
import { siteUrl } from '../lib/env'

const generateTitle: GenerateTitle = ({ doc, collectionSlug }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  if (collectionSlug === 'pages' && slug && pageSeo[slug]?.title) {
    return pageSeo[slug].title
  }
  if (collectionSlug === 'programs' && slug && programSeo[slug]?.title) {
    return programSeo[slug].title
  }

  const title = typeof doc?.title === 'string' ? doc.title : ''
  if (collectionSlug === 'programs' && title) {
    return `${title} CTE Program at Coop Tech in NYC`.slice(0, 60)
  }
  if (title) {
    const withBrand = `${title} | Coop Tech Career & Technical Education`
    return withBrand.length <= 60 ? withBrand : `${title} | Coop Tech NYC`
  }
  return title
}

const generateDescription: GenerateDescription = ({ doc, collectionSlug }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  if (collectionSlug === 'pages' && slug && pageSeo[slug]?.description) {
    return pageSeo[slug].description
  }
  if (collectionSlug === 'programs' && slug && programSeo[slug]?.description) {
    return programSeo[slug].description
  }
  if (collectionSlug === 'programs' && typeof doc?.summary === 'string') return doc.summary
  if (typeof doc?.excerpt === 'string') return doc.excerpt
  return ''
}

const generateURL: GenerateURL = ({ doc, collectionSlug }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  if (!slug) return siteUrl
  if (collectionSlug === 'programs') return `${siteUrl}/programs/${slug}`
  if (slug === 'home') return siteUrl
  return `${siteUrl}/${slug}`
}

export const seo = seoPlugin({
  collections: ['pages', 'programs'],
  uploadsCollection: 'media',
  tabbedUI: true,
  generateTitle,
  generateDescription,
  generateURL,
})
