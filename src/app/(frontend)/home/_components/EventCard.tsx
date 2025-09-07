import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Event } from '@/payload-types'

export default function EventCard({ data }: { data: Event }) {
  const title = data.title
  const path = '/events/' + data.slug
  // if ('venue' in data) {
  // }
  // else {
  //   title = data.title
  //   path = '/news/' + data.slug
  // }

  return (
    <div className="group">
      <Link href={path} className="relative">
        <Card className="border-none relative h-[18rem] min-w-fit overflow-hidden rounded-[50px] shadow-[0px_4px_4px_0_rgba(0,0,0,0.3)] md:h-[36rem]">
          <Image
            src={typeof data.image === 'string' ? data.image : data.image?.url || '/default.png'}
            alt={'image for ' + title}
            width={688}
            height={600}
            className="absolute h-full w-full object-cover"
          />
          <CardContent className="absolute h-full w-full rounded-[50px] bg-gradient-to-t from-blueprint/70 from-25% to-blueprint/15 to-65%">
            <span className="group:transition absolute bottom-0 left-0 translate-y-14 px-6 pb-8 text-white duration-300 ease-in-out group-hover:translate-y-0">
              <h2 className="text-3xl font-semibold">{title}</h2>
              <p className="group:transition line-clamp-1 h-12 opacity-0 duration-300 ease-in-out group-hover:opacity-100">
                {data.description}
              </p>
            </span>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
