import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Event } from '@/payload-types'

export default function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date ? event.date : '')
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <Link
      href={`/events/${event.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative mt-12 flex w-full max-w-md transform cursor-pointer flex-col overflow-hidden rounded-[30px] bg-white shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative w-full overflow-hidden md:h-64">
        <div className="max-h-full overflow-hidden">
          <Image
            src={typeof event.image === 'string' ? event.image : event.image?.url || ''}
            alt={event.title}
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4 text-center md:p-6">
        <h2 className="mb-1 text-xl font-bold md:mb-3">{event.title}</h2>
        <hr className="my-1 w-full border-t-2 border-gray-300 md:my-3" />
        <p className="text-lg font-semibold text-indigo-600 md:py-2">Location: {event.venue}</p>
        <p className="text-md italic text-gray-800 md:py-2">{formattedDate}</p>
        <p className="py-1 text-gray-700 md:py-2">{event.description}</p>
        {event.status === 'upcoming' ? (
          <span className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
            Upcoming
          </span>
        ) : (
          <span className="absolute right-4 top-4 rounded-full bg-gray-400 px-3 py-1 text-xs font-bold text-white">
            Passed
          </span>
        )}
      </div>
    </Link>
  )
}

