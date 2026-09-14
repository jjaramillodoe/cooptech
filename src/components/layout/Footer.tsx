import Link from 'next/link'
import { BookOpen, CircleHelp, GraduationCap, Grid3x3, Home, Mail, Phone, Users, UserRound } from 'lucide-react'

import { Logo } from '@/components/brand/Logo'
import { PartnerLogo } from '@/components/brand/PartnerLogo'
import { brandImageSizes, brandImages } from '@/data/brand'
import { campuses } from '@/data/campuses'
import type { FooterColumn } from '@/types/content'

const iconByLabel: Record<string, typeof Home> = {
  Home,
  Programs: Grid3x3,
  'About Us': UserRound,
  "Principal's Message": UserRound,
  Staff: Users,
  Contact: Mail,
  FAQ: CircleHelp,
  'Adult Education': BookOpen,
  'Apply Now': GraduationCap,
}

export function Footer({ columns }: { columns: FooterColumn[] }) {
  const mainCampus = campuses[0]

  return (
    <footer className="border-t border-fog-100 bg-fog-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo href="/" compact />
          <p className="mt-5 text-sm text-ink-500">© {new Date().getFullYear()} Coop Tech. All rights reserved.</p>
          <p className="mt-3 text-sm leading-6 text-ink-700">{mainCampus.address}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink-700">
            <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
            <a href={`tel:${mainCampus.phone.replace(/[^\d]/g, '')}`}>{mainCampus.phone}</a>
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading} className="lg:col-span-2">
            <p className="text-sm font-semibold text-navy-900">{column.heading}</p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => {
                const Icon = iconByLabel[link.label] || Mail
                return (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center gap-2 text-sm text-ink-700 hover:text-blue-600">
                      <Icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-4">
          <p className="text-sm font-semibold text-navy-900">Affiliations</p>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <PartnerLogo
              src={brandImages.district79}
              alt="District 79 Alternative Schools & Programs — Tomorrow Starts Today"
              width={brandImageSizes.district79.width}
              height={brandImageSizes.district79.height}
              className="h-14 sm:h-16"
            />
            <PartnerLogo
              src={brandImages.nycPublicSchools}
              alt="NYC Public Schools"
              width={brandImageSizes.nycPublicSchools.width}
              height={brandImageSizes.nycPublicSchools.height}
              className="h-16 sm:h-[4.5rem]"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
