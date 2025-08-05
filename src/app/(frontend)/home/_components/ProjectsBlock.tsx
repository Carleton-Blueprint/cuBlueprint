import BlockContainer from '@/components/BlockContainer'

import Link from 'next/link'

import ProjectsCarousel from './ProjectsCarousel'
import { Media, Project } from '@/payload-types'

type ProjectsBlockProps = {
  visibility?: boolean
  title?: string | null
  image?: string | Media | null
  data?:
    | {
        project: string | Project
        id?: string | null
      }[]
    | null
}

export default function ProjectsBlock({ title, image, data, visibility }: ProjectsBlockProps) {
  if (!visibility || !data || data.length === 0 || !title) {
    return null
  }
  const featuredProjects = data.flatMap(
    ({ project }) => (typeof project !== 'string' ? project : []), // Skip if project is of type string
  )

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
