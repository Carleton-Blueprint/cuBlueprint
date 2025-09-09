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
    defaultColumns: ['image', 'name', 'email', 'updatedAt'],
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
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      displayPreview: true,
      admin: {
        components: {
          Cell: '@/collections/Students/components/Cell',
        },
      },
    },
    {
      name: 'teamHistory',
      type: 'ui',

      admin: {
        components: {
          Field: '@/collections/Students/components/TeamHistory',
        },
      },
    },
  ],
}
