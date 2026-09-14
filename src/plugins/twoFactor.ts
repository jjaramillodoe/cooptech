import { twoFactorPlugin } from '@plutotcool/payload-plugin-two-factor'

import { twoFactorEncryptionKey } from '../lib/env'

export const twoFactor = twoFactorPlugin({
  collection: 'users',
  issuer: 'Coop Tech CMS',
  encryptionKey: twoFactorEncryptionKey,
  disabled: twoFactorEncryptionKey.length !== 64,
})
