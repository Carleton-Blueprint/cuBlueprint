import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          admin: {
            description: 'The title of the hero section.',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
        },
        {
          type: 'collapsible',
          label: 'Call To Action Button',
          fields: [
            {
              name: 'button',
              type: 'text',
              label: 'Button',
              admin: {
                width: '100px',
              },
            },
            {
              name: 'buttonLink',
              type: 'text',
              label: 'Button Link',
              admin: {
                width: '100px',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Featured Projects Block',
      fields: [
        {
          name: 'projectsTitle',
          type: 'text',
          required: true,
          label: 'Title',
          admin: {
            description: 'Block heading.',
          },
        },
        {
          name: 'projectsBlueprinter',
          type: 'upload',
          relationTo: 'media',
          label: 'Blueprinter Image',
          admin: {
            description: 'Blueprinter character svg.',
          },
        },
        {
          name: 'featuredProjects',
          type: 'array',
          label: 'Projects',
          fields: [
            {
              name: 'project',
              type: 'relationship',
              relationTo: 'projects',
              required: true,
            },
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
            description: 'Select up to 6 featured projects to display on the projects carousel.',
            // components: {
            //   RowLabel: '@/globals/HomePage/components/RowLabel.tsx',
            // },
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'News and Events Block',
      fields: [
        {
          name: 'newsAndEventsTitle',
          type: 'text',
          required: true,
          label: 'Title',
          admin: {
            description: 'Block heading.',
          },
        },
        {
          name: 'eventsBlueprinter',
          type: 'upload',
          relationTo: 'media',
          label: 'Blueprinter Image',
          admin: {
            description: 'Blueprinter character svg.',
          },
        },
        {
          name: 'newsAndEvents',
          type: 'array',
          fields: [
            {
              name: 'event',
              type: 'relationship',
              relationTo: ['events'],
              required: true,
            },
          ],
          maxRows: 6,
          admin: {
            description: 'Select up to 10 events or announcements to feature on the carousel.',
          },
        },
      ],
    },
  ],
}
