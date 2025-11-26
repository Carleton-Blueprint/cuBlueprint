import BlockContainer from '@/components/BlockContainer'
import EventCard from './EventCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Event, Media } from '@/payload-types'
import EventsCarousel from './EventsCarousel'

type HomeEventsProps = {
  visibility?: boolean
  title?: string | null
  image?: string | Media | null
  data?:
    | {
        event: { relationTo: string; value: string | Event } // Adjust type as needed
        id?: string | null
      }[]
    | null
}

export default function HomeEvents({ visibility, title, image, data }: HomeEventsProps) {
  if (!visibility || !data || data.length === 0 || !title) {
    return null
  }
  const events = data.flatMap(
    ({ event }) => (typeof event.value === 'string' ? [] : event.value), // Skip if event is of type string
  )

  return (
    <BlockContainer
      title={title}
      bg="light-blue"
      padding="less"
      image={image ? image : undefined}
      containChildren={false}
    >
      {/* <div className="-mx-6 flex justify-center px-4">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="px-1 py-4">
            
            {events.map((event, index) => (
              <CarouselItem key={event.id + index} className="md:basis-1/2 lg:basis-1/3">
                <EventCard data={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div> */}
      <div className=" flex w-[calc(100%+2rem)] containerWidth justify-center flex-col md:flex-row">
        <EventsCarousel featuredEvents={events} />
      </div>
      {/* <div className="flex flex-col md:flex-row pl-8 space-y-8 md:space-y-0 md:space-x-8"></div> */}
    </BlockContainer>
  )
}
