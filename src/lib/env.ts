export const siteUrl = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL_PROD ||
  'http://localhost:3000'
).replace(/\/+$/, '')

export const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN_PROD

/** 64-character hex key used to encrypt TOTP secrets. Generate with: openssl rand -hex 32 */
export const twoFactorEncryptionKey = process.env.TWO_FACTOR_ENCRYPTION_KEY || ''
