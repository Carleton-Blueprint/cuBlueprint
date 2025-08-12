import EventCard from './_components/EventCard'
import BlockContainer from '@/components/BlockContainer'
import usePayload from '@/hooks/usePayload'

export default async function EventsPage() {
  const { payload } = await usePayload()
  const resGlobal = await payload.findGlobal({
    slug: 'eventsPage',
  })
  const events =
    resGlobal.events?.flatMap((event) => {
      return typeof event.event !== 'string' ? event.event : []
    }) || []
  return (
    <>
      <div className="overflow-hidden space-y-6 md:min-h-[calc(100vh-80px)] bg-blueprint">
        <div className="flex justify-center bg-blueprint">
          <BlockContainer
            title={resGlobal.title}
            image={resGlobal.image || undefined}
            margin
            roundedCorners
            inner
            centered
            bg="light-blue"
            gap="less"
          >
            <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-16 lg:grid-cols-3 lg:px-12">
              {events.map((event, index) => (
                <EventCard key={event.id + index} event={event} />
              ))}
            </div>
          </BlockContainer>
        </div>
        <div className="flex justify-center">
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
        </div>
      </div>
    </>
  )
}

