import LinkButton from '@/components/LinkButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Media, Project } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FaArrowCircleRight } from 'react-icons/fa'

export default function ProjectCard({
  data,
  image,
  imagePosition,
}: {
  data: Project
  image?: string | Media | null
  imagePosition?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | null
}) {
  const imagePositionClasses = {
    left: '-left-12',
    right: '-right-20',
    top: '-top-12',
    bottom: '-bottom-12',
    'top-left': '-top-12 -left-12',
    'top-right': '-top-12 -right-12',
    'bottom-left': '-bottom-12 -left-12',
    'bottom-right': '-bottom-12 -right-12',
  }
  return (
    <Card
      className={`border-none relative bg-white flex w-full items-center justify-center rounded-[40px] shadow-[2px_6px_4px_0px_rgba(0,0,0,0.25)] md:h-auto`}
    >
      {image && (
        <Image
          src={typeof image === 'string' ? image : image?.url || ''}
          alt={data.companyName}
          width={125}
          height={125}
          className={cn('hidden md:block absolute', imagePositionClasses[imagePosition || 'left'])}
        />
      )}
      <Image
        src={typeof data.image === 'string' ? data.image : data.image?.url || ''}
        alt={data.companyName}
        width={250}
        height={250}
        className={'ml-8 hidden h-[200px] w-auto md:block'}
      />

      <div className="flex w-full flex-col justify-end md:min-h-full md:justify-between">
        <CardHeader className="flex flex-col items-start justify-between md:block md:items-center">
          <CardTitle className="text-4xl font-bold">{data.companyName}</CardTitle>
          <div className="flex w-full flex-row justify-between md:items-center md:pt-0">
            <CardDescription className="pt-2 text-2xl font-medium leading-9 md:pt-0 md:text-xl">
              {data.productName}
            </CardDescription>
            <Image
              src={typeof data.image === 'string' ? data.image : data.image?.url || ''}
              alt={data.companyName}
              width={120}
              height={120}
              className="max-h-[120px] max-w-[120px] object-contain md:hidden"
            />
          </div>
        </CardHeader>
        <CardContent className={'text-md mb-5 hidden overflow-hidden md:block md:h-24'}>
          <p className="line-clamp-4">{data.description}</p>
        </CardContent>
        <CardFooter className={' space-x-4 pb-4 text-xl md:pb-6 md:text-lg'}>
          {data.id && (
            <LinkButton
              href={'/projects/' + data.slug}
              newTab={false}
              variant="icon"
              className="flex items-center space-x-2"
            >
              <h2 className="">Read more</h2>
              <FaArrowCircleRight className="text-2xl" />
            </LinkButton>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}
