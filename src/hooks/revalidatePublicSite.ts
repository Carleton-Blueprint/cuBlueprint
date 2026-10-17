import { revalidatePath } from 'next/cache'

export const revalidatePublicSite = (context: { disableRevalidate?: boolean }): void => {
  if (context.disableRevalidate) return
  revalidatePath('/', 'layout')
}
