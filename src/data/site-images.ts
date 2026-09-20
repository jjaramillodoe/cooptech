import { blobAssets } from '@/data/blob-assets'

function contentImage(name: string) {
  return blobAssets.content[name] || `/images/${name}.webp`
}

function gallery(prefix: string, count: number) {
  const images = Array.from({ length: count }, (_, index) => contentImage(`${prefix}${index + 1}`))
  return { cover: images[0], gallery: images }
}

export const siteImages = {
  main: contentImage('main'),
  about: contentImage('about'),
  principal: contentImage('principal'),
}

export const programMedia = {
  'automotive-services': gallery('auto', 5),
  construction: gallery('cons', 8),
  culinary: gallery('cul', 4),
  electrical: gallery('ele', 1),
  'health-services': gallery('health', 5),
  'information-technology': gallery('it', 5),
  'unisex-styling': gallery('uni', 5),
  'work-based-learning': gallery('work', 3),
  osha: gallery('osha', 3),
} as const
