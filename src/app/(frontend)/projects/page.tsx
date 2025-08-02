import React from 'react'
import CurrentProjects from './_components/CurrentProjects'
import PastProjects from './_components/PastProjects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 3600

export default async function Projects() {
  const payload = await getPayload({ config: configPromise })
  const currentRes = await payload.find({
    collection: 'projects',
    where: {
      status: {
        equals: 'in-progress',
      },
    },
  })
  const pastRes = await payload.find({
    collection: 'projects',
    where: {
      status: {
        equals: 'completed',
      },
    },
  })
  const currentProjects = currentRes.docs
  const pastProjects = pastRes.docs

  return (
    <div className="md:space-y-6">
      <CurrentProjects projects={currentProjects} />
      <PastProjects projects={pastProjects} />
    </div>
  )
}
