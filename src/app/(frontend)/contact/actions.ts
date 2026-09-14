'use server'

import { getPayload } from 'payload'

export async function submitInquiry(formData: FormData) {
  if (String(formData.get('company') || '').trim()) {
    return { ok: true as const }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const program = String(formData.get('program') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
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
      program: program || undefined,
      message,
      status: 'new',
    },
  })

  return { ok: true as const }
}
