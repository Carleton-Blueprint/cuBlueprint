import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'
import Image, { StaticImageData } from 'next/image'

type Props = {
  className?: BlockContainerProps
  children: React.ReactNode
  title?: string
  bg?: 'white' | 'light-blue' | 'dark-blue' | 'blueprint' | 'darker-blue' | boolean
  roundedCorners?: 'top' | 'bottom' | true | false
  centered?: boolean
  inner?: boolean
  margin?: 'top' | 'bottom' | true | false
  shadow?: boolean
  padding?: 'less' | 'more' | boolean
  gap?: 'less' | boolean
  titleSize?: 'sm' | 'md'
  image?: string | Media | StaticImageData
  containChildren?: boolean
  imagePositioningClassName?: string
}

type BlockContainerProps = React.HTMLAttributes<HTMLDivElement> & string

export default function BlockContainer({
  className,
  children,
  title,
  bg = 'white',
  roundedCorners = false,
  centered = false,
  inner = false,
  margin = false,
  shadow = false,
  padding = true,
  gap = true,
  titleSize,
  image,
  containChildren = true,
  imagePositioningClassName,
}: Props) {
  let imageUrl = ''
  if (typeof image !== 'string') {
    if (image && 'url' in image && image.url) {
      imageUrl = image.url
    } else if (image && 'src' in image) {
      imageUrl = image.src
    }
  }
  return (
    <div
      className={cn(
        {
          'py-16': padding,
          'py-8': padding === 'less',
          'bg-[#E7F2FD]': bg === 'light-blue',
          'bg-white': bg === 'white',
          'bg-[#0A1E3A]': bg === 'dark-blue',
          'bg-blueprint': bg === 'blueprint',
          'bg-[#041122]': bg === 'darker-blue',
          'rounded-[50px]': roundedCorners === true,
          'rounded-t-[50px]': roundedCorners === 'top',
          'rounded-b-[50px]': roundedCorners === 'bottom',
          'self-center md:w-max md:px-12': inner,
          'my-12': margin === true,
          'mt-12': margin === 'top',
          'mb-12': margin === 'bottom',
          'shadow-[2px_6px_4px_0_rgba(0,0,0,0.3)]': shadow,
        },
        className,
      )}
    >
      <div
        className={cn('container space-y-10', {
          'flex flex-col items-center': centered,
          'space-y-6 pb-8': gap === 'less',
        })}
      >
        {title && (
          <div
            className={cn(
              'flex space-x-12 py-2 items-center text-5xl font-bold text-blueprint md:text-6xl',
              {
                'text-3xl md:text-4xl': titleSize === 'sm',
                'text-4xl md:text-5xl': titleSize === 'md',
                'text-center': centered,
                'text-blueprint-50': bg === 'dark-blue' || bg === 'darker-blue',
                'text-white': bg === 'blueprint',
                'mb-5': image,
              },
            )}
          >
            <h1>{title}</h1>
            {image && (
              <div className="relative">
                <Image
                  src={imageUrl}
                  width={128}
                  height={128}
                  alt="Blueprint Logo"
                  className={cn(
                    'absolute -bottom-1/2 left-0 pointer-events-none',
                    imagePositioningClassName,
                  )}
                />
                <span className="invisible">img</span>
              </div>
            )}
          </div>
        )}
        {containChildren && children}
      </div>
      {!containChildren && children}
    </div>
  )
}
