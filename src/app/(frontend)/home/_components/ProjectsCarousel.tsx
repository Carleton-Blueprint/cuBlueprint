'use client'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProjectCard from './ProjectCard'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

import { ChevronLeftCircle, ChevronRightCircle, ChevronRightCircleIcon } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { Project } from '@/payload-types'

export default function ProjectsCarousel({ featuredProjects }: { featuredProjects: Project[] }) {
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
  })
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className=" md:block w-full "
      setApi={setApi}
    >
      <CarouselContent className="md:containerLeft py-4 h-full w-full">
        {featuredProjects.map((project, index) => (
          <CarouselItem
            key={project.id + index}
            className=" md:basis-auto h-full min-h-[358px] min-w-[358px] block pl-0 md:pl-4"
          >
            <ProjectCard data={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="" />
            <CarouselNext className="hidden md:inline-flex absolute" /> */}
      <div className="absolute left-4 bottom-0 md:left-auto md:right-4 md:-bottom-10 flex w-fit items-center justify-center gap-2">
        <FaCircleChevronLeft
          className="text-blueprint hover:text-blueprint-400 transition-colors duration-300 ease-in-out size-10"
          onClick={scrollPrev}
        />
        <FaCircleChevronRight
          className="text-blueprint hover:text-blueprint-400 transition-colors duration-300 ease-in-out size-10"
          onClick={scrollNext}
        />
        <Progress value={(current / count) * 100} className=" h-6 w-40" />
      </div>
    </Carousel>
  )
}
