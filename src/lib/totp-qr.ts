const QR_DATA_PREFIX = 'data:image/svg+xml'

export function svgFromQrDataUri(src?: string | null) {
  if (!src?.startsWith(QR_DATA_PREFIX)) return null
  const comma = src.indexOf(',')
  if (comma === -1) return null
  const payload = src.slice(comma + 1)
  try {
    const decoded = src.slice(0, comma).includes(';base64')
      ? atob(payload)
      : decodeURIComponent(payload)
    return decoded.includes('<svg') ? decoded : null
  } catch {
    return null
  }
}
