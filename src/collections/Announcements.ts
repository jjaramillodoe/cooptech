import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'active', 'startsAt'],
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
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'alert',
      options: [
        { label: 'School Alert', value: 'alert' },
        { label: 'Event', value: 'event' },
        { label: 'Calendar', value: 'calendar' },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      admin: {
        description: 'Optional link for the announcement CTA.',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'pinToBanner',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this announcement in the site-wide top banner.',
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endsAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
