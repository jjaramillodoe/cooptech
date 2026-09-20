'use client'

import { TwoFactorFieldComponent as PluginTwoFactorField } from '@plutotcool/payload-plugin-two-factor/client'
import QRCode from 'qrcode'
import { useLayoutEffect, useRef } from 'react'

import { svgFromQrDataUri } from '@/lib/totp-qr'

function mountSvg(img: HTMLImageElement, svg: string) {
  const holder = document.createElement('div')
  holder.innerHTML = svg
  const node = holder.querySelector('svg')
  if (!node) return
  node.setAttribute('role', 'img')
  node.setAttribute('aria-label', '2FA QR Code')
  node.setAttribute('width', '200')
  node.setAttribute('height', '200')
  img.replaceWith(node)
}

function inlineQrImages(root: HTMLElement) {
  root.querySelectorAll<HTMLImageElement>('.payload-two-factor__qr-code img').forEach((img) => {
    const svg = svgFromQrDataUri(img.getAttribute('src') || img.src)
    if (svg) {
      mountSvg(img, svg)
      return
    }
    if (img.dataset.qrBound === 'true') return
    img.dataset.qrBound = 'true'
    img.addEventListener('error', () => {
      const secret = root.querySelector('.payload-two-factor__secret-code')?.textContent?.trim()
      if (!secret) return
      const uri =
        `otpauth://totp/${encodeURIComponent('Coop Tech CMS')}` +
        `?secret=${secret}&issuer=${encodeURIComponent('Coop Tech CMS')}&algorithm=SHA1&digits=6&period=30`
      void QRCode.toString(uri, { type: 'svg', margin: 2, width: 200 }).then((markup) => {
        mountSvg(img, markup)
      })
    })
  })
}

export function TwoFactorFieldComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    inlineQrImages(root)
    const observer = new MutationObserver(() => inlineQrImages(root))
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <PluginTwoFactorField />
    </div>
  )
}
