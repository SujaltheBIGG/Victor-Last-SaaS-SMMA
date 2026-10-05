# Castora on one server (Oracle Cloud Always Free)

`docker-compose.yml` runs the app, Postgres, Redis, Temporal (Postgres-backed) and Caddy (HTTPS).

Next to it on the server:
- `.env` with `POSTGRES_PASSWORD=...`
- `castora.env` with the app settings (FRONTEND_URL, MAIN_URL, NEXT_PUBLIC_BACKEND_URL=<url>/api, DATABASE_URL, REDIS_URL=redis://redis:6379, TEMPORAL_ADDRESS=temporal:7233, JWT_SECRET, STORAGE_PROVIDER=local, UPLOAD_DIRECTORY=/uploads, NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY=/uploads, optional OPENAI_* keys)
- `Caddyfile`: `<domain> { reverse_proxy castora:5000 }`
- `app/`: this repository

Update: replace `app/` with the new code, then `sudo docker compose up -d --build castora`.
