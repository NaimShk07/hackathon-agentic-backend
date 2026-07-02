# Memory — Better Auth Integration

Last updated: 2026-07-02T23:14:00+05:30

## What was built
- Integrated Better Auth with NestJS using `@thallesp/nestjs-better-auth`.
- Migrated `User` and `Post` database tables in `schema.prisma` from `Int` to `String` (using CUIDs) and added Better Auth tables (`Session`, `Account`, `Verification`).
- Added standalone `src/lib/auth/auth.ts` configuration with a custom `role` field on `User` defaulting to `"PARTICIPANT"` (disallowed during signup via `input: false`).
- Created a global `AuthLibModule` utilizing `AuthModule.forRootAsync` and dynamic `PrismaService` injection at NestJS bootstrap.
- Disabled the global NestJS body parser in `main.ts` and re-enabled body parsing options in `AuthModule.forRootAsync` for standard controller routes.
- Configured Jest and Jest E2E configurations to support ESM dependencies (`better-auth`, `arcjet`, `@noble/hashes`, `@arcjet/nest`, etc.) in a CommonJS workspace.
- Added public route protection overrides using `@AllowAnonymous()` on public controller endpoints.

## Decisions made
- Standardized all database primary keys to String CUIDs to match Better Auth.
- Handled the body parsing conflict by delegating body-parsing lifecycle to `nestjs-better-auth` config instead of NestJS global body-parser.
- Mocked the dynamic dependencies (Prisma, Arcjet, Better Auth) in Jest unit and e2e testing environments to keep test execution fast and isolated from actual databases/WASM.
- Disabled CSRF checks in development to allow easy local API testing via tools like Postman.

## Problems solved
- Resolved `MISSING_OR_NULL_ORIGIN` error during local API testing by configuring `advanced.disableCSRFCheck: true` in the Better Auth configuration.
- Solved Jest "Unexpected Token" import issues with ESM packages under CommonJS by updating `transformIgnorePatterns` and introducing Jest module mocks.
- Solved relative import path extension `.js` errors in Jest tests by adding a `moduleNameMapper` mapping `.js` imports to extensionless paths.

## Current state
- All tests (`npm run test` and `npm run test:e2e`) are passing.
- The project builds cleanly with `npm run build`.
- Linter executes with 0 warnings/errors.
- NestJS application starts and runs correctly with all routes mapped.

## Next session starts with
- Build out the domain-specific logic for the hackathon application using the authenticated user sessions and custom `role` checks.
