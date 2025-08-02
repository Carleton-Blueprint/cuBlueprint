import { Project } from '@/payload-types'
import PastProjectCard from './PastProjectCard'
import BlockContainer from '@/components/BlockContainer'

export default async function PastProjects({ projects }: { projects: Project[] }) {
  return (
    <BlockContainer
      title="Past Projects"
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
