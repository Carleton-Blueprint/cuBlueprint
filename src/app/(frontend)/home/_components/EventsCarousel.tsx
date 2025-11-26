'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import EventCard from './EventCard'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { Event } from '@/payload-types'

export default function EventsCarousel({ featuredEvents }: { featuredEvents: Event[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const scrollPrev = () => {
    if (api) {
      api.scrollPrev()
    }
  }
  const scrollNext = () => {
    if (api) {
      api.scrollNext()
    }
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className=" md:block w-full pb-10"
      setApi={setApi}
    >
      <CarouselContent className="md:containerLeft py-1 md:py-4 h-full w-full">
        {featuredEvents.map((event, index) => (
          <CarouselItem
            key={event.id + index}
            className=" md:basis-auto h-full min-h-[300px] min-w-[300px] md:min-w-[400px] block pl-8 md:pl-4"
          >
            <EventCard data={event} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="" />
            <CarouselNext className="hidden md:inline-flex absolute" /> */}
      <div className="absolute left-4 bottom-0 md:left-auto md:right-4 md:-bottom-2 flex w-fit items-center justify-center gap-2">
        <FaCircleChevronLeft
          className="text-blueprint hover:text-blueprint-400 transition-colors duration-300 ease-in-out size-10"
          onClick={scrollPrev}
        />
        <FaCircleChevronRight
          className="text-blueprint hover:text-blueprint-400 transition-colors duration-300 ease-in-out size-10"
          onClick={scrollNext}
        />
        <Progress value={(current / count) * 100} className="bg-white h-6 w-40" />
      </div>
    </Carousel>
  )
}
