import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  imageURL: '/admin/block-previews/testimonials.svg',
  imageAltText: 'Testimonials layout preview',
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
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonHref',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
        },
        {
          name: 'authorCompany',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'select',
          defaultValue: '5',
          options: [
            { label: '5', value: '5' },
            { label: '4.5', value: '4.5' },
            { label: '4', value: '4' },
            { label: '3.5', value: '3.5' },
            { label: '3', value: '3' },
          ],
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
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
    },
  ],
}
