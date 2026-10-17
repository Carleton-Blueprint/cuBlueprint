import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateStudent: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}

export const revalidateDeletedStudent: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}
