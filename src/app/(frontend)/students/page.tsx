import Section from './_components/Section'
import bluePeople from './_assets/blue_people.svg'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import BlockContainer from '@/components/BlockContainer'
import { NumberTicker } from '@/components/magicui/number-ticker'

export const revalidate = 3600

export default async function Students() {
  const payload = await getPayload({ config: configPromise })
  const resGlobal = await payload.findGlobal({
    slug: 'studentsPage',
    depth: 3,
  })

  const featuredTeam = typeof resGlobal?.hero?.team !== 'string' && {
    name: resGlobal?.hero?.team?.name || '',
    students:
      resGlobal?.hero?.team?.team?.flatMap((member) =>
        typeof member.student === 'string' ? [] : [{ student: member.student, role: member.role }],
      ) || [],
  }

  // process the data to get team name and members/roles
  const teams =
    resGlobal?.teams?.flatMap((team) => {
      if (team.team.relationTo === 'teams') {
        if (typeof team.team.value === 'string' || !team.team.value.team) return []
        const students = team.team.value.team.flatMap((student) => {
          if (typeof student.student === 'string' || !student) return []
          return [{ student: student.student, role: student.role }]
        })
        return [{ name: team.team.value.name, students }]
      } else if (team.team.relationTo === 'projects') {
        if (typeof team.team.value === 'string' || !team.team.value.team) return []
        const students = team.team.value.team.flatMap((student) => {
          if (!student.student || typeof student.student.value === 'string') {
            return []
          } else {
            return [{ student: student.student.value, role: student.role }]
          }
        })
        return [{ name: team.team.value.companyName, students }]
      } else {
        return []
      }
    }) || []

  const numbers = resGlobal.hero.numbers

  return (
    <div className="bg-blueprint-50 overflow-x-hidden">
      <BlockContainer
        bg="dark-blue"
        roundedCorners="bottom"
        padding="less"
        margin="bottom"
        className="pt-4"
      >
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-row gap-5 w-fit relative">
            <h1 className="mb-8 pt-6 text-4xl font-bold md:mb-8 md:text-6xl text-blueprint-50">
              Hello, <span className="text-blueprint-500">World!</span>
            </h1>
            <Image
              src={bluePeople}
              width={188.5}
              alt="Image of blue figures"
              className="hidden md:block absolute -right-[13rem]"
            />
          </div>
          {featuredTeam && <Section team={featuredTeam} bg="darker-blue" centered />}

          {resGlobal.hero.numbersVisibility && numbers && (
            <div className="mt-16 mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {numbers.map((number, index) => (
                <div
                  className="flex md:flex-col gap-6 md:gap-0 items-center justify-center"
                  key={index}
                >
                  <NumberTicker
                    value={number.value}
                    className="text-5xl flex justify-end md:justify-center items-center h-full md:h-fit font-bold text-blueprint md:text-6xl w-2/5 md:w-full"
                  />
                  <span className="text-start md:text-center text-3xl text-white font-bold md:text-3xl w-3/5 md:w-full text-wrap line-clamp-2">
                    {number.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlockContainer>
      <div className="min-h-screen overflow-x-hidden bg-blueprint-50">
        <div className="content container relative flex flex-col space-y-24 pb-24">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-12 text-center md:space-y-24">
              {teams.map((team, index) => (
                <Section team={team} key={index} centered />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
