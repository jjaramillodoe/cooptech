import { importExportPlugin } from '@payloadcms/plugin-import-export'

export const importExport = importExportPlugin({
  collections: [
    {
      slug: 'contact-submissions',
      export: {
        disableJobsQueue: true,
      },
      import: false,
    },
  ],
  overrideExportCollection: ({ collection }) => ({
    ...collection,
    access: {
      ...collection.access,
      create: ({ req }) => Boolean(req.user),
      read: ({ req }) => Boolean(req.user),
      update: ({ req }) => Boolean(req.user),
      delete: ({ req }) => Boolean(req.user),
    },
  }),
})
