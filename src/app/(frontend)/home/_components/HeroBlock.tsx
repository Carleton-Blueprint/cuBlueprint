import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import home from '../_assets/home.svg'
import mobileHome from '../_assets/mobileHero.svg'
import button from '../_assets/button.svg'

export default async function HeroBlock() {
  return (
    <div className="relative h-fit overflow-hidden bg-[#0A1E3A]">
      <div className="container flex h-[calc(100vh-80px)] w-full pt-12">
        <div className="flex flex-col justify-around md:m-0 md:w-1/2 md:items-center md:justify-center md:pt-0">
          <div className="top-0 md:w-full h-min items-center text-white">
            <h1 className="text-6xl font-bold">Carleton Blueprint</h1>
            <h2 className="mb-6 text-3xl">Tech for social good.</h2>
            <Link
              href={'https://discord.com/invite/7gkkW5nJPW'}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-[-10px] flex w-fit"
            >
              <button className="w-[150px] self-start rounded-full bg-blueprint px-5 py-2 font-bold text-white hover:bg-blueprint-300">
                Join Us
              </button>
            </Link>
            <Image src={button} alt="Join Us" />
          </div>
          <Image src={mobileHome} className="bottom-0 right-0 block w-full md:hidden" alt="Home" />
        </div>
      </div>
      <Image
        src={home}
        className="absolute left-[55%] top-0 hidden h-full w-auto md:block"
        alt="Home"
      />
    </div>
  )
}
