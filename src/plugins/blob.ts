import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { blobToken } from '../lib/env'

export const blobStorage = vercelBlobStorage({
  enabled: Boolean(blobToken),
  collections: {
    media: true,
  },
  token: blobToken,
})
