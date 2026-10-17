import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateCategory: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}

export const revalidateDeletedCategory: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}
