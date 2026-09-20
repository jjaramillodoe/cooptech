import { twoFactorPlugin } from '@plutotcool/payload-plugin-two-factor'
import type { PayloadHandler, Plugin, UIField } from 'payload'
import QRCode from 'qrcode'

import { twoFactorEncryptionKey } from '../lib/env'

const ISSUER = 'Coop Tech CMS'

const plugin = twoFactorPlugin({
  collection: 'users',
  issuer: ISSUER,
  encryptionKey: twoFactorEncryptionKey,
  disabled: twoFactorEncryptionKey.length !== 64,
})

async function toPngQr(secret: string, email: string) {
  const uri =
    `otpauth://totp/${encodeURIComponent(ISSUER)}:${encodeURIComponent(email)}` +
    `?secret=${secret}&issuer=${encodeURIComponent(ISSUER)}&algorithm=SHA1&digits=6&period=30`
  return QRCode.toDataURL(uri, {
    margin: 2,
    width: 220,
    errorCorrectionLevel: 'M',
  })
}

export const twoFactor: Plugin = async (config) => {
  const next = await plugin(config)
  return {
    ...next,
    endpoints: (next.endpoints ?? []).map((endpoint) => {
      if (endpoint.path !== '/two-factor/setup' || endpoint.method !== 'post') return endpoint
      const original = endpoint.handler as PayloadHandler
      return {
        ...endpoint,
        handler: (async (req) => {
          const response = await original(req)
          if (!response.ok) return response
          const data = (await response.json()) as { secret?: string; error?: string }
          if (!data.secret || data.error) return Response.json(data, { status: response.status })
          const email = typeof req.user?.email === 'string' ? req.user.email : 'user'
          return Response.json({
            secret: data.secret,
            qrCode: await toPngQr(data.secret, email),
          })
        }) as PayloadHandler,
      }
    }),
    collections: (next.collections ?? []).map((collection) => {
      if (collection.slug !== 'users') return collection
      return {
        ...collection,
        fields: collection.fields.map((field) => {
          if (field.type !== 'ui' || field.name !== 'twoFactor') return field
          const uiField = field as UIField
          return {
            ...uiField,
            admin: {
              ...uiField.admin,
              components: {
                Field: '/components/admin/TwoFactorField#TwoFactorFieldComponent',
              },
            },
          }
        }),
      }
    }),
  }
}
