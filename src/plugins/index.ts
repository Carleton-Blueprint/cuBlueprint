import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { verifyTurnstileToken } from '@/utilities/verifyTurnstile'
import sanitizeHtml from 'sanitize-html'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      hooks: {
        beforeValidate: [
          async ({ data, req }) => {
            const captchaToken = req.headers.get('x-captcha-token') ?? undefined

            const verificationResult = await verifyTurnstileToken(captchaToken)

            if (!verificationResult.success) {
              throw new Error(verificationResult.message)
            }

            return data
          },
          // Sanitize submission values to strip any HTML/JS before storing
          async ({ data }) => {
            try {
              if (data && Array.isArray(data.submissionData)) {
                data.submissionData = data.submissionData.map(
                  (item: { field: string; value: string; id?: string | null }) => {
                    if (item && typeof item.value === 'string') {
                      return {
                        ...item,
                        value: sanitizeHtml(item.value, {
                          allowedTags: [],
                          allowedAttributes: {},
                        }),
                      }
                    }
                    return item
                  },
                )
              }
            } catch (_err) {
              // If sanitization fails, reject the submission
              throw new Error('Failed to sanitize submission data')
            }

            return data
          },
        ],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        defaultFields.splice(4, 0, {
          name: 'toastMessage',
          type: 'text',
          required: true,
          admin: {
            condition: (data) => data.confirmationType === 'toast',
          },
        })
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationType') {
            return {
              ...field,
              options: [
                { label: 'Message', value: 'message' },
                { label: 'Redirect', value: 'redirect' },
                { label: 'Toast', value: 'toast' },
              ],
            }
          }
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
