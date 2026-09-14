import type { GlobalConfig } from 'payload'

export const Banner: GlobalConfig = {
  slug: 'banner',
  label: 'Site Banner',
  admin: {
    description: 'The rounded alert under the header. Update this whenever admissions or school status changes.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show banner',
    },
    {
      name: 'tone',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info (blue / navy)', value: 'info' },
        { label: 'Closed / Alert (navy)', value: 'closed' },
        { label: 'Warning (amber)', value: 'warning' },
        { label: 'Success (green)', value: 'success' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'graduation-cap',
      options: [
        { label: 'Graduation cap', value: 'graduation-cap' },
        { label: 'Megaphone', value: 'megaphone' },
        { label: 'Calendar', value: 'calendar' },
        { label: 'Info', value: 'info' },
        { label: 'Alert', value: 'alert' },
        { label: 'Mail', value: 'mail' },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Email addresses in this text are turned into mailto links automatically.',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Optional admissions or contact email to emphasize in the banner.',
      },
    },
    {
      name: 'linkHref',
      type: 'text',
    },
    {
      name: 'linkLabel',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startsAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            width: '50%',
          },
        },
        {
          name: 'endsAt',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            width: '50%',
          },
        },
      ],
    },
  ],
}
