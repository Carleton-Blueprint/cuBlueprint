import type { GlobalConfig } from 'payload'

export const EventsPage: GlobalConfig = {
  slug: 'eventsPage',
  access: {
    read: () => true,
  },
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
      name: 'events',
      type: 'array',
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
            }
          },
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        description:
          'Select from our database of events to show on the Current Events block.',
      },
    },
  ],
}
