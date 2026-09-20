import type { Block } from 'payload'

import { contactIconOptions } from '../lib/block-icons'

export const ContactCards: Block = {
  slug: 'contactCards',
  labels: {
    singular: 'Contact Cards',
    plural: 'Contact Cards',
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
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'mail',
          options: [...contactIconOptions],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description: 'Optional. Use mailto:, tel:, or a URL so the value is clickable.',
          },
        },
      ],
    },
  ],
}
