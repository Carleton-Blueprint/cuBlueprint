import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }))

vi.mock('next/cache', () => ({ revalidatePath }))

import {
  revalidateCategory,
  revalidateDeletedCategory,
} from '@/collections/Categories/hooks/revalidateCategory'
import {
  revalidateDeletedEvent,
  revalidateEvent,
} from '@/collections/Events/hooks/revalidateEvent'
import {
  revalidateDeletedProject,
  revalidateProject,
} from '@/collections/Projects/hooks/revalidateProject'
import {
  revalidateDeletedStudent,
  revalidateStudent,
} from '@/collections/Students/hooks/revalidateStudent'
import {
  revalidateDeletedTeam,
  revalidateTeam,
} from '@/collections/Teams/hooks/revalidateTeam'

describe('public collection revalidation', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
  })

  describe.each([
    ['student', revalidateStudent, revalidateDeletedStudent],
    ['team', revalidateTeam, revalidateDeletedTeam],
    ['category', revalidateCategory, revalidateDeletedCategory],
  ] as const)('%s hooks', (_name, afterChange, afterDelete) => {
    it('invalidates the root layout on change and delete', () => {
      afterChange({ doc: {}, req: { context: {} } } as never)
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')

      revalidatePath.mockClear()
      afterDelete({ doc: {}, req: { context: {} } } as never)
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    })

    it('does nothing when disableRevalidate is true', () => {
      afterChange({ doc: {}, req: { context: { disableRevalidate: true } } } as never)
      afterDelete({ doc: {}, req: { context: { disableRevalidate: true } } } as never)
      expect(revalidatePath).not.toHaveBeenCalled()
    })
  })

  describe.each([
    ['project', revalidateProject, revalidateDeletedProject],
    ['event', revalidateEvent, revalidateDeletedEvent],
  ] as const)('%s visibility hooks', (_name, afterChange, afterDelete) => {
    const publicDoc = { _status: 'published', visibility: true, slug: 'example' }
    const draftDoc = { _status: 'draft', visibility: true, slug: 'example' }
    const hiddenPublished = { _status: 'published', visibility: false, slug: 'example' }

    it('invalidates when the current document is public', () => {
      afterChange({
        doc: publicDoc,
        previousDoc: draftDoc,
        req: { context: {} },
      } as never)
      expect(revalidatePath).toHaveBeenCalledTimes(1)
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    })

    it('does nothing for draft-only changes', () => {
      afterChange({
        doc: draftDoc,
        previousDoc: draftDoc,
        req: { context: {} },
      } as never)
      expect(revalidatePath).not.toHaveBeenCalled()
    })

    it('invalidates when a previously public document becomes private', () => {
      afterChange({
        doc: hiddenPublished,
        previousDoc: publicDoc,
        req: { context: {} },
      } as never)
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    })

    it('invalidates when deleting a public document', () => {
      afterDelete({ doc: publicDoc, req: { context: {} } } as never)
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    })

    it('does not invalidate when deleting a non-public document', () => {
      afterDelete({ doc: draftDoc, req: { context: {} } } as never)
      expect(revalidatePath).not.toHaveBeenCalled()
    })

    it('does nothing when disableRevalidate is true', () => {
      afterChange({
        doc: publicDoc,
        previousDoc: publicDoc,
        req: { context: { disableRevalidate: true } },
      } as never)
      afterDelete({
        doc: publicDoc,
        req: { context: { disableRevalidate: true } },
      } as never)
      expect(revalidatePath).not.toHaveBeenCalled()
    })
  })
})
