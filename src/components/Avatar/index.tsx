'use client'
import Image, { StaticImageData } from 'next/image'
import bunny from '/public/media/bunny.svg'
import { useAuth } from '@payloadcms/ui'
import { User } from '@/payload-types'
// import usePayload from '@/hooks/usePayload'

export default function Avatar() {
  const { user } = useAuth<User>()
  if (!user) return null
  const avatar =
    !user.avatar || typeof user.avatar === 'string' || !user.avatar.url
      ? (bunny as StaticImageData)
      : user.avatar.url
  //   const { payload } = await usePayload()
  //   const image = payload.find({ collection: 'users', user: user.id, select: { avatar: true } })
  //   console.log(image)
  return (
    <div
      style={{
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid white',
        backgroundColor: '#E5E7EB',
      }}
    >
      <Image src={avatar} alt="User Avatar" layout="fill" objectFit="cover" />
    </div>
  )
}
