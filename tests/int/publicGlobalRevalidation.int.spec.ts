import { readFileSync } from 'fs'
import path from 'path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

import { revalidateFooter } from '@/Footer/hooks/revalidateFooter'
import { revalidateHeader } from '@/Header/hooks/revalidateHeader'
import { revalidateContactPage } from '@/globals/ContactPage/config'
import { revalidateEventsPage } from '@/globals/EventsPage/config'
import { revalidateHomePage } from '@/globals/HomePage/config'
import { revalidateProjectsPage } from '@/globals/ProjectsPage/config'
import { revalidateStudentsPage } from '@/globals/StudentsPage/config'
import { revalidateDeletedForm, revalidateForm } from '@/hooks/revalidateForm'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'

const logger = { info: vi.fn() }

const baseReq = (context: Record<string, unknown> = {}) =>
  ({
    payload: { logger },
    context,
  }) as never

describe('public global and form revalidation', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
    revalidateTag.mockClear()
    logger.info.mockClear()
  })

  it('revalidates header tag and root layout', () => {
    revalidateHeader({ doc: {}, req: baseReq() } as never)
    expect(revalidateTag).toHaveBeenCalledWith('global_header')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates footer tag and root layout', () => {
    revalidateFooter({ doc: {}, req: baseReq() } as never)
    expect(revalidateTag).toHaveBeenCalledWith('global_footer')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates redirects tag and root layout', () => {
    revalidateRedirects({ doc: {}, req: baseReq() } as never)
    expect(revalidateTag).toHaveBeenCalledWith('redirects')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('skips header, footer, and redirects when disableRevalidate is true', () => {
    const req = baseReq({ disableRevalidate: true })
    revalidateHeader({ doc: {}, req } as never)
    revalidateFooter({ doc: {}, req } as never)
    revalidateRedirects({ doc: {}, req } as never)
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('revalidates home page paths and root layout', () => {
    revalidateHomePage({ req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(revalidatePath).toHaveBeenCalledWith('/home')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates projects page path and root layout', () => {
    revalidateProjectsPage({ req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/projects')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates events page path and root layout', () => {
    revalidateEventsPage({ req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/events')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates students page path and root layout', () => {
    revalidateStudentsPage({ req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/students')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('revalidates contact page path and root layout', () => {
    revalidateContactPage({ req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/contact')
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('skips page globals when disableRevalidate is true', () => {
    const req = baseReq({ disableRevalidate: true })
    revalidateHomePage({ req } as never)
    revalidateProjectsPage({ req } as never)
    revalidateEventsPage({ req } as never)
    revalidateStudentsPage({ req } as never)
    revalidateContactPage({ req } as never)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('revalidates form definitions on change and delete', () => {
    revalidateForm({ doc: {}, req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')

    revalidatePath.mockClear()
    revalidateDeletedForm({ doc: {}, req: baseReq() } as never)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('skips form revalidation when disableRevalidate is true', () => {
    const req = baseReq({ disableRevalidate: true })
    revalidateForm({ doc: {}, req } as never)
    revalidateDeletedForm({ doc: {}, req } as never)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('does not add revalidation hooks to form submissions', () => {
    const pluginsSource = readFileSync(
      path.join(process.cwd(), 'src/plugins/index.ts'),
      'utf8',
    )
    const submissionBlock = pluginsSource.slice(
      pluginsSource.indexOf('formSubmissionOverrides'),
      pluginsSource.indexOf('formOverrides'),
    )
    expect(submissionBlock).not.toContain('revalidatePublicSite')
    expect(submissionBlock).not.toContain('revalidateForm')
    expect(pluginsSource).toContain('revalidateForm')
    expect(pluginsSource).toContain('revalidateDeletedForm')
  })
})
