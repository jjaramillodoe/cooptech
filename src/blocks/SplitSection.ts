import type { Block } from 'payload'

export const SplitSection: Block = {
  slug: 'splitSection',
  labels: {
    singular: 'Split Image + Text',
    plural: 'Split Image + Text',
  },
  fields: [
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image left', value: 'left' },
        { label: 'Image right', value: 'right' },
      ],
    },
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
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonHref',
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
    {
      name: 'imageAlt',
      type: 'text',
    },
  ],
}
