import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

export const ProjectsPage: GlobalConfig = {
  slug: 'projectsPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'currentProjectsBlock',
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
                  visibility: {
                    equals: true,
                  },
                }
              },
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                description: 'Optional decorative image for the project card.',
              },
              required: false,
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                {
                  label: 'Top',
                  value: 'top',
                },
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
                {
                  label: 'Bottom',
                  value: 'bottom',
                },
                {
                  label: 'Top Left',
                  value: 'top-left',
                },
                {
                  label: 'Top Right',
                  value: 'top-right',
                },
                {
                  label: 'Bottom Left',
                  value: 'bottom-left',
                },
                {
                  label: 'Bottom Right',
                  value: 'bottom-right',
                },
              ],
              defaultValue: 'left',
              admin: {
                condition: (_, index) =>
                  Object.hasOwn(index, 'image') && index.image ? true : false,
                description: 'Position of the image in the project card.',
              },
            },
          ],
          admin: {
            initCollapsed: true,
            description:
              'Select up from our database of projects to show on the Current Projects block.',
          },
        },
      ],
    },
    {
      name: 'pastProjectsBlock',
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
                  visibility: {
                    equals: true,
                  },
                }
              },
              required: true,
            },
          ],
          admin: {
            description:
              'Select up from our database of projects to show on the Past Projects block.',
          },
        },
      ],
      admin: {
        description: 'This block is used to display past projects.',
      },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        // Clear the cache for the contact page on update
        revalidatePath('/projects')
      },
    ],
  },
}
