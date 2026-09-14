import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

import { brandImages, brandImageSizes } from '@/data/brand'

type LogoProps = {
  href?: string
  compact?: boolean
  className?: string
  priority?: boolean
}

export function Logo({ href = '/', compact = false, className, priority = false }: LogoProps) {
  const content = (
    <Image
      src={brandImages.coopTech}
      alt="Coop Tech — Learning that works"
      width={brandImageSizes.coopTech.width}
      height={brandImageSizes.coopTech.height}
      priority={priority}
      className={classNames(compact ? 'h-10 w-auto' : 'h-12 w-auto sm:h-[3.4rem]', className)}
    />
  )

  if (!href) return content

  return (
    <Link
      href={href}
      className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      {content}
    </Link>
  )
}
