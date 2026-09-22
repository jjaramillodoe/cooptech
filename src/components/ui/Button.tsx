'use client'

import Link from 'next/link'
import classNames from 'classnames'

import { useAdmissions } from '@/components/admissions/AdmissionsProvider'
import { isPortalHref } from '@/lib/admissions'

type ButtonProps = {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
  secondary:
    'border border-white/70 bg-white/10 text-white hover:bg-white hover:text-navy-900 focus-visible:outline-white',
  ghost:
    'border border-ink-900/10 bg-white text-navy-900 hover:border-blue-600 hover:text-blue-700',
  gold: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
}

const closedClasses =
  '!cursor-not-allowed !border-transparent !bg-zinc-300 !text-zinc-500 hover:!bg-zinc-300 hover:!text-zinc-500'

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const admissions = useAdmissions()
  const portalLink = isPortalHref(href, admissions.portalUrl)
  const closed = Boolean(portalLink && !admissions.open)
  const classes = classNames(
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
    variants[variant],
    (closed || disabled) && closedClasses,
    className,
  )

  if (href && !closed && !disabled) {
    const external = href.startsWith('http') || href.startsWith('mailto:')
    if (external) {
      const newTab = portalLink
      return (
        <a
          href={href}
          className={classes}
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || closed}
      aria-disabled={disabled || closed || undefined}
      title={closed ? 'Applications are currently closed' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function ApplyButton({
  children,
  variant = 'primary',
  className,
}: {
  children: React.ReactNode
  variant?: ButtonProps['variant']
  className?: string
}) {
  const { portalUrl } = useAdmissions()
  return (
    <Button href={portalUrl} variant={variant} className={className}>
      {children}
    </Button>
  )
}
