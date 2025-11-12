import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { InputHTMLAttributes } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { cn } from '@/utilities/ui'

export const CustomText: React.FC<
  TextField &
    InputHTMLAttributes<HTMLInputElement> & {
      errors: Partial<FieldErrorsImpl>
      register: UseFormRegister<FieldValues>
    }
> = ({ name, defaultValue, errors, label, register, required, width, className, ...props }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="text-lg">
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { required })}
        className={cn(
          'border-t-0 border-b-2 border-x-0 rounded-none focus-visible:rounded focus-visible:ring-1 focus-visible:border-0',
          className,
        )}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
