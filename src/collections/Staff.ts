import type { CollectionConfig } from 'payload'

export const Staff: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'lastName',
    defaultColumns: ['lastName', 'firstName', 'role', 'category'],
    description: 'Directory names shown on the Staff page. Search on the public page filters these records.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Title or subject area, e.g. Assistant Principal or Automotive.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Administration', value: 'administration' },
        { label: 'Faculty', value: 'faculty' },
        { label: 'Guidance', value: 'guidance' },
        { label: 'Support Staff', value: 'support' },
      ],
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}
