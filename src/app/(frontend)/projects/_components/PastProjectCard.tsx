import React from 'react'
import Image from 'next/image'
import { CardContent, CardTitle } from '@/components/ui/card'
import { Project } from '@/payload-types'

export default function PastProjectCard({ data }: { data: Project }) {
  return (
    <div className="relative">
      <a href={'/projects/' + data.slug}>
        <div className="flex max-h-[500px] min-h-[400px] flex-col items-center justify-end rounded-[40px] bg-gradient-to-t from-[#0170DC] to-[#6191BC] p-4 transition-all duration-150 ease-in-out hover:outline hover:outline-4 hover:outline-white">
          {data.image && (
            <div className="mb-4">
              <Image
                src={typeof data.image === 'string' ? data.image : data.image?.url || ''}
                alt={data.companyName}
                width={250}
                height={250}
                className="h-48 w-48 object-fill"
              />
            </div>
          )}
          <div className="flex flex-col items-center gap-4 text-center">
            <CardTitle className="flex text-4xl text-white md:h-[80px] md:items-center">
              {data.companyName}
            </CardTitle>
            <CardContent className="text-2xl text-white md:text-base">
              <p className="hidden h-[100px] md:line-clamp-4">{data.description}</p>
              <p className="block md:hidden">{data.productName}</p>
            </CardContent>
          </div>
        </div>
      </a>
    </div>
  )
}
