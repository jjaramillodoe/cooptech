import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

type ProgramIconCardProps = {
  title: string
  body: string
  href: string
  icon: LucideIcon
}

export function ProgramIconCard({ title, body, href, icon: Icon }: ProgramIconCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(26,39,68,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(26,39,68,0.1)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-ink-700">{body}</p>
      <Link href={href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
        Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  )
}
