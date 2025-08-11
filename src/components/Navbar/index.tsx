import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import logo from '@/app/(frontend)/_assets/blueprint_banner_negative.svg'
import Link from 'next/link'
import NavbarMobile from './NavbarMobile'
import NavbarLinkItem from './NavbarLinkItem'
import { cn } from '@/utilities/ui'

function MainLink() {
  return (
    <Link href="/">
      <div className={`relative w-[200px] pt-2 md:w-[150px] md:pt-0`}>
        <Image src={logo} alt="blueprint logo" />
      </div>
    </Link>
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ pages }: { pages: any[] }) {
  return (
    <div className="sticky top-0 z-[999] h-[80px]">
      <div className="flex h-[80px] justify-center bg-blueprint">
        <div className={`mx-4 flex w-full flex-row items-center justify-between container`}>
          <MainLink />

          <div className={`hidden flex-row space-x-12 md:flex`}>
            {pages.map((page, index) => (
              <NavbarLinkItem key={index} page={page} />
            ))}
          </div>

          <NavbarMobile data={pages} />
        </div>
      </div>

      {/* Blank space hidden under navbar */}
    </div>
  )
}
