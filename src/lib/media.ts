type MaybeMedia =
  | {
      url?: string | null
      alt?: string | null
    }
  | number
  | string
  | null
  | undefined

export function mediaUrl(media: MaybeMedia, fallback?: string): string | undefined {
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return media.url
  }
  return fallback
}

export function mediaAlt(media: MaybeMedia, fallback = ''): string {
  if (media && typeof media === 'object' && 'alt' in media && media.alt) {
    return media.alt
  }
  return fallback
}
