import type { Endpoint } from 'payload'

import fs from 'fs/promises'
import path from 'path'
import { ImageResponse } from 'next/og'

import { getServerSideURL } from '@/utilities/getURL'

const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf')
let fontDataPromise: Promise<Buffer | null> | null = null

async function readFontData() {
  if (!fontDataPromise) {
    fontDataPromise = fs.readFile(fontPath).catch((_error) => null)
  }

  return fontDataPromise
}

export const ogEndpoint: Endpoint = {
  method: 'get',
  path: '/og',
  handler: async (req) => {
    try {
      const { searchParams } = new URL(req.url ?? `${getServerSideURL()}/api/og`)
      const title = (searchParams.get('title') || 'Carleton Blueprint').slice(0, 100)
      const description = (searchParams.get('description') || 'Open Graph preview').slice(0, 180)

      const fontData = await readFontData()

      return new ImageResponse(
        (
          <div
            style={{
              alignItems: 'flex-start',
              background:
                'linear-gradient(135deg, #0b1f33 0%, #123a66 45%, #1f6aa5 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Arial, sans-serif',
              height: '100%',
              justifyContent: 'space-between',
              padding: '64px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.14)',
                  borderRadius: '999px',
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '12px 20px',
                  textTransform: 'uppercase',
                  width: 'fit-content',
                }}
              >
                Carleton Blueprint
              </div>
              <h1
                style={{
                  fontSize: 78,
                  lineHeight: 1,
                  margin: 0,
                  maxWidth: '900px',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.84)',
                  fontSize: 34,
                  lineHeight: 1.25,
                  margin: 0,
                  maxWidth: '900px',
                }}
              >
                {description}
              </p>
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              cublueprint.org
            </div>
          </div>
        ),
        {
          ...(fontData
            ? {
                fonts: [
                  {
                    data: fontData,
                    name: 'Arial',
                    style: 'normal',
                    weight: 400,
                  },
                ],
              }
            : {}),
          height: 630,
          width: 1200,
        },
      )
    } catch (error) {
      req.payload.logger.error({ err: error }, 'Error generating Open Graph image')
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  },
}