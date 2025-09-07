// import Link from 'next/link'

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function NavbarLinkItem({ page }: { page: any }) {
//   return (
//     <Link href={page.href} className="text-lg text-white hover:text-blueprint-100">
//       {page.name}
//     </Link>
//   )
// }

'use client'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

export default function NavbarLinkItem({
  page,
  setOpen,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any
  setOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const pathname = usePathname()
  return (
    <Link
      href={page.href}
      className={cn('text-2xl text-white hover:text-blueprint-100 md:text-lg', {
        'md:-mx2 rounded-lg bg-white px-2 text-blueprint hover:text-blueprint-300':
          pathname === page.href,
      })}
      onClick={setOpen ? () => setOpen((prev) => !prev) : undefined}
    >
      {page.name}
    </Link>
  )
}
