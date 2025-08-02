import projectLogo from '../_assets/projectLogo.svg'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/payload-types'

type HomeProjectCardProps = {
  data: Project
  mobile?: boolean
}

export default function HomeProjectCard({ data, mobile = false }: HomeProjectCardProps) {
  if (mobile) {
    return (
      <div className="relative flex items-center justify-end">
        <Image
          src={typeof data.image === 'string' ? data.image : data.image?.url || projectLogo}
          alt={`logo of ${data.companyName}`}
          width={75}
          height={75}
          className="absolute mr-6 rounded-[40px]"
        />
        <div className="group relative h-24 w-full min-w-fit rounded-[35px] bg-gradient-to-t from-blueprint from-10% to-blueprint/15 to-85% px-6">
          <h2 className="absolute bottom-2 line-clamp-1 w-11/12 text-3xl font-semibold text-white">
            {data.companyName}
          </h2>
        </div>
        <Link href={'/projects/' + data.slug} className="absolute h-full w-full" />
      </div>
    )
  }
  return (
    <div className="flex items-center w-full min-h-[320px] h-full justify-center">
      <Image
        src={typeof data.image === 'string' ? data.image : data.image?.url || projectLogo}
        alt={`logo of ${data.companyName}`}
        width={512}
        height={512}
        className="absolute rounded-[40px] min-h-[320px] w-[320px] lg:h-[384px] lg:w-[384px]"
      />
      <div className="group relative min-h-[320px] w-[320px] min-w-fit rounded-[35px] bg-gradient-to-t from-blueprint/70 from-25% to-blueprint/15 to-65% md:h-full md:w-full lg:h-[384px] lg:w-[384px]">
        <span className="group:transition absolute inset-x-0 bottom-0 translate-y-10 px-5 pb-10 text-center text-white duration-300 ease-in-out group-hover:translate-y-0">
          <h2 className="line-clamp-2 text-3xl font-semibold">{data.companyName}</h2>
          <p className="group:transition line-clamp-1 h-8 text-lg opacity-0 duration-300 ease-in-out group-hover:opacity-100">
            {data.productName}
          </p>
        </span>
        <Link href={'/projects/' + data.slug} className="absolute h-full w-full" />
        <Link href={data.url || ''} className="absolute right-2 top-2">
          <div>
            {/* <IoLogoGithub className="transition-color h-20 w-20 rounded-full bg-blueprint-50 text-blueprint opacity-0 duration-300 ease-in-out hover:text-blueprint-300 group-hover:opacity-100" /> */}
          </div>
        </Link>
      </div>
    </div>
  )
}
