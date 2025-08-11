import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import {
  BlocksFeature,
  lexicalEditor,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { Banner } from '@/blocks/Banner/config'
import { CallToAction } from '@/blocks/CallToAction/config'

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
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        description: 'Status is auto-generated based on the event date.',
      },
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          timeIntervals: 15,
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'extendedDescription',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          LinkFeature({
            // Example showing how to customize the built-in fields
            // of the Link feature
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                admin: {
                  description:
                    'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                },
              },
            ],
          }),
          UploadFeature({
            collections: {
              uploads: {
                // Example showing how to customize the built-in fields
                // of the Upload feature
                fields: [
                  {
                    name: 'caption',
                    type: 'richText',
                    editor: lexicalEditor(),
                  },
                ],
              },
            },
          }),
          // This is incredibly powerful. You can re-use your Payload blocks
          // directly in the Lexical editor as follows:
          BlocksFeature({
            blocks: [Banner, CallToAction],
          }),
        ],
      }),
      admin: {
        description:
          'This will appear on the full event page. Do not include event details that have already been added in other fields as those will be displayed separately.',
      },
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.date) {
          const eventDate = new Date(data.date)
          const today = new Date()

          // Strip time for comparison
          eventDate.setHours(0, 0, 0, 0)
          today.setHours(0, 0, 0, 0)

          if (eventDate < today) {
            data.status = 'passed'
          } else if (eventDate.getTime() === today.getTime()) {
            data.status = 'today'
          } else {
            data.status = 'upcoming'
          }
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc.date) {
          const eventDate = new Date(doc.date)
          const today = new Date()

          // Strip time for comparison
          eventDate.setHours(0, 0, 0, 0)
          today.setHours(0, 0, 0, 0)

          if (eventDate < today) {
            doc.status = 'passed'
          } else if (eventDate.getTime() === today.getTime()) {
            doc.status = 'today'
          } else {
            doc.status = 'upcoming'
          }
        }
        return doc
      },
    ],
  },

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
