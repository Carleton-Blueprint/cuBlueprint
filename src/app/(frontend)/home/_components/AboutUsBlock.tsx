import Image from 'next/image'
import BlockContainer from '@/components/BlockContainer'
import Link from 'next/link'
import { Media } from '@/payload-types'
import fallbackImage from '../_assets/mission.svg'
import { MdDoubleArrow } from 'react-icons/md'

type AboutUsBlockProps = {
  visibility?: boolean
  title?: string | null
  text?: string | null
  image?: string | Media | null
  linkText?: string | null
  linkUrl?: string | null
  roundedCorners?: 'none' | 'top' | 'bottom' | 'all' | null
}

export default function AboutUsBlock({
  visibility,
  title,
  text,
  image,
  linkText,
  linkUrl,
  roundedCorners = 'none',
}: AboutUsBlockProps) {
  if (!visibility || !title || !text) {
    return null
  }

  return (
    <>
      <BlockContainer
        bg="light-blue"
        roundedCorners={
          roundedCorners === 'all'
            ? true
            : roundedCorners === 'none' || !roundedCorners
              ? false
              : roundedCorners
        }
        padding="less"
      >
        <div className="flex flex-row">
          <div className="space-y-8 text-2xl md:w-2/3">
            <h1 className="text-5xl font-bold text-blueprint md:text-6xl">
              {title || 'Our Mission'}
            </h1>
            <p className="text-lg md:text-2xl">
              {text ||
                'Started at UC Berkeley, Blueprint strives to make technology more accessible and useful for those who create communities and promote public welfare. This chapter at Carleton University is no different.'}
            </p>
            {linkText && linkUrl && (
              <Link
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden w-fit flex-row items-center text-sm font-bold text-blueprint md:flex md:text-2xl"
              >
                <p>{linkText}</p>
                <MdDoubleArrow className="ml-2 transition-spacing ease-in-out group-hover:ml-4" />
              </Link>
            )}
          </div>
          <div className="hidden w-1/3 justify-end md:flex">
            {image && (
              <Image
                src={typeof image === 'string' ? image : image?.url || fallbackImage}
                width={300}
                height={300}
                alt="decorative image"
                className="flex w-[300px]"
              />
            )}
          </div>
        </div>
        {image && (
          <div className="relative">
            <Image
              className="md:hidden absolute w-40 -bottom-6 right-1/12 justify-self-center pointer-events-none"
              src={typeof image === 'string' ? image : image?.url || fallbackImage}
              alt="Blueprinter characters"
              width={300}
              height={300}
            />
          </div>
        )}
      </BlockContainer>

      {linkText && linkUrl && (
        <div className="relative container mt-6 flex w-full items-center md:hidden">
          <Link
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-2xl font-semibold text-blueprint"
          >
            <p className="">{linkText}</p>
          </Link>
        </div>
      )}
    </>
  )
}
