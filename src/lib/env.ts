export const siteUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL_PROD ||
  'http://localhost:3000'

export const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN_PROD
