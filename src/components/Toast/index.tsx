import { toast } from 'sonner'
import Fail from './_assets/fail-sign.svg'
import Success from './_assets/pass-sign.svg'
import Warning from './_assets/warning-sign.svg'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { FaGear } from 'react-icons/fa6'

export function SuccessToast(title?: string, message?: string) {
  toast.custom(
    (id) => (
      <div className="rounded-lg bg-white px-4 py-2 shadow-md w-96 ring-2 ring-blueprint-dark hover:ring-3 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3">
          <Image src={Success} alt="Success" width={100} height={100} className="w-1/6" />
          <div className="flex self-start flex-col w-9/12">
            {!title && !message && <h1 className="text-lg font-bold text-blueprint">Success!</h1>}
            {title && <h1 className="text-lg font-bold text-blueprint">{title}</h1>}
            {message && <p className="text-sm font-semibold text-black">{message}</p>}
          </div>
          <Button
            onClick={() => toast.dismiss(id)}
            variant="ghost"
            size="icon"
            className="w-1/12 cursor-pointer text-gray-500 hover:text-black rounded-full h-fit hover:bg-gray-200 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    {
      duration: 30000,
    },
  )
}

export function WarningToast(title?: string, message?: string) {
  toast.custom(
    (id) => (
      <div className="rounded-lg bg-white px-4 py-2 shadow-md w-96 ring-2 ring-blueprint-dark hover:ring-3 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3">
          <Image src={Warning} alt="Warning" width={100} height={100} className="w-1/6" />
          <div className="flex flex-col w-9/12 self-start">
            {!title && !message && <h1 className="text-lg font-bold text-yellow-500">Warning!</h1>}
            {title && <h1 className="text-lg font-bold text-yellow-500">{title}</h1>}
            {message && <p className="text-sm font-semibold text-black">{message}</p>}
          </div>
          <Button
            onClick={() => toast.dismiss(id)}
            variant="ghost"
            size="icon"
            className="w-1/12 cursor-pointer text-gray-500 hover:text-black rounded-full h-fit hover:bg-gray-200 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    {
      duration: 30000,
    },
  )
}

export function LoadingToast(title?: string, message?: string) {
  toast.custom(
    (id) => (
      <div className="rounded-lg bg-white px-4 py-2 shadow-md w-96 ring-2 ring-blueprint-dark hover:ring-3 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3">
          <div className="relative w-1/6 flex justify-center items-center">
            <FaGear className="animate-[spin_2s_linear_infinite] duration-300 h-10 w-10 text-blueprint" />
            {/* <Image src={Rectangle} alt="Loading" width={100} height={100} className="h-14" /> */}
          </div>
          <div className="flex flex-col w-9/12 self-start">
            {!title && !message && (
              <h1 className="text-lg font-bold text-blueprint animate-pulse">Loading...</h1>
            )}
            {title && <h1 className="text-lg font-bold text-blueprint animate-pulse">{title}</h1>}
            {message && <p className="text-sm font-semibold text-black">{message}</p>}
          </div>
          <Button
            onClick={() => toast.dismiss(id)}
            variant="ghost"
            size="icon"
            className="w-1/12 cursor-pointer text-gray-500 hover:text-black rounded-full h-fit hover:bg-gray-200 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    {
      duration: 30000,
    },
  )
}

export function ErrorToast(title?: string, message?: string) {
  toast.custom(
    (id) => (
      <div className="rounded-lg bg-white px-4 py-2 shadow-md w-96 ring-2 ring-blueprint-dark hover:ring-3 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-3">
          <Image src={Fail} alt="Error" width={100} height={100} className="w-1/6" />
          <div className="flex flex-col w-9/12 self-start">
            {!title && !message && <h1 className="text-lg font-bold text-red-500">Error!</h1>}
            {title && <h1 className="text-lg font-bold text-red-500">{title}</h1>}
            {message && <p className="text-sm font-semibold text-black">{message}</p>}
          </div>
          <Button
            onClick={() => toast.dismiss(id)}
            variant="ghost"
            size="icon"
            className="w-1/12 cursor-pointer text-gray-500 hover:text-black rounded-full h-fit hover:bg-gray-200 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    {
      duration: 30000,
    },
  )
}
