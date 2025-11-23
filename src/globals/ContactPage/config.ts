import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'socialsBlock',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: false,
        },
        {
          name: 'instagram',
          type: 'group',
          label: 'Instagram',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'Instagram URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: false,
            },
          ],
        },
        {
          name: 'linkedin',
          type: 'group',
          label: 'LinkedIn',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'LinkedIn URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: false,
            },
          ],
        },
        {
          name: 'discord',
          type: 'group',
          label: 'Discord',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'Discord URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: 'detailsBlock',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
          editor: lexicalEditor({}),
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        // Clear the cache for the contact page on update
        revalidatePath('/contact')
      },
    ],
  },
}
