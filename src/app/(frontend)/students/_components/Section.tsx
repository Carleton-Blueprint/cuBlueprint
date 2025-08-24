import { Student, Team } from '@/payload-types'
import TeamProfile from './TeamProfile'
import BlockContainer from '@/components/BlockContainer'

type SectionProps = {
  team: { name: string; students: { student: Student; role: string }[] }
}

export default function Section({ team }: SectionProps) {
  return (
    <BlockContainer
      title={team.name}
      shadow
      roundedCorners={true}
      padding="less"
      gap="less"
      titleSize="sm"
    >
      <div className="-mx-2 grid grid-cols-2 gap-2 md:mx-auto md:grid-cols-4 md:gap-8 lg:grid-cols-6">
        {team.students.map((student, index) => (
          <TeamProfile student={student} key={index} />
        ))}
      </div>
    </BlockContainer>
  )
}
