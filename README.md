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

The "Join Early Access" form posts to `POST /api/early-access`, which forwards the email to Telegram and stores nothing. It needs two Worker secrets (same bot and chat as the Kinwoo app's feedback form):

```bash
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```

For local dev, copy `.env.example` to `.env.local` and fill both in. The route checks the request origin, allows 1 request per IP per 60s (the `RATE_LIMITER` binding in `wrangler.toml`, in-memory locally), and silently drops honeypot hits.

`wrangler.toml` routes both `www.kinwoo.in` and `kinwoo.in` to the Worker. `www.kinwoo.in` is canonical. Requests to the apex get a 301 to www from `redirects()` in `next.config.ts`. The zone must be on Cloudflare DNS.
