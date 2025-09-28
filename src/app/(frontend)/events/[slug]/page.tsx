import accessPayload from '@/hooks/usePayload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { FaLocationDot } from 'react-icons/fa6'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import BlockContainer from '@/components/BlockContainer'

export default async function FullEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { payload } = await accessPayload()
  const { slug } = await params
  const res = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  const event = res.docs[0]
  if (!event) {
    return notFound()
  }
  const eventDate = new Date(event.date ? event.date : '')

  return (
    <>
      <div className="bg-blueprint-dark overflow-hidden space-y-6">
        <div className="w-full container md:pb-6 pt-6">
          <Link
            href="/events"
            className="w-fit text-xl flex items-center font-semibold text-blueprint-50 "
          >
            <ChevronLeft className="inline mr-2" />
            Back to Events
          </Link>
        </div>
        <div className="lg:h-[700px] flex pb-10 flex-col items-center lg:flex-row container text-blueprint-50 lg:space-x-6">
          <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start">
            <h1 className="text-5xl md:text-6xl text-center lg:text-left font-bold text-blueprint">
              {event.title}
            </h1>
            <div className="flex items-center space-x-4 mt-8">
              <DateBlock date={eventDate} status={event.status} venue={event.venue} />
            </div>
            <div className="my-6 text-2xl text-center lg:text-left">{event.description}</div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col items-center mb-6 lg:mb-0">
            <Image
              src={typeof event.image === 'string' ? event.image : event.image?.url || ''}
              alt={event.title}
              height={400}
              width={450}
              className="object-cover rounded-4xl "
            />
            <div className="mt-6 w-full max-w-md">
              <h2 className="text-center text-2xl font-bold text-blueprint-50">
                Get notified of updates
              </h2>
              <div className="flex gap-2">
                <Input
                  className="rounded-full pl-4 bg-blueprint-800 border-blueprint-600 text-blueprint-50 placeholder:text-blueprint-400 transition-all duration-200 focus-visible:ring-blueprint focus-visible:ring-offset-2 ring-offset-blueprint-700 mt-4"
                  placeholder="Enter your email..."
                />
                <Button className="mt-4 bg-blueprint border-blueprint border-2 active:ring-1 ring-blueprint active:bg-blueprint-700 text-blueprint-50 px-6 py-2 rounded-full hover:bg-blueprint-600 transition-all duration-200 select-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlockContainer title="Read more" bg="darker-blue">
        <div className="md:overflow-scroll my-6">
          <RichText
            data={event.extendedDescription}
            enableGutter={false}
            className=" mt-4  prose-headings:mt-2 prose-headings:mb-2 prose-h1:text-blueprint prose-headings:text-blueprint-50 prose-p:text-blueprint-50 prose-strong:text-blueprint-50 prose-ul:text-blueprint-50 prose-ol:text-blueprint-50 prose-li:text-blueprint-50"
          />
        </div>
      </BlockContainer>
    </>
  )
}

function DateBlock({
  date,
  status,
  venue,
}: {
  date: Date
  status?: string
  venue?: { label: string; address?: string | null }
}) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const eventDay = daysOfWeek[date.getDay()]
  const eventMonth = months[date.getMonth()]
  const eventDateNum = date.getDate()
  const eventTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  const eventYear = date.getFullYear()
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
      <div className="flex font-bold border-blueprint border-4 space-x-3 px-4 py-2 w-max rounded-xl items-center">
        <div className="text-3xl font-bold min-w-fit">
          {status === 'upcoming' ? eventTime : eventYear}
        </div>
        <div className="flex items-center justify-center space-x-2 min-w-fit">
          <div className="flex flex-col justify-center items-center leading-none -space-y-1 ">
            <div className="text-md font-semibold">{eventDay}</div>
            <div className="text-4xl">{eventMonth}</div>
          </div>
          <div>
            <div className="text-6xl text-blueprint">{eventDateNum}</div>
          </div>
        </div>
      </div>
      <div className="md:max-w-1/2 pt-2 md:pt-0 grid grid-cols-[auto,1fr] gap-x-2 gap-y-1 items-center">
        {venue && (
          <>
            <FaLocationDot className="text-blueprint text-3xl row-start-1" />
            <AnimatedTooltip text={venue.address || ''}>
              <span className="text-3xl font-bold truncate row-start-1">{venue.label}</span>
            </AnimatedTooltip>
          </>
        )}
        {status && (
          <>
            {status === 'passed' ? (
              <>
                <span className="bg-gray-600 size-3 rounded-full row-start-2 justify-self-center" />
                <span className="text-2xl font-semibold row-start-2">Passed</span>
              </>
            ) : (
              <>
                <span className="bg-green-500 size-3 rounded-full shadow-[0_0_5px_#00C950,0_0_15px_#00C950,0_0_30px_#00C950] row-start-2 justify-self-center" />
                <span className="text-2xl font-semibold text-blueprint-50 row-start-2 self-center">
                  {status === 'upcoming' ? 'Upcoming' : 'Today'}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
