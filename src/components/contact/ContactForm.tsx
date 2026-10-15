'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { TurnstileWidget, type TurnstileHandle } from '@/components/contact/TurnstileWidget'
import { submitInquiry } from '@/app/(frontend)/contact/actions'
import {
  inquiryCampuses,
  inquiryPrograms,
  inquiryRoles,
  inquiryTypes,
  preferredContacts,
  TURNSTILE_CONTACT_ACTION,
} from '@/data/contact-form'

const fieldClass =
  'mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2'

function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
}: {
  label: string
  name: string
  options: readonly string[]
  required?: boolean
  defaultValue?: string
}) {
  return (
    <label className="block text-sm font-medium text-navy-900">
      {label}
      <select name={name} required={required} defaultValue={defaultValue ?? ''} className={fieldClass}>
        {defaultValue ? null : <option value="">Select</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const turnstileRef = useRef<TurnstileHandle>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [pending, setPending] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')

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
      // Turnstile tokens are single-use; get a fresh one for the next attempt.
      turnstileRef.current?.reset()
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
          <input required name="name" autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Email
          <input required type="email" name="email" autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Phone
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </label>
        <SelectField label="I am a" name="role" options={inquiryRoles} required />
        <SelectField label="What is this about?" name="inquiryType" options={inquiryTypes} required />
        <SelectField
          label="Best way to reach you"
          name="preferredContact"
          options={preferredContacts}
          defaultValue="Email"
        />
        <label className="block text-sm font-medium text-navy-900">
          Student name
          <input name="studentName" autoComplete="name" className={fieldClass} />
          <span className="mt-1 block text-xs font-normal text-ink-500">
            If a parent or counselor is writing for a student.
          </span>
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Home school
          <input name="homeSchool" className={fieldClass} />
        </label>
        <SelectField
          label="Program interest"
          name="program"
          options={inquiryPrograms}
          defaultValue="Not sure yet"
        />
        <SelectField label="Preferred campus" name="campus" options={inquiryCampuses} defaultValue="Not sure yet" />
      </div>
      <label className="mt-4 block text-sm font-medium text-navy-900">
        Message
        <textarea required name="message" rows={5} className={fieldClass} />
      </label>
      <TurnstileWidget
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        action={TURNSTILE_CONTACT_ACTION}
        onTokenChange={setTurnstileToken}
      />
      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={pending || !turnstileToken}>
          {pending ? 'Sending…' : 'Send message'}
        </Button>
        {status === 'success' ? (
          <p role="status" className="text-sm text-navy-700">
            Thanks — your inquiry was received. Admissions will follow up using the contact method you chose.
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
