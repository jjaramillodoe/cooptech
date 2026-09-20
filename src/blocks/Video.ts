import type { Block } from 'payload'

export const Video: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'YouTube watch, share, or embed URL',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
