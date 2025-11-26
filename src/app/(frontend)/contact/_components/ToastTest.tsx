'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ErrorToast, LoadingToast, SuccessToast, WarningToast } from '@/components/Toast'

export default function ToastTest() {
  return (
    <>
      <Button
        onClick={() =>
          SuccessToast('Sent!', 'Thanks for reaching! Expect a confirmation email shortly.')
        }
      >
        Success
      </Button>
      <Button onClick={() => toast.info('Info test message!')}>Info</Button>
      <Button
        onClick={() =>
          LoadingToast('Working on it...', 'Please wait while we process your request.')
        }
      >
        Loading
      </Button>
      <Button onClick={() => toast.message('Message!')}>Message</Button>
      <Button
        onClick={() =>
          WarningToast(
            'Unexpected response from server',
            "Watch for a confirmation email in the next 30 minutes. If you don't receive one, try sending a message again later.",
          )
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          ErrorToast('Uh oh!', 'There was an error sending your message. Please try again later')
        }
      >
        Error
      </Button>
      <Button
        onClick={() => {
          const id = toast.getToasts()[0]?.id
          if (id) toast.dismiss(id)
        }}
      >
        Dismiss Oldest
      </Button>
    </>
  )
}
