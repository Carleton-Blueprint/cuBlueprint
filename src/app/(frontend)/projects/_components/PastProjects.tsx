import { Media, Project } from '@/payload-types'
import PastProjectCard from './PastProjectCard'
import BlockContainer from '@/components/BlockContainer'

type CurrentProjectsProps = {
  title: string
  image?: string | Media | null
  projects: Project[]
}

export default async function PastProjects({ projects, title, image }: CurrentProjectsProps) {
  return (
    <BlockContainer
      title={title}
      image={image ? image : undefined}
      roundedCorners="top"
      bg="dark-blue"
      padding="less"
      gap="less"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <PastProjectCard key={index} data={project} />
        ))}
      </div>
    </BlockContainer>
  )
}
