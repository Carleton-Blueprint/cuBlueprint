import type { GlobalConfig } from 'payload'

export const StudentsPage: GlobalConfig = {
  slug: 'studentsPage',
  access: {
    read: () => true,
  },
  fields: [
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
}
