import { Team } from '@/payload-types'
import TeamProfile from './TeamProfile'
import BlockContainer from '@/components/BlockContainer'

export default function Section({ team }: { team: Team }) {
  return (
    <BlockContainer
      title={team.name + ' Team'}
      shadow
      roundedCorners={true}
      padding="less"
      gap="less"
      titleSize="sm"
    >
      <div className="-mx-2 grid grid-cols-2 gap-2 md:mx-auto md:grid-cols-4 md:gap-8 lg:grid-cols-6">
        {team.team?.docs?.map((person, index) => (
          <TeamProfile student={person} key={index} />
        ))}
      </div>
    </BlockContainer>
  )
}
