import EventCard from './_components/EventCard'
import BlockContainer from '@/components/BlockContainer'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 3600

const EventsPage: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'events',
    overrideAccess: false,
    pagination: false,
  })
  const events = res.docs
  return (
    <div className="flex justify-center bg-blueprint-50">
      <BlockContainer title="Blueprint Events" roundedCorners inner centered margin>
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-16 lg:grid-cols-3 lg:px-12">
          {events.map((event) => (
            <EventCard
              slug={event.slug}
              key={event.id}
              title={event.title}
              venue={event.venue || ''}
              time={event.date || ''}
              description={event.description}
              isUpcoming={event.status === 'upcoming'}
              imageURL={typeof event.image === 'string' ? event.image : event.image?.url || ''}
            />
          ))}
        </div>
      </BlockContainer>
    </div>
  )
}

export default EventsPage
