# kinwoo-landing

Coming-soon landing page for Kinwoo. Next.js 15 (App Router) + Tailwind v4, deployed to Cloudflare Workers with OpenNext.

## Commands

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:3002                |
| `npm run typecheck` | `tsc --noEmit`                                     |
| `npm run lint`      | ESLint + Prettier check                            |
| `npm run preview`   | Build with OpenNext and run in the Workers runtime |
| `npm run deploy`    | Build with OpenNext and `wrangler deploy`          |

## CI/CD

- Push to any branch except `main`: typecheck, build, OpenNext build, lint (`ci-feature.yml`).
- Push to `main`: the same checks (`ci-main.yml`). Nothing is deployed.
- Production deploys are manual: Actions → "Deploy Production" → Run workflow (`deploy-prod.yml`). Pick the branch or ref to deploy.

## Setup

The GitHub environment `production` needs the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and `NEXT_PUBLIC_SITE_URL` (secret or variable) set to `https://www.kinwoo.in`. If unset, it falls back to localhost.

`wrangler.toml` routes both `www.kinwoo.in` and `kinwoo.in` to the Worker. `www.kinwoo.in` is canonical. Requests to the apex get a 301 to www from `redirects()` in `next.config.ts`. The zone must be on Cloudflare DNS.
