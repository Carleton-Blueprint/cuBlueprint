import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header')
    revalidatePublicSite(context)
  }

  return doc
}
