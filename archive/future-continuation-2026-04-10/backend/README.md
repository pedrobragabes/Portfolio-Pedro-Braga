# Backend API Foundation

Node.js + Express backend created for Sprint 5.

## Run locally

1. Install dependencies in the project root:
   - `npm install`
2. Start the API server:
   - `npm run api:dev`

Default URL: `http://localhost:8787`

## Environment

Use `backend/.env.example` as reference for:

- Contact rate-limit and storage settings
- Admin auth credentials/token settings
- Blog database path

## Endpoints

- `GET /health`
- `GET /api/health`
- `POST /api/contact`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/blog/posts`
- `GET /api/blog/posts/:slug`

Admin auth:

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`

Admin blog management (Bearer token required):

- `GET /api/admin/blog/posts`
- `GET /api/admin/blog/posts/:slug`
- `POST /api/admin/blog/posts`
- `PUT /api/admin/blog/posts/:slug`
- `DELETE /api/admin/blog/posts/:slug`

## Notes

- Contact messages are persisted in `backend/storage/contact-submissions.jsonl`.
- The contact endpoint includes input validation, honeypot handling, and rate limiting.
- Projects are served from `data/projects.json`.
- Blog posts are now persisted in a SQLite database (`backend/storage/blog-posts.db`).
- On first API startup, blog posts are seeded from `blog/posts/*.md` if the table is empty.
- Admin auth uses signed bearer tokens and supports either `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`.
