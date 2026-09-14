import Image from 'next/image'
import classNames from 'classnames'

type PartnerLogoProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function PartnerLogo({ src, alt, width, height, className }: PartnerLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classNames('h-16 w-auto object-contain sm:h-20', className)}
    />
  )
}
