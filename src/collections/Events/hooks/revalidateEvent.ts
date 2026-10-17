import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Event } from '@/payload-types'
import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

const isPublicEvent = (doc?: Partial<Event> | null) =>
  doc?._status === 'published' && doc?.visibility === true

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (isPublicEvent(doc) || isPublicEvent(previousDoc)) {
    revalidatePublicSite(context)
  }
  return doc
}

export const revalidateDeletedEvent: CollectionAfterDeleteHook<Event> = ({
  doc,
  req: { context },
}) => {
  if (isPublicEvent(doc)) {
    revalidatePublicSite(context)
  }
  return doc
}
