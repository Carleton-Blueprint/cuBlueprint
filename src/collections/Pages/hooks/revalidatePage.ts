import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

const pagePath = (slug?: string | null) => (slug === 'home' ? '/' : `/${slug}`)

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    let didRevalidate = false

    if (doc._status === 'published') {
      const path = pagePath(doc.slug)

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')
      didRevalidate = true

      if (
        previousDoc?._status === 'published' &&
        previousDoc.slug &&
        previousDoc.slug !== doc.slug
      ) {
        const oldPath = pagePath(previousDoc.slug)

        payload.logger.info(`Revalidating old page at path: ${oldPath}`)

        revalidatePath(oldPath)
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = pagePath(previousDoc.slug)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
      didRevalidate = true
    }

    if (didRevalidate) {
      revalidatePublicSite(context)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = pagePath(doc?.slug)
    revalidatePath(path)
    revalidateTag('pages-sitemap')
    revalidatePublicSite(context)
  }

  return doc
}
