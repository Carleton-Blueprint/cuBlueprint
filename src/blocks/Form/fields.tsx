import { Checkbox } from './Checkbox'
import { Country } from './Country'
import { Email } from './Email'
import { Message } from './Message'
import { Number } from './Number'
import { Select } from './Select'
import { State } from './State'
import { Text } from './Text'
import { Textarea } from './Textarea'

import { CustomText } from './CustomText'
import { CustomEmail } from './CustomEmail'

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
}

export const customFields = {
  checkbox: Checkbox,
  country: Country,
  email: CustomEmail,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: CustomText,
  textarea: Textarea,
}
