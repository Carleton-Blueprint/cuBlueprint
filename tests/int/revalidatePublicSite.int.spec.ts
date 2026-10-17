import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }))

vi.mock('next/cache', () => ({ revalidatePath }))

import { revalidatePublicSite } from '@/hooks/revalidatePublicSite'

describe('revalidatePublicSite', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
  })

  it('invalidates the root layout once for a normal context', () => {
    revalidatePublicSite({})
    expect(revalidatePath).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does nothing when disableRevalidate is true', () => {
    revalidatePublicSite({ disableRevalidate: true })
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
