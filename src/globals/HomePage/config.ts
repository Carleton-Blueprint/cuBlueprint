import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'heroBlock',
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
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Hero Image',
          admin: {
            description: 'Image to display in the hero section.',
          },
        },
        {
          type: 'collapsible',
          label: 'Call To Action Button',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'Button Text',
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
      type: 'group',
      label: 'About Us Block',
      name: 'aboutUsBlock',
      fields: [
        {
          name: 'visibility',
          type: 'checkbox',
          label: 'Show About Us Block',
          required: true,
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the about us block.',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            description: 'Block heading.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
          admin: {
            description: 'Text for the about us block.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            description: 'Image for the about us block.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Text',
          admin: {
            description: 'Text for a link at the bottom of the block.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
          admin: {
            description: 'URL for the link at the bottom of the block.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
        {
          name: 'roundedCorners',
          type: 'select',
          label: 'Rounded Corners',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'All',
              value: 'all',
            },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Select the corners to round for the block.',
            condition: (siblingData) => siblingData.aboutUsBlock.visibility,
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Featured Projects Block',
      name: 'projectsBlock',
      fields: [
        {
          name: 'visibility',
          type: 'checkbox',
          label: 'Show Featured Projects Block',
          required: true,
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the featured projects block.',
          },
        },
        {
          name: 'projectsTitle',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            description: 'Block heading.',
            condition: (siblingData) => siblingData.projectsBlock.visibility,
          },
        },
        {
          name: 'projectsBlueprinter',
          type: 'upload',
          relationTo: 'media',
          label: 'Blueprinter Image',
          admin: {
            description: 'Blueprinter character svg.',
            condition: (siblingData) => siblingData.projectsBlock.visibility,
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
          required: true,
          admin: {
            initCollapsed: true,
            description: 'Select up to 6 featured projects to display on the projects carousel.',
            condition: (siblingData) => siblingData.projectsBlock.visibility,
            // components: {
            //   RowLabel: '@/globals/HomePage/components/RowLabel.tsx',
            // },
          },
        },
        {
          name: 'roundedCorners',
          type: 'select',
          label: 'Rounded Corners',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'All',
              value: 'all',
            },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Select the corners to round for the block.',
            condition: (siblingData) => siblingData.projectsBlock.visibility,
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'eventsBlock',
      label: 'News and Events Block',
      fields: [
        {
          name: 'visibility',
          type: 'checkbox',
          label: 'Show News and Events Block',
          required: true,
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the news and events block.',
          },
        },
        {
          name: 'newsAndEventsTitle',
          type: 'text',
          required: true,
          label: 'Title',
          admin: {
            description: 'Block heading.',
            condition: (siblingData) => siblingData.eventsBlock.visibility,
          },
        },
        {
          name: 'eventsBlueprinter',
          type: 'upload',
          relationTo: 'media',
          label: 'Blueprinter Image',
          admin: {
            description: 'Blueprinter character svg.',
            condition: (siblingData) => siblingData.eventsBlock.visibility,
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
          required: true,
          admin: {
            description: 'Select up to 10 events or announcements to feature on the carousel.',
            condition: (siblingData) => siblingData.eventsBlock.visibility,
          },
        },
        {
          name: 'roundedCorners',
          type: 'select',
          label: 'Rounded Corners',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'All',
              value: 'all',
            },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Select the corners to round for the block.',
            condition: (siblingData) => siblingData.eventsBlock.visibility,
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Sponsors Block',
      name: 'sponsorsBlock',
      fields: [
        {
          name: 'visibility',
          type: 'checkbox',
          label: 'Show Sponsors Block',
          required: true,
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the sponsors block.',
          },
        },
        {
          name: 'blueprinter',
          type: 'upload',
          relationTo: 'media',
          label: 'Blueprinter Image',
          admin: {
            description: 'Blueprinter character svg.',
            condition: (siblingData) => siblingData.sponsorsBlock.visibility,
          },
        },
        {
          name: 'sponsorsTitle',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            description: 'Block heading.',
            condition: (siblingData) => siblingData.sponsorsBlock.visibility,
          },
        },
        {
          name: 'sponsors',
          type: 'array',
          label: 'Sponsors',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Name',
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Description',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                description: 'Blueprint image to place next to the value card.',
              },
            },
          ],
          maxRows: 6,
          required: true,
          admin: {
            initCollapsed: true,
            description: 'Add up to 6 sponsors to display in the sponsors block.',
            condition: (siblingData) => siblingData.sponsorsBlock.visibility,
          },
        },
        {
          name: 'roundedCorners',
          type: 'select',
          label: 'Rounded Corners',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'All',
              value: 'all',
            },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Select the corners to round for the block.',
            condition: (siblingData) => siblingData.sponsorsBlock.visibility,
          },
        },
      ],
    },
    {
      type: 'group',
      label: 'Our Values Block',
      name: 'ourValuesBlock',
      fields: [
        {
          name: 'visibility',
          type: 'checkbox',
          label: 'Show Our Values Block',
          required: true,
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide the our values block.',
          },
        },
        {
          name: 'valuesTitle',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            description: 'Block heading.',
            condition: (siblingData) => siblingData.ourValuesBlock.visibility,
          },
        },
        {
          name: 'values',
          type: 'array',
          label: 'Values',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Value',
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Description',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              admin: {
                description: 'Blueprint image to place next to the value card.',
              },
            },
            {
              name: 'flip',
              type: 'checkbox',
              label: 'Flip Card',
              required: true,
              admin: {
                description: 'Check to flip the card layout.',
              },
            },
          ],
          maxRows: 6,
          required: true,
          admin: {
            initCollapsed: true,
            description: 'Add up to 6 values to display in the our values block.',
            condition: (siblingData) => siblingData.ourValuesBlock.visibility,
          },
        },
        {
          name: 'roundedCorners',
          type: 'select',
          label: 'Rounded Corners',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'All',
              value: 'all',
            },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Select the corners to round for the block.',
            condition: (siblingData) => siblingData.ourValuesBlock.visibility,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        // Clear the cache for the contact page on update
        revalidatePath('/')
        revalidatePath('/home')
      },
    ],
  },
}
