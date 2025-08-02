import type { GlobalConfig } from 'payload'

export const ProjectsPage: GlobalConfig = {
  slug: 'projectsPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'currentProjects',
      type: 'array',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          filterOptions: () => {
            return {
              status: {
                in: ['in-progress', 'not-started'],
              },
            }
          },
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        description:
          'Select up from our database of projects to show on the Current Projects block.',
      },
    },
    {
      name: 'pastProjects',
      type: 'array',
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          filterOptions: () => {
            return {
              status: {
                equals: 'completed',
              },
            }
          },
          required: true,
        },
      ],
      admin: {
        description:
          'Select up from our database of projects to show on the Current Projects block.',
      },
    },
  ],
}
