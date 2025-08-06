import { Student, Team } from '@/payload-types'
import TeamProfile from './TeamProfile'
import BlockContainer from '@/components/BlockContainer'

export default function Section({ team }: { team: Team | Student[] }) {
  return (
    <BlockContainer
      title={Array.isArray(team) ? 'Team' : team.name + ' Team'}
      shadow
      roundedCorners={true}
      padding="less"
      gap="less"
      titleSize="sm"
    >
      <div className="-mx-2 grid grid-cols-2 gap-2 md:mx-auto md:grid-cols-4 md:gap-8 lg:grid-cols-6">
        {Array.isArray(team)
          ? team.map((person, index) => <TeamProfile student={person} key={index} />)
          : team.team?.docs?.map((team, index) => <TeamProfile student={team} key={index} />)}
      </div>
    </BlockContainer>
  )
}
