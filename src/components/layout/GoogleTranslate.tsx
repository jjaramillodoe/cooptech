'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe } from 'lucide-react'
import classNames from 'classnames'

const LANGUAGES = [
  { value: 'en', google: 'en', label: 'Select Language' },
  { value: 'es', google: 'es', label: 'Español' },
  { value: 'zh', google: 'zh-CN', label: '中文' },
  { value: 'ar', google: 'ar', label: 'العربية' },
  { value: 'bn', google: 'bn', label: 'বাংলা' },
  { value: 'ht', google: 'ht', label: 'Kreyòl Ayisyen' },
  { value: 'nl', google: 'nl', label: 'Nederlands' },
  { value: 'pl', google: 'pl', label: 'Polski' },
  { value: 'pt', google: 'pt', label: 'Português' },
  { value: 'ro', google: 'ro', label: 'Română' },
  { value: 'sv', google: 'sv', label: 'Svenska' },
  { value: 'th', google: 'th', label: 'ไทย' },
  { value: 'tl', google: 'tl', label: 'Tagalog' },
  { value: 'uk', google: 'uk', label: 'Українська' },
  { value: 'vi', google: 'vi', label: 'Tiếng Việt' },
  { value: 'zu', google: 'zu', label: 'Zulu' },
  { value: 'ja', google: 'ja', label: '日本語' },
  { value: 'ko', google: 'ko', label: '한국어' },
  { value: 'ru', google: 'ru', label: 'Русский' },
  { value: 'tr', google: 'tr', label: 'Türkçe' },
  { value: 'vi', google: 'vi', label: 'Tiếng Việt' },
  { value: 'zu', google: 'zu', label: 'Zulu' },
  { value: 'ja', google: 'ja', label: '日本語' },
  { value: 'ko', google: 'ko', label: '한국어' },
] as const

type LanguageValue = (typeof LANGUAGES)[number]['value']

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay?: boolean
          },
          elementId: string,
        ) => void
      }
    }
  }
}

function toLanguageValue(code: string): LanguageValue {
  if (code === 'zh-CN' || code === 'zh-TW') return 'zh'
  return LANGUAGES.some((language) => language.value === code) ? (code as LanguageValue) : 'en'
}

function googleCode(value: LanguageValue) {
  return LANGUAGES.find((language) => language.value === value)?.google ?? 'en'
}

function readSavedLanguage(): LanguageValue {
  const match = document.cookie.match(/(?:^|; )googtrans=\/[^/]+\/([^;]+)/)
  return toLanguageValue(decodeURIComponent(match?.[1] ?? 'en'))
}

function saveLanguage(value: LanguageValue) {
  const cookie = `googtrans=/en/${googleCode(value)};path=/`
  document.cookie = cookie
  const hostname = window.location.hostname
  if (hostname.includes('.')) {
    document.cookie = `${cookie};domain=.${hostname}`
  }
}

function comboSelect(): HTMLSelectElement | null {
  return document.querySelector<HTMLSelectElement>('.goog-te-combo')
}

function applyLanguage(value: LanguageValue) {
  const code = googleCode(value)
  const combo = comboSelect()
  if (!combo) return false
  combo.value = code
  combo.dispatchEvent(new Event('change'))
  return true
}

function loadWidget() {
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) return
    if (!document.getElementById('google_translate_element')) return
    if (comboSelect()) return
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: LANGUAGES.map((language) => language.google).join(','),
        autoDisplay: false,
      },
      'google_translate_element',
    )
  }

  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
    return
  }

  if (window.google?.translate) window.googleTranslateElementInit()
}

export function GoogleTranslate() {
  const pathname = usePathname()
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<LanguageValue>('en')
  const current = LANGUAGES.find((item) => item.value === language) ?? LANGUAGES[0]

  useEffect(() => {
    const saved = readSavedLanguage()
    setLanguage(saved)
    loadWidget()

    const timer = window.setTimeout(() => {
      if (saved !== 'en') applyLanguage(saved)
    }, 500)

    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectLanguage = (value: LanguageValue) => {
    setLanguage(value)
    setOpen(false)
    saveLanguage(value)
    if (!applyLanguage(value)) {
      window.location.reload()
    }
  }

  return (
    <div ref={rootRef} className="notranslate relative" translate="no">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-xs text-ink-500"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{current.label}</span>
        <ChevronDown className={classNames('h-3 w-3 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 top-full z-50 mt-1 min-w-40 rounded-xl border border-fog-100 bg-white py-1 shadow-lg"
        >
          {LANGUAGES.map((item) => (
            <li key={item.value} role="option" aria-selected={item.value === language}>
              <button
                type="button"
                className={classNames(
                  'block w-full px-3 py-1.5 text-left text-xs text-ink-700 hover:bg-blue-50 hover:text-blue-700',
                  item.value === language && 'bg-blue-50 font-medium text-blue-700',
                )}
                onClick={() => selectLanguage(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div id="google_translate_element" className="google-translate-widget" aria-hidden="true" />
    </div>
  )
}
