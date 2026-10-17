import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateForm: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}

export const revalidateDeletedForm: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}
