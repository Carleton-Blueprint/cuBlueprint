import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  // let logo = null
  // if ('logo' in headerData) {
  //   logo = headerData.logo
  // } else {
  //   return null
  // }

  // console.log('headerData.logo: ', headerData.logo)
  if ('logo' in headerData) {
    return <HeaderClient data={headerData} />
  } else {
    return null
  }
}
