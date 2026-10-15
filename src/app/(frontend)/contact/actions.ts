'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'

import {
  inquiryCampuses,
  inquiryPrograms,
  inquiryRoles,
  inquiryTypes,
  preferredContacts,
  TURNSTILE_CONTACT_ACTION,
} from '@/data/contact-form'
import { verifyTurnstile } from '@/lib/turnstile'

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

  const requestHeaders = await headers()
  const remoteIp =
    requestHeaders.get('cf-connecting-ip') ||
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    undefined
  const human = await verifyTurnstile({
    token: value(formData, 'cf-turnstile-response'),
    action: TURNSTILE_CONTACT_ACTION,
    remoteIp,
  })
  if (!human) {
    throw new Error('Verification failed')
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
