import type { Block } from 'payload'

import { blockIconOptions } from '../lib/block-icons'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Cards',
    plural: 'Feature Cards',
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
          name: 'icon',
          type: 'select',
          defaultValue: 'graduation-cap',
          options: [...blockIconOptions],
        },
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
          name: 'linkLabel',
          type: 'text',
          defaultValue: 'Learn More',
        },
      ],
    },
  ],
}
