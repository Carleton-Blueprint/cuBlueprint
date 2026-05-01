'use server'
import React from 'react'
import type { Payload } from 'payload'
import { login } from '@payloadcms/next/auth'
import config from '@payload-config'
import LoginForm from './LoginForm'
import { useAuth } from '@payloadcms/ui'

export async function loginAction({ email, password }: { email: string; password: string }) {
  const result = await login({
    collection: 'users',
    config,
    email,
    password,
  })
  return result
}

export default async function CustomLogin({ payload }: { payload: Payload }) {
  return <LoginForm />
}
