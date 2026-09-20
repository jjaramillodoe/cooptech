import type { Block } from 'payload'

export const LogoStrip: Block = {
  slug: 'logoStrip',
  labels: {
    singular: 'Logo Strip',
    plural: 'Logo Strips',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
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
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Partner name, used as image alt text',
          },
        },
        {
          name: 'href',
          type: 'text',
        },
      ],
    },
  ],
}
