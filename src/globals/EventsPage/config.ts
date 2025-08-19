import type { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
  slug: 'eventsPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'upcomingEvents',
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
          name: 'upcomingEvents',
          type: 'array',
          label: 'Upcoming Events',
          fields: [
            {
              name: 'event',
              type: 'relationship',
              relationTo: 'events',
              filterOptions: () => {
                return {
                  visibility: {
                    equals: true,
                  },
                  status: {
                    equals: 'upcoming',
                  },
                }
              },
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
            description:
              'Select up to 3 events from our database of upcoming events to show on the Upcoming Events block.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'pastEvents',
      label: 'Past Events',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'events',
          type: 'array',
          label: 'Events',
          fields: [
            {
              name: 'event',
              type: 'relationship',
              relationTo: 'events',
              filterOptions: () => {
                return {
                  visibility: {
                    equals: true,
                  },
                  status: {
                    equals: 'passed',
                  },
                }
              },
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'colSpan',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                  label: 'Width (Columns)',
                  min: 1,
                  max: 3,
                  admin: {
                    width: '130px',
                  },
                },
                {
                  name: 'rowSpan',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                  label: 'Height (Rows)',
                  min: 1,
                  max: 2,
                  admin: {
                    width: '130px',
                  },
                },
              ],
            },
          ],
          admin: {
            initCollapsed: true,
            description:
              'Select up to 15 events from our database of past events to show on the Past Events block.',
          },
        },
      ],
    },
  ],
}
