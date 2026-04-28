type TurnstileVerificationResponse = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

type TurnstileVerificationResult = {
  success: boolean
  message: string
}

const turnstileVerifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const verifyTurnstileToken = async (
  token: string | undefined,
): Promise<TurnstileVerificationResult> => {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return {
      success: false,
      message: 'Turnstile is not configured on the server.',
    }
  }

  if (!token) {
    return {
      success: false,
      message: 'CAPTCHA verification failed. Please complete the CAPTCHA and try again.',
    }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  try {
    const res = await fetch(turnstileVerifyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      cache: 'no-store',
    })

    if (!res.ok) {
      return {
        success: false,
        message: 'Turnstile verification service is currently unavailable.',
      }
    }

    const result = (await res.json()) as TurnstileVerificationResponse

    if (!result.success) {
      return {
        success: false,
        message: 'CAPTCHA verification failed. Please try again.',
      }
    }

    return {
      success: true,
      message: 'CAPTCHA verified.',
    }
  } catch {
    return {
      success: false,
      message: 'Turnstile verification service is currently unavailable.',
    }
  }
}
