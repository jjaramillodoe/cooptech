import { withTwoFactorMiddleware } from '@plutotcool/payload-plugin-two-factor/middleware'
import { NextResponse, type NextRequest } from 'next/server'

const ACCOUNT_PATH = '/admin/account'
const SETUP_SKIP_PATHS = [
  '/admin/login',
  '/admin/create-first-user',
  '/admin/forgot',
  '/admin/reset',
  '/admin/account',
  '/admin/verify',
  '/admin/logout',
]

const twoFactor = withTwoFactorMiddleware()

function shouldSkipSetupGate(pathname: string) {
  return SETUP_SKIP_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

export async function proxy(request: NextRequest) {
  const twoFactorResponse = await twoFactor(request)
  if (twoFactorResponse.headers.has('location')) {
    return twoFactorResponse
  }

  const { pathname } = request.nextUrl
  if (
    shouldSkipSetupGate(pathname) ||
    !pathname.startsWith('/admin') ||
    request.method !== 'GET' ||
    !request.cookies.get('payload-token')
  ) {
    return twoFactorResponse
  }

  try {
    const check = await fetch(new URL('/api/two-factor/check', request.url), {
      headers: { cookie: request.headers.get('cookie') ?? '' },
      cache: 'no-store',
    })
    if (!check.ok) return twoFactorResponse
    const data = (await check.json()) as { enabled?: boolean }
    if (data.enabled !== true) {
      return NextResponse.redirect(new URL(ACCOUNT_PATH, request.url))
    }
  } catch {
    return twoFactorResponse
  }

  return twoFactorResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
