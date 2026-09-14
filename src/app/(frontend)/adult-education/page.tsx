import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('adult-education', '/adult-education')
}

export default function AdultEducationPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold text-navy-900">Adult Education</h1>
      <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />
      <p className="mt-6 text-base leading-7 text-ink-700">
        Post-graduates who already hold a diploma may enroll at Coop Tech while they remain within
        the Department of Education age limit of 21. Adult learners join the same half-day shops as
        shared-instruction students and can pursue industry certifications, internships, and
        apprenticeship pathways.
      </p>
      <p className="mt-4 text-base leading-7 text-ink-700">
        If you are a District 79 student or a recent graduate exploring a trade, contact admissions
        to confirm eligibility and campus availability.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admissions" variant="primary">
          Apply Now
        </Button>
        <Button href="mailto:coopadmissions@schools.nyc.gov" variant="ghost">
          Email admissions
        </Button>
      </div>
    </section>
  )
}
