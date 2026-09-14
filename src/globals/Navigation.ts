import type { GlobalConfig } from 'payload'

const navLinkFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'header',
      type: 'array',
      labels: {
        singular: 'Header Link',
        plural: 'Header Links',
      },
      fields: [
        ...navLinkFields,
        {
          name: 'children',
          type: 'array',
          labels: {
            singular: 'Dropdown Item',
            plural: 'Dropdown Items',
          },
          fields: navLinkFields,
        },
      ],
    },
    {
      name: 'footer',
      type: 'array',
      labels: {
        singular: 'Footer Column',
        plural: 'Footer Columns',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: navLinkFields,
        },
      ],
    },
  ],
}
