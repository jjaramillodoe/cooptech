import type { ReactNode } from 'react'

const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi
const phonePattern = /(\d{3}[-.]?\d{3}[-.]?\d{4})/g

function linkify(text: string) {
  const parts: ReactNode[] = []
  const combined = new RegExp(`${emailPattern.source}|${phonePattern.source}`, 'gi')
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const value = match[0]
    if (value.includes('@')) {
      parts.push(
        <a key={`link-${key++}`} className="font-semibold text-blue-600 underline" href={`mailto:${value}`}>
          {value}
        </a>,
      )
    } else {
      parts.push(
        <a key={`link-${key++}`} className="font-semibold text-blue-600 underline" href={`tel:${value.replace(/\D/g, '')}`}>
          {value}
        </a>,
      )
    }
    lastIndex = match.index + value.length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

function renderParagraph(paragraph: string, index: number) {
  const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean)
  const listItems = lines.filter((line) => line.startsWith('- '))
  if (listItems.length === lines.length && listItems.length > 0) {
    return (
      <ul key={index} className="list-disc space-y-1 pl-5">
        {listItems.map((line) => (
          <li key={line}>{linkify(line.replace(/^- /, ''))}</li>
        ))}
      </ul>
    )
  }

  return <p key={index}>{linkify(paragraph)}</p>
}

export function FaqAnswer({ answer }: { answer: string }) {
  return (
    <div className="space-y-3 text-sm leading-6 text-ink-700">
      {answer.split(/\n\n+/).map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  )
}
