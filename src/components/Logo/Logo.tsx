import { Media } from '@/payload-types'
import clsx from 'clsx'
import React from 'react'

interface Props {
  src?: string | Media
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const srcUrl = typeof src === 'string' ? src : src?.url
  console.log('src: ', srcUrl)

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={
        srcUrl ||
        'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'
      }
    />
  )
}
