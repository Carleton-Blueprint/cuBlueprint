import React from 'react'
import CurrentProjects from './_components/CurrentProjects'
import PastProjects from './_components/PastProjects'
import usePayload from '@/hooks/usePayload'

export const revalidate = 3600

export default async function Projects() {
  const { payload } = await usePayload()
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
  // const currentProjects = currentRes.docs
  // const pastProjects = pastRes.docs

  const resGlobal = await payload.findGlobal({
    slug: 'projectsPage',
  })

  const currentProjects =
    resGlobal.currentProjectsBlock.currentProjects?.flatMap(
      ({ project, image, imagePosition }) =>
        typeof project !== 'string'
          ? project.visibility
            ? { project, image, imagePosition }
            : []
          : [], // Skip if project is of type string or not visible
    ) || []

  const currentProjectsBlockData = {
    title: resGlobal.currentProjectsBlock.title,
    image: resGlobal.currentProjectsBlock.image,
    projects: currentProjects,
  }

  const pastProjects =
    resGlobal.pastProjectsBlock.pastProjects?.flatMap(
      ({ project }) => (typeof project !== 'string' ? project : []), // Skip if project is of type string
    ) || []

  const pastProjectsBlockData = {
    title: resGlobal.pastProjectsBlock.title,
    image: resGlobal.pastProjectsBlock.image,
    projects: pastProjects,
  }

  return (
    <div className="md:space-y-6 overflow-x-hidden">
      <CurrentProjects {...currentProjectsBlockData} />
      <PastProjects {...pastProjectsBlockData} />
    </div>
  )
}
