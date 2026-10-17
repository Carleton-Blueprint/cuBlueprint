import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Project } from '@/payload-types'
import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

const isPublicProject = (doc?: Partial<Project> | null) =>
  doc?._status === 'published' && doc?.visibility === true

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (isPublicProject(doc) || isPublicProject(previousDoc)) {
    revalidatePublicSite(context)
  }
  return doc
}

export const revalidateDeletedProject: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { context },
}) => {
  if (isPublicProject(doc)) {
    revalidatePublicSite(context)
  }
  return doc
}
