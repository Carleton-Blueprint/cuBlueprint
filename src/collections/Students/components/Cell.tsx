import { Student } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Payload } from 'payload'
import type { DefaultServerCellComponentProps } from 'payload'

export default async function Cell({
  collectionSlug,
  rowData,
  cellData,
  payload,
  link,
  onClick,
}: DefaultServerCellComponentProps) {
  console.log('Cell data:', cellData)
  const res = await payload.find({
    collection: 'media',
    where: {
      id: {
        equals: cellData,
      },
    },
  })
  const image = res.docs[0]
  console.log(rowData)
  return (
    <>
      {link ? (
        <Link
          href={`/admin/collections/students/${rowData.id}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Image
            src={image.url || ''}
            alt={image.alt || ''}
            className="students-image-field"
            width={75}
            height={50}
          ></Image>
        </Link>
      ) : (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={onClick && (() => onClick({ cellData, collectionSlug, rowData }))}
        >
          <Image src={image.url || ''} alt={image.alt || ''} width={75} height={50}></Image>
        </div>
      )}
    </>
  )
}
