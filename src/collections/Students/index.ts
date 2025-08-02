import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Students: CollectionConfig<'students'> = {
  slug: 'students',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'updatedAt'],
    useAsTitle: 'name',
    group: 'People',
  },
  fields: [
    {
      name: 'visibility',
      type: 'checkbox',
    },
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
      name: 'status',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Current',
          value: 'current',
        },
        {
          label: 'Past',
          value: 'past',
        },
      ],
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
      type: 'relationship',
      relationTo: ['projects', 'teams'],
      hasMany: true,
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'history',
      type: 'array',
      label: 'Team History',
      admin: {
        description: 'Past teams and positions held by the student.',
      },
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'team',
          type: 'relationship',
          relationTo: ['projects', 'teams'],
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'startYear',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMM YYYY',
            },
          },
        },
        {
          name: 'endYear',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMM YYYY',
            },
          },
        },
      ],
    },
  ],
}
