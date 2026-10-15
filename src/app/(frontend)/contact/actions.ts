'use server'

import { resolve4, resolveMx } from 'node:dns/promises'
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
import {
  cleanLine,
  contactLimits,
  isEmailShape,
  normalizeEmail,
  normalizeName,
  normalizePhone,
  type ContactField,
} from '@/lib/contact-validation'
import { verifyTurnstile } from '@/lib/turnstile'

export type InquiryResult =
  | { ok: true }
  | { ok: false; formError?: string; fieldErrors?: Partial<Record<ContactField | 'role' | 'inquiryType', string>> }

/** Same email + message inside this window is treated as a double submit. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000

function value(formData: FormData, key: string) {
  return String(formData.get(key) || '').trim()
}

function oneOf<T extends string>(input: string, allowed: readonly T[]): T | '' {
  return allowed.find((option) => option === input) ?? ''
}

async function domainAcceptsMail(email: string) {
  const domain = email.split('@')[1]
  if (!domain) return false
  const lookup = async () => {
    try {
      return (await resolveMx(domain)).length > 0
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code !== 'ENODATA' && code !== 'ENOTFOUND') throw error
      // No MX record: mail falls back to the domain's A record.
      return (await resolve4(domain).catch(() => [])).length > 0
    }
  }
  try {
    return await Promise.race([lookup(), new Promise<boolean>((done) => setTimeout(() => done(true), 3000))])
  } catch {
    // DNS trouble on our side should not block a real person.
    return true
  }
}

export async function submitInquiry(formData: FormData): Promise<InquiryResult> {
  if (value(formData, 'company')) {
    return { ok: true }
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
    return { ok: false, formError: 'We could not verify this submission. Please try the security check again.' }
  }

  const name = normalizeName(value(formData, 'name'))
  const email = normalizeEmail(value(formData, 'email'))
  const phoneInput = value(formData, 'phone')
  const phone = normalizePhone(phoneInput)
  const role = oneOf(value(formData, 'role'), inquiryRoles)
  const inquiryType = oneOf(value(formData, 'inquiryType'), inquiryTypes)
  const preferredContact = oneOf(value(formData, 'preferredContact'), preferredContacts) || 'Email'
  const studentName = normalizeName(value(formData, 'studentName'))
  const homeSchool = cleanLine(value(formData, 'homeSchool'))
  const program = oneOf(value(formData, 'program'), inquiryPrograms)
  const campus = oneOf(value(formData, 'campus'), inquiryCampuses)
  const message = value(formData, 'message')

  const fieldErrors: NonNullable<Extract<InquiryResult, { ok: false }>['fieldErrors']> = {}

  if (!/\p{L}/u.test(name)) fieldErrors.name = 'Enter your full name.'
  else if (name.length > contactLimits.name) fieldErrors.name = `Keep your name under ${contactLimits.name} characters.`

  if (!isEmailShape(email) || email.length > contactLimits.email) {
    fieldErrors.email = 'Enter a valid email address, like name@example.com.'
  } else if (!(await domainAcceptsMail(email))) {
    fieldErrors.email = `We can't deliver mail to “${email.split('@')[1]}”. Check the spelling.`
  }

  if (phone === null || phoneInput.length > contactLimits.phone) {
    fieldErrors.phone = 'Enter a 10-digit US phone number, like (212) 555-0100.'
  } else if (preferredContact === 'Phone' && !phone) {
    fieldErrors.phone = 'Add a phone number so admissions can call you.'
  }

  if (!role) fieldErrors.role = 'Choose who you are.'
  if (!inquiryType) fieldErrors.inquiryType = 'Choose what this is about.'

  if (studentName.length > contactLimits.studentName) {
    fieldErrors.studentName = `Keep the student name under ${contactLimits.studentName} characters.`
  }
  if (homeSchool.length > contactLimits.homeSchool) {
    fieldErrors.homeSchool = `Keep the school name under ${contactLimits.homeSchool} characters.`
  }

  if (message.length < 2) fieldErrors.message = 'Write a short message.'
  else if (message.length > contactLimits.message) {
    fieldErrors.message = `Keep your message under ${contactLimits.message} characters.`
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors }
  }

  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })

  const recent = await payload.find({
    collection: 'contact-submissions',
    where: {
      and: [
        { email: { equals: email } },
        { message: { equals: message } },
        { createdAt: { greater_than: new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString() } },
      ],
    },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  })
  if (recent.docs.length > 0) {
    return { ok: true }
  }

  // The REST create route is closed to the public; this action is the only way in.
  await payload.create({
    collection: 'contact-submissions',
    data: {
      name,
      email,
      phone: phone || undefined,
      role: role as (typeof inquiryRoles)[number],
      inquiryType: inquiryType as (typeof inquiryTypes)[number],
      preferredContact,
      studentName: studentName || undefined,
      homeSchool: homeSchool || undefined,
      program: program || undefined,
      campus: campus || undefined,
      message,
      status: 'new',
    },
    overrideAccess: true,
  })

  return { ok: true }
}
