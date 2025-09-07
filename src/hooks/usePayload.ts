import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function accessPayload() {
  const payload = await getPayload({ config: configPromise })

  return { payload, configPromise }
}
