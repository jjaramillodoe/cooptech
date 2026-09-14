'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import classNames from 'classnames'

import { FaqAnswer } from '@/components/faq/FaqAnswer'
import type { AccordionBlockData } from '@/types/content'

type AccordionVariant = 'card' | 'flush'

export function AccordionBlock({
  block,
  variant = 'card',
}: {
  block: AccordionBlockData
  variant?: AccordionVariant
}) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(variant === 'flush' ? null : 0)

  if (variant === 'flush') {
    return (
      <section className="mt-10">
        {block.heading ? (
          <h2 className="border-b border-fog-100 bg-fog-50 px-4 py-3 text-2xl font-semibold text-ink-900 sm:px-5">
            {block.heading}
          </h2>
        ) : null}
        <div className="divide-y divide-fog-100">
          {block.items.map((item, index) => {
            const expanded = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`
            return (
              <div key={item.question} className={classNames(expanded && 'bg-blue-50')}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(expanded ? null : index)}
                  >
                    <span className={classNames('text-sm font-medium sm:text-base', expanded ? 'text-blue-600' : 'text-ink-900')}>
                      {item.question}
                    </span>
                    <ChevronDown
                      className={classNames(
                        'h-4 w-4 shrink-0 text-ink-500 transition-transform duration-200',
                        expanded && 'rotate-180 text-blue-600',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="px-4 pb-5 sm:px-5"
                >
                  <FaqAnswer answer={item.answer} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {block.heading ? (
          <h2 className="mb-8 text-3xl font-bold text-navy-900 sm:text-4xl">{block.heading}</h2>
        ) : null}
        <div className="divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10">
          {block.items.map((item, index) => {
            const expanded = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(expanded ? null : index)}
                  >
                    <span className="font-semibold text-navy-900">{item.question}</span>
                    <ChevronDown
                      className={classNames(
                        'h-5 w-5 shrink-0 text-navy-700 transition-transform duration-200',
                        expanded && 'rotate-180',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="px-5 pb-5"
                >
                  <FaqAnswer answer={item.answer} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
