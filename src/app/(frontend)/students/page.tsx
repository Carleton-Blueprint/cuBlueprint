import Section from './_components/Section'
import bluePeople from './_assets/blue_people.svg'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 3600

export default async function Students() {
  const payload = await getPayload({ config: configPromise })
  const resGlobal = await payload.findGlobal({
    slug: 'studentsPage',
    depth: 3,
  })

  console.log('Our NEXT_PUBLIC_SERVER_URL is:', process.env.NEXT_PUBLIC_SERVER_URL)

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-blueprint-50">
      <div className="content container relative flex flex-col space-y-24 pb-24">
        <div className="flex flex-col space-y-2">
          <div className="m-4 ml-0 flex flex-row gap-5 md:m-8 md:justify-start">
            <h1 className="mb-4 pt-6 text-4xl font-bold md:mb-8 md:text-5xl">
              Meet our <span className="text-blueprint-500">Team</span>
            </h1>
            <Image
              src={bluePeople}
              width={188.5}
              alt="Image of blue figures"
              className="hidden md:block"
            />
          </div>
          <div className="flex flex-col space-y-12 text-center md:space-y-24">
            {teams.map((team, index) => (
              <Section team={team} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
