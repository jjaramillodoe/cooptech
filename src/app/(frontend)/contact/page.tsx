import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ContactForm } from '@/components/contact/ContactForm'
import { CmsPage } from '@/components/pages/CmsPage'
import { ContactLocations } from '@/components/contact/ContactLocations'
import { campuses } from '@/data/campuses'
import { getPageBySlug } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('contact', '/contact')
}

export default async function ContactPage() {
  const page = await getPageBySlug('contact')
  const mapboxToken = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

  return (
    <CmsPage page={page}>
      {page ? <RenderBlocks blocks={page.layout} /> : null}
      <section className="w-full bg-fog-50 py-16">
        <ContactLocations token={mapboxToken} campuses={campuses}>
          <h2 className="text-3xl font-bold text-navy-900">Send a message</h2>
          <p className="mt-3 text-sm leading-6 text-ink-700">
            For enrollment questions, email{' '}
            <a className="font-semibold text-blue-600 underline" href="mailto:coopadmissions@schools.nyc.gov">
              coopadmissions@schools.nyc.gov
            </a>
            . Use this form for general campus and program inquiries.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </ContactLocations>
      </section>
    </CmsPage>
  )
}
