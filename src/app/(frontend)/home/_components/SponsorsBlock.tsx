import BlockContainer from '@/components/BlockContainer'
import SponsorCard from './SponsorCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/payload-types'

type SponsorsBlockProps = {
  visibility: boolean
  title: string | null | undefined
  data:
    | {
        name: string
        description: string
        image?: (string | null) | Media
        id?: string | null
      }[]
    | null
    | undefined
  roundedCorners?: 'none' | 'top' | 'bottom' | 'all' | null
  image?: (string | null) | Media
}

export default function SponsorsBlock({
  visibility,
  title,
  data,
  image,
  roundedCorners,
}: SponsorsBlockProps) {
  if (!visibility || !title || !data || data.length === 0) {
    return null
  }
  const sponsors = data

  return (
    <BlockContainer
      title={title}
      padding="less"
      inner
      image={typeof image === 'string' ? image : image?.url || ''}
      margin="bottom"
      roundedCorners={
        roundedCorners === 'all'
          ? true
          : roundedCorners === 'none' || !roundedCorners
            ? false
            : roundedCorners
      }
    >
      <div className="hidden flex-col space-y-10 md:flex">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
      <div className="block md:hidden">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="max-w-xs"
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem key={sponsor.name} className="py-2">
                <SponsorCard sponsor={sponsor} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex w-full justify-end">
        {/* <LinkButton href="/contact" newTab={true} variant="filled">
          Become a Sponsor!
        </LinkButton> */}
      </div>
    </BlockContainer>
  )
}
