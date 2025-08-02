import LinkButton from '@/components/LinkButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Project } from '@/payload-types'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FaArrowCircleRight } from 'react-icons/fa'

export default function ProjectCard({ data }: { data: Project }) {
  return (
    <Card
      className={`border-none bg-white flex w-full items-center justify-center rounded-[40px] shadow-[2px_6px_4px_0px_rgba(0,0,0,0.25)] md:h-auto`}
    >
      <Image
        src={typeof data.image === 'string' ? data.image : data.image?.url || ''}
        alt={data.companyName}
        width={250}
        height={250}
        className={'ml-8 hidden h-[200px] w-auto md:block'}
      />

      <div className="flex min-h-[320px] w-full flex-col justify-end md:min-h-full md:justify-between">
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
        <CardFooter
          className={'justify-end space-x-4 pb-4 text-xs md:justify-start md:pb-6 md:text-lg'}
        >
          {data.url && (
            <LinkButton href={data.url} newTab={true} variant="icon">
              {' '}
              <FaGithub className="text-6xl text-black transition-colors duration-300 ease-in-out hover:text-blueprint md:text-5xl" />{' '}
            </LinkButton>
          )}
          {data.id && (
            <LinkButton href={'/projects/' + data.slug} newTab={true} variant="icon">
              <FaArrowCircleRight className="text-6xl md:text-5xl" />
            </LinkButton>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}
