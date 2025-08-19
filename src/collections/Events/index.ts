import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'visibility',
      type: 'checkbox',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Upcoming',
          value: 'upcoming',
        },
        {
          label: 'Past',
          value: 'past',
        },
      ],
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'extendedDescription',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
