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
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
