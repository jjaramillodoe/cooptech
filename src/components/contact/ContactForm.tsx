'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { submitInquiry } from '@/app/(frontend)/contact/actions'

const programs = [
  'Automotive Services',
  'Construction and Building Skills',
  'Culinary Arts',
  'Electrical',
  'Health Services',
  'Information Technology',
  'Unisex Styling',
  'Work-Based Learning',
  'OSHA',
  'Not sure yet',
]

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [pending, setPending] = useState(false)

  async function onSubmit(formData: FormData) {
    setPending(true)
    setStatus('idle')
    try {
      await submitInquiry(formData)
      setStatus('success')
      formRef.current?.reset()
    } catch {
      setStatus('error')
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="relative rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm"
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy-900">
          Full name
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Program interest
          <select
            name="program"
            className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
            defaultValue="Not sure yet"
          >
            {programs.map((program) => (
              <option key={program}>{program}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium text-navy-900">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2"
        />
      </label>
      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </Button>
        {status === 'success' ? (
          <p role="status" className="text-sm text-navy-700">
            Thanks — your message was saved. For fastest help email coopadmissions@schools.nyc.gov.
          </p>
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="text-sm text-red-700">
            We could not save this message. Please email admissions directly.
          </p>
        ) : null}
      </div>
    </form>
  )
}
