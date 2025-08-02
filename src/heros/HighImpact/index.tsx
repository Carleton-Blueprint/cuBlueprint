'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  title,
  subtitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative h-[calc(100vh-80px)] flex text-white bg-blueprint-dark"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center">
        <div className="max-w-[36.5rem] text-center md:text-left">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {title && <h1 className="mb-2 text-5xl font-black md:text-6xl">{title}</h1>}
          {subtitle && <h2 className="mb-6 text-3xl font-semibold md:text-4xl">{subtitle}</h2>}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center md:justify-start gap-4">
              {links.map(({ link, media }, i) => {
                return (
                  <li key={i}>
                    <CMSLink media={media} {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="h-full">
        {media && typeof media === 'object' && (
          <Media
            imgClassName="absolute left-[55%] top-0 hidden h-full w-auto md:block"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
