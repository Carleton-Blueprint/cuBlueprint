import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)

    revalidateTag('redirects')
    revalidatePublicSite(context)
  }

  return doc
}
