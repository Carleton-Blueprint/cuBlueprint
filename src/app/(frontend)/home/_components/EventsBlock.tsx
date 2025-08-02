import BlockContainer from '@/components/BlockContainer'
import EventCard from './EventCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import usePayload from '@/hooks/usePayload'

export const revalidate = Number(process.env.REVALIDATION_INTERVAL) || 3600

export default async function HomeEvents() {
  const { payload } = await usePayload()
  const res = await payload.find({
    collection: 'events',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 10,
    overrideAccess: false,
    pagination: false,
    sort: '-createdAt',
  })
  const resGlobal = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  })

  const title = resGlobal.newsAndEventsTitle
  const image = resGlobal.eventsBlueprinter

  if (!resGlobal.newsAndEvents) {
    console.warn('No news or events found in global settings')
    return null
  }
  const events = resGlobal.newsAndEvents.flatMap(
    ({ event }) => (typeof event.value !== 'string' ? event.value : []), // Skip if event is of type string
  )

  // const events = res.docs
  // const news: any[] = []

  return (
    <BlockContainer title={title} bg="light-blue" padding="less" image={image ? image : undefined}>
      <div className="-mx-6 flex justify-center px-4">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="px-1 py-4">
            {/* {news.map((announcement) => (
              <CarouselItem
                key={announcement.announcementPageId}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <EventCard data={announcement} />
              </CarouselItem>
            ))} */}
            {events.map((event, index) => (
              <CarouselItem key={event.id + index} className="md:basis-1/2 lg:basis-1/3">
                <EventCard data={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
      {/* <div className="flex flex-col md:flex-row pl-8 space-y-8 md:space-y-0 md:space-x-8"></div> */}
    </BlockContainer>
  )
}
