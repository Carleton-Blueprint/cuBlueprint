import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

const revalidatePublicPages = () => {
  revalidatePath('/', 'layout')
}

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePublicPages()
  }

  return doc
}

export const revalidateDeletedMedia: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePublicPages()
  }

  return doc
}
