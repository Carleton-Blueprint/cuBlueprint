'use client'

import React from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { loginAction } from '.'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsCheck } from 'react-icons/bs'
import { useAuth } from '@payloadcms/ui'
import { User } from '@/payload-types'

export default function LoginForm() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()
  const { user } = useAuth<User>()
  if (user) {
    router.push('/admin')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await loginAction({ email, password })
      setLoading(false)
      setSuccess(true)
      router.push('/admin')
    } catch (error) {
      setLoading(false)
      setError(error instanceof Error ? error.message : 'Login failed: Unknown error occurred.')
      setPassword('')
    }
  }

  return (
    <div
      className="center-div"
      style={{
        backgroundColor: '#041122',
        flexDirection: 'column',
        gap: '30px',
      }}
    >
      <Image
        src="/media/blueprint.svg"
        alt="Blueprint Logo"
        width={400}
        height={100}
        style={{
          borderRadius: '24px',
          userSelect: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          backgroundColor: '#0A1E3A',
          gap: '20px',
          borderRadius: '24px',
          padding: '40px',
          width: '600px',
        }}
      >
        <Input
          placeholder="Email"
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '75%',
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '75%',
          }}
        />
        <Button
          className="button-primary"
          onClick={onSubmit}
          style={{
            width: '25%',
            fontSize: '16px',
            padding: '8px',
            border: '2px solid #0060c0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
          disabled={loading}
        >
          {loading && <AiOutlineLoading className="animate-spin" />}
          {success && <BsCheck />}
          {loading ? 'Loading' : success ? 'Success' : 'Login'}
        </Button>
        {error && <p style={{ color: '#8B0000' }}>{error}</p>}
      </div>
    </div>
  )
}
