import Link from 'next/link'
import Image from 'next/image'
import { Student } from '@/payload-types'
import { cn } from '@/utilities/ui'

function TeamProfileBase({
  student,
  role,
  hover = false,
  bg,
}: {
  student: Student
  role: string
  hover: boolean
  bg?: 'white' | 'light-blue' | 'dark-blue' | 'blueprint' | 'darker-blue' | boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-1 rounded-2xl py-3 text-center w-32 md:w-40 group',
        {
          'transition duration-200 ease-in-out active:scale-110 hover:scale-110 active:bg-blueprint-50 hover:bg-blueprint-50':
            hover,
          'active:bg-blueprint-dark hover:bg-blueprint-dark':
            hover && (bg === 'dark-blue' || bg === 'darker-blue' || bg === 'blueprint'),
          'text-blueprint-50': bg === 'dark-blue' || bg === 'darker-blue' || bg === 'blueprint',
        },
      )}
    >
      <div
        className={cn(
          'mb-2 flex h-28 w-28 items-center overflow-hidden rounded-full bg-blueprint-200 md:h-32 md:w-32',
          {
            'border-4 border-blueprint-dark group-hover:border-[#041122]': hover,
          },
        )}
      >
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
      <p className="text-sm capitalize md:text-base">{role}</p>
      <p className="text-md font-bold md:text-lg">{student.name}</p>
    </div>
  )
}

export default function TeamProfile({
  student,
  bg,
}: {
  student: { student: string | Student; role: string }
  bg?: 'white' | 'light-blue' | 'dark-blue' | 'blueprint' | 'darker-blue' | boolean
}) {
  if (typeof student.student === 'string') {
    return
  }
  if (!student.student.url) {
    return <TeamProfileBase student={student.student} role={student.role} hover={false} bg={bg} />
  } else
    return (
      <Link href={student.student.url} target="_blank" className="w-32 md:w-40">
        <TeamProfileBase student={student.student} role={student.role} hover={true} bg={bg} />
      </Link>
    )
}
