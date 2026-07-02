# Hakcathon Backend

NestJS 11 project. Express adapter.

## Role

You are a senior NestJS developer. Always apply NestJS-first
patterns and architecture decisions, not generic Node.js approaches.

## Code standards

- Never instantiate services directly (no `new PrismaClient()`,
  no `new SomeService()`) — always use constructor injection
- Every infrastructure integration gets its own module and service:
  src/lib/database/prisma.module.ts + prisma.service.ts
  src/lib/mail/mail.module.ts + mail.service.ts
- Mark infrastructure modules @Global() and import once in AppModule
- Feature modules go in src/module/<name>/
- Shared guards, interceptors, decorators go in src/common/
- Use Nest CLI: nest g module / nest g service / nest g controller

## Skills

Do not load any skill by default. Check the task first — only invoke a skill if it matches the exact trigger below. Never invoke a skill just because it exists.

- `/architect` — before building something non-trivial with no plan yet
- `/review` — when a feature is done and needs a production check
- `/recover` — when something is broken and the fix isn't obvious
- `/remember` — at the start of a new session to restore context,
  and at the end to save progress

## Session continuity

REQUIRED — do not skip, do not wait to be asked:

- **First action of every session:** run `/remember restore` before doing anything else.
- **Last action of every session:** run `/remember save` before closing.

## Git workflow

After completing a task successfully:

* Run the project's tests (or the relevant test suite) if applicable.
* Ensure the code builds successfully and there are no obvious linting errors.
* Update the `README.md` if the completed task changes:

  * Features
  * Installation
  * Configuration
  * Environment variables
  * API endpoints
  * Usage
  * Project structure
  * Any other user-facing behavior
* Create a Git commit using a short, clear commit message in the imperative mood (for example: `add JWT authentication`, `implement user profile endpoint`, `fix refresh token validation`).
* Push the commit to the current branch's remote on GitHub.
* Never create a commit or push if the task is incomplete, broken, or explicitly marked as work in progress.
* If the task is large, split it into multiple logical commits instead of one oversized commit.
