import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Media, Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'filled' | 'blueprintFilled' | ButtonProps['variant']
  media?: string | Media | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    media,
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (appearance === 'blueprintFilled') {
    return (
      <>
        <Link
          href={href}
          target={`${newTab ? '_blank' : ''}`}
          rel={`${newTab ? 'noopener noreferrer' : ''}`}
          className={cn(
            'group flex w-fit items-center font-bold text-blueprint transition-colors ease-in-out duration-300 hover:text-blueprint-300 -mb-[10px]',
            className,
          )}
        >
          <button className="w-[150px] self-start rounded-full bg-blueprint px-5 py-2 text-white duration-300 ease-in-out hover:bg-blueprint-300">
            {label && label}
            {children && children}
          </button>
        </Link>
        {media && (
          <Image
            src={typeof media === 'string' ? media : media?.url || ''}
            alt={label || ''}
            priority
            className=""
            width={233}
            height={142}
          />
        )}
      </>
    )
  }

  if (appearance === 'filled') {
    return (
      <Link
        href={href}
        target={`${newTab ? '_blank' : ''}`}
        rel={`${newTab ? 'noopener noreferrer' : ''}`}
        className={cn(
          'group flex w-fit items-center font-bold text-blueprint transition-colors ease-in-out duration-300 hover:text-blueprint-300',
          className,
        )}
      >
        <button className="self-start rounded-full bg-blueprint px-5 py-2 text-white duration-300 ease-in-out hover:bg-blueprint-300">
          {label && label}
          {children && children}
        </button>
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
