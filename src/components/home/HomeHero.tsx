import Image from 'next/image'

import { Logo } from '@/components/brand/Logo'

const collage = [
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    alt: 'Health services student in clinical training',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    alt: 'Construction students on a job site',
  },
  {
    src: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80',
    alt: 'Automotive services shop',
  },
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    alt: 'Unisex styling salon classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    alt: 'Information technology lab',
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
    alt: 'Culinary arts kitchen',
  },
]

export function HomeHero() {
  return (
    <section className="blob-field overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy-900 shadow-2xl">
        <div className="grid grid-cols-3">
          {collage.map((image) => (
            <div key={image.src} className="relative aspect-[4/3]">
              <Image src={image.src} alt={image.alt} fill sizes="33vw" className="object-cover" priority />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-navy-900/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white/95 px-8 py-5 shadow-xl sm:px-12">
            <Logo href="/" priority className="h-14 w-auto sm:h-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
