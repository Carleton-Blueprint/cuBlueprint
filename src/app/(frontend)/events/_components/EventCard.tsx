import Link from 'next/link'
import React from 'react'
import { Event } from '@/payload-types'
import { FaLocationDot } from 'react-icons/fa6'
import { BsCalendar2DateFill } from 'react-icons/bs'

export default function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date ? event.date : '')
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return (
    <Link
      href={`/events/${event.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-12 flex w-full max-w-md text-blueprint-50 cursor-pointer flex-col overflow-hidden rounded-t rounded-b-2xl p-4 pb-12 border-t-blueprint active:ring-4 hover:ring-4 ring-blueprint border-t-8 bg-[#041122] transition-all duration-300"
    >
      <h2 className="mb-1 line-clamp-2 h-20 flex items-end text-3xl font-bold md:mb-3 text-blueprint">
        {event.title}
      </h2>
      <div className="flex text-lg flex-col">
        <div className="flex items-center space-x-2">
          <FaLocationDot className="text-blueprint text-2xl row-start-1" />
          <span className="text-2xl font-bold truncate row-start-1">{event.venue.label}</span>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <BsCalendar2DateFill className="text-blueprint text-2xl row-start-1" />
          <p className="flex flex-col">
            <span className="text-sm h-3">{formattedTime}</span>
            <span className="text-md text-blueprint-50 row-start-1">{formattedDate}</span>
          </p>
        </div>
        <p className="mt-4 text-sm text-blueprint-50 row-start-1">{event.description}</p>
      </div>
      <span className="md:translate-y-100 ring-4 ring-blueprint md:hover:bg-blueprint-600 active:bg-blueprint-700 transition-all duration-300 md:group-hover:translate-y-0 absolute bottom-0 right-0 p-2 text-xs font-bold text-blueprint-50 bg-blueprint rounded-tl-2xl">
        Read more
      </span>
    </Link>
  )
}
