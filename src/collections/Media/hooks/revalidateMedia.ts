import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateMedia: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}

export const revalidateDeletedMedia: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}
