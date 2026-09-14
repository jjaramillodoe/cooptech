import type { Metadata } from 'next'

import { StaffDirectory } from '@/components/staff/StaffDirectory'
import { getStaff } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('staff', '/staff')
}

export default async function StaffPage() {
  const staff = await getStaff()

  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-bold text-blue-600 sm:text-5xl">Staff</h1>
        <div className="mt-8">
          <StaffDirectory staff={staff} />
        </div>
      </div>
    </section>
  )
}
