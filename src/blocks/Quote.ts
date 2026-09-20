import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      admin: {
        description: 'Name of the speaker',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Title or school role',
      },
    },
  ],
}
