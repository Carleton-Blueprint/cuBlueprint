import { Media, Project } from '@/payload-types'
import ProjectCard from './ProjectCard'
import BlockContainer from '@/components/BlockContainer'
import Image from 'next/image'
import NoCurrentProjectsImage from '../_assets/noProjects.svg'

type CurrentProjectsProps = {
  title: string
  image?: string | Media | null
  projects: {
    project: Project
    image?: string | Media | null
    imagePosition?:
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
      | null
  }[]
}

export default async function CurrentProjects({ projects, title, image }: CurrentProjectsProps) {
  return (
    <BlockContainer
      title={title}
      image={image ? image : undefined}
      roundedCorners="bottom"
      bg="light-blue"
      padding="less"
      gap="less"
    >
      {projects.length === 0 ? (
        <div className="flex flex-col space-y-4 ">
          <Image src={NoCurrentProjectsImage} alt="No current projects" width={200} height={200} />
          <div className="text-2xl w-64 font-semibold text-blueprint">
            We&apos;re not currently working on anything
          </div>
        </div>
      ) : (
        <div className="-mx-4 flex flex-col items-center space-y-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              data={project.project}
              image={project.image}
              imagePosition={project.imagePosition}
            />
          ))}
        </div>
      )}
    </BlockContainer>
  )
}
