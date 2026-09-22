import type { GlobalConfig } from 'payload'

const windowFields = [
  {
    name: 'opensAt',
    type: 'date' as const,
    label: 'Opens',
    admin: {
      date: { pickerAppearance: 'dayAndTime' as const },
      description: 'The Apply button turns on at this date and time.',
    },
  },
  {
    name: 'closesAt',
    type: 'date' as const,
    label: 'Closes',
    admin: {
      date: { pickerAppearance: 'dayAndTime' as const },
      description: 'The button turns gray again after this date. Leave empty to keep it on.',
    },
  },
]

export const Admissions: GlobalConfig = {
  slug: 'admissions',
  label: 'Admissions portal',
  admin: {
    description:
      'Coop Tech opens applications twice a year. The Apply and Open application portal buttons stay gray until the current date is inside one of the two windows below. When a window is open, that link opens in a new tab.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'portalUrl',
      type: 'text',
      label: 'Application portal URL',
      required: true,
      defaultValue: 'https://d79cooptech.powerappsportals.com/',
    },
    {
      name: 'windowOne',
      type: 'group',
      label: 'First application window',
      fields: windowFields,
    },
    {
      name: 'windowTwo',
      type: 'group',
      label: 'Second application window',
      fields: windowFields,
    },
  ],
}
