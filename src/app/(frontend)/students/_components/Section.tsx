import { Student, Team } from '@/payload-types'
import TeamProfile from './TeamProfile'
import BlockContainer from '@/components/BlockContainer'
import { cn } from '@/utilities/ui'

type SectionProps = {
  team: { name: string; students: { student: Student; role: string }[] }
  bg?: 'white' | 'light-blue' | 'dark-blue' | 'blueprint' | 'darker-blue' | boolean
  centered?: boolean
}

export default function Section({ team, bg, centered }: SectionProps) {
  return (
    <BlockContainer
      title={team.name}
      shadow
      roundedCorners={true}
      padding="less"
      gap="less"
      titleSize="sm"
      centered={centered}
      bg={bg}
      className="w-full"
    >
      <div
        className={cn('w-full -mx-2 flex justify-center flex-wrap md:justify-start gap-6', {
          'md:justify-center': centered,
        })}
      >
        {team.students.map((student, index) => (
          <TeamProfile student={student} key={index} bg={bg} />
        ))}
      </div>
    </BlockContainer>
  )
}
