import Image from 'next/image'
import Link from 'next/link'
import type { DefaultServerCellComponentProps } from 'payload'

export default async function Cell({
  collectionSlug,
  rowData,
  cellData,
  payload,
  link,
  onClick,
}: DefaultServerCellComponentProps) {
  const res = await payload.find({
    collection: 'media',
    where: {
      id: {
        equals: cellData,
      },
    },
  })
  const image = res.docs[0]
  return (
    <>
      {link ? (
        <Link
          href={`/admin/collections/students/${rowData.id}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {image ? (
            <Image
              src={image.url || ''}
              alt={image.alt || ''}
              className="students-image-field"
              width={75}
              height={50}
            />
          ) : (
            'No Image Found'
          )}
        </Link>
      ) : (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={onClick && (() => onClick({ cellData, collectionSlug, rowData }))}
        >
          {image ? (
            <Image src={image.url || ''} alt={image.alt || ''} width={75} height={50} />
          ) : (
            'No Image Found'
          )}
        </div>
      )}
    </>
  )
}
