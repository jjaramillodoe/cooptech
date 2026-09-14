import type { Block } from 'payload'

export const ImageTextGrid: Block = {
  slug: 'imageTextGrid',
  labels: {
    singular: 'Image / Text Grid',
    plural: 'Image / Text Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
        {
          name: 'href',
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
    },
  ],
}
