import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

import { revalidateDelete, revalidatePage } from '@/collections/Pages/hooks/revalidatePage'

const logger = { info: vi.fn() }

const baseReq = (context: Record<string, unknown> = {}) =>
  ({
    payload: { logger },
    context,
  }) as never

describe('revalidatePage', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
    revalidateTag.mockClear()
    logger.info.mockClear()
  })

  it('invalidates path, sitemap, and root layout for a published change', () => {
    revalidatePage({
      doc: { slug: 'about', _status: 'published' },
      previousDoc: { slug: 'about', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/about')
    expect(revalidateTag).toHaveBeenCalledWith('pages-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does nothing for draft-only saves', () => {
    revalidatePage({
      doc: { slug: 'about', _status: 'draft' },
      previousDoc: { slug: 'about', _status: 'draft' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('invalidates the old path, sitemap, and root layout when unpublishing', () => {
    revalidatePage({
      doc: { slug: 'about', _status: 'draft' },
      previousDoc: { slug: 'about', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/about')
    expect(revalidateTag).toHaveBeenCalledWith('pages-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('invalidates old and new paths, sitemap, and root layout on published slug change', () => {
    revalidatePage({
      doc: { slug: 'about-us', _status: 'published' },
      previousDoc: { slug: 'about', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/about')
    expect(revalidatePath).toHaveBeenCalledWith('/about-us')
    expect(revalidateTag).toHaveBeenCalledWith('pages-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('invalidates home as / when the home slug is published', () => {
    revalidatePage({
      doc: { slug: 'home', _status: 'published' },
      previousDoc: { slug: 'home', _status: 'draft' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(revalidateTag).toHaveBeenCalledWith('pages-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('invalidates path, sitemap, and root layout on delete', () => {
    revalidateDelete({
      doc: { slug: 'about' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/about')
    expect(revalidateTag).toHaveBeenCalledWith('pages-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does nothing when disableRevalidate is true', () => {
    revalidatePage({
      doc: { slug: 'about', _status: 'published' },
      previousDoc: { slug: 'about', _status: 'published' },
      req: baseReq({ disableRevalidate: true }),
    } as never)
    revalidateDelete({
      doc: { slug: 'about' },
      req: baseReq({ disableRevalidate: true }),
    } as never)

    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
