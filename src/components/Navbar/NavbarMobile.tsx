// import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
// import { LucideMenu } from 'lucide-react'
// import NavbarLinkItem from './NavbarLinkItem'

// type PropType = {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data: any[]
// }

// /*
//   https://github.com/tailwindlabs/tailwindcss/discussions/3461
//   Weird problem caused by PurgeCSS.
//   <SheetTrigger className={`{breakpoint}:hidden`}> will not work as expected
// */
// const styles = {
//   sheetTrigger: {
//     xs: 'xs:hidden',
//     sm: 'sm:hidden',
//     md: 'md:hidden',
//     lg: 'lg:hidden',
//     xl: 'xl:hidden',
//   },
// }

// export default function NavbarMobile({ data }: PropType) {
//   return (
//     <Sheet>
//       <SheetTrigger className={styles.sheetTrigger['md']}>
//         <LucideMenu className="-pt-4 size-16 text-white" />
//       </SheetTrigger>
//       <SheetContent className="flex w-[250px] items-center justify-center bg-blueprint text-2xl">
//         <SheetHeader className="h-4/5">
//           <div className="flex h-3/6 flex-col justify-between">
//             {data.map((page, index) => (
//               <NavbarLinkItem key={index} page={page} />
//             ))}
//           </div>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   )
// }

'use client'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { IoMenu } from 'react-icons/io5'
import NavbarLinkItem from './NavbarLinkItem'
import { useState } from 'react'

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
}

/*
  https://github.com/tailwindlabs/tailwindcss/discussions/3461
  Weird problem caused by PurgeCSS.
  <SheetTrigger className={`{breakpoint}:hidden`}> will not work as expected
*/
const styles = {
  sheetTrigger: {
    xs: 'xs:hidden',
    sm: 'sm:hidden',
    md: 'md:hidden',
    lg: 'lg:hidden',
    xl: 'xl:hidden',
  },
}

export default function NavbarMobile({ data }: PropType) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={styles.sheetTrigger['md']}>
        <IoMenu className="-pt-4 size-14 text-white" />
      </SheetTrigger>
      <SheetContent
        side={'top'}
        className="top-[75px] flex w-[250px] items-center justify-center bg-blueprint text-2xl"
      >
        <SheetHeader className="h-4/5">
          <div className="flex h-3/6 flex-col justify-between">
            {data.map((page, index) => (
              <NavbarLinkItem key={index} page={page} setOpen={setOpen} />
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
