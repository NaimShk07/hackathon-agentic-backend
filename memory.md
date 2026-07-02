# Memory — User Module & Post Cleanup

Last updated: 2026-07-03T00:27:00+05:30

## What was built
- Implemented `GET /user/all` in `UserController` with `@Roles(['ADMIN'])` and `@UseGuards(AuthGuard)` decorators from `@thallesp/nestjs-better-auth`.
- Implemented `GET /user/:id` in `UserController` protected by `@UseGuards(AuthGuard)` which throws a `NotFoundException` if the user is not found.
- Created unit tests for the controller in `src/module/user/user.controller.spec.ts`.
- Removed `PostModule` entirely, deleting `src/module/post/` directory and removing its imports from `src/app.module.ts`.
- Deleted the `Post` model and the `posts` relation on `User` from `prisma/schema.prisma`.
- Created and executed a database migration (`remove_post_model`) to drop the `Post` table.
- Added `moduleNameMapper` configuration to `package.json` to resolve relative `.js` imports in Jest.
- Updated E2E mock configuration in `test/app.e2e-spec.ts`.
- Documented new user routes and updated folder structure in `README.md`.

## Decisions made
- Added `@UseGuards(AuthGuard)` explicitly at the route level for clarity.
- Updated role string check in Roles decorator to use uppercase `"ADMIN"`.
- Cleaned up the `Post` model entirely from the database schema and ran a migration to keep the database in sync.

## Problems solved
- Solved Jest unit testing import resolution failures for files with `.js` extensions.
- Solved E2E compilation failure caused by undefined decorator references during tests by mock-exporting `Roles` and `AuthGuard` in `test/app.e2e-spec.ts`.

## Current state
- All tests (`npm run test` and `npm run test:e2e`) are passing.
- Linter reports 0 warnings/errors.
- Application builds cleanly.
- Database is updated and in sync. Code has been committed and pushed to GitHub.

## Next session starts with
- Continue building other feature modules using the authenticated user sessions and role protection.

## Open questions
- None
