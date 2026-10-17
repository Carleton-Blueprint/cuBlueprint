import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

import { revalidateDelete, revalidatePost } from '@/collections/Posts/hooks/revalidatePost'

const logger = { info: vi.fn() }

const baseReq = (context: Record<string, unknown> = {}) =>
  ({
    payload: { logger },
    context,
  }) as never

describe('revalidatePost', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
    revalidateTag.mockClear()
    logger.info.mockClear()
  })

  it('invalidates path, sitemap, and root layout for a published change', () => {
    revalidatePost({
      doc: { slug: 'hello', _status: 'published' },
      previousDoc: { slug: 'hello', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/posts/hello')
    expect(revalidateTag).toHaveBeenCalledWith('posts-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does nothing for draft-only saves', () => {
    revalidatePost({
      doc: { slug: 'hello', _status: 'draft' },
      previousDoc: { slug: 'hello', _status: 'draft' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('invalidates the old path, sitemap, and root layout when unpublishing', () => {
    revalidatePost({
      doc: { slug: 'hello', _status: 'draft' },
      previousDoc: { slug: 'hello', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/posts/hello')
    expect(revalidateTag).toHaveBeenCalledWith('posts-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('invalidates old and new paths, sitemap, and root layout on published slug change', () => {
    revalidatePost({
      doc: { slug: 'hello-world', _status: 'published' },
      previousDoc: { slug: 'hello', _status: 'published' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/posts/hello')
    expect(revalidatePath).toHaveBeenCalledWith('/posts/hello-world')
    expect(revalidateTag).toHaveBeenCalledWith('posts-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('invalidates path, sitemap, and root layout on delete', () => {
    revalidateDelete({
      doc: { slug: 'hello' },
      req: baseReq(),
    } as never)

    expect(revalidatePath).toHaveBeenCalledWith('/posts/hello')
    expect(revalidateTag).toHaveBeenCalledWith('posts-sitemap')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('does nothing when disableRevalidate is true', () => {
    revalidatePost({
      doc: { slug: 'hello', _status: 'published' },
      previousDoc: { slug: 'hello', _status: 'published' },
      req: baseReq({ disableRevalidate: true }),
    } as never)
    revalidateDelete({
      doc: { slug: 'hello' },
      req: baseReq({ disableRevalidate: true }),
    } as never)

    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
