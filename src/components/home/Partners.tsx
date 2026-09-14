import Image from 'next/image'

import { partners } from '@/data/partners'

function PartnerSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="partners-marquee-set" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <li key={`${hidden ? 'dup-' : ''}${partner.src}`} className="partner-item">
          <Image
            src={partner.src}
            alt={hidden ? '' : partner.alt}
            width={partner.width}
            height={partner.height}
            className="partner-logo"
          />
        </li>
      ))}
    </ul>
  )
}

export function Partners() {
  return (
    <section className="partners-section px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">Our Trusted Partners</h2>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-blue-600" />
        <p className="mt-4 text-base text-ink-700">
          Working together to build a stronger future in technical education
        </p>
        <div className="partners-carousel mt-10" aria-label="Partner logos">
          <div className="partners-marquee">
            <PartnerSet />
            <PartnerSet hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
