'use client'

import Script from 'next/script'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export type TurnstileHandle = { reset: () => void }

export const TurnstileWidget = forwardRef<
  TurnstileHandle,
  { siteKey: string; action: string; onTokenChange?: (token: string) => void }
>(function TurnstileWidget({ siteKey, action, onTokenChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const onTokenChangeRef = useRef(onTokenChange)
  const [scriptReady, setScriptReady] = useState(false)

  onTokenChangeRef.current = onTokenChange

  const render = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetId.current) return
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      // The widget injects a hidden `cf-turnstile-response` input into the form.
      'response-field-name': 'cf-turnstile-response',
      callback: (token: string) => onTokenChangeRef.current?.(token),
      'expired-callback': () => onTokenChangeRef.current?.(''),
      'error-callback': () => onTokenChangeRef.current?.(''),
    })
  }, [siteKey, action])

  useEffect(() => {
    // Script may already be loaded from a previous client-side navigation.
    if (scriptReady || window.turnstile) render()
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
    }
  }, [scriptReady, render])

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
      onTokenChangeRef.current?.('')
    },
  }))

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="mt-5" />
    </>
  )
})
