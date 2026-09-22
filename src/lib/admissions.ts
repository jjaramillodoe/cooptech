export const ADMISSIONS_PORTAL_URL = 'https://d79cooptech.powerappsportals.com/'

export type AdmissionWindow = {
  opensAt?: string | null
  closesAt?: string | null
}

export type AdmissionsPortal = {
  open: boolean
  portalUrl: string
}

export function isPortalHref(href: string | undefined, portalUrl: string) {
  if (!href) return false
  try {
    return new URL(href).hostname === new URL(portalUrl).hostname
  } catch {
    return href.includes('powerappsportals.com')
  }
}

/** A window counts only after its open date. An empty close date keeps it open. */
export function isAdmissionOpen(windows: AdmissionWindow[], now = Date.now()) {
  return windows.some((window) => {
    if (!window.opensAt) return false
    const opens = new Date(window.opensAt).getTime()
    if (Number.isNaN(opens) || now < opens) return false
    if (!window.closesAt) return true
    const closes = new Date(window.closesAt).getTime()
    if (Number.isNaN(closes)) return true
    return now <= closes
  })
}
