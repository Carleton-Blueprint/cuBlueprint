import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

export const revalidateTeam: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}

export const revalidateDeletedTeam: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  revalidatePublicSite(context)
  return doc
}
