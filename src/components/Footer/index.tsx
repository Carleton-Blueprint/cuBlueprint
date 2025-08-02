import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '@/app/(frontend)/_assets/blueprint_banner_negative.svg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Footer({ pages }: { pages: any[] }) {
  return (
    <div className="flex w-full bg-blueprint text-white pb-10 pt-8">
      <div className="w-full container">
        <div className="flex space-x-6">
          <div className="flex w-1/3 flex-col justify-center space-y-1 text-2xl md:space-y-3">
            {pages.map((page, index) => (
              <Link key={index} href={page.href} className="hover:text-blueprint-100">
                {page.name}
              </Link>
            ))}
          </div>

          <div className={`flex w-2/3 flex-col justify-center text-[14px] md:text-[18px]`}>
            <Link href="/" className={`flex pb-2 md:flex-row-reverse`}>
              <Image
                src={logo}
                alt="blueprint logo"
                className={`w-[300px] rounded-md transition duration-300 ease-in-out hover:shadow-xl md:w-[250px]`}
              />
            </Link>
            <div className={`md:w-full md:text-end`}>{'Made with ❤️ by cuBlueprint'}</div>
            <div className={`md:w-full md:text-end`}>@ Carleton University</div>
            <div className={`mt-1 text-[16px] md:text-end md:text-[20px]`}>
              Ottawa, Ontario, Canada
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
