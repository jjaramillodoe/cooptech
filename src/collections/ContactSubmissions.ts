import type { CollectionConfig } from 'payload'

import {
  admissionsInbox,
  inquiryCampuses,
  inquiryPrograms,
  inquiryRoles,
  inquirySubject,
  inquiryTypes,
  preferredContacts,
} from '../data/contact-form'

const options = (values: readonly string[]) => values.map((value) => ({ label: value, value }))

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'inquiryType', 'program', 'emailsSent', 'createdAt'],
    description:
      'Messages from the public contact form. Power Automate can read new records from the REST API and send the confirmation and admissions emails.',
  },
  labels: {
    singular: 'Contact submission',
    plural: 'Contact submissions',
  },
  defaultSort: '-createdAt',
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data) {
          data.subject = inquirySubject(String(data.inquiryType || ''), String(data.name || ''))
          data.staffEmail = admissionsInbox
          data.emailsSent = false
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: options(inquiryRoles),
    },
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      options: options(inquiryTypes),
    },
    {
      name: 'preferredContact',
      type: 'select',
      options: options(preferredContacts),
      defaultValue: 'Email',
    },
    {
      name: 'studentName',
      type: 'text',
      admin: {
        description: 'Student the inquiry is about, when a parent or counselor is writing.',
      },
    },
    {
      name: 'homeSchool',
      type: 'text',
    },
    {
      name: 'program',
      type: 'select',
      options: options(inquiryPrograms),
    },
    {
      name: 'campus',
      type: 'select',
      options: options(inquiryCampuses),
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Email subject for both Power Automate messages.',
        position: 'sidebar',
      },
    },
    {
      name: 'staffEmail',
      type: 'email',
      defaultValue: admissionsInbox,
      admin: {
        readOnly: true,
        description: 'Inbox that should receive the inquiry.',
        position: 'sidebar',
      },
    },
    {
      name: 'emailsSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Power Automate should set this after both emails are sent.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
