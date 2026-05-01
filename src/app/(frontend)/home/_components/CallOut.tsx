'use client'
import Image from 'next/image'
import yellowCard from '../../_assets/yellow-card.svg'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

export default function CallOut() {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div className="bottom-10 left-10 fixed z-10 group ">
      <div
        className="absolute border-2 size-16 hover:ring-blueprint-dark hover:ring-2 duration-300 transition-all border-blueprint-dark z-20 rounded-full -bottom-8 -left-8 bg-white pl-1 pb-4"
        onClick={toggleVisibility}
        // onTransitionEnd={handleTransitionEnd}
      >
        <Image src={yellowCard} alt="" className="size-16" />
      </div>

      <div
        className={cn(
          'bg-white border-2 opacity-0 -translate-x-1/2 scale-0 translate-y-1/2 transition-all duration-300  text-black border-blueprint-dark px-4 py-5 rounded-xl w-fit max-w-96',
          {
            'translate-x-0 translate-y-0 opacity-100 scale-100': isVisible,
          },
        )}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis eveniet sunt porro
        praesentium sint modi quisquam nostrum, quasi ea earum reprehenderit accusantium similique
        deserunt ducimus accusamus atque! Quo, delectus officiis.
      </div>
    </div>
  )
}
