# Coop Tech

Production Next.js replica of the [School of Cooperative Technical Education](http://www.co-optech.org/) site. The public website is rendered from Payload CMS collections with authored fallbacks so pages stay complete if MongoDB is offline.

## Stack

- Next.js 16 App Router
- Payload CMS 3 (`/admin`)
- MongoDB via `@payloadcms/db-mongodb`
- Tailwind CSS 4 + Once UI tokens
- Vercel Blob for partner and brand images
- Mapbox campus map on Contact

## Prerequisites

- Node.js 22 (Vercel also supports 24; this repo is pinned to 22.x)
- pnpm 11
- Docker (for local MongoDB) **or** a MongoDB Atlas connection string

## Setup

```bash
cp .env.example .env
pnpm install
```

Set a unique `PAYLOAD_SECRET` before any production deploy.

## Environment variables

These names are what the app reads. Set them in `.env` locally and in the Vercel project for production:

| Variable | Required | Purpose |
| --- | --- | --- |
| `PAYLOAD_SECRET` | yes | CMS encryption secret |
| `DATABASE_URL` | yes | MongoDB connection string |
| `NEXT_PUBLIC_SERVER_URL` | yes | Canonical site URL, no trailing slash |
| `MAPBOX_TOKEN` | contact map | Public `pk.*` Mapbox token |
| `BLOB_READ_WRITE_TOKEN` | media uploads | Vercel Blob token (auto-added when the store is connected) |
| `TWO_FACTOR_ENCRYPTION_KEY` | yes (admin MFA) | 64-character hex key that encrypts authenticator secrets. Generate with `openssl rand -hex 32` |

## MongoDB

**Local (Docker)**

```bash
pnpm run db:up
```

This starts MongoDB 7 on `127.0.0.1:27017` with database `cooptech`. Stop it with `pnpm run db:down`.

**Remote (Atlas)**

Set `DATABASE_URL` in `.env` to your Atlas connection string.

## Run the app and CMS

```bash
pnpm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Payload admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Create the first admin user on `/admin` the first time you connect to a fresh database.

### Seed mirrored content

With MongoDB running:

```bash
pnpm run seed
```

This upserts pages, programs, staff, announcements, and navigation from `src/data`.

## Production (Vercel)

1. Import [https://github.com/jjaramillodoe/cooptech](https://github.com/jjaramillodoe/cooptech) into Vercel.
2. Add the environment variables above for Production (and Preview if needed).
3. Connect the public Blob store so `BLOB_READ_WRITE_TOKEN` is injected.
4. Deploy, open `/admin`, create the first user, then run seed against production Mongo if the CMS is empty.
5. Set `TWO_FACTOR_ENCRYPTION_KEY` in Vercel. After the first password login, CMS users are sent to **Account** to scan a QR code in an authenticator app. Later logins require that 6-digit code.

Contact form email is sent by Power Automate, not by the site. The flow steps are in [docs/power-automate-contact-emails.md](docs/power-automate-contact-emails.md).

## Playwright capture

```bash
pnpm exec playwright install chromium
pnpm run capture
```

Screenshots land in `scripts/output/` (gitignored).

## Routes

- `/` Home
- `/programs` and `/programs/[slug]`
- `/admissions`
- `/about`, `/principals-message`, `/staff`
- `/contact`
- `/faq`
- `/adult-education`
- `/admin` CMS
