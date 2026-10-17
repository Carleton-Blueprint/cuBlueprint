import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }))

vi.mock('next/cache', () => ({ revalidatePath }))

import {
  revalidateDeletedMedia,
  revalidateMedia,
} from '@/collections/Media/hooks/revalidateMedia'

describe('revalidateMedia', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
  })

  it('marks all public pages below the root layout after a media update', () => {
    revalidateMedia({ req: { context: {} } } as never)

    expect(revalidatePath).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('marks all public pages below the root layout after media deletion', () => {
    revalidateDeletedMedia({ req: { context: {} } } as never)

    expect(revalidatePath).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does not revalidate when the request disables revalidation', () => {
    revalidateMedia({ req: { context: { disableRevalidate: true } } } as never)
    revalidateDeletedMedia({ req: { context: { disableRevalidate: true } } } as never)

    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
