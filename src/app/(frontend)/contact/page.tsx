import React from 'react'
import BlockContainer from '@/components/BlockContainer'

import { FaDiscord } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import Form from './_components/Form'

import Link from 'next/link'
import accessPayload from '@/hooks/usePayload'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

export default async function Page() {
  const { payload } = await accessPayload()
  const res = await payload.find({
    collection: 'forms',
    where: {
      id: {
        equals: '68602758cd9d47ee2a745373',
      },
    },
  })
  const form = res?.docs?.[0] as FormType | undefined
  return (
    <div className="h-[calc(100vh-80px)] bg-blueprint">
      <BlockContainer
        roundedCorners="bottom"
        bg="white"
        padding="more"
        margin="bottom"
        title="Come join the conversation!"
        titleSize="md"
      >
        {/* would be cool if we could make these links slide left to right like an infinite banner */}
        <div className="flex gap-2">
          <Link
            href="https://discord.com"
            className="bg-blueprint flex gap-3 items-center group w-fit px-6 py-2 rounded-lg"
          >
            <FaDiscord className="size-16 group-hover:scale-110 transition-transform duration-150 text-blueprint-50" />
            <div className="flex gap-4 items-center">
              <h2 className="text-4xl font-bold text-blueprint-50 group-hover:underline">
                Join our Discord
              </h2>
              {/* <Image src={SpeechHappy} alt="Happy speech bubble" className="size-32" /> */}
            </div>
          </Link>
          <Link
            href="https://instagram.com"
            className="bg-blueprint flex gap-3 items-center group w-fit px-6 py-2 rounded-lg"
          >
            <FaInstagram className="size-16 group-hover:scale-110 transition-transform duration-150 text-blueprint-50" />
            <div className="flex gap-4 items-center">
              <h2 className="text-4xl font-bold text-blueprint-50 group-hover:underline">
                Follow us on Instagram
              </h2>
              {/* <Image src={SpeechHappy} alt="Happy speech bubble" className="size-32" /> */}
            </div>
          </Link>
        </div>
      </BlockContainer>
      <BlockContainer bg="blueprint" className={'w-full'}>
        <div className="flex flex-col justify-between gap-24pt-[5px] text-lg text-white md:flex-row">
          <div className="w-full md:w-1/3">
            <Form form={form} />
          </div>
        </div>
      </BlockContainer>
    </div>
  )
}
