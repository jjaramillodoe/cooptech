function renderParagraph(paragraph: string, index: number) {
  const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean)
  const listItems = lines.filter((line) => line.startsWith('- '))
  if (listItems.length === lines.length && listItems.length > 0) {
    return (
      <ul key={index} className="list-disc space-y-1 pl-5">
        {listItems.map((line) => (
          <li key={line}>{line.replace(/^- /, '')}</li>
        ))}
      </ul>
    )
  }

  return <p key={index}>{paragraph}</p>
}

export function ProgramCopy({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-base leading-7 text-ink-700">
      {text.split(/\n\n+/).map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  )
}
