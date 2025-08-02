import { Project } from '@/payload-types'
import ProjectCard from './ProjectCard'
import BlockContainer from '@/components/BlockContainer'

export default async function CurrentProjects({ projects }: { projects: Project[] }) {
  return (
    <BlockContainer
      title="Current Projects"
      roundedCorners="bottom"
      bg="light-blue"
      padding="less"
      gap="less"
    >
      <div className="-mx-4 flex flex-col items-center space-y-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} data={project} />
        ))}
      </div>
    </BlockContainer>
  )
}
