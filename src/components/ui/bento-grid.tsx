import { cn } from '@/utilities/ui'
import Link from 'next/link'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 auto-rows-[20rem] md:auto-rows-[18rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href = '',
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  href?: string
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'group shadow-input hover:ring-4 ring-blueprint-dark col-span-1 row-span-1 overflow-hidden relative flex flex-col space-y-4 rounded-[30px] duration-200 hover:scale-102',
        className,
      )}
    >
      {header && <div className="absolute h-full w-full inset-0 object-cover">{header}</div>}
      <div className="text-[#E7F2FD] h-full absolute bottom-0 left-0 py-4 px-4 w-full bg-gradient-to-t from-blueprint-dark/90 from-5% to-blueprint-dark/15 to-65%">
        {icon}
        <div className="text-white overflow-hidden absolute bottom-4 left-4 max-w-[90%]">
          <h2 className="mt-2 text-white transition-transform duration-300 ease-in-out supports-hover:md:translate-y-18 supports-hover:md:group-hover:translate-y-0 font-bold truncate">
            {title}
          </h2>
          <p className="font-normal h-18 transition-transform duration-300 ease-in-out supports-hover:md:translate-y-100 supports-hover:md:group-hover:translate-y-0 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
