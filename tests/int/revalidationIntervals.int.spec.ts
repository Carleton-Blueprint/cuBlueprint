import { readFileSync } from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

const timedRoutes = [
  'src/app/(frontend)/projects/page.tsx',
  'src/app/(frontend)/students/page.tsx',
  'src/app/(frontend)/posts/page.tsx',
  'src/app/(frontend)/posts/page/[pageNumber]/page.tsx',
]

describe('public route revalidate intervals', () => {
  it('uses a 30-minute fallback on timed public list routes', () => {
    for (const relativePath of timedRoutes) {
      const source = readFileSync(path.join(process.cwd(), relativePath), 'utf8')
      expect(source, relativePath).toMatch(/export const revalidate = 1800\b/)
    }
  })
})
