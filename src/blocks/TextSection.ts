import type { Block } from 'payload'

export const TextSection: Block = {
  slug: 'textSection',
  labels: {
    singular: 'Text Section',
    plural: 'Text Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Separate paragraphs with a blank line.',
      },
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonHref',
      type: 'text',
    },
  ],
}
