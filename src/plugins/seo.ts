import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { siteUrl } from '../lib/env'

const generateTitle: GenerateTitle = ({ doc, collectionSlug }) => {
  const title = typeof doc?.title === 'string' ? doc.title : ''
  if (collectionSlug === 'programs' && title) return `${title} Program`
  return title
}

const generateDescription: GenerateDescription = ({ doc, collectionSlug }) => {
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
