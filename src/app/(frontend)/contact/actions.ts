'use server'

import { getPayload } from 'payload'

import {
  inquiryCampuses,
  inquiryPrograms,
  inquiryRoles,
  inquiryTypes,
  preferredContacts,
} from '@/data/contact-form'

function value(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim()
}

function oneOf<T extends string>(input: string, allowed: readonly T[]): T | '' {
  return allowed.find((option) => option === input) ?? ''
}

export async function submitInquiry(formData: FormData) {
  if (value(formData, 'company')) {
    return { ok: true as const }
  }

  const name = value(formData, 'name')
  const email = value(formData, 'email')
  const phone = value(formData, 'phone')
  const role = oneOf(value(formData, 'role'), inquiryRoles)
  const inquiryType = oneOf(value(formData, 'inquiryType'), inquiryTypes)
  const preferredContact = oneOf(value(formData, 'preferredContact'), preferredContacts) || 'Email'
  const studentName = value(formData, 'studentName')
  const homeSchool = value(formData, 'homeSchool')
  const program = oneOf(value(formData, 'program'), inquiryPrograms)
  const campus = oneOf(value(formData, 'campus'), inquiryCampuses)
  const message = value(formData, 'message')

  if (!name || !email || !role || !inquiryType || !message) {
    throw new Error('Missing required fields')
  }

  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'contact-submissions',
    data: {
      name,
      email,
      phone: phone || undefined,
      role,
      inquiryType,
      preferredContact,
      studentName: studentName || undefined,
      homeSchool: homeSchool || undefined,
      program: program || undefined,
      campus: campus || undefined,
      message,
      status: 'new',
    },
    overrideAccess: false,
  })

  return { ok: true as const }
}
