'use client'
import React, { useEffect, useRef, useImperativeHandle } from 'react'

type TurnstileWidgetInstance = {
  render: (
    container: HTMLDivElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback': () => void
    },
  ) => number
  reset: (widgetId: number) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileWidgetInstance
  }
}

type Props = {
  siteKey: string
  onChange: (token: string | null) => void
}

export type TurnstileHandle = {
  reset: () => void
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve()
    if (window.turnstile) return resolve()
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) return resolve()
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    document.head.appendChild(s)
  })
}

const TurnstileWidget = React.forwardRef<TurnstileHandle, Props>(({ siteKey, onChange }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<number | null>(null)

  useImperativeHandle(ref, () => ({
    reset: () => {
      try {
        if (typeof window !== 'undefined' && window.turnstile && widgetIdRef.current != null) {
          window.turnstile.reset(widgetIdRef.current)
        }
      } catch {
        // ignore
      }
    },
  }))

  useEffect(() => {
    let mounted = true
    void (async () => {
      await loadScript()
      if (!mounted) return
      if (!containerRef.current) return
      try {
        const t = typeof window !== 'undefined' ? window.turnstile : undefined
        if (t && containerRef.current) {
          widgetIdRef.current = t.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onChange(token),
            'expired-callback': () => onChange(null),
          })
        } else {
          // Turnstile not available yet; we'll skip rendering for now
          // it should be available after the script loads
        }
      } catch {
        // script might not be ready; ignore
      }
    })()

    return () => {
      mounted = false
    }
  }, [siteKey, onChange])

  return <div ref={containerRef} />
})

TurnstileWidget.displayName = 'TurnstileWidget'

export default TurnstileWidget
