import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function usePayload() {
  const payload = await getPayload({ config: configPromise })

  return { payload, configPromise }
}
