import BlockContainer from '@/components/BlockContainer'
import accessPayload from '@/hooks/usePayload'
import Image from 'next/image'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { ChevronLeft, LucideLink } from 'lucide-react'
import Section from '../../students/_components/Section'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const { payload } = await accessPayload()
  const projects = await payload.find({
    collection: 'projects',
    limit: 1000,
    where: {
      visibility: {
        equals: true,
      },
      slug: {
        not_equals: null,
      },
    },
    select: {
      slug: true,
    },
  })

  return projects.docs.map((project) => ({
    slug: project.slug,
  }))
}

export default async function FullProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { payload } = await accessPayload()
  const { slug } = await params
  const res = await payload.find({
    collection: 'projects',
    where: {
      visibility: {
        equals: true,
      },
      slug: {
        equals: slug,
      },
    },
    // depth: 4,
  })
  const project = res.docs[0]
  if (!project) {
    return notFound()
  }
  const students =
    project.team?.flatMap((member) => {
      if (!member.student || typeof member.student.value === 'string') {
        return []
      } else {
        return [{ student: member.student.value, role: member.role }]
      }
    }) || []

  const statusMappings = {
    'in-progress': 'In Progress',
    completed: 'Completed',
    'not-started': 'Not Started',
  }

  return (
    <div className="md:space-y-6 flex flex-col items-center overflow-x-hidden bg-blueprint-50 pb-6 ">
      <Link
        href="/projects"
        className="text-3xl flex items-center font-semibold text-blueprint mt-6 -mb-4 self-start container"
      >
        <ChevronLeft className="inline mr-2" />
        Back to Projects
      </Link>
      <BlockContainer title={project.companyName} margin inner roundedCorners>
        <hr className="-mt-5 border-2 border-blueprint" />
        <div className="flex gap-10 flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 space-y-4 text-center">
            {project.image && (
              <Image
                src={typeof project.image === 'string' ? project.image : project.image.url || ''}
                alt={project.companyName}
                width={500}
                height={300}
                className="object-cover"
              />
            )}
            <h2 className="text-2xl font-semibold text-blueprint">{project.productName}</h2>
            <p className="text-lg font-medium ">{statusMappings[project.status]}</p>
            {project.url && (
              <div className="flex flex-col items-center justify-center space-y-2">
                <h2 className="text-md font-semibold">Links</h2>
                <Link href={project.url} className=" text-md flex items-center space-x-2">
                  <LucideLink className="size-4" /> <p>Website</p>
                </Link>
              </div>
            )}
          </div>
          <RichText
            data={project.extendedDescription}
            enableGutter={false}
            className="md:w-2/3 prose-headings:text-blueprint prose-p:text-black prose-strong:text-black prose-ul:text-black prose-ol:text-black prose-li:text-black"
          />
        </div>
      </BlockContainer>

      {students.length > 0 && <Section team={{ name: project.companyName, students: students }} />}
    </div>
  )
}
