# Memory — Prisma Postgres Database Setup

Last updated: 2026-07-01T23:55:00+05:30

## What was built
- Linked Prisma Postgres database using connection strings retrieved via the MCP tool.
- Initialized Prisma schema and configured it with `moduleFormat = "cjs"` to resolve ES module compilation issues with NestJS's CommonJS output target.
- Created global `PrismaService` and `PrismaModule` inside `src/lib/database/` to manage database connection lifecycle.
- Created feature modules, services, and controllers for `user` and `post` inside `src/module/` directory.
- Added REST API endpoints for user registration, post creation, post publishing, feed fetching, post filtering, and deletion.
- Added database convenience commands to `package.json` (`db:generate`, `db:push`, `db:migrate`, `db:format`, `db:studio`).
- Updated `README.md` with folder structure and API details.

## Decisions made
- Set `moduleFormat = "cjs"` in `schema.prisma` generator client because NestJS compiles TypeScript to CommonJS, whereas Prisma 7 defaults to generating ES module imports (`import.meta.url`) which fail at runtime.
- Passed `accelerateUrl` in `super()` within `PrismaService` constructor to point directly to the `prisma+postgres://` URL, since `datasourceUrl` is not supported in the Accelerate runtime options block.
- Modularized controllers and services into resource-specific directories under `src/module/` to follow the NestJS-first project rules.

## Problems solved
- Solved invalid credentials failure on the `prisma postgres link` command by calling the MCP tool `create_prisma_postgres_connection_string` to generate connection URLs.
- Resolved runtime `ReferenceError: exports is not defined in ES module scope` by forcing CommonJS module format in the Prisma Client generator.
- Resolved TS compilation error `TS2353` (datasourceUrl not defined) by switching to `accelerateUrl` in the constructor.

## Current state
- The database is successfully migrated and in sync.
- The NestJS application builds, starts, and runs perfectly.
- All REST API endpoints (`/user`, `/post`, `/post/feed`, `/post/publish/:id`, etc.) are fully tested and functional with live curl commands.

## Next session starts with
- Design and implement the specific domain logic and features for the hackathon application.

## Open questions
- None.
