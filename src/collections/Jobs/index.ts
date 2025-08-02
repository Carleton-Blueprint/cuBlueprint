import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Jobs: CollectionConfig<'jobs'> = {
  slug: 'jobs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['position', 'team', 'updatedAt'],
    useAsTitle: 'position',
    group: 'Hiring',
    // components: {
    //   views: {
    //     edit: {
    //       hiring: {
    //         Component: '@/components/ApplicantAction',
    //         path: '/hiring',
    //         tab: {
    //           label: 'Hiring',
    //           href: '/hiring',
    //           order: 100,
    //         },
    //       },
    //     },
    //   },
    // },
  },
  fields: [
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: ['projects', 'teams'],
      required: false,
      hasMany: false,
      admin: {
        description: 'Select the project this job is associated with.',
      },
    },
    {
      name: 'status',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Open',
          value: 'open',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        rows: 5,
      },
    },
    {
      name: 'extendedDescription',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'applications',
      type: 'join',
      collection: 'applications',
      on: 'position',
      admin: {
        defaultColumns: ['name', 'email', 'status', 'updatedAt'],
        condition: (_, siblingData) => siblingData.status === 'open',
      },
      hasMany: true,
    },
  ],
}
