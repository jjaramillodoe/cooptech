import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Automotive Services', value: 'automotive' },
        { label: 'Construction and Building Skills', value: 'construction' },
        { label: 'Culinary Arts', value: 'culinary' },
        { label: 'Electrical', value: 'electrical' },
        { label: 'Health Services', value: 'health' },
        { label: 'Information Technology', value: 'it' },
        { label: 'Unisex Styling', value: 'styling' },
        { label: 'Work-Based Learning', value: 'wbl' },
        { label: 'Occupational Safety and Health Administration (OSHA)', value: 'osha' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description: 'Optional paragraph shown above the photo carousel (used by Automotive and Electrical).',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'e.g. 2-year sequence, 1 semester',
      },
    },
    {
      name: 'schedule',
      type: 'text',
      admin: {
        description: 'e.g. Morning 8:30–11:00 or Afternoon 12:20–2:50',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fallbackImage',
      type: 'text',
      admin: {
        description: 'Remote image URL used when no CMS media is uploaded.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      labels: {
        singular: 'Gallery image',
        plural: 'Gallery images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'fallbackImage',
          type: 'text',
          admin: {
            description: 'Remote image URL used when no CMS media is uploaded.',
          },
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'courses',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Leave blank for programs that only have a description (Work-Based Learning, OSHA).',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'campuses',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
