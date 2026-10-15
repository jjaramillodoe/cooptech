'use client'

import { useRef, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { TurnstileWidget, type TurnstileHandle } from '@/components/contact/TurnstileWidget'
import { submitInquiry, type InquiryResult } from '@/app/(frontend)/contact/actions'
import {
  inquiryCampuses,
  inquiryPrograms,
  inquiryRoles,
  inquiryTypes,
  preferredContacts,
  TURNSTILE_CONTACT_ACTION,
} from '@/data/contact-form'
import { contactLimits } from '@/lib/contact-validation'

type FieldErrors = NonNullable<Extract<InquiryResult, { ok: false }>['fieldErrors']>

const fieldClass =
  'mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2.5 text-sm outline-none ring-blue-500 focus:ring-2 aria-[invalid=true]:border-red-600'

function FieldError({ name, errors }: { name: keyof FieldErrors; errors: FieldErrors }) {
  const message = errors[name]
  if (!message) return null
  return (
    <span id={`${name}-error`} className="mt-1 block text-xs font-normal text-red-700">
      {message}
    </span>
  )
}

function errorProps(name: keyof FieldErrors, errors: FieldErrors) {
  return errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` } : {}
}

function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
  errors = {},
}: {
  label: string
  name: string
  options: readonly string[]
  required?: boolean
  defaultValue?: string
  errors?: FieldErrors
}) {
  return (
    <label className="block text-sm font-medium text-navy-900">
      {label}
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className={fieldClass}
        {...errorProps(name as keyof FieldErrors, errors)}
      >
        {defaultValue ? null : <option value="">Select</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError name={name as keyof FieldErrors} errors={errors} />
    </label>
  )
}

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const turnstileRef = useRef<TurnstileHandle>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [pending, setPending] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')

  // onSubmit (not a form action) so React keeps the typed values when the server rejects a field.
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const formData = new FormData(event.currentTarget)
    setPending(true)
    setStatus('idle')
    setFormError('')
    try {
      const result = await submitInquiry(formData)
      if (result.ok) {
        setFieldErrors({})
        setStatus('success')
        formRef.current?.reset()
      } else {
        setFieldErrors(result.fieldErrors ?? {})
        setFormError(result.formError ?? 'Please fix the highlighted fields.')
        setStatus('error')
      }
    } catch {
      setFormError('We could not save this message. Please email admissions directly.')
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
      onSubmit={onSubmit}
      onInput={(event) => {
        const field = (event.target as HTMLInputElement).name as keyof FieldErrors
        if (fieldErrors[field]) setFieldErrors(({ [field]: _cleared, ...rest }) => rest)
      }}
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
            maxLength={contactLimits.name}
            className={fieldClass}
            {...errorProps('name', fieldErrors)}
          />
          <FieldError name="name" errors={fieldErrors} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={contactLimits.email}
            className={fieldClass}
            {...errorProps('email', fieldErrors)}
          />
          <FieldError name="email" errors={fieldErrors} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Phone
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(212) 555-0100"
            maxLength={contactLimits.phone}
            className={fieldClass}
            {...errorProps('phone', fieldErrors)}
          />
          <FieldError name="phone" errors={fieldErrors} />
        </label>
        <SelectField label="I am a" name="role" options={inquiryRoles} required errors={fieldErrors} />
        <SelectField label="What is this about?" name="inquiryType" options={inquiryTypes} required errors={fieldErrors} />
        <SelectField
          label="Best way to reach you"
          name="preferredContact"
          options={preferredContacts}
          defaultValue="Email"
        />
        <label className="block text-sm font-medium text-navy-900">
          Student name
          <input
            name="studentName"
            autoComplete="off"
            maxLength={contactLimits.studentName}
            className={fieldClass}
            {...errorProps('studentName', fieldErrors)}
          />
          <span className="mt-1 block text-xs font-normal text-ink-500">
            If a parent or counselor is writing for a student.
          </span>
          <FieldError name="studentName" errors={fieldErrors} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Home school
          <input
            name="homeSchool"
            maxLength={contactLimits.homeSchool}
            className={fieldClass}
            {...errorProps('homeSchool', fieldErrors)}
          />
          <FieldError name="homeSchool" errors={fieldErrors} />
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
        <textarea
          required
          name="message"
          rows={5}
          maxLength={contactLimits.message}
          className={fieldClass}
          {...errorProps('message', fieldErrors)}
        />
        <FieldError name="message" errors={fieldErrors} />
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
            {formError}
          </p>
        ) : null}
      </div>
    </form>
  )
}
