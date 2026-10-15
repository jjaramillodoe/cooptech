const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type SiteverifyResponse = {
  success: boolean
  'error-codes'?: string[]
  hostname?: string
  action?: string
}

function allowedHostnames() {
  const configured = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || 'co-optech.org,www.co-optech.org')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)

  // Local hosts are only accepted outside production.
  if (process.env.NODE_ENV !== 'production') {
    configured.push('localhost', '127.0.0.1')
  }
  return configured
}

export async function verifyTurnstile({
  token,
  action,
  remoteIp,
}: {
  token: string
  action: string
  remoteIp?: string
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[turnstile] TURNSTILE_SECRET_KEY is not set')
    return false
  }
  if (!token || token.length > 2048) return false

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body, cache: 'no-store' })
    const result = (await res.json()) as SiteverifyResponse

    if (!result.success) {
      console.warn('[turnstile] verification failed', result['error-codes'])
      return false
    }
    if (result.action !== action) {
      console.warn('[turnstile] unexpected action', result.action)
      return false
    }
    if (!result.hostname || !allowedHostnames().includes(result.hostname.toLowerCase())) {
      console.warn('[turnstile] unexpected hostname', result.hostname)
      return false
    }
    return true
  } catch (error) {
    console.error('[turnstile] siteverify request failed', error)
    return false
  }
}
