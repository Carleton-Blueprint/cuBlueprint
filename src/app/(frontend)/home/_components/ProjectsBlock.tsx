import BlockContainer from '@/components/BlockContainer'

import Link from 'next/link'

import usePayload from '@/hooks/usePayload'
import ProjectsCarousel from './ProjectsCarousel'

export default async function ProjectsBlock() {
  const { payload } = await usePayload()
  const resGlobal = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  })

  const title = resGlobal.projectsTitle
  const image = resGlobal.projectsBlueprinter

  if (!resGlobal.featuredProjects) {
    console.warn('No featured projects found in global settings')
    return null
  }
  const featuredProjects = resGlobal.featuredProjects.flatMap(
    ({ project }) => (typeof project !== 'string' ? project : []), // Skip if project is of type string
  )
  if (!featuredProjects || featuredProjects.length === 0) {
    console.warn('No featured projects found')
    return null
  }

  return (
    <>
      <BlockContainer
        title={title}
        padding="less"
        image={image ? image : undefined}
        containChildren={false}
      >
        <div className=" flex w-[calc(100%+2rem)] containerWidth justify-center flex-col md:flex-row md:h-[450px]">
          <ProjectsCarousel featuredProjects={featuredProjects} />
        </div>
      </BlockContainer>
      <div className="container flex text-2xl mb-8 md:-mt-8">
        <Link
          href="/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit flex-row items-center font-bold text-blueprint"
        >
          <p>Check out all projects</p>
          {/* <MdDoubleArrow className="ml-2 transition-spacing ease-in-out group-hover:ml-4" /> */}
        </Link>
      </div>
    </>
  )
}
