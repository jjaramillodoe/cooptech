'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe } from 'lucide-react'
import classNames from 'classnames'

export const LANGUAGES = [
  { value: 'en', google: 'en', label: 'Select Language' },
  { value: 'af', google: 'af', label: 'Afrikaans' },
  { value: 'ar', google: 'ar', label: 'العربية (Arabic)' },
  { value: 'bn', google: 'bn', label: 'বাংলা (Bengali)' },
  { value: 'bg', google: 'bg', label: 'Български (Bulgarian)' },
  { value: 'cs', google: 'cs', label: 'Čeština (Czech)' },
  { value: 'da', google: 'da', label: 'Dansk (Danish)' },
  { value: 'nl', google: 'nl', label: 'Nederlands (Dutch)' },
  { value: 'en', google: 'en', label: 'English' },
  { value: 'fi', google: 'fi', label: 'Suomi (Finnish)' },
  { value: 'fr', google: 'fr', label: 'Français (French)' },
  { value: 'de', google: 'de', label: 'Deutsch (German)' },
  { value: 'el', google: 'el', label: 'Ελληνικά (Greek)' },
  { value: 'ht', google: 'ht', label: 'Kreyòl Ayisyen (Haitian Creole)' },
  { value: 'he', google: 'iw', label: 'עברית (Hebrew)' },
  { value: 'hi', google: 'hi', label: 'हिन्दी (Hindi)' },
  { value: 'hu', google: 'hu', label: 'Magyar (Hungarian)' },
  { value: 'id', google: 'id', label: 'Bahasa Indonesia (Indonesian)' },
  { value: 'it', google: 'it', label: 'Italiano (Italian)' },
  { value: 'ja', google: 'ja', label: '日本語 (Japanese)' },
  { value: 'ko', google: 'ko', label: '한국어 (Korean)' },
  { value: 'ms', google: 'ms', label: 'Bahasa Melayu (Malay)' },
  { value: 'mr', google: 'mr', label: 'मराठी (Marathi)' },
  { value: 'fa', google: 'fa', label: 'فارسی (Persian)' },
  { value: 'pl', google: 'pl', label: 'Polski (Polish)' },
  { value: 'pt', google: 'pt', label: 'Português (Portuguese)' },
  { value: 'pa', google: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { value: 'ro', google: 'ro', label: 'Română (Romanian)' },
  { value: 'ru', google: 'ru', label: 'Русский (Russian)' },
  { value: 'zh-CN', google: 'zh-CN', label: '简体中文 (Simplified Chinese)' },
  { value: 'es', google: 'es', label: 'Español (Spanish)' },
  { value: 'sw', google: 'sw', label: 'Kiswahili (Swahili)' },
  { value: 'sv', google: 'sv', label: 'Svenska (Swedish)' },
  { value: 'tl', google: 'tl', label: 'Tagalog / Filipino' },
  { value: 'ta', google: 'ta', label: 'தமிழ் (Tamil)' },
  { value: 'te', google: 'te', label: 'తెలుగు (Telugu)' },
  { value: 'th', google: 'th', label: 'ไทย (Thai)' },
  { value: 'zh-TW', google: 'zh-TW', label: '繁體中文 (Traditional Chinese)' },
  { value: 'tr', google: 'tr', label: 'Türkçe (Turkish)' },
  { value: 'uk', google: 'uk', label: 'Українська (Ukrainian)' },
  { value: 'ur', google: 'ur', label: 'اردو (Urdu)' },
  { value: 'vi', google: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { value: 'zu', google: 'zu', label: 'isiZulu (Zulu)' },
] as const;

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
  if (code === 'zh') return 'zh-CN'
  if (code === 'iw') return 'he'
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
