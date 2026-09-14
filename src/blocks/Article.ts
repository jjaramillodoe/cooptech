import type { Block } from 'payload'

export const Article: Block = {
  slug: 'article',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title shown above the hero photo, e.g. About Coop.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Wide courtyard / campus photo.',
      },
    },
    {
      name: 'fallbackImage',
      type: 'text',
      admin: {
        description: 'Remote image URL used when no CMS media is uploaded.',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional PDF shown as the red document badge.',
      },
    },
    {
      name: 'documentLabel',
      type: 'text',
      defaultValue: 'Download PDF',
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
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
        },
      ],
    },
  ],
}
