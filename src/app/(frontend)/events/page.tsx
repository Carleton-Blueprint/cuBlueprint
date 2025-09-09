import EventCard from './_components/EventCard'
import BlockContainer from '@/components/BlockContainer'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import usePayload from '@/hooks/usePayload'
import Image from 'next/image'

export default async function EventsPage() {
  const { payload } = await usePayload()
  const resGlobal = await payload.findGlobal({
    slug: 'eventsPage',
  })
  const upcomingEvents =
    resGlobal.upcomingEvents?.upcomingEvents?.flatMap((event) => {
      return typeof event.event !== 'string' ? event.event : []
    }) || []
  const pastEvents =
    resGlobal.pastEvents?.events?.flatMap((event) => {
      return typeof event.event !== 'string'
        ? { event: event.event, colSpan: event.colSpan, rowSpan: event.rowSpan }
        : []
    }) || []
  const pastEventsTitle = resGlobal.pastEvents.title
  const pastEventsImage = resGlobal.pastEvents.image
  const upcomingEventsTitle = resGlobal.upcomingEvents.title
  const upcomingEventsImage = resGlobal.upcomingEvents.image

  // colRowSpan 2D array is used to define tailwind css styling for BentoGridItems
  // desired width and height can be passed in (subtract 1 to avoid index out of bounds error)
  // example: <BentoGridItem ... className={colRowSpans[desiredWidth - 1][desiredHeight - 1]}>...</BentoGridItem>
  // special styling can be applied to adjust elements within the BentoGridItem component to
  // align with their width and height
  const colRowSpans = [
    ['md:col-span-1 md:row-span-1 [&_h2]:text-2xl', 'md:col-span-1 md:row-span-2 [&_h2]:text-2xl'],
    [
      'md:col-span-2 md:row-span-1',
      'md:col-span-2 md:row-span-2 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_p]:text-lg [&_p]:h-20',
    ],
    [
      'md:col-span-3 md:row-span-1',
      'md:col-span-3 md:row-span-2 [&_h2]:md:h-12 [&_h2]:text-2xl [&_h2]:md:text-4xl [&_p]:md:text-xl [&_p]:md:h-24',
    ],
  ]
  return (
    <div className="overflow-hidden w-full flex flex-col justify-center">
      {upcomingEvents.length > 0 && (
        <BlockContainer
          title={upcomingEventsTitle}
          image={upcomingEventsImage || undefined}
          centered
          roundedCorners="bottom"
          bg="dark-blue"
          gap={false}
        >
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id + index} event={event} />
            ))}
          </div>
        </BlockContainer>
      )}
      {pastEvents.length > 0 && (
        <BlockContainer
          title={pastEventsTitle}
          roundedCorners
          margin
          bg="light-blue"
          inner
          image={pastEventsImage || undefined}
        >
          <BentoGrid className="max-w-full md:w-screen mx-auto pt-6">
            {pastEvents.map(({ event, colSpan, rowSpan }, i) => (
              <BentoGridItem
                key={i}
                title={event.title}
                description={event.description}
                header={
                  <Image
                    src={typeof event.image === 'string' ? event.image : event.image?.url || ''}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                }
                href={'/events/' + event.slug}
                className={colRowSpans[colSpan - 1][rowSpan - 1]}
              />
            ))}
          </BentoGrid>
        </BlockContainer>
      )}

      {/* <div className="flex justify-center">
          <BlockContainer roundedCorners inner bg="light-blue">
            <div className="flex space-y-6">
              <div className="w-1/2">
                <h2 className="text-3xl font-bold text-blueprint">
                  Keep up to date with our calendar!
                </h2>
              </div>

              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&title=cuBlueprint%20Public%20Calendar&showPrint=0&showCalendars=0&src=Y2FybGV0b25ibHVlcHJpbnRAZ21haWwuY29t&color=%23d50000"
                width="800"
                height="600"
                className="rounded-2xl text-blueprint w-1/2"
              />
            </div>
          </BlockContainer>
        </div> */}
    </div>
  )
}
