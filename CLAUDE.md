Strict rulebook for consistency. Follow without exception. If unclear, check existing code before inventing new patterns.

## Global

- File naming: kebab-case everywhere (`user-card.tsx`, `create-user.command.ts`). No PascalCase/camelCase filenames.
- One file = one responsibility. Don't mix UI, logic, types, constants in one file.

## API (NestJS + TypeORM + CQRS)

- Folder layout (mirror exactly):
  - `src/cqrs/commands/impl/*.command.ts` + `src/cqrs/commands/handlers/*.handler.ts` — CQRS is **centralized at the app level**, never nested inside a module.
  - `src/cqrs/queries/impl/*.query.ts` + `src/cqrs/queries/handlers/*.handler.ts`.
  - `src/strategies/`, `src/guards/`, `src/decorators/`, `src/middlewares/`, `src/services/` (app-wide), `src/config/`, `src/utils/`.
  - `src/modules/<feature>/` contains **only**: `<feature>.module.ts`, `controllers/v1/*.controller.ts`, `dtos/payloads.ts`, `dtos/responses.ts`, and feature-specific `services/` (with `index.ts` barrel). No commands/handlers/queries inside modules.
  - The module's `*.module.ts` imports its handlers from `api/cqrs/...` and registers them in `providers`.
- Commands/queries extend the typed base: `class XCommand extends Command<Result> { public readonly payload: Static<typeof Payload> }`. Construct them with `Builder(XCommand, { payload }).build()` from `@travix/shared` — never `new`.
- Import across top-level folders with the `api/*` path alias (`api/cqrs/...`, `api/guards/...`), not deep relative paths.
- Naming: `user.controller.ts`, `create-user.command.ts`/`.handler.ts`, `get-users.query.ts`/`.handler.ts`, `user.entity.ts`.
- Controllers: request/response only, delegate to `CommandBus`/`QueryBus`. No business logic, no DB ops, no data transforms.
- Logic placement: simple pass-through → Controller→Bus; shared/reusable → Service; complex/multi-step/multi-DB-op → CQRS Handler.
- DB access: always `this.datasource.manager`. Never `getRepository()` or `@InjectEntityManager()`.
- Multiple DB ops → wrap in `manager.transaction()`.
- Relations: manually define the FK column, then `@ManyToOne`/`@JoinColumn`. Never rely on implicit joins.
- Every entity extends `BaseEntity` (`id`, `createdAt`, `updatedAt`, `deletedAt`).
- Migrations: pre-production → keep only one file, delete & regenerate on each change. Post-production → never delete, always add new.
- Seeders: `InitialSeeder` (required app data), `DummySeeder` (dev/test data).
- Authorization: CASL only, no custom permission logic.
- Versioning: all routes under `/v1`; controller classes named `V1XController`.
- Exceptions: NestJS built-ins only (`NotFoundException`, `BadRequestException`, etc.), never raw `Error`.
- Logging: NestJS `Logger`, never `console.log`.
- Handlers: split complex `execute()` into small private methods; `execute()` stays a high-level orchestration summary.

### Routes, DTOs & validation (TypeBox via `@travix/crud`)

- DTOs are TypeBox schemas, never class-validator. Define request schemas in `dtos/payloads.ts`, response schemas in `dtos/responses.ts` (one module-level `dtos/` folder per feature).
- Build schemas with `Type.*` from `@sinclair/typebox`; use the `@travix/crud` helpers (`Nullable`, `LiteralUnion`, `IsoDate`, etc.) instead of hand-rolling. `Nullable(x)` = optional + nullable.
- Derive the static type with `Static<typeof Schema>` — never duplicate a DTO as a hand-written interface.
- Every route is declared with the `@HttpEndpoint({ method, path, validate })` decorator from `@travix/crud` — never the bare `@Get`/`@Post`/`@Body`/`@Query`/`@Param` decorators.
  - `validate.request`: array of `{ type: 'body' | 'query' | 'param', schema, name?, required? }`. Validated args are injected positionally in the same order, before any `@`-decorated params.
  - `validate.response`: `{ schema, responseCode? }`. The response is auto-validated and stripped to the schema by `TypeboxTransformInterceptor` — do not manually `Value.Parse` in the controller.
  - Set `auth: true` for protected routes (adds the Swagger bearer marker); pair it with `@UseGuards(JwtAuthGuard)`.
- Validation/format setup lives in `main.ts` via `configureNestJsTypebox({ patchSwagger: true, setFormats: true })`. Add new string formats in `libs/crud/src/formats.ts`, not per-schema.
- After changing anything in `libs/crud` (or any lib), rebuild it (`yarn workspace @travix/crud build`) — apps import the compiled `dist`.

### Auth

- JWT auth: stateless access + refresh tokens. All secrets/expiries come from env (`JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES_IN`). Never hardcode.
- Token issuing/verifying goes through `TokenService` (`modules/auth`). Passwords hashed with `bcrypt` using `UserEntity.PASSWORD_SALT_ROUNDS`.
- Protect routes with `@UseGuards(JwtAuthGuard)`; read the current user via the `@AuthUser()` param decorator (`@AuthUser('id')` for a single field).

## Web (React Router)

- Frontend = dumb UI only. No business logic, no client-side filtering/sorting — backend is source of truth.
- API calls: only `createQuery`/`createMutation` from `react-query-kit`. Never raw `useQuery`/`useMutation` in components.
- State: prefer local state or URL params. Zustand only for true global state.
- Components: small, focused, typed props. No business logic or API calls inside queries.
- File separation: `*.types.ts`, `*.schema.ts` (Zod), `*.query.ts`, `*.constants.ts`, `*.store.ts`, `*.data.ts`, `use-*.ts`.
- Error handling: reusable `<LoadingScreen/>` / `<ErrorScreen/>`; always toast on mutation success/error.
- Forms: react-hook-form + Zod only. No per-field `useState`.
- Performance: memoize with `React.memo`/`useMemo`/`useCallback`; avoid creating new objects/functions inline in JSX.
- Styling: Tailwind CSS.

## Final Note

Consistency > Creativity. This file exists so every dev and AI agent produces code that looks like one person wrote it.
