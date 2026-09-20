import type { CollectionConfig } from 'payload'

import { Accordion } from '../blocks/Accordion'
import { Article } from '../blocks/Article'
import { CTABanner } from '../blocks/CTABanner'
import { Hero } from '../blocks/Hero'
import { ImageTextGrid } from '../blocks/ImageTextGrid'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'comingSoon', 'updatedAt'],
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
      name: 'comingSoon',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Coming Soon page',
      admin: {
        position: 'sidebar',
        description: 'Replace this page on the public site with a Coming Soon message.',
      },
    },
    {
      name: 'comingSoonMessage',
      type: 'textarea',
      label: 'Coming Soon message',
      admin: {
        position: 'sidebar',
        description: 'Optional. Leave blank to use the default message.',
        condition: (_, siblingData) => Boolean(siblingData?.comingSoon),
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, Article, ImageTextGrid, Accordion, CTABanner],
    },
  ],
}
