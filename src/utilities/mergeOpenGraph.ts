import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from './site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DESCRIPTION,
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    ...(og?.images ? { images: og.images } : {}),
  }
}
