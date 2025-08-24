import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Teams: CollectionConfig<'teams'> = {
  slug: 'teams',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    useAsTitle: 'name',
    group: 'People',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'student',
          type: 'relationship',
          relationTo: 'students',
          filterOptions: {
            status: {
              equals: 'current',
            },
          },
          required: true,
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
        },
      ],
      labels: {
        singular: 'Team member',
        plural: 'Team members',
      },
    },
  ],
}
