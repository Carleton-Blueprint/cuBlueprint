import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateStudentsPage: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/students')
    revalidatePublicSite(context)
  }
  return doc
}

export const StudentsPage: GlobalConfig = {
  slug: 'studentsPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'team',
          type: 'relationship',
          relationTo: 'teams',
        },
        {
          type: 'collapsible',
          label: 'Numbers Block',
          fields: [
            {
              name: 'numbersVisibility',
              type: 'checkbox',
              label: 'Visibility',
              required: true,
            },
            {
              name: 'numbers',
              type: 'array',
              label: 'Numbers',
              required: true,
              maxRows: 4,
              minRows: 1,
              admin: {
                description: 'Add numbers to be displayed in the numbers block.',
                condition: (siblingData) => siblingData.hero.numbersVisibility,
              },
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  label: 'Value',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'teams',
      type: 'array',
      label: 'Teams',
      fields: [
        {
          name: 'team',
          type: 'relationship',
          relationTo: ['teams', 'projects'],
          required: true,
          hasMany: false,
          admin: {
            description:
              'Select the team to feature on the Students page. Only students with "Current" status will be available for selection.',
            width: '50%',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateStudentsPage],
  },
}
