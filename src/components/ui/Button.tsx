import Link from 'next/link'
import classNames from 'classnames'

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

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = classNames(
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className,
  )

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:')
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
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
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
