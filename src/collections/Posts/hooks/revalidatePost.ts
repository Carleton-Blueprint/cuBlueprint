import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

const postPath = (slug?: string | null) => `/posts/${slug}`

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    let didRevalidate = false

    if (doc._status === 'published') {
      const path = postPath(doc.slug)

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')
      didRevalidate = true

      if (
        previousDoc?._status === 'published' &&
        previousDoc.slug &&
        previousDoc.slug !== doc.slug
      ) {
        const oldPath = postPath(previousDoc.slug)

        payload.logger.info(`Revalidating old post at path: ${oldPath}`)

        revalidatePath(oldPath)
      }
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = postPath(previousDoc.slug)

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
      didRevalidate = true
    }

    if (didRevalidate) {
      revalidatePublicSite(context)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = postPath(doc?.slug)

    revalidatePath(path)
    revalidateTag('posts-sitemap')
    revalidatePublicSite(context)
  }

  return doc
}
