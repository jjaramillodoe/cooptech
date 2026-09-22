'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import classNames from 'classnames'

import { Logo } from '@/components/brand/Logo'
import { GoogleTranslate } from '@/components/layout/GoogleTranslate'
import { ApplyButton } from '@/components/ui/Button'
import type { NavItem } from '@/types/content'

type HeaderProps = {
  items: NavItem[]
}

export function Header({ items }: HeaderProps) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openDrawerSection, setOpenDrawerSection] = useState<string | null>('Programs')
  const navId = useId()
  const drawerId = useId()
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    setDrawerOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-fog-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end px-4 pt-2 sm:px-6">
        <GoogleTranslate />
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-3 sm:px-6">
        <Logo priority />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const hasChildren = Boolean(item.children?.length)
            const expanded = openMenu === item.label
            const active =
              pathname === item.href ||
              item.children?.some((child) => pathname === child.href) ||
              (item.href !== '/' && pathname.startsWith(item.href))

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-700 transition hover:text-blue-600',
                    active && 'text-blue-600',
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 text-ink-500" aria-hidden="true" />
                </Link>
              )
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  clearClose()
                  setOpenMenu(item.label)
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={classNames(
                    'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink-700 transition hover:text-blue-600',
                    active && 'text-blue-600',
                  )}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  aria-controls={`${navId}-${item.label}`}
                  onClick={() => setOpenMenu(expanded ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={classNames('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`${navId}-${item.label}`}
                  hidden={!expanded}
                  className="absolute left-0 top-full z-50 min-w-72 pt-2"
                >
                  <ul className="rounded-2xl border border-fog-100 bg-white p-2 shadow-xl">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm text-ink-700 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ApplyButton className="hidden sm:inline-flex">Apply Now</ApplyButton>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-fog-100 text-navy-900 lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setDrawerOpen((value) => !value)}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <div className="lg:hidden">
          <div className="drawer-backdrop fixed inset-0 z-40 bg-navy-900/40" onClick={() => setDrawerOpen(false)} />
          <div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="drawer-panel fixed inset-y-0 right-0 z-50 w-[min(22rem,88vw)] overflow-y-auto bg-white p-5 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-navy-900">Menu</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fog-100"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {items.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const expanded = openDrawerSection === item.label
                return (
                  <li key={item.label} className="border-b border-fog-100 py-2">
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-navy-900"
                          aria-expanded={expanded}
                          onClick={() => setOpenDrawerSection(expanded ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown className={classNames('h-4 w-4 transition', expanded && 'rotate-180')} />
                        </button>
                        <ul hidden={!expanded} className="mb-2 space-y-1 pl-3">
                          {item.children?.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="block py-1.5 text-sm text-ink-700">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link href={item.href} className="block py-2 text-base font-medium text-navy-900">
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
            <ApplyButton className="mt-6 w-full">Apply Now</ApplyButton>
          </div>
        </div>
      ) : null}
    </header>
  )
}
