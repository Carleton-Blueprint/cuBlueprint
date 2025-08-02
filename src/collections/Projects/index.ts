import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['companyName', 'slug', 'updatedAt'],
    useAsTitle: 'companyName',
    group: 'Content',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Not started',
          value: 'not-started',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
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
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'team',
      type: 'join',
      collection: 'students',
      on: 'team',
      hasMany: true,
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
