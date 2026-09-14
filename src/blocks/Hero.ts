import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'primaryLabel',
      type: 'text',
    },
    {
      name: 'primaryHref',
      type: 'text',
    },
    {
      name: 'secondaryLabel',
      type: 'text',
    },
    {
      name: 'secondaryHref',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fallbackImage',
      type: 'text',
    },
  ],
}
