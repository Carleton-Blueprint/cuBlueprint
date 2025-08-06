import Link from 'next/link'
import Image from 'next/image'
import { Student } from '@/payload-types'

function TeamProfileBase({ student, hover = false }: { student: Student; hover: boolean }) {
  return (
    <div
      className={`flex flex-col items-center space-y-1 rounded-2xl py-3 text-center ${
        hover && 'transition duration-200 ease-in-out hover:scale-110 hover:bg-blueprint-50'
      }`}
    >
      <div className="mb-2 flex h-28 w-28 items-center overflow-hidden rounded-full border-2 border-white md:h-32 md:w-32">
        <Image
          src={
            typeof student.image === 'string'
              ? student.image
              : student.image?.url || '/media/bunny.svg'
          }
          width={128}
          height={128}
          alt={'Picture of ' + (hover ? student.name : 'blueprint logo')}
        />
      </div>
      <p className="text-md font-bold md:text-lg">{student.name}</p>
      <p className="text-sm capitalize md:text-base">{student.position}</p>
    </div>
  )
}

export default function TeamProfile({ student }: { student: string | Student }) {
  if (typeof student === 'string') {
    return
  }
  if (student.url === '') {
    return <TeamProfileBase student={student} hover={false} />
  } else
    return (
      <Link href={student.url} target="_blank">
        <TeamProfileBase student={student} hover={true} />
      </Link>
    )
}
