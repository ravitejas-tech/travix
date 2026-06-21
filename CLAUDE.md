Strict rulebook for consistency. Follow without exception. If unclear, check existing code before inventing new patterns.

## Global

- File naming: kebab-case everywhere (`user-card.tsx`, `create-user.command.ts`). No PascalCase/camelCase filenames.
- One file = one responsibility. Don't mix UI, logic, types, constants in one file.
- Color theme (web): **white background, blue primary text, gray body text, white secondary text.** Use the design tokens defined in `app.css` `@theme` — `text-primary`/`bg-primary` (brand blue, for headings/accents/links/buttons), `text-muted` (neutral gray, for paragraphs and supporting copy), `text-secondary`/`bg-secondary` (white, for text over colored/image backgrounds), `bg-background` (white). Never hardcode hex colors or ad-hoc grays for these roles — use `text-muted` rather than `text-primary/60` or a raw `text-gray-*` for body text. New sections default to the white theme with blue headings and gray paragraphs.
- Typography: **Poppins is the only font, used everywhere.** Set it once globally (web: the `--font-sans` theme token in `app.css`, loaded via the Google Fonts link in `root.tsx`) and inherit it — never hardcode a different `font-family` or per-component font on any element.

## API (NestJS + TypeORM + CQRS)

- Folder layout (mirror exactly):
  - `src/cqrs/commands/impl/*.command.ts` + `src/cqrs/commands/handlers/*.handler.ts` — CQRS is **centralized at the app level**, never nested inside a module.
  - `src/cqrs/queries/impl/*.query.ts` + `src/cqrs/queries/handlers/*.handler.ts` — same, for reads.
  - `src/strategies/`, `src/guards/`, `src/decorators/`, `src/middlewares/`, `src/config/`, `src/utils/`.
  - `src/modules/<feature>/` contains **only**: `<feature>.module.ts`, `controllers/v1/*.controller.ts`, `dtos/payloads.ts`, `dtos/responses.ts`. No commands/handlers/queries inside modules. **No feature "mapper/business" services** — that logic belongs in the CQRS handler. A `services/` folder is allowed only for genuine integrations/cross-cutting clients (e.g. `auth/services/token.service.ts`, `generation/services/*` calling an external API), never for entity→DTO mapping or ownership checks.
  - The module's `*.module.ts` imports its handlers from `api/cqrs/...` and registers them in `providers`.
- **Strict CQRS — no exceptions.** Every endpoint (read and write) goes through the bus: writes → `CommandBus` + a command handler; reads → `QueryBus` + a query handler. Controllers are request/response only: build the command/query with `Builder(...)` and call the bus. **Never** `@InjectDataSource()` / run a query / map / check ownership in a controller. All business logic (DB access, ownership/`NotFound` checks, entity→DTO mapping, generation-context building) lives inside handlers; duplicate small mappers across handlers rather than reintroducing a shared service.
- Commands/queries extend the typed base: `class XCommand extends Command<Result> { public readonly payload: Static<typeof Payload> }` / `class XQuery extends Query<Result> {}`. Construct with `Builder(XCommand, { payload }).build()` from `@travix/shared` — never `new`.
- Import across top-level folders with the `api/*` path alias (`api/cqrs/...`, `api/guards/...`), not deep relative paths.
- Naming: `user.controller.ts`, `create-user.command.ts`/`.handler.ts`, `get-users.query.ts`/`.handler.ts`, `user.entity.ts`.
- One feature = one module. Split sub-resources into their own modules (e.g. `trips`, `itinerary`, `hotels`) rather than piling multiple controllers into one module. Modules share nothing but the app-level CQRS handlers they register; no cross-module service imports.
- Logic placement: read → CQRS query handler; write (simple or complex/multi-step/multi-DB-op) → CQRS command handler. Controllers never hold logic.
- DB access: always `this.datasource.manager` inside handlers. Never `getRepository()` or `@InjectEntityManager()`. Prefer `createQueryBuilder(...)` with explicit `innerJoinAndSelect`/`leftJoinAndSelect` over multiple `manager.find()` calls for related reads.
- Multiple DB ops → wrap in `manager.transaction()`.
- Relations: manually define the FK column, then `@ManyToOne`/`@JoinColumn`. Define the inverse side (`@OneToMany`/`@OneToOne`) when you need it for an explicit join — never rely on implicit/eager joins; always join explicitly in the query builder.
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
- Pagination (inside the query handler): build a query builder and call `paginateQueryBuilder(qb, { page, limit })` (or `paginateRaw` for raw selects) from `@travix/crud`; return its `{ items, meta, links }` directly, mapping `items` when the response DTO differs from the entity. Response schema is `PaginatedResponse(ItemSchema)`. The controller passes `page`/`limit` (optional `coerceTypes: true` query validators) into the query.
  - Set `auth: true` for protected routes (adds the Swagger bearer marker); pair it with `@UseGuards(JwtAuthGuard)`.
- Validation/format setup lives in `main.ts` via `configureNestJsTypebox({ patchSwagger: true, setFormats: true })`. Add new string formats in `libs/crud/src/formats.ts`, not per-schema.
- After changing anything in `libs/crud` (or any lib), rebuild it (`yarn workspace @travix/crud build`) — apps import the compiled `dist`.

### Auth

- JWT auth: stateless access + refresh tokens. All secrets/expiries come from env (`JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRES_IN`). Never hardcode.
- Token issuing/verifying goes through `TokenService` (`modules/auth`). Passwords hashed with `bcrypt` using `UserEntity.PASSWORD_SALT_ROUNDS`.
- Protect routes with `@UseGuards(JwtAuthGuard)`; read the current user via the `@AuthUser()` param decorator (`@AuthUser('id')` for a single field).

### AI generation

- Lives in its own feature module `modules/generation/` (`@Global` `GenerationModule` + `services/` for the provider clients). The provider-agnostic contracts — the `Generated*`/`GenerationContext` types and the structured-output `generation*Schema` objects — live in `@travix/shared` (`libs/shared/src/generation/`), not in the api app.
- Consumers depend on the abstract `GenerationService` only; the concrete provider is chosen by env at module load (`GEMINI_API_KEY` present → `GeminiGenerationService` on `GEMINI_MODEL`, else the deterministic `StubGenerationService`). All keys/models come from env — never hardcode.
- It is invoked **only from CQRS handlers** (e.g. trip/day/hotel generation commands), never directly from a controller. This is the one legitimate "service" — an external-API client — not feature/business logic.

## Web (React Router)

- Frontend = dumb UI only. No business logic, no client-side filtering/sorting — backend is source of truth.
- API calls: only `createQuery`/`createMutation` from `react-query-kit`. Never raw `useQuery`/`useMutation` in components.
- State: prefer local state or URL params. Zustand only for true global state.
- Components: small, focused, typed props. No business logic or API calls inside queries.
- **File size cap: no file exceeds 150 lines.** When a component grows past that, split it into smaller focused components, each in its own file — one file = one visual/behavioral responsibility (a panel, a list item, a control). Co-locate a feature's components in a `components/<feature>/` folder (e.g. `components/hero/`). Non-component files are **not** kept beside components — they go in app-level shared folders: hooks in `app/hooks/` (`use-*.ts`), constants/static data in `app/data/` (`*.constants.ts`), and types in `app/types/` (`*.types.ts`). Never inline them in component files. Import them with the `~/*` alias (`~/data/...`, `~/hooks/...`, `~/types/...`), not deep relative paths. Truly shared primitives (e.g. `Button`) live in `components/ui/`.
- Animations: use `framer-motion` for transitions/entrances. Keep each animation's config local to the component it animates.
- File separation: `*.types.ts`, `*.schema.ts` (Zod), `*.query.ts`, `*.constants.ts`, `*.store.ts`, `*.data.ts`, `use-*.ts`.
- Error handling: reusable `<LoadingScreen/>` / `<ErrorScreen/>`; always toast on mutation success/error.
- Forms: react-hook-form + Zod only. No per-field `useState`.
- Performance: memoize with `React.memo`/`useMemo`/`useCallback`; avoid creating new objects/functions inline in JSX.
- Styling: Tailwind CSS.

## Final Note

Consistency > Creativity. This file exists so every dev and AI agent produces code that looks like one person wrote it.
