# Deploying Castora on Railway

Castora runs as four services in one Railway project:

| Service | What it does |
|---|---|
| `castora` | This repo: backend, frontend and orchestrator behind nginx, built from `Dockerfile.dev` |
| `Postgres` | The app database |
| `Redis` | Cache and short-lived state |
| `temporal` | Schedules and publishes posts (Temporal server with its own Postgres) |

## 1. Create the project and databases

1. Create a new project in Railway.
2. **+ New → Database → PostgreSQL.**
3. **+ New → Database → Redis.**

## 2. Add Temporal

1. **+ New → Template**, search for **"Temporal | Durable Workflows, No Elasticsearch"** ([template](https://railway.com/deploy/temporal-or-durable-workflows-no-elastic)) and deploy it into the same project.
2. Make sure the Temporal server service is named `temporal`. The template already sets `BIND_ON_IP=::`, which Railway's IPv6 private network needs.

Castora connects to `temporal.railway.internal:7233` and registers everything it needs on first start.

## 3. Add the app

1. **+ New → GitHub Repo**, pick this repository and the branch to deploy.
2. `railway.toml` makes Railway build `Dockerfile.dev`. The first build takes 10 to 15 minutes. Give the service at least 2 GB of RAM.
3. **Settings → Volumes:** add a volume mounted at `/uploads`. Uploaded media lives there and is served at `https://<domain>/uploads/...`, which is the URL Instagram, TikTok and Threads download media from.
4. **Settings → Networking:** generate a domain (or add your custom domain) with **target port `5000`**. Do not add a `PORT` variable: the backend uses `PORT` for itself and would collide with nginx.

## 4. Variables of the `castora` service

```
FRONTEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
MAIN_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_BACKEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}/api
BACKEND_INTERNAL_URL=http://localhost:3000
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}?family=0
TEMPORAL_ADDRESS=temporal.railway.internal:7233
JWT_SECRET=<output of: openssl rand -hex 32>
IS_GENERAL=true
STORAGE_PROVIDER=local
UPLOAD_DIRECTORY=/uploads
NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY=/uploads
TERMS_URL=https://<your site>/terms
PRIVACY_URL=https://<your site>/privacy
```

- With a custom domain, use it instead of `${{RAILWAY_PUBLIC_DOMAIN}}`, for example `https://app.example.com`.
- `?family=0` lets the Redis client reach Redis over Railway's IPv6 private network.
- `JWT_SECRET` signs logins **and encrypts the keys saved in Settings > API Keys**. Never change it after launch, or every saved key has to be entered again.
- To store media in Cloudflare R2 instead of the volume, set `STORAGE_PROVIDER=cloudflare` and the `CLOUDFLARE_*` variables from `.env.example`.

## 5. First start

1. On every start the container updates the database tables, then starts all apps.
2. Open the domain and create the first account. **The first account of a new install is the super admin.**
3. Open **Settings → API Keys** and add OpenAI, email (Resend or SMTP) and the social channels. Each channel card links to the platform's developer console and shows the callback URL to register in the developer app. Users then connect their own accounts by logging in to each platform, they never handle API keys.

## Updating

Push to the deployed branch. Railway rebuilds and redeploys, and database changes apply on start.

## License

Castora is based on [Postiz](https://github.com/gitroomhq/postiz-app) (AGPL-3.0). Running it publicly means offering its users the source code of this version, for example with a link to the repository in the app.
