import {
  AlertCircle,
  Calendar,
  GraduationCap,
  Info,
  Mail,
  Megaphone,
  type LucideIcon,
} from 'lucide-react'
import classNames from 'classnames'
import Link from 'next/link'

import type { BannerData, BannerIcon, BannerTone } from '@/types/content'

const icons: Record<BannerIcon, LucideIcon> = {
  'graduation-cap': GraduationCap,
  megaphone: Megaphone,
  calendar: Calendar,
  info: Info,
  alert: AlertCircle,
  mail: Mail,
}

const tones: Record<BannerTone, string> = {
  info: 'from-blue-600 via-blue-700 to-navy-900',
  closed: 'from-[#1f4fd8] via-[#163a8c] to-[#0f1728]',
  warning: 'from-amber-500 via-orange-600 to-navy-900',
  success: 'from-emerald-500 via-teal-700 to-navy-900',
}

const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi

function LinkedBody({ text, email }: { text: string; email?: string }) {
  const parts = text.split(emailPattern)
  return (
    <>
      {parts.map((part, index) => {
        if (part.includes('@') && part.includes('.')) {
          return (
            <a
              key={`${part}-${index}`}
              href={`mailto:${part}`}
              className="font-semibold underline underline-offset-2"
            >
              {part}
            </a>
          )
        }
        return <span key={`${part}-${index}`}>{part}</span>
      })}
      {email && !text.includes(email) ? (
        <>
          {' '}
          <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
            {email}
          </a>
        </>
      ) : null}
    </>
  )
}

export function AnnouncementBar({ banner }: { banner: BannerData }) {
  const Icon = icons[banner.icon] || GraduationCap

  return (
    <section className="bg-white px-4 pt-5 sm:px-6">
      <div
        className={classNames(
          'mx-auto flex max-w-6xl items-start gap-4 rounded-2xl bg-gradient-to-r px-5 py-5 text-white shadow-lg shadow-navy-900/15 sm:items-center sm:px-7',
          tones[banner.tone],
        )}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2f6fed] shadow-inner">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold sm:text-xl">{banner.heading}</h2>
          <p className="mt-1 text-sm leading-6 text-white/90">
            <LinkedBody text={banner.body} email={banner.email} />
            {banner.linkHref && banner.linkLabel ? (
              <>
                {' '}
                <Link href={banner.linkHref} className="font-semibold underline underline-offset-2">
                  {banner.linkLabel}
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  )
}
