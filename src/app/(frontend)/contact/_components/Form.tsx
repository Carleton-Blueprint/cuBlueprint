'use client'
import { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
// import { useToast } from '@/components/ui/use-toast';
import { FormProvider, useForm } from 'react-hook-form'
// import ReCAPTCHA from 'react-google-recaptcha';
import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientSideURL } from '@/utilities/getURL'
import { Button } from '@/components/ui/button'
import { customFields } from '@/blocks/Form/fields'
import { Loader2 } from 'lucide-react'
import { ErrorToast, SuccessToast } from '@/components/Toast'

interface FormWithToast extends Omit<FormType, 'confirmationType'> {
  confirmationType: 'message' | 'redirect' | 'toast'
  toastMessage?: string
}

export default function Form({ form }: { form: FormWithToast }) {
  // const [email, setEmail] = useState('')
  // const [name, setName] = useState('')
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  // if (!form) {
  //   return <div>Form not found</div>
  // }

  const formMethods = useForm({
    defaultValues: form.fields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  // const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  // const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      console.log('onSubmit data', data)
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        console.log('submitForm data', data)
        // setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: form.id,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            // setError({
            //   message: res.errors?.[0]?.message || 'Internal Server Error',
            //   status: res.status,
            // })
            ErrorToast(
              res.status ? res.status + ' Error' : 'Error',
              res.errors?.[0]?.message || "We couldn't send your message. Please try again later.",
            )

            return
          }

          setIsLoading(false)
          // setHasSubmitted(true)
          console.log('onSubmit form.confirmationType', form.confirmationType)

          if (form.confirmationType === 'redirect' && form.redirect) {
            const { url } = form.redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          } else if (form.confirmationType === 'toast' && form.toastMessage) {
            formRef.current?.reset()
            SuccessToast('Sent!', form.toastMessage)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          // setError({
          //   message: 'Something went wrong.',
          // })
          ErrorToast('Error', "We couldn't send your message. Please try again later.")
        }
      }

      void submitForm()
    },
    [router, form.id, form.redirect, form.confirmationType, form.toastMessage],
  )

  return (
    <div>
      <FormProvider {...formMethods}>
        {/* {!isLoading && hasSubmitted && form.confirmationType === 'toast' && (
          <RichText data={form.confirmationMessage} />
        )} */}

        {/* {isLoading && !hasSubmitted && <p>Loading, please wait...</p>} */}
        {/* {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>} */}
        <form id={form.id} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-4 last:mb-0">
            {form &&
              form.fields &&
              form.fields?.map((field, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> =
                  customFields?.[field.blockType as keyof typeof customFields]
                if (Field) {
                  return (
                    <div className="mb-6 last:mb-0" key={index}>
                      <Field
                        form={form}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                }
                return null
              })}
          </div>

          <Button
            form={form.id}
            type="submit"
            variant="outline"
            className="w-full hover:bg-blueprint-300 active:bg-blueprint-400 border-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {form.submitButtonLabel}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
