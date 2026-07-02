# Hackathon Backend

A modern, scalable NestJS 11 backend built for the Hackathon.

## Tech Stack & Core Services

- **Framework:** NestJS 11 (Express adapter)
- **Database ORM:** Prisma ORM v7 with Prisma Postgres (managed, serverless database)
- **Security & Shield:** Arcjet (Shield Protection against SQL injection/XSS + Global Rate Limiting)
- **Authentication:** Better Auth integrated via `@thallesp/nestjs-better-auth` (Email/Password, custom String IDs, custom role field defaulting to `PARTICIPANT`)
- **Configuration:** Environment-driven via `.env` (automatically loaded on bootstrap)

---

## Folder Structure

The project strictly follows NestJS-first architecture guidelines:

```text
src/
├── common/              # Shared guards, interceptors, decorators
├── lib/                 # Infrastructure integration modules (marked @Global())
│   ├── arcjet/          # Arcjet security config and global guard registration
│   ├── auth/            # Better Auth static config and global NestJS integration module
│   └── database/        # Prisma service and global module configuration
├── module/              # Feature modules
│   └── user/            # User model logic and endpoints
├── main.ts              # App bootstrapper loading dotenv configuration
└── app.module.ts        # App root module importing lib and feature modules
```

---

## API Endpoints

### Authentication Endpoints (Better Auth)
Better Auth endpoints are mounted automatically under `/api/auth/*` (e.g., `/api/auth/sign-up/email`, `/api/auth/sign-in/email`, `/api/auth/ok`).
- `GET /api/auth/ok` - Health-check route for Better Auth. Returns `{ status: "ok" }`.

### User Endpoints
- `POST /user` - Register/sign up a new user manually (for development compatibility).
  - **Body:** `{"name": "Alice", "email": "alice@prisma.io"}`
- `GET /user/all` - Retrieve all users (Requires authentication session, Admin only).
- `GET /user/:id` - Retrieve a single user by ID (Requires authentication session; throws 404 if not found).

---

## Project Commands

### General
```bash
# install dependencies
$ npm install

# run in development watch mode
$ npm run start:dev

# build the project for production
$ npm run build

# run unit tests
$ npm run test
```

### Database (Prisma)
The following scripts have been added for database administration:
```bash
# format the schema.prisma file
$ npm run db:format

# run local development migrations and update the database schema
$ npm run db:migrate --name <migration_name>

# generate Prisma Client types
$ npm run db:generate

# push the schema state directly to the database without creating migrations
$ npm run db:push

# open Prisma Studio to view and edit database records
$ npm run db:studio
```

---

## Security

Global rate limits and Shield protections are configured globally using **Arcjet** inside `src/lib/arcjet/`.
- Rate limiting window: Sliding window rate limit.
- Missing IP fallback is automatically active in development.
- Secure environment credentials should always be kept in `.env` (which is gitignored).
